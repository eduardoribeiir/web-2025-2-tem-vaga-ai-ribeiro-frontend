import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { httpClient } from '../../infrastructure/api/HttpClient';

interface User {
  id?: string;
  name?: string;
  email: string;
  phone?: string;
  avatarUrl?: string; // base64 or external URL
}

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

const STORAGE_KEY = 'temVagaAi.user';
const TOKEN_KEY = 'temVagaAi.token';

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem(STORAGE_KEY);
    const storedToken = localStorage.getItem(TOKEN_KEY);
    if (storedUser && storedToken) {
      setUser(JSON.parse(storedUser));
      httpClient.setToken(storedToken);
    }
  }, []);

  const register = async (name: string, email: string, password: string) => {
    setLoading(true);
    setError(null);
    try {
      const result = await httpClient.post<any>('/auth/register', { name, email, password });
      const userData = { id: result.user.id, name: result.user.name, email: result.user.email };
      setUser(userData);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(userData));
      localStorage.setItem(TOKEN_KEY, result.token);
      httpClient.setToken(result.token);
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Erro ao registrar';
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
      const result = await httpClient.post<any>('/auth/login', { email, password });
      const userData = { id: result.user.id, name: result.user.name, email: result.user.email };
      setUser(userData);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(userData));
      localStorage.setItem(TOKEN_KEY, result.token);
      httpClient.setToken(result.token);
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Erro ao fazer login';
      setError(message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem(STORAGE_KEY);
    localStorage.removeItem(TOKEN_KEY);
    httpClient.setToken(null);
  };

  const updateProfile = (changes: Partial<User>) => {
    setUser(prev => {
      const updated = { ...(prev || { email: '' }), ...changes } as User;
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      return updated;
    });
  };

  const value = useMemo(
    () => ({ user, isAuthenticated: Boolean(user), login, register, logout, updateProfile, loading, error }),
    [user, loading, error]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = (): AuthContextValue => {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return ctx;
};
