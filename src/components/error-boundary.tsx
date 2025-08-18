import React, { Component } from 'react';
import type { ReactNode } from 'react';
import { AlertTriangle, RefreshCw, Home } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
  onError?: (error: Error, errorInfo: React.ErrorInfo) => void;
}

interface State {
  hasError: boolean;
  error?: Error;
  errorInfo?: React.ErrorInfo;
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    this.setState({ error, errorInfo });

    // Log to console in development
    if (process.env.NODE_ENV === 'development') {
      console.error('ErrorBoundary caught an error:', error, errorInfo);
    }

    // Call custom error handler if provided
    this.props.onError?.(error, errorInfo);
  }

  handleReset = () => {
    this.setState({ hasError: false, error: undefined, errorInfo: undefined });
  };

  handleReload = () => {
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      // Custom fallback if provided
      if (this.props.fallback) {
        return this.props.fallback;
      }

      // Default error UI
      return (
        <div className="bg-background flex min-h-screen items-center justify-center">
          <div className="mx-auto w-full max-w-md p-6">
            <div className="text-center">
              <div className="mb-4 flex justify-center">
                <div className="bg-destructive/10 rounded-full p-3">
                  <AlertTriangle className="text-destructive h-8 w-8" />
                </div>
              </div>

              <h1 className="text-foreground mb-2 text-2xl font-bold">Something went wrong</h1>

              <p className="text-muted-foreground mb-6">
                We encountered an unexpected error. Our team has been notified and is working to fix
                it.
              </p>

              {process.env.NODE_ENV === 'development' && this.state.error && (
                <details className="bg-muted mb-6 rounded-lg p-4 text-left">
                  <summary className="mb-2 cursor-pointer text-sm font-medium">
                    Error Details (Development)
                  </summary>
                  <pre className="text-muted-foreground max-h-32 overflow-auto text-xs whitespace-pre-wrap">
                    {this.state.error.toString()}
                    {this.state.errorInfo?.componentStack}
                  </pre>
                </details>
              )}

              <div className="flex flex-col justify-center gap-3 sm:flex-row">
                <Button onClick={this.handleReset} variant="outline">
                  <RefreshCw className="mr-2 h-4 w-4" />
                  Try Again
                </Button>

                <Button onClick={this.handleReload}>
                  <Home className="mr-2 h-4 w-4" />
                  Reload Page
                </Button>
              </div>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

// Hook version for functional components
export function useErrorBoundary() {
  const [error, setError] = React.useState<Error | null>(null);

  const resetError = React.useCallback(() => {
    setError(null);
  }, []);

  const captureError = React.useCallback((error: Error) => {
    setError(error);
  }, []);

  React.useEffect(() => {
    if (error) {
      throw error;
    }
  }, [error]);

  return { captureError, resetError };
}

// Simple error fallback for smaller components
export function SimpleErrorFallback({
  error,
  resetError,
}: {
  error: Error;
  resetError: () => void;
}) {
  return (
    <div className="border-destructive/20 bg-destructive/5 rounded-lg border p-4">
      <div className="mb-3 flex items-center space-x-2">
        <AlertTriangle className="text-destructive h-5 w-5" />
        <h3 className="text-destructive text-sm font-medium">Error loading component</h3>
      </div>

      <p className="text-muted-foreground mb-3 text-sm">
        {error.message || 'An unexpected error occurred.'}
      </p>

      <Button onClick={resetError} size="sm" variant="outline">
        <RefreshCw className="mr-1 h-3 w-3" />
        Retry
      </Button>
    </div>
  );
}
