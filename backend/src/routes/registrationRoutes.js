import express from "express";
import { createRegistration } from "../controllers/registrationController.js";

const router = express.Router();
router.post("/register", createRegistration);

export default router;
