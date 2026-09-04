import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  initializeData,
  getCurrentUser,
  setCurrentUser,
  getUsers,
  updateUser,
  canAccessStage,
  canManageUsers,
  User,
} from '@/lib/dataStore';

interface AuthContextProps {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
  updateProfile: (updates: Partial<User>) => void;
  changePassword: (currentPassword: string, newPassword: string) => Promise<void>;
  canAccessStage: (stage: string) => boolean;
  canManageUsers: () => boolean;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    initializeData();
    const stored = getCurrentUser();
    if (stored) {
      // Verificar que el usuario aún existe y está activo
      const users = getUsers();
      const freshUser = users.find(u => u.id === stored.id);
      if (freshUser && freshUser.status === 'Activo') {
        setUser(freshUser);
        setCurrentUser(freshUser);
      } else {
        setCurrentUser(null);
      }
    }
    setLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    const users = getUsers();
    const found = users.find(u => u.email === email && u.password === password);

    if (!found) {
      throw new Error('Credenciales inválidas');
    }
    if (found.status === 'Deshabilitado') {
      throw new Error('Su cuenta ha sido deshabilitada. Contacte al administrador.');
    }

    // Actualizar último login
    const updated: User = {
      ...found,
      lastLogin: new Date().toISOString().replace('T', ' ').slice(0, 16),
    };
    updateUser(updated);
    setUser(updated);
    setCurrentUser(updated);
  };

  const logout = () => {
    setUser(null);
    setCurrentUser(null);
    window.location.href = '/login';
  };

  const updateProfile = (updates: Partial<User>) => {
    if (!user) return;
    const updated: User = { ...user, ...updates };
    updateUser(updated);
    setUser(updated);
    setCurrentUser(updated);
  };

  const changePassword = async (currentPassword: string, newPassword: string) => {
    if (!user) throw new Error('No hay sesión activa');
    if (user.password !== currentPassword) {
      throw new Error('La contraseña actual es incorrecta');
    }
    if (newPassword.length < 6) {
      throw new Error('La nueva contraseña debe tener al menos 6 caracteres');
    }
    const updated: User = { ...user, password: newPassword };
    updateUser(updated);
    setUser(updated);
    setCurrentUser(updated);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-gray-600">Cargando...</div>
      </div>
    );
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
        isAuthenticated: !!user,
        updateProfile,
        changePassword,
        canAccessStage: (stage: string) => canAccessStage(user, stage),
        canManageUsers: () => canManageUsers(user),
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};