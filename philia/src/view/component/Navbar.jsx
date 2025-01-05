import React, { useEffect, useState } from 'react';
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
import { changeWithImg, changeWithColoreRGB } from '../../store/redux/SfondoSlice';
import { changeView } from '../../store/redux/ItemSlice';
import immagineSfondo1 from "../img/immagine_sfondo1.jpg";
import immagineSfondo2 from "../img/immagine_sfondo2.png";

const NavbarSito = () => {
  const autenticazioneSession = useSelector((state) => state.autenticazioneSession.value);
  const sfondoSession = useSelector((state) => state.sfondoSession.value);
  const itemSession = useSelector((state) => state.itemSession.value);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [dropdownClienti, setDropdownClienti] = useState(false);
  const [dropdownProfessionisti, setDropdownProfessionisti] = useState(false);
  const [dropdownLavori, setDropdownLavori] = useState(false);
  const [dropdownStile, setDropdownStile] = useState(false);
  const [dropdownSfondo, setDropdownSfondo] = useState(false);
  const [dropdownItem, setDropdownItem] = useState(false);

  const logout = () => {
    dispatch(eseguiLogout());
  }

  const applicaStileBody = () => {
    if (sfondoSession.pathImg !== null) {
      document.body.style.backgroundImage = `url(${sfondoSession.pathImg})`;
      document.body.style.backgroundRepeat = 'no-repeat';
      document.body.style.backgroundSize = 'cover';
      document.body.style.backgroundAttachment = 'fixed';
      document.body.style.backgroundPosition = 'center';
      document.body.style.height = '100vh';
  
      // Nascondi solo lo scorrimento orizzontale
      document.documentElement.style.overflowX = 'hidden';
      document.documentElement.style.maxWidth = '100%';
      document.documentElement.style.maxHeight = '100%';
    } 
    else if (sfondoSession.coloreRGB !== null) {
      document.body.style.backgroundImage = 'none';
      document.body.style.backgroundColor = sfondoSession.coloreRGB;
  
      // Nascondi solo lo scorrimento orizzontale
      document.documentElement.style.overflowX = 'hidden';
      document.documentElement.style.maxWidth = '100%';
      document.documentElement.style.maxHeight = '100%';
    } 
    else {
      alert("Errore.");
    }
  }
  
  

  useEffect(() => {
    applicaStileBody();
  }, [sfondoSession]);

  // Thunk function
  const cambioSfondo = (nomeSfondo) => (dispatch) => {
    switch(nomeSfondo) {
      case "immagine_1":
        dispatch(changeWithImg({
          pathImg: immagineSfondo1
        }));
        break;
      case "immagine_2":
        dispatch(changeWithImg({
          pathImg: immagineSfondo2
        }));
        break;
      case "sfondo_scuro":
        dispatch(changeWithColoreRGB({
          coloreRGB: "#111111"
        }));
        break;
      case "sfondo_chiaro":
        dispatch(changeWithColoreRGB({
          coloreRGB: "#8F8F8F"
        }));
        break;
      default:
        alert("Errore, nome sfondo non trovato.");
        break;
    }
  }

    // Thunk function
    const cambioView = (tipoView) => (dispatch) => {
      dispatch(changeView({
        view: tipoView
      }));
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
            <NavDropdown 
              title="Stile" 
              className="nav-dropdown"
              show={dropdownStile}
              onMouseEnter={() => setDropdownStile(true)}
              onMouseLeave={() => setDropdownStile(false)}
            >
              <NavDropdown 
                title="Sfondo" 
                className="nav-dropdown"
                show={dropdownSfondo}
                onMouseEnter={() => setDropdownSfondo(true)}
                onMouseLeave={() => setDropdownSfondo(false)}
              >
                {(dropdownSfondo === true) && (
                  <>
                    <NavDropdown.Item 
                      as={NavLink} 
                      to="#" 
                      className="nav-dropdown-item" 
                      onClick={() => dispatch(cambioSfondo("immagine_1"))}
                    >
                      Immagine 1
                    </NavDropdown.Item>
                    <NavDropdown.Item 
                      as={NavLink} 
                      to="#" 
                      className="nav-dropdown-item" 
                      onClick={() => dispatch(cambioSfondo("immagine_2"))}
                    >
                      Immagine 2
                    </NavDropdown.Item>
                    <NavDropdown.Item 
                      as={NavLink} 
                      to="#" 
                      className="nav-dropdown-item" 
                      onClick={() => dispatch(cambioSfondo("sfondo_scuro"))}
                    >
                      Sfondo scuro
                    </NavDropdown.Item>
                    <NavDropdown.Item 
                      as={NavLink} 
                      to="#" 
                      className="nav-dropdown-item" 
                      onClick={() => dispatch(cambioSfondo("sfondo_chiaro"))}
                    >
                      Sfondo chiaro
                    </NavDropdown.Item>
                  </>
                )}
              </NavDropdown>
              <NavDropdown 
                title="Item" 
                className="nav-dropdown"
                show={dropdownItem}
                onMouseEnter={() => setDropdownItem(true)}
                onMouseLeave={() => setDropdownItem(false)}
              >
                {(dropdownItem === true) && (
                  <>
                    <NavDropdown.Item 
                      as={NavLink} 
                      to="#" 
                      className="nav-dropdown-item" 
                      onClick={() => dispatch(cambioView("list"))}
                    >
                      Riga
                    </NavDropdown.Item>
                    <NavDropdown.Item 
                      as={NavLink} 
                      to="#" 
                      className="nav-dropdown-item" 
                      onClick={() => dispatch(cambioView("card"))}
                    >
                      Carta
                    </NavDropdown.Item>
                  </>
                )}
              </NavDropdown>
            </NavDropdown>

               
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
