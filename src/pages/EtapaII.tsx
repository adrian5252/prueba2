import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Search, BookOpen, Users, UserPlus } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

const mockStudents = [
  { id: 1, code: "A001", name: "Ana García López", grade: "1ro", section: "A", stage: "Etapa I", status: "Activo" },
  { id: 2, code: "A002", name: "Luis Martínez Pérez", grade: "1ro", section: "B", stage: "Etapa I", status: "Activo" },
  { id: 3, code: "A003", name: "Sofía Rodríguez Silva", grade: "1ro", section: "A", stage: "Etapa I", status: "Activo" },
  { id: 4, code: "A004", name: "Diego Fernández Ruiz", grade: "1ro", section: "C", stage: "Etapa I", status: "Inactivo" },
  { id: 5, code: "A005", name: "Valentina Gómez Díaz", grade: "1ro", section: "A", stage: "Etapa I", status: "Activo" },
  { id: 6, code: "B001", name: "Pedro López Hernández", grade: "2do", section: "A", stage: "Etapa II", status: "Activo" },
  { id: 7, code: "B002", name: "Lucía Méndez Torres", grade: "2do", section: "B", stage: "Etapa II", status: "Activo" },
  { id: 8, code: "B003", name: "Mateo Rojas Silva", grade: "2do", section: "C", stage: "Etapa II", status: "Inactivo" },
  { id: 9, code: "C001", name: "Camila Torres Vega", grade: "3ro", section: "A", stage: "Etapa III", status: "Activo" },
  { id: 10, code: "C002", name: "Andrés Ramírez Castro", grade: "3ro", section: "B", stage: "Etapa III", status: "Activo" },
  { id: 11, code: "C003", name: "Isabella Morales Ríos", grade: "3ro", section: "A", stage: "Etapa III", status: "Activo" },
];

export default function EtapaII() {
  const [search, setSearch] = useState("");
  const [filteredStudents, setFilteredStudents] = useState(mockStudents.filter(s => s.stage === "Etapa II"));
  const { user } = useAuth();

  useEffect(() => {
    const stageFiltered = mockStudents.filter(s => s.stage === "Etapa II");
    const results = stageFiltered.filter(
      (s) =>
        s.name.toLowerCase().includes(search.toLowerCase()) ||
        s.code.toLowerCase().includes(search.toLowerCase()) ||
        s.grade.toLowerCase().includes(search.toLowerCase()) ||
        s.section.toLowerCase().includes(search.toLowerCase())
    );
    setFilteredStudents(results);
  }, [search]);

  return (
    <Card className="mb-6">
      <CardHeader className="pb-4">
        <CardTitle className="text-xl font-bold flex items-center">
          <BookOpen className="mr-2 h-5 w-5" />
          Etapa II
          {user?.role === "maestra-etapa2" && (
            <span className="ml-auto text-sm font-normal text-gray-500">
              (Sesión como: {user.name})
            </span>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="relative w-full">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Buscar por código, nombre, grado o sección..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-10"
          />
        </div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-20">Código</TableHead>
              <TableHead>Nombre</TableHead>
              <TableHead className="w-16">Grado</TableHead>
              <TableHead className="w-16">Sección</TableHead>
              <TableHead className="w-20">Estado</TableHead>
              <TableHead className="w-24">Acciones</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredStudents.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-4 text-gray-500">
                  No se encontraron alumnos en Etapa II
                </TableCell>
              </TableRow>
            ) : (
              filteredStudents.map((student) => (
                <TableRow key={student.id}>
                  <TableCell>{student.code}</TableCell>
                  <TableCell>{student.name}</TableCell>
                  <TableCell>{student.grade}</TableCell>
                  <TableCell>{student.section}</TableCell>
                  <TableCell>
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      student.status === "Activo"
                        ? "bg-green-100 text-green-800"
                        : "bg-red-100 text-red-800"
                    }`}>
                      {student.status}
                    </span>
                  </TableCell>
                  <TableCell className="flex space-x-2">
                    <Button variant="ghost" size="icon" aria-label="Ver expediente">
                      <Users className="h-4 w-4 text-primary" />
                    </Button>
                    <Button variant="ghost" size="icon" aria-label="Editar">
                      <UserPlus className="h-4 w-4 text-warning" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}