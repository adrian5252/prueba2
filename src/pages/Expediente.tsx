import { useParams } from "react-router-dom";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Users, BookOpen, GraduationCap, Stethoscope, Droplet, HandHeart, Activity, ClipboardList, FileText, Clock, Folder, History, UserPlus, Search } from "lucide-react";
import { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { PDFGenerator } from "@/utils/pdfGenerator";
import { toast } from "sonner";

// Mock data for all students (combined)
const allStudents = [
  { id: 1, code: "A001", name: "Ana García López", grade: "1ro", section: "A", stage: "Etapa I", status: "Activo", birthDate: "2018-05-14", phone: "+56 9 1234 5678", email: "ana.garcia@colegio.edu", siblingCodes: ["A002"], 
    padre: { nombre: "Carlos García", telefono: "+56 9 1111 1111" }, 
    madre: { nombre: "María López", telefono: "+56 9 2222 2222" } 
  },
  { id: 2, code: "A002", name: "Luis Martínez Pérez", grade: "1ro", section: "B", stage: "Etapa I", status: "Activo", birthDate: "2017-09-22", phone: "+56 9 2345 6789", email: "luis.martinez@colegio.edu", siblingCodes: ["A001"], 
    padre: { nombre: "Pedro Martínez", telefono: "+56 9 3333 3333" }, 
    madre: { nombre: "Ana Pérez", telefono: "+56 9 4444 4444" } 
  },
  { id: 3, code: "A003", name: "Sofía Rodríguez Silva", grade: "1ro", section: "A", stage: "Etapa I", status: "Activo", birthDate: "2016-03-08", phone: "+56 9 3456 7890", email: "sofia.rodriguez@colegio.edu", siblingCodes: [], 
    padre: { nombre: "Roberto Rodríguez", telefono: "+56 9 5555 5555" }, 
    madre: { nombre: "Lucía Silva", telefono: "+56 9 6666 6666" } 
  },
  { id: 4, code: "A004", name: "Diego Fernández Ruiz", grade: "1ro", section: "C", stage: "Etapa I", status: "Inactivo", birthDate: "2018-11-30", phone: "+56 9 4567 8901", email: "diego.fernandez@colegio.edu", siblingCodes: [], 
    padre: { nombre: "Fernando Fernández", telefono: "+56 9 7777 7777" }, 
    madre: { nombre: "Carmen Ruiz", telefono: "+56 9 8888 8888" } 
  },
  { id: 5, code: "A005", name: "Valentina Gómez Díaz", grade: "1ro", section: "A", stage: "Etapa I", status: "Activo", birthDate: "2017-07-19", phone: "+56 9 5678 9012", email: "valentina.gomez@colegio.edu", siblingCodes: [], 
    padre: { nombre: "Gustavo Gómez", telefono: "+56 9 9999 9999" }, 
    madre: { nombre: "Diana Díaz", telefono: "+56 9 0000 0000" } 
  },
  { id: 6, code: "B001", name: "Pedro López Hernández", grade: "2do", section: "A", stage: "Etapa II", status: "Activo", birthDate: "2015-01-22", phone: "+56 9 6789 0123", email: "pedro.lopez@colegio.edu", siblingCodes: [], 
    padre: { nombre: "Luis López", telefono: "+56 9 1212 1212" }, 
    madre: { nombre: "María Hernández", telefono: "+56 9 3434 3434" } 
  },
  { id: 7, code: "B002", name: "Lucía Méndez Torres", grade: "2do", section: "B", stage: "Etapa II", status: "Activo", birthDate: "2014-08-14", phone: "+56 9 7890 1234", email: "lucia.mendez@colegio.edu", siblingCodes: [], 
    padre: { nombre: "Jorge Méndez", telefono: "+56 9 5656 5656" }, 
    madre: { nombre: "Carmen Torres", telefono: "+56 9 7878 7878" } 
  },
  { id: 8, code: "B003", name: "Mateo Rojas Silva", grade: "2do", section: "C", stage: "Etapa II", status: "Inactivo", birthDate: "2015-12-05", phone: "+56 9 8901 2345", email: "mateo.rojas@colegio.edu", siblingCodes: [], 
    padre: { nombre: "Roberto Rojas", telefono: "+56 9 9090 9090" }, 
    madre: { nombre: "Silvia Silva", telefono: "+56 9 1212 1212" } 
  },
  { id: 9, code: "C001", name: "Camila Torres Vega", grade: "3ro", section: "A", stage: "Etapa III", status: "Activo", birthDate: "2012-03-15", phone: "+56 9 1234 5678", email: "camila.torres@colegio.edu", siblingCodes: [], 
    padre: { nombre: "Víctor Torres", telefono: "+56 9 3434 3434" }, 
    madre: { nombre: "Isabel Vega", telefono: "+56 9 5656 5656" } 
  },
  { id: 10, code: "C002", name: "Andrés Ramírez Castro", grade: "3ro", section: "B", stage: "Etapa III", status: "Activo", birthDate: "2012-07-22", phone: "+56 9 2345 6789", email: "andres.ramirez@colegio.edu", siblingCodes: [], 
    padre: { nombre: "Diego Ramírez", telefono: "+56 9 7878 7878" }, 
    madre: { nombre: "Laura Castro", telefono: "+56 9 9090 9090" } 
  },
  { id: 11, code: "C003", name: "Isabella Morales Ríos", grade: "3ro", section: "A", stage: "Etapa III", status: "Activo", birthDate: "2012-11-08", phone: "+56 9 3456 7890", email: "isabella.morales@colegio.edu", siblingCodes: [], 
    padre: { nombre: "Fernando Morales", telefono: "+56 9 1212 1212" }, 
    madre: { nombre: "Patricia Ríos", telefono: "+56 9 3434 3434" } 
  },
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
  { id: 2, code: "A002", name: "Luis Martínez Pérez", grade: "1ro", section: "B" },
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
  const { user } = useAuth();
  const [showHermanosModal, setShowHermanosModal] = useState(false);
  const [hermanosData, setHermanosData] = useState<any[]>([]);
  const [documents, setDocuments] = useState<any[]>([
    { name: "Certificado de Nacimiento", date: "2024-03-15", type: "PDF" },
    { name: "Cartilla de Vacunación", date: "2024-03-15", type: "PDF" },
  ]);
  const [showDocumentModal, setShowDocumentModal] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [documentName, setDocumentName] = useState("");
  const [documentType, setDocumentType] = useState("");
  const [uploading, setUploading] = useState(false);

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

  useEffect(() => {
    if (student.siblingCodes && student.siblingCodes.length > 0) {
      const hermanos = allStudents.filter(s => 
        student.siblingCodes.includes(s.code) && s.id !== student.id
      );
      setHermanosData(hermanos);
    } else {
      setHermanosData([]);
    }
  }, [student]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const allowedTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 
                           'application/vnd.ms-excel', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
                           'image/jpeg', 'image/png', 'image/jpg'];
      
      if (!allowedTypes.includes(file.type)) {
        toast.error("Tipo de archivo no permitido. Use PDF, DOC, DOCX, XLS, XLSX, JPG o PNG");
        return;
      }
      
      if (file.size > 10 * 1024 * 1024) {
        toast.error("El archivo no debe superar los 10MB");
        return;
      }
      
      setSelectedFile(file);
      const nameWithoutExt = file.name.split('.').slice(0, -1).join('.');
      setDocumentName(nameWithoutExt);
      
      const ext = file.name.split('.').pop()?.toLowerCase();
      if (ext === 'pdf') setDocumentType('PDF');
      else if (ext === 'doc' || ext === 'docx') setDocumentType('DOC');
      else if (ext === 'xls' || ext === 'xlsx') setDocumentType('XLS');
      else if (ext === 'jpg' || ext === 'jpeg' || ext === 'png') setDocumentType('IMG');
      else setDocumentType(ext?.toUpperCase() || 'OTRO');
    }
  };

  const handleUploadDocument = () => {
    if (!selectedFile || !documentName.trim()) {
      toast.error("Por favor complete todos los campos");
      return;
    }

    setUploading(true);
    
    setTimeout(() => {
      const newDocument = {
        name: documentName.trim(),
        date: new Date().toISOString().split('T')[0],
        type: documentType
      };
      
      setDocuments(prev => [...prev, newDocument]);
      setSelectedFile(null);
      setDocumentName("");
      setDocumentType("");
      setShowDocumentModal(false);
      setUploading(false);
      
      toast.success("Documento subido correctamente");
    }, 1000);
  };

  const handleDownloadDocument = (doc: any) => {
    toast.success(`Descargando ${doc.name}...`);
  };

  const handleDeleteDocument = (docName: string) => {
    if (window.confirm(`¿Está seguro de que desea eliminar el documento "${docName}"?`)) {
      setDocuments(prev => prev.filter(doc => doc.name !== docName));
      toast.success("Documento eliminado correctamente");
    }
  };

  const handleGeneratePDF = () => {
    try {
      const content = [
        `Fecha de Nacimiento: ${new Date(student.birthDate).toLocaleDateString()}`,
        `Teléfono: ${student.phone}`,
        `Email: ${student.email}`,
        `Grado: ${student.grade} ${student.section}`,
        `Etapa: ${student.stage}`,
        `Estado: ${student.status}`,
        '',
        '--- Información de Padres ---',
        `Padre: ${student.padre?.nombre || 'No registrado'} - ${student.padre?.telefono || 'N/A'}`,
        `Madre: ${student.madre?.nombre || 'No registrado'} - ${student.madre?.telefono || 'N/A'}`,
      ];

      const pdf = PDFGenerator.generateStudentRecord({
        title: 'Expediente del Alumno',
        institutionName: 'EduGest - Colegio Salesiano',
        date: new Date().toLocaleDateString(),
        studentData: student,
        content: content,
      });

      PDFGenerator.downloadPDF(pdf, `expediente_${student.code}.pdf`);
      toast.success("PDF generado correctamente");
    } catch (error) {
      toast.error("Error al generar el PDF");
    }
  };

  const handlePrint = () => {
    try {
      const content = [
        `Fecha de Nacimiento: ${new Date(student.birthDate).toLocaleDateString()}`,
        `Teléfono: ${student.phone}`,
        `Email: ${student.email}`,
        `Grado: ${student.grade} ${student.section}`,
        `Etapa: ${student.stage}`,
        `Estado: ${student.status}`,
        '',
        '--- Información de Padres ---',
        `Padre: ${student.padre?.nombre || 'No registrado'} - ${student.padre?.telefono || 'N/A'}`,
        `Madre: ${student.madre?.nombre || 'No registrado'} - ${student.madre?.telefono || 'N/A'}`,
      ];

      const pdf = PDFGenerator.generateStudentRecord({
        title: 'Expediente del Alumno',
        institutionName: 'EduGest - Colegio Salesiano',
        date: new Date().toLocaleDateString(),
        studentData: student,
        content: content,
      });

      PDFGenerator.printPDF(pdf);
      toast.success("Abriendo vista de impresión");
    } catch (error) {
      toast.error("Error al abrir la vista de impresión");
    }
  };

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
            <div className="flex space-x-2">
              <Button variant="outline" size="sm" onClick={handlePrint} aria-label="Imprimir expediente">
                <FileText className="mr-2 h-4 w-4" />
                Imprimir
              </Button>
              <Button variant="default" size="sm" onClick={handleGeneratePDF} aria-label="Generar PDF">
                <FileText className="mr-2 h-4 w-4" />
                Generar PDF
              </Button>
            </div>
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
            <CardContent className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold mb-4 flex items-center">
                  <UserPlus className="mr-2 h-5 w-5" />
                  Datos del Alumno
                </h3>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Nombre Completo</p>
                    <p className="text-base font-medium">{student.name}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-600">Código</p>
                    <p className="text-base font-medium">{student.code}</p>
                  </div>
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
                    <p className="text-sm font-medium text-gray-600">Grado y Sección</p>
                    <p className="text-base font-medium">{student.grade} {student.section}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-600">Etapa</p>
                    <p className="text-base font-medium">{student.stage}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-600">Estado</p>
                    <span className={`px-2 py-0.5 text-xs rounded-full ${
                      student.status === "Activo"
                        ? "bg-green-100 text-green-800"
                        : "bg-red-100 text-red-800"
                    }`}>
                      {student.status}
                    </span>
                  </div>
                </div>
              </div>

              <div className="border-t pt-6">
                <h3 className="text-lg font-semibold mb-4 flex items-center">
                  <Users className="mr-2 h-5 w-5" />
                  Información de los Padres
                </h3>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="border rounded p-4">
                    <p className="text-sm font-medium text-gray-600">Padre</p>
                    <p className="text-base font-medium">{student.padre?.nombre || 'No registrado'}</p>
                    {student.padre?.telefono && (
                      <p className="text-sm text-gray-500 mt-1">Tel: {student.padre.telefono}</p>
                    )}
                  </div>
                  <div className="border rounded p-4">
                    <p className="text-sm font-medium text-gray-600">Madre</p>
                    <p className="text-base font-medium">{student.madre?.nombre || 'No registrado'}</p>
                    {student.madre?.telefono && (
                      <p className="text-sm text-gray-500 mt-1">Tel: {student.madre.telefono}</p>
                    )}
                  </div>
                </div>
              </div>

              <div className="border-t pt-6">
                <h3 className="text-lg font-semibold mb-4 flex items-center">
                  <Users className="mr-2 h-5 w-5" />
                  Hermanos
                </h3>
                <p className="text-sm font-medium text-gray-600 mb-2">Códigos de Hermanos</p>
                {student.siblingCodes.length > 0 ? (
                  <div className="flex flex-wrap gap-2">
                    {student.siblingCodes.map((code) => (
                      <span key={code} className="px-3 py-1.5 text-sm bg-primary/10 text-primary rounded cursor-pointer hover:underline"
                        onClick={() => {
                          const hermano = allStudents.find(s => s.code === code);
                          if (hermano) {
                            setHermanosData([hermano]);
                            setShowHermanosModal(true);
                          }
                        }}
                      >
                        {code}
                      </span>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-gray-500">No registrados</p>
                )}
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
              {hermanosData.length > 0 ? (
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
                    {hermanosData.map((hermano) => (
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
              {documents.length > 0 ? (
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
                    {documents.map((doc) => (
                      <TableRow key={doc.name}>
                        <TableCell>{doc.name}</TableCell>
                        <TableCell>{doc.date}</TableCell>
                        <TableCell className="text-center">{doc.type}</TableCell>
                        <TableCell className="flex space-x-2">
                          <Button variant="ghost" size="icon" aria-label="Ver documento">
                            <FileText className="h-4 w-4 text-primary" />
                          </Button>
                          <Button variant="ghost" size="icon" aria-label="Descargar" onClick={() => handleDownloadDocument(doc)}>
                            <FileText className="h-4 w-4 text-success" />
                          </Button>
                          <Button variant="destructive" size="icon" aria-label="Eliminar" onClick={() => handleDeleteDocument(doc.name)}>
                            <FileText className="h-4 w-4 text-destructive" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              ) : (
                <p className="text-gray-500">No hay documentos adjuntos.</p>
              )}
              <Button variant="outline" size="sm" className="mt-4" onClick={() => setShowDocumentModal(true)}>
                <FileText className="mr-2 h-4 w-4" />
                Subir Documento
              </Button>
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

      {showHermanosModal && hermanosData.length > 0 && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
          onClick={(e) => {
            if (e.target === e.currentTarget) setShowHermanosModal(false);
          }}
        >
          <div className="relative w-full max-w-md max-h-[90vh] overflow-y-auto bg-white rounded-lg p-6 shadow-lg">
            <div className="flex justify-between items-start mb-4">
              <h2 className="text-xl font-bold">Hermanos Registrados</h2>
              <button
                onClick={() => setShowHermanosModal(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <span className="sr-only">Cerrar</span>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="space-y-4">
              {hermanosData.map((hermano) => (
                <div key={hermano.id} className="border rounded p-4">
                  <div className="flex items-center space-x-3 mb-2">
                    <div className="h-10 w-10 bg-primary/10 rounded-lg flex items-center justify-center">
                      <Users className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium">{hermano.name}</p>
                      <p className="text-sm text-gray-500">
                        {hermano.code} - {hermano.grade}{hermano.section} ({hermano.stage})
                      </p>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <p className="text-sm font-medium text-gray-600">Fecha de Nacimiento:</p>
                    <p className="text-base">{new Date(hermano.birthDate).toLocaleDateString()}</p>
                  </div>
                  <div className="space-y-2">
                    <p className="text-sm font-medium text-gray-600">Teléfono de Contacto:</p>
                    <p className="text-base">{hermano.phone}</p>
                  </div>
                  <div className="space-y-2">
                    <p className="text-sm font-medium text-gray-600">Correo Electrónico:</p>
                    <p className="text-base break-all">{hermano.email}</p>
                  </div>
                  <div className="space-y-2">
                    <p className="text-sm font-medium text-gray-600">Estado:</p>
                    <span className={`px-2 py-0.5 text-xs rounded-full ${
                      hermano.status === "Activo"
                        ? "bg-green-100 text-green-800"
                        : "bg-red-100 text-red-800"
                    }`}>
                      {hermano.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
            <div className="flex justify-end mt-6">
              <Button variant="outline" onClick={() => setShowHermanosModal(false)}>
                Cerrar
              </Button>
            </div>
          </div>
        </div>
      )}

      {showDocumentModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
          onClick={(e) => {
            if (e.target === e.currentTarget) setShowDocumentModal(false);
          }}
        >
          <div className="relative w-full max-w-md bg-white rounded-lg p-6 shadow-lg">
            <div className="flex justify-between items-start mb-4">
              <h2 className="text-xl font-bold">Subir Documento</h2>
              <button
                onClick={() => setShowDocumentModal(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <span className="sr-only">Cerrar</span>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Nombre del Documento *</label>
                <Input
                  value={documentName}
                  onChange={(e) => setDocumentName(e.target.value)}
                  placeholder="Ej: Certificado de Nacimiento"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Tipo de Documento *</label>
                <select
                  value={documentType}
                  onChange={(e) => setDocumentType(e.target.value)}
                  className="w-full border rounded px-3 py-2"
                  required
                >
                  <option value="">Seleccionar tipo</option>
                  <option value="PDF">PDF</option>
                  <option value="DOC">DOC</option>
                  <option value="DOCX">DOCX</option>
                  <option value="XLS">XLS</option>
                  <option value="XLSX">XLSX</option>
                  <option value="JPG">JPG</option>
                  <option value="JPEG">JPEG</option>
                  <option value="PNG">PNG</option>
                  <option value="OTRO">OTRO</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Seleccionar Archivo *</label>
                <Input
                  id="document-file"
                  type="file"
                  accept=".pdf,.doc,.docx,.xls,.xlsx,.jpg,.jpeg,.png"
                  onChange={handleFileChange}
                  className="w-full"
                />
                {selectedFile && (
                  <p className="mt-2 text-sm text-gray-600">
                    Archivo seleccionado: {selectedFile.name} ({Math.round(selectedFile.size / 1024)} KB)
                  </p>
                )}
                <p className="text-xs text-gray-500 mt-1">
                  Formatos permitidos: PDF, DOC, DOCX, XLS, XLSX, JPG, JPEG, PNG. Máximo 10MB.
                </p>
              </div>
            </div>
            <div className="flex justify-end space-x-3 mt-6">
              <Button variant="outline" onClick={() => setShowDocumentModal(false)}>
                Cancelar
              </Button>
              <Button 
                onClick={handleUploadDocument}
                disabled={uploading}
                className="bg-primary text-primary-foreground hover:bg-primary/90"
              >
                {uploading ? "Subiendo..." : "Subir Documento"}
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}