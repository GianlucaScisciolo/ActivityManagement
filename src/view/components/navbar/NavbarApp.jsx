// React e Redux
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import Navbar from 'react-bootstrap/Navbar';
import 'bootstrap/dist/css/bootstrap.min.css';
import { House } from 'lucide-react';
// View
import immagineSfondo1 from "../../img/immagine_sfondo1.jpg"
import immagineSfondo2 from "../../img/immagine_sfondo2.png"
import { 
  StyledNavLeft, StyledNavCenter, StyledNavRight, StyledNavDropdown, StyledNavDropdownItem, 
  StyledDropdownContainer, StyledSubMenuContainer, StyledNavLink, StyledNavLinkHome
} from './StyledNavbarApp';
// Actions
import { AutenticazioneActions } from "../../../actions/AutenticazioneActions"
import { StileActions } from '../../../actions/StileActions';

export const NavbarApp = () => {
  const autenticazioneActions = new AutenticazioneActions();
  const stileActions = new StileActions()
  const autenticazioneState = useSelector((state) => state.autenticazioneSliceReducer.value);
  const stileState = useSelector((state) => state.stileSliceReducer.value);
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
  
  const applicaStileBody = () => {
    if (stileState.pathImg !== null) {
      document.body.style.backgroundImage = `url(${stileState.pathImg})`;
      document.body.style.backgroundRepeat = 'no-repeat';
      document.body.style.backgroundSize = 'cover';
      document.body.style.backgroundAttachment = 'fixed';
      document.body.style.backgroundPosition = 'center';
      document.body.style.height = '100vh';
  
      // Nasconde solo lo scorrimento orizzontale
      document.documentElement.style.overflowX = 'hidden';
      document.documentElement.style.maxWidth = '100%';
      document.documentElement.style.maxHeight = '100%';
    } 
    else if (stileState.coloreRGB !== null) {
      document.body.style.backgroundImage = 'none';
      document.body.style.backgroundColor = stileState.coloreRGB;
  
      // Nasconde solo lo scorrimento orizzontale
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
  }, [stileState]);

  return (
    <>
      <Navbar expand="lg">
        <StyledNavLeft>
          {(autenticazioneState.isLogged === true) && (
            <>
              <StyledNavLink as={NavLink} to="/clienti">Clienti</StyledNavLink>
              <StyledNavLink as={NavLink} to="/servizi">Servizi</StyledNavLink>
              <StyledNavDropdown title="Lavori" show={dropdownLavori}
                onMouseEnter={() => handleMouseEnter(setDropdownLavori)}
                onMouseLeave={() => handleMouseLeave(setDropdownLavori)}
              >
                <StyledNavDropdownItem as={NavLink} to="/lavori">Lavori</StyledNavDropdownItem>
                <StyledNavDropdownItem as="a" href="https://calendar.google.com/calendar/u/0/appointments/schedules/AcZssZ2GRuG5B0k6Qyo2DLBkT1-OOXXC1XO60HQkWAl3Txvc3z-PcBL0EYhfc62sAor46nbg-szeiADZ" target="_blank" rel="noopener noreferrer">Prenotazione</StyledNavDropdownItem>
              </StyledNavDropdown>
              <StyledNavLink as={NavLink} to="/spese">Spese</StyledNavLink>
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
                          onClick={() => stileActions.cambioSfondo("img", immagineSfondo1)}
                        >
                          Immagine 1
                        </StyledNavDropdownItem>
                        <StyledNavDropdownItem as={NavLink} to="#" 
                          onClick={() => stileActions.cambioSfondo("img", immagineSfondo2)}
                        >
                          Immagine 2
                        </StyledNavDropdownItem>
                        <StyledNavDropdownItem as={NavLink} to="#" 
                          onClick={() => stileActions.cambioSfondo("rgb", "#111111")}
                        >
                          Sfondo scuro
                        </StyledNavDropdownItem>
                        <StyledNavDropdownItem as={NavLink} to="#" 
                          onClick={() => stileActions.cambioSfondo("rgb", "#8F8F8F")}
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
                          onClick={() => stileActions.cambioVista("item", "list")}
                        >
                          Riga
                        </StyledNavDropdownItem>
                        <StyledNavDropdownItem as={NavLink} to="#" 
                          onClick={() => stileActions.cambioVista("item", "card")}
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
                          onClick={() => stileActions.cambioVista("form", "form")}
                        >
                          Form
                        </StyledNavDropdownItem>
                        <StyledNavDropdownItem as={NavLink} to="#" 
                          onClick={() => stileActions.cambioVista("form", "row")}
                        >
                          Riga
                        </StyledNavDropdownItem>
                        <StyledNavDropdownItem as={NavLink} to="#" 
                          onClick={() => stileActions.cambioVista("form", "card")}
                        >
                          Carta
                        </StyledNavDropdownItem>
                      </>
                    )}
                  </StyledNavDropdown>
                </StyledSubMenuContainer>
              </StyledDropdownContainer>
            </StyledNavDropdown>

               
            {(autenticazioneState.isLogged === false) && (
              <StyledNavLink as={NavLink} to="/login">Login</StyledNavLink>
            )}
            {(autenticazioneState.isLogged === true) && (
              <>
                <StyledNavLink as={NavLink} to="/salone">Salone</StyledNavLink>
                <StyledNavLink as={NavLink} to="/profilo">Profilo</StyledNavLink>
                <StyledNavLink as={NavLink} to="/" onClick={autenticazioneActions.logout}>Logout</StyledNavLink>
              </>
            )}
          </>
        </StyledNavRight>  
      </Navbar>
    </>
  );
}









