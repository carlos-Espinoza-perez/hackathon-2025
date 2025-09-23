/*
  Warnings:

  - The primary key for the `Academia` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `avatar` on the `Academia` table. All the data in the column will be lost.
  - You are about to drop the column `descripcion` on the `Academia` table. All the data in the column will be lost.
  - You are about to drop the column `dificultad` on the `Academia` table. All the data in the column will be lost.
  - You are about to drop the column `estado` on the `Academia` table. All the data in the column will be lost.
  - You are about to drop the column `fechaRegistro` on the `Academia` table. All the data in the column will be lost.
  - You are about to drop the column `id` on the `Academia` table. All the data in the column will be lost.
  - You are about to drop the column `nombre` on the `Academia` table. All the data in the column will be lost.
  - You are about to drop the column `tipoAcademia` on the `Academia` table. All the data in the column will be lost.
  - The primary key for the `Curso` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `academiaId` on the `Curso` table. All the data in the column will be lost.
  - You are about to drop the column `avatar` on the `Curso` table. All the data in the column will be lost.
  - You are about to drop the column `descripcion` on the `Curso` table. All the data in the column will be lost.
  - You are about to drop the column `dificultad` on the `Curso` table. All the data in the column will be lost.
  - You are about to drop the column `estado` on the `Curso` table. All the data in the column will be lost.
  - You are about to drop the column `fechaRegistro` on the `Curso` table. All the data in the column will be lost.
  - You are about to drop the column `id` on the `Curso` table. All the data in the column will be lost.
  - You are about to drop the column `nombre` on the `Curso` table. All the data in the column will be lost.
  - You are about to drop the column `videoUrl` on the `Curso` table. All the data in the column will be lost.
  - The primary key for the `InscripcionUsuario` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `avance` on the `InscripcionUsuario` table. All the data in the column will be lost.
  - You are about to drop the column `cursoId` on the `InscripcionUsuario` table. All the data in the column will be lost.
  - You are about to drop the column `estado` on the `InscripcionUsuario` table. All the data in the column will be lost.
  - You are about to drop the column `fechaRegistro` on the `InscripcionUsuario` table. All the data in the column will be lost.
  - You are about to drop the column `id` on the `InscripcionUsuario` table. All the data in the column will be lost.
  - You are about to drop the column `materialSesionCursoId` on the `InscripcionUsuario` table. All the data in the column will be lost.
  - You are about to drop the column `sesionCursoId` on the `InscripcionUsuario` table. All the data in the column will be lost.
  - You are about to drop the column `usuarioId` on the `InscripcionUsuario` table. All the data in the column will be lost.
  - The primary key for the `MaterialSesionCurso` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `archivoUrl` on the `MaterialSesionCurso` table. All the data in the column will be lost.
  - You are about to drop the column `avatar` on the `MaterialSesionCurso` table. All the data in the column will be lost.
  - You are about to drop the column `descripcion` on the `MaterialSesionCurso` table. All the data in the column will be lost.
  - You are about to drop the column `estado` on the `MaterialSesionCurso` table. All the data in the column will be lost.
  - You are about to drop the column `fechaRegistro` on the `MaterialSesionCurso` table. All the data in the column will be lost.
  - You are about to drop the column `id` on the `MaterialSesionCurso` table. All the data in the column will be lost.
  - You are about to drop the column `identificadorManual` on the `MaterialSesionCurso` table. All the data in the column will be lost.
  - You are about to drop the column `instruccion` on the `MaterialSesionCurso` table. All the data in the column will be lost.
  - You are about to drop the column `nombre` on the `MaterialSesionCurso` table. All the data in the column will be lost.
  - You are about to drop the column `sesionCursoId` on the `MaterialSesionCurso` table. All the data in the column will be lost.
  - The primary key for the `SesionCurso` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `avatar` on the `SesionCurso` table. All the data in the column will be lost.
  - You are about to drop the column `cursoId` on the `SesionCurso` table. All the data in the column will be lost.
  - You are about to drop the column `descripcion` on the `SesionCurso` table. All the data in the column will be lost.
  - You are about to drop the column `estado` on the `SesionCurso` table. All the data in the column will be lost.
  - You are about to drop the column `fechaRegistro` on the `SesionCurso` table. All the data in the column will be lost.
  - You are about to drop the column `id` on the `SesionCurso` table. All the data in the column will be lost.
  - You are about to drop the column `lecturaUrl` on the `SesionCurso` table. All the data in the column will be lost.
  - You are about to drop the column `nombre` on the `SesionCurso` table. All the data in the column will be lost.
  - You are about to drop the column `videoUrl` on the `SesionCurso` table. All the data in the column will be lost.
  - The primary key for the `Usuario` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `avatar` on the `Usuario` table. All the data in the column will be lost.
  - You are about to drop the column `contrasena` on the `Usuario` table. All the data in the column will be lost.
  - You are about to drop the column `correo` on the `Usuario` table. All the data in the column will be lost.
  - You are about to drop the column `estado` on the `Usuario` table. All the data in the column will be lost.
  - You are about to drop the column `fechaRegistro` on the `Usuario` table. All the data in the column will be lost.
  - You are about to drop the column `id` on the `Usuario` table. All the data in the column will be lost.
  - You are about to drop the column `nombre` on the `Usuario` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[Correo]` on the table `Usuario` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `Dificultad` to the `Academia` table without a default value. This is not possible if the table is not empty.
  - The required column `Id` was added to the `Academia` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.
  - Added the required column `Nombre` to the `Academia` table without a default value. This is not possible if the table is not empty.
  - Added the required column `TipoAcademia` to the `Academia` table without a default value. This is not possible if the table is not empty.
  - Added the required column `AcademiaId` to the `Curso` table without a default value. This is not possible if the table is not empty.
  - Added the required column `Dificultad` to the `Curso` table without a default value. This is not possible if the table is not empty.
  - The required column `Id` was added to the `Curso` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.
  - Added the required column `Nombre` to the `Curso` table without a default value. This is not possible if the table is not empty.
  - The required column `Id` was added to the `InscripcionUsuario` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.
  - Added the required column `UsuarioId` to the `InscripcionUsuario` table without a default value. This is not possible if the table is not empty.
  - The required column `Id` was added to the `MaterialSesionCurso` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.
  - Added the required column `Nombre` to the `MaterialSesionCurso` table without a default value. This is not possible if the table is not empty.
  - Added the required column `SesionCursoId` to the `MaterialSesionCurso` table without a default value. This is not possible if the table is not empty.
  - Added the required column `TipoMaterial` to the `MaterialSesionCurso` table without a default value. This is not possible if the table is not empty.
  - Added the required column `CursoId` to the `SesionCurso` table without a default value. This is not possible if the table is not empty.
  - The required column `Id` was added to the `SesionCurso` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.
  - Added the required column `Nombre` to the `SesionCurso` table without a default value. This is not possible if the table is not empty.
  - The required column `Id` was added to the `Usuario` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.

*/
-- CreateEnum
CREATE TYPE "public"."EnumTipoMaterial" AS ENUM ('Documento', 'Prueba', 'Examen', 'Laboratorio');

