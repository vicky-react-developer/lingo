import { createContext, useContext, useState, useEffect } from 'react';
import { getOneUser } from '../services/userService';
import { userLogout } from '../services/authService';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [token, setToken] = useState(() => localStorage.getItem('token'));
  const [user, setUser] = useState(null);

  useEffect(() => {
    if(token) {
      fetchUser();
    }
  }, [token]);

  const fetchUser = async() => {
    try {
      const res = await getOneUser();
      if(res?.success) {
        setUser(res?.data);
      }
    } catch(e) {
      console.log("fetchUser error:", e)
    }
  }

  const isLoggedIn = !!token;

  const login = (newToken, userData = null) => {
    localStorage.setItem('token', newToken);
    setToken(newToken);

    if (userData) {
      localStorage.setItem('user', JSON.stringify(userData));
      setUser(userData);
    }
  };

  const logout = () => {
    userLogout();
    setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ token, user, isLoggedIn, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used inside <AuthProvider>');
  return ctx;
}