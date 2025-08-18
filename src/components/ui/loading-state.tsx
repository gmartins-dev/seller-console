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
      <div className={cn(
        'flex flex-col items-center justify-center py-12 px-4 text-center',
        className
      )}>
        <div className="flex items-center justify-center w-12 h-12 rounded-full bg-destructive/10 mb-4">
          <AlertCircle className="w-6 h-6 text-destructive" />
        </div>
        <h3 className="text-lg font-semibold text-foreground mb-2">
          Something went wrong
        </h3>
        <p className="text-sm text-muted-foreground mb-4 max-w-md">
          {error}
        </p>
        {onRetry && (
          <Button onClick={onRetry} variant="outline" size="sm">
            <RefreshCw className="w-4 h-4 mr-2" />
            Try again
          </Button>
        )}
      </div>
    );
  }

  // Loading State
  if (isLoading) {
    return (
      <div className={cn(
        'flex flex-col items-center justify-center py-12 px-4 text-center',
        className
      )}>
        <div className="flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 mb-4">
          <Loader2 className="w-6 h-6 text-primary animate-spin" />
        </div>
        <h3 className="text-lg font-semibold text-foreground mb-2">
          {loadingMessage}
        </h3>
        <p className="text-sm text-muted-foreground">
          Please wait while we fetch your data.
        </p>
      </div>
    );
  }

  // Empty State
  if (isEmpty) {
    return (
      <div className={cn(
        'flex flex-col items-center justify-center py-12 px-4 text-center',
        className
      )}>
        <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mb-4">
          <div className="w-8 h-8 rounded bg-muted-foreground/20" />
        </div>
        <h3 className="text-lg font-semibold text-foreground mb-2">
          {emptyMessage}
        </h3>
        <p className="text-sm text-muted-foreground max-w-md">
          {emptyDescription}
        </p>
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
        <div key={i} className="flex space-x-4 animate-pulse">
          <div className="h-4 bg-muted rounded w-1/4" />
          <div className="h-4 bg-muted rounded w-1/3" />
          <div className="h-4 bg-muted rounded w-1/4" />
          <div className="h-4 bg-muted rounded w-1/6" />
        </div>
      ))}
    </div>
  );
}

export function CardLoadingSkeleton({ cards = 3 }: { cards?: number }) {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: cards }).map((_, i) => (
        <div key={i} className="p-6 border rounded-lg space-y-3 animate-pulse">
          <div className="h-4 bg-muted rounded w-3/4" />
          <div className="h-4 bg-muted rounded w-1/2" />
          <div className="h-4 bg-muted rounded w-2/3" />
        </div>
      ))}
    </div>
  );
}

// Inline loading spinner
export function InlineLoader({ size = 'sm', className }: { 
  size?: 'sm' | 'md' | 'lg'; 
  className?: string; 
}) {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-6 h-6',
    lg: 'w-8 h-8',
  };

  return (
    <Loader2 className={cn(
      'animate-spin text-muted-foreground',
      sizeClasses[size],
      className
    )} />
  );
}

// Loading overlay for forms and modals
export function LoadingOverlay({ 
  isLoading, 
  children,
  className 
}: { 
  isLoading: boolean; 
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn('relative', className)}>
      {children}
      {isLoading && (
        <div className="absolute inset-0 bg-background/50 backdrop-blur-sm flex items-center justify-center z-10">
          <div className="flex items-center space-x-2 bg-background border rounded-lg px-4 py-2 shadow-lg">
            <Loader2 className="w-4 h-4 animate-spin" />
            <span className="text-sm font-medium">Loading...</span>
          </div>
        </div>
      )}
    </div>
  );
}
