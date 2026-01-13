import express from "express";
import { getEnquiries } from "../controllers/adminController.js";

const router = express.Router();

router.get("/enquiries", getEnquiries);

export default router;
