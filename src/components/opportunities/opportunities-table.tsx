import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Pagination } from '@/components/ui/pagination';
import { DollarSign, Building2, Calendar, Goal, ArrowUpDown, ArrowUp, ArrowDown } from 'lucide-react';
import { useOpportunityFilters } from '@/hooks/use-opportunity-filters';
import { cn } from '@/lib/utils';
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
  closed_lost: { label: 'Closed Lost', variant: 'destructive', color: 'bg-red-100 text-gray-800' },
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
  const {
    paginatedOpportunities,
    stats,
    filters,
    sortBy,
    currentPage,
    totalPages,
    itemsPerPage,
    totalItems,
    goToPage,
    goToNextPage,
    goToPreviousPage,
    setItemsPerPage,
  } = useOpportunityFilters();

  // Helper function to get sort icon
  const getSortIcon = (column: string) => {
    if (filters.sortBy !== column) {
      return <ArrowUpDown className="ml-2 h-4 w-4 opacity-50" />;
    }
    return filters.sortOrder === 'desc' ? (
      <ArrowDown className="ml-2 h-4 w-4" />
    ) : (
      <ArrowUp className="ml-2 h-4 w-4" />
    );
  };

  if (paginatedOpportunities.length === 0) {
    return (
      <div className="py-12 text-center">
        <div className="mb-4 flex justify-center">
          <div className="bg-muted rounded-full p-6">
            <Goal className="text-muted-foreground h-8 w-8" />
          </div>
        </div>
        <h3 className="text-foreground mb-2 text-lg font-medium">
          {stats.total === 0 ? 'No opportunities yet' : 'No opportunities match your filters'}
        </h3>
        <p className="text-muted-foreground">
          {stats.total === 0
            ? 'Convert some qualified leads to create your first opportunities.'
            : 'Try adjusting your search or filters to find what you\'re looking for.'
          }
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Mobile Card Layout */}
      <div className="md:hidden space-y-3">
        {paginatedOpportunities.map((opportunity) => (
          <div
            key={`mobile-${opportunity.id}`}
            className="bg-card rounded-lg border p-4"
          >
            <div className="space-y-3">
              <div className="flex items-start justify-between">
                <div className="flex-1 min-w-0">
                  <h3 className="font-medium text-foreground truncate mb-1">
                    {opportunity.name}
                  </h3>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Building2 className="h-3 w-3 flex-shrink-0" />
                    <span className="truncate">{opportunity.accountName}</span>
                  </div>
                </div>
                <div className="text-right flex-shrink-0 ml-2">
                  <div className="font-medium text-foreground">
                    {formatCurrency(opportunity.amount)}
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <Badge
                  variant={stageConfig[opportunity.stage].variant}
                  className={cn('text-xs', stageConfig[opportunity.stage].color)}
                >
                  {stageConfig[opportunity.stage].label}
                </Badge>
                <div className="text-sm text-muted-foreground">
                  {formatDate(opportunity.createdAt)}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Tablet & Desktop Table Layout */}
      <div className="hidden md:block">
        <div className="rounded-md border">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[250px]">
                    <button
                      className="flex items-center gap-2 hover:text-foreground"
                      onClick={() => sortBy('name')}
                    >
                      <Goal className="h-4 w-4" />
                      Opportunity
                      {getSortIcon('name')}
                    </button>
                  </TableHead>

                  <TableHead className="hidden md:table-cell">
                    <button
                      className="flex items-center gap-2 hover:text-foreground"
                      onClick={() => sortBy('accountName')}
                    >
                      <Building2 className="h-4 w-4" />
                      Account
                      {getSortIcon('accountName')}
                    </button>
                  </TableHead>

                  <TableHead className="w-[120px]">
                    <button
                      className="flex items-center gap-2 hover:text-foreground"
                      onClick={() => sortBy('stage')}
                    >
                      Stage
                      {getSortIcon('stage')}
                    </button>
                  </TableHead>

                  <TableHead className="w-[120px] text-right">
                    <button
                      className="flex items-center justify-end gap-2 hover:text-foreground ml-auto"
                      onClick={() => sortBy('amount')}
                    >
                      <DollarSign className="h-4 w-4" />
                      Amount
                      {getSortIcon('amount')}
                    </button>
                  </TableHead>

                  <TableHead className="hidden w-[120px] lg:table-cell">
                    <button
                      className="flex items-center gap-2 hover:text-foreground"
                      onClick={() => sortBy('createdAt')}
                    >
                      <Calendar className="h-4 w-4" />
                      Created
                      {getSortIcon('createdAt')}
                    </button>
                  </TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                {paginatedOpportunities.map((opportunity) => (
                  <TableRow key={opportunity.id} className="hover:bg-muted/50">
                    <TableCell>
                      <div>
                        <div className="text-foreground font-medium">{opportunity.name}</div>
                        <div className="text-muted-foreground text-sm md:hidden">
                          {opportunity.accountName}
                        </div>
                      </div>
                    </TableCell>

                    <TableCell className="hidden md:table-cell">
                      <div className="flex items-center gap-2">
                        <Building2 className="text-muted-foreground h-4 w-4" />
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
                      <div className="font-medium">{formatCurrency(opportunity.amount)}</div>
                    </TableCell>

                    <TableCell className="hidden lg:table-cell">
                      <div className="text-muted-foreground text-sm">
                        {formatDate(opportunity.createdAt)}
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      </div>

      {/* Pagination */}
      <div className="border-t pt-4">
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          itemsPerPage={itemsPerPage}
          totalItems={totalItems}
          onPageChange={goToPage}
          onItemsPerPageChange={setItemsPerPage}
          onPrevious={goToPreviousPage}
          onNext={goToNextPage}
        />
      </div>
    </div>
  );
}
