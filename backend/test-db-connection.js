import dotenv from "dotenv";
import pkg from "pg";
const { Pool } = pkg;

// Manually load .env to ensure we see exactly what's being used
dotenv.config();

console.log("Testing DB Connection...");
console.log("DB_USER:", process.env.DB_USER);
console.log("DB_HOST:", process.env.DB_HOST);
console.log("DB_PORT:", process.env.DB_PORT);
console.log("DB_NAME:", process.env.DB_NAME);
// Don't log password broadly, just length/existence
console.log("DB_PASS length:", process.env.DB_PASS ? process.env.DB_PASS.length : 0);

const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASS,
    port: Number(process.env.DB_PORT) || 5432,
});

async function testConnection() {
    try {
        const client = await pool.connect();
        console.log("✅ Connection Successful!");

        // Check if table exists
        const res = await client.query("SELECT to_regclass('public.enquiries') as table_exists;");
        console.log("Table 'enquiries' exists check:", res.rows[0]);

        if (!res.rows[0].table_exists) {
            console.error("❌ Table 'enquiries' DOES NOT EXIST!");
        } else {
            console.log("✅ Table 'enquiries' exists.");
        }

        client.release();
        process.exit(0);
    } catch (err) {
        console.error("❌ Connection Failed:", err.message);
        if (err.message.includes("password")) {
            console.error("Possible password issue. Check if .env has quotes.");
        }
        process.exit(1);
    }
}

testConnection();
