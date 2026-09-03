import React, { createContext, useContext, useState, useEffect } from 'react';

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'maestra-etapa1' | 'maestra-etapa2' | 'maestra-etapa3' | 'pedagogia' | 'psicologia' | 'nutricion' | 'trabajo-social';
}

interface AuthContextProps {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const stored = localStorage.getItem('edugest-user');
    if (stored) {
      try {
        setUser(JSON.parse(stored));
      } catch {
        // ignore
      }
    }
    setLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    const users: Record<string, { password: string; user: User }> = {
      'admin@colegio.edu': { password: 'admin123', user: { id: '1', name: 'Administrador', email: 'admin@colegio.edu', role: 'admin' } },
      'maestra1@colegio.edu': { password: 'etapa123', user: { id: '2', name: 'Maestra Etapa I', email: 'maestra1@colegio.edu', role: 'maestra-etapa1' } },
      'maestra2@colegio.edu': { password: 'etapa123', user: { id: '3', name: 'Maestra Etapa II', email: 'maestra2@colegio.edu', role: 'maestra-etapa2' } },
      'maestra3@colegio.edu': { password: 'etapa123', user: { id: '4', name: 'Maestra Etapa III', email: 'maestra3@colegio.edu', role: 'maestra-etapa3' } },
      'pedagogia@colegio.edu': { password: 'pedago123', user: { id: '5', name: 'Pedagogo', email: 'pedagogia@colegio.edu', role: 'pedagogia' } },
      'psicologia@colegio.edu': { password: 'psico123', user: { id: '6', name: 'Psicólogo', email: 'psicologia@colegio.edu', role: 'psicologia' } },
      'nutricion@colegio.edu': { password: 'nutri123', user: { id: '7', name: 'Nutricionista', email: 'nutricion@colegio.edu', role: 'nutricion' } },
      'trabajosocial@colegio.edu': { password: 'ts123', user: { id: '8', name: 'Trabajador Social', email: 'trabajosocial@colegio.edu', role: 'trabajo-social' } },
    };

    const u = users[email];
    if (!u || u.password !== password) {
      throw new Error('Credenciales inválidas');
    }
    setUser(u.user);
    localStorage.setItem('edugest-user', JSON.stringify(u.user));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('edugest-user');
    window.location.href = '/login';
  };

  if (loading) {
    return null;
  }

  return (
    <AuthContext.Provider value={{ user, login, logout, isAuthenticated: !!user }}>
      {children}
    </AuthContext.Provider>
  );
};