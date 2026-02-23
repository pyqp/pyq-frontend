import { createContext, useContext, useEffect, useState, useCallback, type ReactNode } from 'react';
import { authApi } from '../api/Auth.api';
import type { User, RegisterPayload, LoginPayload } from '../api/Auth.api';

// ── Context shape ─────────────────────────────────────────────────────────────
interface AuthContextType {
  user:            User | null;
  isLoading:       boolean;
  isAuthenticated: boolean;
  login:           (payload: LoginPayload) => Promise<void>;
  register:        (payload: RegisterPayload) => Promise<void>;
  logout:          () => Promise<void>;
  updateUser:      (updates: Partial<User>) => void;
  refreshUser:     () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | null>(null);

// ── Provider ──────────────────────────────────────────────────────────────────
export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser]           = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const persistUser = (u: User) => {
    setUser(u);
    localStorage.setItem('user', JSON.stringify(u));
  };

  const clearSession = () => {
    setUser(null);
    localStorage.removeItem('accessToken');
    localStorage.removeItem('user');
  };

  // Silently validate token on mount
  useEffect(() => {
    const stored = localStorage.getItem('user');
    const token  = localStorage.getItem('accessToken');

    if (stored && token) {
      try { setUser(JSON.parse(stored)); } catch { /* corrupt — will re-fetch */ }
      authApi.getMe()
        .then(({ data }) => persistUser(data.data))
        .catch(() => clearSession())
        .finally(() => setIsLoading(false));
    } else {
      setIsLoading(false);
    }
  }, []);

  const login = useCallback(async (payload: LoginPayload) => {
    const { data } = await authApi.login(payload);
    localStorage.setItem('accessToken', data.data.accessToken);
    persistUser(data.data.user);
  }, []);

  const register = useCallback(async (payload: RegisterPayload) => {
    const { data } = await authApi.register(payload);
    localStorage.setItem('accessToken', data.data.accessToken);
    persistUser(data.data.user);
  }, []);

  const logout = useCallback(async () => {
    try { await authApi.logout(); } catch { /* ignore */ }
    clearSession();
  }, []);

  const updateUser = useCallback((updates: Partial<User>) => {
    setUser(prev => {
      if (!prev) return prev;
      const next = { ...prev, ...updates };
      localStorage.setItem('user', JSON.stringify(next));
      return next;
    });
  }, []);

  const refreshUser = useCallback(async () => {
    const { data } = await authApi.getMe();
    persistUser(data.data);
  }, []);

  return (
    <AuthContext.Provider value={{
      user, isLoading,
      isAuthenticated: !!user,
      login, register, logout, updateUser, refreshUser,
    }}>
      {children}
    </AuthContext.Provider>
  );
};

// ── Hook ──────────────────────────────────────────────────────────────────────
export const useAuth = (): AuthContextType => {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error(
      'useAuth() must be used inside <AuthProvider>.\n\n' +
      'Fix: Make sure your component is rendered inside the router tree.\n' +
      'In router.tsx, wrap all routes with <AuthRoot> which renders <AuthProvider><Outlet/></AuthProvider>.'
    );
  }
  return ctx;
};

// Named re-export for convenience
export type { AuthContextType };