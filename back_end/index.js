import express from "express";
import cors from "cors";
import pkg from "pg";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
import session from "express-session";
import connectPg from "connect-pg-simple";

dotenv.config(); // load .env first

const { Pool } = pkg;

const app = express();
const port = 8000;

app.use(cors());
app.use(express.json());

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: process.env.DATABASE_URL.includes("localhost")
        ? false 
        : { rejectUnauthorized: false }
});

// Store Sign Up information
app.post("/signup", async (req, res) => {
    const { username, full_name, password } = req.body;

    try {
        // Hash password
        const hash = await bcrypt.hash(password, 10);

        // Insert user
        const result = await pool.query(
            `INSERT INTO users (username, full_name, password_hash)
             VALUES ($1, $2, $3)
             RETURNING user_id`,
            [username, full_name, hash]
        );

        res.json({
            success: true,
            user_id: result.rows[0].user_id
        });

    } catch (err) {
        console.error("Signup error:", err);
        res.json({ success: false, error: err.message });
    }
});

// Sign In Verification
app.post("/signin", async (req, res) => {
    const { username, password } = req.body;

    try {
        // Find user by username
        const result = await pool.query(
            "SELECT * FROM users WHERE username = $1",
            [username]
        );

        if (result.rows.length === 0) {
            return res.json({ success: false, message: "User not found" });
        }

        const user = result.rows[0];

        // Compare password with hashed password
        const match = await bcrypt.compare(password, user.password_hash);

        if (!match) {
            return res.json({ success: false, message: "Incorrect password" });
        }

        // Success — password matches
        res.json({
            success: true,
            user_id: user.user_id,
            full_name: user.full_name
        });

    } catch (error) {
        console.error("SignIn error:", error);
        res.status(500).json({ success: false, message: "Server error" });
    }
});

// Update account info
app.post("/update-account", async (req, res) => {
    const { user_id, username, full_name } = req.body;

    try {
        await pool.query(
            `UPDATE users 
             SET username = $1, full_name = $2
             WHERE user_id = $3`,
            [username, full_name, user_id]
        );

        res.json({ success: true });
    } catch (err) {
        console.error("Update error:", err);
        res.json({ success: false, message: err.message });
    }
});

// Update billing info
app.post("/update-billing", async (req, res) => {
    const { user_id, billing_address } = req.body;

    try {
        await pool.query(
            `UPDATE users
             SET billing_address = $1
             WHERE user_id = $2`,
            [billing_address, user_id]
        );

        res.json({ success: true });
    } catch (err) {
        console.error("Billing update error:", err);
        res.json({ success: false, message: err.message });
    }
});

// get billing info
app.post("/get-billing", async (req, res) => {
    const { user_id } = req.body;

    try {
        const result = await pool.query(
            `SELECT billing_address 
             FROM users 
             WHERE user_id = $1`,
            [user_id]
        );

        res.json({
            success: true,
            billing_address: result.rows[0].billing_address || ""
        });
    } catch (err) {
        console.error("Billing fetch error:", err);
        res.json({ success: false, message: err.message });
    }
});

// Test route
app.get("/", (req, res) => {
    res.send("Backend is running!");
});

// Test DB connection
app.get("/db-test", async (req, res) => {
    try {
        const result = await pool.query("SELECT NOW()");
        res.json(result.rows);
    } catch (error) {
        console.error("DB Error:", error);
        res.status(500).json({ error: "Database connection failed" });
    }
});

// Start server
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});