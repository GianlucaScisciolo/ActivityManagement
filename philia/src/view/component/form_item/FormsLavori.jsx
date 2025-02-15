import React, { useState, useEffect, useRef } from 'react';
import { faFilePdf, faFileExcel } from '@fortawesome/free-solid-svg-icons';
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
  StyledSpanErrore, StyledLoginNotSelected, StyledFileIconNotSelected, 
  StyledDownloadNotSelected, StyledDeleteNotSelected, StyledTrashNotSelected
} from "./StyledFormItem";
import { 
  handleInputChange, selezionaInserimentoLavoroCliente, selezionaInserimentoLavoroProfessionista
} from '../../../vario/Vario';

import { 
  OperazioniNuovoItem, OperazioniCercaItems 
} from './FormItem';

function OperazioniFileItems({ottieniLavoriRangePDF, ottieniLavoriRangeExcel, eliminaLavoriRange}) {
  return (
    <StyledListGroupItem style={{ border: "5px solid #000000", backgroundColor: "#000000", paddingTop: "3%" }}>
      <div>
        <StyledFileIconNotSelected icon={faFilePdf} size="2xl" style={{ marginRight: "50%" }} />
        <StyledFileIconNotSelected icon={faFileExcel} size="2xl" />
      </div>
      <br />
      <div>
        <StyledDownloadNotSelected size={grandezzaIcona} style={{ marginRight: "50%" }} onClick={ottieniLavoriRangePDF} />
        <StyledDownloadNotSelected size={grandezzaIcona} onClick={ottieniLavoriRangeExcel} />
      </div>
      <br />
      <div>
        <StyledTrashNotSelected size={grandezzaIcona} onClick={eliminaLavoriRange} />
      </div>
      <br />
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

function selezionaDeselezionaBottone(e, setValue) {
  e.preventDefault();

  const nome_campi = ["lavoro_cliente_selezionato", "lavoro_professionista_selezionato"]
  
  const { name } = e.target;

  if(nome_campi.includes(name)) {
    if(name === "lavoro_cliente_selezionato") {
      setValue(prevState => ({
        ...prevState,
        "lavoro_cliente_selezionato": !prevState["lavoro_cliente_selezionato"],
        "lavoro_professionista_selezionato": false
      }))
    }
    else if(name === "lavoro_professionista_selezionato") {
      setValue(prevState => ({
        ...prevState,
        "lavoro_professionista_selezionato": !prevState["lavoro_professionista_selezionato"],
        "lavoro_cliente_selezionato": false
      }))
    }
  }
  else {
    alert("Errore, nome campo " + name + " non valido.");
  }
}

export function FormNuovoLavoro({
  lavoriGiornoSelezionato, setLavoriGiornoSelezionato, handleInputChangeGiorno, handleGiornoBlur, 
  clienti, professionisti, item, setItem, eseguiSalvataggio
}) {
  const ore = ["07", "08", "09", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22"];
  const minuti = ["00", "30"];
  let maxHeight = "2000px";

  const [giornoType, setGiornoType] = useState('text');
  const giornoValue = item.giorno !== undefined ? item.giorno : '';

  return (
    <>
      <StyledForm>
        <StyledHeader>Nuovo lavoro</StyledHeader>  
        <SlideContainer style={{maxHeight: `${maxHeight}`}}>
          <Row>
            <Col style={{ padding: '0', margin: '0', paddingLeft: '19px' }}>
              <StyledLabel htmlFor="id_cliente">Cliente</StyledLabel>
              <StyledSelect style={{width: "100%"}} name="id_cliente" value={item.id_cliente} onChange={(e) => handleInputChange(e, setItem)}>
                <StyledOption value="0">Seleziona il cliente</StyledOption>
                {clienti.map((cliente) => (
                  <StyledOption key={cliente.id} value={cliente.id}>{cliente.nome + " " + cliente.cognome}</StyledOption>  
                ))}
              </StyledSelect>
            </Col>
            <Col style={{ padding: '0', margin: '0', paddingRight: '19px' }}>
              <StyledLabel htmlFor="id_professionista">Professionista</StyledLabel>
              <StyledSelect style={{width: "100%"}} name="id_professionista" value={item.id_professionista} onChange={(e) => handleInputChange(e, setItem)}>
                <StyledOption value="0">Seleziona il professionista</StyledOption>
                {professionisti.map((professionista) => (
                  <StyledOption key={professionista.id} value={professionista.id}>{professionista.nome + " - " + professionista.professione}</StyledOption>  
                ))}
              </StyledSelect>
            </Col>
          </Row>
          {(item.errore_cliente_e_professionista !== "") && (<StyledSpanErrore>{item.errore_cliente_e_professionista}</StyledSpanErrore>)}
          
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
          {(item.errore_giorno !== "") && (<StyledSpanErrore>{item.errore_giorno}</StyledSpanErrore>)}
          
          <StyledLabel htmlFor="orario_inizio">Orario inizio*</StyledLabel>
          <Row>
            <Col style={{ padding: '0', margin: '0', paddingLeft: '19px' }}>
              <StyledSelect style={{width: "100%"}} name="ora_inizio" value={item.ora_inizio} onChange={(e) => cambioValoriOrari(e, setItem)}>
                <StyledOption value="">Ora inizio</StyledOption>
                {ore.map((ora) => (
                  <StyledOption key={ora} value={ora}>{ora}</StyledOption>  
                ))}
              </StyledSelect>
            </Col>
            <Col style={{ padding: '0', margin: '0', paddingRight: '19px' }}>
              <StyledSelect style={{width: "100%"}} name="minuto_inizio" value={item.minuto_inizio} onChange={(e) => cambioValoriOrari(e, setItem)}>
                <StyledOption value="">Minuto inizio</StyledOption>
                {minuti.map((minuto) => (
                  <StyledOption key={minuto} value={minuto}>{minuto}</StyledOption>  
                ))}
              </StyledSelect>
            </Col>
          </Row>
          {(item.errore_orario_inizio !== "") && (<StyledSpanErrore>{item.errore_orario_inizio}</StyledSpanErrore>)}
          
          <StyledLabel htmlFor="orario_fine">Orario fine*</StyledLabel>
          <Row>
            <Col style={{ padding: '0', margin: '0', paddingLeft: '19px' }}>
              <StyledSelect style={{width: "100%"}}name="ora_fine" value={item.ora_fine} onChange={(e) => cambioValoriOrari(e, setItem)}>
                <StyledOption value="">Ora fine</StyledOption>
                {ore.map((ora) => (
                  <StyledOption key={ora} value={ora}>{ora}</StyledOption>  
                ))}
              </StyledSelect>
            </Col>
            <Col style={{ padding: '0', margin: '0', paddingRight: '19px' }}>
              <StyledSelect style={{width: "100%"}} name="minuto_fine" value={item.minuto_fine} onChange={(e) => cambioValoriOrari(e, setItem)}>
                <StyledOption value="">Minuto fine</StyledOption>
                {minuti.map((minuto) => (
                  <StyledOption key={minuto} value={minuto}>{minuto}</StyledOption>  
                ))}
              </StyledSelect>
            </Col>
          </Row>
          {(item.errore_orario_fine !== "") && (<StyledSpanErrore>{item.errore_orario_fine}</StyledSpanErrore>)}
          
          <StyledLabel htmlFor="descrizione">Descrizione*</StyledLabel>
          <StyledTextAreaModifica
            rows="1"
            placeholder="Descrizione*"
            name="descrizione"
            value={item.descrizione}
            onChange={(e) => handleInputChange(e, setItem)}
          />
          {(item.errore_descrizione !== "") && (<StyledSpanErrore>{item.errore_descrizione}</StyledSpanErrore>)}
          
          <StyledLabel htmlFor="note">Note</StyledLabel>
          <StyledTextAreaModifica
            rows="1"
            placeholder="Note"
            name="note"
            value={item.note}
            onChange={(e) => handleInputChange(e, setItem)}
          />
          {(item.errore_note !== "") && (<StyledSpanErrore>{item.errore_note}</StyledSpanErrore>)}
          <br /> <br />
        </SlideContainer>
        <OperazioniNuovoItem eseguiSalvataggio={eseguiSalvataggio} />
      </StyledForm>
    </>
  );
}

export function FormRicercaLavori({item, setItem, eseguiRicerca}) {
  const ore = ["07", "08", "09", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22"];
  const minuti = ["00", "30"];
  const [isVisible, setIsVisible] = useState(true);
  const [arrowUp, setArrowUp] = useState(true);
  let maxHeight = (isVisible) ? "2000px" : "0px";

  const [primoGiornoType, setPrimoGiornoType] = useState('text');
  const [ultimoGiornoType, setUltimoGiornoType] = useState('text');

  item.primo_giorno = (item.primo_giorno !== undefined) ? item.primo_giorno : '';
  item.ultimo_giorno = (item.ultimo_giorno !== undefined) ? item.ultimo_giorno : '';

  return (
    <>
      <StyledForm>
        <StyledHeader>Ricerca lavori</StyledHeader>  
        <SlideContainer style={{maxHeight: `${maxHeight}`}}>
          <StyledLabel htmlFor="nome_cliente">Nome cliente</StyledLabel>
          <StyledInputModifica
            rows="1"
            placeholder="Nome cliente"
            type="text"
            name="nome_cliente"
            value={item.nome_cliente}
            onChange={(e) => handleInputChange(e, setItem)}
          />
          <StyledLabel htmlFor="cognome_cliente">Cognome cliente</StyledLabel>
          <StyledInputModifica
            rows="1"
            placeholder="Cognome cliente"
            type="text"
            name="cognome_cliente"
            value={item.cognome_cliente}
            onChange={(e) => handleInputChange(e, setItem)}
          />
          <StyledLabel htmlFor="nome_professionista">Nome professionista</StyledLabel>
          <StyledInputModifica
            rows="1"
            placeholder="Nome professionista"
            type="text"
            name="nome_professionista"
            value={item.nome_professionista}
            onChange={(e) => handleInputChange(e, setItem)}
          />
          <StyledLabel htmlFor="professione">Professione</StyledLabel>
          <StyledInputModifica
            rows="1"
            placeholder="Professione"
            type="text"
            name="professione"
            value={item.professione}
            onChange={(e) => handleInputChange(e, setItem)}
          />
          <StyledLabel htmlFor="primo_giorno">Primo giorno</StyledLabel>
          <StyledInputModifica
            rows="1"
            placeholder="Primo giorno"
            type={primoGiornoType}
            name="primo_giorno"
            value={item.primo_giorno}
            onClick={handleGiornoClick(setPrimoGiornoType)}
            onBlur={handleGiornoBlur(setPrimoGiornoType, item, setItem)}
            onChange={(e) => handleInputChange(e, setItem)}
          />
          <StyledLabel htmlFor="ultimo_giorno">ultimo giorno</StyledLabel>
          <StyledInputModifica
            rows="1"
            placeholder="Ultimo giorno"
            type={ultimoGiornoType}
            name="ultimo_giorno"
            value={item.ultimo_giorno}
            onClick={handleGiornoClick(setUltimoGiornoType)}
            onBlur={handleGiornoBlur(setUltimoGiornoType, item, setItem)}
            onChange={(e) => handleInputChange(e, setItem)}
          />
          <StyledLabel htmlFor="descrizione">Descrizione</StyledLabel>
          <StyledTextAreaModifica
            rows="1"
            placeholder="Descrizione"
            name="descrizione"
            value={item.descrizione}
            onChange={(e) => handleInputChange(e, setItem)}
          />
          <StyledLabel htmlFor="note">Note</StyledLabel>
          <StyledTextAreaModifica
            rows="1"
            placeholder="Note"
            name="note"
            value={item.note}
            onChange={(e) => handleInputChange(e, setItem)}
          />
          <br /> <br />
        </SlideContainer>
      <OperazioniCercaItems setIsVisible={setIsVisible} arrowUp={arrowUp} setArrowUp={setArrowUp} eseguiRicerca={eseguiRicerca} />
      </StyledForm>
    </>
  );
}

export function FormFileLavori({item, setItem, ottieniLavoriRangePDF, ottieniLavoriRangeExcel, eliminaLavoriRange}) {
  const [primoGiornoType, setPrimoGiornoType] = useState('text');
  const [ultimoGiornoType, setUltimoGiornoType] = useState('text');
  let maxHeight = "2000px";

  item.primo_giorno = (item.primo_giorno !== undefined) ? item.primo_giorno : '';
  item.ultimo_giorno = (item.ultimo_giorno !== undefined) ? item.ultimo_giorno : '';

  return (
    <>
      <StyledForm>
        <StyledHeader>File lavori</StyledHeader>
        <SlideContainer style={{maxHeight: `${maxHeight}`}}>
          <StyledLabel htmlFor="primo_giorno">Primo giorno</StyledLabel>
          <StyledInputModifica
            rows="1"
            placeholder="Primo giorno"
            type={primoGiornoType}
            name="primo_giorno"
            value={item.primo_giorno}
            onClick={handleGiornoClick(setPrimoGiornoType)}
            onBlur={handleGiornoBlur(setPrimoGiornoType, item, setItem)}
            onChange={(e) => handleInputChange(e, setItem)}
          />
          
          <StyledLabel htmlFor="ultimo_giorno">ultimo giorno</StyledLabel>
          <StyledInputModifica
            rows="1"
            placeholder="Ultimo giorno"
            type={ultimoGiornoType}
            name="ultimo_giorno"
            value={item.ultimo_giorno}
            onClick={handleGiornoClick(setUltimoGiornoType)}
            onBlur={handleGiornoBlur(setUltimoGiornoType, item, setItem)}
            onChange={(e) => handleInputChange(e, setItem)}
          />

          <br /> <br />
        </SlideContainer>
        <OperazioniFileItems 
          ottieniLavoriRangePDF={ottieniLavoriRangePDF} 
          ottieniLavoriRangeExcel={ottieniLavoriRangeExcel} 
          eliminaLavoriRange={eliminaLavoriRange} 
        />
      </StyledForm>
    </>
  );
}







