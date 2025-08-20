import { Search, Filter, SortAsc, SortDesc, X, ChevronDown } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuCheckboxItem,
  DropdownMenuTrigger,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu';
import { useOpportunityFilters } from '@/hooks/use-opportunity-filters';
import type { OpportunityStage } from '@/types';

export function OpportunityFilterBar() {
  const {
    filters,
    stats,
    hasActiveFilters,
    searchByName,
    toggleStageFilter,
    removeStageFilter,
    sortBy,
    clearSearch,
    clearStageFilter,
    reset,
  } = useOpportunityFilters();

  const stageOptions = [
    { value: 'prospecting' as OpportunityStage, label: 'Prospecting', count: stats.stageCounts.prospecting || 0 },
    { value: 'qualification' as OpportunityStage, label: 'Qualification', count: stats.stageCounts.qualification || 0 },
    { value: 'proposal' as OpportunityStage, label: 'Proposal', count: stats.stageCounts.proposal || 0 },
    { value: 'negotiation' as OpportunityStage, label: 'Negotiation', count: stats.stageCounts.negotiation || 0 },
    { value: 'closed_won' as OpportunityStage, label: 'Closed Won', count: stats.stageCounts.closed_won || 0 },
    { value: 'closed_lost' as OpportunityStage, label: 'Closed Lost', count: stats.stageCounts.closed_lost || 0 },
  ];

  const sortOptions = [
    { value: 'name', label: 'Name' },
    { value: 'accountName', label: 'Account' },
    { value: 'stage', label: 'Stage' },
    { value: 'amount', label: 'Amount' },
    { value: 'createdAt', label: 'Created' },
  ];

  return (
    <div className="space-y-4">
      {/* Search and Filters Row */}
      <div className="flex flex-col gap-4 sm:flex-row">
        {/* Search Input */}
        <div className="relative flex-1">
          <Search className="text-muted-foreground absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 transform" />
          <Input
            placeholder="Search opportunities by name or account..."
            value={filters.search}
            onChange={(e) => searchByName(e.target.value)}
            className="pr-10 pl-10"
          />
          {filters.search && (
            <Button
              variant="ghost"
              size="sm"
              onClick={clearSearch}
              className="absolute top-1/2 right-1 h-6 w-6 -translate-y-1/2 transform p-0"
            >
              <X className="h-3 w-3" />
            </Button>
          )}
        </div>

        {/* Stage Filter */}
        <div className="w-full sm:w-48">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="w-full justify-between">
                <div className="flex items-center">
                  <Filter className="mr-2 h-4 w-4" />
                  {filters.stage.length === 0
                    ? 'Filter by stage'
                    : `${filters.stage.length} stage${filters.stage.length > 1 ? 's' : ''} selected`
                  }
                </div>
                <ChevronDown className="h-4 w-4 opacity-50" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="start">
              <DropdownMenuLabel>Filter by Stage</DropdownMenuLabel>
              <DropdownMenuSeparator />
              {stageOptions.map((option) => (
                <DropdownMenuCheckboxItem
                  key={option.value}
                  checked={filters.stage.includes(option.value)}
                  onCheckedChange={() => toggleStageFilter(option.value)}
                >
                  <div className="flex w-full items-center justify-between">
                    <span>{option.label}</span>
                    <Badge variant="secondary" className="ml-2">
                      {option.count}
                    </Badge>
                  </div>
                </DropdownMenuCheckboxItem>
              ))}
              {filters.stage.length > 0 && (
                <>
                  <DropdownMenuSeparator />
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={clearStageFilter}
                    className="w-full justify-center"
                  >
                    Clear all stage filters
                  </Button>
                </>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* Sort */}
        <div className="w-full sm:w-48">
          <Select
            value={filters.sortBy}
            onValueChange={(value) => sortBy(value as typeof filters.sortBy)}
          >
            <SelectTrigger>
              {filters.sortOrder === 'desc' ? (
                <SortDesc className="mr-2 h-4 w-4" />
              ) : (
                <SortAsc className="mr-2 h-4 w-4" />
              )}
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              {sortOptions.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Active Filters and Stats */}
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-wrap items-center gap-2">
          {hasActiveFilters && (
            <>
              <span className="text-muted-foreground text-sm">Active filters:</span>

              {filters.search && (
                <Badge variant="secondary" className="gap-1">
                  Search: "{filters.search}"
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={clearSearch}
                    className="h-4 w-4 p-0 hover:bg-transparent"
                  >
                    <X className="h-3 w-3" />
                  </Button>
                </Badge>
              )}

              {filters.stage.length > 0 &&
                filters.stage.map((stage) => (
                  <Badge key={stage} variant="secondary" className="gap-1">
                    Stage: {stage.replace('_', ' ')}
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removeStageFilter(stage)}
                      className="h-4 w-4 p-0 hover:bg-transparent"
                    >
                      <X className="h-3 w-3" />
                    </Button>
                  </Badge>
                ))
              }

              <Button variant="ghost" size="sm" onClick={reset}>
                Clear all
              </Button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
