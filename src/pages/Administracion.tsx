import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { Users, Settings, UserPlus, ShieldCheck, Trash2, Edit3, CheckCircle, XCircle } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";

const mockUsers = [
  { id: 1, name: "Administrador", email: "admin@colegio.edu", role: "admin", status: "Activo", lastLogin: "2024-09-12 08:30", photo: null },
  { id: 2, name: "Maestra Etapa I", email: "maestra1@colegio.edu", role: "maestra-etapa1", status: "Activo", lastLogin: "2024-09-11 14:15", photo: null },
  { id: 3, name: "Maestra Etapa II", email: "maestra2@colegio.edu", role: "maestra-etapa2", status: "Activo", lastLogin: "2024-09-10 09:45", photo: null },
  { id: 4, name: "Maestra Etapa III", email: "maestra3@colegio.edu", role: "maestra-etapa3", status: "Activo", lastLogin: "2024-09-09 11:20", photo: null },
  { id: 5, name: "Pedagogo", email: "pedagogia@colegio.edu", role: "pedagogia", status: "Activo", lastLogin: "2024-09-08 16:00", photo: null },
  { id: 6, name: "Psicólogo", email: "psicologia@colegio.edu", role: "psicologia", status: "Activo", lastLogin: "2024-09-07 10:05", photo: null },
  { id: 7, name: "Nutricionista", email: "nutricion@colegio.edu", role: "nutricion", status: "Activo", lastLogin: "2024-09-06 09:30", photo: null },
  { id: 8, name: "Trabajador Social", email: "trabajosocial@colegio.edu", role: "trabajo-social", status: "Activo", lastLogin: "2024-09-05 14:00", photo: null },
];

const mockRoles = [
  { id: 1, name: "Administrador", description: "Acceso completo a todas las áreas y funciones del sistema", permissions: ["Todos"] },
  { id: 2, name: "Maestra Etapa I", description: "Acceso a gestión de alumnos de Etapa I", permissions: ["Alumnos", "Etapa I", "General", "Formatos"] },
  { id: 3, name: "Maestra Etapa II", description: "Acceso a gestión de alumnos de Etapa II", permissions: ["Alumnos", "Etapa II", "General", "Formatos"] },
  { id: 4, name: "Maestra Etapa III", description: "Acceso a gestión de alumnos de Etapa III", permissions: ["Alumnos", "Etapa III", "General", "Formatos"] },
  { id: 5, name: "Pedagogía", description: "Acceso a módulos académicos, calificaciones y seguimiento pedagógico", permissions: ["Alumnos", "Pedagogía", "General", "Formatos"] },
  { id: 6, name: "Psicología", description: "Acceso a módulos psicológicos, casos y seguimientos", permissions: ["Psicología", "General", "Formatos"] },
  { id: 7, name: "Nutrición", description: "Acceso a módulos nutricionales, planes y seguimientos", permissions: ["Nutrición", "General", "Formatos"] },
  { id: 8, name: "Trabajo Social", description: "Acceso a intervenciones y seguimientos de trabajo social", permissions: ["Trabajo Social", "General", "Formatos"] },
];

const roleColors: Record<string, string> = {
  "admin": "bg-primary/10 text-primary",
  "maestra-etapa1": "bg-blue-100 text-blue-800",
  "maestra-etapa2": "bg-green-100 text-green-800",
  "maestra-etapa3": "bg-purple-100 text-purple-800",
  "pedagogia": "bg-yellow-100 text-yellow-800",
  "psicologia": "bg-red-100 text-red-800",
  "nutricion": "bg-orange-100 text-orange-800",
  "trabajo-social": "bg-teal-100 text-teal-800",
};

const roleLabels: Record<string, string> = {
  "admin": "Administrador",
  "maestra-etapa1": "Maestra Etapa I",
  "maestra-etapa2": "Maestra Etapa II",
  "maestra-etapa3": "Maestra Etapa III",
  "pedagogia": "Pedagogía",
  "psicologia": "Psicología",
  "nutricion": "Nutrición",
  "trabajo-social": "Trabajo Social",
};

