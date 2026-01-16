import dotenv from "dotenv";
dotenv.config(); // automatically looks in the root folder

import express from "express";
import cors from "cors";
import formRoutes from "./routes/formRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";

// Load environment variables from .env

// Create Express app
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/forms", formRoutes);
app.use("/api/admin", adminRoutes);

// Debug environment variables
console.log("DB_HOST:", process.env.DB_HOST);
console.log("DB_USER:", process.env.DB_USER);
console.log("DB_PASS:", process.env.DB_PASS);
console.log("DB_NAME:", process.env.DB_NAME);

// Start server
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
