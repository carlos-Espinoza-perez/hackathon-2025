-- CreateEnum
CREATE TYPE "public"."EnumDificultad" AS ENUM ('Novato', 'Intermedio', 'Avanzado');

-- CreateEnum
CREATE TYPE "public"."EnumTipoAcademia" AS ENUM ('Academia', 'Laboratorio');

-- CreateTable
CREATE TABLE "public"."Usuario" (
    "id" TEXT NOT NULL,
    "nombre" TEXT NOT NULL,
    "correo" TEXT NOT NULL,
    "avatar" TEXT,
    "contrasena" TEXT NOT NULL,
    "estado" BOOLEAN NOT NULL DEFAULT true,
    "fechaRegistro" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Usuario_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Academia" (
    "id" TEXT NOT NULL,
    "nombre" TEXT NOT NULL,
    "descripcion" TEXT NOT NULL,
    "avatar" TEXT,
    "tipoAcademia" "public"."EnumTipoAcademia" NOT NULL,
    "dificultad" "public"."EnumDificultad" NOT NULL,
    "estado" BOOLEAN NOT NULL DEFAULT true,
    "fechaRegistro" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Academia_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Curso" (
    "id" TEXT NOT NULL,
    "nombre" TEXT NOT NULL,
    "descripcion" TEXT NOT NULL,
    "avatar" TEXT,
    "videoUrl" TEXT,
    "academiaId" TEXT NOT NULL,
    "dificultad" "public"."EnumDificultad" NOT NULL,
    "estado" BOOLEAN NOT NULL DEFAULT true,
    "fechaRegistro" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Curso_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."SesionCurso" (
    "id" TEXT NOT NULL,
    "nombre" TEXT NOT NULL,
    "descripcion" TEXT NOT NULL,
    "avatar" TEXT,
    "videoUrl" TEXT,
    "lecturaUrl" TEXT,
    "cursoId" TEXT NOT NULL,
    "estado" BOOLEAN NOT NULL DEFAULT true,
    "fechaRegistro" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "SesionCurso_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."MaterialSesionCurso" (
    "id" TEXT NOT NULL,
    "identificadorManual" TEXT,
    "nombre" TEXT NOT NULL,
    "descripcion" TEXT,
    "avatar" TEXT,
    "archivoUrl" TEXT,
    "instruccion" TEXT,
    "estado" BOOLEAN NOT NULL DEFAULT true,
    "fechaRegistro" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "sesionCursoId" TEXT NOT NULL,

    CONSTRAINT "MaterialSesionCurso_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."InscripcionUsuario" (
    "id" TEXT NOT NULL,
    "usuarioId" TEXT NOT NULL,
    "cursoId" TEXT,
    "sesionCursoId" TEXT,
    "materialSesionCursoId" TEXT,
    "avance" DECIMAL(10,2),
    "estado" BOOLEAN NOT NULL DEFAULT true,
    "fechaRegistro" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "InscripcionUsuario_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Usuario_correo_key" ON "public"."Usuario"("correo");

-- AddForeignKey
ALTER TABLE "public"."Curso" ADD CONSTRAINT "Curso_academiaId_fkey" FOREIGN KEY ("academiaId") REFERENCES "public"."Academia"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."SesionCurso" ADD CONSTRAINT "SesionCurso_cursoId_fkey" FOREIGN KEY ("cursoId") REFERENCES "public"."Curso"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."MaterialSesionCurso" ADD CONSTRAINT "MaterialSesionCurso_sesionCursoId_fkey" FOREIGN KEY ("sesionCursoId") REFERENCES "public"."SesionCurso"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."InscripcionUsuario" ADD CONSTRAINT "InscripcionUsuario_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "public"."Usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."InscripcionUsuario" ADD CONSTRAINT "InscripcionUsuario_cursoId_fkey" FOREIGN KEY ("cursoId") REFERENCES "public"."Curso"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."InscripcionUsuario" ADD CONSTRAINT "InscripcionUsuario_sesionCursoId_fkey" FOREIGN KEY ("sesionCursoId") REFERENCES "public"."SesionCurso"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."InscripcionUsuario" ADD CONSTRAINT "InscripcionUsuario_materialSesionCursoId_fkey" FOREIGN KEY ("materialSesionCursoId") REFERENCES "public"."MaterialSesionCurso"("id") ON DELETE SET NULL ON UPDATE CASCADE;
