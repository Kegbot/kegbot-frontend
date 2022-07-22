import { createContext, useContext, useEffect, useState } from 'react';

import { SiteStatus, SystemEvent, Tap } from '../lib/ApiClient';
import ApiContext from './ApiContext';
import CurrentUserContext from './CurrentUserContext';
import LoadingZone from './LoadingZone';

interface SystemStatusContextInterface {
  site: SiteStatus | null;
  taps: Array<Tap>;
  events: Array<SystemEvent>;
  isAvailable: boolean;
}

const DEFAULT_STATUS = {
  site: null,
  taps: [],
  events: [],
  isAvailable: false,
};

const SystemStatusContext = createContext<SystemStatusContextInterface>(DEFAULT_STATUS);

export const SystemStatusProvider = function ({ children }) {
  const { apiClient } = useContext(ApiContext);
  const { currentUser } = useContext(CurrentUserContext);
  const [systemStatus, setSystemStatus] = useState(DEFAULT_STATUS);
  const [isInitiallyLoading, setIsInitiallyLoading] = useState(true);

  // Fetch system status whenever user logs in or out.
  useEffect(() => {
    async function load() {
      try {
        setSystemStatus({
          ...(await apiClient.getSystemStatus()),
          isAvailable: true,
        });
      } catch (e) {
        console.error(e);
        setSystemStatus(DEFAULT_STATUS); // Not available
      } finally {
        setIsInitiallyLoading(false);
      }
    }
    if (apiClient) {
      load();
    } else {
      setSystemStatus(DEFAULT_STATUS);
    }
  }, [apiClient, currentUser]);

  return (
    <SystemStatusContext.Provider
      value={{
        ...systemStatus,
      }}
    >
      {isInitiallyLoading ? <LoadingZone /> : children}
    </SystemStatusContext.Provider>
  );
};

export const SystemStatusConsumer = SystemStatusContext.Consumer;
export default SystemStatusContext;
