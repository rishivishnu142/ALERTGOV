import { createContext, useContext, useState } from 'react';
import api from '../api';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const stored = localStorage.getItem('alertgov_user');
    return stored ? JSON.parse(stored) : null;
  });
  const [loginAttempts, setLoginAttempts] = useState(0);

  const login = async (officerId, password) => {
    try {
      const response = await api.post('/api/v1/auth/login', {
        username: officerId,
        password: password
      });

      if (response.data && response.data.success) {
        setLoginAttempts(0);
        const userData = { ...response.data.user, loginTime: new Date().toISOString() };
        
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('alertgov_user', JSON.stringify(userData));
        setUser(userData);
        
        return { success: true, user: userData };
      } else {
        throw new Error('Invalid response from server');
      }
    } catch (error) {
      const attempts = loginAttempts + 1;
      setLoginAttempts(attempts);
      const errMsg = error.response?.data?.message || 'Invalid Officer ID or Password';
      throw new Error(`${errMsg} — Attempt ${attempts} of 5`);
    }
  };

  const logout = () => {
    localStorage.removeItem('alertgov_user');
    localStorage.removeItem('token');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loginAttempts }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