export default function Administracion() {
  const [search, setSearch] = useState("");
  const [filteredUsers, setFilteredUsers] = useState(mockUsers);
  const [activeTab, setActiveTab] = useState("usuarios");
  const [showUserModal, setShowUserModal] = useState(false);
  const [showRoleModal, setShowRoleModal] = useState(false);
  const [editingUser, setEditingUser] = useState<any>(null);
  const [editingRole, setEditingRole] = useState<any>(null);
  const [userFormData, setUserFormData] = useState({
    name: "",
    email: "",
    role: "",
    status: "Activo",
    photo: null as string | null,
  });
  const [roleFormData, setRoleFormData] = useState({
    name: "",
    description: "",
    permissions: [] as string[],
  });
  const { user, logout } = useAuth();

  useEffect(() => {
    const results = mockUsers.filter(
      (u) =>
        u.name.toLowerCase().includes(search.toLowerCase()) ||
        u.email.toLowerCase().includes(search.toLowerCase()) ||
        u.role.toLowerCase().includes(search.toLowerCase())
    );
    setFilteredUsers(results);
  }, [search]);

  const handleAddUser = () => {
    setEditingUser(null);
    setUserFormData({
      name: "",
      email: "",
      role: "",
      status: "Activo",
      photo: null,
    });
    setShowUserModal(true);
  };

  const handleEditUser = (userData: any) => {
    setEditingUser(userData);
    setUserFormData({
      name: userData.name,
      email: userData.email,
      role: userData.role,
      status: userData.status,
      photo: userData.photo,
    });
    setShowUserModal(true);
  };

  const handleDeleteUser = (userId: number) => {
    if (window.confirm("¿Está seguro de que desea eliminar este usuario?")) {
      // In a real app, this would be an API call
      toast.success("Usuario eliminado correctamente");
      // Simulate removal
      setFilteredUsers(prev => prev.filter(u => u.id !== userId));
    }
  };

  const handleToggleUserStatus = (userId: number) => {
    // In a real app, this would be an API call
    toast.success("Estado de usuario actualizado");
    setFilteredUsers(prev =>
      prev.map(u =>
        u.id === userId ? { ...u, status: u.status === "Activo" ? "Inactivo" : "Activo" } : u
      )
    );
  };

  const handleSaveUser = () => {
    if (!userFormData.name || !userFormData.email || !userFormData.role) {
      toast.error("Por favor complete todos los campos obligatorios");
      return;
    }

    if (editingUser) {
      // Update existing user
      toast.success("Usuario actualizado correctamente");
      setFilteredUsers(prev =>
        prev.map(u =>
          u.id === editingUser.id
            ? { ...u, ...userFormData, lastLogin: u.lastLogin }
            : u
        )
      );
    } else {
      // Add new user
      const newUser = {
        id: Math.max(...mockUsers.map(u => u.id)) + 1,
        ...userFormData,
        lastLogin: "Nunca",
      };
      toast.success("Usuario creado correctamente");
      setFilteredUsers(prev => [...prev, newUser]);
    }

    setShowUserModal(false);
  };

  const handleAddRole = () => {
    setEditingRole(null);
    setRoleFormData({
      name: "",
      description: "",
      permissions: [],
    });
    setShowRoleModal(true);
  };

  const handleEditRole = (roleData: any) => {
    setEditingRole(roleData);
    setRoleFormData({
      name: roleData.name,
      description: roleData.description,
      permissions: roleData.permissions,
    });
    setShowRoleModal(true);
  };

  const handleDeleteRole = (roleId: number) => {
    if (window.confirm("¿Está seguro de que desea eliminar este rol?")) {
      toast.success("Rol eliminado correctamente");
      // Simulate removal
    }
  };

  const handleSaveRole = () => {
    if (!roleFormData.name || !roleFormData.description) {
      toast.error("Por favor complete todos los campos obligatorios");
      return;
    }

    if (editingRole) {
      // Update existing role
      toast.success("Rol actualizado correctamente");
    } else {
      // Add new role
      toast.success("Rol creado correctamente");
    }

    setShowRoleModal(false);
  };

  return (
    <Card className="mb-6">
      <CardHeader className="pb-4">
        <CardTitle className="text-xl font-bold flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Settings className="h-5 w-5" />
            <span>Administración</span>
          </div>
          <div className="flex space-x-2">
            <Button variant="outline" onClick={handleAddUser}>
              <UserPlus className="mr-2 h-4 w-4" />
              Nuevo Usuario
            </Button>
            <Button variant="outline" onClick={handleAddRole}>
              <ShieldCheck className="mr-2 h-4 w-4" />
              Nuevo Rol
            </Button>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <Tabs defaultValue="usuarios" value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="usuarios">Usuarios</TabsTrigger>
            <TabsTrigger value="roles">Roles y Permisos</TabsTrigger>
          </TabsList>

          <TabsContent value="usuarios">
            <div className="space-y-4">
              <div className="relative w-full">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Buscar por nombre, email o rol..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-32">Nombre</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead className="w-28">Rol</TableHead>
                    <TableHead className="w-20">Estado</TableHead>
                    <TableHead className="w-24">Acciones</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredUsers.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={5} className="text-center py-4 text-gray-500">
                        No se encontraron usuarios
                      </TableCell>
                    </TableRow>
                  ) : (
                    filteredUsers.map((u) => (
                      <TableRow key={u.id}>
                        <TableCell className="font-medium">{u.name}</TableCell>
                        <TableCell>{u.email}</TableCell>
                        <TableCell>
                          <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${roleColors[u.role] || "bg-gray-100 text-gray-800"}`}>
                            {roleLabels[u.role] || u.role}
                          </span>
                        </TableCell>
                        <TableCell>
                          <span className={`px-2 py-0.5 text-xs rounded-full ${
                            u.status === "Activo"
                              ? "bg-green-100 text-green-800"
                              : "bg-red-100 text-red-800"
                          }`}>
                            {u.status}
                          </span>
                        </TableCell>
                        <TableCell className="flex space-x-2">
                          <Button variant="ghost" size="icon" aria-label="Ver usuario">
                            <Users className="h-4 w-4 text-primary" />
                          </Button>
                          <Button variant="outline" size="icon" onClick={() => handleEditUser(u)}>
                            <Edit3 className="h-4 w-4 text-warning" />
                          </Button>
                          <Button variant="destructive" size="icon" onClick={() => handleDeleteUser(u.id)}>
                            <Trash2 className="h-4 w-4 text-destructive" />
                          </Button>
                          <Button variant="outline" size="icon" onClick={() => handleToggleUserStatus(u.id)}>
                            {u.status === "Activo" ? (
                              <XCircle className="h-4 w-4 text-red-500" />
                            ) : (
                              <CheckCircle className="h-4 w-4 text-green-500" />
                            )}
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </div>
          </TabsContent>

          <TabsContent value="roles">
            <div className="space-y-4">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-32">Nombre del Rol</TableHead>
                    <TableHead>Descripción</TableHead>
                    <TableHead className="w-48">Permisos</TableHead>
                    <TableHead className="w-24">Acciones</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {mockRoles.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={4} className="text-center py-4 text-gray-500">
                        No se encontraron roles
                      </TableCell>
                    </TableRow>
                  ) : (
                    mockRoles.map((r) => (
                      <TableRow key={r.id}>
                        <TableCell className="font-medium">{r.name}</TableCell>
                        <TableCell className="text-sm">{r.description}</TableCell>
                        <TableCell className="text-sm">
                          {r.permissions.map((p) => (
                            <span key={p} className="inline-block bg-gray-200 text-xs px-2 py-0.5 mr-1 mb-1 rounded">
                              {p}
                            </span>
                          ))}
                        </TableCell>
                        <TableCell className="flex space-x-2">
                          <Button variant="ghost" size="icon" aria-label="Ver rol">
                            <ShieldCheck className="h-4 w-4 text-primary" />
                          </Button>
                          <Button variant="outline" size="icon" onClick={() => handleEditRole(r)}>
                            <Edit3 className="h-4 w-4 text-warning" />
                          </Button>
                          <Button variant="destructive" size="icon" onClick={() => handleDeleteRole(r.id)}>
                            <Trash2 className="h-4 w-4 text-destructive" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>

      {showUserModal && (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
        <div className="relative w-full max-w-md max-h-[90vh] overflow-y-auto">
          <div className="bg-white rounded-lg p-6 shadow-lg">
            <div className="flex justify-between items-start mb-4">
              <h2 className="text-xl font-bold">
                {editingUser ? "Editar Usuario" : "Nuevo Usuario"}
              </h2>
              <button
                onClick={() => setShowUserModal(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <span className="sr-only">Cerrar</span>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <form className="space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="block text-sm font-medium mb-2">Nombre *</label>
                  <Input
                    value={userFormData.name}
                    onChange={(e) => setUserFormData({ ...userFormData, name: e.target.value })}
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Email *</label>
                  <Input
                    type="email"
                    value={userFormData.email}
                    onChange={(e) => setUserFormData({ ...userFormData, email: e.target.value })}
                    required
                  />
                </div>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="block text-sm font-medium mb-2">Rol *</label>
                  <select
                    value={userFormData.role}
                    onChange={(e) => setUserFormData({ ...userFormData, role: e.target.value })}
                    className="w-full border rounded px-3 py-2"
                    required
                  >
                    <option value="">Seleccionar rol</option>
                    <option value="admin">Administrador</option>
                    <option value="maestra-etapa1">Maestra Etapa I</option>
                    <option value="maestra-etapa2">Maestra Etapa II</option>
                    <option value="maestra-etapa3">Maestra Etapa III</option>
                    <option value="pedagogia">Pedagogía</option>
                    <option value="psicologia">Psicología</option>
                    <option value="nutricion">Nutrición</option>
                    <option value="trabajo-social">Trabajo Social</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Estado</label>
                  <select
                    value={userFormData.status}
                    onChange={(e) => setUserFormData({ ...userFormData, status: e.target.value })}
                    className="w-full border rounded px-3 py-2"
                  >
                    <option value="Activo">Activo</option>
                    <option value="Inactivo">Inactivo</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Foto de Perfil (URL)</label>
                <Input
                  type="url"
                  value={userFormData.photo ?? ""}
                  onChange={(e) => setUserFormData({ ...userFormData, photo: e.target.value || null })}
                  placeholder="https://ejemplo.com/foto.jpg"
                />
              </div>
            </form>
            <div className="flex justify-end space-x-3 mt-6">
              <Button variant="outline" onClick={() => setShowUserModal(false)}>
                Cancelar
              </Button>
              <Button onClick={handleSaveUser}>
                {editingUser ? "Actualizar" : "Crear"}
              </Button>
            </div>
          </div>
        </div>
      </div>
      )}

      {showRoleModal && (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
        <div className="relative w-full max-w-md max-h-[90vh] overflow-y-auto">
          <div className="bg-white rounded-lg p-6 shadow-lg">
            <div className="flex justify-between items-start mb-4">
              <h2 className="text-xl font-bold">
                {editingRole ? "Editar Rol" : "Nuevo Rol"}
              </h2>
              <button
                onClick={() => setShowRoleModal(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <span className="sr-only">Cerrar</span>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Nombre *</label>
                <Input
                  value={roleFormData.name}
                  onChange={(e) => setRoleFormData({ ...roleFormData, name: e.target.value })}
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Descripción *</label>
                <Input
                  value={roleFormData.description}
                  onChange={(e) => setRoleFormData({ ...roleFormData, description: e.target.value })}
                  required
                />
              </div>
              <div className="mt-4">
                <label className="block text-sm font-medium mb-2">Permisos</label>
                <div className="space-y-2">
                  {["Alumnos", "Etapa I", "Etapa II", "Etapa III", "Pedagogía", "Psicología", "Nutrición", "Trabajo Social", "Conducta", "General", "Formatos", "Administración"].map((permission) => (
                    <div key={permission} className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        checked={roleFormData.permissions.includes(permission)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setRoleFormData({ ...roleFormData, permissions: [...roleFormData.permissions, permission] });
                          } else {
                            setRoleFormData({ ...roleFormData, permissions: roleFormData.permissions.filter(p => p !== permission) });
                          }
                        }}
                        className="h-4 w-4 text-primary"
                      />
                      <span>{permission}</span>
                    </div>
                  ))}
                </div>
              </div>
            </form>
            <div className="flex justify-end space-x-3 mt-6">
              <Button variant="outline" onClick={() => setShowRoleModal(false)}>
                Cancelar
              </Button>
              <Button onClick={handleSaveRole}>
                {editingRole ? "Actualizar" : "Crear"}
              </Button>
            </div>
          </div>
        </div>
      </div>
      )}
    </Card>
  );
}