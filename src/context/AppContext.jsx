import { createContext, useState, useMemo, useEffect, useCallback } from "react";

export const AppContext = createContext();

function AppContextProvider({ children }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [user, setUser] = useState(null);

  const login = useCallback((sessionUser) => {
    setIsLoggedIn(true);
    setUser(sessionUser);
  }, []);

  const logout = useCallback(() => {
    setIsLoggedIn(false);
    setUser(null);
  }, []);

  useEffect(() => {
    document.body.classList.toggle("dark-mode", darkMode);
  }, [darkMode]);

  const value = useMemo(
    () => ({
      isLoggedIn,
      setIsLoggedIn,
      darkMode,
      setDarkMode,
      user,
      setUser,
      login,
      logout,
    }),
    [isLoggedIn, darkMode, user, login, logout]
  );

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
}

export default AppContextProvider;