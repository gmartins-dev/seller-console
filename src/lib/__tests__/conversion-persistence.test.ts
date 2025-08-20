import { describe, it, expect, beforeEach, beforeAll, afterAll, vi } from 'vitest';
import { apiService } from '../api';

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

// Mock Math.random to disable random failures in tests
const originalMathRandom = Math.random;
beforeAll(() => {
  // Always return 0.99 to ensure Math.random() < failureRate is always false
  Math.random = vi.fn(() => 0.99);
});

afterAll(() => {
  Math.random = originalMathRandom;
});

describe('Lead Conversion Persistence Integration', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    apiService.resetData();
  });

  it('should persist lead conversion to opportunity', async () => {
    // Get initial leads
    const initialLeads = await apiService.getLeads();
    expect(initialLeads.success).toBe(true);
    
    const leadToConvert = initialLeads.data[0];
    if (leadToConvert) {
      // Convert lead to opportunity
      const conversionData = {
        name: 'Test Opportunity',
        accountName: leadToConvert.company,
        stage: 'qualification' as const,
        amount: 50000,
      };

      const conversionResult = await apiService.convertLeadToOpportunity(
        leadToConvert.id,
        conversionData
      );

      expect(conversionResult.success).toBe(true);

      // Verify persistence calls were made
      expect(localStorageMock.setItem).toHaveBeenCalledWith(
        'api-leads-data',
        expect.any(String)
      );
      expect(localStorageMock.setItem).toHaveBeenCalledWith(
        'api-opportunities-data',
        expect.stringContaining('Test Opportunity')
      );

      // Verify the lead status was updated to qualified (conversion keeps lead as qualified)
      const updatedLeads = await apiService.getLeads();
      const convertedLead = updatedLeads.data.find(l => l.id === leadToConvert.id);
      expect(convertedLead?.status).toBe('qualified');

      // Verify the opportunity was created
      const opportunities = await apiService.getOpportunities();
      const createdOpportunity = opportunities.data.find(
        o => o.leadId === leadToConvert.id
      );
      expect(createdOpportunity).toBeDefined();
      expect(createdOpportunity?.name).toBe('Test Opportunity');
    }
  });

  it('should export and import data correctly', async () => {
    // Add some test data
    await apiService.createOpportunity({
      name: 'Export Test Opportunity',
      accountName: 'Test Corp',
      stage: 'qualification',
      amount: 25000,
    });

    // Export data
    const exportedData = await apiService.exportData();
    expect(exportedData).toHaveProperty('leads');
    expect(exportedData).toHaveProperty('opportunities');
    expect(exportedData).toHaveProperty('exportedAt');

    // Clear data
    await apiService.resetData();

    // Import data back
    await apiService.importData({
      leads: exportedData.leads,
      opportunities: exportedData.opportunities,
    });

    // Verify data was restored
    const restoredOpportunities = await apiService.getOpportunities();
    const testOpportunity = restoredOpportunities.data.find(
      o => o.name === 'Export Test Opportunity'
    );
    expect(testOpportunity).toBeDefined();

    // Verify persistence was called during import
    expect(localStorageMock.setItem).toHaveBeenCalledWith(
      'api-opportunities-data',
      expect.stringContaining('Export Test Opportunity')
    );
  });

  it('should provide storage information', () => {
    const storageInfo = apiService.getStorageInfo();
    
    expect(storageInfo).toHaveProperty('leads');
    expect(storageInfo).toHaveProperty('opportunities');
    expect(storageInfo).toHaveProperty('totalSize');
    expect(typeof storageInfo.leads).toBe('number');
    expect(typeof storageInfo.opportunities).toBe('number');
    expect(storageInfo.totalSize).toMatch(/\d+\.\d+ KB/);
  });
});
