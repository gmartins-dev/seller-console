import { render, screen } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { describe, it, expect, vi } from 'vitest';
import { LeadsTable } from '../leads-table';
import type { Lead } from '@/types';

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

// Mock the hooks
vi.mock('@/hooks/use-lead-filters', () => ({
  useLeadFilters: () => ({
    filteredLeads: mockLeads,
    filters: {
      search: '',
      status: [],
      sortBy: 'score',
      sortOrder: 'desc',
    },
    sortBy: vi.fn(),
  }),
  useLeadSelection: () => ({
    selectedLead: null,
    selectLead: vi.fn(),
    clearSelection: vi.fn(),
    isSelected: vi.fn().mockReturnValue(false),
  }),
}));

// Mock the store to prevent real data loading
vi.mock('@/stores/leads-store', () => ({
  useLeadsStore: () => ({
    leads: mockLeads,
    opportunities: [],
    filters: {
      search: '',
      status: [],
      sortBy: 'score',
      sortOrder: 'desc',
    },
    setFilters: vi.fn(),
    resetFilters: vi.fn(),
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

describe('LeadsTable', () => {
  it('renders leads in table format', () => {
    render(
      <TestWrapper>
        <LeadsTable />
      </TestWrapper>
    );

    // Test that specific leads from mock data are present
    // TechCorp appears 3 times: mobile card, desktop table, mobile table fallback
    expect(screen.getAllByText('John Doe')).toHaveLength(2); // Mobile card + desktop table
    expect(screen.getAllByText('TechCorp', { exact: true })).toHaveLength(3); // Mobile card + desktop table + mobile table fallback
    expect(screen.getAllByText('Jane Smith')).toHaveLength(2); // Mobile card + desktop table
    expect(screen.getAllByText('DataCorp')).toHaveLength(3); // Mobile card + desktop table + mobile table fallback
  });

  it('displays correct status badges', () => {
    render(
      <TestWrapper>
        <LeadsTable />
      </TestWrapper>
    );

    // Status badges appear in both mobile and desktop views
    expect(screen.getAllByText('Qualified')).toHaveLength(2); // Mobile card + desktop table
    expect(screen.getAllByText('New')).toHaveLength(2); // Mobile card + desktop table
  });

  it('shows score values', () => {
    render(
      <TestWrapper>
        <LeadsTable />
      </TestWrapper>
    );

    expect(screen.getByText('85')).toBeInTheDocument();
    expect(screen.getByText('60')).toBeInTheDocument();
  });
});
