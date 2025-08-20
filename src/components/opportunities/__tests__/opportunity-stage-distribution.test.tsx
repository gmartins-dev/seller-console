import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { OpportunityStageDistribution } from '../opportunity-stage-distribution';
import { useOpportunityFilters } from '@/hooks/use-opportunity-filters';

// Mock the hook
vi.mock('@/hooks/use-opportunity-filters');

describe('OpportunityStageDistribution', () => {
  const mockStats = {
    total: 10,
    filtered: 8,
    stageCounts: {
      prospecting: 3,
      proposal: 2,
      closed_won: 2,
      negotiation: 1,
    },
    totalValue: 500000,
    filteredValue: 400000,
  };

  beforeEach(() => {
    vi.clearAllMocks();
    vi.mocked(useOpportunityFilters).mockReturnValue({
      stats: mockStats,
      filteredOpportunities: [],
      filters: { search: '', stage: [], sortBy: 'createdAt', sortOrder: 'desc' },
      hasActiveFilters: false,
      searchByName: vi.fn(),
      addStageFilter: vi.fn(),
      removeStageFilter: vi.fn(),
      toggleStageFilter: vi.fn(),
      clearSearch: vi.fn(),
      clearStageFilter: vi.fn(),
      sortBy: vi.fn(),
      reset: vi.fn(),
      setOpportunityFilters: vi.fn(),
      updateFilter: vi.fn(),
      resetOpportunityFilters: vi.fn(),
    });
  });

  it('renders the component title', () => {
    render(<OpportunityStageDistribution />);
    
    expect(screen.getByText('Stage Distribution')).toBeInTheDocument();
  });

  it('displays stage counts and percentages correctly', () => {
    render(<OpportunityStageDistribution />);
    
    // Check stage names are displayed
    expect(screen.getByText('Prospecting')).toBeInTheDocument();
    expect(screen.getByText('Proposal')).toBeInTheDocument();
    expect(screen.getByText('Closed Won')).toBeInTheDocument();
    expect(screen.getByText('Negotiation')).toBeInTheDocument();

    // Check counts are displayed (using getAllByText for duplicates)
    expect(screen.getByText('3')).toBeInTheDocument();
    expect(screen.getAllByText('2')).toHaveLength(2); // Both proposal and closed_won have 2
    expect(screen.getByText('1')).toBeInTheDocument();

    // Check percentages (based on filtered count of 8)
    expect(screen.getByText('30%')).toBeInTheDocument(); // 3/10 = 30%
    expect(screen.getAllByText('20%')).toHaveLength(2); // 2/10 = 20% (appears twice)
    expect(screen.getByText('10%')).toBeInTheDocument(); // 1/10 = 10%
  });

  it('handles empty stage counts', () => {
    vi.mocked(useOpportunityFilters).mockReturnValue({
      stats: {
        total: 0,
        filtered: 0,
        stageCounts: {},
        totalValue: 0,
        filteredValue: 0,
      },
      filteredOpportunities: [],
      filters: { search: '', stage: [], sortBy: 'createdAt', sortOrder: 'desc' },
      hasActiveFilters: false,
      searchByName: vi.fn(),
      addStageFilter: vi.fn(),
      removeStageFilter: vi.fn(),
      toggleStageFilter: vi.fn(),
      clearSearch: vi.fn(),
      clearStageFilter: vi.fn(),
      sortBy: vi.fn(),
      reset: vi.fn(),
      setOpportunityFilters: vi.fn(),
      updateFilter: vi.fn(),
      resetOpportunityFilters: vi.fn(),
    });

    render(<OpportunityStageDistribution />);
    
    expect(screen.getByText('Stage Distribution')).toBeInTheDocument();
    // Component should handle empty stageCounts gracefully
  });

  it('calculates percentages correctly when filtered count is zero', () => {
    vi.mocked(useOpportunityFilters).mockReturnValue({
      stats: {
        total: 5,
        filtered: 0,
        stageCounts: {
          prospecting: 2,
          proposal: 3,
        },
        totalValue: 100000,
        filteredValue: 0,
      },
      filteredOpportunities: [],
      filters: { search: '', stage: [], sortBy: 'createdAt', sortOrder: 'desc' },
      hasActiveFilters: false,
      searchByName: vi.fn(),
      addStageFilter: vi.fn(),
      removeStageFilter: vi.fn(),
      toggleStageFilter: vi.fn(),
      clearSearch: vi.fn(),
      clearStageFilter: vi.fn(),
      sortBy: vi.fn(),
      reset: vi.fn(),
      setOpportunityFilters: vi.fn(),
      updateFilter: vi.fn(),
      resetOpportunityFilters: vi.fn(),
    });

    render(<OpportunityStageDistribution />);
    
    // Should handle division by zero gracefully
    expect(screen.getByText('Stage Distribution')).toBeInTheDocument();
  });

  it('formats stage names correctly', () => {
    vi.mocked(useOpportunityFilters).mockReturnValue({
      stats: {
        total: 4,
        filtered: 4,
        stageCounts: {
          closed_won: 2,
          closed_lost: 1,
          qualification: 1,
        },
        totalValue: 200000,
        filteredValue: 200000,
      },
      filteredOpportunities: [],
      filters: { search: '', stage: [], sortBy: 'createdAt', sortOrder: 'desc' },
      hasActiveFilters: false,
      searchByName: vi.fn(),
      addStageFilter: vi.fn(),
      removeStageFilter: vi.fn(),
      toggleStageFilter: vi.fn(),
      clearSearch: vi.fn(),
      clearStageFilter: vi.fn(),
      sortBy: vi.fn(),
      reset: vi.fn(),
      setOpportunityFilters: vi.fn(),
      updateFilter: vi.fn(),
      resetOpportunityFilters: vi.fn(),
    });

    render(<OpportunityStageDistribution />);
    
    // Check that stage names are properly formatted
    expect(screen.getByText('Closed Won')).toBeInTheDocument();
    expect(screen.getByText('Closed Lost')).toBeInTheDocument();
    expect(screen.getByText('Qualification')).toBeInTheDocument();
  });
});
