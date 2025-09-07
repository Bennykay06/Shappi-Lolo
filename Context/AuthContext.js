import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Create the context
const AuthContext = createContext();

const AUTH_STORAGE_KEY = '@user_auth';
const USER_DATA_KEY = '@user_data';

// Provider component
export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [authToken, setAuthToken] = useState(null);

  // Load authentication state from AsyncStorage on app start
  useEffect(() => {
    loadAuthFromStorage();
  }, []);

  const loadAuthFromStorage = async () => {
    try {
      const storedAuth = await AsyncStorage.getItem(AUTH_STORAGE_KEY);
      const storedUser = await AsyncStorage.getItem(USER_DATA_KEY);
      
      if (storedAuth && storedUser) {
        const authData = JSON.parse(storedAuth);
        const userData = JSON.parse(storedUser);
        
        setIsAuthenticated(authData.isAuthenticated);
        setAuthToken(authData.token);
        setUser(userData);
      }
    } catch (error) {
      console.error('Error loading auth from storage:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const saveAuthToStorage = async (authData, userData) => {
    try {
      await AsyncStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(authData));
      if (userData) {
        await AsyncStorage.setItem(USER_DATA_KEY, JSON.stringify(userData));
      }
    } catch (error) {
      console.error('Error saving auth to storage:', error);
    }
  };

  const clearAuthFromStorage = async () => {
    try {
      await AsyncStorage.multiRemove([AUTH_STORAGE_KEY, USER_DATA_KEY]);
    } catch (error) {
      console.error('Error clearing auth from storage:', error);
    }
  };

  // Login function
  const login = async (email, password) => {
    try {
      // Simulate API call - replace with actual authentication
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // For demo purposes, accept any email/password
      // In production, validate against your backend
      const userData = {
        id: Date.now(),
        name: email.split('@')[0], // Extract name from email for demo
        email: email,
        createdAt: new Date().toISOString(),
      };

      const authData = {
        isAuthenticated: true,
        token: `token_${Date.now()}`, // Generate demo token
        loginTime: new Date().toISOString(),
      };

      // Update state
      setIsAuthenticated(true);
      setUser(userData);
      setAuthToken(authData.token);

      // Save to storage
      await saveAuthToStorage(authData, userData);

      return { success: true, user: userData };
    } catch (error) {
      console.error('Login error:', error);
      return { success: false, error: error.message };
    }
  };

  // Register function
  const register = async (name, email, password) => {
    try {
      // Simulate API call - replace with actual registration
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // For demo purposes, always succeed
      // In production, validate and create user in your backend
      const userData = {
        id: Date.now(),
        name: name,
        email: email,
        createdAt: new Date().toISOString(),
      };

      const authData = {
        isAuthenticated: true,
        token: `token_${Date.now()}`, // Generate demo token
        loginTime: new Date().toISOString(),
      };

      // Update state
      setIsAuthenticated(true);
      setUser(userData);
      setAuthToken(authData.token);

      // Save to storage
      await saveAuthToStorage(authData, userData);

      return { success: true, user: userData };
    } catch (error) {
      console.error('Registration error:', error);
      return { success: false, error: error.message };
    }
  };

  // Logout function
  const logout = async () => {
    try {
      // Clear state
      setIsAuthenticated(false);
      setUser(null);
      setAuthToken(null);

      // Clear storage
      await clearAuthFromStorage();

      return { success: true };
    } catch (error) {
      console.error('Logout error:', error);
      return { success: false, error: error.message };
    }
  };

  // Update user profile
  const updateUserProfile = async (updatedData) => {
    try {
      const updatedUser = { ...user, ...updatedData };
      setUser(updatedUser);

      // Save updated user data
      await AsyncStorage.setItem(USER_DATA_KEY, JSON.stringify(updatedUser));

      return { success: true, user: updatedUser };
    } catch (error) {
      console.error('Profile update error:', error);
      return { success: false, error: error.message };
    }
  };

  // Check if token is valid (for API calls)
  const isTokenValid = () => {
    return authToken && isAuthenticated;
  };

  const value = {
    // State
    isAuthenticated,
    user,
    isLoading,
    authToken,
    
    // Actions
    login,
    register,
    logout,
    updateUserProfile,
    isTokenValid,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use the auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};