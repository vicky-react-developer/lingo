import React, { createContext, useContext, useState, useEffect } from 'react';
import { userLogout } from '../services/authService';
import type { User } from '../types/users';
import { getUser } from '../utils/auth';
import { useLogoutUserMutation } from '../state/api/auth.api';
import { useFetchCurrentUserQuery } from '../state/api/user.api';

interface AuthContextProps {
  token: string | null;
  user: User | undefined;
  isLoggedIn: boolean;
  login: (newToken: string, userData: User) => void;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextProps | null>(null);

interface AuthProviderProps {
  children: React.ReactNode
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [logoutUser] = useLogoutUserMutation();

  const [token, setToken] = useState(() => localStorage.getItem('token'));

  const { data } = useFetchCurrentUserQuery(undefined, { skip: !token });

  const isLoggedIn = !!token;

  const login = (newToken: string, userData: User) => {
    localStorage.setItem('token', newToken);
    setToken(newToken);
    if (userData) {
      localStorage.setItem('user', JSON.stringify(userData));
    }
  };

  const logout = async () => {
    try {
      await logoutUser();
    } catch (e) {
      console.log("API logout error:", e);
    } finally {
      userLogout();         // clears localStorage
      setToken(null);
      // setUser(null);
    }
  };

  return (
    <AuthContext.Provider value={{ token, user: data?.data, isLoggedIn, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used inside <AuthProvider>');
  return ctx;
}