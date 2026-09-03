import { NavLink } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Users, BookOpen, GraduationCap, ClipboardList, Stethoscope, Droplet, HandHeart, Activity, FileText, Settings, LogOut } from "lucide-react";

interface NavItem {
  title: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
}

const navItems: NavItem[] = [
  { title: "Inicio", href: "/", icon: Users },
  { title: "Alumnos", href: "/alumnos", icon: Users },
  { title: "Etapa I", href: "/etapa-1", icon: BookOpen },
  { title: "Etapa II", href: "/etapa-2", icon: BookOpen },
  { title: "Etapa III", href: "/etapa-3", icon: BookOpen },
  { title: "Expedientes", href: "/expedientes", icon: FileText },
  { title: "Pedagogía", href: "/pedagogia", icon: GraduationCap },
  { title: "Psicología", href: "/psicologia", icon: Stethoscope },
  { title: "Nutrición", href: "/nutricion", icon: Droplet },
  { title: "Trabajo Social", href: "/trabajo-social", icon: HandHeart },
  { title: "Conducta", href: "/conducta", icon: Activity },
  { title: "General", href: "/general", icon: ClipboardList },
  { title: "Formatos e impresión", href: "/formatos", icon: FileText },
  { title: "Administración", href: "/administracion", icon: Settings },
];

export const Sidebar = () => {
  const { user, logout } = useAuth();
  return (
    <aside className="w-64 bg-white border-r border-gray-200 flex flex-col">
      <div className="flex items-center px-4 py-6 border-b border-gray-200">
        <div className="flex-shrink-0">
          <div className="h-10 w-10 bg-primary/10 rounded-lg flex items-center justify-center">
            <Users className="h-5 w-5 text-primary" />
          </div>
        </div>
        <div className="flex-1 ml-3 space-y-1">
          <p className="text-sm font-medium text-gray-900">EduGest</p>
          <p className="text-xs text-gray-500">Gestión Escolar</p>
        </div>
      </div>
      <nav className="mt-2 space-y-1 flex-1 overflow-y-auto">
        {navItems.map((item) => (
          <div key={item.href} className="px-2">
            <NavLink
              to={item.href}
              end={item.href === "/"}
              className={({ isActive }) =>
                `flex w-full items-center px-3 py-2 text-sm font-medium text-gray-700 rounded-lg transition-colors ${
                  isActive ? "bg-primary/10 text-primary" : "hover:bg-gray-50"
                }`
              }
            >
              <item.icon className="h-4 w-4 mr-3" />
              <span>{item.title}</span>
            </NavLink>
          </div>
        ))}
      </nav>
      <div className="mt-auto px-4 py-4 border-t border-gray-200">
        <button
          onClick={() => logout()}
          className="w-full flex items-center px-3 py-2 text-sm font-medium text-gray-700 rounded-lg transition-colors hover:bg-gray-50"
        >
          <LogOut className="h-4 w-4 mr-3" />
          <span>Cerrar sesión</span>
        </button>
      </div>
    </aside>
  );
};