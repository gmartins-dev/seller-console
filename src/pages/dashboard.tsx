import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Users, Target, TrendingUp, DollarSign, Menu } from 'lucide-react';
import { Sheet, SheetContent } from '@/components/ui/sheet';
import { Sidebar } from '@/components/sidebar';
import { LeadsTable } from '@/components/leads/leads-table';
import { LeadsFilterBar } from '@/components/leads/leads-filter-bar';
import { OpportunitiesTable } from '@/components/opportunities/opportunities-table';
import { OpportunityFilterBar } from '@/components/opportunities/opportunity-filter-bar';
import { OpportunitySummaryCards } from '@/components/opportunities/opportunity-summary-cards';
import { OpportunityStageDistribution } from '@/components/opportunities/opportunity-stage-distribution';
import { useLeadsQuery, useOpportunitiesQuery } from '@/lib/queries';
import { useLeadFilters } from '@/hooks/use-lead-filters';
import { LoadingState } from '@/components/ui/loading-state';
import { ModeToggle } from '@/components/mode-toggle';
import { cn } from '@/lib/utils';

export function Dashboard() {
  const [activeTab, setActiveTab] = useState('leads');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  // Data fetching
  const {
    data: leads,
    isLoading: leadsLoading,
    error: leadsError,
    refetch: refetchLeads,
  } = useLeadsQuery();
  const {
    data: opportunities,
    isLoading: opportunitiesLoading,
    error: opportunitiesError,
  } = useOpportunitiesQuery();

  // Filters
  const { stats } = useLeadFilters();

  // Calculate dashboard stats
  const totalOpportunities = opportunities?.length || 0;
  const totalOpportunityValue =
    opportunities?.reduce((sum, opp) => sum + (opp.amount || 0), 0) || 0;
  const avgDealSize = totalOpportunities > 0 ? totalOpportunityValue / totalOpportunities : 0;

  const dashboardStats = [
    {
      title: 'Total Leads',
      value: stats.total.toString(),
      description: `${stats.highScoreLeads} high-score leads`,
      icon: Users,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
    },
    {
      title: 'Conversion Rate',
      value: `${stats.conversionRate}%`,
      description: 'Leads to opportunities',
      icon: Target,
      color: 'text-green-600',
      bgColor: 'bg-green-50',
    },
    {
      title: 'Opportunities',
      value: totalOpportunities.toString(),
      description: 'Active opportunities',
      icon: TrendingUp,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50',
    },
    {
      title: 'Pipeline Value',
      value: `$${(totalOpportunityValue / 1000).toFixed(0)}K`,
      description: `Avg: $${(avgDealSize / 1000).toFixed(0)}K`,
      icon: DollarSign,
      color: 'text-orange-600',
      bgColor: 'bg-orange-50',
    },
  ];

  return (
    <div className="bg-background flex min-h-screen">
      {/* Desktop Sidebar */}
      <div className={cn(
        "bg-card hidden border-r lg:flex transition-all duration-300 ease-in-out relative",
        sidebarCollapsed ? "w-16" : "w-64"
      )}>
        <Sidebar
          activeTab={activeTab}
          onTabChange={setActiveTab}
          collapsed={sidebarCollapsed}
          onToggleCollapse={() => setSidebarCollapsed(!sidebarCollapsed)}
          leadsCount={stats.total}
          opportunitiesCount={totalOpportunities}
        />
      </div>

      {/* Mobile Sidebar */}
      <Sheet open={sidebarOpen} onOpenChange={setSidebarOpen}>
        <SheetContent side="left" className="w-64 p-0">
          <Sidebar
            activeTab={activeTab}
            onTabChange={setActiveTab}
            onMobileClose={() => setSidebarOpen(false)}
            leadsCount={stats.total}
            opportunitiesCount={totalOpportunities}
          />
        </SheetContent>
      </Sheet>

      {/* Main Content */}
      <div className="flex flex-1 flex-col">
        {/* Header */}
        <header className="bg-card flex h-16 items-center border-b px-4 lg:px-6">
          {/* Mobile Sidebar Trigger */}
          <Button 
            variant="ghost" 
            size="sm" 
            className="mr-2 lg:hidden"
            onClick={() => setSidebarOpen(true)}
          >
            <Menu className="h-4 w-4" />
          </Button>

          <div className="flex-1">
            <h1 className="text-foreground text-xl font-semibold">Dashboard</h1>
            <p className="text-muted-foreground text-sm">Manage your leads and opportunities</p>
          </div>

          <div className="flex items-center space-x-2">
            <ModeToggle />
          </div>
        </header>

        {/* Main Content Area */}
        <main className="flex-1 p-4 lg:p-6">
          {/* Stats Cards */}
          <div className="mb-6 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
            {dashboardStats.map((stat) => (
              <Card key={stat.title}>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
                  <div className={`rounded-md p-2 ${stat.bgColor}`}>
                    <stat.icon className={`h-4 w-4 ${stat.color}`} />
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stat.value}</div>
                  <p className="text-muted-foreground text-xs">{stat.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Tabs Content */}
          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
            <TabsList className="grid w-full grid-cols-2 lg:w-[400px]">
              <TabsTrigger value="leads">Leads</TabsTrigger>
              <TabsTrigger value="opportunities">Opportunities</TabsTrigger>
            </TabsList>

            <TabsContent value="leads" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Leads Management</CardTitle>
                  <CardDescription>
                    View and manage your sales leads. Click on a lead to view details and convert to
                    opportunities.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <LeadsFilterBar />

                  <LoadingState
                    isLoading={leadsLoading}
                    error={leadsError?.message}
                    isEmpty={!leads?.length}
                    onRetry={refetchLeads}
                    emptyMessage="No leads found"
                    emptyDescription="Start by adding some leads to your pipeline."
                  >
                    <LeadsTable />
                  </LoadingState>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="opportunities" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Opportunities</CardTitle>
                  <CardDescription>
                    Track your sales opportunities and pipeline progress.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <LoadingState
                    isLoading={opportunitiesLoading}
                    error={opportunitiesError?.message}
                    isEmpty={!opportunities?.length}
                    emptyMessage="No opportunities yet"
                    emptyDescription="Convert some leads to create your first opportunities."
                  >
                    <div className="space-y-6">
                      <OpportunityFilterBar />
                      <OpportunitiesTable />
                      <OpportunityStageDistribution />
                      <OpportunitySummaryCards />
                    </div>
                  </LoadingState>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </div>
  );
}
