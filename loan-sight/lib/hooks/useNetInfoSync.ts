import { useEffect, useState } from 'react';
import NetInfo, { NetInfoState } from '@react-native-community/netinfo';
import { useSyncStore } from '../stores/syncStore';

export const useNetInfoSync = () => {
  const [isConnected, setIsConnected] = useState(true);
  const [connectionType, setConnectionType] = useState<string | null>(null);
  const { syncAll, wifiOnly } = useSyncStore();

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener(handleConnectivityChange);
    return () => unsubscribe();
  }, [wifiOnly]);

  const handleConnectivityChange = async (state: NetInfoState) => {
    setIsConnected(state.isConnected ?? false);
    setConnectionType(state.type);

    if (state.isConnected) {
      const shouldSync = !wifiOnly || state.type === 'wifi';
      if (shouldSync) {
        syncAll();
      }
    }
  };

  return { isConnected, connectionType };
};

