import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import type { Lead, Opportunity, LeadFilters, OpportunityFilters, LoadingState } from '@/types';

interface LeadsState {
  // Data
  leads: Lead[];
  opportunities: Opportunity[];
  selectedLead: Lead | null;

  // Filters and UI state
  filters: LeadFilters;
  opportunityFilters: OpportunityFilters;
  loadingState: LoadingState;

  // Actions
  setLeads: (leads: Lead[]) => void;
  updateLead: (leadId: string, updates: Partial<Lead>) => void;
  setSelectedLead: (lead: Lead | null) => void;

  // Opportunities
  addOpportunity: (opportunity: Opportunity) => void;
  setOpportunities: (opportunities: Opportunity[]) => void;

  // Filters
  setFilters: (filters: Partial<LeadFilters>) => void;
  resetFilters: () => void;
  setOpportunityFilters: (filters: Partial<OpportunityFilters>) => void;
  resetOpportunityFilters: () => void;

  // Loading and errors
  setLoading: (isLoading: boolean) => void;
  setError: (error: string | null) => void;

  // Computed selectors
  getLeadById: (id: string) => Lead | undefined;
}

const defaultFilters: LeadFilters = {
  search: '',
  status: [],
  sortBy: 'score',
  sortOrder: 'desc',
};

const defaultOpportunityFilters: OpportunityFilters = {
  search: '',
  stage: [],
  sortBy: 'createdAt',
  sortOrder: 'desc',
};

const defaultLoadingState: LoadingState = {
  isLoading: false,
  error: null,
};

export const useLeadsStore = create<LeadsState>()(
  devtools(
    persist(
      (set, get) => ({
        // Initial state
        leads: [],
        opportunities: [],
        selectedLead: null,
        filters: defaultFilters,
        opportunityFilters: defaultOpportunityFilters,
        loadingState: defaultLoadingState,

        // Actions
        setLeads: (leads) => set({ leads }),

        updateLead: (leadId, updates) =>
          set((state) => ({
            leads: state.leads.map((lead) =>
              lead.id === leadId
                ? { ...lead, ...updates, updatedAt: new Date().toISOString() }
                : lead
            ),
            selectedLead:
              state.selectedLead?.id === leadId
                ? { ...state.selectedLead, ...updates, updatedAt: new Date().toISOString() }
                : state.selectedLead,
          })),

        setSelectedLead: (lead) => set({ selectedLead: lead }),

        // Opportunities
        addOpportunity: (opportunity) =>
          set((state) => ({
            opportunities: [...state.opportunities, opportunity],
          })),

        setOpportunities: (opportunities) => set({ opportunities }),

        // Filters
        setFilters: (newFilters) =>
          set((state) => ({
            filters: { ...state.filters, ...newFilters },
          })),

        resetFilters: () => set({ filters: defaultFilters }),

        setOpportunityFilters: (newFilters) =>
          set((state) => ({
            opportunityFilters: { ...state.opportunityFilters, ...newFilters },
          })),

        resetOpportunityFilters: () => set({ opportunityFilters: defaultOpportunityFilters }),

        // Loading and errors
        setLoading: (isLoading) =>
          set((state) => ({
            loadingState: { ...state.loadingState, isLoading },
          })),

        setError: (error) =>
          set((state) => ({
            loadingState: { ...state.loadingState, error },
          })),

        // Computed selectors
        getLeadById: (id) => {
          const { leads } = get();
          return leads.find((lead) => lead.id === id);
        },
      }),
      {
        name: 'leads-storage',
        // Only persist filters and opportunities, not the full leads data
        partialize: (state) => ({
          filters: state.filters,
          opportunities: state.opportunities,
        }),
      }
    ),
    {
      name: 'leads-store',
    }
  )
);
