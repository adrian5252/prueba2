// Sistema de almacenamiento de datos con localStorage
// Simula una base de datos relacional con tablas conectadas

export interface User {
  id: string;
  name: string;
  email: string;
  password: string;
  role: 'admin' | 'maestra-etapa1' | 'maestra-etapa2' | 'maestra-etapa3' | 'pedagogia' | 'psicologia' | 'nutricion' | 'trabajo-social';
  status: 'Activo' | 'Deshabilitado';
  assignedStages: string[]; // Para maestras: ['Etapa I'] por ejemplo
  photo?: string; // Base64
  lastLogin?: string;
}

export interface Student {
  id: number;
  code: string;
  name: string;
  firstName: string;
  lastName: string;
  birthDate: string;
  admissionDate: string;
  gender: 'Masculino' | 'Femenino' | 'Otro';
  school: string;
  grade: string;
  section: string;
  stage: 'Etapa I' | 'Etapa II' | 'Etapa III';
  status: 'Activo' | 'Deshabilitado';
  familyCode: string; // Para identificar hermanos
  parentName: string;
  parentPhone: string;
  motherName: string;
  motherPhone: string;
  guardianName?: string;
  guardianPhone?: string;
  contactPhone: string;
  contactEmail: string;
  phone: string;
  email: string;
  siblingCodes: string[];
}

export interface StudentFile {
  id: string;
  studentId: number;
  name: string;
  type: string;
  size: number;
  data: string; // Base64
  uploadedBy: string;
  uploadedAt: string;
}

export interface HistoryEntry {
  id: string;
  studentId: number;
  date: string;
  area: string;
  description: string;
  user: string;
}

export interface Observation {
  id: string;
  studentId: number;
  studentCode: string;
  studentName: string;
  date: string;
  area: string;
  responsible: string;
  observation: string;
  followUp: string;
}

const STORAGE_KEYS = {
  USERS: 'edugest_users',
  STUDENTS: 'edugest_students',
  FILES: 'edugest_files',
  HISTORY: 'edugest_history',
  OBSERVATIONS: 'edugest_observations',
  CURRENT_USER: 'edugest-user',
};

// Datos iniciales
const initialUsers: User[] = [
  {
    id: '1',
    name: 'Administrador',
    email: 'admin@colegio.edu',
    password: 'admin123',
    role: 'admin',
    status: 'Activo',
    assignedStages: ['Etapa I', 'Etapa II', 'Etapa III'],
    lastLogin: '2024-09-12 08:30',
  },
  {
    id: '2',
    name: 'Maestra Etapa I',
    email: 'maestra1@colegio.edu',
    password: 'etapa123',
    role: 'maestra-etapa1',
    status: 'Activo',
    assignedStages: ['Etapa I'],
    lastLogin: '2024-09-11 14:15',
  },
  {
    id: '3',
    name: 'Maestra Etapa II',
    email: 'maestra2@colegio.edu',
    password: 'etapa123',
    role: 'maestra-etapa2',
    status: 'Activo',
    assignedStages: ['Etapa II'],
    lastLogin: '2024-09-10 09:45',
  },
  {
    id: '4',
    name: 'Maestra Etapa III',
    email: 'maestra3@colegio.edu',
    password: 'etapa123',
    role: 'maestra-etapa3',
    status: 'Activo',
    assignedStages: ['Etapa III'],
    lastLogin: '2024-09-09 11:20',
  },
  {
    id: '5',
    name: 'Pedagogo',
    email: 'pedagogia@colegio.edu',
    password: 'pedago123',
    role: 'pedagogia',
    status: 'Activo',
    assignedStages: [],
    lastLogin: '2024-09-08 16:00',
  },
  {
    id: '6',
    name: 'Psicólogo',
    email: 'psicologia@colegio.edu',
    password: 'psico123',
    role: 'psicologia',
    status: 'Activo',
    assignedStages: [],
    lastLogin: '2024-09-07 10:05',
  },
  {
    id: '7',
    name: 'Nutricionista',
    email: 'nutricion@colegio.edu',
    password: 'nutri123',
    role: 'nutricion',
    status: 'Activo',
    assignedStages: [],
    lastLogin: '2024-09-06 09:30',
  },
  {
    id: '8',
    name: 'Trabajador Social',
    email: 'trabajosocial@colegio.edu',
    password: 'ts123',
    role: 'trabajo-social',
    status: 'Activo',
    assignedStages: [],
    lastLogin: '2024-09-05 14:00',
  },
];

