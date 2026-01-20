import express from "express";
import { submitFooterContact } from "../controllers/footerContactController.js";

const router = express.Router();

router.post("/submit", submitFooterContact);

export default router;
