import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { HelpCircle, FileText, UserPlus, X, Menu, User, ShieldCheck, BookOpen, Printer } from "lucide-react";

export default function Ayuda() {
  return (
    <>
      <Card className="mb-6">
        <CardHeader className="pb-4">
          <CardTitle className="text-xl font-bold flex items-center">
            <HelpCircle className="mr-2 h-5 w-5" />
            Ayuda y Información
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-800">Botones y Acciones Principales</h3>
            <div className="space-y-3">
              <div className="flex items-start space-x-3">
                <div className="flex-shrink-0">
                  <FileText className="h-4 w-4 text-primary" />
                </div>
                <div>
                  <p className="font-medium text-gray-900">Expediente</p>
                  <p className="text-sm text-gray-600">
                    Abre toda la información registrada del alumno, incluyendo datos académicos, 
                    observaciones, historial y documentos asociados.
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="flex-shrink-0">
                  <UserPlus className="h-4 w-4 text-primary" />
                </div>
                <div>
                  <p className="font-medium text-gray-900">Editar</p>
                  <p className="text-sm text-gray-600">
                    Permite modificar la información del registro seleccionado. 
                    Los cambios se guardan inmediatamente en la base de datos.
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="flex-shrink-0">
                  <X className="h-4 w-4 text-primary" />
                </div>
                <div>
                  <p className="font-medium text-gray-900">Deshabilitar alumno</p>
                  <p className="text-sm text-gray-600">
                    Oculta al alumno de los registros activos sin eliminar permanentemente 
                    su información. El alumno puede ser reactivado posteriormente.
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="flex-shrink-0">
                  <FileText className="h-4 w-4 text-primary" />
                </div>
                <div>
                  <p className="font-medium text-gray-900">PDF</p>
                  <p className="text-sm text-gray-600">
                    Genera un documento PDF con la información seleccionada. 
                    El PDF incluye formato profesional y puede ser descargado o impreso.
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="flex-shrink-0">
                  <Printer className="h-4 w-4 text-primary" />
                </div>
                <div>
                  <p className="font-medium text-gray-900">Imprimir</p>
                  <p className="text-sm text-gray-600">
                    Abre la ventana de impresión del navegador optimizada para tamaño A4.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-800">Navegación y Menú</h3>
            <div className="space-y-3">
              <div className="flex items-start space-x-3">
                <div className="flex-shrink-0">
                  <Menu className="h-4 w-4 text-primary" />
                </div>
                <div>
                  <p className="font-medium text-gray-900">Menú lateral</p>
                  <p className="text-sm text-gray-600">
                    En computadoras, el menú se muestra siempre visible. 
                    En dispositivos móviles, use el botón ☰ para abrir y cerrar el menú.
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="flex-shrink-0">
                  <User className="h-4 w-4 text-primary" />
                </div>
                <div>
                  <p className="font-medium text-gray-900">Mi Perfil</p>
                  <p className="text-sm text-gray-600">
                    Acceda a su información personal, cambie su contraseña y actualice 
                    su foto de perfil desde esta sección.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-800">Permisos por Rol</h3>
            <div className="space-y-3">
              <div className="flex items-start space-x-3">
                <div className="flex-shrink-0">
                  <ShieldCheck className="h-4 w-4 text-primary" />
                </div>
                <div>
                  <p className="font-medium text-gray-900">Administrador</p>
                  <p className="text-sm text-gray-600">
                    Tiene acceso completo a todas las áreas y funciones del sistema, 
                    incluyendo gestión de usuarios y configuraciones.
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="flex-shrink-0">
                  <BookOpen className="h-4 w-4 text-primary" />
                </div>
                <div>
                  <p className="font-medium text-gray-900">Maestras</p>
                  <p className="text-sm text-gray-600">
                    Solo pueden acceder a las etapas que tengan asignadas y a los 
                    alumnos pertenecientes a esas etapas.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </>
  );
}