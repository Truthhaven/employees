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

// Get All Employees
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

// Search Employees by Name, Department, Role, or Years at Company
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

// Add Employees
app.post("/employees", async (req, res) => {
    console.log("Received request body:", req.body); // Debugging

    const { name, role, department, email, years_at_company } = req.body;

    if (!name || !role || !department || !email || years_at_company === undefined) {
        return res.status(400).json({ error: "All fields are required. Please ensure that 'Years at Company' is a numeric value." });
    }

    const profilePic = "./employeePic.jpeg"; // Default profile picture

    try {
        const db = await connectDB();

        // Insert the new employee and return the generated ID
        const result = await db.run(
            `INSERT INTO employees (name, role, department, email, profile_picture, years_at_company)
             VALUES (?, ?, ?, ?, ?, ?)`,
            [name, role, department, email, profilePic, years_at_company]
        );

        // Fetch the newly created employee using the last inserted ID
        const newEmployee = await db.get("SELECT * FROM employees WHERE id = ?", [result.lastID]);

        await db.close();

        // Return the full employee object including `id`
        res.status(201).json({ message: "Employee added successfully", employee: newEmployee });
    } catch (error) {
        console.error("Database error:", error);

        if (error.code === "SQLITE_CONSTRAINT") {
            return res.status(400).json({ error: "Email already exists. Please use a different email." });
        }

        res.status(500).json({ error: error.message || "Internal server error" });
    }
});


// Delete Employees
app.delete("/employees/:id", async (req, res) => {
    const { id } = req.params;

    if (!id) {
        return res.status(400).json({ error: "Employee ID is required." });
    }

    try {
        const db = await connectDB();
        
        // First, check if the employee exists before deleting
        const existingEmployee = await db.get("SELECT * FROM employees WHERE id = ?", [id]);
        if (!existingEmployee) {
            return res.status(404).json({ error: "Employee not found. It may have already been deleted." });
        }

        // Perform delete operation
        const result = await db.run("DELETE FROM employees WHERE id = ?", [id]);

        if (result.changes === 0) {
            return res.status(404).json({ error: "Employee not found. It may have already been deleted." });
        }

        // Fetch the updated employees list
        const remainingEmployees = await db.all("SELECT * FROM employees");

        await db.close();
        res.json({ message: "Employee deleted successfully.", employees: remainingEmployees });
    } catch (error) {
        console.error("Database error:", error);
        res.status(500).json({ error: "Internal server error." });
    }
});






// Start the Server
app.listen(PORT, () => {
    console.log(`🚀 Server running at http://localhost:${PORT}`);
});