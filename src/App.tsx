import { QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { ErrorBoundary } from '@/components/error-boundary';
import { Dashboard } from '@/pages/dashboard';
import { queryClient } from '@/lib/queries';
import { ThemeProvider } from '@/components/theme-provider';
import './App.css';

function App() {
  return (
    <ThemeProvider defaultTheme="light" storageKey="seller-console-theme">
      <ErrorBoundary>
        <QueryClientProvider client={queryClient}>
          <div className="min-h-screen bg-background">
            <Dashboard />
          </div>
          {process.env.NODE_ENV === 'development' && (
            <ReactQueryDevtools initialIsOpen={false} />
          )}
        </QueryClientProvider>
      </ErrorBoundary>
    </ThemeProvider>
  );
}

export default App;
