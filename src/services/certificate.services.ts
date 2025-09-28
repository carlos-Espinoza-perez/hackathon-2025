import PDFDocument from "pdfkit";
import { Octokit } from "@octokit/rest";
import supabase from "../config/supabaseClient.js";
import { getUserLogin } from "../utils/general.util.js";

// Interfaces
interface IStudentData {
  studentName: string;
  courseName: string;
  courseDescription?: string;
  completionDate: string;
  duration?: string;
  instructors?: string[];
  grade?: string;
  specialMention?: string;
}

interface ICertificateResult {
  success: boolean | null;
  filePath: string;
  fileName: string;
}

interface IBulkResult {
  success: boolean;
  studentName?: string;
  error?: string;
  filePath?: string;
  fileName?: string;
}

interface IColors {
  primary: string;
  secondary: string;
  dark: string;
  accent: string;
  white: string;
  black: string;
  gray: string;
}

class CertificateGen {
  private colores: IColors;

  constructor() {
    this.colores = {
      primary: "#A855F7",  // Color principal (morado)
      secondary: "#2D1B69",
      dark: "#0B1739",
      accent: "#1DE9B6",   // Verde-acento
      white: "#FFFFFF",
      black: "#000000",
      gray: "#6B7280",     // Gris para textos secundarios
    };
  }
  generateCertificate = async (studentData: IStudentData): Promise<ICertificateResult> => {
    return new Promise<ICertificateResult>((resolve, reject) => {
      try {
        // 1️⃣ Crear documento PDF
        const doc = new PDFDocument({
          size: "A4",
          layout: "landscape",
          margins: { top: 50, bottom: 50, left: 50, right: 50 },
        });

        const buffers: Buffer[] = [];
        doc.on("data", (chunk) => buffers.push(chunk));

        // 2️⃣ Configurar GitHub
        const octokit = new Octokit({ auth: process.env.GITHUB_TOKEN });
        const owner = "carlos-Espinoza-perez";
        const repo = "files-hackathon-2025";
        const branch = "main";

        const safeName = studentData.studentName.replace(/[^a-z0-9_\-]/gi, "_");
        const fileName = `certificado_${safeName}_${Date.now()}.pdf`;
        const repoPath = `certificados/${fileName}`;
        const fileUrl = `https://github.com/${owner}/${repo}/raw/${branch}/${repoPath}`;

        // 3️⃣ Cuando el documento termine, subimos a GitHub
        doc.on("end", async () => {
          try {
            const pdfBuffer = Buffer.concat(buffers);

            await octokit.repos.createOrUpdateFileContents({
              owner,
              repo,
              branch,
              path: repoPath,
              message: `add: certificado para ${studentData.studentName}`,
              content: pdfBuffer.toString("base64"),
            });

            resolve({
              success: true,
              filePath: fileUrl,
              fileName,
            });
          } catch (err) {
            reject({
              success: false,
              error: err instanceof Error ? err.message : err,
              fileName,
            });
          }
        });

        // 4️⃣ Dibujamos el contenido
        this.createBackground(doc);
        this.createHeader(doc);
        this.createMainContent(doc, studentData);
        this.createFooter(doc, studentData);

        // 5️⃣ Cerramos el documento (dispara el evento "end")
        doc.end();

      } catch (error) {
        reject({
          success: false,
          error: error instanceof Error ? error.message : error,
        });
      }
    });
  };

