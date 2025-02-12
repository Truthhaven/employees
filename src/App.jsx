import EmployeeCard from "./components/EmployeeCard";
import "./App.css";

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

function App() {
  return (
    <div className="container">
      {employees.map((employee, index) => (
        <EmployeeCard key={index} employee={employee} />
      ))}
    </div>
  );
}

export default App
