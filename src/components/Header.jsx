import "./Header.css"
const Header = () => {
    return (
        <>
            <div className = "headerContainer"> 
            <h1 className = "headerTitle"> Our People</h1>
            <hr className="horizontal-line" />
            <div className = "filterText"> 
            <h1 className = "filterBy"> FILTER BY </h1>
            <h1 className = "clearAll"> Clear All</h1>
            </div>
            </div>
        </>
    )
}
export default Header;