// Bootstrap
import 'bootstrap/dist/css/bootstrap.min.css';
// React e Redux
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import Navbar from 'react-bootstrap/Navbar';
// View
import negozio from "../../img/sfondi/negozio.jpg";
import scrivania from "../../img/sfondi/scrivania.jpg";
import legno from "../../img/sfondi/legno.jpg";
import mongolfiera from "../../img/sfondi/mongolfiera.jpg";
import montagne from "../../img/sfondi/montagne.jpg";
import salone from "../../img/sfondi/salone_barbiere.jpg";
import italiano from "../../img/img_icons/italiano.png";
import inglese from "../../img/img_icons/inglese.png";
import logo from "../../img/Logo.png";
import { 
  StyledNavLeft, StyledNavCenter, StyledNavRight, StyledNavDropdown, StyledNavDropdownItem, 
  StyledDropdownContainer, StyledSubMenuContainer, StyledNavLink, StyledNavLinkHome
} from './StyledNavbarApp';
// Actions
import { AutenticazioneActions } from "../../../actions/AutenticazioneActions"
import { StileActions } from '../../../actions/StileActions';
import { SaloneActions } from '../../../actions/SaloneActions';

export const NavbarApp = () => {
  const autenticazioneActions = new AutenticazioneActions();
  const saloneActions = new SaloneActions();
  const stileActions = new StileActions()
  const autenticazioneState = useSelector((state) => state.autenticazioneSliceReducer.value);
  const saloneState = useSelector((state) => state.saloneSliceReducer.value);
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
    setDropdown(false);
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
      alert(saloneState.lingua === "italiano" ? "Errore." : "Error.");
    }
  }

  const handleContextMenu = (event) => {
    event.preventDefault(); // Impedisce il menu contestuale
  };
  
  useEffect(() => {
    applicaStileBody();
  }, [stileState]);

  return (
    <>
      <Navbar expand="lg">
        <StyledNavLeft>
          {(autenticazioneState.isLogged === true) ? (
            <>
              <StyledNavLink as={NavLink} to="/clienti" onContextMenu={handleContextMenu}>{saloneState.lingua === "italiano" ? "Clienti" : "Clients"}</StyledNavLink>
              <StyledNavLink as={NavLink} to="/servizi" onContextMenu={handleContextMenu}>{saloneState.lingua === "italiano" ? "Servizi" : "Services"}</StyledNavLink>
              <StyledNavLink as={NavLink} to="/lavori" onContextMenu={handleContextMenu}>{saloneState.lingua === "italiano" ? "Lavori" : "Jobs"}</StyledNavLink>
              <StyledNavLink as={NavLink} to="/spese" onContextMenu={handleContextMenu}>{saloneState.lingua === "italiano" ? "Spese" : "Expenses"}</StyledNavLink>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              &nbsp;&nbsp;
            </>
          ) : (
            <>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            </>
          )}
        </StyledNavLeft>  

        <StyledNavCenter>
          <StyledNavLinkHome as={NavLink} to="/" onContextMenu={handleContextMenu}>
            <img src={logo} alt="Logo" style={{width:"70px"}}  />
          </StyledNavLinkHome>
        </StyledNavCenter>

        <StyledNavRight>
          <>
            <StyledNavDropdown title={saloneState.lingua === "italiano" ? "Stile" : "Style"} show={dropdownStile}
              onMouseEnter={() => setDropdownStile(true)}
              onMouseLeave={() => setDropdownStile(false)}
              onContextMenu={handleContextMenu}
            >
              <StyledDropdownContainer>
                <StyledSubMenuContainer>
                  <StyledNavDropdown title={saloneState.lingua === "italiano" ? "Sfondo" : "Background"} show={dropdownSfondo}
                    onMouseEnter={() => setDropdownSfondo(true)}
                    onMouseLeave={() => setDropdownSfondo(false)}
                  >
                    {(dropdownSfondo === true) && (
                      <>
                        <StyledNavDropdownItem as={NavLink} to="#" 
                          onClick={() => stileActions.cambioSfondo("img", montagne)}
                        >
                          {saloneState.lingua === "italiano" ? "Montagne" : "Mountains"}
                        </StyledNavDropdownItem>
                        <StyledNavDropdownItem as={NavLink} to="#" 
                          onClick={() => stileActions.cambioSfondo("img", mongolfiera)}
                        >
                          {saloneState.lingua === "italiano" ? "Mongolfiera" : "Hot Air Balloon"}
                        </StyledNavDropdownItem>
                        <StyledNavDropdownItem as={NavLink} to="#" 
                          onClick={() => stileActions.cambioSfondo("img", negozio)}
                        >
                          {saloneState.lingua === "italiano" ? "Negozio" : "Store"}
                        </StyledNavDropdownItem>
                        <StyledNavDropdownItem as={NavLink} to="#" 
                          onClick={() => stileActions.cambioSfondo("img", salone)}
                        >
                          {saloneState.lingua === "italiano" ? "Salone" : "Salon"}
                        </StyledNavDropdownItem>

                        

                        <StyledNavDropdownItem as={NavLink} to="#" 
                          onClick={() => stileActions.cambioSfondo("img", scrivania)}
                        >
                          {saloneState.lingua === "italiano" ? "Scrivania" : "Desk"}
                        </StyledNavDropdownItem>
                        <StyledNavDropdownItem as={NavLink} to="#" 
                          onClick={() => stileActions.cambioSfondo("img", legno)}
                        >
                          {saloneState.lingua === "italiano" ? "Legno" : "Wood"}
                        </StyledNavDropdownItem>


                        <StyledNavDropdownItem as={NavLink} to="#" 
                          onClick={() => stileActions.cambioSfondo("rgb", "#111111")}
                        >
                          {saloneState.lingua === "italiano" ? "Sfondo scuro" : "Dark background"}
                        </StyledNavDropdownItem>
                        <StyledNavDropdownItem as={NavLink} to="#" 
                          onClick={() => stileActions.cambioSfondo("rgb", "#8F8F8F")}
                        >
                          {saloneState.lingua === "italiano" ? "Sfondo chiaro" : "Light background"}
                        </StyledNavDropdownItem>
                      </>
                    )}
                  </StyledNavDropdown>
                  <StyledNavDropdown title={saloneState.lingua === "italiano" ? "Elemento" : "Item"} show={dropdownItem}
                    onMouseEnter={() => setDropdownItem(true)}
                    onMouseLeave={() => setDropdownItem(false)}
                  >
                    {(dropdownItem === true) && (
                      <>
                        <StyledNavDropdownItem as={NavLink} to="#" 
                          onClick={() => stileActions.cambioVista("item", "list")}
                        >
                          {saloneState.lingua === "italiano" ? "Riga" : "Row"}
                        </StyledNavDropdownItem>
                        <StyledNavDropdownItem as={NavLink} to="#" 
                          onClick={() => stileActions.cambioVista("item", "card")}
                        >
                          {saloneState.lingua === "italiano" ? "Carta" : "Card"}
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
                          {saloneState.lingua === "italiano" ? "Riga" : "Row"}
                        </StyledNavDropdownItem>
                        <StyledNavDropdownItem as={NavLink} to="#" 
                          onClick={() => stileActions.cambioVista("form", "card")}
                        >
                          {saloneState.lingua === "italiano" ? "Carta" : "Card"}
                        </StyledNavDropdownItem>
                      </>
                    )}
                  </StyledNavDropdown>
                </StyledSubMenuContainer>
              </StyledDropdownContainer>
            </StyledNavDropdown>

               
            {(autenticazioneState.isLogged === false) && (
              <StyledNavLink as={NavLink} to="/login" onContextMenu={handleContextMenu}>Login</StyledNavLink>
            )}
            {(autenticazioneState.isLogged === true) && (
              <>
                <StyledNavLink as={NavLink} to="/analisi" onContextMenu={handleContextMenu}>{saloneState.lingua === "italiano" ? "Analisi" : "Analyses"}</StyledNavLink>
                <StyledNavLink as={NavLink} to="/profilo" onContextMenu={handleContextMenu}>{saloneState.lingua === "italiano" ? "Profilo" : "Profile"}</StyledNavLink>
                <StyledNavLink as={NavLink} to="/" onClick={autenticazioneActions.logout} onContextMenu={handleContextMenu}>Logout</StyledNavLink>
              </>
            )}
            <StyledNavLink as={NavLink} to="#" onClick={(e) => saloneActions.modificaLingua(e)} onContextMenu={handleContextMenu}>
              {(saloneState.lingua === "italiano") ? (
                <img src={italiano} style={{width:"50px", height:"auto"}} alt="Italian" />
              ) : (
                <img src={inglese} style={{width:"50px", height:"auto"}} alt="Italian" />
              )}
            </StyledNavLink>
          </>
        </StyledNavRight>  
      </Navbar>
    </>
  );
}









