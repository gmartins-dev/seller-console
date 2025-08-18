import { render, screen } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { describe, it, expect, vi } from 'vitest';
import { LeadsFilterBar } from '../leads-filter-bar';

// Mock the custom hook
vi.mock('@/hooks/use-lead-filters', () => ({
  useLeadFilters: () => ({
    filters: {
      search: '',
      status: 'all',
      sortBy: 'score',
      sortOrder: 'desc',
    },
    filteredLeads: [],
    stats: {
      total: 15,
      filtered: 15,
      statusCounts: {
        new: 5,
        contacted: 4,
        qualified: 3,
        proposal: 2,
        negotiation: 1,
      },
      averageScore: 75,
      highScoreLeads: 8,
      conversionRate: 23.5,
    },
    setSearchTerm: vi.fn(),
    setStatusFilter: vi.fn(),
    setSortBy: vi.fn(),
    clearFilters: vi.fn(),
    hasActiveFilters: false,
  }),
}));

const TestWrapper = ({ children }: { children: React.ReactNode }) => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: { retry: false },
      mutations: { retry: false },
    },
  });

  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
};

describe('LeadsFilterBar', () => {
  it('renders search input', () => {
    render(
      <TestWrapper>
        <LeadsFilterBar />
      </TestWrapper>
    );

    expect(screen.getByPlaceholderText(/search leads/i)).toBeInTheDocument();
  });
});
