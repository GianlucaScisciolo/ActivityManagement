import React, { useState, useEffect, useRef } from 'react';
import Row from 'react-bootstrap/esm/Row';
import Col from 'react-bootstrap/esm/Col';
import ListGroup from 'react-bootstrap/ListGroup';
import { formatoDate, formatoTime } from "../../../vario/Tempo";
import { 
  StyledForm, StyledListGroupItem, StyledRow, StyledCol, 
  StyledLabel, StyledHeader, grandezzaIcona, SlideContainer, 
  StyledTextAreaBlock, StyledTextAreaModifica, StyledTextAreaElimina, 
  StyledInputBlock, StyledInputModifica, StyledInputElimina, 
  StyledSaveNotSelected, StyledSearchNotSelected, StyledPencilNotSelected,  
  StyledArrowTopNotSelected, StyledArrowBottomNotSelected, StyledSelect, StyledOption, 
  BottoneBluNonSelezionato, BottoneBluSelezionato, BottoneRossoNonSelezionato, BottoneRossoSelezionato, 
  StyledSpanErrore, StyledLoginNotSelected
} from "./StyledFormItem";
import { 
  handleInputChange, getCampiRicerca, getCampiNuovoItem, selezionaInserimentoLavoroCliente, selezionaInserimentoLavoroProfessionista
} from '../../../vario/Vario';

const nascondiForm = (setIsVisible, setArrowUp) => {
  setIsVisible(prev => !prev);
  
  setTimeout(() => {
    setArrowUp(prev => !prev);
  }, 1000); 
};

function OperazioniNuovoItem({eseguiSalvataggio}) {
  return (
    <StyledListGroupItem style={{border: "5px solid #000000", backgroundColor:"#000000", paddingTop: "3%"}}>
      <StyledRow>
        <StyledCol>
          <StyledSaveNotSelected size={grandezzaIcona} onClick={eseguiSalvataggio} />
        </StyledCol>
      </StyledRow>
    </StyledListGroupItem>
  )
}

function OperazioniCercaItems({ setIsVisible, arrowUp, setArrowUp, eseguiRicerca }) {
  return (
    <StyledListGroupItem style={{ border: "5px solid #000000", backgroundColor: "#000000", paddingTop: "3%" }}>
      <StyledSearchNotSelected size={grandezzaIcona} style={{ marginRight: "50%" }} onClick={eseguiRicerca} />
      {arrowUp && (
        <StyledArrowTopNotSelected size={grandezzaIcona} onClick={() => nascondiForm(setIsVisible, setArrowUp)} />
      )}
      {!arrowUp && (
        <StyledArrowBottomNotSelected size={grandezzaIcona} onClick={() => nascondiForm(setIsVisible, setArrowUp)} />
      )}
    </StyledListGroupItem>
  );
};

const handleGiornoClick = (setGiornoType) => {
  return () => {
    setGiornoType('date');
  };
};

const handleGiornoBlur = (setGiornoType, item, setItem) => {
  return () => {
    if(!item.giorno)
      setGiornoType('text');
    else
      setGiornoType('date');
  };
};

function cambioValoriOrari(e, setValue) {
  e.preventDefault();

  const nome_campi = [
    "ora_inizio", "ora_fine", "minuto_inizio", "minuto_fine"
  ]
  
  const { name, value } = e.target;

  if(nome_campi.includes(name)) {
    setValue(prevState => ({
      ...prevState,
      [name]: value
    }))
  }
  else {
    alert("Errore, nome campo " + name + " non valido.");
  }
}

