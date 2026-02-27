'use client';

import {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
  type ReactNode,
} from 'react';

interface AdminUser {
  id: string;
  email: string;
  name: string;
  role: string;
}

interface AuthContextValue {
  user: AdminUser | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AdminUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const verifyToken = useCallback(async () => {
    try {
      const response = await fetch('/api/auth/verify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({}), // Token is sent via cookie (credentials: 'include')
        credentials: 'include',
      });

      if (response.ok) {
        const data = await response.json();
        setUser(data.user);
        return true;
      }
    } catch {
      // Ignore
    }
    setUser(null);
    return false;
  }, []);

  const checkAuth = useCallback(async () => {
    setIsLoading(true);
    await verifyToken();
    setIsLoading(false);
  }, [verifyToken]);

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  const login = useCallback(
    async (email: string, password: string): Promise<boolean> => {
      try {
        const response = await fetch('/api/auth/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, password }),
          credentials: 'include',
        });

        const data = await response.json();

        if (data.success && data.user) {
          setUser(data.user);
          return true;
        }
      } catch {
        // Ignore
      }
      return false;
    },
    []
  );

  const logout = useCallback(() => {
    setUser(null);
    // Clear the auth cookie by fetching a logout endpoint or setting expired cookie
    // For now, we rely on the client clearing state; the cookie will be ignored
    // if we add a proper logout API that clears it. Redirect handles the UX.
    document.cookie =
      'admin-token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT';
  }, []);

  const value: AuthContextValue = {
    user,
    isLoading,
    isAuthenticated: !!user,
    login,
    logout,
  };

  return (
    <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
  );
}

export function useAuth(): AuthContextValue {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
