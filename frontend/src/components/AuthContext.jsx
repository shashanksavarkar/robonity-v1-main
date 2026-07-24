'use client';

import React, { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext(null);
export const useAuth = () => useContext(AuthContext);

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  // Distinguishes "haven't checked localStorage yet" from "checked, no user" —
  // without it, consumers (e.g. ProtectedRoute) can't tell the difference and
  // will treat every fresh page load as logged-out before this effect runs.
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    // One-time sync from an external store (localStorage) that doesn't exist during SSR,
    // so this can't be a render-time state derivation.
    const storedUser = localStorage.getItem("user");
    // eslint-disable-next-line react-hooks/set-state-in-effect
    if (storedUser) setCurrentUser(JSON.parse(storedUser));
    setIsInitialized(true);
  }, []);

  const logout = () => {
    localStorage.removeItem("user");
    setCurrentUser(null);
  };

  return <AuthContext.Provider value={{ currentUser, isAuthenticated: !!currentUser, setCurrentUser, logout, isInitialized }}>{children}</AuthContext.Provider>;
}
