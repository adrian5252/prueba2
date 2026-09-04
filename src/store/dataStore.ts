// Tipos de datos para la aplicación

export type UserRole = 'admin' | 'maestra-etapa1' | 'maestra-etapa2' | 'maestra-etapa3' | 'pedagogia' | 'psicologia' | 'nutricion' | 'trabajo-social';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  assignedStages: string[]; // Para maestras: ['Etapa I'], ['Etapa II'], etc. Admin tiene todas
  status: 'Activo' | 'Inactivo';
  password?: string; // Solo para auth local, nunca exponer
  createdAt: string;
  lastLogin?: string;
  profilePhoto?: string; // Base64 o URL de la foto
}

export interface Student {
  id: string;
  code: string;
  name: string;
  firstName: string;
  lastName: string;
  birthDate: string;
  gender: 'Masculino' | 'Femenino' | 'Otro';
  entryDate: string;
  school: string;
  grade: string;
  section: string;
  stage: 'Etapa I' | 'Etapa II' | 'Etapa III';
  status: 'Activo' | 'Inactivo';
  familyCode?: string; // Para identificar hermanos
  
  // Contacto
  email?: string;
  phone?: string;
  
  // Información de padres/encargados
  fatherName?: string;
  fatherPhone?: string;
  motherName?: string;
  motherPhone?: string;
  guardianName?: string;
  guardianPhone?: string;
  
  // Metadatos
  createdAt: string;
  createdBy: string;
  updatedAt?: string;
  updatedBy?: string;
}

export interface Observation {
  id: string;
  studentId: string;
  area: 'Oratorio' | 'Clase' | 'General';
  className?: string;
  date: string;
  observation: string;
  followUp?: string;
  createdBy: string;
  createdAt: string;
}

export interface PsychologicalRecord {
  id: string;
  studentId: string;
  date: string;
  type: 'Observación' | 'Seguimiento' | 'Evaluación' | 'Intervención';
  description: string;
  caseStatus?: 'Abierto' | 'En seguimiento' | 'Solucionado' | 'Cerrado';
  responsible: string;
  followUp?: string;
  createdBy: string;
  createdAt: string;
}

export interface NutritionRecord {
  id: string;
  studentId: string;
  date: string;
  plan: string;
  observations: string;
  recommendations?: string;
  responsible: string;
  createdBy: string;
  createdAt: string;
}

export interface SocialWorkRecord {
  id: string;
  studentId: string;
  date: string;
  type: 'Visita domiciliaria' | 'Reunión familiar' | 'Taller grupal' | 'Derivación externa' | 'Apoyo económico' | 'Otro';
  description: string;
  followUp?: string;
  responsible: string;
  createdBy: string;
  createdAt: string;
}

export interface ConductRecord {
  id: string;
  studentId: string;
  date: string;
  description: string;
  type: 'Amonestación' | 'Advertencia' | 'Refuerzo positivo' | 'Felicitación';
  points: number;
  responsible: string;
  createdBy: string;
  createdAt: string;
}

export interface AcademicRecord {
  id: string;
  studentId: string;
  period: string;
  subject: string;
  grade: number;
  teacher: string;
  createdBy: string;
  createdAt: string;
}

export interface Document {
  id: string;
  studentId: string;
  name: string;
  type: string; // PDF, DOCX, XLSX, JPG, PNG
  size: number; // bytes
  file: string; // Base64 o URL
  uploadedBy: string;
  uploadedAt: string;
}

export interface HistoryEntry {
  id: string;
  studentId: string;
  date: string;
  area: string;
  description: string;
  user: string;
  createdAt: string;
}

// Generate unique ID
export const generateId = (): string => {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
};

