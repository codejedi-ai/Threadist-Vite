import React, { createContext, useContext, ReactNode } from 'react';
import { useAuth0 } from '@auth0/auth0-react';

interface AuthContextType {
  user: any;
  isAuthenticated: boolean;
  isLoading: boolean;
  loginWithRedirect: () => void;
  logout: (options?: any) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const {
    user,
    isAuthenticated,
    isLoading,
    loginWithRedirect,
    logout: auth0Logout
  } = useAuth0();

  const logout = (options?: any) => {
    auth0Logout({
      logoutParams: {
        returnTo: window.location.origin,
        ...options?.logoutParams
      }
    });
  };

  const value = {
    user,
    isAuthenticated,
    isLoading,
    loginWithRedirect,
    logout,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};