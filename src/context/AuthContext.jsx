import { createContext, useState, useEffect } from 'react';
import api from '../services/api';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({ token: localStorage.getItem('token'), isAuthenticated: null, loading: true });

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setAuth({ token, isAuthenticated: true, loading: false });
    } else {
      setAuth({ token: null, isAuthenticated: false, loading: false });
    }
  }, []);

  const login = async (username, password) => {
    try {
      const { data } = await api.post('/auth/login', { username, password });
      localStorage.setItem('token', data.token);
      setAuth({ token: data.token, isAuthenticated: true, loading: false });
      return { success: true };
    } catch (error) {
      console.error('Login error:', error);
      setAuth({ token: null, isAuthenticated: false, loading: false });
      throw error;
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setAuth({ token: null, isAuthenticated: false, loading: false });
  };

  return (
    <AuthContext.Provider value={{ ...auth, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
