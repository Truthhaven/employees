import express from "express";
import sqlite3 from "sqlite3";
import { open } from "sqlite";
import cors from "cors";

const app = express();
const PORT = process.env.PORT || 5001;

// Enable CORS for frontend access
app.use(cors());
app.use(express.json());

// Connect to SQLite database
async function connectDB() {
    return await open({
        filename: "./company.db",
        driver: sqlite3.Database
    });
}

// **Get All Employees**
app.get("/api/employees", async (req, res) => {
    try {
        const db = await connectDB();
        const employees = await db.all("SELECT * FROM employees");
        res.json(employees);
        await db.close();
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// ** Search Employees by Name, Department, Role, or Years at Company**
app.get("/api/employees/search", async (req, res) => {
    try {
        const { name, department, role, years } = req.query;  // Extract query params
        let query = "SELECT * FROM employees WHERE 1=1"; // Start SQL query
        const params = [];

        if (name) {
            query += " AND name LIKE ?";
            params.push(`%${name}%`);
        }
        if (department) {
            query += " AND department LIKE ?";
            params.push(`%${department}%`);
        }
        if (role) {
            query += " AND role LIKE ?";
            params.push(`%${role}%`);
        }
        if (years) {
            query += " AND years_at_company = ?";
            params.push(parseInt(years));
        }

        const db = await connectDB();
        const employees = await db.all(query, params);
        res.json(employees);
        await db.close();
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// **Start the Server**
app.listen(PORT, () => {
    console.log(`🚀 Server running at http://localhost:${PORT}`);
});
