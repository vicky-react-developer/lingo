import React, { createContext, useContext, useState, useEffect } from 'react';
import { getOneUser } from '../services/userService';
import { userLogout } from '../services/authService';
import type { User } from '../types/users';
import { getUser } from '../utils/auth';
import { useLogoutUserMutation } from '../state/api/auth.api';

interface AuthContextProps {
  token: string | null;
  user: User | null;
  isLoggedIn: boolean;
  login: (newToken: string, userData: User) => void;
  logout: () => Promise<void>;
  fetchUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextProps | null>(null);

interface AuthProviderProps {
  children: React.ReactNode
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [logoutUser] = useLogoutUserMutation();

  const [token, setToken] = useState(() => localStorage.getItem('token'));
  const [user, setUser] = useState<User | null>(getUser());

  useEffect(() => {
    if (token) {
      fetchUser();
    }
  }, [token]);

  const fetchUser = async () => {
    try {
      const res = await getOneUser();
      if (res?.success) {
        setUser(res?.data);
      }
    } catch (e) {
      console.log("fetchUser error:", e);
    }
  };

  const isLoggedIn = !!token;

  const login = (newToken: string, userData: User) => {
    localStorage.setItem('token', newToken);
    setToken(newToken);
    if (userData) {
      localStorage.setItem('user', JSON.stringify(userData));
      setUser(userData);
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
      setUser(null);
    }
  };

  return (
    <AuthContext.Provider value={{ token, user, isLoggedIn, login, logout, fetchUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used inside <AuthProvider>');
  return ctx;
}