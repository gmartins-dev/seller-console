import { describe, it, expect, beforeEach, vi } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useLeadsStore } from '../leads-store';
import type { Lead, Opportunity } from '@/types';

// Mock localStorage
const localStorageMock = {
  getItem: vi.fn(),
  setItem: vi.fn(),
  removeItem: vi.fn(),
  clear: vi.fn(),
};

Object.defineProperty(window, 'localStorage', {
  value: localStorageMock,
});

const mockLead: Lead = {
  id: 'test-lead-1',
  name: 'Test Lead',
  company: 'Test Corp',
  email: 'test@testcorp.com',
  source: 'website',
  score: 85,
  status: 'new',
  createdAt: '2025-01-01T00:00:00Z',
  updatedAt: '2025-01-01T00:00:00Z',
};

const mockOpportunity: Opportunity = {
  id: 'test-opp-1',
  name: 'Test Opportunity',
  accountName: 'Test Corp',
  stage: 'qualification',
  amount: 50000,
  leadId: 'test-lead-1',
  createdAt: '2025-01-01T00:00:00Z',
  updatedAt: '2025-01-01T00:00:00Z',
};

describe('LeadsStore Persistence', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    // Reset the store state
    useLeadsStore.getState().setLeads([]);
    useLeadsStore.getState().setOpportunities([]);
  });

  it('should persist leads to localStorage when leads are added', () => {
    const { result } = renderHook(() => useLeadsStore());

    act(() => {
      result.current.setLeads([mockLead]);
    });

    // Verify localStorage.setItem was called with the correct data
    expect(localStorageMock.setItem).toHaveBeenCalledWith(
      'leads-storage',
      expect.stringContaining(mockLead.id)
    );
  });

  it('should persist opportunities to localStorage when opportunities are added', () => {
    const { result } = renderHook(() => useLeadsStore());

    act(() => {
      result.current.setOpportunities([mockOpportunity]);
    });

    // Verify localStorage.setItem was called with the correct data
    expect(localStorageMock.setItem).toHaveBeenCalledWith(
      'leads-storage',
      expect.stringContaining(mockOpportunity.id)
    );
  });

  it('should persist filters when they are updated', () => {
    const { result } = renderHook(() => useLeadsStore());

    act(() => {
      result.current.setFilters({
        search: 'test search',
        status: ['new'],
        sortBy: 'name',
        sortOrder: 'asc',
      });
    });

    // Verify localStorage.setItem was called
    expect(localStorageMock.setItem).toHaveBeenCalledWith(
      'leads-storage',
      expect.stringContaining('test search')
    );
  });

  it('should verify localStorage integration exists', () => {
    const { result } = renderHook(() => useLeadsStore());

    // Test that the store has localStorage integration by checking if setItem is called
    act(() => {
      result.current.setLeads([mockLead]);
    });

    // The store should attempt to persist data (even if mocked)
    expect(localStorageMock.setItem).toHaveBeenCalled();
  });

  it('should handle corrupted localStorage data gracefully', () => {
    // This test verifies the store doesn't crash with invalid data
    localStorageMock.getItem.mockReturnValue('invalid json');

    // Should not throw an error and should provide default state
    const { result } = renderHook(() => useLeadsStore());

    expect(result.current.leads).toEqual([]);
    expect(result.current.opportunities).toEqual([]);
  });

  it('should handle missing localStorage data gracefully', () => {
    localStorageMock.getItem.mockReturnValue(null);

    const { result } = renderHook(() => useLeadsStore());

    expect(result.current.leads).toEqual([]);
    expect(result.current.opportunities).toEqual([]);
  });
});
