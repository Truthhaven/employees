import { useState, useEffect } from "react";
import EmployeeCard from "./components/EmployeeCard";
import "./App.css";
import Header from "./components/Header";
import DepartmentDropdown from "./components/DepartmentDropdown";

function App() {
  const [employees, setEmployees] = useState([]); // Store all employees
  const [filteredEmployees, setFilteredEmployees] = useState([]); // Store filtered employees
  const [filters, setFilters] = useState({ department: "", role: "", years_at_company: "" }); // Store active filters
  const [selectedValues, setSelectedValues] = useState({ department: "", role: "", years_at_company: "" }); // Keep track of selected dropdown values
  const [showNoResults, setShowNoResults] = useState(false); // Track "No Results" popup

  // Fetch employees from backend on mount
  useEffect(() => {
    fetch("http://localhost:5001/api/employees") // Call backend API
      .then(res => res.json())
      .then(data => {
        setEmployees(data);
        setFilteredEmployees(data); // Initially, show all employees
      })
      .catch(err => console.error("Error fetching employees:", err));
  }, []);

  // **Apply Multiple Filters**
  useEffect(() => {
    let filtered = employees;

    // Apply filters only if values are selected
    if (filters.department) {
      filtered = filtered.filter(emp => emp.department === filters.department);
    }
    if (filters.role) {
      filtered = filtered.filter(emp => emp.role === filters.role);
    }
    if (filters.years_at_company) {
      filtered = filtered.filter(emp => emp.years_at_company === parseInt(filters.years_at_company));
    }

    setFilteredEmployees(filtered);

    // Show "No Results" popup if filtered list is empty
    setShowNoResults(filtered.length === 0);
  }, [filters, employees]);

  // **Update Filters & Dropdown Values**
  const handleFilterChange = (attribute, value) => {
    setFilters(prevFilters => ({
      ...prevFilters,
      [attribute]: value
    }));
    setSelectedValues(prevSelected => ({
      ...prevSelected,
      [attribute]: value
    }));
  };

  // **Reset Filters and Dropdowns**
  const resetFilters = () => {
    setFilters({ department: "", role: "", years_at_company: "" });
    setSelectedValues({ department: "", role: "", years_at_company: "" });
  };

  return (
    <> 
      {/* Pass resetFilters function to Header */}
      <Header resetFilters={resetFilters} /> 

      {/* Dropdown Filters */}
      <div className="dropdowns"> 
        <DepartmentDropdown employees={employees} attribute="department" label="Department" onFilter={handleFilterChange} selectedValue={selectedValues.department} />
        <DepartmentDropdown employees={employees} attribute="role" label="Role" onFilter={handleFilterChange} selectedValue={selectedValues.role} />
        <DepartmentDropdown employees={employees} attribute="years_at_company" label="Years at Company" onFilter={handleFilterChange} selectedValue={selectedValues.years_at_company} />
      </div>

      {/* "No Results" Popup */}
      {showNoResults && (
        <div className="no-results-popup">
          <p>No employees match the selected filters.</p>
        </div>
      )}

      {/* Employee Cards */}
      <div className="container">
        {filteredEmployees
          .sort((a, b) => b.years_at_company - a.years_at_company) // Sort by years
          .map((employee, index) => (
            <EmployeeCard key={index} employee={employee} />
          ))}
      </div>
    </>
  );
}

export default App;
