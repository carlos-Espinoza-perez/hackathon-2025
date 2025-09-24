// src/routes/index.ts
import { Router } from "express";
import userRoutes from "./user.routes.js";
import userProgressRoutes from "./userProgress.routes.js";
import academyRoutes from "./academy.routes.js";
import asistantRoutes from "./asistant.controller.js";

const router = Router();

router.use("/Usuario", userRoutes);
router.use("/UsuarioProgreso", userProgressRoutes);
router.use("/Academia", academyRoutes);
router.use("/Asistente", asistantRoutes);

export default router;
