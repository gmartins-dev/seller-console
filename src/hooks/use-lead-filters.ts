import { useMemo } from 'react';
import { useLeadsStore } from '@/stores/leads-store';
import type { Lead, LeadFilters } from '@/types';

export const useLeadFilters = () => {
  const { filters, setFilters, resetFilters, getFilteredLeads, leads } = useLeadsStore();

  // Memoized filtered and sorted leads
  const filteredLeads = useMemo(() => {
    return getFilteredLeads();
  }, [getFilteredLeads]);

  // Statistics
  const stats = useMemo(() => {
    const totalLeads = leads.length;
    const filteredCount = filteredLeads.length;

    const statusCounts = leads.reduce(
      (acc, lead) => {
        acc[lead.status] = (acc[lead.status] || 0) + 1;
        return acc;
      },
      {} as Record<string, number>
    );

    const averageScore =
      leads.length > 0
        ? Math.round(leads.reduce((sum, lead) => sum + lead.score, 0) / leads.length)
        : 0;

    const highScoreLeads = leads.filter((lead) => lead.score >= 80).length;

    return {
      total: totalLeads,
      filtered: filteredCount,
      statusCounts,
      averageScore,
      highScoreLeads,
      conversionRate:
        totalLeads > 0 ? Math.round(((statusCounts.qualified || 0) / totalLeads) * 100) : 0,
    };
  }, [leads, filteredLeads]);

  // Update specific filter
  const updateFilter = <K extends keyof LeadFilters>(key: K, value: LeadFilters[K]) => {
    setFilters({ [key]: value });
  };

  // Predefined filter actions
  const filterActions = {
    searchByName: (query: string) => updateFilter('search', query),
    filterByStatus: (status: LeadFilters['status']) => updateFilter('status', status),
    sortBy: (field: LeadFilters['sortBy'], order?: LeadFilters['sortOrder']) => {
      setFilters({
        sortBy: field,
        sortOrder:
          order || (filters.sortBy === field && filters.sortOrder === 'desc' ? 'asc' : 'desc'),
      });
    },
    clearSearch: () => updateFilter('search', ''),
    clearStatusFilter: () => updateFilter('status', 'all'),
    reset: resetFilters,
  };

  // Check if any filters are active
  const hasActiveFilters = useMemo(() => {
    return (
      filters.search !== '' ||
      filters.status !== 'all' ||
      filters.sortBy !== 'score' ||
      filters.sortOrder !== 'desc'
    );
  }, [filters]);

  return {
    // Current state
    filters,
    filteredLeads,
    stats,
    hasActiveFilters,

    // Actions
    setFilters,
    updateFilter,
    resetFilters,

    // Convenient filter actions
    ...filterActions,
  };
};

// Hook for search functionality with debouncing
export const useLeadSearch = () => {
  const { filters, updateFilter } = useLeadFilters();

  const searchLeads = (query: string) => {
    updateFilter('search', query);
  };

  const clearSearch = () => {
    updateFilter('search', '');
  };

  return {
    searchQuery: filters.search,
    searchLeads,
    clearSearch,
    hasSearchQuery: filters.search.length > 0,
  };
};

// Hook for lead selection and details
export const useLeadSelection = () => {
  const { selectedLead, setSelectedLead, getLeadById } = useLeadsStore();

  const selectLead = (leadId: string) => {
    const lead = getLeadById(leadId);
    if (lead) {
      setSelectedLead(lead);
    }
  };

  const clearSelection = () => {
    setSelectedLead(null);
  };

  const isSelected = (leadId: string) => {
    return selectedLead?.id === leadId;
  };

  return {
    selectedLead,
    selectLead,
    clearSelection,
    isSelected,
    hasSelection: !!selectedLead,
  };
};

// Hook for batch operations
export const useLeadBatchOperations = () => {
  const { leads, setLeads } = useLeadsStore();

  const bulkUpdateStatus = (leadIds: string[], status: Lead['status']) => {
    const updatedLeads = leads.map((lead) =>
      leadIds.includes(lead.id) ? { ...lead, status, updatedAt: new Date().toISOString() } : lead
    );
    setLeads(updatedLeads);
  };

  const bulkDelete = (leadIds: string[]) => {
    const filteredLeads = leads.filter((lead) => !leadIds.includes(lead.id));
    setLeads(filteredLeads);
  };

  return {
    bulkUpdateStatus,
    bulkDelete,
  };
};