const initialStudents: Student[] = [
  {
    id: 1, code: 'A001', name: 'Ana García López', firstName: 'Ana', lastName: 'García López',
    birthDate: '2018-05-14', admissionDate: '2024-03-01', gender: 'Femenino', school: 'Colegio EduGest',
    grade: '1ro', section: 'A', stage: 'Etapa I', status: 'Activo',
    familyCode: 'FAM-001', parentName: 'Carlos García', parentPhone: '+56 9 1111 1111',
    motherName: 'María López', motherPhone: '+56 9 2222 2222',
    contactPhone: '+56 9 1234 5678', contactEmail: 'ana.garcia@colegio.edu',
    phone: '+56 9 1234 5678', email: 'ana.garcia@colegio.edu',
    siblingCodes: ['A002'],
  },
  {
    id: 2, code: 'A002', name: 'Luis García López', firstName: 'Luis', lastName: 'García López',
    birthDate: '2017-09-22', admissionDate: '2023-03-01', gender: 'Masculino', school: 'Colegio EduGest',
    grade: '1ro', section: 'B', stage: 'Etapa I', status: 'Activo',
    familyCode: 'FAM-001', parentName: 'Carlos García', parentPhone: '+56 9 1111 1111',
    motherName: 'María López', motherPhone: '+56 9 2222 2222',
    contactPhone: '+56 9 2345 6789', contactEmail: 'luis.garcia@colegio.edu',
    phone: '+56 9 2345 6789', email: 'luis.garcia@colegio.edu',
    siblingCodes: ['A001'],
  },
  {
    id: 3, code: 'A003', name: 'Sofía Rodríguez Silva', firstName: 'Sofía', lastName: 'Rodríguez Silva',
    birthDate: '2016-03-08', admissionDate: '2023-03-01', gender: 'Femenino', school: 'Colegio EduGest',
    grade: '1ro', section: 'A', stage: 'Etapa I', status: 'Activo',
    familyCode: 'FAM-002', parentName: 'Pedro Rodríguez', parentPhone: '+56 9 3333 3333',
    motherName: 'Laura Silva', motherPhone: '+56 9 4444 4444',
    contactPhone: '+56 9 3456 7890', contactEmail: 'sofia.rodriguez@colegio.edu',
    phone: '+56 9 3456 7890', email: 'sofia.rodriguez@colegio.edu',
    siblingCodes: [],
  },
  {
    id: 4, code: 'A004', name: 'Diego Fernández Ruiz', firstName: 'Diego', lastName: 'Fernández Ruiz',
    birthDate: '2018-11-30', admissionDate: '2024-03-01', gender: 'Masculino', school: 'Colegio EduGest',
    grade: '1ro', section: 'C', stage: 'Etapa I', status: 'Activo',
    familyCode: 'FAM-003', parentName: 'Roberto Fernández', parentPhone: '+56 9 5555 5555',
    motherName: 'Carmen Ruiz', motherPhone: '+56 9 6666 6666',
    contactPhone: '+56 9 4567 8901', contactEmail: 'diego.fernandez@colegio.edu',
    phone: '+56 9 4567 8901', email: 'diego.fernandez@colegio.edu',
    siblingCodes: [],
  },
  {
    id: 5, code: 'A005', name: 'Valentina Gómez Díaz', firstName: 'Valentina', lastName: 'Gómez Díaz',
    birthDate: '2017-07-19', admissionDate: '2023-03-01', gender: 'Femenino', school: 'Colegio EduGest',
    grade: '1ro', section: 'A', stage: 'Etapa I', status: 'Activo',
    familyCode: 'FAM-004', parentName: 'Juan Gómez', parentPhone: '+56 9 7777 7777',
    motherName: 'Patricia Díaz', motherPhone: '+56 9 8888 8888',
    contactPhone: '+56 9 5678 9012', contactEmail: 'valentina.gomez@colegio.edu',
    phone: '+56 9 5678 9012', email: 'valentina.gomez@colegio.edu',
    siblingCodes: [],
  },
  {
    id: 6, code: 'B001', name: 'Pedro López Hernández', firstName: 'Pedro', lastName: 'López Hernández',
    birthDate: '2015-01-22', admissionDate: '2022-03-01', gender: 'Masculino', school: 'Colegio EduGest',
    grade: '2do', section: 'A', stage: 'Etapa II', status: 'Activo',
    familyCode: 'FAM-005', parentName: 'Miguel López', parentPhone: '+56 9 1234 1234',
    motherName: 'Ana Hernández', motherPhone: '+56 9 5678 5678',
    contactPhone: '+56 9 6789 0123', contactEmail: 'pedro.lopez@colegio.edu',
    phone: '+56 9 6789 0123', email: 'pedro.lopez@colegio.edu',
    siblingCodes: [],
  },
  {
    id: 7, code: 'B002', name: 'Lucía Méndez Torres', firstName: 'Lucía', lastName: 'Méndez Torres',
    birthDate: '2014-08-14', admissionDate: '2022-03-01', gender: 'Femenino', school: 'Colegio EduGest',
    grade: '2do', section: 'B', stage: 'Etapa II', status: 'Activo',
    familyCode: 'FAM-006', parentName: 'Fernando Méndez', parentPhone: '+56 9 2345 2345',
    motherName: 'Silvia Torres', motherPhone: '+56 9 6789 6789',
    contactPhone: '+56 9 7890 1234', contactEmail: 'lucia.mendez@colegio.edu',
    phone: '+56 9 7890 1234', email: 'lucia.mendez@colegio.edu',
    siblingCodes: [],
  },
  {
    id: 8, code: 'B003', name: 'Mateo Rojas Silva', firstName: 'Mateo', lastName: 'Rojas Silva',
    birthDate: '2015-12-05', admissionDate: '2022-03-01', gender: 'Masculino', school: 'Colegio EduGest',
    grade: '2do', section: 'C', stage: 'Etapa II', status: 'Activo',
    familyCode: 'FAM-007', parentName: 'Andrés Rojas', parentPhone: '+56 9 3456 3456',
    motherName: 'Mónica Silva', motherPhone: '+56 9 7890 7890',
    contactPhone: '+56 9 8901 2345', contactEmail: 'mateo.rojas@colegio.edu',
    phone: '+56 9 8901 2345', email: 'mateo.rojas@colegio.edu',
    siblingCodes: [],
  },
  {
    id: 9, code: 'C001', name: 'Camila Torres Vega', firstName: 'Camila', lastName: 'Torres Vega',
    birthDate: '2012-03-15', admissionDate: '2021-03-01', gender: 'Femenino', school: 'Colegio EduGest',
    grade: '3ro', section: 'A', stage: 'Etapa III', status: 'Activo',
    familyCode: 'FAM-008', parentName: 'Héctor Torres', parentPhone: '+56 9 4567 4567',
    motherName: 'Rosa Vega', motherPhone: '+56 9 8901 8901',
    contactPhone: '+56 9 1234 5678', contactEmail: 'camila.torres@colegio.edu',
    phone: '+56 9 1234 5678', email: 'camila.torres@colegio.edu',
    siblingCodes: [],
  },
  {
    id: 10, code: 'C002', name: 'Andrés Ramírez Castro', firstName: 'Andrés', lastName: 'Ramírez Castro',
    birthDate: '2012-07-22', admissionDate: '2021-03-01', gender: 'Masculino', school: 'Colegio EduGest',
    grade: '3ro', section: 'B', stage: 'Etapa III', status: 'Activo',
    familyCode: 'FAM-009', parentName: 'Julio Ramírez', parentPhone: '+56 9 5678 5678',
    motherName: 'Verónica Castro', motherPhone: '+56 9 9012 9012',
    contactPhone: '+56 9 2345 6789', contactEmail: 'andres.ramirez@colegio.edu',
    phone: '+56 9 2345 6789', email: 'andres.ramirez@colegio.edu',
    siblingCodes: [],
  },
  {
    id: 11, code: 'C003', name: 'Isabella Morales Ríos', firstName: 'Isabella', lastName: 'Morales Ríos',
    birthDate: '2012-11-08', admissionDate: '2021-03-01', gender: 'Femenino', school: 'Colegio EduGest',
    grade: '3ro', section: 'A', stage: 'Etapa III', status: 'Activo',
    familyCode: 'FAM-010', parentName: 'Ricardo Morales', parentPhone: '+56 9 6789 6789',
    motherName: 'Adriana Ríos', motherPhone: '+56 9 0123 0123',
    contactPhone: '+56 9 3456 7890', contactEmail: 'isabella.morales@colegio.edu',
    phone: '+56 9 3456 7890', email: 'isabella.morales@colegio.edu',
    siblingCodes: [],
  },
];

