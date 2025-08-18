import { Loader2, AlertCircle, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface LoadingStateProps {
  isLoading?: boolean;
  error?: string | null;
  isEmpty?: boolean;
  onRetry?: () => void;
  emptyMessage?: string;
  emptyDescription?: string;
  loadingMessage?: string;
  className?: string;
  children?: React.ReactNode;
}

export function LoadingState({
  isLoading = false,
  error = null,
  isEmpty = false,
  onRetry,
  emptyMessage = 'No data found',
  emptyDescription = 'There are no items to display.',
  loadingMessage = 'Loading...',
  className,
  children,
}: LoadingStateProps) {
  // Error State
  if (error) {
    return (
      <div
        className={cn(
          'flex flex-col items-center justify-center px-4 py-12 text-center',
          className
        )}
      >
        <div className="bg-destructive/10 mb-4 flex h-12 w-12 items-center justify-center rounded-full">
          <AlertCircle className="text-destructive h-6 w-6" />
        </div>
        <h3 className="text-foreground mb-2 text-lg font-semibold">Something went wrong</h3>
        <p className="text-muted-foreground mb-4 max-w-md text-sm">{error}</p>
        {onRetry && (
          <Button onClick={onRetry} variant="outline" size="sm">
            <RefreshCw className="mr-2 h-4 w-4" />
            Try again
          </Button>
        )}
      </div>
    );
  }

  // Loading State
  if (isLoading) {
    return (
      <div
        className={cn(
          'flex flex-col items-center justify-center px-4 py-12 text-center',
          className
        )}
      >
        <div className="bg-primary/10 mb-4 flex h-12 w-12 items-center justify-center rounded-full">
          <Loader2 className="text-primary h-6 w-6 animate-spin" />
        </div>
        <h3 className="text-foreground mb-2 text-lg font-semibold">{loadingMessage}</h3>
        <p className="text-muted-foreground text-sm">Please wait while we fetch your data.</p>
      </div>
    );
  }

  // Empty State
  if (isEmpty) {
    return (
      <div
        className={cn(
          'flex flex-col items-center justify-center px-4 py-12 text-center',
          className
        )}
      >
        <div className="bg-muted mb-4 flex h-16 w-16 items-center justify-center rounded-full">
          <div className="bg-muted-foreground/20 h-8 w-8 rounded" />
        </div>
        <h3 className="text-foreground mb-2 text-lg font-semibold">{emptyMessage}</h3>
        <p className="text-muted-foreground max-w-md text-sm">{emptyDescription}</p>
      </div>
    );
  }

  // Content State
  return <>{children}</>;
}

// Specialized loading components
export function TableLoadingSkeleton({ rows = 5 }: { rows?: number }) {
  return (
    <div className="space-y-3">
      {Array.from({ length: rows }).map((_, i) => (
        <div key={i} className="flex animate-pulse space-x-4">
          <div className="bg-muted h-4 w-1/4 rounded" />
          <div className="bg-muted h-4 w-1/3 rounded" />
          <div className="bg-muted h-4 w-1/4 rounded" />
          <div className="bg-muted h-4 w-1/6 rounded" />
        </div>
      ))}
    </div>
  );
}

export function CardLoadingSkeleton({ cards = 3 }: { cards?: number }) {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: cards }).map((_, i) => (
        <div key={i} className="animate-pulse space-y-3 rounded-lg border p-6">
          <div className="bg-muted h-4 w-3/4 rounded" />
          <div className="bg-muted h-4 w-1/2 rounded" />
          <div className="bg-muted h-4 w-2/3 rounded" />
        </div>
      ))}
    </div>
  );
}

// Inline loading spinner
export function InlineLoader({
  size = 'sm',
  className,
}: {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}) {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-6 h-6',
    lg: 'w-8 h-8',
  };

  return (
    <Loader2 className={cn('text-muted-foreground animate-spin', sizeClasses[size], className)} />
  );
}

// Loading overlay for forms and modals
export function LoadingOverlay({
  isLoading,
  children,
  className,
}: {
  isLoading: boolean;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn('relative', className)}>
      {children}
      {isLoading && (
        <div className="bg-background/50 absolute inset-0 z-10 flex items-center justify-center backdrop-blur-sm">
          <div className="bg-background flex items-center space-x-2 rounded-lg border px-4 py-2 shadow-lg">
            <Loader2 className="h-4 w-4 animate-spin" />
            <span className="text-sm font-medium">Loading...</span>
          </div>
        </div>
      )}
    </div>
  );
}
