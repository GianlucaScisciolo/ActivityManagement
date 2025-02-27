import 'bootstrap/dist/css/bootstrap.min.css';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';


function DropdownWidgets() {
  return (
    // <DropdownButton id="dropdown-basic-button" title="Dropdown button">
    //   <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
    //   <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
    //   <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
    // </DropdownButton>
    <>
      {/* <button>Ciao!!!!</button> */}
      <DropdownButton id="dropdown-basic-button" title="Dropdown button">
        <input 
          type="checkbox" 
          id="servizio_1" 
          name="servizio_1" 
          value="Servizio 1"
          checked={false}
          className="checkbox-widget"
        />
        <label htmlFor="servizio_1">Servizio 1</label>
      </DropdownButton>
    </>
  );
}

export default DropdownWidgets;