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
import { useLeadFilters } from '@/hooks/use-lead-filters';
import type { LeadStatus } from '@/types';

export function LeadsFilterBar() {
  const {
    filters,
    stats,
    hasActiveFilters,
    searchByName,
    toggleStatusFilter,
    removeStatusFilter,
    sortBy,
    clearSearch,
    clearStatusFilter,
    reset,
  } = useLeadFilters();

  const statusOptions = [
    { value: 'new' as LeadStatus, label: 'New', count: stats.statusCounts.new || 0 },
    { value: 'contacted' as LeadStatus, label: 'Contacted', count: stats.statusCounts.contacted || 0 },
    { value: 'qualified' as LeadStatus, label: 'Qualified', count: stats.statusCounts.qualified || 0 },
    { value: 'unqualified' as LeadStatus, label: 'Unqualified', count: stats.statusCounts.unqualified || 0 },
    { value: 'lost' as LeadStatus, label: 'Lost', count: stats.statusCounts.lost || 0 },
  ];

  const sortOptions = [
    { value: 'score', label: 'Score' },
    { value: 'name', label: 'Name' },
    { value: 'company', label: 'Company' },
    { value: 'status', label: 'Status' },
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
            placeholder="Search leads by name or company..."
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

        {/* Status Filter */}
        <div className="w-full sm:w-48">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="w-full justify-between">
                <div className="flex items-center">
                  <Filter className="mr-2 h-4 w-4" />
                  {filters.status.length === 0 
                    ? 'Filter by status' 
                    : `${filters.status.length} status${filters.status.length > 1 ? 'es' : ''} selected`
                  }
                </div>
                <ChevronDown className="h-4 w-4 opacity-50" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="start">
              <DropdownMenuLabel>Filter by Status</DropdownMenuLabel>
              <DropdownMenuSeparator />
              {statusOptions.map((option) => (
                <DropdownMenuCheckboxItem
                  key={option.value}
                  checked={filters.status.includes(option.value)}
                  onCheckedChange={() => toggleStatusFilter(option.value)}
                >
                  <div className="flex w-full items-center justify-between">
                    <span>{option.label}</span>
                    <Badge variant="secondary" className="ml-2">
                      {option.count}
                    </Badge>
                  </div>
                </DropdownMenuCheckboxItem>
              ))}
              {filters.status.length > 0 && (
                <>
                  <DropdownMenuSeparator />
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={clearStatusFilter}
                    className="w-full justify-center"
                  >
                    Clear all status filters
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

              {filters.status.length > 0 && 
                filters.status.map((status) => (
                  <Badge key={status} variant="secondary" className="gap-1">
                    Status: {status}
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removeStatusFilter(status)}
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

        <div className="text-muted-foreground text-sm">
          Showing {stats.filtered} of {stats.total} leads
        </div>
      </div>
    </div>
  );
}
