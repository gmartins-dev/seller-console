import type { Lead, Opportunity, ApiResponse } from '@/types';
import { LeadSchema, OpportunitySchema, AppError } from '@/types';
import leadsData from '@/data/leads.json';

// Simulate network latency
const simulateLatency = (min = 300, max = 1000): Promise<void> => {
  const delay = Math.floor(Math.random() * (max - min + 1)) + min;
  return new Promise((resolve) => setTimeout(resolve, delay));
};

// Simulate random failures for testing error handling
const simulateFailure = (failureRate = 0.1): boolean => {
  return Math.random() < failureRate;
};

class ApiService {
  private leads: Lead[] = [];
  private opportunities: Opportunity[] = [];

  constructor() {
    // Initialize with mock data
    this.initializeData();
  }

  private initializeData(): void {
    try {
      // Validate and parse leads data
      this.leads = leadsData.map((lead) => {
        const parsed = LeadSchema.parse(lead);
        return parsed;
      });
    } catch (error) {
      console.error('Failed to initialize leads data:', error);
      this.leads = [];
    }
  }

  // Leads API
  async getLeads(): Promise<ApiResponse<Lead[]>> {
    await simulateLatency();
    
    if (simulateFailure(0.05)) {
      throw new AppError('Failed to fetch leads', 'FETCH_ERROR', 500);
    }

    return {
      data: [...this.leads],
      success: true,
      message: 'Leads fetched successfully',
    };
  }

  async getLeadById(id: string): Promise<ApiResponse<Lead | null>> {
    await simulateLatency(100, 300);
    
    if (simulateFailure(0.02)) {
      throw new AppError('Failed to fetch lead', 'FETCH_ERROR', 500);
    }

    const lead = this.leads.find((l) => l.id === id);
    
    return {
      data: lead || null,
      success: true,
      message: lead ? 'Lead found' : 'Lead not found',
    };
  }

  async updateLead(id: string, updates: Partial<Lead>): Promise<ApiResponse<Lead>> {
    await simulateLatency(200, 500);
    
    // Simulate validation failure
    if (simulateFailure(0.1)) {
      throw new AppError('Failed to update lead', 'UPDATE_ERROR', 400);
    }

    const leadIndex = this.leads.findIndex((l) => l.id === id);
    
    if (leadIndex === -1) {
      throw new AppError('Lead not found', 'NOT_FOUND', 404);
    }

    // Validate updates
    const currentLead = this.leads[leadIndex];
    const updatedLead = { ...currentLead, ...updates, updatedAt: new Date().toISOString() };
    
    try {
      const validatedLead = LeadSchema.parse(updatedLead);
      this.leads[leadIndex] = validatedLead;
      
      return {
        data: validatedLead,
        success: true,
        message: 'Lead updated successfully',
      };
    } catch (error) {
      throw new AppError('Invalid lead data', 'VALIDATION_ERROR', 400);
    }
  }

  // Opportunities API
  async getOpportunities(): Promise<ApiResponse<Opportunity[]>> {
    await simulateLatency();
    
    if (simulateFailure(0.05)) {
      throw new AppError('Failed to fetch opportunities', 'FETCH_ERROR', 500);
    }

    return {
      data: [...this.opportunities],
      success: true,
      message: 'Opportunities fetched successfully',
    };
  }

  async createOpportunity(opportunityData: Omit<Opportunity, 'id' | 'createdAt' | 'updatedAt'>): Promise<ApiResponse<Opportunity>> {
    await simulateLatency(300, 700);
    
    // Simulate creation failure
    if (simulateFailure(0.08)) {
      throw new AppError('Failed to create opportunity', 'CREATE_ERROR', 500);
    }

    try {
      const opportunity: Opportunity = {
        ...opportunityData,
        id: `opp-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      const validatedOpportunity = OpportunitySchema.parse(opportunity);
      this.opportunities.push(validatedOpportunity);

      return {
        data: validatedOpportunity,
        success: true,
        message: 'Opportunity created successfully',
      };
    } catch (error) {
      throw new AppError('Invalid opportunity data', 'VALIDATION_ERROR', 400);
    }
  }

  async convertLeadToOpportunity(
    leadId: string, 
    opportunityData: Omit<Opportunity, 'id' | 'leadId' | 'createdAt' | 'updatedAt'>
  ): Promise<ApiResponse<{ lead: Lead; opportunity: Opportunity }>> {
    await simulateLatency(400, 800);
    
    // Simulate conversion failure
    if (simulateFailure(0.1)) {
      throw new AppError('Failed to convert lead to opportunity', 'CONVERSION_ERROR', 500);
    }

    const lead = this.leads.find((l) => l.id === leadId);
    if (!lead) {
      throw new AppError('Lead not found', 'NOT_FOUND', 404);
    }

    if (lead.status === 'lost' || lead.status === 'unqualified') {
      throw new AppError('Cannot convert unqualified or lost lead', 'BUSINESS_RULE_ERROR', 400);
    }

    try {
      // Create opportunity
      const opportunity: Opportunity = {
        ...opportunityData,
        id: `opp-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        leadId,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      const validatedOpportunity = OpportunitySchema.parse(opportunity);
      this.opportunities.push(validatedOpportunity);

      // Update lead status
      const updatedLead = { ...lead, status: 'qualified' as const, updatedAt: new Date().toISOString() };
      const leadIndex = this.leads.findIndex((l) => l.id === leadId);
      this.leads[leadIndex] = updatedLead;

      return {
        data: { lead: updatedLead, opportunity: validatedOpportunity },
        success: true,
        message: 'Lead converted to opportunity successfully',
      };
    } catch (error) {
      throw new AppError('Invalid data during conversion', 'VALIDATION_ERROR', 400);
    }
  }

  // Utility methods for testing
  async resetData(): Promise<void> {
    this.initializeData();
    this.opportunities = [];
  }

  async addSampleOpportunities(): Promise<void> {
    const sampleOpportunities: Opportunity[] = [
      {
        id: 'opp-001',
        name: 'TechCorp Integration Project',
        stage: 'proposal',
        amount: 150000,
        accountName: 'TechCorp Brasil',
        leadId: 'lead-001',
        createdAt: '2025-01-20T10:00:00Z',
        updatedAt: '2025-01-22T15:30:00Z',
      },
      {
        id: 'opp-002',
        name: 'Digital Transformation Initiative',
        stage: 'negotiation',
        amount: 250000,
        accountName: 'Inovação Digital',
        leadId: 'lead-002',
        createdAt: '2025-01-18T14:20:00Z',
        updatedAt: '2025-01-24T11:45:00Z',
      },
    ];

    this.opportunities.push(...sampleOpportunities);
  }
}

// Export singleton instance
export const apiService = new ApiService();

// Export individual functions for easier testing and use
export const leadsApi = {
  getLeads: () => apiService.getLeads(),
  getLeadById: (id: string) => apiService.getLeadById(id),
  updateLead: (id: string, updates: Partial<Lead>) => apiService.updateLead(id, updates),
};

export const opportunitiesApi = {
  getOpportunities: () => apiService.getOpportunities(),
  createOpportunity: (data: Omit<Opportunity, 'id' | 'createdAt' | 'updatedAt'>) =>
    apiService.createOpportunity(data),
  convertLeadToOpportunity: (
    leadId: string,
    data: Omit<Opportunity, 'id' | 'leadId' | 'createdAt' | 'updatedAt'>
  ) => apiService.convertLeadToOpportunity(leadId, data),
};

export { AppError };
