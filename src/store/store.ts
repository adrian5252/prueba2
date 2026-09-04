import { 
  Student, User, Observation, PsychologicalRecord, NutritionRecord, 
  SocialWorkRecord, ConductRecord, AcademicRecord, Document, HistoryEntry,
  defaultStudents, defaultUsers, generateId
} from './dataStore';

const STORAGE_KEYS = {
  STUDENTS: 'edugest-students',
  USERS: 'edugest-users',
  OBSERVATIONS: 'edugest-observations',
  PSYCHOLOGICAL: 'edugest-psychological',
  NUTRITION: 'edugest-nutrition',
  SOCIAL: 'edugest-social',
  CONDUCT: 'edugest-conduct',
  ACADEMIC: 'edugest-academic',
  DOCUMENTS: 'edugest-documents',
  HISTORY: 'edugest-history',
  AUTH_USER: 'edugest-user',
};

// Helper: Get from localStorage with fallback
function getFromStorage<T>(key: string, defaultValue: T): T {
  try {
    const stored = localStorage.getItem(key);
    if (stored) {
      return JSON.parse(stored);
    }
  } catch (e) {
    console.error(`Error reading ${key} from localStorage`, e);
  }
  return defaultValue;
}

// Helper: Save to localStorage
function saveToStorage<T>(key: string, value: T): void {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (e) {
    console.error(`Error saving ${key} to localStorage`, e);
  }
}

// Initialize defaults if not present
export const initializeStore = (): void => {
  if (!localStorage.getItem(STORAGE_KEYS.STUDENTS)) {
    saveToStorage(STORAGE_KEYS.STUDENTS, defaultStudents);
  }
  if (!localStorage.getItem(STORAGE_KEYS.USERS)) {
    saveToStorage(STORAGE_KEYS.USERS, defaultUsers);
  }
  if (!localStorage.getItem(STORAGE_KEYS.OBSERVATIONS)) {
    saveToStorage(STORAGE_KEYS.OBSERVATIONS, []);
  }
  if (!localStorage.getItem(STORAGE_KEYS.PSYCHOLOGICAL)) {
    saveToStorage(STORAGE_KEYS.PSYCHOLOGICAL, []);
  }
  if (!localStorage.getItem(STORAGE_KEYS.NUTRITION)) {
    saveToStorage(STORAGE_KEYS.NUTRITION, []);
  }
  if (!localStorage.getItem(STORAGE_KEYS.SOCIAL)) {
    saveToStorage(STORAGE_KEYS.SOCIAL, []);
  }
  if (!localStorage.getItem(STORAGE_KEYS.CONDUCT)) {
    saveToStorage(STORAGE_KEYS.CONDUCT, []);
  }
  if (!localStorage.getItem(STORAGE_KEYS.ACADEMIC)) {
    saveToStorage(STORAGE_KEYS.ACADEMIC, []);
  }
  if (!localStorage.getItem(STORAGE_KEYS.DOCUMENTS)) {
    saveToStorage(STORAGE_KEYS.DOCUMENTS, []);
  }
  if (!localStorage.getItem(STORAGE_KEYS.HISTORY)) {
    saveToStorage(STORAGE_KEYS.HISTORY, []);
  }
};

// === STUDENTS ===
export const getStudents = (): Student[] => getFromStorage(STORAGE_KEYS.STUDENTS, defaultStudents);

export const getStudentById = (id: string): Student | undefined => {
  return getStudents().find(s => s.id === id);
};

export const getStudentByCode = (code: string): Student | undefined => {
  return getStudents().find(s => s.code === code);
};

export const saveStudent = (student: Student): void => {
  const students = getStudents();
  const existing = students.findIndex(s => s.id === student.id);
  if (existing >= 0) {
    students[existing] = student;
  } else {
    students.push(student);
  }
  saveToStorage(STORAGE_KEYS.STUDENTS, students);
};

export const updateStudent = (id: string, updates: Partial<Student>, currentUserId: string): Student | undefined => {
  const students = getStudents();
  const idx = students.findIndex(s => s.id === id);
  if (idx === -1) return undefined;
  students[idx] = {
    ...students[idx],
    ...updates,
    updatedAt: new Date().toISOString(),
    updatedBy: currentUserId,
  };
  saveToStorage(STORAGE_KEYS.STUDENTS, students);
  return students[idx];
};

export const createStudent = (student: Omit<Student, 'id' | 'createdAt' | 'createdBy'>, currentUserId: string): Student => {
  const newStudent: Student = {
    ...student,
    id: generateId(),
    createdAt: new Date().toISOString(),
    createdBy: currentUserId,
  };
  const students = getStudents();
  students.push(newStudent);
  saveToStorage(STORAGE_KEYS.STUDENTS, students);
  return newStudent;
};

