import { useParams } from "react-router-dom";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Users, BookOpen, GraduationCap, Stethoscope, Droplet, HandHeart, Activity, ClipboardList, FileText, Clock, Folder, History } from "lucide-react";
import { useState } from "react";

// Mock data for all students (combined)
const allStudents = [
  { id: 1, code: "A001", name: "Ana García López", grade: "1ro", section: "A", stage: "Etapa I", status: "Activo", birthDate: "2018-05-14", phone: "+56 9 1234 5678", email: "ana.garcia@colegio.edu", siblingCodes: ["A002"] },
  { id: 2, code: "A002", name: "Luis Martínez Pérez", grade: "1ro", section: "B", stage: "Etapa I", status: "Activo", birthDate: "2017-09-22", phone: "+56 9 2345 6789", email: "luis.martinez@colegio.edu", siblingCodes: ["A001"] },
  { id: 3, code: "A003", name: "Sofía Rodríguez Silva", grade: "1ro", section: "A", stage: "Etapa I", status: "Activo", birthDate: "2016-03-08", phone: "+56 9 3456 7890", email: "sofia.rodriguez@colegio.edu", siblingCodes: [] },
  { id: 4, code: "A004", name: "Diego Fernández Ruiz", grade: "1ro", section: "C", stage: "Etapa I", status: "Inactivo", birthDate: "2018-11-30", phone: "+56 9 4567 8901", email: "diego.fernandez@colegio.edu", siblingCodes: [] },
  { id: 5, code: "A005", name: "Valentina Gómez Díaz", grade: "1ro", section: "A", stage: "Etapa I", status: "Activo", birthDate: "2017-07-19", phone: "+56 9 5678 9012", email: "valentina.gomez@colegio.edu", siblingCodes: [] },
  { id: 6, code: "B001", name: "Pedro López Hernández", grade: "2do", section: "A", stage: "Etapa II", status: "Activo", birthDate: "2015-01-22", phone: "+56 9 6789 0123", email: "pedro.lopez@colegio.edu", siblingCodes: [] },
  { id: 7, code: "B002", name: "Lucía Méndez Torres", grade: "2do", section: "B", stage: "Etapa II", status: "Activo", birthDate: "2014-08-14", phone: "+56 9 7890 1234", email: "lucia.mendez@colegio.edu", siblingCodes: [] },
  { id: 8, code: "B003", name: "Mateo Rojas Silva", grade: "2do", section: "C", stage: "Etapa II", status: "Inactivo", birthDate: "2015-12-05", phone: "+56 9 8901 2345", email: "mateo.rojas@colegio.edu", siblingCodes: [] },
  { id: 9, code: "C001", name: "Camila Torres Vega", grade: "3ro", section: "A", stage: "Etapa III", status: "Activo", birthDate: "2012-03-15", phone: "+56 9 1234 5678", email: "camila.torres@colegio.edu", siblingCodes: [] },
  { id: 10, code: "C002", name: "Andrés Ramírez Castro", grade: "3ro", section: "B", stage: "Etapa III", status: "Activo", birthDate: "2012-07-22", phone: "+56 9 2345 6789", email: "andres.ramirez@colegio.edu", siblingCodes: [] },
  { id: 11, code: "C003", name: "Isabella Morales Ríos", grade: "3ro", section: "A", stage: "Etapa III", status: "Activo", birthDate: "2012-11-08", phone: "+56 9 3456 7890", email: "isabella.morales@colegio.edu", siblingCodes: [] },
];

// Mock data for tabs content
const mockAcademic = [
  { period: "2024-1", subject: "Matemáticas", grade: 6.5, teacher: "Prof. Gómez" },
  { period: "2024-1", subject: "Lenguaje", grade: 5.8, teacher: "Prof. Ruiz" },
  { period: "2024-1", subject: "Ciencias", grade: 6.2, teacher: "Prof. Díaz" },
];

const mockPedagogia = [
  { date: "2024-09-01", observation: "Muestra buen avance en lectura", responsible: "Prof. Gómez" },
  { date: "2024-09-10", observation: "Necesita refuerzo en resolución de problemas", responsible: "Prof. Gómez" },
];

const mockPsicologia = [
  { date: "2024-08-20", type: "Observación", description: "Se muestra sociable y participativo", responsible: "Psicóloga López" },
  { date: "2024-09-05", type: "Seguimiento", description: "Continúa con buen comportamiento", responsible: "Psicóloga López" },
];

