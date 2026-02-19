import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import formRoutes from "./routes/formRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";
import footerContactRoutes from "./routes/footerContactRoutes.js";
import eventRoutes from "./routes/eventRoutes.js";
import competitionRoutes from "./routes/competitionRoutes.js";

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/forms", formRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/footer-contact", footerContactRoutes);
app.use("/api/register-event", eventRoutes);
app.use("/api/competition", competitionRoutes);

// Health check for Render
app.get("/health", (req, res) => res.json({ status: "ok" }));
console.log("SUPABASE_URL:", process.env.SUPABASE_URL)


// Start server
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});
