import { Card } from '@/components/ui/card';
import { Goal, DollarSign, TrendingUp } from 'lucide-react';
import { useOpportunityFilters } from '@/hooks/use-opportunity-filters';

// Format currency
const formatCurrency = (amount: number): string => {
  if (!amount) return 'N/A';
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
};

export function OpportunitySummaryCards() {
  const { filteredOpportunities, stats } = useOpportunityFilters();

  // Calculate won opportunities and value
  const wonOpportunities = filteredOpportunities.filter((opp) => opp.stage === 'closed_won');
  const wonValue = wonOpportunities.reduce((sum, opp) => sum + (opp.amount || 0), 0);

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
      <Card className="p-4">
        <div className="mb-2 flex items-center gap-2">
          <Goal className="h-4 w-4 text-blue-600" />
          <span className="text-sm font-medium">Total Opportunities</span>
        </div>
        <div className="text-2xl font-bold">{stats.total}</div>
      </Card>

      <Card className="p-4">
        <div className="mb-2 flex items-center gap-2">
          <DollarSign className="h-4 w-4 text-green-600" />
          <span className="text-sm font-medium">Pipeline Value</span>
        </div>
        <div className="text-2xl font-bold">{formatCurrency(stats.totalValue)}</div>
      </Card>

      <Card className="p-4">
        <div className="mb-2 flex items-center gap-2">
          <TrendingUp className="h-4 w-4 text-purple-600" />
          <span className="text-sm font-medium">Won Value</span>
        </div>
        <div className="text-2xl font-bold">{formatCurrency(wonValue)}</div>
        <div className="text-muted-foreground text-xs">
          {wonOpportunities.length} opportunities
        </div>
      </Card>
    </div>
  );
}
