import React, { useState } from 'react';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { NavLink } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { House } from 'lucide-react';
import { useSelector, useDispatch } from 'react-redux';
import { operazioniAutenticazione } from '../../vario/Operazioni';
import { eseguiLogout } from '../../store/redux/AutenticazioneSessionSlice';
import { useNavigate } from 'react-router-dom';

const NavbarSito = () => {
  const autenticazioneSession = useSelector((state) => state.autenticazioneSession.value);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [dropdownClienti, setDropdownClienti] = useState(false);
  const [dropdownProfessionisti, setDropdownProfessionisti] = useState(false);
  const [dropdownLavori, setDropdownLavori] = useState(false);

  const logout = () => {
    dispatch(eseguiLogout());
  }

  return (
    <>
      <Navbar expand="lg">
        <Nav className='nav-left'>
          {(autenticazioneSession.isLogged === true) && (
            <>
              <NavDropdown 
                title="Clienti" 
                className="nav-dropdown"
                show={dropdownClienti}
                onMouseEnter={() => setDropdownClienti(true)}
                onMouseLeave={() => setDropdownClienti(false)}
              >
                <NavDropdown.Item as={NavLink} to="/nuovo-cliente" className="nav-dropdown-item">Nuovo cliente</NavDropdown.Item>
                <NavDropdown.Item as={NavLink} to="/clienti" className="nav-dropdown-item">Clienti</NavDropdown.Item>
              </NavDropdown>
              <NavDropdown 
                title="Professionisti" 
                className="nav-dropdown"
                show={dropdownProfessionisti}
                onMouseEnter={() => setDropdownProfessionisti(true)}
                onMouseLeave={() => setDropdownProfessionisti(false)}
              >
                <NavDropdown.Item as={NavLink} to="/nuovo-professionista" className="nav-dropdown-item">Nuovo professionista</NavDropdown.Item>
                <NavDropdown.Item as={NavLink} to="/professionisti" className="nav-dropdown-item">Professionisti</NavDropdown.Item>
              </NavDropdown>
              <NavDropdown 
                title="Lavori" 
                className="nav-dropdown"
                show={dropdownLavori}
                onMouseEnter={() => setDropdownLavori(true)}
                onMouseLeave={() => setDropdownLavori(false)}
              >
                <NavDropdown.Item as={NavLink} to="/nuovo-lavoro" className="nav-dropdown-item">Nuovo lavoro</NavDropdown.Item>
                <NavDropdown.Item as={NavLink} to="/lavori" className="nav-dropdown-item">Lavori</NavDropdown.Item>
                <NavDropdown.Item as={NavLink} to="/file-lavori" className="nav-dropdown-item">File lavori</NavDropdown.Item>
              </NavDropdown>
            </>
          )}
        </Nav>  

        <Nav className='nav-home'>
          <Nav.Link as={NavLink} to="/" className="nav-link-home">
            <House className='icon-view-style' id='walletCards' size={40} />
          </Nav.Link>
        </Nav>

        <Nav className='nav-right'>
          <>
            {(autenticazioneSession.isLogged === false) && (
              <Nav.Link as={NavLink} to="/login" className="nav-link">Login</Nav.Link>
            )}
            {(autenticazioneSession.isLogged === true) && (
              <>
                <Nav.Link as={NavLink} to="/profilo" className="nav-link">Profilo</Nav.Link>
                <Nav.Link as={NavLink} to="/" onClick={logout} className="nav-link">Logout</Nav.Link>
              </>
            )}
          </>
        </Nav>  
      </Navbar>
    </>
  );
}

export default NavbarSito;
