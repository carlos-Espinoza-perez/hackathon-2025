// src/routes/userProgress.routes.ts
import { Router } from "express";
import {
  getAcademyByAcademiaId,
  getCursoByCursoId,
  getListAcademy,
  getListCursoByAcademiaId,
  getListCursosVistosRecientes,
  getListLastCursos,
  getListSesionCursoByCursoId,
  getProgresoByAcademiaId,
  getProgresoByCursoId
} from "../controllers/academy.controller.js";

const router = Router();

// Endpoints sin parámetros
router.get('/getListCursosVistosRecientes', getListCursosVistosRecientes);
router.get('/getListAcademy', getListAcademy);
router.get('/getListLastCursos', getListLastCursos);

// Endpoints con parámetro academiaId
router.get('/getAcademyByAcademiaId/:academiaId', getAcademyByAcademiaId);
router.get('/getListCursoByAcademiaId/:academiaId', getListCursoByAcademiaId);
router.get('/getProgresoByAcademiaId/:academiaId', getProgresoByAcademiaId);

// Endpoints con parámetro cursoId
router.get('/getCursoByCursoId/:cursoId', getCursoByCursoId);
router.get('/getListSesionCursoByCursoId/:cursoId', getListSesionCursoByCursoId);
router.get('/getProgresoByCursoId/:cursoId', getProgresoByCursoId);

export default router;