// === Funciones de almacenamiento ===

function getFromStorage<T>(key: string, defaultValue: T): T {
  try {
    const item = localStorage.getItem(key);
    if (item === null) return defaultValue;
    return JSON.parse(item) as T;
  } catch {
    return defaultValue;
  }
}

function setToStorage<T>(key: string, value: T): void {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (e) {
    console.error('Error guardando en localStorage:', e);
  }
}

// Inicializar datos si no existen
export function initializeData() {
  if (!localStorage.getItem(STORAGE_KEYS.USERS)) {
    setToStorage(STORAGE_KEYS.USERS, initialUsers);
  }
  if (!localStorage.getItem(STORAGE_KEYS.STUDENTS)) {
    setToStorage(STORAGE_KEYS.STUDENTS, initialStudents);
  }
  if (!localStorage.getItem(STORAGE_KEYS.FILES)) {
    setToStorage(STORAGE_KEYS.FILES, [] as StudentFile[]);
  }
  if (!localStorage.getItem(STORAGE_KEYS.HISTORY)) {
    setToStorage(STORAGE_KEYS.HISTORY, [] as HistoryEntry[]);
  }
  if (!localStorage.getItem(STORAGE_KEYS.OBSERVATIONS)) {
    setToStorage(STORAGE_KEYS.OBSERVATIONS, [] as Observation[]);
  }
}

