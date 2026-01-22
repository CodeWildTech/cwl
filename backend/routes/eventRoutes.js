import express from "express";
import { submitEventForm } from "../controllers/eventController.js";

const router = express.Router();

router.post("/submit", submitEventForm);

export default router;
