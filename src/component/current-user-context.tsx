import { createContext, useContext, useEffect, useState } from 'react';

import LoginView from '../view/login';
import ApiContext from './api-context';
import LoadingZone from './loading-zone';

interface CurrentUserContextInterface {
  currentUser: object;
  isLoggedIn: boolean;
  login: (username: string, password: string) => void;
  logout: () => void;
}

const CurrentUserContext = createContext<CurrentUserContextInterface>({
  currentUser: null,
  isLoggedIn: false,
  login: () => {},
  logout: () => {},
});

export const CurrentUserProvider = function ({ children }) {
  const { apiClient } = useContext(ApiContext);
  const [currentUser, setCurrentUser] = useState(null);
  const [isInitiallyLoading, setIsInitiallyLoading] = useState(true);

  const logout = async () => {
    setCurrentUser(null);
    if (apiClient) {
      await apiClient.logout();
    }
  };

  const login = async (username, password) => {
    if (!apiClient) {
      return null;
    }
    const loggedInUser = await apiClient.login(username, password);
    setCurrentUser(loggedInUser);
    return loggedInUser;
  };

  useEffect(() => {
    async function load() {
      try {
        const newCurrentUser = await apiClient.getCurrentUser();
        setCurrentUser(newCurrentUser);
      } catch (e) {
        console.error(e);
        setCurrentUser(null);
      } finally {
        // Stop blocking children rendering after our first attempt.
        setIsInitiallyLoading(false);
      }
    }
    if (apiClient) {
      load();
    }
  }, [apiClient, setCurrentUser]);

  const isLoggedIn = !!currentUser;

  return (
    <CurrentUserContext.Provider
      value={{
        currentUser,
        isLoggedIn,
        login,
        logout,
      }}
    >
      {isInitiallyLoading ? <LoadingZone /> : isLoggedIn ? children : <LoginView />}
    </CurrentUserContext.Provider>
  );
};

export const CurrentUserConsumer = CurrentUserContext.Consumer;
export default CurrentUserContext;
