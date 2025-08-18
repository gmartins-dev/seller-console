import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Users, Target, TrendingUp, DollarSign, Menu } from 'lucide-react';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { LeadsTable } from '@/components/leads/leads-table';
import { LeadsFilterBar } from '@/components/leads/leads-filter-bar';
import { OpportunitiesTable } from '@/components/opportunities/opportunities-table';
import { useLeadsQuery, useOpportunitiesQuery } from '@/lib/queries';
import { useLeadFilters } from '@/hooks/use-lead-filters';
import { LoadingState } from '@/components/ui/loading-state';
import { ModeToggle } from '@/components/mode-toggle';

export function Dashboard() {
  const [activeTab, setActiveTab] = useState('leads');
  const [sidebarOpen, setSidebarOpen] = useState(false);

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

  const sidebarContent = (
    <div className="flex h-full flex-col">
      <div className="p-6">
        <h2 className="text-foreground text-lg font-semibold">Seller Console</h2>
        <p className="text-muted-foreground text-sm">Lead Management</p>
      </div>

      <nav className="flex-1 px-4">
        <div className="space-y-2">
          <Button
            variant={activeTab === 'leads' ? 'default' : 'ghost'}
            className="w-full justify-start"
            onClick={() => {
              setActiveTab('leads');
              setSidebarOpen(false);
            }}
          >
            <Users className="mr-2 h-4 w-4" />
            Leads
            {stats.total > 0 && (
              <Badge variant="secondary" className="ml-auto">
                {stats.total}
              </Badge>
            )}
          </Button>

          <Button
            variant={activeTab === 'opportunities' ? 'default' : 'ghost'}
            className="w-full justify-start"
            onClick={() => {
              setActiveTab('opportunities');
              setSidebarOpen(false);
            }}
          >
            <Target className="mr-2 h-4 w-4" />
            Opportunities
            {totalOpportunities > 0 && (
              <Badge variant="secondary" className="ml-auto">
                {totalOpportunities}
              </Badge>
            )}
          </Button>
        </div>
      </nav>

      <div className="border-t p-4">
        <div className="text-muted-foreground text-xs">
          <p>Version 1.0.0</p>
          <p>Mini Seller Console</p>
        </div>
      </div>
    </div>
  );

  return (
    <div className="bg-background flex h-screen">
      {/* Desktop Sidebar */}
      <div className="bg-card hidden w-64 border-r lg:flex">{sidebarContent}</div>

      {/* Mobile Sidebar */}
      <Sheet open={sidebarOpen} onOpenChange={setSidebarOpen}>
        <SheetContent side="left" className="w-64 p-0">
          {sidebarContent}
        </SheetContent>
      </Sheet>

      {/* Main Content */}
      <div className="flex flex-1 flex-col overflow-hidden">
        {/* Header */}
        <header className="bg-card flex h-16 items-center border-b px-4 lg:px-6">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="sm" className="mr-2 lg:hidden">
                <Menu className="h-4 w-4" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-64 p-0">
              {sidebarContent}
            </SheetContent>
          </Sheet>

          <div className="flex-1">
            <h1 className="text-foreground text-xl font-semibold">Dashboard</h1>
            <p className="text-muted-foreground text-sm">Manage your leads and opportunities</p>
          </div>

          <div className="flex items-center space-x-2">
            <ModeToggle />
          </div>
        </header>

        {/* Main Content Area */}
        <main className="flex-1 overflow-auto p-4 lg:p-6">
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
                    <OpportunitiesTable />
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
