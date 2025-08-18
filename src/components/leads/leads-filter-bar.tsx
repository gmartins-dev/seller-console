import { Search, Filter, SortAsc, SortDesc, X } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useLeadFilters } from '@/hooks/use-lead-filters';
import type { LeadStatus } from '@/types';

export function LeadsFilterBar() {
  const {
    filters,
    stats,
    hasActiveFilters,
    searchByName,
    filterByStatus,
    sortBy,
    clearSearch,
    clearStatusFilter,
    reset,
  } = useLeadFilters();

  const statusOptions = [
    { value: 'all', label: 'All Status', count: stats.total },
    { value: 'new', label: 'New', count: stats.statusCounts.new || 0 },
    { value: 'contacted', label: 'Contacted', count: stats.statusCounts.contacted || 0 },
    { value: 'qualified', label: 'Qualified', count: stats.statusCounts.qualified || 0 },
    { value: 'unqualified', label: 'Unqualified', count: stats.statusCounts.unqualified || 0 },
    { value: 'lost', label: 'Lost', count: stats.statusCounts.lost || 0 },
  ];

  const sortOptions = [
    { value: 'score', label: 'Score' },
    { value: 'name', label: 'Name' },
    { value: 'company', label: 'Company' },
    { value: 'createdAt', label: 'Created' },
  ];

  return (
    <div className="space-y-4">
      {/* Search and Filters Row */}
      <div className="flex flex-col sm:flex-row gap-4">
        {/* Search Input */}
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search leads by name or company..."
            value={filters.search}
            onChange={(e) => searchByName(e.target.value)}
            className="pl-10 pr-10"
          />
          {filters.search && (
            <Button
              variant="ghost"
              size="sm"
              onClick={clearSearch}
              className="absolute right-1 top-1/2 transform -translate-y-1/2 h-6 w-6 p-0"
            >
              <X className="w-3 h-3" />
            </Button>
          )}
        </div>

        {/* Status Filter */}
        <div className="w-full sm:w-48">
          <Select value={filters.status} onValueChange={(value) => filterByStatus(value as LeadStatus | 'all')}>
            <SelectTrigger>
              <Filter className="w-4 h-4 mr-2" />
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              {statusOptions.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  <div className="flex items-center justify-between w-full">
                    <span>{option.label}</span>
                    <Badge variant="secondary" className="ml-2">
                      {option.count}
                    </Badge>
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Sort */}
        <div className="w-full sm:w-48">
          <Select
            value={filters.sortBy}
            onValueChange={(value) => sortBy(value as typeof filters.sortBy)}
          >
            <SelectTrigger>
              {filters.sortOrder === 'desc' ? (
                <SortDesc className="w-4 h-4 mr-2" />
              ) : (
                <SortAsc className="w-4 h-4 mr-2" />
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
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
        <div className="flex items-center gap-2 flex-wrap">
          {hasActiveFilters && (
            <>
              <span className="text-sm text-muted-foreground">Active filters:</span>
              
              {filters.search && (
                <Badge variant="secondary" className="gap-1">
                  Search: "{filters.search}"
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={clearSearch}
                    className="h-4 w-4 p-0 hover:bg-transparent"
                  >
                    <X className="w-3 h-3" />
                  </Button>
                </Badge>
              )}
              
              {filters.status !== 'all' && (
                <Badge variant="secondary" className="gap-1">
                  Status: {filters.status}
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={clearStatusFilter}
                    className="h-4 w-4 p-0 hover:bg-transparent"
                  >
                    <X className="w-3 h-3" />
                  </Button>
                </Badge>
              )}
              
              <Button variant="ghost" size="sm" onClick={reset}>
                Clear all
              </Button>
            </>
          )}
        </div>

        <div className="text-sm text-muted-foreground">
          Showing {stats.filtered} of {stats.total} leads
        </div>
      </div>
    </div>
  );
}
