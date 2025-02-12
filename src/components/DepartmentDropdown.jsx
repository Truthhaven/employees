import "./Dropdown.css";

const DepartmentDropdown = ({ employees, attribute, label, onFilter, selectedValue }) => {
  // Fix attribute name for years filter
  const uniqueValues = [...new Set(employees.map(emp => emp[attribute]))];

  return (
    <div className="dropdown-container">
      <label htmlFor={attribute}>{label}</label>
      <select
        id={attribute}
        className="dropdown"
        onChange={(e) => onFilter(attribute, e.target.value)}
        value={selectedValue} // Ensures dropdown reflects current selection
      >
        <option value="">All</option>
        {uniqueValues.map((value, index) => (
          <option key={index} value={value}>{value}</option>
        ))}
      </select>
    </div>
  );
};

export default DepartmentDropdown;
