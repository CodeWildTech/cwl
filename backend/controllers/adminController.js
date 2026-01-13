import pool from "../config/db.js";

export const getEnquiries = async (req, res) => {
  const result = await pool.query(
    "SELECT * FROM enquiries ORDER BY created_at DESC"
  );
  res.json(result.rows);
};
