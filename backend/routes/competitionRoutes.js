import express from "express";
import { submitCompetitionForm } from "../controllers/competitionController.js";

const router = express.Router();

router.post("/submit", submitCompetitionForm);

export default router;
