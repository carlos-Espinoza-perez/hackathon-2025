// src/routes/user.routes.ts
import { Router } from "express";
import { deleteUser, login, profile, register } from "../controllers/user.controller.js";

const router = Router();

router.post('/create', register);
router.post('/login', login);
router.post('/delete', deleteUser);
router.get('/profile', profile);
export default router;
