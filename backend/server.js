import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import formRoutes from "./routes/formRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/forms", formRoutes);
app.use("/api/admin", adminRoutes);

app.listen(process.env.PORT, () =>
  console.log(`Server running on port ${process.env.PORT}`)
);