const mockNutricion = [
  { date: "2024-09-01", plan: "Desayuno balanceado, fruta y lácteos", observations: "Come bien, le gusta la fruta", responsible: "Nutricionista Ruiz" },
];

const mockTrabajoSocial = [
  { date: "2024-08-15", observation: "Familia estable, apoyo parental", responsible: "Asistente Social Gómez" },
];

const mockConducta = [
  { date: "2024-09-03", description: "Llegó tarde a clase", responsible: "Prof. Díaz", status: "Amonestación verbal" },
  { date: "2024-09-10", description: "Participó activamente en grupo", responsible: "Prof. Díaz", status: "Refuerzo positivo" },
];

const mockObservations = [
  { date: "2024-09-12", area: "Oratorio", description: "Participó activamente en la oración", responsible: "Prof. de Oratorio", followUp: "Ninguno" },
  { date: "2024-09-10", area: "Matemáticas", description: "Mostró dificultad con fracciones", responsible: "Prof. Gómez", followUp: "Refuerzo en fracciones" },
];

const mockHermanos = [
  { id: 2, code: "A002", name: "Luis Martínez Pérez", grade: "2do", section: "B" },
];

const mockDocuments = [
  { name: "Certificado de Nacimiento", date: "2024-03-15", type: "PDF" },
  { name: "Cartilla de Vacunación", date: "2024-03-15", type: "PDF" },
];

const mockHistorial = [
  { date: "2024-09-12", area: "Oratorio", description: "Nueva observación de clase", user: "Prof. de Oratorio" },
  { date: "2024-09-10", area: "Pedagogía", description: "Registro de calificaciones", user: "Prof. Gómez" },
  { date: "2024-09-05", area: "Psicología", description: "Seguimiento de caso", user: "Psicóloga López" },
  { date: "2024-08-20", area: "Psicología", description: "Observación inicial", user: "Psicóloga López" },
  { date: "2024-08-15", area: "Trabajo Social", description: "Visita domiciliaria", user: "Asistente Social Gómez" },
];

