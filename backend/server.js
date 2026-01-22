import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import formRoutes from "./routes/formRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";
import footerContactRoutes from "./routes/footerContactRoutes.js";
import eventRoutes from "./routes/eventRoutes.js";

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/forms", formRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/footer-contact", footerContactRoutes);
app.use("/api/register-event", eventRoutes);



// Start server
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});