  createBackground = (doc: PDFKit.PDFDocument): void => {
    const w = doc.page.width;
    const h = doc.page.height;
    doc.save(); // guarda el estado actual

    // 🔑 Esto llena TODO el fondo del documento
    // Si usas colores con alpha (ej: 0.1) puede afectar la forma en que se ven los textos.
    // Para evitar "lavado de color" en el texto, usa opacidad en elementos decorativos,
    // pero deja el rect principal opaco.
    // doc.rect(0, 0, w, h).fill("#1a1a2e");

    // 🔑 Círculos decorativos

    doc.opacity(0.1) // 🔑 controla opacidad de todo lo que dibujes después
      .circle(100, 100, 80)
      .fillColor(this.colores.primary)
      .fill();

    doc.opacity(0.1)
      .circle(w - 100, h - 100, 60)
      .fillColor(this.colores.accent)
      .fill();


    // 🔑 Líneas decorativas
    // Aquí las líneas están al mismo "nivel" que el fondo.
    // Si quieres que estén por detrás de TODO, está bien que se queden aquí.
    // Si las quieres por delante del fondo pero detrás del texto, dibújalas DESPUÉS de crear el fondo pero ANTES del texto.
    // doc.moveTo(0, h * 0.15)
    //   .lineTo(w, h * 0.15)
    //   .strokeColor(this.colores.primary)
    //   .lineWidth(2)
    //   .stroke();

    // doc.moveTo(0, h * 0.85)
    //   .lineTo(w, h * 0.85)
    //   .strokeColor(this.colores.accent)
    //   .lineWidth(2)
    //   .stroke();
    
    doc.restore(); // vuelve al estado original (opacidad 100%)
  };



  createHeader = async (doc: PDFKit.PDFDocument): Promise<void> => {
    const centerX = doc.page.width / 2;
    const startY = 80;

    doc.circle(centerX - 100, startY + 30, 25)
      .fillColor(this.colores.accent)
      .fill();

      
    // const imageUrl = "https://github.com/carlos-Espinoza-perez/certificate-hackathon-2025/raw/main/logo.png";
    // const response = await axios({
    //   url: imageUrl,
    //   method: 'GET',
    //   responseType: 'arraybuffer'
    // });

    // const buffer = Buffer.from(response.data);
    // doc.image(buffer, centerX - 120, startY + 12, {
    //   width: 40,
    //   align: "center",
    // })
    doc.fontSize(20).fillColor(this.colores.dark).text("{ }", centerX - 110, startY + 20, {
      width: 20,
      align: "center",
    });

    doc.fontSize(28)
      .fillColor(this.colores.black)
      .font("Helvetica-Bold")
      .text("SUID ACADEMY", centerX - 50, startY + 10, { width: 240 });

    doc.fontSize(12)
      .fillColor(this.colores.gray)
      .font("Helvetica")
      .text("Academia de Ciberseguridad y Hacking Ético", centerX - 50, startY + 45, { width: 300 });
  };

  createMainContent = (doc: PDFKit.PDFDocument, data: IStudentData): void => {
    const centerX = doc.page.width / 2;
    const startY = 200;

    doc.fontSize(18)
      .fillColor(this.colores.gray)
      .font("Helvetica")
      .text("Certifican a", 0, startY, { width: doc.page.width, align: "center" });

    doc.fontSize(36)
      .fillColor(this.colores.primary)
      .font("Helvetica-Bold")
      .text(data.studentName.toUpperCase(), 0, startY + 40, { width: doc.page.width, align: "center" });

    doc.moveTo(centerX - 150, startY + 85)
      .lineTo(centerX + 150, startY + 85)
      .strokeColor(this.colores.accent)
      .lineWidth(2)
      .stroke();

    doc.fontSize(16)
      .fillColor(this.colores.black)
      .font("Helvetica")
      .text("Por participar y aprobar el", 0, startY + 110, { width: doc.page.width, align: "center" });

    doc.fontSize(32)
      .fillColor(this.colores.black)
      .font("Helvetica-Bold")
      .text(`CURSO DE ${data.courseName.toUpperCase()}`, 0, startY + 140, { width: doc.page.width, align: "center" });

    if (data.courseDescription) {
      doc.fontSize(14)
        .fillColor(this.colores.gray)
        .text(data.courseDescription, 0, startY + 190, { width: doc.page.width, align: "center" });
    }

    if (data.specialMention) {
      doc.fontSize(16)
        .fillColor(this.colores.accent)
        .font("Helvetica-Bold")
        .text(data.specialMention, 0, startY + 220, { width: doc.page.width, align: "center" });
    }

    const fecha = new Date(data.completionDate);
    if (!isNaN(fecha.getTime())) {
      const fechaStr = fecha.toLocaleDateString("es-ES", { year: "numeric", month: "long", day: "numeric" });

      doc.fontSize(14)
        .fillColor(this.colores.gray)
        .text(`Completado el ${fechaStr}`, 0, startY + 250, { width: doc.page.width, align: "center" });
    }

    if (data.duration) {
      doc.fontSize(12)
        .fillColor(this.colores.gray)
        .text(`Duración: ${data.duration}`, 0, startY + 275, { width: doc.page.width, align: "center" });
    }
  };

