import React, { createContext, useState, useEffect, useContext } from 'react';

class User {
  id: string;
  name: string;
  // Add other user properties as needed
  constructor(id: string, name: string) {
    this.id = id;
    this.name = name;
  }
}
// Define the shape of the context value
interface AuthContextProps {
  isLoggedIn: boolean;
  login: () => void;
  logout: () => void;
  user: User| null; // Replace 'any' with a more specific type if you have user data
}

// Create the context with a default value
const AuthContext = createContext<AuthContextProps>({
  isLoggedIn: false,
  login: () => {},
  logout: () => {},
  user: null, // Replace 'null' with a more specific default value if needed
});

// Create a provider component
interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    // Check for token in local storage on initial load
    const token = localStorage.getItem('token');
    if (token) {
      // Verify token and fetch user data
      // Example:
      // api.verifyToken(token)
      //   .then(userData => {
      //     setIsLoggedIn(true);
      //     setUser(userData);
      //   })
      //   .catch(() => {
      //     localStorage.removeItem('token');
      //   });
      setIsLoggedIn(true); //set to true for now
    }
  }, []);

  const login = async (/* credentials */) => {
    // Make API call to authenticate user
    // Example:
    // api.login(credentials)
    //   .then(data => {
    //     localStorage.setItem('token', data.token);
    //     setIsLoggedIn(true);
    //     setUser(data.user);
    //   });
    localStorage.setItem('token', 'test-token');
    setIsLoggedIn(true);
    setUser({ id: 'some-user-id', name: 'Test User' });
  };

  const logout = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
    setUser(null);
  };

  const value: AuthContextProps = {
    isLoggedIn,
    login,
    logout,
    user,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

// Create a custom hook to use the context
export const useAuth = () => {
  return useContext(AuthContext);
};