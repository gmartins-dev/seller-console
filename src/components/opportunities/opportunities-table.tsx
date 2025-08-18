import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { 
  TrendingUp, 
  DollarSign, 
  Building2, 
  Calendar,
  Target 
} from 'lucide-react';
import { useLeadsStore } from '@/stores/leads-store';
import { cn } from '@/lib/utils';
import type { OpportunityStage } from '@/types';

// Stage configurations
const stageConfig: Record<OpportunityStage, { 
  label: string; 
  variant: 'default' | 'secondary' | 'destructive' | 'outline'; 
  color: string;
}> = {
  prospecting: { label: 'Prospecting', variant: 'outline', color: 'bg-blue-100 text-blue-800' },
  qualification: { label: 'Qualification', variant: 'secondary', color: 'bg-yellow-100 text-yellow-800' },
  proposal: { label: 'Proposal', variant: 'default', color: 'bg-purple-100 text-purple-800' },
  negotiation: { label: 'Negotiation', variant: 'default', color: 'bg-orange-100 text-orange-800' },
  closed_won: { label: 'Closed Won', variant: 'default', color: 'bg-green-100 text-green-800' },
  closed_lost: { label: 'Closed Lost', variant: 'destructive', color: 'bg-red-100 text-red-800' },
};

// Format currency
const formatCurrency = (amount: number | undefined): string => {
  if (!amount) return 'N/A';
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
};

// Format date
const formatDate = (dateString: string | undefined): string => {
  if (!dateString) return 'N/A';
  return new Date(dateString).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
};

export function OpportunitiesTable() {
  const opportunities = useLeadsStore((state) => state.opportunities);

  if (opportunities.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="flex justify-center mb-4">
          <div className="rounded-full bg-muted p-6">
            <Target className="w-8 h-8 text-muted-foreground" />
          </div>
        </div>
        <h3 className="text-lg font-medium text-foreground mb-2">
          No opportunities yet
        </h3>
        <p className="text-muted-foreground">
          Convert some qualified leads to create your first opportunities.
        </p>
      </div>
    );
  }

  // Calculate totals
  const totalValue = opportunities.reduce((sum, opp) => sum + (opp.amount || 0), 0);
  const wonOpportunities = opportunities.filter(opp => opp.stage === 'closed_won');
  const wonValue = wonOpportunities.reduce((sum, opp) => sum + (opp.amount || 0), 0);

  return (
    <div className="space-y-4">
      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-card border rounded-lg p-4">
          <div className="flex items-center gap-2 mb-2">
            <Target className="w-4 h-4 text-blue-600" />
            <span className="text-sm font-medium">Total Opportunities</span>
          </div>
          <div className="text-2xl font-bold">{opportunities.length}</div>
        </div>

        <div className="bg-card border rounded-lg p-4">
          <div className="flex items-center gap-2 mb-2">
            <DollarSign className="w-4 h-4 text-green-600" />
            <span className="text-sm font-medium">Pipeline Value</span>
          </div>
          <div className="text-2xl font-bold">{formatCurrency(totalValue)}</div>
        </div>

        <div className="bg-card border rounded-lg p-4">
          <div className="flex items-center gap-2 mb-2">
            <TrendingUp className="w-4 h-4 text-purple-600" />
            <span className="text-sm font-medium">Won Value</span>
          </div>
          <div className="text-2xl font-bold">{formatCurrency(wonValue)}</div>
          <div className="text-xs text-muted-foreground">
            {wonOpportunities.length} opportunities
          </div>
        </div>
      </div>

      {/* Opportunities Table */}
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[250px]">
                <div className="flex items-center gap-2">
                  <Target className="w-4 h-4" />
                  Opportunity
                </div>
              </TableHead>
              
              <TableHead className="hidden md:table-cell">
                <div className="flex items-center gap-2">
                  <Building2 className="w-4 h-4" />
                  Account
                </div>
              </TableHead>
              
              <TableHead className="w-[120px]">Stage</TableHead>
              
              <TableHead className="w-[120px] text-right">
                <div className="flex items-center justify-end gap-2">
                  <DollarSign className="w-4 h-4" />
                  Amount
                </div>
              </TableHead>
              
              <TableHead className="hidden lg:table-cell w-[120px]">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  Created
                </div>
              </TableHead>
            </TableRow>
          </TableHeader>
          
          <TableBody>
            {opportunities.map((opportunity) => (
              <TableRow key={opportunity.id} className="hover:bg-muted/50">
                <TableCell>
                  <div>
                    <div className="font-medium text-foreground">
                      {opportunity.name}
                    </div>
                    <div className="text-sm text-muted-foreground md:hidden">
                      {opportunity.accountName}
                    </div>
                  </div>
                </TableCell>
                
                <TableCell className="hidden md:table-cell">
                  <div className="flex items-center gap-2">
                    <Building2 className="w-4 h-4 text-muted-foreground" />
                    <span className="font-medium">{opportunity.accountName}</span>
                  </div>
                </TableCell>
                
                <TableCell>
                  <Badge 
                    variant={stageConfig[opportunity.stage].variant}
                    className={cn('text-xs', stageConfig[opportunity.stage].color)}
                  >
                    {stageConfig[opportunity.stage].label}
                  </Badge>
                </TableCell>
                
                <TableCell className="text-right">
                  <div className="font-medium">
                    {formatCurrency(opportunity.amount)}
                  </div>
                </TableCell>
                
                <TableCell className="hidden lg:table-cell">
                  <div className="text-sm text-muted-foreground">
                    {formatDate(opportunity.createdAt)}
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Stage Distribution */}
      <div className="bg-card border rounded-lg p-4">
        <h4 className="text-sm font-medium mb-3">Stage Distribution</h4>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2">
          {Object.entries(stageConfig).map(([stage, config]) => {
            const count = opportunities.filter(opp => opp.stage === stage).length;
            const percentage = opportunities.length > 0 
              ? Math.round((count / opportunities.length) * 100) 
              : 0;
            
            return (
              <div key={stage} className="text-center p-2 rounded border">
                <div className="text-lg font-bold">{count}</div>
                <div className="text-xs text-muted-foreground mb-1">
                  {config.label}
                </div>
                <div className="text-xs text-muted-foreground">
                  {percentage}%
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