-- DropForeignKey
ALTER TABLE "public"."Curso" DROP CONSTRAINT "Curso_academiaId_fkey";

-- DropForeignKey
ALTER TABLE "public"."InscripcionUsuario" DROP CONSTRAINT "InscripcionUsuario_cursoId_fkey";

-- DropForeignKey
ALTER TABLE "public"."InscripcionUsuario" DROP CONSTRAINT "InscripcionUsuario_materialSesionCursoId_fkey";

-- DropForeignKey
ALTER TABLE "public"."InscripcionUsuario" DROP CONSTRAINT "InscripcionUsuario_sesionCursoId_fkey";

-- DropForeignKey
ALTER TABLE "public"."InscripcionUsuario" DROP CONSTRAINT "InscripcionUsuario_usuarioId_fkey";

-- DropForeignKey
ALTER TABLE "public"."MaterialSesionCurso" DROP CONSTRAINT "MaterialSesionCurso_sesionCursoId_fkey";

-- DropForeignKey
ALTER TABLE "public"."SesionCurso" DROP CONSTRAINT "SesionCurso_cursoId_fkey";

-- DropIndex
DROP INDEX "public"."Usuario_correo_key";

-- AlterTable
ALTER TABLE "public"."Academia" DROP CONSTRAINT "Academia_pkey",
DROP COLUMN "avatar",
DROP COLUMN "descripcion",
DROP COLUMN "dificultad",
DROP COLUMN "estado",
DROP COLUMN "fechaRegistro",
DROP COLUMN "id",
DROP COLUMN "nombre",
DROP COLUMN "tipoAcademia",
ADD COLUMN     "Avatar" TEXT,
ADD COLUMN     "Descripcion" TEXT,
ADD COLUMN     "Dificultad" "public"."EnumDificultad" NOT NULL,
ADD COLUMN     "Estado" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "FechaRegistro" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "Id" TEXT NOT NULL,
ADD COLUMN     "Nombre" TEXT NOT NULL,
ADD COLUMN     "TipoAcademia" "public"."EnumTipoAcademia" NOT NULL,
ADD CONSTRAINT "Academia_pkey" PRIMARY KEY ("Id");

