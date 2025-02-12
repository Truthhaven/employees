import React from "react";
import "./Dropdown.css";

const Dropdown = ({ employees, attribute, label }) => {
  // Extract unique values based on the selected attribute (e.g., department, role, yearsAtCompany)
  const uniqueValues = [...new Set(employees.map(emp => emp[attribute]))];

  return (
    <div className="dropdown-container">
      <label htmlFor={attribute}>{label}</label>
      <select id={attribute} className="dropdown">
        <option value="">Select a {label.toLowerCase()}</option>
        {uniqueValues.map((value, index) => (
          <option key={index} value={value}>{value}</option>
        ))}
      </select>
    </div>
  );
};

export default Dropdown;
