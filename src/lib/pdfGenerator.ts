// Generador de PDF usando la API de impresión del navegador
// Optimizado para tamaño A4

import { Student, HistoryEntry, Observation } from './dataStore';

export interface PDFReportOptions {
  title: string;
  student?: Student;
  sectionTitle?: string;
  data: Array<Record<string, string>>;
  columns: Array<{ header: string; key: string }>;
}

export function generatePDF(options: PDFReportOptions): void {
  const { title, student, sectionTitle, data, columns } = options;

  // Crear ventana nueva con el contenido del PDF
  const printWindow = window.open('', '_blank', 'width=900,height=700');
  if (!printWindow) {
    alert('Por favor permita ventanas emergentes para generar el PDF');
    return;
  }

  const html = generatePDFHTML(title, student, sectionTitle, data, columns);
  printWindow.document.write(html);
  printWindow.document.close();

  // Esperar a que cargue y abrir el diálogo de impresión
  setTimeout(() => {
    printWindow.print();
  }, 250);
}

function generatePDFHTML(
  title: string,
  student: Student | undefined,
  sectionTitle: string | undefined,
  data: Array<Record<string, string>>,
  columns: Array<{ header: string; key: string }>
): string {
  const date = new Date().toLocaleString('es-CL');
  const institution = 'Colegio EduGest - Sistema de Gestión Escolar';

  const tableRows = data
    .map(
      (row) =>
        `<tr>${columns
          .map((col) => `<td>${escapeHTML(row[col.key] || '')}</td>`)
          .join('')}</tr>`
    )
    .join('');

  const studentInfo = student
    ? `
    <div class="student-info">
      <h3>Datos del Alumno</h3>
      <div class="info-grid">
        <div><strong>Código:</strong> ${escapeHTML(student.code)}</div>
        <div><strong>Nombre:</strong> ${escapeHTML(student.name)}</div>
        <div><strong>Grado:</strong> ${escapeHTML(student.grade)} ${escapeHTML(student.section)}</div>
        <div><strong>Etapa:</strong> ${escapeHTML(student.stage)}</div>
        <div><strong>Colegio:</strong> ${escapeHTML(student.school)}</div>
        <div><strong>Estado:</strong> ${escapeHTML(student.status)}</div>
      </div>
    </div>
  `
    : '';

  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <title>${escapeHTML(title)}</title>
      <style>
        * { box-sizing: border-box; }
        @page { size: A4; margin: 1.5cm; }
        body {
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
          color: #1f2937;
          line-height: 1.5;
          max-width: 100%;
          margin: 0;
          padding: 0;
        }
        .header {
          border-bottom: 3px solid #003366;
          padding-bottom: 12px;
          margin-bottom: 20px;
        }
        .institution {
          font-size: 11pt;
          color: #6b7280;
          margin-bottom: 4px;
        }
        h1 {
          color: #003366;
          margin: 8px 0 4px;
          font-size: 18pt;
        }
        .section-title {
          color: #374151;
          font-size: 12pt;
          margin-top: 0;
        }
        .date {
          font-size: 9pt;
          color: #6b7280;
          text-align: right;
        }
        .student-info {
          background: #f3f4f6;
          border: 1px solid #e5e7eb;
          border-radius: 6px;
          padding: 12px;
          margin-bottom: 20px;
        }
        .student-info h3 {
          color: #003366;
          margin: 0 0 8px;
          font-size: 12pt;
        }
        .info-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 6px;
          font-size: 10pt;
        }
        table {
          width: 100%;
          border-collapse: collapse;
          margin-top: 8px;
          font-size: 10pt;
        }
        th {
          background: #003366;
          color: white;
          padding: 8px;
          text-align: left;
          font-weight: 600;
        }
        td {
          padding: 8px;
          border-bottom: 1px solid #e5e7eb;
        }
        tr:nth-child(even) { background: #f9fafb; }
        .footer {
          margin-top: 30px;
          padding-top: 12px;
          border-top: 1px solid #e5e7eb;
          font-size: 9pt;
          color: #6b7280;
          text-align: center;
        }
        @media print {
          .no-print { display: none; }
          body { print-color-adjust: exact; -webkit-print-color-adjust: exact; }
        }
        .no-print {
          text-align: center;
          margin: 20px;
        }
        .btn {
          background: #003366;
          color: white;
          border: none;
          padding: 8px 16px;
          border-radius: 4px;
          cursor: pointer;
          margin: 0 4px;
          font-size: 11pt;
        }
        .btn.secondary { background: #6b7280; }
      </style>
    </head>
    <body>
      <div class="no-print">
        <button class="btn" onclick="window.print()">Imprimir / Guardar PDF</button>
        <button class="btn secondary" onclick="window.close()">Cerrar</button>
      </div>
      <div class="header">
        <div class="institution">${escapeHTML(institution)}</div>
        <div class="date">Fecha de generación: ${date}</div>
        <h1>${escapeHTML(title)}</h1>
        ${sectionTitle ? `<p class="section-title">${escapeHTML(sectionTitle)}</p>` : ''}
      </div>
      ${studentInfo}
      <table>
        <thead>
          <tr>${columns.map(c => `<th>${escapeHTML(c.header)}</th>`).join('')}</tr>
        </thead>
        <tbody>
          ${tableRows}
        </tbody>
      </table>
      <div class="footer">
        EduGest © ${new Date().getFullYear()} - Documento generado automáticamente
      </div>
    </body>
    </html>
  `;
}

function escapeHTML(text: string): string {
  return String(text)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

// Helpers para datos comunes
export function studentToTableData(students: Student[]) {
  return students.map((s) => ({
    codigo: s.code,
    nombre: s.name,
    grado: `${s.grade} ${s.section}`,
    etapa: s.stage,
    estado: s.status,
  }));
}

export function historyToTableData(history: HistoryEntry[]) {
  return history.map((h) => ({
    fecha: h.date,
    area: h.area,
    descripcion: h.description,
    usuario: h.user,
  }));
}

export function observationToTableData(obs: Observation[]) {
  return obs.map((o) => ({
    fecha: o.date,
    area: o.area,
    alumno: o.studentName,
    observacion: o.observation,
    responsable: o.responsible,
  }));
}