// Default students data
export const defaultStudents: Student[] = [
  {
    id: '1', code: 'A001', name: 'Ana García López', firstName: 'Ana', lastName: 'García López',
    birthDate: '2018-05-14', gender: 'Femenino', entryDate: '2020-03-01', school: 'Colegio San José',
    grade: '1ro', section: 'A', stage: 'Etapa I', status: 'Activo', familyCode: 'F001',
    email: 'ana.garcia@colegio.edu', phone: '+56 9 1234 5678',
    fatherName: 'Carlos García', fatherPhone: '+56 9 1111 1111',
    motherName: 'María López', motherPhone: '+56 9 2222 2222',
    createdAt: '2020-03-01', createdBy: 'admin'
  },
  {
    id: '2', code: 'A002', name: 'Luis Martínez Pérez', firstName: 'Luis', lastName: 'Martínez Pérez',
    birthDate: '2017-09-22', gender: 'Masculino', entryDate: '2020-03-01', school: 'Colegio San José',
    grade: '1ro', section: 'B', stage: 'Etapa I', status: 'Activo', familyCode: 'F001',
    email: 'luis.martinez@colegio.edu', phone: '+56 9 2345 6789',
    fatherName: 'Juan Martínez', fatherPhone: '+56 9 3333 3333',
    motherName: 'Elena Pérez', motherPhone: '+56 9 4444 4444',
    createdAt: '2020-03-01', createdBy: 'admin'
  },
  {
    id: '3', code: 'A003', name: 'Sofía Rodríguez Silva', firstName: 'Sofía', lastName: 'Rodríguez Silva',
    birthDate: '2016-03-08', gender: 'Femenino', entryDate: '2019-03-01', school: 'Colegio San José',
    grade: '1ro', section: 'A', stage: 'Etapa I', status: 'Activo',
    email: 'sofia.rodriguez@colegio.edu', phone: '+56 9 3456 7890',
    fatherName: 'Pedro Rodríguez', fatherPhone: '+56 9 5555 5555',
    motherName: 'Carmen Silva', motherPhone: '+56 9 6666 6666',
    createdAt: '2019-03-01', createdBy: 'admin'
  },
  {
    id: '4', code: 'A004', name: 'Diego Fernández Ruiz', firstName: 'Diego', lastName: 'Fernández Ruiz',
    birthDate: '2018-11-30', gender: 'Masculino', entryDate: '2020-03-01', school: 'Colegio San José',
    grade: '1ro', section: 'C', stage: 'Etapa I', status: 'Inactivo',
    email: 'diego.fernandez@colegio.edu', phone: '+56 9 4567 8901',
    createdAt: '2020-03-01', createdBy: 'admin'
  },
  {
    id: '5', code: 'A005', name: 'Valentina Gómez Díaz', firstName: 'Valentina', lastName: 'Gómez Díaz',
    birthDate: '2017-07-19', gender: 'Femenino', entryDate: '2020-03-01', school: 'Colegio San José',
    grade: '1ro', section: 'A', stage: 'Etapa I', status: 'Activo',
    email: 'valentina.gomez@colegio.edu', phone: '+56 9 5678 9012',
    createdAt: '2020-03-01', createdBy: 'admin'
  },
  {
    id: '6', code: 'B001', name: 'Pedro López Hernández', firstName: 'Pedro', lastName: 'López Hernández',
    birthDate: '2015-01-22', gender: 'Masculino', entryDate: '2018-03-01', school: 'Colegio San José',
    grade: '2do', section: 'A', stage: 'Etapa II', status: 'Activo',
    email: 'pedro.lopez@colegio.edu', phone: '+56 9 6789 0123',
    createdAt: '2018-03-01', createdBy: 'admin'
  },
  {
    id: '7', code: 'B002', name: 'Lucía Méndez Torres', firstName: 'Lucía', lastName: 'Méndez Torres',
    birthDate: '2014-08-14', gender: 'Femenino', entryDate: '2017-03-01', school: 'Colegio San José',
    grade: '2do', section: 'B', stage: 'Etapa II', status: 'Activo',
    email: 'lucia.mendez@colegio.edu', phone: '+56 9 7890 1234',
    createdAt: '2017-03-01', createdBy: 'admin'
  },
  {
    id: '8', code: 'B003', name: 'Mateo Rojas Silva', firstName: 'Mateo', lastName: 'Rojas Silva',
    birthDate: '2015-12-05', gender: 'Masculino', entryDate: '2018-03-01', school: 'Colegio San José',
    grade: '2do', section: 'C', stage: 'Etapa II', status: 'Inactivo',
    email: 'mateo.rojas@colegio.edu', phone: '+56 9 8901 2345',
    createdAt: '2018-03-01', createdBy: 'admin'
  },
  {
    id: '9', code: 'C001', name: 'Camila Torres Vega', firstName: 'Camila', lastName: 'Torres Vega',
    birthDate: '2012-03-15', gender: 'Femenino', entryDate: '2015-03-01', school: 'Colegio San José',
    grade: '3ro', section: 'A', stage: 'Etapa III', status: 'Activo',
    email: 'camila.torres@colegio.edu', phone: '+56 9 1234 5678',
    createdAt: '2015-03-01', createdBy: 'admin'
  },
  {
    id: '10', code: 'C002', name: 'Andrés Ramírez Castro', firstName: 'Andrés', lastName: 'Ramírez Castro',
    birthDate: '2012-07-22', gender: 'Masculino', entryDate: '2015-03-01', school: 'Colegio San José',
    grade: '3ro', section: 'B', stage: 'Etapa III', status: 'Activo',
    email: 'andres.ramirez@colegio.edu', phone: '+56 9 2345 6789',
    createdAt: '2015-03-01', createdBy: 'admin'
  },
  {
    id: '11', code: 'C003', name: 'Isabella Morales Ríos', firstName: 'Isabella', lastName: 'Morales Ríos',
    birthDate: '2012-11-08', gender: 'Femenino', entryDate: '2015-03-01', school: 'Colegio San José',
    grade: '3ro', section: 'A', stage: 'Etapa III', status: 'Activo',
    email: 'isabella.morales@colegio.edu', phone: '+56 9 3456 7890',
    createdAt: '2015-03-01', createdBy: 'admin'
  },
];