  createFooter = (doc: PDFKit.PDFDocument, data: IStudentData): void => {
    // const centerX = doc.page.width / 2;
    // const footerY = doc.page.height - 150;

    // const signY = footerY + 40;

    // doc.moveTo(centerX - 250, signY)
    //   .lineTo(centerX - 100, signY)
    //   .strokeColor(this.colores.gray)
    //   .stroke();

    // doc.moveTo(centerX + 100, signY)
    //   .lineTo(centerX + 250, signY)
    //   .strokeColor(this.colores.gray)
    //   .stroke();

    // doc.fontSize(12)
    //   .fillColor(this.colores.black)
    //   .font("Helvetica-Bold")
    //   .text("Christian Van Der Henst S", centerX - 250, signY + 10, { width: 150, align: "center" })
    //   .text("John Freddy Vega", centerX + 100, signY + 10, { width: 150, align: "center" });

    // doc.fontSize(10)
    //   .fillColor(this.colores.gray)
    //   .text("CTO DE SUID ACADEMY", centerX - 250, signY + 25, { width: 150, align: "center" })
    //   .text("CEO DE SUID ACADEMY", centerX + 100, signY + 25, { width: 150, align: "center" });

    // const certId = this.genCertId();

    // doc.fontSize(10)
    //   .fillColor(this.colores.accent)
    //   .text(`Certificación ID: ${certId}`, 0, footerY + 80, { width: doc.page.width, align: "center" });

    // doc.fontSize(10)
    //   .fillColor(this.colores.gray)
    //   .text("Verificar en: suidacademy.com/verify", 0, footerY + 95, { width: doc.page.width, align: "center" });
  };

  genCertId = (): string => {
    const t = Date.now().toString(36);
    const r = Math.random().toString(36).substr(2, 5);
    return `SUID-${t}-${r}`.toUpperCase();
  };
}

// Funciones de uso
export const createCertificate = async (cursoId: string): Promise<ICertificateResult> => {
  const generator = new CertificateGen();
  const curso = await supabase
    .from('Curso')
    .select('*')
    .eq('Id', cursoId)
    .single();
  
  const listSesionCurso = await supabase
    .from('SesionCurso')
    .select('*')
    .eq('CursoId', cursoId)
  
  const sum = Array.from(listSesionCurso.data as any).map((a: any) => a.DuracionLectura).reduce((a, b) => a + b, 0) / 60;
  const user = await getUserLogin();

  const defaultData: IStudentData = {
    studentName: user.Nombre || "",
    courseName: curso.data.Nombre || "",
    completionDate: new Date().toISOString(),
    duration: "" + sum.toFixed(2) + " horas académicas",
  };

  const studentData = { ...defaultData,  };
  return await generator.generateCertificate(studentData);
};

export const generateBulkCertificates = async (students: IStudentData[]): Promise<IBulkResult[]> => {
  const generator = new CertificateGen();
  const results: IBulkResult[] = [];

  for (const alumno of students) {
    try {
      const result = await generator.generateCertificate(alumno);
      results.push({ success: true, studentName: alumno.studentName, filePath: result.filePath, fileName: result.fileName });
    } catch (err) {
      results.push({ success: false, studentName: alumno.studentName, error: err instanceof Error ? err.message : "Error desconocido" });
    }
  }

  return results;
};

export { CertificateGen };
export type { IStudentData, ICertificateResult, IBulkResult };
