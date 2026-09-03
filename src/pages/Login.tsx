import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/contexts/AuthContext";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      await login(email, password);
      navigate("/");
    } catch (err: any) {
      setError(err.message || "Error al iniciar sesión");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="pb-6">
          <CardTitle className="text-center text-2xl font-bold">
            EduGest - Inicio de Sesión
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="email">Correo electrónico</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                disabled={loading}
                className="w-full"
              />
            </div>
            <div>
              <Label htmlFor="password">Contraseña</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                disabled={loading}
                className="w-full"
              />
            </div>
            {error && (
              <p className="text-sm text-destructive">{error}</p>
            )}
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "Iniciando..." : "Iniciar Sesión"}
            </Button>
          </form>
        </CardContent>
        <CardFooter className="block">
          <p className="text-center text-sm text-muted-foreground font-medium mb-2">
            Usuarios de prueba:
          </p>
          <div className="text-xs text-muted-foreground space-y-1 bg-gray-50 p-3 rounded">
            <p><strong>Admin:</strong> admin@colegio.edu / admin123</p>
            <p><strong>Maestra Etapa I:</strong> maestra1@colegio.edu / etapa123</p>
            <p><strong>Maestra Etapa II:</strong> maestra2@colegio.edu / etapa123</p>
            <p><strong>Maestra Etapa III:</strong> maestra3@colegio.edu / etapa123</p>
            <p><strong>Pedagogía:</strong> pedagogia@colegio.edu / pedago123</p>
            <p><strong>Psicología:</strong> psicologia@colegio.edu / psico123</p>
            <p><strong>Nutrición:</strong> nutricion@colegio.edu / nutri123</p>
            <p><strong>Trabajo Social:</strong> trabajosocial@colegio.edu / ts123</p>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}