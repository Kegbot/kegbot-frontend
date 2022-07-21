import { createContext, useEffect, useState } from 'react';

import ApiClient from '../lib/ApiClient';

interface ApiContextInterface {
  apiClient: ApiClient;
}

const ApiContext = createContext<ApiContextInterface>({ apiClient: null });

export const ApiProvider = function ({ children }) {
  const [apiClient] = useState(new ApiClient());

  return (
    <ApiContext.Provider
      value={{
        apiClient,
      }}
    >
      {children}
    </ApiContext.Provider>
  );
};

export const ApiConsumer = ApiContext.Consumer;
export default ApiContext;
