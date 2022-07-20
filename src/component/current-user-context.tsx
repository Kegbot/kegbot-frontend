import { useState, useEffect, createContext, useContext } from "react";
import ApiContext from "./api-context";

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
  }

  useEffect(() => {
    async function load() {
      try {
        setCurrentUser(await apiClient.getCurrentUser());
      } catch (e) {
        console.error(e);
        setCurrentUser(null);
      }
    }
    if (apiClient) {
      load();
    }
  }, [apiClient]);

  return (
    <CurrentUserContext.Provider
      value={{
        currentUser,
        isLoggedIn: !!currentUser,
        login,
        logout,
      }}
    >
      {children}
    </CurrentUserContext.Provider>
  );
};

export const CurrentUserConsumer = CurrentUserContext.Consumer;
export default CurrentUserContext;
