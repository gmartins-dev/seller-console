import { useState } from 'react';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  ExternalLink, 
  Mail, 
  Building2, 
  User,
  ArrowUpDown,
  Eye 
} from 'lucide-react';
import { useLeadFilters, useLeadSelection } from '@/hooks/use-lead-filters';
import { LeadDetailPanel } from './lead-detail-panel';
import { cn } from '@/lib/utils';
import type { Lead, LeadStatus, LeadSource } from '@/types';

// Status configurations
const statusConfig: Record<LeadStatus, { label: string; variant: 'default' | 'secondary' | 'destructive' | 'outline'; color: string }> = {
  new: { label: 'New', variant: 'default', color: 'bg-blue-100 text-blue-800' },
  contacted: { label: 'Contacted', variant: 'secondary', color: 'bg-yellow-100 text-yellow-800' },
  qualified: { label: 'Qualified', variant: 'default', color: 'bg-green-100 text-green-800' },
  unqualified: { label: 'Unqualified', variant: 'outline', color: 'bg-gray-100 text-gray-800' },
  lost: { label: 'Lost', variant: 'destructive', color: 'bg-red-100 text-red-800' },
};

// Source configurations
const sourceConfig: Record<LeadSource, { label: string; icon: React.ReactNode }> = {
  website: { label: 'Website', icon: <ExternalLink className="w-3 h-3" /> },
  referral: { label: 'Referral', icon: <User className="w-3 h-3" /> },
  social: { label: 'Social', icon: <ExternalLink className="w-3 h-3" /> },
  email: { label: 'Email', icon: <Mail className="w-3 h-3" /> },
  phone: { label: 'Phone', icon: <ExternalLink className="w-3 h-3" /> },
  other: { label: 'Other', icon: <ExternalLink className="w-3 h-3" /> },
};

// Score color helper
const getScoreColor = (score: number): string => {
  if (score >= 90) return 'text-green-600 font-semibold';
  if (score >= 70) return 'text-blue-600 font-medium';
  if (score >= 50) return 'text-yellow-600';
  return 'text-red-600';
};

export function LeadsTable() {
  const { filteredLeads, sortBy } = useLeadFilters();
  const { selectedLead, selectLead, clearSelection, isSelected } = useLeadSelection();
  const [hoveredRow, setHoveredRow] = useState<string | null>(null);

  const handleRowClick = (lead: Lead) => {
    selectLead(lead.id);
  };

  const handleSort = (field: 'score' | 'name' | 'company' | 'createdAt') => {
    sortBy(field);
  };

  if (filteredLeads.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-muted-foreground">No leads match your current filters.</div>
      </div>
    );
  }

  return (
    <>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[200px]">
                <Button
                  variant="ghost"
                  onClick={() => handleSort('name')}
                  className="h-auto p-0 font-medium hover:bg-transparent"
                >
                  <User className="w-4 h-4 mr-2" />
                  Lead
                  <ArrowUpDown className="w-3 h-3 ml-2" />
                </Button>
              </TableHead>
              
              <TableHead className="w-[200px]">
                <Button
                  variant="ghost"
                  onClick={() => handleSort('company')}
                  className="h-auto p-0 font-medium hover:bg-transparent"
                >
                  <Building2 className="w-4 h-4 mr-2" />
                  Company
                  <ArrowUpDown className="w-3 h-3 ml-2" />
                </Button>
              </TableHead>
              
              <TableHead className="hidden md:table-cell">
                <Mail className="w-4 h-4 mr-2 inline" />
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
                  <ArrowUpDown className="w-3 h-3 ml-2" />
                </Button>
              </TableHead>
              
              <TableHead className="w-[120px]">Status</TableHead>
              
              <TableHead className="w-[80px]">Actions</TableHead>
            </TableRow>
          </TableHeader>
          
          <TableBody>
            {filteredLeads.map((lead) => (
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
                    <div className="font-medium text-foreground">{lead.name}</div>
                    <div className="text-sm text-muted-foreground md:hidden">
                      {lead.company}
                    </div>
                  </div>
                </TableCell>
                
                <TableCell className="hidden md:table-cell">
                  <div className="flex items-center">
                    <Building2 className="w-4 h-4 mr-2 text-muted-foreground" />
                    {lead.company}
                  </div>
                </TableCell>
                
                <TableCell className="hidden md:table-cell">
                  <div className="flex items-center text-sm">
                    <Mail className="w-3 h-3 mr-2 text-muted-foreground" />
                    <span className="truncate max-w-[200px]">{lead.email}</span>
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
                    <Eye className="w-4 h-4" />
                    <span className="sr-only">View details</span>
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Lead Detail Panel */}
      <LeadDetailPanel
        lead={selectedLead}
        open={!!selectedLead}
        onClose={clearSelection}
      />
    </>
  );
}
