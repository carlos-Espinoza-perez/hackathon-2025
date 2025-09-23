// src/routes/userProgress.routes.ts
import { Router } from "express";
import { getListUsuarioProgresoTopFive, getUsuarioProrgeso, postRegistroUsuarioProgresoDay } from "../controllers/userProgress.controller.js";

const router = Router();

router.get('/getUsuarioProrgeso', getUsuarioProrgeso);
router.get('/getListUsuarioProgresoTopFive', getListUsuarioProgresoTopFive);
router.post('/postRegistroUsuarioProgresoDay', postRegistroUsuarioProgresoDay);

export default router;
