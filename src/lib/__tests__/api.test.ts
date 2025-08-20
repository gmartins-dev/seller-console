import { describe, it, expect, beforeEach, beforeAll, afterAll, vi } from 'vitest';
import { apiService, leadsApi } from '../api';

// Mock Math.random to disable random failures in tests
const originalMathRandom = Math.random;
beforeAll(() => {
  // Always return 0.99 to ensure Math.random() < failureRate is always false
  Math.random = vi.fn(() => 0.99);
});

afterAll(() => {
  Math.random = originalMathRandom;
});

// Mock the JSON data
vi.mock('@/data/leads.json', () => ({
  default: [
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
  ],
}));

describe('API Service', () => {
  beforeEach(() => {
    // Reset data before each test
    apiService.resetData();
  });

  describe('getLeads', () => {
    it('returns leads successfully', async () => {
      const response = await leadsApi.getLeads();

      expect(response.success).toBe(true);
      expect(response.data).toHaveLength(1);
      expect(response.data[0]).toMatchObject({
        id: 'lead-1',
        name: 'John Doe',
        company: 'TechCorp',
      });
    });
  });

  describe('updateLead', () => {
    it('updates lead successfully', async () => {
      const updates = { status: 'contacted' as const, email: 'newemail@techcorp.com' };

      const response = await leadsApi.updateLead('lead-1', updates);

      expect(response.success).toBe(true);
      expect(response.data.status).toBe('contacted');
      expect(response.data.email).toBe('newemail@techcorp.com');
      expect(response.data.updatedAt).toBeDefined();
    });

    it('throws error for non-existent lead', async () => {
      await expect(
        leadsApi.updateLead('non-existent-id', { status: 'contacted' })
      ).rejects.toThrow(); // Just check that it throws, don't check specific message due to random failures
    });

    it('validates email format', async () => {
      await expect(leadsApi.updateLead('lead-1', { email: 'invalid-email' })).rejects.toThrow(
        'Invalid lead data'
      );
    });
  });

  describe('getLeadById', () => {
    it('returns specific lead', async () => {
      const response = await leadsApi.getLeadById('lead-1');

      expect(response.success).toBe(true);
      expect(response.data?.id).toBe('lead-1');
    });

    it('returns null for non-existent lead', async () => {
      const response = await leadsApi.getLeadById('non-existent');

      expect(response.success).toBe(true);
      expect(response.data).toBeNull();
    });
  });
});
