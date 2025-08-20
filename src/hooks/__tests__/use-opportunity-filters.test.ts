import { renderHook, act } from '@testing-library/react';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { useOpportunityFilters } from '../use-opportunity-filters';
import { useLeadsStore } from '@/stores/leads-store';
import type { Opportunity } from '@/types';

// Mock the store
vi.mock('@/stores/leads-store');

const mockOpportunities: Opportunity[] = [
  {
    id: 'opp-1',
    name: 'TechCorp Deal',
    stage: 'proposal',
    amount: 50000,
    accountName: 'TechCorp',
    leadId: 'lead-1',
    createdAt: '2025-01-01T00:00:00Z',
    updatedAt: '2025-01-01T00:00:00Z',
  },
  {
    id: 'opp-2',
    name: 'DataCorp Deal',
    stage: 'closed_won',
    amount: 75000,
    accountName: 'DataCorp',
    leadId: 'lead-2',
    createdAt: '2025-01-02T00:00:00Z',
    updatedAt: '2025-01-02T00:00:00Z',
  },
  {
    id: 'opp-3',
    name: 'StartupCorp Deal',
    stage: 'prospecting',
    amount: 25000,
    accountName: 'StartupCorp',
    createdAt: '2025-01-03T00:00:00Z',
    updatedAt: '2025-01-03T00:00:00Z',
  },
];

describe('useOpportunityFilters', () => {
  const mockSetOpportunityFilters = vi.fn();
  const mockResetOpportunityFilters = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();

    vi.mocked(useLeadsStore).mockReturnValue({
      opportunityFilters: {
        search: '',
        stage: [],
        sortBy: 'createdAt',
        sortOrder: 'desc',
      },
      opportunities: mockOpportunities,
      setOpportunityFilters: mockSetOpportunityFilters,
      resetOpportunityFilters: mockResetOpportunityFilters,
      // Add other required properties
      leads: [],
      filters: {
        search: '',
        status: [],
        sortBy: 'score',
        sortOrder: 'desc',
      },
      selectedLead: null,
      loadingState: { isLoading: false, error: null },
      setLeads: vi.fn(),
      updateLead: vi.fn(),
      setSelectedLead: vi.fn(),
      addOpportunity: vi.fn(),
      setOpportunities: vi.fn(),
      setFilters: vi.fn(),
      resetFilters: vi.fn(),
      setLoading: vi.fn(),
      setError: vi.fn(),
      getLeadById: vi.fn(),
    });
  });

  it('calculates stats correctly', () => {
    const { result } = renderHook(() => useOpportunityFilters());

    expect(result.current.stats).toEqual({
      total: 3,
      filtered: 3,
      stageCounts: {
        proposal: 1,
        closed_won: 1,
        prospecting: 1,
      },
      totalValue: 150000, // 50000 + 75000 + 25000
      filteredValue: 150000,
    });
  });

  it('filters by search term', () => {
    vi.mocked(useLeadsStore).mockReturnValue({
      opportunityFilters: {
        search: 'tech',
        stage: [],
        sortBy: 'createdAt',
        sortOrder: 'desc',
      },
      opportunities: mockOpportunities,
      setOpportunityFilters: mockSetOpportunityFilters,
      resetOpportunityFilters: mockResetOpportunityFilters,
      // ... other properties
      leads: [],
      filters: { search: '', status: [], sortBy: 'score', sortOrder: 'desc' },
      selectedLead: null,
      loadingState: { isLoading: false, error: null },
      setLeads: vi.fn(),
      updateLead: vi.fn(),
      setSelectedLead: vi.fn(),
      addOpportunity: vi.fn(),
      setOpportunities: vi.fn(),
      setFilters: vi.fn(),
      resetFilters: vi.fn(),
      setLoading: vi.fn(),
      setError: vi.fn(),
      getLeadById: vi.fn(),
    });

    const { result } = renderHook(() => useOpportunityFilters());

    // Should filter to only TechCorp deal (name or account contains 'tech')
    expect(result.current.filteredOpportunities).toHaveLength(1);
    expect(result.current.filteredOpportunities[0].name).toBe('TechCorp Deal');
  });

  it('filters by stage', () => {
    vi.mocked(useLeadsStore).mockReturnValue({
      opportunityFilters: {
        search: '',
        stage: ['closed_won'],
        sortBy: 'createdAt',
        sortOrder: 'desc',
      },
      opportunities: mockOpportunities,
      setOpportunityFilters: mockSetOpportunityFilters,
      resetOpportunityFilters: mockResetOpportunityFilters,
      // ... other properties
      leads: [],
      filters: { search: '', status: [], sortBy: 'score', sortOrder: 'desc' },
      selectedLead: null,
      loadingState: { isLoading: false, error: null },
      setLeads: vi.fn(),
      updateLead: vi.fn(),
      setSelectedLead: vi.fn(),
      addOpportunity: vi.fn(),
      setOpportunities: vi.fn(),
      setFilters: vi.fn(),
      resetFilters: vi.fn(),
      setLoading: vi.fn(),
      setError: vi.fn(),
      getLeadById: vi.fn(),
    });

    const { result } = renderHook(() => useOpportunityFilters());

    // Should filter to only closed_won opportunities
    expect(result.current.filteredOpportunities).toHaveLength(1);
    expect(result.current.filteredOpportunities[0].stage).toBe('closed_won');
  });

  it('sorts by amount correctly', () => {
    vi.mocked(useLeadsStore).mockReturnValue({
      opportunityFilters: {
        search: '',
        stage: [],
        sortBy: 'amount',
        sortOrder: 'desc',
      },
      opportunities: mockOpportunities,
      setOpportunityFilters: mockSetOpportunityFilters,
      resetOpportunityFilters: mockResetOpportunityFilters,
      // ... other properties
      leads: [],
      filters: { search: '', status: [], sortBy: 'score', sortOrder: 'desc' },
      selectedLead: null,
      loadingState: { isLoading: false, error: null },
      setLeads: vi.fn(),
      updateLead: vi.fn(),
      setSelectedLead: vi.fn(),
      addOpportunity: vi.fn(),
      setOpportunities: vi.fn(),
      setFilters: vi.fn(),
      resetFilters: vi.fn(),
      setLoading: vi.fn(),
      setError: vi.fn(),
      getLeadById: vi.fn(),
    });

    const { result } = renderHook(() => useOpportunityFilters());

    // Should be sorted by amount descending: 75000, 50000, 25000
    expect(result.current.filteredOpportunities[0].amount).toBe(75000);
    expect(result.current.filteredOpportunities[1].amount).toBe(50000);
    expect(result.current.filteredOpportunities[2].amount).toBe(25000);
  });

  it('detects active filters correctly', () => {
    const { result } = renderHook(() => useOpportunityFilters());

    // No filters applied initially
    expect(result.current.hasActiveFilters).toBe(false);
  });

  it('calls setOpportunityFilters when updating filters', () => {
    const { result } = renderHook(() => useOpportunityFilters());

    act(() => {
      result.current.searchByName('test');
    });

    expect(mockSetOpportunityFilters).toHaveBeenCalledWith({ search: 'test' });
  });

  it('toggles stage filters correctly', () => {
    const { result } = renderHook(() => useOpportunityFilters());

    act(() => {
      result.current.toggleStageFilter('proposal');
    });

    expect(mockSetOpportunityFilters).toHaveBeenCalledWith({ stage: ['proposal'] });
  });
});
