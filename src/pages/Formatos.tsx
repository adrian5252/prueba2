import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Users, FileText, Printer, Search, Calendar } from "lucide-react";
import { PDFGenerator } from "@/utils/pdfGenerator";
import { useAuth } from "@/contexts/AuthContext";

const mockStudents = [
  { id: 1, code: "A001", name: "Ana García López", grade: "1ro", section: "A" },
  { id: 2, code: "A002", name: "Luis Martínez Pérez", grade: "2do", section: "B" },
  { id: 3, code: "A003", name: "Sofía Rodríguez Silva", grade: "3ro", section: "A" },
  { id: 4, code: "A004", name: "Diego Fernández Ruiz", grade: "1ro", section: "C" },
  { id: 5, code: "A005", name: "Valentina Gómez Díaz", grade: "2do", section: "A" },
];

const formatTypes = [
  { value: "expediente", label: "Formato de Expediente Completo", pdf: true },
  { value: "academico", label: "Reporte Académico", pdf: true },
  { value: "conducta", label: "Reporte de Conducta", pdf: true },
  { value: "psicologico", label: "Reporte Psicológico", pdf: false },
  { value: "nutricional", label: "Plan Nutricional", pdf: false },
  { value: "observaciones", label: "Reporte de Observaciones", pdf: false },
  { value: "seguimiento", label: "Reporte de Seguimiento", pdf: false },
  { value: "general", label: "Reporte General", pdf: true },
];

