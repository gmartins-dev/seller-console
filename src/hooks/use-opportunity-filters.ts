import { useMemo, useState } from 'react';
import { useLeadsStore } from '@/stores/leads-store';
import type { OpportunityFilters, OpportunityStage } from '@/types';

export const useOpportunityFilters = () => {
  const {
    opportunityFilters: filters,
    setOpportunityFilters,
    resetOpportunityFilters,
    opportunities
  } = useLeadsStore();

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  // Memoized filtered and sorted opportunities
  const filteredOpportunities = useMemo(() => {
    let result = [...opportunities];

    // Search filter
    if (filters.search) {
      const searchTerm = filters.search.toLowerCase();
      result = result.filter(
        (opportunity) =>
          opportunity.name.toLowerCase().includes(searchTerm) ||
          opportunity.accountName.toLowerCase().includes(searchTerm)
      );
    }

    // Stage filter
    if (filters.stage.length > 0) {
      result = result.filter((opportunity) => filters.stage.includes(opportunity.stage));
    }

    // Sort
    result.sort((a, b) => {
      let aValue: any;
      let bValue: any;

      switch (filters.sortBy) {
        case 'name':
          aValue = a.name.toLowerCase();
          bValue = b.name.toLowerCase();
          break;
        case 'accountName':
          aValue = a.accountName.toLowerCase();
          bValue = b.accountName.toLowerCase();
          break;
        case 'stage':
          aValue = a.stage;
          bValue = b.stage;
          break;
        case 'amount':
          aValue = a.amount || 0;
          bValue = b.amount || 0;
          break;
        case 'createdAt':
          aValue = new Date(a.createdAt || 0);
          bValue = new Date(b.createdAt || 0);
          break;
        default:
          return 0;
      }

      if (aValue < bValue) {
        return filters.sortOrder === 'asc' ? -1 : 1;
      }
      if (aValue > bValue) {
        return filters.sortOrder === 'asc' ? 1 : -1;
      }
      return 0;
    });

    return result;
  }, [opportunities, filters]);

  // Reset to page 1 when filters change
  useMemo(() => {
    setCurrentPage(1);
  }, [filters.search, filters.stage, filters.sortBy, filters.sortOrder]);

  // Paginated opportunities
  const totalPages = Math.ceil(filteredOpportunities.length / itemsPerPage);
  const paginatedOpportunities = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return filteredOpportunities.slice(startIndex, endIndex);
  }, [filteredOpportunities, currentPage, itemsPerPage]);

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
    const totalOpportunities = opportunities.length;
    const filteredCount = filteredOpportunities.length;

    const stageCounts = opportunities.reduce(
      (acc, opportunity) => {
        acc[opportunity.stage] = (acc[opportunity.stage] || 0) + 1;
        return acc;
      },
      {} as Record<string, number>
    );

    const totalValue = opportunities.reduce((sum, opp) => sum + (opp.amount || 0), 0);
    const filteredValue = filteredOpportunities.reduce((sum, opp) => sum + (opp.amount || 0), 0);

    return {
      total: totalOpportunities,
      filtered: filteredCount,
      stageCounts,
      totalValue,
      filteredValue,
    };
  }, [opportunities, filteredOpportunities]);

  // Filter utilities
  const updateFilter = <K extends keyof OpportunityFilters>(
    key: K,
    value: OpportunityFilters[K]
  ) => {
    setOpportunityFilters({ [key]: value });
  };

  // Predefined filter actions
  const filterActions = {
    searchByName: (query: string) => updateFilter('search', query),
    addStageFilter: (stage: OpportunityStage) => {
      if (!filters.stage.includes(stage)) {
        updateFilter('stage', [...filters.stage, stage]);
      }
    },
    removeStageFilter: (stage: OpportunityStage) => {
      updateFilter('stage', filters.stage.filter(s => s !== stage));
    },
    toggleStageFilter: (stage: OpportunityStage) => {
      if (filters.stage.includes(stage)) {
        updateFilter('stage', filters.stage.filter(s => s !== stage));
      } else {
        updateFilter('stage', [...filters.stage, stage]);
      }
    },
    sortBy: (field: OpportunityFilters['sortBy'], order?: OpportunityFilters['sortOrder']) => {
      setOpportunityFilters({
        sortBy: field,
        sortOrder:
          order || (filters.sortBy === field && filters.sortOrder === 'desc' ? 'asc' : 'desc'),
      });
    },
    clearSearch: () => updateFilter('search', ''),
    clearStageFilter: () => updateFilter('stage', []),
    reset: resetOpportunityFilters,
  };

  // Check if any filters are active
  const hasActiveFilters = useMemo(() => {
    return (
      filters.search !== '' ||
      filters.stage.length > 0 ||
      filters.sortBy !== 'createdAt' ||
      filters.sortOrder !== 'desc'
    );
  }, [filters]);

  return {
    // Current state
    filters,
    filteredOpportunities,
    paginatedOpportunities,
    stats,
    hasActiveFilters,

    // Pagination state
    currentPage,
    itemsPerPage,
    totalPages,
    totalItems: filteredOpportunities.length,

    // Actions
    setOpportunityFilters,
    updateFilter,
    resetOpportunityFilters,
    setItemsPerPage,
    goToPage,
    goToNextPage,
    goToPreviousPage,

    // Convenient filter actions
    ...filterActions,
  };
};
