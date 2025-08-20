import { useEffect, useCallback } from 'react';
import { useLeadsStore } from '@/stores/leads-store';
import { apiService } from '@/lib/api';
import { useQueryClient } from '@tanstack/react-query';

interface DataPersistenceHook {
  exportData: () => Promise<void>;
  importData: (file: File) => Promise<void>;
  clearAllData: () => Promise<void>;
  getStorageInfo: () => { leads: number; opportunities: number; totalSize: string };
  lastSyncTime: string | null;
}

export function useDataPersistence(): DataPersistenceHook {
  const queryClient = useQueryClient();
  const { setLeads, setOpportunities } = useLeadsStore();

  // Auto-sync with API service on mount
  useEffect(() => {
    const syncData = async () => {
      try {
        // Export current API data and sync with store
        const exportedData = await apiService.exportData();
        setLeads(exportedData.leads);
        setOpportunities(exportedData.opportunities);
      } catch (error) {
        console.error('Failed to sync data on mount:', error);
      }
    };

    syncData();
  }, [setLeads, setOpportunities]);

  const exportData = useCallback(async () => {
    try {
      const data = await apiService.exportData();
      
      // Create and download JSON file
      const blob = new Blob([JSON.stringify(data, null, 2)], {
        type: 'application/json',
      });
      
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `seller-console-data-${new Date().toISOString().split('T')[0]}.json`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Failed to export data:', error);
      throw new Error('Failed to export data');
    }
  }, []);

  const importData = useCallback(async (file: File) => {
    try {
      const text = await file.text();
      const data = JSON.parse(text);

      // Import to API service (which handles validation and persistence)
      await apiService.importData(data);

      // Sync with store
      const updatedData = await apiService.exportData();
      setLeads(updatedData.leads);
      setOpportunities(updatedData.opportunities);

      // Invalidate React Query cache to refresh UI
      queryClient.invalidateQueries({ queryKey: ['leads'] });
      queryClient.invalidateQueries({ queryKey: ['opportunities'] });
    } catch (error) {
      console.error('Failed to import data:', error);
      throw new Error('Failed to import data. Please check the file format.');
    }
  }, [setLeads, setOpportunities, queryClient]);

  const clearAllData = useCallback(async () => {
    try {
      // Clear API service data
      await apiService.resetData();
      
      // Clear store data
      setLeads([]);
      setOpportunities([]);

      // Clear localStorage
      localStorage.removeItem('leads-storage');
      localStorage.removeItem('api-leads-data');
      localStorage.removeItem('api-opportunities-data');

      // Invalidate queries
      queryClient.clear();
    } catch (error) {
      console.error('Failed to clear data:', error);
      throw new Error('Failed to clear data');
    }
  }, [setLeads, setOpportunities, queryClient]);

  const getStorageInfo = useCallback(() => {
    return apiService.getStorageInfo();
  }, []);

  const getLastSyncTime = useCallback(() => {
    return localStorage.getItem('api-last-sync');
  }, []);

  return {
    exportData,
    importData,
    clearAllData,
    getStorageInfo,
    lastSyncTime: getLastSyncTime(),
  };
}

// Hook for automatic data backup
export function useAutoBackup(intervalMinutes = 30) {
  useEffect(() => {
    const autoBackup = () => {
      const lastBackup = localStorage.getItem('last-auto-backup');
      const now = Date.now();
      const backupInterval = intervalMinutes * 60 * 1000; // Convert to milliseconds

      if (!lastBackup || now - parseInt(lastBackup) > backupInterval) {
        // Save to localStorage instead of downloading for auto-backup
        const saveToLocalStorage = async () => {
          try {
            const data = await apiService.exportData();
            localStorage.setItem('auto-backup-data', JSON.stringify(data));
            localStorage.setItem('last-auto-backup', now.toString());
          } catch (error) {
            console.error('Auto-backup failed:', error);
          }
        };

        saveToLocalStorage();
      }
    };

    // Run backup check on mount and then every minute
    autoBackup();
    const interval = setInterval(autoBackup, 60 * 1000);

    return () => clearInterval(interval);
  }, [intervalMinutes]);
}
