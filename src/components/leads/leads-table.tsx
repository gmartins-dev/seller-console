import { useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Pagination } from '@/components/ui/pagination';
import { ExternalLink, Mail, Building2, User, ArrowUpDown, Eye } from 'lucide-react';
import { useLeadFilters, useLeadSelection } from '@/hooks/use-lead-filters';
import { LeadDetailPanel } from './lead-detail-panel';
import { cn } from '@/lib/utils';
import type { Lead, LeadStatus, LeadSource } from '@/types';

// Status configurations
const statusConfig: Record<
  LeadStatus,
  { label: string; variant: 'default' | 'secondary' | 'destructive' | 'outline'; color: string }
> = {
  new: { label: 'New', variant: 'default', color: 'bg-blue-100 text-blue-800' },
  contacted: { label: 'Contacted', variant: 'secondary', color: 'bg-yellow-100 text-yellow-800' },
  qualified: { label: 'Qualified', variant: 'default', color: 'bg-green-100 text-green-800' },
  unqualified: { label: 'Unqualified', variant: 'outline', color: 'bg-gray-100 text-gray-800' },
  lost: { label: 'Lost', variant: 'destructive', color: 'bg-red-100 text-red-800' },
};

// Source configurations
const sourceConfig: Record<LeadSource, { label: string; icon: React.ReactNode }> = {
  website: { label: 'Website', icon: <ExternalLink className="h-3 w-3" /> },
  referral: { label: 'Referral', icon: <User className="h-3 w-3" /> },
  social: { label: 'Social', icon: <ExternalLink className="h-3 w-3" /> },
  email: { label: 'Email', icon: <Mail className="h-3 w-3" /> },
  phone: { label: 'Phone', icon: <ExternalLink className="h-3 w-3" /> },
  other: { label: 'Other', icon: <ExternalLink className="h-3 w-3" /> },
};

// Score color helper
const getScoreColor = (score: number): string => {
  if (score >= 90) return 'text-green-600 font-semibold';
  if (score >= 70) return 'text-blue-600 font-medium';
  if (score >= 50) return 'text-yellow-600';
  return 'text-red-600';
};