export default function Formatos() {
  const [selectedStudent, setSelectedStudent] = useState<{ id: number; code: string; name: string; grade: string; section: string } | null>(null);
  const [selectedFormat, setSelectedFormat] = useState<string>("expediente");
  const [previewVisible, setPreviewVisible] = useState(false);
  const [search, setSearch] = useState("");
  const { user } = useAuth();

  const filteredStudents = mockStudents.filter((s) =>
    s.name.toLowerCase().includes(search.toLowerCase()) ||
    s.code.toLowerCase().includes(search.toLowerCase()) ||
    s.grade.toLowerCase().includes(search.toLowerCase()) ||
    s.section.toLowerCase().includes(search.toLowerCase())
  );

  const handleGeneratePDF = () => {
    if (!selectedStudent) {
      alert("Por favor seleccione un alumno");
      return;
    }

    let pdfContent: string[] = [];
    let title = "";
    let institutionName = "EduGest - Colegio Institucional";
    const date = new Date().toLocaleDateString("es-CL");

    switch (selectedFormat) {
      case "expediente":
        title = "Formato de Expediente Completo";
        pdfContent = [
          `Código del Alumno: ${selectedStudent.code}`,
          `Nombre: ${selectedStudent.name}`,
          `Grado: ${selectedStudent.grade} ${selectedStudent.section}`,
          `Etapa: (según registro)`,
          `Fecha de Generación: ${date}`,
          "",
          "--- INFORMACIÓN GENERAL DEL EXPEDIENTE ---",
          "",
          "Este documento contiene el expediente completo del alumno registrado en el sistema EduGest.",
          "",
          "--- DATOS ACADÉMICOS ---",
          "• Historial de calificaciones",
          "• Observaciones pedagógicas",
          "• Seguimiento de rendimiento",
          "",
          "--- ÁREAS ESPECIALES ---",
          "• Registro psicológico",
          "• Planes nutricionales",
          "• Intervenciones de trabajo social",
          "• Registro de conducta",
          "",
          "--- FIRMA ---",
          "__________________________",
          "Firma del Director/a",
          "",
          "EduGest - Sistema de Gestión Escolar",
        ];
        break;

      case "academico":
        title = "Reporte Académico";
        pdfContent = [
          `Código del Alumno: ${selectedStudent.code}`,
          `Nombre: ${selectedStudent.name}`,
          `Grado: ${selectedStudent.grade} ${selectedStudent.section}`,
          `Etapa: (según registro)`,
          `Fecha de Generación: ${date}`,
          "",
          "--- HISTORIAL ACADÉMICO ---",
          "• Período 2024-1: Matemáticas - Nota: 6.5",
          "• Período 2024-1: Lenguaje - Nota: 5.8",
          "• Período 2024-1: Ciencias - Nota: 6.2",
          "• Asistencia general: 92%",
          "",
          "--- OBSERVACIONES PEDAGÓGICAS ---",
          "• Progreso satisfactorio en todas las asignaturas",
          "• Áreas de mejora: Resolución de problemas",
          "• Recomendaciones: Continuar con refuerzo en matemáticas",
          "",
          "--- FIRMA ---",
          "__________________________",
          "Firma del Profesor/a Tutor/a",
          "",
          "EduGest - Sistema de Gestión Escolar",
        ];
        break;

      case "conducta":
        title = "Reporte de Conducta";
        pdfContent = [
          `Código del Alumno: ${selectedStudent.code}`,
          `Nombre: ${selectedStudent.name}`,
          `Grado: ${selectedStudent.grade} ${selectedStudent.section}`,
          `Etapa: (según registro)`,
          `Fecha de Generación: ${date}`,
          "",
          "--- REGISTRO DE CONDUCTA ---",
          "• Total de registros: 6",
          "• Refuerzos positivos: 3",
          "• Amonestaciones: 2",
          "• Sin observaciones: 1",
          "",
          "--- DETALLE DE REGISTROS ---",
          "1. 2024-09-03: Llegó tarde a clase - Amonestación verbal",
          "2. 2024-09-05: No realizó la tarea - Amonestación verbal",
          "3. 2024-09-07: Ayudó a un compañero - Refuerzo positivo",
          "4. 2024-09-10: Interrumpió constantemente - Amonestación verbal",
          "5. 2024-09-11: Participó activamente en grupo - Refuerzo positivo",
          "6. 2024-09-12: Respeto y colaboración - Refuerzo positivo",
          "",
          "--- FIRMA ---",
          "__________________________",
          "Firma del Profesor/a de Conducta",
          "",
          "EduGest - Sistema de Gestión Escolar",
        ];
        break;

      case "general":
        title = "Reporte General";
        pdfContent = [
          `Código del Alumno: ${selectedStudent.code}`,
          `Nombre: ${selectedStudent.name}`,
          `Grado: ${selectedStudent.grade} ${selectedStudent.section}`,
          `Etapa: (según registro)`,
          `Fecha de Generación: ${date}`,
          "",
          "--- INFORMACIÓN GENERAL DEL ALUMNO ---",
          "Este reporte contiene los datos básicos y transversal del alumno.",
          "",
          "--- DATOS DEL ALUMNO ---",
          "• Código: A001",
          "• Nombres: Ana García López",
          "• Apellidos: (por completar en sistema)",
          "• Fecha de ingreso: (por completar)",
          "• Fecha de nacimiento: (por completar)",
          "• Género: (por completar)",
          "• Colegio/escuela: (por completar)",
          "• Grado: 1ro",
          "• Sección: A",
          "• Etapa: (según registro)",
          "• Estado: Activo",
          "",
          "--- INFORMACIÓN DE PADRES ---",
          "• Nombre del padre: (por completar)",
          "• Teléfono del padre: (por completar)",
          "• Nombre de la madre: (por completar)",
          "• Teléfono de la madre: (por completar)",
          "• Otros encargados: (por completar)",
          "• Teléfono del encargado: (por completar)",
          "",
          "--- HERMANOS ---",
          "• Código familiar: (por completar)",
          "• Hermanos registrados: (por completar)",
          "• Grado/Etapa de hermanos: (por completar)",
          "",
          "--- FIRMA ---",
          "__________________________",
          "Firma del Director/a",
          "",
          "EduGest - Sistema de Gestión Escolar",
        ];
        break;

      default:
        title = "Formato de Expediente";
        pdfContent = [
          `Código del Alumno: ${selectedStudent.code}`,
          `Nombre: ${selectedStudent.name}`,
          `Grado: ${selectedStudent.grade} ${selectedStudent.section}`,
          `Fecha de Generación: ${date}`,
          "",
          "--- DOCUMENTO DEL SISTEMA ---",
          "Formato de expediente generado por EduGest.",
          "Para información completa, acceder al expediente del alumno.",
          "",
          "--- NOTA ---",
          "Este es un formato básico. Para reportes completos,",
          "consultar las secciones específicas del sistema.",
          "",
          "--- FIRMA ---",
          "__________________________",
          "",
          "EduGest - Sistema de Gestión Escolar",
        ];
    }

    const pdfDataUri = PDFGenerator.generateStudentRecord({
      title,
      institutionName,
      date,
      studentData: selectedStudent,
      content: pdfContent,
    });

    PDFGenerator.downloadPDF(pdfDataUri, `${title.replace(/[^a-zA-Z0-9]/g, "_")}_${selectedStudent.code}.pdf`);
    setPreviewVisible(true);
  };

  const handlePrint = () => {
    if (!previewVisible) {
      alert("Primero genere una vista previa");
      return;
    }
    window.print();
  };

  return (
    <Card className="mb-6">
      <CardHeader className="pb-4">
        <CardTitle className="text-xl font-bold flex items-center">
          <FileText className="mr-2 h-5 w-5" />
          Formatos e Impresión
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <div className="relative w-full">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Buscar alumno..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-10"
            />
          </div>
          <div className="space-y-3">
            <div className="flex items-center space-x-3">
              <Users className="h-5 w-5" />
              <div>
                <p className="text-sm font-medium text-gray-600">Seleccionar Alumno</p>
                <Select
                  value={selectedStudent?.id?.toString() ?? ""}
                  onValueChange={(v) => {
                    const s = filteredStudents.find((st) => st.id === Number(v));
                    setSelectedStudent(s ?? null);
                  }}
                >
                  <SelectTrigger className="w-[200px]">
                    <SelectValue placeholder="Seleccionar un alumno" />
                  </SelectTrigger>
                  <SelectContent>
                    {filteredStudents.map((s) => (
                      <SelectItem key={s.id} value={s.id.toString()}>
                        {s.code} - {s.name} ({s.grade}{s.section})
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
          <div className="space-y-3">
            <div className="flex items-center space-x-3">
              <FileText className="h-5 w-5" />
              <div>
                <p className="text-sm font-medium text-gray-600">Seleccionar Tipo de Formato</p>
                <div className="space-y-2">
                  {formatTypes.map((fmt) => (
                    <div key={fmt.value} className="flex items-center space-x-3">
                      <Checkbox
                        checked={selectedFormat === fmt.value}
                        onCheckedChange={() => setSelectedFormat(fmt.value)}
                        className="h-4 w-4"
                      />
                      <span>{fmt.label}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
          <div className="flex justify-end space-x-3">
            <Button variant="outline" onClick={() => setPreviewVisible(true)}>Vista Previa</Button>
            <Button onClick={handleGeneratePDF}>Generar PDF</Button>
            <Button variant="outline" onClick={handlePrint} disabled={!previewVisible}>
              Imprimir
            </Button>
          </div>
        </div>

        {/* Preview Area */}
        {previewVisible && selectedStudent && (
          <Card className="mt-6">
            <CardHeader className="pb-4">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg font-bold">
                  Vista Previa: {selectedFormat === "expediente" ? "Formato de Expediente Completo" : selectedFormat}
                </CardTitle>
                <Button variant="ghost" size="icon" onClick={() => setPreviewVisible(false)}>
                  <FileText className="h-4 w-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent className="min-h-[500px] border p-4 text-left">
              <div className="text-gray-500 text-sm">
                <p>Vista previa del formato seleccionado para:</p>
                <p className="font-bold mb-2">{selectedStudent.name}</p>
                <p className="text-sm mb-2">{selectedStudent.code} - {selectedStudent.grade}{selectedStudent.section}</p>
                <div className="border rounded bg-gray-50 p-4 min-h-[350px] overflow-y-auto">
                  <p className="text-gray-700 mb-1 break-all">
                    [Vista previa del documento PDF. El contenido se generará al descargar o imprimir.]
                  </p>
                </div>
                <p className="mt-4 text-xs text-gray-500">
                  Nota: Esta es una simulación. En una implementación real con jsPDF,
                  se generaría un PDF con el diseño y formato completos.
                </p>
              </div>
            </CardContent>
          </Card>
        )}
      </CardContent>
    </Card>
  );
}