export function FormNuovaData({item, setItem, eseguiSalvataggio}) {
  const ore = ["07", "08", "09", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22"];
  const minuti = ["00", "30"];
  const [isVisible, setIsVisible] = useState(true);
  const [arrowUp, setArrowUp] = useState(true);
  let maxHeight = "2000px";

  const [giornoType, setGiornoType] = useState('text');
  const [orario, setOrario] = useState({
    ora_inizio: "", 
    ora_fine: "",
    minuto_inizio: "", 
    minuto_fine: ""
  });

  const giornoValue = item.giorno !== undefined ? item.giorno : '';

  return (
    <>
      <StyledForm>
        <StyledHeader>Data</StyledHeader>  
        <SlideContainer style={{maxHeight: `${maxHeight}`}}>
          <StyledLabel htmlFor="giorno">Giorno*</StyledLabel>
          <StyledInputModifica
            rows="1"
            placeholder="Giorno*"
            type={giornoType}
            name="giorno"
            value={giornoValue}
            onClick={handleGiornoClick(setGiornoType)}
            onBlur={handleGiornoBlur(setGiornoType, item, setItem)}
            onChange={(e) => handleInputChange(e, setItem)}
          />
          <StyledLabel htmlFor="orario_inizio">Orario inizio*</StyledLabel>
          <Row>
            <Col style={{ padding: '0', margin: '0', paddingLeft: '19px' }}>
              <StyledSelect style={{width: "100%"}} name="ora_inizio" value={orario.ora_inizio} onChange={(e) => cambioValoriOrari(e, setOrario)}>
                <StyledOption value="">Ora inizio</StyledOption>
                {ore.map((ora) => (
                  <StyledOption key={ora} value={ora}>{ora}</StyledOption>  
                ))}
              </StyledSelect>
            </Col>
            <Col style={{ padding: '0', margin: '0', paddingRight: '19px' }}>
              <StyledSelect style={{width: "100%"}} name="minuto_inizio" value={orario.minuto_inizio} onChange={(e) => cambioValoriOrari(e, setOrario)}>
                <StyledOption value="">Minuto inizio</StyledOption>
                {minuti.map((minuto) => (
                  <StyledOption key={minuto} value={minuto}>{minuto}</StyledOption>  
                ))}
              </StyledSelect>
            </Col>
          </Row>
          <StyledLabel htmlFor="orario_fine">Orario fine*</StyledLabel>
          <Row>
            <Col style={{ padding: '0', margin: '0', paddingLeft: '19px' }}>
              <StyledSelect style={{width: "100%"}}name="ora_fine" value={orario.ora_fine} onChange={(e) => cambioValoriOrari(e, setOrario)}>
                <StyledOption value="">Ora fine</StyledOption>
                {ore.map((ora) => (
                  <StyledOption key={ora} value={ora}>{ora}</StyledOption>  
                ))}
              </StyledSelect>
            </Col>
            <Col style={{ padding: '0', margin: '0', paddingRight: '19px' }}>
              <StyledSelect style={{width: "100%"}}name="minuto_fine" value={orario.minuto_fine} onChange={(e) => cambioValoriOrari(e, setOrario)}>
                <StyledOption value="">Minuto fine</StyledOption>
                {minuti.map((minuto) => (
                  <StyledOption key={minuto} value={minuto}>{minuto}</StyledOption>  
                ))}
              </StyledSelect>
            </Col>
          </Row>
          <br /> <br />
        </SlideContainer>
        <OperazioniNuovoItem eseguiSalvataggio={eseguiSalvataggio} />
      </StyledForm>
    </>
  );
}

export function FormCercaDate({item, setItem, eseguiRicerca}) {
  const ore = ["07", "08", "09", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22"];
  const minuti = ["00", "30"];
  const [isVisible, setIsVisible] = useState(true);
  const [arrowUp, setArrowUp] = useState(true);
  let maxHeight = (isVisible) ? "2000px" : "0px";

  const [giornoType, setGiornoType] = useState('text');
  const [orario, setOrario] = useState({
    ora_inizio: "", 
    ora_fine: "",
    minuto_inizio: "", 
    minuto_fine: ""
  });

  const giornoValue = item.giorno !== undefined ? item.giorno : '';

  return (
    <>
      <StyledForm>
        <StyledHeader>Ricerca date</StyledHeader>  
        <SlideContainer style={{maxHeight: `${maxHeight}`}}>
          <StyledLabel htmlFor="giorno">Giorno*</StyledLabel>
          <StyledInputModifica
            rows="1"
            placeholder="Giorno*"
            type={giornoType}
            name="giorno"
            value={giornoValue}
            onClick={handleGiornoClick(setGiornoType)}
            onBlur={handleGiornoBlur(setGiornoType, item, setItem)}
            onChange={(e) => handleInputChange(e, setItem)}
          />
          <StyledLabel htmlFor="orario_inizio">Orario inizio*</StyledLabel>
          <Row>
            <Col style={{ padding: '0', margin: '0', paddingLeft: '19px' }}>
              <StyledSelect style={{width: "100%"}} name="ora_inizio" value={orario.ora_inizio} onChange={(e) => cambioValoriOrari(e, setOrario)}>
                <StyledOption value="">Ora inizio</StyledOption>
                {ore.map((ora) => (
                  <StyledOption key={ora} value={ora}>{ora}</StyledOption>  
                ))}
              </StyledSelect>
            </Col>
            <Col style={{ padding: '0', margin: '0', paddingRight: '19px' }}>
              <StyledSelect style={{width: "100%"}} name="minuto_inizio" value={orario.minuto_inizio} onChange={(e) => cambioValoriOrari(e, setOrario)}>
                <StyledOption value="">Minuto inizio</StyledOption>
                {minuti.map((minuto) => (
                  <StyledOption key={minuto} value={minuto}>{minuto}</StyledOption>  
                ))}
              </StyledSelect>
            </Col>
          </Row>
          <StyledLabel htmlFor="orario_fine">Orario fine*</StyledLabel>
          <Row>
            <Col style={{ padding: '0', margin: '0', paddingLeft: '19px' }}>
              <StyledSelect style={{width: "100%"}}name="ora_fine" value={orario.ora_fine} onChange={(e) => cambioValoriOrari(e, setOrario)}>
                <StyledOption value="">Ora fine</StyledOption>
                {ore.map((ora) => (
                  <StyledOption key={ora} value={ora}>{ora}</StyledOption>  
                ))}
              </StyledSelect>
            </Col>
            <Col style={{ padding: '0', margin: '0', paddingRight: '19px' }}>
              <StyledSelect style={{width: "100%"}}name="minuto_fine" value={orario.minuto_fine} onChange={(e) => cambioValoriOrari(e, setOrario)}>
                <StyledOption value="">Minuto fine</StyledOption>
                {minuti.map((minuto) => (
                  <StyledOption key={minuto} value={minuto}>{minuto}</StyledOption>  
                ))}
              </StyledSelect>
            </Col>
          </Row>
          <br /> <br />
        </SlideContainer>
      <OperazioniCercaItems setIsVisible={setIsVisible} arrowUp={arrowUp} setArrowUp={setArrowUp} eseguiRicerca={eseguiRicerca} />
      </StyledForm>
    </>
  );
}









