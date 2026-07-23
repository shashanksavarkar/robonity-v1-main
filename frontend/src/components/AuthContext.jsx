'use client';

import React, { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext(null);
export const useAuth = () => useContext(AuthContext);

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    // One-time sync from an external store (localStorage) that doesn't exist during SSR,
    // so this can't be a render-time state derivation.
    const storedUser = localStorage.getItem("user");
    // eslint-disable-next-line react-hooks/set-state-in-effect
    if (storedUser) setCurrentUser(JSON.parse(storedUser));
  }, []);

  const logout = () => {
    localStorage.removeItem("user");
    setCurrentUser(null);
  };

  return <AuthContext.Provider value={{ currentUser, isAuthenticated: !!currentUser, setCurrentUser, logout }}>{children}</AuthContext.Provider>;
}