-- AlterTable
ALTER TABLE "public"."Curso" DROP CONSTRAINT "Curso_pkey",
DROP COLUMN "academiaId",
DROP COLUMN "avatar",
DROP COLUMN "descripcion",
DROP COLUMN "dificultad",
DROP COLUMN "estado",
DROP COLUMN "fechaRegistro",
DROP COLUMN "id",
DROP COLUMN "nombre",
DROP COLUMN "videoUrl",
ADD COLUMN     "AcademiaId" TEXT NOT NULL,
ADD COLUMN     "Avatar" TEXT,
ADD COLUMN     "Descripcion" TEXT,
ADD COLUMN     "Dificultad" "public"."EnumDificultad" NOT NULL,
ADD COLUMN     "Estado" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "FechaRegistro" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "Id" TEXT NOT NULL,
ADD COLUMN     "Instruccional" TEXT,
ADD COLUMN     "Nombre" TEXT NOT NULL,
ADD COLUMN     "VideoURL" TEXT,
ADD CONSTRAINT "Curso_pkey" PRIMARY KEY ("Id");

-- AlterTable
ALTER TABLE "public"."InscripcionUsuario" DROP CONSTRAINT "InscripcionUsuario_pkey",
DROP COLUMN "avance",
DROP COLUMN "cursoId",
DROP COLUMN "estado",
DROP COLUMN "fechaRegistro",
DROP COLUMN "id",
DROP COLUMN "materialSesionCursoId",
DROP COLUMN "sesionCursoId",
DROP COLUMN "usuarioId",
ADD COLUMN     "Avance" DECIMAL(65,30) DEFAULT 0,
ADD COLUMN     "CursoId" TEXT,
ADD COLUMN     "Estado" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "FechaRegistro" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "Id" TEXT NOT NULL,
ADD COLUMN     "MaterialSesionCursoId" TEXT,
ADD COLUMN     "SesionCursoId" TEXT,
ADD COLUMN     "UsuarioId" TEXT NOT NULL,
ADD CONSTRAINT "InscripcionUsuario_pkey" PRIMARY KEY ("Id");

-- AlterTable
ALTER TABLE "public"."MaterialSesionCurso" DROP CONSTRAINT "MaterialSesionCurso_pkey",
DROP COLUMN "archivoUrl",
DROP COLUMN "avatar",
DROP COLUMN "descripcion",
DROP COLUMN "estado",
DROP COLUMN "fechaRegistro",
DROP COLUMN "id",
DROP COLUMN "identificadorManual",
DROP COLUMN "instruccion",
DROP COLUMN "nombre",
DROP COLUMN "sesionCursoId",
ADD COLUMN     "ArchivoURL" TEXT,
ADD COLUMN     "Avance" DECIMAL(65,30) DEFAULT 0,
ADD COLUMN     "Avatar" TEXT,
ADD COLUMN     "Estado" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "FechaRegistro" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "Id" TEXT NOT NULL,
ADD COLUMN     "IdentificadorManual" TEXT,
ADD COLUMN     "Instruccional" TEXT,
ADD COLUMN     "Nombre" TEXT NOT NULL,
ADD COLUMN     "SesionCursoId" TEXT NOT NULL,
ADD COLUMN     "TipoMaterial" "public"."EnumTipoMaterial" NOT NULL,
ADD CONSTRAINT "MaterialSesionCurso_pkey" PRIMARY KEY ("Id");

-- AlterTable
ALTER TABLE "public"."SesionCurso" DROP CONSTRAINT "SesionCurso_pkey",
DROP COLUMN "avatar",
DROP COLUMN "cursoId",
DROP COLUMN "descripcion",
DROP COLUMN "estado",
DROP COLUMN "fechaRegistro",
DROP COLUMN "id",
DROP COLUMN "lecturaUrl",
DROP COLUMN "nombre",
DROP COLUMN "videoUrl",
ADD COLUMN     "Avatar" TEXT,
ADD COLUMN     "CursoId" TEXT NOT NULL,
ADD COLUMN     "Descripcion" TEXT,
ADD COLUMN     "DuracionLectura" DECIMAL(65,30) DEFAULT 0,
ADD COLUMN     "DuracionVideo" DECIMAL(65,30) DEFAULT 0,
ADD COLUMN     "Estado" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "FechaRegistro" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "Id" TEXT NOT NULL,
ADD COLUMN     "Instruccional" TEXT,
ADD COLUMN     "LecturaURL" TEXT,
ADD COLUMN     "Nombre" TEXT NOT NULL,
ADD COLUMN     "VideoURL" TEXT,
ADD CONSTRAINT "SesionCurso_pkey" PRIMARY KEY ("Id");

