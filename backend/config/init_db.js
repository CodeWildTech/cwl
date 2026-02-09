import pool from './db.js';

/**
 * Initializes the database by creating necessary tables if they don't exist.
 */
export const initializeDatabase = async () => {
    try {
        console.log("⏳ Initializing database tables...");

        const queries = [
            `CREATE TABLE IF NOT EXISTS enquiries (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL,
        phone VARCHAR(20) NOT NULL,
        dob DATE,
        location VARCHAR(255),
        qualification VARCHAR(255),
        course VARCHAR(255),
        message TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );`,
            `CREATE TABLE IF NOT EXISTS event_registrations (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL,
        phone VARCHAR(20) NOT NULL,
        current_status VARCHAR(255),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );`,
            `CREATE TABLE IF NOT EXISTS footer_contacts (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        phone VARCHAR(20) NOT NULL,
        email VARCHAR(255) NOT NULL,
        message TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );`
        ];

        for (const query of queries) {
            await pool.query(query);
        }

        console.log("✅ Database tables initialized successfully");
    } catch (err) {
        console.error("❌ Error initializing database tables:", err);
    }
};
