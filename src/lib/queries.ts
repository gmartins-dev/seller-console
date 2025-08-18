import { QueryClient, useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { leadsApi, opportunitiesApi, AppError } from '@/lib/api';
import { useLeadsStore } from '@/stores/leads-store';
import type { Lead, Opportunity, OpportunityFormData } from '@/types';

// Query Client configuration
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: (failureCount, error) => {
        // Don't retry on client errors (4xx)
        if (
          error instanceof AppError &&
          error.status &&
          error.status >= 400 &&
          error.status < 500
        ) {
          return false;
        }
        // Retry up to 3 times for other errors
        return failureCount < 3;
      },
      retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
      staleTime: 5 * 60 * 1000, // 5 minutes
      refetchOnWindowFocus: false,
    },
    mutations: {
      retry: false,
    },
  },
});

// Query Keys
export const queryKeys = {
  leads: ['leads'] as const,
  lead: (id: string) => ['leads', id] as const,
  opportunities: ['opportunities'] as const,
} as const;

// Leads Queries
export const useLeadsQuery = () => {
  const setLeads = useLeadsStore((state) => state.setLeads);
  const setLoading = useLeadsStore((state) => state.setLoading);
  const setError = useLeadsStore((state) => state.setError);

  return useQuery({
    queryKey: queryKeys.leads,
    queryFn: async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await leadsApi.getLeads();
        setLeads(response.data);
        return response.data;
      } catch (error) {
        const errorMessage = error instanceof AppError ? error.message : 'Failed to fetch leads';
        setError(errorMessage);
        throw error;
      } finally {
        setLoading(false);
      }
    },
  });
};

export const useLeadQuery = (id: string) => {
  return useQuery({
    queryKey: queryKeys.lead(id),
    queryFn: async () => {
      const response = await leadsApi.getLeadById(id);
      return response.data;
    },
    enabled: !!id,
  });
};

// Opportunities Queries
export const useOpportunitiesQuery = () => {
  const setOpportunities = useLeadsStore((state) => state.setOpportunities);

  return useQuery({
    queryKey: queryKeys.opportunities,
    queryFn: async () => {
      const response = await opportunitiesApi.getOpportunities();
      setOpportunities(response.data);
      return response.data;
    },
  });
};

// Mutations
export const useUpdateLeadMutation = () => {
  const queryClient = useQueryClient();
  const updateLead = useLeadsStore((state) => state.updateLead);
  const setError = useLeadsStore((state) => state.setError);

  return useMutation({
    mutationFn: async ({ id, updates }: { id: string; updates: Partial<Lead> }) => {
      const response = await leadsApi.updateLead(id, updates);
      return response.data;
    },
    onMutate: async ({ id, updates }) => {
      // Cancel any outgoing refetches
      await queryClient.cancelQueries({ queryKey: queryKeys.leads });
      await queryClient.cancelQueries({ queryKey: queryKeys.lead(id) });

      // Snapshot the previous values
      const previousLeads = queryClient.getQueryData<Lead[]>(queryKeys.leads);
      const previousLead = queryClient.getQueryData<Lead>(queryKeys.lead(id));

      // Optimistically update the cache
      updateLead(id, updates);

      if (previousLeads) {
        const optimisticLeads = previousLeads.map((lead) =>
          lead.id === id ? { ...lead, ...updates, updatedAt: new Date().toISOString() } : lead
        );
        queryClient.setQueryData(queryKeys.leads, optimisticLeads);
      }

      if (previousLead) {
        const optimisticLead = { ...previousLead, ...updates, updatedAt: new Date().toISOString() };
        queryClient.setQueryData(queryKeys.lead(id), optimisticLead);
      }

      return { previousLeads, previousLead };
    },
    onError: (error, { id }, context) => {
      // Rollback on error
      if (context?.previousLeads) {
        queryClient.setQueryData(queryKeys.leads, context.previousLeads);
      }
      if (context?.previousLead) {
        queryClient.setQueryData(queryKeys.lead(id), context.previousLead);
      }

      const errorMessage = error instanceof AppError ? error.message : 'Failed to update lead';
      setError(errorMessage);
    },
    onSettled: () => {
      // Always refetch after error or success
      queryClient.invalidateQueries({ queryKey: queryKeys.leads });
    },
  });
};

export const useCreateOpportunityMutation = () => {
  const queryClient = useQueryClient();
  const addOpportunity = useLeadsStore((state) => state.addOpportunity);
  const setError = useLeadsStore((state) => state.setError);

  return useMutation({
    mutationFn: async (data: Omit<Opportunity, 'id' | 'createdAt' | 'updatedAt'>) => {
      const response = await opportunitiesApi.createOpportunity(data);
      return response.data;
    },
    onSuccess: (opportunity) => {
      // Update store
      addOpportunity(opportunity);

      // Update cache
      const previousOpportunities =
        queryClient.getQueryData<Opportunity[]>(queryKeys.opportunities) || [];
      queryClient.setQueryData(queryKeys.opportunities, [...previousOpportunities, opportunity]);
    },
    onError: (error) => {
      const errorMessage =
        error instanceof AppError ? error.message : 'Failed to create opportunity';
      setError(errorMessage);
    },
  });
};

export const useConvertLeadMutation = () => {
  const queryClient = useQueryClient();
  const updateLead = useLeadsStore((state) => state.updateLead);
  const addOpportunity = useLeadsStore((state) => state.addOpportunity);
  const setError = useLeadsStore((state) => state.setError);

  return useMutation({
    mutationFn: async ({
      leadId,
      opportunityData,
    }: {
      leadId: string;
      opportunityData: OpportunityFormData;
    }) => {
      const response = await opportunitiesApi.convertLeadToOpportunity(leadId, opportunityData);
      return response.data;
    },
    onSuccess: ({ lead, opportunity }) => {
      // Update stores
      updateLead(lead.id, { status: lead.status });
      addOpportunity(opportunity);

      // Update caches
      queryClient.invalidateQueries({ queryKey: queryKeys.leads });
      queryClient.invalidateQueries({ queryKey: queryKeys.opportunities });

      // Update specific lead cache
      queryClient.setQueryData(queryKeys.lead(lead.id), lead);
    },
    onError: (error) => {
      const errorMessage = error instanceof AppError ? error.message : 'Failed to convert lead';
      setError(errorMessage);
    },
  });
};

// Error handling hook
export const useErrorHandler = () => {
  const setError = useLeadsStore((state) => state.setError);

  const handleError = (error: unknown) => {
    const errorMessage = error instanceof AppError ? error.message : 'An unexpected error occurred';
    setError(errorMessage);
    console.error('Application error:', error);
  };

  const clearError = () => setError(null);

  return { handleError, clearError };
};