export default function Expediente() {
  const { studentId } = useParams<{ studentId: string }>();
  const student = allStudents.find(s => s.id === Number(studentId));

  if (!student) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Expediente no encontrado</CardTitle>
        </CardHeader>
        <CardContent>
          <p>No se encontró el expediente con el ID proporcionado.</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <>
      <Card className="mb-6">
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-2xl font-bold">{student.name}</CardTitle>
              <div className="flex items-center space-x-4 text-sm text-gray-500">
                <span>Código: {student.code}</span>
                <span>•</span>
                <span>Grado: {student.grade} {student.section}</span>
                <span>•</span>
                <span>Etapa: {student.stage}</span>
                <span>•</span>
                <span className={`px-2 py-0.5 text-xs rounded-full ${
                  student.status === "Activo"
                    ? "bg-green-100 text-green-800"
                    : "bg-red-100 text-red-800"
                }`}>
                  {student.status}
                </span>
              </div>
            </div>
            <Button variant="outline" size="icon" aria-label="Imprimir expediente">
              <FileText className="h-4 w-4" />
            </Button>
          </div>
        </CardHeader>
      </Card>

      <div className="space-y-6">
        <Tabs defaultValue="info" className="w-full">
          <TabsList className="grid w-full grid-cols-11">
            <TabsTrigger value="info">Información General</TabsTrigger>
            <TabsTrigger value="academic">Datos Académicos</TabsTrigger>
            <TabsTrigger value="pedagogia">Pedagogía</TabsTrigger>
            <TabsTrigger value="psicologia">Psicología</TabsTrigger>
            <TabsTrigger value="nutricion">Nutrición</TabsTrigger>
            <TabsTrigger value="social">Trabajo Social</TabsTrigger>
            <TabsTrigger value="conducta">Conducta</TabsTrigger>
            <TabsTrigger value="observations">Observaciones</TabsTrigger>
            <TabsTrigger value="hermanos">Hermanos</TabsTrigger>
            <TabsTrigger value="documents">Documentos</TabsTrigger>
            <TabsTrigger value="historial">Historial</TabsTrigger>
          </TabsList>

          <TabsContent value="info">
            <CardContent className="space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <p className="text-sm font-medium text-gray-600">Fecha de Nacimiento</p>
                  <p className="text-base font-medium">{new Date(student.birthDate).toLocaleDateString()}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-600">Teléfono de Contacto</p>
                  <p className="text-base font-medium">{student.phone}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-600">Correo Electrónico</p>
                  <p className="text-base font-medium break-all">{student.email}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-600">Códigos de Hermanos</p>
                  {student.siblingCodes.length > 0 ? (
                    <div className="flex flex-wrap gap-2">
                      {student.siblingCodes.map((code) => (
                        <span key={code} className="px-2 py-1 text-xs bg-primary/10 text-primary rounded">
                          {code}
                        </span>
                      ))}
                    </div>
                  ) : (
                    <p className="text-sm text-gray-500">No registrados</p>
                  )}
                </div>
              </div>
            </CardContent>
          </TabsContent>

          <TabsContent value="academic">
            <CardContent>
              <h3 className="text-lg font-semibold mb-4">Historial Académico</h3>
              {mockAcademic.length > 0 ? (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Periodo</TableHead>
                      <TableHead>Asignatura</TableHead>
                      <TableHead className="text-center">Nota</TableHead>
                      <TableHead>Docente</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {mockAcademic.map((item) => (
                      <TableRow key={`${item.period}-${item.subject}`}>
                        <TableCell>{item.period}</TableCell>
                        <TableCell>{item.subject}</TableCell>
                        <TableCell className="text-center font-medium">{item.grade}</TableCell>
                        <TableCell>{item.teacher}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              ) : (
                <p className="text-gray-500">No hay registros académicos.</p>
              )}
            </CardContent>
          </TabsContent>

          <TabsContent value="pedagogia">
            <CardContent>
              <h3 className="text-lg font-semibold mb-4">Observaciones Pedagógicas</h3>
              {mockPedagogia.length > 0 ? (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Fecha</TableHead>
                      <TableHead>Observación</TableHead>
                      <TableHead>Responsable</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {mockPedagogia.map((obs) => (
                      <TableRow key={obs.date}>
                        <TableCell>{obs.date}</TableCell>
                        <TableCell>{obs.observation}</TableCell>
                        <TableCell>{obs.responsible}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              ) : (
                <p className="text-gray-500">No hay observaciones pedagógicas.</p>
              )}
            </CardContent>
          </TabsContent>

          <TabsContent value="psicologia">
            <CardContent>
              <h3 className="text-lg font-semibold mb-4">Historial Psicológico</h3>
              {mockPsicologia.length > 0 ? (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Fecha</TableHead>
                      <TableHead>Tipo</TableHead>
                      <TableHead>Descripción</TableHead>
                      <TableHead>Responsable</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {mockPsicologia.map((item) => (
                      <TableRow key={item.date}>
                        <TableCell>{item.date}</TableCell>
                        <TableCell>{item.type}</TableCell>
                        <TableCell>{item.description}</TableCell>
                        <TableCell>{item.responsible}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              ) : (
                <p className="text-gray-500">No hay registros psicológicos.</p>
              )}
            </CardContent>
          </TabsContent>

          <TabsContent value="nutricion">
            <CardContent>
              <h3 className="text-lg font-semibold mb-4">Plan Nutricional</h3>
              {mockNutricion.length > 0 ? (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Fecha</TableHead>
                      <TableHead>Plan</TableHead>
                      <TableHead>Observaciones</TableHead>
                      <TableHead>Responsable</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {mockNutricion.map((item) => (
                      <TableRow key={item.date}>
                        <TableCell>{item.date}</TableCell>
                        <TableCell>{item.plan}</TableCell>
                        <TableCell>{item.observations}</TableCell>
                        <TableCell>{item.responsible}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              ) : (
                <p className="text-gray-500">No hay plan nutricional registrado.</p>
              )}
            </CardContent>
          </TabsContent>

          <TabsContent value="social">
            <CardContent>
              <h3 className="text-lg font-semibold mb-4">Intervenciones de Trabajo Social</h3>
              {mockTrabajoSocial.length > 0 ? (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Fecha</TableHead>
                      <TableHead>Observación</TableHead>
                      <TableHead>Responsable</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {mockTrabajoSocial.map((item) => (
                      <TableRow key={item.date}>
                        <TableCell>{item.date}</TableCell>
                        <TableCell>{item.observation}</TableCell>
                        <TableCell>{item.responsible}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              ) : (
                <p className="text-gray-500">No hay intervenciones registradas.</p>
              )}
            </CardContent>
          </TabsContent>

          <TabsContent value="conducta">
            <CardContent>
              <h3 className="text-lg font-semibold mb-4">Registro de Conducta</h3>
              {mockConducta.length > 0 ? (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Fecha</TableHead>
                      <TableHead>Descripción</TableHead>
                      <TableHead>Responsable</TableHead>
                      <TableHead className="text-center">Estado</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {mockConducta.map((item) => (
                      <TableRow key={item.date}>
                        <TableCell>{item.date}</TableCell>
                        <TableCell>{item.description}</TableCell>
                        <TableCell>{item.responsible}</TableCell>
                        <TableCell className="text-center px-2 py-1">
                          <span className={`px-2 py-0.5 text-xs rounded-full ${
                            item.status === "Amonestación verbal"
                              ? "bg-red-100 text-red-800"
                              : item.status === "Refuerzo positivo"
                              ? "bg-green-100 text-green-800"
                              : "bg-gray-100 text-gray-800"
                          }`}>
                            {item.status}
                          </span>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              ) : (
                <p className="text-gray-500">No hay registros de conducta.</p>
              )}
            </CardContent>
          </TabsContent>

          <TabsContent value="observations">
            <CardContent>
              <h3 className="text-lg font-semibold mb-4">Observaciones de Clase</h3>
              {mockObservations.length > 0 ? (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Fecha</TableHead>
                      <TableHead>Área/Clase</TableHead>
                      <TableHead>Observación</TableHead>
                      <TableHead>Responsable</TableHead>
                      <TableHead>Seguimiento</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {mockObservations.map((obs) => (
                      <TableRow key={obs.date}>
                        <TableCell>{obs.date}</TableCell>
                        <TableCell>{obs.area}</TableCell>
                        <TableCell>{obs.description}</TableCell>
                        <TableCell>{obs.responsible}</TableCell>
                        <TableCell>{obs.followUp}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              ) : (
                <p className="text-gray-500">No hay observaciones registradas.</p>
              )}
            </CardContent>
          </TabsContent>

          <TabsContent value="hermanos">
            <CardContent>
              <h3 className="text-lg font-semibold mb-4">Hermanos Registrados</h3>
              {mockHermanos.length > 0 ? (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Código</TableHead>
                      <TableHead>Nombre</TableHead>
                      <TableHead>Grado</TableHead>
                      <TableHead>Sección</TableHead>
                      <TableHead className="w-24">Acciones</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {mockHermanos.map((hermano) => (
                      <TableRow key={hermano.id}>
                        <TableCell>{hermano.code}</TableCell>
                        <TableCell>{hermano.name}</TableCell>
                        <TableCell>{hermano.grade}</TableCell>
                        <TableCell>{hermano.section}</TableCell>
                        <TableCell className="flex space-x-2">
                          <Button variant="ghost" size="icon" aria-label="Ver expediente">
                            <Users className="h-4 w-4 text-primary" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              ) : (
                <p className="text-gray-500">No se han registrado hermanos.</p>
              )}
            </CardContent>
          </TabsContent>

          <TabsContent value="documents">
            <CardContent>
              <h3 className="text-lg font-semibold mb-4">Documentos Adjuntos</h3>
              {mockDocuments.length > 0 ? (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Nombre del Documento</TableHead>
                      <TableHead>Fecha</TableHead>
                      <TableHead className="text-center">Tipo</TableHead>
                      <TableHead className="w-24">Acciones</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {mockDocuments.map((doc) => (
                      <TableRow key={doc.name}>
                        <TableCell>{doc.name}</TableCell>
                        <TableCell>{doc.date}</TableCell>
                        <TableCell className="text-center">{doc.type}</TableCell>
                        <TableCell className="flex space-x-2">
                          <Button variant="ghost" size="icon" aria-label="Ver documento">
                            <FileText className="h-4 w-4 text-primary" />
                          </Button>
                          <Button variant="ghost" size="icon" aria-label="Descargar">
                            <FileText className="h-4 w-4 text-success" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              ) : (
                <p className="text-gray-500">No hay documentos adjuntos.</p>
              )}
            </CardContent>
          </TabsContent>

          <TabsContent value="historial">
            <CardContent>
              <h3 className="text-lg font-semibold mb-4">Historial Cronológico</h3>
              {mockHistorial.length > 0 ? (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Fecha</TableHead>
                      <TableHead>Área</TableHead>
                      <TableHead>Descripción</TableHead>
                      <TableHead className="text-center">Usuario</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {mockHistorial.map((item) => (
                      <TableRow key={item.date}>
                        <TableCell>{item.date}</TableCell>
                        <TableCell>{item.area}</TableCell>
                        <TableCell>{item.description}</TableCell>
                        <TableCell className="text-center">{item.user}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              ) : (
                <p className="text-gray-500">No hay historial disponible.</p>
              )}
            </CardContent>
          </TabsContent>
        </Tabs>
      </div>
    </>
  );
}