import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Users, BookOpen, GraduationCap, Stethoscope, Droplet, HandHeart, Activity, ClipboardList, FileText, Settings } from "lucide-react";

export default function Index() {
  const stats = [
    { title: "Total Alumnos", value: 11, icon: Users, color: "primary" },
    { title: "Etapa I", value: 5, icon: BookOpen, color: "blue" },
    { title: "Etapa II", value: 3, icon: BookOpen, color: "green" },
    { title: "Etapa III", value: 3, icon: BookOpen, color: "purple" },
    { title: "Expedientes Activos", value: 11, icon: FileText, color: "primary" },
    { title: "Pedagogía", value: 8, icon: GraduationCap, color: "yellow" },
    { title: "Psicología", value: 3, icon: Stethoscope, color: "red" },
    { title: "Nutrición", value: 4, icon: Droplet, color: "orange" },
    { title: "Trabajo Social", value: 2, icon: HandHeart, color: "teal" },
    { title: "Conducta", value: 6, icon: Activity, color: "amber" },
  ];

  return (
    <div className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.title} className="border">
            <CardHeader className="pb-4">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <CardTitle className="text-sm font-medium text-gray-600">{stat.title}</CardTitle>
                </div>
                <div className="flex-shrink-0">
                  <stat.icon className={`h-6 w-6 text-${stat.color}-600`} />
                </div>
              </div>
            </CardHeader>
            <CardContent className="text-2xl font-bold text-gray-900">{stat.value}</CardContent>
          </Card>
        ))}
      </div>
      <div className="border-t pt-6">
        <h2 className="text-lg font-semibold mb-4">Accesos rápidos</h2>
        <div className="grid gap-4 sm:grid-cols-3">
          <Button variant="outline" className="w-full flex items-center justify-start px-4 py-3">
            <Users className="mr-3 h-5 w-5" />
            <span>Gestión de Alumnos</span>
          </Button>
          <Button variant="outline" className="w-full flex items-center justify-start px-4 py-3">
            <BookOpen className="mr-3 h-5 w-5" />
            <span>Etapas (I, II, III)</span>
          </Button>
          <Button variant="outline" className="w-full flex items-center justify-start px-4 py-3">
            <Stethoscope className="mr-3 h-5 w-5" />
            <span>Psicología</span>
          </Button>
          <Button variant="outline" className="w-full flex items-center justify-start px-4 py-3">
            <Droplet className="mr-3 h-5 w-5" />
            <span>Nutrición</span>
          </Button>
          <Button variant="outline" className="w-full flex items-center justify-start px-4 py-3">
            <HandHeart className="mr-3 h-5 w-5" />
            <span>Trabajo Social</span>
          </Button>
          <Button variant="outline" className="w-full flex items-center justify-start px-4 py-3">
            <Settings className="mr-3 h-5 w-5" />
            <span>Administración</span>
          </Button>
        </div>
      </div>
    </div>
  );
}