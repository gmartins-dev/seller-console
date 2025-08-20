import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { OpportunitySummaryCards } from '../opportunity-summary-cards';
import { useOpportunityFilters } from '@/hooks/use-opportunity-filters';

// Mock the hook
vi.mock('@/hooks/use-opportunity-filters');

describe('OpportunitySummaryCards', () => {
  const mockFilteredOpportunities = [
    {
      id: 'opp-1',
      name: 'TechCorp Deal',
      stage: 'proposal' as const,
      amount: 50000,
      accountName: 'TechCorp',
      leadId: 'lead-1',
      createdAt: '2025-01-01T00:00:00Z',
      updatedAt: '2025-01-01T00:00:00Z',
    },
    {
      id: 'opp-2',
      name: 'DataCorp Deal',
      stage: 'closed_won' as const,
      amount: 75000,
      accountName: 'DataCorp',
      leadId: 'lead-2',
      createdAt: '2025-01-02T00:00:00Z',
      updatedAt: '2025-01-02T00:00:00Z',
    },
    {
      id: 'opp-3',
      name: 'StartupCorp Deal',
      stage: 'closed_won' as const,
      amount: 25000,
      accountName: 'StartupCorp',
      createdAt: '2025-01-03T00:00:00Z',
      updatedAt: '2025-01-03T00:00:00Z',
    },
  ];

  const mockStats = {
    total: 15,
    filtered: 10,
    stageCounts: {
      prospecting: 3,
      proposal: 2,
      closed_won: 5,
    },
    totalValue: 500000,
    filteredValue: 350000,
  };

  beforeEach(() => {
    vi.clearAllMocks();
    vi.mocked(useOpportunityFilters).mockReturnValue({
      stats: mockStats,
      filteredOpportunities: mockFilteredOpportunities,
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

  it('renders total opportunities count', () => {
    render(<OpportunitySummaryCards />);
    
    expect(screen.getByText('Total Opportunities')).toBeInTheDocument();
    expect(screen.getByText('15')).toBeInTheDocument();
  });

  it('renders pipeline value formatted as currency', () => {
    render(<OpportunitySummaryCards />);
    
    expect(screen.getByText('Pipeline Value')).toBeInTheDocument();
    expect(screen.getByText('$500,000')).toBeInTheDocument();
  });

  it('renders won value calculated from closed_won opportunities', () => {
    render(<OpportunitySummaryCards />);
    
    expect(screen.getByText('Won Value')).toBeInTheDocument();
    // Won value should be 75000 + 25000 = 100000
    expect(screen.getByText('$100,000')).toBeInTheDocument();
    expect(screen.getByText('2 opportunities')).toBeInTheDocument();
  });

  it('updates when stats change', () => {
    const { rerender } = render(<OpportunitySummaryCards />);
    
    // Update the mock with new stats and opportunities
    vi.mocked(useOpportunityFilters).mockReturnValue({
      stats: {
        total: 20,
        filtered: 15,
        stageCounts: {
          prospecting: 5,
          proposal: 3,
          closed_won: 7,
        },
        totalValue: 750000,
        filteredValue: 600000,
      },
      filteredOpportunities: [
        ...mockFilteredOpportunities,
        {
          id: 'opp-4',
          name: 'NewCorp Deal',
          stage: 'closed_won' as const,
          amount: 100000,
          accountName: 'NewCorp',
          leadId: 'lead-4',
          createdAt: '2025-01-04T00:00:00Z',
          updatedAt: '2025-01-04T00:00:00Z',
        },
      ],
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

    rerender(<OpportunitySummaryCards />);
    
    expect(screen.getByText('20')).toBeInTheDocument();
    expect(screen.getByText('$750,000')).toBeInTheDocument();
    expect(screen.getByText('$200,000')).toBeInTheDocument(); // 75000 + 25000 + 100000
  });

  it('handles zero values gracefully', () => {
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

    render(<OpportunitySummaryCards />);
    
    expect(screen.getByText('0')).toBeInTheDocument();
    expect(screen.getAllByText('N/A')).toHaveLength(2); // Pipeline and Won values both show N/A
    expect(screen.getByText('0 opportunities')).toBeInTheDocument();
  });
});