-- AlterTable
ALTER TABLE "public"."Usuario" DROP CONSTRAINT "Usuario_pkey",
DROP COLUMN "avatar",
DROP COLUMN "contrasena",
DROP COLUMN "correo",
DROP COLUMN "estado",
DROP COLUMN "fechaRegistro",
DROP COLUMN "id",
DROP COLUMN "nombre",
ADD COLUMN     "Avatar" TEXT,
ADD COLUMN     "Contrasena" TEXT,
ADD COLUMN     "Correo" TEXT,
ADD COLUMN     "Estado" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "FechaRegistro" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "Id" TEXT NOT NULL,
ADD COLUMN     "Nombre" TEXT,
ADD CONSTRAINT "Usuario_pkey" PRIMARY KEY ("Id");

-- CreateTable
CREATE TABLE "public"."UsuarioProgreso" (
    "Id" TEXT NOT NULL,
    "UsuarioId" TEXT NOT NULL,
    "Puntos" DECIMAL(65,30) NOT NULL DEFAULT 0,
    "Racha" INTEGER NOT NULL DEFAULT 0,
    "RetosCompletados" INTEGER NOT NULL DEFAULT 0,
    "Estado" BOOLEAN NOT NULL DEFAULT true,
    "FechaInicio" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "UsuarioProgreso_pkey" PRIMARY KEY ("Id")
);

-- CreateTable
CREATE TABLE "public"."RegistroUsuarioProgreso" (
    "Id" TEXT NOT NULL,
    "UsuarioProgresoId" TEXT NOT NULL,
    "Punto" DECIMAL(65,30) NOT NULL DEFAULT 0,
    "Racha" INTEGER NOT NULL DEFAULT 0,
    "RetosCompletados" INTEGER NOT NULL DEFAULT 0,
    "Estado" BOOLEAN NOT NULL DEFAULT true,
    "Fecha" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "RegistroUsuarioProgreso_pkey" PRIMARY KEY ("Id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Usuario_Correo_key" ON "public"."Usuario"("Correo");

-- AddForeignKey
ALTER TABLE "public"."UsuarioProgreso" ADD CONSTRAINT "UsuarioProgreso_UsuarioId_fkey" FOREIGN KEY ("UsuarioId") REFERENCES "public"."Usuario"("Id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."RegistroUsuarioProgreso" ADD CONSTRAINT "RegistroUsuarioProgreso_UsuarioProgresoId_fkey" FOREIGN KEY ("UsuarioProgresoId") REFERENCES "public"."UsuarioProgreso"("Id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Curso" ADD CONSTRAINT "Curso_AcademiaId_fkey" FOREIGN KEY ("AcademiaId") REFERENCES "public"."Academia"("Id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."InscripcionUsuario" ADD CONSTRAINT "InscripcionUsuario_UsuarioId_fkey" FOREIGN KEY ("UsuarioId") REFERENCES "public"."Usuario"("Id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."InscripcionUsuario" ADD CONSTRAINT "InscripcionUsuario_CursoId_fkey" FOREIGN KEY ("CursoId") REFERENCES "public"."Curso"("Id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."InscripcionUsuario" ADD CONSTRAINT "InscripcionUsuario_SesionCursoId_fkey" FOREIGN KEY ("SesionCursoId") REFERENCES "public"."SesionCurso"("Id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."InscripcionUsuario" ADD CONSTRAINT "InscripcionUsuario_MaterialSesionCursoId_fkey" FOREIGN KEY ("MaterialSesionCursoId") REFERENCES "public"."MaterialSesionCurso"("Id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."SesionCurso" ADD CONSTRAINT "SesionCurso_CursoId_fkey" FOREIGN KEY ("CursoId") REFERENCES "public"."Curso"("Id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."MaterialSesionCurso" ADD CONSTRAINT "MaterialSesionCurso_SesionCursoId_fkey" FOREIGN KEY ("SesionCursoId") REFERENCES "public"."SesionCurso"("Id") ON DELETE RESTRICT ON UPDATE CASCADE;
