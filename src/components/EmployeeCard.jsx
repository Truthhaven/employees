import "./EmployeeCard.css";

const EmployeeCard = ({ employee, onDelete}) => {

  const borderColor =
    employee?.years_at_company > 5 ? "gold" :
    employee?.years_at_company <= 1 ? "#ac0000" : 
    "gray";

  return (
    <div className="card" style={{ "--borderColor": borderColor }}>
      <img className="employee-image" src={employee?.profile_picture || "./employeePic.jpeg"} alt={employee?.name} />
      <div className="info">
      <button className="delete-btn" onClick={() => onDelete(employee.id)}>x</button>
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
