// src/routes/userProgress.routes.ts
import { Router } from "express";
import { messageIAGeneral, messageIAAcademia, messageIACurso, messageIASesion } from "../controllers/asistant.controller.js";

const router = Router();

router.post("/MessageGeneral", messageIAGeneral);
router.post("/MessageAcademia", messageIAAcademia);
router.post("/MessageCurso", messageIACurso);
router.post("/MessageSesion", messageIASesion);


export default router;
