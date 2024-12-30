import React from 'react';
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

  const logout = () => {
    dispatch(eseguiLogout());
  }

  return (
    <>
      <Navbar expand="lg" className='navbar-class'>
        <Nav className='nav-left'>
          {(autenticazioneSession.isLogged === true) && (
            <>
              <NavDropdown title="Clienti" className='nav-dropdown'>
                <NavDropdown.Item as={NavLink} to="/nuovo-cliente">Nuovo cliente</NavDropdown.Item>
                <NavDropdown.Item as={NavLink} to="/clienti">Clienti</NavDropdown.Item>
              </NavDropdown>
              <NavDropdown title="Professionisti" className='nav-dropdown'>
                <NavDropdown.Item as={NavLink} to="/nuovo-professionista">Nuovo professionista</NavDropdown.Item>
                <NavDropdown.Item as={NavLink} to="/professionisti">Professionisti</NavDropdown.Item>
              </NavDropdown>
              <NavDropdown title="Lavori" className='nav-dropdown'>
                <NavDropdown.Item as={NavLink} to="/nuovo-lavoro">Nuovo lavoro</NavDropdown.Item>
                <NavDropdown.Item as={NavLink} to="/lavori">Lavori</NavDropdown.Item>
                <NavDropdown.Item as={NavLink} to="/pdf-lavori">PDF lavori</NavDropdown.Item>
              </NavDropdown>
            </>
          )}
        </Nav>  

        <Nav className='nav-center'>
          <Nav.Link as={NavLink} to="/" className='nav-link'>
            <House className='icon-view-style' id='walletCards' size={40} />
          </Nav.Link>
        </Nav>

        <Nav className='nav-right'>
          <>
            {(autenticazioneSession.isLogged === false) && (
              <Nav.Link as={NavLink} to="/login" className='nav-link'>Login</Nav.Link>
            )}
            {(autenticazioneSession.isLogged === true) && (
              <>
                <Nav.Link as={NavLink} to="/profilo" className='nav-link'>Profilo</Nav.Link>
                <Nav.Link as={NavLink} to="/" className='nav-link' onClick={logout}>Logout</Nav.Link>
              </>
            )}
          </>
        </Nav>  
      </Navbar>
      <br />
      <br />
      <button>{autenticazioneSession.ruolo}</button>
      <button>{autenticazioneSession.isLogged.toString()}</button>
    </>
  );
}

export default NavbarSito;









