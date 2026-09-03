import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { Users, Settings, UserPlus, ShieldCheck } from "lucide-react";

const mockUsers = [
  { id: 1, name: "Administrador", email: "admin@colegio.edu", role: "admin", status: "Activo", lastLogin: "2024-09-12 08:30" },
  { id: 2, name: "Maestra Etapa I", email: "maestra1@colegio.edu", role: "maestra-etapa1", status: "Activo", lastLogin: "2024-09-11 14:15" },
  { id: 3, name: "Maestra Etapa II", email: "maestra2@colegio.edu", role: "maestra-etapa2", status: "Activo", lastLogin: "2024-09-10 09:45" },
  { id: 4, name: "Maestra Etapa III", email: "maestra3@colegio.edu", role: "maestra-etapa3", status: "Activo", lastLogin: "2024-09-09 11:20" },
  { id: 5, name: "Pedagogo", email: "pedagogia@colegio.edu", role: "pedagogia", status: "Activo", lastLogin: "2024-09-08 16:00" },
  { id: 6, name: "Psicólogo", email: "psicologia@colegio.edu", role: "psicologia", status: "Activo", lastLogin: "2024-09-07 10:05" },
  { id: 7, name: "Nutricionista", email: "nutricion@colegio.edu", role: "nutricion", status: "Activo", lastLogin: "2024-09-06 09:30" },
  { id: 8, name: "Trabajador Social", email: "trabajosocial@colegio.edu", role: "trabajo-social", status: "Activo", lastLogin: "2024-09-05 14:00" },
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

  useEffect(() => {
    const results = mockUsers.filter(
      (u) =>
        u.name.toLowerCase().includes(search.toLowerCase()) ||
        u.email.toLowerCase().includes(search.toLowerCase()) ||
        u.role.toLowerCase().includes(search.toLowerCase())
    );
    setFilteredUsers(results);
  }, [search]);

  return (
    <Card className="mb-6">
      <CardHeader className="pb-4">
        <CardTitle className="text-xl font-bold flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Settings className="h-5 w-5" />
            <span>Administración</span>
          </div>
          <Button variant="outline" onClick={() => alert("Funcionalidad en desarrollo")}>
            <UserPlus className="mr-2 h-4 w-4" />
            Nuevo Usuario
          </Button>
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
                          <Button variant="ghost" size="icon" aria-label="Editar usuario">
                            <UserPlus className="h-4 w-4 text-warning" />
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
                          <Button variant="ghost" size="icon" aria-label="Editar rol">
                            <UserPlus className="h-4 w-4 text-warning" />
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
    </Card>
  );
}