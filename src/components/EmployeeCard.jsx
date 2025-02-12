import "./EmployeeCard.css";

const EmployeeCard = ({ employee }) => {
  const borderColor =
  employee.yearsAtCompany > 5 ? "gold" :
  employee.yearsAtCompany <= 1 ? "#ac0000" : 
  "gray";


    const yearEmployed = employee.yearsAtCompany === 1 ? "year" : "years";

    return (
        <div className="card" style={{ "--borderColor": borderColor }}>
            <img src={employee.profilePicture} alt={employee.name} />
            <div className="info">
                <h2 className="name">{employee.name}</h2>
                <p className="role">{employee.role}</p>
                <div className="groupedInfo">
                    <p className="department">{employee.department}</p>
                    <p className="years"> {employee.yearsAtCompany} {yearEmployed} employed</p>
                    <p className="email">{employee.email}</p>
                </div>
            </div>
        </div>
    );
};

export default EmployeeCard;