export function LeadsTable() {
  const {
    paginatedLeads,
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
  } = useLeadFilters();
  const { selectedLead, selectLead, clearSelection, isSelected } = useLeadSelection();
  const [hoveredRow, setHoveredRow] = useState<string | null>(null);

  const handleRowClick = (lead: Lead) => {
    selectLead(lead.id);
  };

  const handleSort = (field: 'score' | 'name' | 'company' | 'createdAt') => {
    sortBy(field);
  };

  const getSortIcon = (field: string) => {
    if (filters.sortBy !== field) {
      return <ArrowUpDown className="ml-2 h-3 w-3 opacity-50" />;
    }
    return filters.sortOrder === 'desc' ? (
      <ArrowUpDown className="ml-2 h-3 w-3 rotate-180 transition-transform" />
    ) : (
      <ArrowUpDown className="ml-2 h-3 w-3 transition-transform" />
    );
  };

  if (paginatedLeads.length === 0) {
    return (
      <div className="py-12 text-center">
        <div className="text-muted-foreground">No leads match your current filters.</div>
      </div>
    );
  }

  return (
    <>
      {/* Mobile Card Layout */}
      <div className="md:hidden space-y-3">
        {paginatedLeads.map((lead: Lead) => (
          <div
            key={`mobile-${lead.id}`}
            className={cn(
              'bg-card rounded-lg border p-4 cursor-pointer transition-colors',
              isSelected(lead.id) && 'ring-2 ring-primary',
              hoveredRow === lead.id && 'bg-muted/30'
            )}
            onClick={() => handleRowClick(lead)}
            onMouseEnter={() => setHoveredRow(lead.id)}
            onMouseLeave={() => setHoveredRow(null)}
          >
            <div className="flex items-start justify-between">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-2">
                  <h3 className="font-medium text-foreground truncate">{lead.name}</h3>
                  <Badge
                    variant={statusConfig[lead.status].variant}
                    className={cn('text-xs flex-shrink-0', statusConfig[lead.status].color)}
                  >
                    {statusConfig[lead.status].label}
                  </Badge>
                </div>
                
                <div className="space-y-1 text-sm text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <Building2 className="h-3 w-3 flex-shrink-0" />
                    <span className="truncate">{lead.company}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Mail className="h-3 w-3 flex-shrink-0" />
                    <span className="truncate">{lead.email}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      {sourceConfig[lead.source].icon}
                      <span>{sourceConfig[lead.source].label}</span>
                    </div>
                    <div className={cn('font-medium', getScoreColor(lead.score))}>
                      Score: {lead.score}
                    </div>
                  </div>
                </div>
              </div>
              
              <Button
                variant="ghost"
                size="sm"
                onClick={(e) => {
                  e.stopPropagation();
                  selectLead(lead.id);
                }}
                className="h-8 w-8 p-0 flex-shrink-0 ml-2"
              >
                <Eye className="h-4 w-4" />
                <span className="sr-only">View details</span>
              </Button>
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
              <TableHead className="w-[200px]">
                <Button
                  variant="ghost"
                  onClick={() => handleSort('name')}
                  className="h-auto p-0 font-medium hover:bg-transparent"
                >
                  <User className="mr-2 h-4 w-4" />
                  Lead
                  {getSortIcon('name')}
                </Button>
              </TableHead>

              <TableHead className="w-[200px]">
                <Button
                  variant="ghost"
                  onClick={() => handleSort('company')}
                  className="h-auto p-0 font-medium hover:bg-transparent"
                >
                  <Building2 className="mr-2 h-4 w-4" />
                  Company
                  {getSortIcon('company')}
                </Button>
              </TableHead>

              <TableHead className="hidden md:table-cell">
                <Mail className="mr-2 inline h-4 w-4" />
                Email
              </TableHead>

              <TableHead className="hidden lg:table-cell">Source</TableHead>

              <TableHead className="w-[100px]">
                <Button
                  variant="ghost"
                  onClick={() => handleSort('score')}
                  className="h-auto p-0 font-medium hover:bg-transparent"
                >
                  Score
                  {getSortIcon('score')}
                </Button>
              </TableHead>

              <TableHead className="w-[120px]">Status</TableHead>

              <TableHead className="w-[80px]">Actions</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {paginatedLeads.map((lead: Lead) => (
              <TableRow
                key={lead.id}
                className={cn(
                  'cursor-pointer transition-colors',
                  isSelected(lead.id) && 'bg-muted/50',
                  hoveredRow === lead.id && 'bg-muted/30'
                )}
                onClick={() => handleRowClick(lead)}
                onMouseEnter={() => setHoveredRow(lead.id)}
                onMouseLeave={() => setHoveredRow(null)}
              >
                <TableCell className="font-medium">
                  <div>
                    <div className="text-foreground font-medium">{lead.name}</div>
                    <div className="text-muted-foreground text-sm md:hidden">{lead.company}</div>
                  </div>
                </TableCell>

                <TableCell className="hidden md:table-cell">
                  <div className="flex items-center">
                    <Building2 className="text-muted-foreground mr-2 h-4 w-4" />
                    {lead.company}
                  </div>
                </TableCell>

                <TableCell className="hidden md:table-cell">
                  <div className="flex items-center text-sm">
                    <Mail className="text-muted-foreground mr-2 h-3 w-3" />
                    <span className="max-w-[200px] truncate">{lead.email}</span>
                  </div>
                </TableCell>

                <TableCell className="hidden lg:table-cell">
                  <div className="flex items-center text-sm">
                    {sourceConfig[lead.source].icon}
                    <span className="ml-2">{sourceConfig[lead.source].label}</span>
                  </div>
                </TableCell>

                <TableCell>
                  <div className={cn('text-center font-medium', getScoreColor(lead.score))}>
                    {lead.score}
                  </div>
                </TableCell>

                <TableCell>
                  <Badge
                    variant={statusConfig[lead.status].variant}
                    className={cn('text-xs', statusConfig[lead.status].color)}
                  >
                    {statusConfig[lead.status].label}
                  </Badge>
                </TableCell>

                <TableCell onClick={(e) => e.stopPropagation()}>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => selectLead(lead.id)}
                    className="h-8 w-8 p-0"
                  >
                    <Eye className="h-4 w-4" />
                    <span className="sr-only">View details</span>
                  </Button>
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

      {/* Lead Detail Panel */}
      <LeadDetailPanel lead={selectedLead} open={!!selectedLead} onClose={clearSelection} />
    </>
  );
}
