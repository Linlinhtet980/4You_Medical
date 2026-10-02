/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState } from 'react';
import { toast } from 'react-toastify';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem('4you_user');
    if (!storedUser) return null;

    try {
      return JSON.parse(storedUser);
    } catch {
      localStorage.removeItem('4you_user');
      return null;
    }
  });

  const login = (email, password) => {
    // DEMO LOGIC: Hardcoded credentials
    // In a real app, this would be an API call to your backend
    if (email === 'admin@4you.com' && password === 'password123') {
      const userData = {
        name: 'Admin User',
        email: email,
        role: 'Admin'
      };
      setUser(userData);
      localStorage.setItem('4you_user', JSON.stringify(userData));
      toast.success('Login successful!');
      return true;
    } else {
      toast.error('Invalid email or password!');
      return false;
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('4you_user');
    toast.info('Logged out successfully.');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