// === USUARIOS ===

export function getUsers(): User[] {
  return getFromStorage<User[]>(STORAGE_KEYS.USERS, initialUsers);
}

export function saveUser(user: User): void {
  const users = getUsers();
  const index = users.findIndex(u => u.id === user.id);
  if (index >= 0) {
    users[index] = user;
  } else {
    users.push(user);
  }
  setToStorage(STORAGE_KEYS.USERS, users);
}

export function updateUser(user: User): void {
  saveUser(user);
}

export function deleteUser(userId: string): void {
  // No eliminamos permanentemente, solo deshabilitamos
  const users = getUsers();
  const user = users.find(u => u.id === userId);
  if (user) {
    user.status = 'Deshabilitado';
    setToStorage(STORAGE_KEYS.USERS, users);
  }
}

export function reactivateUser(userId: string): void {
  const users = getUsers();
  const user = users.find(u => u.id === userId);
  if (user) {
    user.status = 'Activo';
    setToStorage(STORAGE_KEYS.USERS, users);
  }
}

// === ALUMNOS ===

export function getStudents(): Student[] {
  return getFromStorage<Student[]>(STORAGE_KEYS.STUDENTS, initialStudents);
}

export function saveStudent(student: Student): void {
  const students = getStudents();
  const index = students.findIndex(s => s.id === student.id);
  if (index >= 0) {
    students[index] = student;
  } else {
    const newId = Math.max(...students.map(s => s.id), 0) + 1;
    student.id = newId;
    students.push(student);
  }
  setToStorage(STORAGE_KEYS.STUDENTS, students);
}