// === USERS ===
export const getUsers = (): User[] => getFromStorage(STORAGE_KEYS.USERS, defaultUsers);

export const getUserById = (id: string): User | undefined => {
  return getUsers().find(u => u.id === id);
};

export const getUserByEmail = (email: string): User | undefined => {
  return getUsers().find(u => u.email.toLowerCase() === email.toLowerCase());
};

export const saveUser = (user: User): void => {
  const users = getUsers();
  const existing = users.findIndex(u => u.id === user.id);
  if (existing >= 0) {
    users[existing] = user;
  } else {
    users.push(user);
  }
  saveToStorage(STORAGE_KEYS.USERS, users);
};

export const createUser = (user: Omit<User, 'id' | 'createdAt'>): User => {
  const newUser: User = {
    ...user,
    id: generateId(),
    createdAt: new Date().toISOString(),
  };
  const users = getUsers();
  users.push(newUser);
  saveToStorage(STORAGE_KEYS.USERS, users);
  return newUser;
};

export const updateUser = (id: string, updates: Partial<User>): User | undefined => {
  const users = getUsers();
  const idx = users.findIndex(u => u.id === id);
  if (idx === -1) return undefined;
  users[idx] = { ...users[idx], ...updates };
  saveToStorage(STORAGE_KEYS.USERS, users);
  return users[idx];
};

// === OBSERVATIONS ===
export const getObservations = (): Observation[] => getFromStorage(STORAGE_KEYS.OBSERVATIONS, []);
export const getObservationsByStudent = (studentId: string): Observation[] => {
  return getObservations().filter(o => o.studentId === studentId);
};
export const saveObservation = (obs: Omit<Observation, 'id' | 'createdAt'>, currentUserId: string, currentUserName: string): Observation => {
  const newObs: Observation = {
    ...obs,
    id: generateId(),
    createdAt: new Date().toISOString(),
    createdBy: currentUserId,
  };
  const list = getObservations();
  list.push(newObs);
  saveToStorage(STORAGE_KEYS.OBSERVATIONS, list);
  // Add to history
  addHistoryEntry({
    studentId: obs.studentId,
    date: obs.date,
    area: 'Oratorio',
    description: obs.observation.substring(0, 50),
    user: currentUserName,
  });
  return newObs;
};

// === PSYCHOLOGICAL ===
export const getPsychological = (): PsychologicalRecord[] => getFromStorage(STORAGE_KEYS.PSYCHOLOGICAL, []);
export const getPsychologicalByStudent = (studentId: string): PsychologicalRecord[] => {
  return getPsychological().filter(p => p.studentId === studentId);
};
export const savePsychological = (rec: Omit<PsychologicalRecord, 'id' | 'createdAt'>, currentUserId: string, currentUserName: string): PsychologicalRecord => {
  const newRec: PsychologicalRecord = {
    ...rec,
    id: generateId(),
    createdAt: new Date().toISOString(),
    createdBy: currentUserId,
  };
  const list = getPsychological();
  list.push(newRec);
  saveToStorage(STORAGE_KEYS.PSYCHOLOGICAL, list);
  addHistoryEntry({
    studentId: rec.studentId,
    date: rec.date,
    area: 'Psicología',
    description: `${rec.type}: ${rec.description.substring(0, 30)}`,
    user: currentUserName,
  });
  return newRec;
};

// === NUTRITION ===
export const getNutrition = (): NutritionRecord[] => getFromStorage(STORAGE_KEYS.NUTRITION, []);
export const getNutritionByStudent = (studentId: string): NutritionRecord[] => {
  return getNutrition().filter(n => n.studentId === studentId);
};
export const saveNutrition = (rec: Omit<NutritionRecord, 'id' | 'createdAt'>, currentUserId: string, currentUserName: string): NutritionRecord => {
  const newRec: NutritionRecord = {
    ...rec,
    id: generateId(),
    createdAt: new Date().toISOString(),
    createdBy: currentUserId,
  };
  const list = getNutrition();
  list.push(newRec);
  saveToStorage(STORAGE_KEYS.NUTRITION, list);
  addHistoryEntry({
    studentId: rec.studentId,
    date: rec.date,
    area: 'Nutrición',
    description: 'Plan nutricional registrado',
    user: currentUserName,
  });
  return newRec;
};

