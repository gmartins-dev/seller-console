import { useMemo, useState } from 'react';
import { useLeadsStore } from '@/stores/leads-store';
import type { Lead, LeadFilters, LeadStatus } from '@/types';

export const useLeadFilters = () => {
  const { filters, setFilters, resetFilters, leads } = useLeadsStore();

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  // Memoized filtered and sorted leads
  const filteredLeads = useMemo(() => {
    let result = [...leads];

    // Search filter
    if (filters.search) {
      const searchTerm = filters.search.toLowerCase();
      result = result.filter(
        (lead) =>
          lead.name.toLowerCase().includes(searchTerm) ||
          lead.company.toLowerCase().includes(searchTerm)
      );
    }

    // Status filter
    if (filters.status.length > 0) {
      result = result.filter((lead) => filters.status.includes(lead.status));
    }

    // Sort
    result.sort((a, b) => {
      let aValue: any;
      let bValue: any;

      switch (filters.sortBy) {
        case 'score':
          aValue = a.score;
          bValue = b.score;
          break;
        case 'name':
          aValue = a.name.toLowerCase();
          bValue = b.name.toLowerCase();
          break;
        case 'company':
          aValue = a.company.toLowerCase();
          bValue = b.company.toLowerCase();
          break;
        case 'status':
          aValue = a.status;
          bValue = b.status;
          break;
        case 'createdAt':
          aValue = new Date(a.createdAt || 0);
          bValue = new Date(b.createdAt || 0);
          break;
        default:
          return 0;
      }

      if (filters.sortOrder === 'desc') {
        return aValue > bValue ? -1 : aValue < bValue ? 1 : 0;
      } else {
        return aValue < bValue ? -1 : aValue > bValue ? 1 : 0;
      }
    });

    return result;
  }, [leads, filters]);

  // Reset to page 1 when filters change
  useMemo(() => {
    setCurrentPage(1);
  }, [filters.search, filters.status, filters.sortBy, filters.sortOrder]);

  // Paginated leads
  const totalPages = Math.ceil(filteredLeads.length / itemsPerPage);
  const paginatedLeads = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return filteredLeads.slice(startIndex, endIndex);
  }, [filteredLeads, currentPage, itemsPerPage]);

  // Pagination functions
  const goToPage = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const goToNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const goToPreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

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
    addStatusFilter: (status: LeadStatus) => {
      if (!filters.status.includes(status)) {
        updateFilter('status', [...filters.status, status]);
      }
    },
    removeStatusFilter: (status: LeadStatus) => {
      updateFilter('status', filters.status.filter(s => s !== status));
    },
    toggleStatusFilter: (status: LeadStatus) => {
      if (filters.status.includes(status)) {
        updateFilter('status', filters.status.filter(s => s !== status));
      } else {
        updateFilter('status', [...filters.status, status]);
      }
    },
    sortBy: (field: LeadFilters['sortBy'], order?: LeadFilters['sortOrder']) => {
      setFilters({
        sortBy: field,
        sortOrder:
          order || (filters.sortBy === field && filters.sortOrder === 'desc' ? 'asc' : 'desc'),
      });
    },
    clearSearch: () => updateFilter('search', ''),
    clearStatusFilter: () => updateFilter('status', []),
    reset: resetFilters,
  };

  // Check if any filters are active
  const hasActiveFilters = useMemo(() => {
    return (
      filters.search !== '' ||
      filters.status.length > 0 ||
      filters.sortBy !== 'score' ||
      filters.sortOrder !== 'desc'
    );
  }, [filters]);

  return {
    // Current state
    filters,
    filteredLeads,
    paginatedLeads,
    stats,
    hasActiveFilters,

    // Pagination state
    currentPage,
    itemsPerPage,
    totalPages,
    totalItems: filteredLeads.length,

    // Actions
    setFilters,
    updateFilter,
    resetFilters,
    setItemsPerPage,
    goToPage,
    goToNextPage,
    goToPreviousPage,

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
