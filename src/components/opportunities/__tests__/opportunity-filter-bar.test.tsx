import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { OpportunityFilterBar } from '../opportunity-filter-bar';
import { useOpportunityFilters } from '@/hooks/use-opportunity-filters';

// Mock the hook
vi.mock('@/hooks/use-opportunity-filters');

describe('OpportunityFilterBar', () => {
  const mockProps = {
    searchByName: vi.fn(),
    addStageFilter: vi.fn(),
    removeStageFilter: vi.fn(),
    toggleStageFilter: vi.fn(),
    clearSearch: vi.fn(),
    clearStageFilter: vi.fn(),
    sortBy: vi.fn(),
    reset: vi.fn(),
    clearAllFilters: vi.fn(), // for backwards compatibility but not used
    resetOpportunityFilters: vi.fn(),
    setOpportunityFilters: vi.fn(),
    updateFilter: vi.fn(),
    hasActiveFilters: false,
    filteredOpportunities: [],
    filters: {
      search: '',
      stage: [],
      sortBy: 'createdAt' as const,
      sortOrder: 'desc' as const,
    },
    stats: {
      total: 10,
      filtered: 10,
      stageCounts: {},
      totalValue: 0,
      filteredValue: 0,
    },
  };

  beforeEach(() => {
    vi.clearAllMocks();
    vi.mocked(useOpportunityFilters).mockReturnValue(mockProps);
  });

  it('renders search input', () => {
    render(<OpportunityFilterBar />);
    
    expect(screen.getByPlaceholderText('Search opportunities by name or account...')).toBeInTheDocument();
  });

  it('renders stage filter dropdown', () => {
    render(<OpportunityFilterBar />);
    
    expect(screen.getByText('Filter by stage')).toBeInTheDocument();
  });

  it('renders sort selector', () => {
    render(<OpportunityFilterBar />);
    
    expect(screen.getByText('Created')).toBeInTheDocument(); // Default sort option
  });

  it('calls searchByName when typing in search input', () => {
    render(<OpportunityFilterBar />);
    
    const searchInput = screen.getByPlaceholderText('Search opportunities by name or account...');
    fireEvent.change(searchInput, { target: { value: 'test search' } });
    
    expect(mockProps.searchByName).toHaveBeenCalledWith('test search');
  });

  it('shows active stage filters as badges', () => {
    vi.mocked(useOpportunityFilters).mockReturnValue({
      ...mockProps,
      filters: {
        ...mockProps.filters,
        stage: ['proposal', 'closed_won'],
      },
      hasActiveFilters: true,
    });

    render(<OpportunityFilterBar />);
    
    expect(screen.getByText('Stage: proposal')).toBeInTheDocument();
    expect(screen.getByText('Stage: closed won')).toBeInTheDocument();
  });

  it('shows clear all filters button when filters are active', () => {
    vi.mocked(useOpportunityFilters).mockReturnValue({
      ...mockProps,
      hasActiveFilters: true,
    });

    render(<OpportunityFilterBar />);
    
    expect(screen.getByText('Clear all')).toBeInTheDocument();
  });

  it('calls reset when clear all button is clicked', () => {
    vi.mocked(useOpportunityFilters).mockReturnValue({
      ...mockProps,
      hasActiveFilters: true,
    });

    render(<OpportunityFilterBar />);
    
    const clearButton = screen.getByText('Clear all');
    fireEvent.click(clearButton);
    
    expect(mockProps.reset).toHaveBeenCalled();
  });

  it('calls removeStageFilter when removing a stage badge', () => {
    vi.mocked(useOpportunityFilters).mockReturnValue({
      ...mockProps,
      filters: {
        ...mockProps.filters,
        stage: ['proposal'],
      },
      hasActiveFilters: true,
    });

    render(<OpportunityFilterBar />);
    
    // Find the X button on the proposal badge - it's an unnamed button
    const badgeText = screen.getByText('Stage: proposal');
    const badge = badgeText.closest('.gap-1'); // The badge container
    const removeButton = badge?.querySelector('button');
    
    if (removeButton) {
      fireEvent.click(removeButton);
      expect(mockProps.removeStageFilter).toHaveBeenCalledWith('proposal');
    }
  });

  it('displays search term in the input', () => {
    vi.mocked(useOpportunityFilters).mockReturnValue({
      ...mockProps,
      filters: {
        ...mockProps.filters,
        search: 'test company',
      },
    });

    render(<OpportunityFilterBar />);
    
    const searchInput = screen.getByDisplayValue('test company');
    expect(searchInput).toBeInTheDocument();
  });
});
