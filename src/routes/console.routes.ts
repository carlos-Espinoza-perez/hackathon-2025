// src/routes/userProgress.routes.ts
import { Router } from "express";
import { ExecCommand } from "../controllers/console.controller.js";

const router = Router();
router.post("/ExecCommand", ExecCommand);


export default router;
