import "./EmployeeCard.css";

const EmployeeCard = ({ employee }) => {
  console.log("Employee Data:", employee); // Debugging: Check if years_at_company exists

  // Ensure database property names match the frontend
  const borderColor =
    employee?.years_at_company > 5 ? "gold" :
    employee?.years_at_company <= 1 ? "#ac0000" : 
    "gray";

  return (
    <div className="card" style={{ "--borderColor": borderColor }}>
      <img className="employee-image" src={employee?.profile_picture || "./employeePic.jpeg"} alt={employee?.name} />
      <div className="info">
        <h2 className="name">{employee?.name}</h2>
        <p className="role">{employee?.role}</p>
        <div className="groupedInfo">
          <p className="department">{employee?.department}</p>
          <p className="years">
            {employee?.years_at_company} {employee?.years_at_company === 1 ? "year" : "years"} employed
          </p>
          <p className="email">{employee?.email}</p>
        </div>
      </div>
    </div>
  );
};

export default EmployeeCard;
