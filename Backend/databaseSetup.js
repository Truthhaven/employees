import sqlite3 from "sqlite3";
import { open } from "sqlite";

// Function to initialize database
async function setupDatabase() {
    // Open SQLite database
    const db = await open({
        filename: "./company.db",
        driver: sqlite3.Database
    });

    console.log("✅ Connected to SQLite database.");

    // Create Employees table
    await db.exec(`
        CREATE TABLE IF NOT EXISTS employees (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            role TEXT NOT NULL,
            department TEXT NOT NULL,
            email TEXT UNIQUE NOT NULL,
            profile_picture TEXT NOT NULL,
            years_at_company INTEGER NOT NULL
        );
    `);
    console.log("Employees table created or already exists.");

    // Insert employees
    const employees = [
        { name: "Alice Johnson", role: "Software Engineer", department: "Engineering", email: "alice@example.com", profilePicture: "./pic.jpg", yearsAtCompany: 3 },
        { name: "Bob Smith", role: "Product Manager", department: "Product", email: "bob@example.com", profilePicture: "./pic.jpg", yearsAtCompany: 5 },
        { name: "Charlie Lee", role: "Designer", department: "Design", email: "charlie@example.com", profilePicture: "./pic.jpg", yearsAtCompany: 1 },
        { name: "David Wilson", role: "Data Scientist", department: "Analytics", email: "david@example.com", profilePicture: "./pic.jpg", yearsAtCompany: 4 },
        { name: "Eva Carter", role: "HR Specialist", department: "Human Resources", email: "eva@example.com", profilePicture: "./pic.jpg", yearsAtCompany: 2 },
        { name: "Frank Thompson", role: "Marketing Coordinator", department: "Marketing", email: "frank@example.com", profilePicture: "./pic.jpg", yearsAtCompany: 3 },
        { name: "Grace Davis", role: "UX Researcher", department: "Design", email: "grace@example.com", profilePicture: "./pic.jpg", yearsAtCompany: 2 },
        { name: "Henry Martinez", role: "System Administrator", department: "IT", email: "henry@example.com", profilePicture: "./pic.jpg", yearsAtCompany: 6 },
        { name: "Irene Taylor", role: "Business Analyst", department: "Product", email: "irene@example.com", profilePicture: "./pic.jpg", yearsAtCompany: 3 },
        { name: "Jack Wilson", role: "Front-end Developer", department: "Engineering", email: "jack@example.com", profilePicture: "./pic.jpg", yearsAtCompany: 1 }
      ];
    for (const emp of employees) {
        await db.run(
            `INSERT INTO employees (name, role, department, email, profile_picture, years_at_company)
            VALUES (?, ?, ?, ?, ?, ?)`,
            [emp.name, emp.role, emp.department, emp.email, emp.profilePicture, emp.yearsAtCompany]
        );
        console.log(`Added employee: ${emp.name}`);
    }

    await db.close();
    console.log("Database setup complete.");
}

// Run the setup function
setupDatabase().catch(err => console.error("Error setting up database:", err));
