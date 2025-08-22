import { z } from 'zod';

// Lead schemas and types
export const LeadStatusEnum = z.enum(['new', 'contacted', 'qualified', 'unqualified', 'lost']);
export const LeadSourceEnum = z.enum(['website', 'referral', 'social', 'email', 'phone', 'other']);

export const LeadSchema = z.object({
  id: z.string(),
  name: z.string().min(1, 'Name is required'),
  company: z.string().min(1, 'Company is required'),
  email: z.string().email('Invalid email format'),
  source: LeadSourceEnum,
  score: z.number().min(0).max(100),
  status: LeadStatusEnum,
  createdAt: z.string().optional(),
  updatedAt: z.string().optional(),
});

export type Lead = z.infer<typeof LeadSchema>;
export type LeadStatus = z.infer<typeof LeadStatusEnum>;
export type LeadSource = z.infer<typeof LeadSourceEnum>;

// Opportunity schemas and types
export const OpportunityStageEnum = z.enum([
  'prospecting',
  'qualification',
  'proposal',
  'negotiation',
  'closed_won',
  'closed_lost',
]);

export const OpportunitySchema = z.object({
  id: z.string(),
  name: z.string().min(1, 'Name is required'),
  stage: OpportunityStageEnum,
  amount: z.number().optional(),
  accountName: z.string().min(1, 'Account name is required'),
  leadId: z.string().optional(),
  createdAt: z.string().optional(),
  updatedAt: z.string().optional(),
});

export type Opportunity = z.infer<typeof OpportunitySchema>;
export type OpportunityStage = z.infer<typeof OpportunityStageEnum>;

// API Response types
export interface ApiResponse<T> {
  data: T;
  success: boolean;
  message?: string;
}

// Filter and sort types
export interface LeadFilters {
  search: string;
  status: LeadStatus[];
  sortBy: 'score' | 'name' | 'company' | 'status' | 'source' | 'createdAt';
  sortOrder: 'asc' | 'desc';
}

export interface OpportunityFilters {
  search: string;
  stage: OpportunityStage[];
  sortBy: 'name' | 'stage' | 'amount' | 'accountName' | 'createdAt';
  sortOrder: 'asc' | 'desc';
}

// Form types
export const LeadFormSchema = LeadSchema.pick({
  name: true,
  company: true,
  email: true,
  source: true,
  score: true,
  status: true,
});

export type LeadFormData = z.infer<typeof LeadFormSchema>;

export const OpportunityFormSchema = OpportunitySchema.pick({
  name: true,
  stage: true,
  amount: true,
  accountName: true,
});

export type OpportunityFormData = z.infer<typeof OpportunityFormSchema>;

// Error types
export class AppError extends Error {
  public code?: string;
  public status?: number;

  constructor(message: string, code?: string, status?: number) {
    super(message);
    this.name = 'AppError';
    this.code = code;
    this.status = status;
  }
}

// Loading states
export interface LoadingState {
  isLoading: boolean;
  error: string | null;
}
