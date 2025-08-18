import { renderHook, act } from '@testing-library/react';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { useLeadFilters } from '../use-lead-filters';
import { useLeadsStore } from '@/stores/leads-store';
import type { Lead } from '@/types';

// Mock the store
vi.mock('@/stores/leads-store');

const mockLeads: Lead[] = [
  {
    id: 'lead-1',
    name: 'John Doe',
    company: 'TechCorp',
    email: 'john@techcorp.com',
    source: 'website',
    score: 85,
    status: 'qualified',
    createdAt: '2025-01-01T00:00:00Z',
    updatedAt: '2025-01-01T00:00:00Z',
  },
  {
    id: 'lead-2',
    name: 'Jane Smith',
    company: 'DataCorp',
    email: 'jane@datacorp.com',
    source: 'referral',
    score: 60,
    status: 'new',
    createdAt: '2025-01-02T00:00:00Z',
    updatedAt: '2025-01-02T00:00:00Z',
  },
];

describe('useLeadFilters', () => {
  const mockGetFilteredLeads = vi.fn();
  const mockSetFilters = vi.fn();
  const mockResetFilters = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();

    vi.mocked(useLeadsStore).mockReturnValue({
      filters: {
        search: '',
        status: 'all',
        sortBy: 'score',
        sortOrder: 'desc',
      },
      leads: mockLeads,
      setFilters: mockSetFilters,
      resetFilters: mockResetFilters,
      getFilteredLeads: mockGetFilteredLeads,
      // Add other required properties
      opportunities: [],
      selectedLead: null,
      loadingState: { isLoading: false, error: null },
      setLeads: vi.fn(),
      updateLead: vi.fn(),
      setSelectedLead: vi.fn(),
      addOpportunity: vi.fn(),
      setOpportunities: vi.fn(),
      setLoading: vi.fn(),
      setError: vi.fn(),
      getLeadById: vi.fn(),
    });

    mockGetFilteredLeads.mockReturnValue(mockLeads);
  });

  it('calculates stats correctly', () => {
    const { result } = renderHook(() => useLeadFilters());

    expect(result.current.stats).toEqual({
      total: 2,
      filtered: 2,
      statusCounts: {
        qualified: 1,
        new: 1,
      },
      averageScore: 73, // (85 + 60) / 2 = 72.5, rounded = 73
      highScoreLeads: 1, // Only lead-1 has score >= 80
      conversionRate: 50, // 1 qualified out of 2 total = 50%
    });
  });

  it('detects active filters correctly', () => {
    // Mock filters with search term
    vi.mocked(useLeadsStore).mockReturnValue({
      filters: {
        search: 'John',
        status: 'all',
        sortBy: 'score',
        sortOrder: 'desc',
      },
      leads: mockLeads,
      setFilters: mockSetFilters,
      resetFilters: mockResetFilters,
      getFilteredLeads: mockGetFilteredLeads,
      opportunities: [],
      selectedLead: null,
      loadingState: { isLoading: false, error: null },
      setLeads: vi.fn(),
      updateLead: vi.fn(),
      setSelectedLead: vi.fn(),
      addOpportunity: vi.fn(),
      setOpportunities: vi.fn(),
      setLoading: vi.fn(),
      setError: vi.fn(),
      getLeadById: vi.fn(),
    });

    const { result } = renderHook(() => useLeadFilters());

    expect(result.current.hasActiveFilters).toBe(true);
  });

  it('calls setFilters when updating filters', () => {
    const { result } = renderHook(() => useLeadFilters());

    act(() => {
      result.current.updateFilter('search', 'TechCorp');
    });

    expect(mockSetFilters).toHaveBeenCalledWith({ search: 'TechCorp' });
  });
});
