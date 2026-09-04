import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/contexts/AuthContext";
import { User, Image, Lock, X } from "lucide-react";

export default function Perfil() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [photoUrl, setPhotoUrl] = useState(user?.photo || "");
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [showPhotoModal, setShowPhotoModal] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Validar tipo de archivo
      if (!file.type.match(/image\/(jpeg|png)/)) {
        setErrorMessage("Solo se permiten archivos JPG, JPEG o PNG");
        return;
      }
      
      // Validar tamaño (máximo 5MB)
      if (file.size > 5 * 1024 * 1024) {
        setErrorMessage("El archivo no debe superar los 5MB");
        return;
      }
      
      // Crear URL de vista previa
      const reader = new FileReader();
      reader.onload = (event) => {
        setPhotoUrl(event.target?.result as string);
      };
      reader.readAsDataURL(file);
      
      // Aquí normalmente subirías el archivo a un servidor y guardarías la URL
      // Por ahora, solo actualizamos el estado local
      setSuccessMessage("Foto de perfil actualizada (simulado)");
      setErrorMessage(null);
    }
  };

  const handlePasswordChange = async (e: React.FormEvent) => {
    e.preventDefault();
    setSuccessMessage(null);
    setErrorMessage(null);
    
    if (newPassword !== confirmPassword) {
      setErrorMessage("Las contraseñas nuevas no coinciden");
      return;
    }
    
    if (newPassword.length < 6) {
      setErrorMessage("La contraseña debe tener al menos 6 caracteres");
      return;
    }
    
    // Aquí normalmente harías una llamada a la API para cambiar la contraseña
    // Por ahora, simulamos el cambio
    try {
      // Simular llamada a API
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // En una app real, actualizarías el usuario en el contexto y localStorage
      setSuccessMessage("Contraseña cambiada correctamente");
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
      setShowPasswordModal(false);
    } catch (err) {
      setErrorMessage("Error al cambiar la contraseña");
    }
  };

  return (
    <>
      <Card className="mb-6">
        <CardHeader className="pb-4">
          <CardTitle className="text-xl font-bold flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <User className="h-5 w-5" />
              <span>Mi Perfil</span>
            </div>
            <div className="flex space-x-3">
              <Button variant="outline" size="icon" onClick={() => setShowPhotoModal(true)}>
                <Image className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="icon" onClick={() => setShowPasswordModal(true)}>
                <Lock className="h-4 w-4" />
              </Button>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {successMessage && (
            <div className="bg-green-50 border-l-4 border-green-400 p-4 mb-4">
              <p className="text-sm text-green-800">{successMessage}</p>
            </div>
          )}
          {errorMessage && (
            <div className="bg-red-50 border-l-4 border-red-400 p-4 mb-4">
              <p className="text-sm text-red-800">{errorMessage}</p>
            </div>
          )}
          
          <div className="space-y-4">
            <div className="flex items-center space-x-4">
              <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center overflow-hidden">
                {photoUrl ? (
                  <img src={photoUrl} alt="Foto de perfil" className="h-full w-full object-cover" />
                ) : (
                  <User className="h-8 w-8 text-primary" />
                )}
              </div>
              <div className="space-y-2">
                <p className="text-sm font-medium text-gray-900">{user?.name || "Nombre no disponible"}</p>
                <p className="text-xs text-gray-500 capitalize">{user?.role?.replace('-', ' ') || "Rol no disponible"}</p>
                <p className="text-xs text-gray-500 break-all">{user?.email || "Email no disponible"}</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Modal para cambiar foto */}
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4" 
           aria-hidden={!showPhotoModal ? "true" : "false"} 
           role="dialog"
      >
        <div className="relative w-full max-w-md max-h-[90vh] overflow-y-auto">
          <div className="bg-white rounded-lg p-6 shadow-lg">
            <div className="flex justify-between items-start mb-4">
              <h2 className="text-xl font-bold">Cambiar Foto de Perfil</h2>
              <button
                onClick={() => setShowPhotoModal(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <span className="sr-only">Cerrar</span>
                <X className="h-5 w-5" />
              </button>
            </div>
            <form className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="profile-photo">Foto de perfil</Label>
                <Input
                  id="profile-photo"
                  type="file"
                  accept="image/jpeg,image/png"
                  onChange={handlePhotoChange}
                  className="w-full"
                />
                <p className="text-xs text-gray-500 mt-1">
                  Formatos permitidos: JPG, JPEG, PNG. Máximo 5MB.
                </p>
              </div>
            </form>
            <div className="flex justify-end space-x-3 mt-6">
              <Button variant="outline" onClick={() => setShowPhotoModal(false)}>
                Cancelar
              </Button>
              <Button onClick={() => setShowPhotoModal(false)}>
                Guardar cambios
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Modal para cambiar contraseña */}
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4" 
           aria-hidden={!showPasswordModal ? "true" : "false"} 
           role="dialog"
      >
        <div className="relative w-full max-w-md">
          <div className="bg-white rounded-lg p-6 shadow-lg">
            <div className="flex justify-between items-start mb-4">
              <h2 className="text-xl font-bold">Cambiar Contraseña</h2>
              <button
                onClick={() => setShowPasswordModal(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <span className="sr-only">Cerrar</span>
                <X className="h-5 w-5" />
              </button>
            </div>
            <form onSubmit={handlePasswordChange} className="space-y-4">
              <div>
                <Label htmlFor="current-password">Contraseña actual *</Label>
                <Input
                  id="current-password"
                  type="password"
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  required
                  className="w-full"
                />
              </div>
              <div>
                <Label htmlFor="new-password">Nueva contraseña *</Label>
                <Input
                  id="new-password"
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  required
                  minLength={6}
                  className="w-full"
                />
              </div>
              <div>
                <Label htmlFor="confirm-password">Confirmar nueva contraseña *</Label>
                <Input
                  id="confirm-password"
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  minLength={6}
                  className="w-full"
                />
              </div>
            </form>
            <div className="flex justify-end space-x-3 mt-4">
              <Button variant="outline" onClick={() => setShowPasswordModal(false)}>
                Cancelar
              </Button>
              <Button onClick={handlePasswordChange}>
                Cambiar contraseña
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}