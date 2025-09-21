import { useCallback, useEffect, useRef } from 'react';
import { WorkerMessage, WorkerResponse } from '../workers/dataWorker';

export interface UseDataWorkerReturn {
  sendMessage: (type: WorkerMessage['type'], payload?: any) => Promise<any>;
  isWorkerReady: boolean;
}

export const useDataWorker = (): UseDataWorkerReturn => {
  const workerRef = useRef<Worker | null>(null);
  const pendingRequests = useRef<Map<string, { resolve: Function; reject: Function }>>(new Map());
  const isWorkerReady = useRef(false);

  useEffect(() => {
    // Create worker
    workerRef.current = new Worker(
      new URL('../workers/dataWorker.ts', import.meta.url),
      { type: 'module' }
    );

    // Handle worker messages
    workerRef.current.onmessage = (event: MessageEvent<WorkerResponse>) => {
      const { id, success, data, error } = event.data;
      const request = pendingRequests.current.get(id);

      if (request) {
        if (success) {
          request.resolve(data);
        } else {
          request.reject(new Error(error || 'Worker request failed'));
        }
        pendingRequests.current.delete(id);
      }
    };

    // Handle worker errors
    workerRef.current.onerror = (error) => {
      console.error('Worker error:', error);
      // Reject all pending requests
      pendingRequests.current.forEach(({ reject }) => {
        reject(new Error('Worker error'));
      });
      pendingRequests.current.clear();
    };

    isWorkerReady.current = true;

    // Cleanup
    return () => {
      if (workerRef.current) {
        workerRef.current.terminate();
        workerRef.current = null;
      }
      pendingRequests.current.clear();
      isWorkerReady.current = false;
    };
  }, []);

  const sendMessage = useCallback((type: WorkerMessage['type'], payload?: any): Promise<any> => {
    return new Promise((resolve, reject) => {
      if (!workerRef.current || !isWorkerReady.current) {
        reject(new Error('Worker not ready'));
        return;
      }

      const id = `${Date.now()}-${Math.random()}`;
      pendingRequests.current.set(id, { resolve, reject });

      const message: WorkerMessage = { id, type, payload };
      workerRef.current.postMessage(message);

      // Set timeout for requests
      setTimeout(() => {
        if (pendingRequests.current.has(id)) {
          pendingRequests.current.delete(id);
          reject(new Error('Request timeout'));
        }
      }, 30000); // 30 second timeout
    });
  }, []);

  return {
    sendMessage,
    isWorkerReady: isWorkerReady.current,
  };
};