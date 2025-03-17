import React, { useEffect, useState } from 'react';
import Navbar from 'react-bootstrap/Navbar';
import { NavLink } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { House } from 'lucide-react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { eseguiLogout } from "../../../store/redux/AutenticazioneSessionSlice";
import { changeWithImg, changeWithColoreRGB } from "../../../store/redux/SfondoSlice";
import { changeViewItem } from "../../../store/redux/ItemSlice";
import { changeViewForm } from "../../../store/redux/FormSlice";
import immagineSfondo1 from "../../img/immagine_sfondo1.jpg";
import immagineSfondo2 from '../../img/immagine_sfondo2.png';
import { 
  StyledNavLeft, StyledNavCenter, StyledNavRight, StyledNavDropdown, StyledNavDropdownItem, 
  StyledDropdownContainer, StyledSubMenuContainer, StyledNavLink, StyledNavLinkHome
} from './StyledNavbarSito';

const NavbarSito = () => {
  const autenticazioneSession = useSelector((state) => state.autenticazioneSession.value);
  const sfondoSession = useSelector((state) => state.sfondoSession.value);
  const itemSession = useSelector((state) => state.itemSession.value);
  const formSession = useSelector((state) => state.formSession.value);
  
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [dropdownClienti, setDropdownClienti] = useState(false);
  const [dropdownProfessionisti, setDropdownProfessionisti] = useState(false);
  const [dropdownLavori, setDropdownLavori] = useState(false);
  const [dropdownSpese, setDropdownSpese] = useState(false);
  const [dropdownStile, setDropdownStile] = useState(false);
  const [dropdownSfondo, setDropdownSfondo] = useState(false);
  const [dropdownItem, setDropdownItem] = useState(false);
  const [dropdownForm, setDropdownForm] = useState(false);

  const handleMouseEnter = (setDropdown) => {
    setDropdown(true);
  };
  
  const handleMouseLeave = (setDropdown) => {
    // setTimeout(() => {
      setDropdown(false);
    // }, 500); // Aggiungi un ritardo di 300ms
  };  

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
    const cambioView = (tipoElemento, tipoView) => (dispatch) => {
      if(tipoElemento === "item") {
        dispatch(changeViewItem({
          view: tipoView
        }));
      }
      else if(tipoElemento === "form") {
        dispatch(changeViewForm({
          view: tipoView
        }));
      }
    }

  return (
    <>
      <Navbar expand="lg">
        <StyledNavLeft>
          {(autenticazioneSession.isLogged === true) && (
            <>
              <StyledNavDropdown title="Clienti" show={dropdownClienti}
                onMouseEnter={() => handleMouseEnter(setDropdownClienti)}
                onMouseLeave={() => handleMouseLeave(setDropdownClienti)}
              >
                <StyledNavDropdownItem as={NavLink} to="/nuovo-cliente">Nuovo cliente</StyledNavDropdownItem>
                <StyledNavDropdownItem as={NavLink} to="/clienti">Clienti</StyledNavDropdownItem>
              </StyledNavDropdown>
              <StyledNavDropdown title="Servizi" show={dropdownProfessionisti}
                onMouseEnter={() => handleMouseEnter(setDropdownProfessionisti)}
                onMouseLeave={() => handleMouseLeave(setDropdownProfessionisti)}
              >
                <StyledNavDropdownItem as={NavLink} to="/nuovo-servizio">Nuovo servizio</StyledNavDropdownItem>
                <StyledNavDropdownItem as={NavLink} to="/servizi">Servizi</StyledNavDropdownItem>
              </StyledNavDropdown>
              <StyledNavDropdown title="Lavori" show={dropdownLavori}
                onMouseEnter={() => handleMouseEnter(setDropdownLavori)}
                onMouseLeave={() => handleMouseLeave(setDropdownLavori)}
              >
                  <StyledNavDropdownItem as={NavLink} to="/nuovo-lavoro">Nuovo lavoro</StyledNavDropdownItem>
                  <StyledNavDropdownItem as={NavLink} to="/lavori">Lavori</StyledNavDropdownItem>
                  <StyledNavDropdownItem as={NavLink} to="/file-lavori">File lavori</StyledNavDropdownItem>
                  {/* <StyledNavDropdownItem as={NavLink} to="https://calendar.google.com/calendar/u/0/appointments/schedules/AcZssZ2GRuG5B0k6Qyo2DLBkT1-OOXXC1XO60HQkWAl3Txvc3z-PcBL0EYhfc62sAor46nbg-szeiADZ">Prenotazione</StyledNavDropdownItem> */}
                  <StyledNavDropdownItem as="a" href="https://calendar.google.com/calendar/u/0/appointments/schedules/AcZssZ2GRuG5B0k6Qyo2DLBkT1-OOXXC1XO60HQkWAl3Txvc3z-PcBL0EYhfc62sAor46nbg-szeiADZ" target="_blank" rel="noopener noreferrer">Prenotazione</StyledNavDropdownItem>

              </StyledNavDropdown>
              <StyledNavDropdown title="Spese" show={dropdownSpese}
                onMouseEnter={() => handleMouseEnter(setDropdownSpese)}
                onMouseLeave={() => handleMouseLeave(setDropdownSpese)}
              >
                <StyledNavDropdownItem as={NavLink} to="/nuova-spesa">Nuova spesa</StyledNavDropdownItem>
                <StyledNavDropdownItem as={NavLink} to="/spese">Spese</StyledNavDropdownItem>
                <StyledNavDropdownItem as={NavLink} to="/file-spese">File spese</StyledNavDropdownItem>
              </StyledNavDropdown>
            </>
          )}
        </StyledNavLeft>  

        <StyledNavCenter>
          <StyledNavLinkHome as={NavLink} to="/">
            <House id='walletCards' size={40} />
          </StyledNavLinkHome>
        </StyledNavCenter>

        <StyledNavRight>
          <>
            <StyledNavDropdown title="Stile" show={dropdownStile}
              onMouseEnter={() => setDropdownStile(true)}
              onMouseLeave={() => setDropdownStile(false)}
            >
              <StyledDropdownContainer>
                <StyledSubMenuContainer>
                  <StyledNavDropdown title="Sfondo" show={dropdownSfondo}
                    onMouseEnter={() => setDropdownSfondo(true)}
                    onMouseLeave={() => setDropdownSfondo(false)}
                  >
                    {(dropdownSfondo === true) && (
                      <>
                        <StyledNavDropdownItem as={NavLink} to="#" 
                          onClick={() => dispatch(cambioSfondo("immagine_1"))}
                        >
                          Immagine 1
                        </StyledNavDropdownItem>
                        <StyledNavDropdownItem as={NavLink} to="#" 
                          onClick={() => dispatch(cambioSfondo("immagine_2"))}
                        >
                          Immagine 2
                        </StyledNavDropdownItem>
                        <StyledNavDropdownItem as={NavLink} to="#" 
                          onClick={() => dispatch(cambioSfondo("sfondo_scuro"))}
                        >
                          Sfondo scuro
                        </StyledNavDropdownItem>
                        <StyledNavDropdownItem as={NavLink} to="#" 
                          onClick={() => dispatch(cambioSfondo("sfondo_chiaro"))}
                        >
                          Sfondo chiaro
                        </StyledNavDropdownItem>
                      </>
                    )}
                  </StyledNavDropdown>
                  <StyledNavDropdown title="Item" show={dropdownItem}
                    onMouseEnter={() => setDropdownItem(true)}
                    onMouseLeave={() => setDropdownItem(false)}
                  >
                    {(dropdownItem === true) && (
                      <>
                        <StyledNavDropdownItem as={NavLink} to="#" 
                          onClick={() => dispatch(cambioView("item", "list"))}
                        >
                          Riga
                        </StyledNavDropdownItem>
                        <StyledNavDropdownItem as={NavLink} to="#" 
                          onClick={() => dispatch(cambioView("item", "card"))}
                        >
                          Carta
                        </StyledNavDropdownItem>
                      </>
                    )}
                  </StyledNavDropdown>
                  <StyledNavDropdown title="Form" show={dropdownForm}
                    onMouseEnter={() => setDropdownForm(true)}
                    onMouseLeave={() => setDropdownForm(false)}
                  >
                    {(dropdownForm === true) && (
                      <>
                        <StyledNavDropdownItem as={NavLink} to="#" 
                          onClick={() => dispatch(cambioView("form", "form"))}
                        >
                          Form
                        </StyledNavDropdownItem>
                        <StyledNavDropdownItem as={NavLink} to="#" 
                          onClick={() => dispatch(cambioView("form", "row"))}
                        >
                          Riga
                        </StyledNavDropdownItem>
                        <StyledNavDropdownItem as={NavLink} to="#" 
                          onClick={() => dispatch(cambioView("form", "card"))}
                        >
                          Carta
                        </StyledNavDropdownItem>
                      </>
                    )}
                  </StyledNavDropdown>
                </StyledSubMenuContainer>
              </StyledDropdownContainer>
            </StyledNavDropdown>

               
            {(autenticazioneSession.isLogged === false) && (
              <StyledNavLink as={NavLink} to="/login">Login</StyledNavLink>
            )}
            {(autenticazioneSession.isLogged === true) && (
              <>
                <StyledNavLink as={NavLink} to="/salone">Salone</StyledNavLink>
                <StyledNavLink as={NavLink} to="/profilo">Profilo</StyledNavLink>
                <StyledNavLink as={NavLink} to="/" onClick={logout}>Logout</StyledNavLink>
              </>
            )}
          </>
        </StyledNavRight>  
      </Navbar>
    </>
  );
}

export default NavbarSito;