// === SOCIAL ===
export const getSocial = (): SocialWorkRecord[] => getFromStorage(STORAGE_KEYS.SOCIAL, []);
export const getSocialByStudent = (studentId: string): SocialWorkRecord[] => {
  return getSocial().filter(s => s.studentId === studentId);
};
export const saveSocial = (rec: Omit<SocialWorkRecord, 'id' | 'createdAt'>, currentUserId: string, currentUserName: string): SocialWorkRecord => {
  const newRec: SocialWorkRecord = {
    ...rec,
    id: generateId(),
    createdAt: new Date().toISOString(),
    createdBy: currentUserId,
  };
  const list = getSocial();
  list.push(newRec);
  saveToStorage(STORAGE_KEYS.SOCIAL, list);
  addHistoryEntry({
    studentId: rec.studentId,
    date: rec.date,
    area: 'Trabajo Social',
    description: `${rec.type}: ${rec.description.substring(0, 30)}`,
    user: currentUserName,
  });
  return newRec;
};

// === CONDUCT ===
export const getConduct = (): ConductRecord[] => getFromStorage(STORAGE_KEYS.CONDUCT, []);
export const getConductByStudent = (studentId: string): ConductRecord[] => {
  return getConduct().filter(c => c.studentId === studentId);
};
export const saveConduct = (rec: Omit<ConductRecord, 'id' | 'createdAt'>, currentUserId: string, currentUserName: string): ConductRecord => {
  const newRec: ConductRecord = {
    ...rec,
    id: generateId(),
    createdAt: new Date().toISOString(),
    createdBy: currentUserId,
  };
  const list = getConduct();
  list.push(newRec);
  saveToStorage(STORAGE_KEYS.CONDUCT, list);
  addHistoryEntry({
    studentId: rec.studentId,
    date: rec.date,
    area: 'Conducta',
    description: rec.description.substring(0, 50),
    user: currentUserName,
  });
  return newRec;
};

// === ACADEMIC ===
export const getAcademic = (): AcademicRecord[] => getFromStorage(STORAGE_KEYS.ACADEMIC, []);
export const getAcademicByStudent = (studentId: string): AcademicRecord[] => {
  return getAcademic().filter(a => a.studentId === studentId);
};
export const saveAcademic = (rec: Omit<AcademicRecord, 'id' | 'createdAt'>, currentUserId: string): AcademicRecord => {
  const newRec: AcademicRecord = {
    ...rec,
    id: generateId(),
    createdAt: new Date().toISOString(),
    createdBy: currentUserId,
  };
  const list = getAcademic();
  list.push(newRec);
  saveToStorage(STORAGE_KEYS.ACADEMIC, list);
  return newRec;
};

// === DOCUMENTS ===
export const getDocuments = (): Document[] => getFromStorage(STORAGE_KEYS.DOCUMENTS, []);
export const getDocumentsByStudent = (studentId: string): Document[] => {
  return getDocuments().filter(d => d.studentId === studentId);
};
export const saveDocument = (doc: Omit<Document, 'id' | 'uploadedAt'>): Document => {
  const newDoc: Document = {
    ...doc,
    id: generateId(),
    uploadedAt: new Date().toISOString(),
  };
  const list = getDocuments();
  list.push(newDoc);
  saveToStorage(STORAGE_KEYS.DOCUMENTS, list);
  return newDoc;
};
export const deleteDocument = (id: string): void => {
  const list = getDocuments().filter(d => d.id !== id);
  saveToStorage(STORAGE_KEYS.DOCUMENTS, list);
};

// === HISTORY ===
export const getHistory = (): HistoryEntry[] => getFromStorage(STORAGE_KEYS.HISTORY, []);
export const getHistoryByStudent = (studentId: string): HistoryEntry[] => {
  return getHistory()
    .filter(h => h.studentId === studentId)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
};
export const addHistoryEntry = (entry: Omit<HistoryEntry, 'id' | 'createdAt'>): HistoryEntry => {
  const newEntry: HistoryEntry = {
    ...entry,
    id: generateId(),
    createdAt: new Date().toISOString(),
  };
  const list = getHistory();
  list.push(newEntry);
  saveToStorage(STORAGE_KEYS.HISTORY, list);
  return newEntry;
};

// === SIBLINGS ===
export const getSiblings = (studentId: string): Student[] => {
  const student = getStudentById(studentId);
  if (!student || !student.familyCode) return [];
  return getStudents().filter(s => s.familyCode === student.familyCode && s.id !== studentId);
};

// === RESET (for development) ===
export const resetStore = (): void => {
  Object.values(STORAGE_KEYS).forEach(k => localStorage.removeItem(k));
  initializeStore();
};
