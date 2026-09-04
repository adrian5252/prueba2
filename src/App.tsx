import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Login from "./pages/Login";
import { useAuth } from "./contexts/AuthContext";
import { Layout } from "./components/Layout";
import Alumnos from "./pages/Alumnos";
import EtapaCognitiva from "./pages/EtapaCognitiva";
import EtapaII from "./pages/EtapaII";
import EtapaIII from "./pages/EtapaIII";
import Expediente from "./pages/Expediente";
import Pedagogia from "./pages/Pedagogia";
import Psicologia from "./pages/Psicologia";
import Nutricion from "./pages/Nutricion";
import TrabajoSocial from "./pages/TrabajoSocial";
import Conducta from "./pages/Conducta";
import General from "./pages/General";
import Formatos from "./pages/Formatos";
import Administracion from "./pages/Administracion";
import Perfil from "./pages/Perfil";
import Ayuda from "./pages/Ayuda";

const queryClient = new QueryClient();

const RequireAuth = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated } = useAuth();
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  return <>{children}</>;
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route element={<RequireAuth><Layout /></RequireAuth>}>
            <Route index element={<Index />} />
            <Route path="alumnos" element={<Alumnos />} />
            <Route path="etapa-1" element={<EtapaCognitiva />} />
            <Route path="etapa-2" element={<EtapaII />} />
            <Route path="etapa-3" element={<EtapaIII />} />
            <Route path="expediente/:studentId" element={<Expediente />} />
            <Route path="pedagogia" element={<Pedagogia />} />
            <Route path="psicologia" element={<Psicologia />} />
            <Route path="nutricion" element={<Nutricion />} />
            <Route path="trabajo-social" element={<TrabajoSocial />} />
            <Route path="conducta" element={<Conducta />} />
            <Route path="general" element={<General />} />
            <Route path="formatos" element={<Formatos />} />
            <Route path="administracion" element={<Administracion />} />
            <Route path="perfil" element={<Perfil />} />
            <Route path="ayuda" element={<Ayuda />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;