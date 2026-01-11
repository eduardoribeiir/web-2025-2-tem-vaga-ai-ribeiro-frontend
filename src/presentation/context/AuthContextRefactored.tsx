/**
 * Refactored Auth Context - Uses services following SRP
 * Responsibilities:
 * - Manage authentication state
 * - Provide auth context to components
 * - Delegate business logic to services
 */
import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { httpClient } from '../../infrastructure/api/HttpClient';
import { AuthService, User } from '../../application/services/AuthService';
import { StorageService } from '../../application/services/StorageService';

interface AuthContextValue {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
  updateProfile: (changes: Partial<User>) => void;
  loading: boolean;
  error: string | null;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

// Dependency Injection - Services are created outside component
const authService = new AuthService();
const storageService = new StorageService();

export const AuthProviderRefactored = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Restore session on mount
  useEffect(() => {
    const storedUser = storageService.getUser();
    const storedToken = storageService.getToken();
    
    if (storedUser && storedToken) {
      // Verify token is still valid
      if (authService.isTokenValid(storedToken)) {
        setUser(storedUser);
        httpClient.setToken(storedToken);
      } else {
        // Token expired, clear storage
        storageService.clearAll();
      }
    }
  }, []);

  const register = async (name: string, email: string, password: string) => {
    setLoading(true);
    setError(null);
    try {
      // Delegate to service
      const result = await authService.register(name, email, password);
      
      // Extract data
      const userData = {
        id: result.user.id,
        name: result.user.name,
        email: result.user.email
      };
      const token = result.token.access_token;
      
      // Update state
      setUser(userData);
      
      // Persist
      storageService.saveUser(userData);
      storageService.saveToken(token);
      
      // Configure HTTP client
      httpClient.setToken(token);
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Registration failed';
      setError(message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const login = async (email: string, password: string) => {
    setLoading(true);
    setError(null);
    try {
      // Delegate to service
      const result = await authService.login(email, password);
      
      // Extract data
      const userData = {
        id: result.user.id,
        name: result.user.name,
        email: result.user.email
      };
      const token = result.token.access_token;
      
      // Update state
      setUser(userData);
      
      // Persist
      storageService.saveUser(userData);
      storageService.saveToken(token);
      
      // Configure HTTP client
      httpClient.setToken(token);
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Login failed';
      setError(message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    // Clear state
    setUser(null);
    setError(null);
    
    // Clear storage
    storageService.clearAll();
    
    // Clear HTTP client token
    httpClient.setToken(null);
  };

  const updateProfile = (changes: Partial<User>) => {
    if (!user) return;
    
    const updated = { ...user, ...changes };
    setUser(updated);
    storageService.saveUser(updated);
  };

  // Memoize context value to prevent unnecessary rerenders
  const value = useMemo<AuthContextValue>(
    () => ({
      user,
      isAuthenticated: !!user,
      login,
      register,
      logout,
      updateProfile,
      loading,
      error,
    }),
    [user, loading, error]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

/**
 * Hook to use auth context
 */
export const useAuthRefactored = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuthRefactored must be used within AuthProviderRefactored');
  }
  return context;
};
