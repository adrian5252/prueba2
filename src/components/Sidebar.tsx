import { NavLink } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import {
  Users, BookOpen, GraduationCap, ClipboardList, Stethoscope,
  Droplet, HandHeart, Activity, FileText, Settings, LogOut,
  Home, X, Menu, HelpCircle, User
} from "lucide-react";
import { useState } from "react";

interface NavItem {
  title: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  roles?: string[];
}

const navItems: NavItem[] = [
  { title: "Inicio", href: "/", icon: Home },
  { title: "Alumnos", href: "/alumnos", icon: Users },
  { title: "Etapa I", href: "/etapa-1", icon: BookOpen, roles: ['admin', 'maestra-etapa1'] },
  { title: "Etapa II", href: "/etapa-2", icon: BookOpen, roles: ['admin', 'maestra-etapa2'] },
  { title: "Etapa III", href: "/etapa-3", icon: BookOpen, roles: ['admin', 'maestra-etapa3'] },
  { title: "Expedientes", href: "/expedientes", icon: FileText },
  { title: "Pedagogía", href: "/pedagogia", icon: GraduationCap, roles: ['admin', 'pedagogia'] },
  { title: "Psicología", href: "/psicologia", icon: Stethoscope, roles: ['admin', 'psicologia'] },
  { title: "Nutrición", href: "/nutricion", icon: Droplet, roles: ['admin', 'nutricion'] },
  { title: "Trabajo Social", href: "/trabajo-social", icon: HandHeart, roles: ['admin', 'trabajo-social'] },
  { title: "Conducta", href: "/conducta", icon: Activity },
  { title: "General", href: "/general", icon: ClipboardList },
  { title: "Formatos", href: "/formatos", icon: FileText },
  { title: "Ayuda", href: "/ayuda", icon: HelpCircle },
  { title: "Administración", href: "/administracion", icon: Settings, roles: ['admin'] },
];

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export const Sidebar = ({ isOpen, onClose }: SidebarProps) => {
  const { user, logout } = useAuth();

  const filteredItems = navItems.filter(item => {
    if (!item.roles) return true;
    if (!user) return false;
    return item.roles.includes(user.role);
  });

  return (
    <>
      {/* Overlay para móvil */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed lg:static inset-y-0 left-0 z-50 w-64 bg-white border-r border-gray-200 flex flex-col transform transition-transform duration-200 ease-in-out lg:transform-none ${
          isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-4 border-b border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="h-10 w-10 bg-primary/10 rounded-lg flex items-center justify-center">
              <Users className="h-5 w-5 text-primary" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-900">EduGest</p>
              <p className="text-xs text-gray-500">Gestión Escolar</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="lg:hidden p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* User info */}
        {user && (
          <div className="px-4 py-3 border-b border-gray-100">
            <div className="flex items-center space-x-3">
              <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center overflow-hidden">
                {user.photo ? (
                  <img src={user.photo} alt={user.name} className="h-full w-full object-cover" />
                ) : (
                  <User className="h-5 w-5 text-primary" />
                )}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 truncate">{user.name}</p>
                <p className="text-xs text-gray-500 truncate capitalize">
                  {user.role.replace('-', ' ')}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto py-2 px-2">
          {filteredItems.map((item) => (
            <NavLink
              key={item.href}
              to={item.href}
              onClick={onClose}
              className={({ isActive }) =>
                `flex items-center px-3 py-2.5 my-0.5 text-sm font-medium rounded-lg transition-colors ${
                  isActive
                    ? "bg-primary/10 text-primary"
                    : "text-gray-700 hover:bg-gray-100"
                }`
              }
            >
              <item.icon className="h-5 w-5 mr-3" />
              <span>{item.title}</span>
            </NavLink>
          ))}
        </nav>

        {/* Footer */}
        <div className="border-t border-gray-200 p-2">
          <NavLink
            to="/perfil"
            onClick={onClose}
            className={({ isActive }) =>
              `flex items-center px-3 py-2.5 my-0.5 text-sm font-medium rounded-lg transition-colors ${
                isActive
                  ? "bg-primary/10 text-primary"
                  : "text-gray-700 hover:bg-gray-100"
              }`
            }
          >
            <User className="h-5 w-5 mr-3" />
            <span>Mi Perfil</span>
          </NavLink>
          <button
            onClick={logout}
            className="w-full flex items-center px-3 py-2.5 my-0.5 text-sm font-medium text-red-600 hover:bg-red-50 rounded-lg transition-colors"
          >
            <LogOut className="h-5 w-5 mr-3" />
            <span>Cerrar sesión</span>
          </button>
        </div>
      </aside>
    </>
  );
};

// Botón hamburguesa para móvil
export const MenuButton = ({ onClick }: { onClick: () => void }) => (
  <button
    onClick={onClick}
    className="lg:hidden p-2 text-gray-600 hover:bg-gray-100 rounded-lg"
  >
    <Menu className="h-6 w-6" />
  </button>
);