export function disableStudent(studentId: number): void {
  const students = getStudents();
  const student = students.find(s => s.id === studentId);
  if (student) {
    student.status = 'Deshabilitado';
    setToStorage(STORAGE_KEYS.STUDENTS, students);
  }
}

export function reactivateStudent(studentId: number): void {
  const students = getStudents();
  const student = students.find(s => s.id === studentId);
  if (student) {
    student.status = 'Activo';
    setToStorage(STORAGE_KEYS.STUDENTS, students);
  }
}

export function findSiblings(familyCode: string): Student[] {
  const students = getStudents();
  return students.filter(s => s.familyCode === familyCode);
}

// === ARCHIVOS ===

export function getFiles(): StudentFile[] {
  return getFromStorage<StudentFile[]>(STORAGE_KEYS.FILES, []);
}

export function getFilesByStudent(studentId: number): StudentFile[] {
  return getFiles().filter(f => f.studentId === studentId);
}

export function saveFile(file: StudentFile): void {
  const files = getFiles();
  files.push(file);
  setToStorage(STORAGE_KEYS.FILES, files);
}

export function deleteFile(fileId: string): void {
  const files = getFiles().filter(f => f.id !== fileId);
  setToStorage(STORAGE_KEYS.FILES, files);
}

// === HISTORIAL ===

export function getHistory(): HistoryEntry[] {
  return getFromStorage<HistoryEntry[]>(STORAGE_KEYS.HISTORY, []);
}

export function getHistoryByStudent(studentId: number): HistoryEntry[] {
  return getHistory().filter(h => h.studentId === studentId);
}

export function addHistoryEntry(entry: HistoryEntry): void {
  const history = getHistory();
  history.push(entry);
  setToStorage(STORAGE_KEYS.HISTORY, history);
}

// === OBSERVACIONES ===

export function getObservations(): Observation[] {
  return getFromStorage<Observation[]>(STORAGE_KEYS.OBSERVATIONS, []);
}

export function getObservationsByStudent(studentId: number): Observation[] {
  return getObservations().filter(o => o.studentId === studentId);
}

export function saveObservation(observation: Observation): void {
  const obs = getObservations();
  obs.push(observation);
  setToStorage(STORAGE_KEYS.OBSERVATIONS, obs);
}

// === SESIÓN ===

export function getCurrentUser(): User | null {
  try {
    const stored = localStorage.getItem(STORAGE_KEYS.CURRENT_USER);
    if (!stored) return null;
    return JSON.parse(stored) as User;
  } catch {
    return null;
  }
}

export function setCurrentUser(user: User | null): void {
  if (user) {
    localStorage.setItem(STORAGE_KEYS.CURRENT_USER, JSON.stringify(user));
  } else {
    localStorage.removeItem(STORAGE_KEYS.CURRENT_USER);
  }
}

// === PERMISOS ===

export function canAccessStage(user: User | null, stage: string): boolean {
  if (!user) return false;
  if (user.role === 'admin') return true;
  if (user.role.startsWith('maestra-')) {
    return user.assignedStages.includes(stage);
  }
  // Para otros roles, acceso según el área
  return true; // pedagogía, psicología, etc. pueden ver todas las etapas
}

export function canEditStudent(user: User | null, student: Student): boolean {
  if (!user) return false;
  if (user.status !== 'Activo') return false;
  if (user.role === 'admin') return true;
  if (user.role.startsWith('maestra-')) {
    return user.assignedStages.includes(student.stage);
  }
  return false; // Otros roles no editan alumnos directamente
}

export function canManageUsers(user: User | null): boolean {
  return user?.role === 'admin' && user.status === 'Activo';
}

export function canDisableStudent(user: User | null, student: Student): boolean {
  if (!user || user.status !== 'Activo') return false;
  if (user.role === 'admin') return true;
  if (user.role.startsWith('maestra-')) {
    return user.assignedStages.includes(student.stage);
  }
  return false;
}

export function canDeleteFile(user: User | null): boolean {
  if (!user || user.status !== 'Activo') return false;
  if (user.role === 'admin') return true;
  if (user.role.startsWith('maestra-')) return true;
  return false;
}