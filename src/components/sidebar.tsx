import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Users, Goal, ChevronsLeft, ChevronsRight } from 'lucide-react';
import { cn } from '@/lib/utils';

interface SidebarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  onMobileClose?: () => void;
  collapsed?: boolean;
  onToggleCollapse?: () => void;
  leadsCount: number;
  opportunitiesCount: number;
  className?: string;
}

export function Sidebar({
  activeTab,
  onTabChange,
  onMobileClose,
  collapsed = false,
  onToggleCollapse,
  leadsCount,
  opportunitiesCount,
  className,
}: SidebarProps) {
  const handleTabChange = (tab: string) => {
    onTabChange(tab);
    onMobileClose?.();
  };

  return (
    <div className={cn("flex h-full flex-col", className)}>
      {/* Header */}
      <div className={cn("p-6", collapsed && "px-4")}>
        {!collapsed ? (
          <>
            <h2 className="text-foreground text-lg font-semibold">Seller Console</h2>
            <p className="text-muted-foreground text-sm">Lead Management</p>
          </>
        ) : (
          <div className="flex justify-center p-4"></div>
        )}
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4">
        <div className="space-y-2">
          <Button
            variant={activeTab === 'leads' ? 'default' : 'ghost'}
            className={cn(
              "w-full",
              collapsed ? "justify-center px-2" : "justify-start"
            )}
            onClick={() => handleTabChange('leads')}
            title={collapsed ? 'Leads' : undefined}
          >
            <Users className={cn("h-4 w-4", !collapsed && "mr-2")} />
            {!collapsed && (
              <>
                Leads
                {leadsCount > 0 && (
                  <Badge variant="secondary" className="ml-auto">
                    {leadsCount}
                  </Badge>
                )}
              </>
            )}
          </Button>

          <Button
            variant={activeTab === 'opportunities' ? 'default' : 'ghost'}
            className={cn(
              "w-full",
              collapsed ? "justify-center px-2" : "justify-start"
            )}
            onClick={() => handleTabChange('opportunities')}
            title={collapsed ? 'Opportunities' : undefined}
          >
            <Goal className={cn("h-4 w-4", !collapsed && "mr-2")} />
            {!collapsed && (
              <>
                Opportunities
                {opportunitiesCount > 0 && (
                  <Badge variant="secondary" className="ml-auto">
                    {opportunitiesCount}
                  </Badge>
                )}
              </>
            )}
          </Button>
        </div>
      </nav>

      {/* Footer */}
      {!collapsed && (
        <div className="border-t p-4">
          <div className="text-muted-foreground text-xs">
            <p>Version 1.0.0</p>
            <p>Mini Seller Console</p>
          </div>
        </div>
      )}

      {/* Collapse Toggle Button (for desktop) */}
      {onToggleCollapse && (
        <Button
          variant="ghost"
          size="sm"
          onClick={onToggleCollapse}
          className="absolute -right-3 top-6 h-6 w-6 rounded-full border bg-background p-0 shadow-md hover:bg-accent z-10"
        >
          {collapsed ? (
            <ChevronsRight className="h-3 w-3" />
          ) : (
            <ChevronsLeft className="h-3 w-3" />
          )}
        </Button>
      )}
    </div>
  );
}
