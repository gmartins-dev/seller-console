import { Card } from '@/components/ui/card';
import { useOpportunityFilters } from '@/hooks/use-opportunity-filters';
import type { OpportunityStage } from '@/types';

// Stage configurations
const stageConfig: Record<
  OpportunityStage,
  {
    label: string;
    variant: 'default' | 'secondary' | 'destructive' | 'outline';
    color: string;
  }
> = {
  prospecting: { label: 'Prospecting', variant: 'outline', color: 'bg-blue-100 text-blue-800' },
  qualification: {
    label: 'Qualification',
    variant: 'secondary',
    color: 'bg-yellow-100 text-yellow-800',
  },
  proposal: { label: 'Proposal', variant: 'default', color: 'bg-purple-100 text-purple-800' },
  negotiation: { label: 'Negotiation', variant: 'default', color: 'bg-orange-100 text-orange-800' },
  closed_won: { label: 'Closed Won', variant: 'default', color: 'bg-green-100 text-green-800' },
  closed_lost: { label: 'Closed Lost', variant: 'destructive', color: 'bg-red-100 text-red-800' },
};

export function OpportunityStageDistribution() {
  const { stats } = useOpportunityFilters();

  return (
    <Card className="p-4">
      <h4 className="mb-3 text-sm font-medium">Stage Distribution</h4>
      <div className="grid grid-cols-2 gap-2 md:grid-cols-3 lg:grid-cols-6">
        {Object.entries(stageConfig).map(([stage, config]) => {
          const count = stats.stageCounts[stage] || 0;
          const percentage =
            stats.total > 0 ? Math.round((count / stats.total) * 100) : 0;

          return (
            <div key={stage} className="rounded border p-2 text-center">
              <div className="text-lg font-bold">{count}</div>
              <div className="text-muted-foreground mb-1 text-xs">{config.label}</div>
              <div className="text-muted-foreground text-xs">{percentage}%</div>
            </div>
          );
        })}
      </div>
    </Card>
  );
}