// Default users data
export const defaultUsers: User[] = [
  {
    id: '1', name: 'Administrador', email: 'admin@colegio.edu', role: 'admin',
    assignedStages: ['Etapa I', 'Etapa II', 'Etapa III'],
    status: 'Activo', password: 'admin123', createdAt: '2020-01-01'
  },
  {
    id: '2', name: 'Maestra Etapa I', email: 'maestra1@colegio.edu', role: 'maestra-etapa1',
    assignedStages: ['Etapa I'], status: 'Activo', password: 'etapa123', createdAt: '2020-03-01'
  },
  {
    id: '3', name: 'Maestra Etapa II', email: 'maestra2@colegio.edu', role: 'maestra-etapa2',
    assignedStages: ['Etapa II'], status: 'Activo', password: 'etapa123', createdAt: '2020-03-01'
  },
  {
    id: '4', name: 'Maestra Etapa III', email: 'maestra3@colegio.edu', role: 'maestra-etapa3',
    assignedStages: ['Etapa III'], status: 'Activo', password: 'etapa123', createdAt: '2020-03-01'
  },
  {
    id: '5', name: 'Pedagogo', email: 'pedagogia@colegio.edu', role: 'pedagogia',
    assignedStages: ['Etapa I', 'Etapa II', 'Etapa III'],
    status: 'Activo', password: 'pedago123', createdAt: '2020-03-01'
  },
  {
    id: '6', name: 'Psicólogo', email: 'psicologia@colegio.edu', role: 'psicologia',
    assignedStages: ['Etapa I', 'Etapa II', 'Etapa III'],
    status: 'Activo', password: 'psico123', createdAt: '2020-03-01'
  },
  {
    id: '7', name: 'Nutricionista', email: 'nutricion@colegio.edu', role: 'nutricion',
    assignedStages: ['Etapa I', 'Etapa II', 'Etapa III'],
    status: 'Activo', password: 'nutri123', createdAt: '2020-03-01'
  },
  {
    id: '8', name: 'Trabajador Social', email: 'trabajosocial@colegio.edu', role: 'trabajo-social',
    assignedStages: ['Etapa I', 'Etapa II', 'Etapa III'],
    status: 'Activo', password: 'ts123', createdAt: '2020-03-01'
  },
];

// Role labels
export const roleLabels: Record<UserRole, string> = {
  'admin': 'Administrador',
  'maestra-etapa1': 'Maestra Etapa I',
  'maestra-etapa2': 'Maestra Etapa II',
  'maestra-etapa3': 'Maestra Etapa III',
  'pedagogia': 'Pedagogía',
  'psicologia': 'Psicología',
  'nutricion': 'Nutrición',
  'trabajo-social': 'Trabajo Social',
};

// Stage labels
export const stageLabels = ['Etapa I', 'Etapa II', 'Etapa III'] as const;

// Get assigned stages for a user based on role
export const getAssignedStages = (user: User): string[] => {
  if (user.role === 'admin') {
    return ['Etapa I', 'Etapa II', 'Etapa III'];
  }
  return user.assignedStages;
};

// Check if user can access a stage
export const canAccessStage = (user: User, stage: string): boolean => {
  if (user.role === 'admin') return true;
  return user.assignedStages.includes(stage);
};

// Check if user can modify data for a stage
export const canModifyStage = (user: User, stage: string): boolean => {
  if (user.role === 'admin') return true;
  if (user.role === 'maestra-etapa1' && stage === 'Etapa I') return true;
  if (user.role === 'maestra-etapa2' && stage === 'Etapa II') return true;
  if (user.role === 'maestra-etapa3' && stage === 'Etapa III') return true;
  // Special roles can modify in their areas
  if (user.role === 'pedagogia') return true;
  if (user.role === 'psicologia') return true;
  if (user.role === 'nutricion') return true;
  if (user.role === 'trabajo-social') return true;
  return false;
};
