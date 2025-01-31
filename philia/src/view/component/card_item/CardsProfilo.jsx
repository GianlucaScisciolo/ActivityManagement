import React, { useState, useEffect } from 'react';
import ListGroup from 'react-bootstrap/ListGroup';
import Row from 'react-bootstrap/esm/Row';
import Col from 'react-bootstrap/esm/Col';
import { Trash2, Pencil, Plus, Search } from 'lucide-react';
import { HookItems } from '../../../vario/HookItems';
import { useSelector, useDispatch } from 'react-redux';
import { formatoDate, formatoTime } from '../../../vario/Tempo';
import { 
  StyledCard, StyledRow, StyledCol, StyledCardHeader, grandezzaIcona,
  StyledTextAreaBlock, StyledTextAreaModifica, StyledTextAreaElimina,
  StyledInputBlock, StyledInputModifica, StyledInputElimina, 
  StyledListGroupItem, SlideContainer, 
  StyledSaveNotSelected, StyledSearchNotSelected, 
  StyledPencilNotSelected, StyledPencilSelected, 
  StyledTrashNotSelected, StyledTrashSelected, 
  StyledArrowTopNotSelected, StyledArrowBottomNotSelected, StyledPencilNotSelectedModificaProfilo, 
  StyledSelect, StyledOption, StyledSpanErrore, StyledLoginNotSelected, StyledPencilNotSelected2
} from './StyledCardItem';
import { 
  handleInputChange, cambiamentoBloccato, getCampiRicerca, getCampiNuovoItem
} from '../../../vario/Vario';

const OperazioniModificaProfilo = ({eseguiModificaProfilo}) => {
  return (
    <StyledListGroupItem style={{ border: "5px solid #000000", backgroundColor: "#000000", paddingTop: "3%", paddingBottom: "3%" }}>
      <StyledPencilNotSelected2 size={grandezzaIcona} onClick={eseguiModificaProfilo} />
    </StyledListGroupItem>
  );
};

export function CardModificaProfilo({ item, setItem, eseguiModificaProfilo }) {
  let maxHeight = "2000px";

  return (
    <>
      <StyledCard>
        <StyledCardHeader>Profilo</StyledCardHeader>
        <SlideContainer style={{maxHeight: `${maxHeight}`}}>
          <StyledTextAreaModifica rows="1" name="nuovo_username" placeholder='Nuovo username*' value={item.nuovo_username} onChange={(e) => handleInputChange(e, setItem)} />
          {(item.errore_nuovo_username !== "") && (<StyledSpanErrore>{item.errore_nuovo_username}</StyledSpanErrore>)}

          <StyledTextAreaModifica rows="1" name="note" placeholder='Note' value={item.note} onChange={(e) => handleInputChange(e, setItem)} />
          {(item.errore_note !== "") && (<StyledSpanErrore>{item.errore_note}</StyledSpanErrore>)}

          <StyledInputModifica rows="1" type="password" name="password_attuale" placeholder='Password attuale*' value={item.password_attuale} onChange={(e) => handleInputChange(e, setItem)} />
          {(item.errore_password_attuale !== "") && (<StyledSpanErrore>{item.errore_password_attuale}</StyledSpanErrore>)}

          <StyledInputModifica rows="1" type="password" name="nuova_password" placeholder='Nuova password' value={item.nuova_password} onChange={(e) => handleInputChange(e, setItem)} />
          {(item.errore_nuova_password !== "") && (<StyledSpanErrore>{item.errore_nuova_password}</StyledSpanErrore>)}

          <StyledInputModifica rows="1" type="password" name="conferma_nuova_password" placeholder='Conferma nuova password' value={item.conferma_nuova_password} onChange={(e) => handleInputChange(e, setItem)} />
          {(item.errore_conferma_nuova_password !== "") && (<StyledSpanErrore>{item.errore_conferma_nuova_password}</StyledSpanErrore>)}

          <Row>
            <Col style={{ padding: '0', margin: '0', paddingLeft: '19px' }}>
              <StyledInputModifica style={{width: "100%"}} rows="1" value={item.num_lavori_clienti} type="number" name="lavori_cliente" placeholder='Lavori cliente'  onChange={(e) => handleInputChange(e, setItem)} />
            </Col>
            <Col style={{ padding: '0', margin: '0'}}>
              <StyledInputModifica style={{width: "100%"}} rows="1" value={item.num_lavori_professionisti} type="number" name="lavori_professionista" placeholder='Lavori professionista' onChange={(e) => handleInputChange(e, setItem)} />
            </Col>
            <Col style={{ padding: '0', margin: '0', paddingRight: '19px' }}>
              <StyledInputModifica style={{width: "100%"}} rows="1" value={item.num_lavori_giorno} type="number" name="lavori_giorno" placeholder='Lavori giorno' onChange={(e) => handleInputChange(e, setItem)} />
            </Col>
            {(item.errore_num_lavori_clienti !== "") && (<StyledSpanErrore>{item.errore_num_lavori_clienti}</StyledSpanErrore>)}
            {(item.errore_num_lavori_professionisti !== "") && (<StyledSpanErrore>{item.errore_num_lavori_professionisti}</StyledSpanErrore>)}
            {(item.errore_num_lavori_giorno !== "") && (<StyledSpanErrore>{item.errore_num_lavori_giorno}</StyledSpanErrore>)}
          </Row>
        </SlideContainer>
        <OperazioniModificaProfilo eseguiModificaProfilo={eseguiModificaProfilo} />
      </StyledCard>
      {/* 
      <button>Numero di clienti in una giornata</button><br /> <br />
      <button>Numero di professionisti in una giornata</button><br /> <br />
        In una giornata ci sono 3 fasci orari:
        - mattina    --> 07:00 - 13:00 
        - pomeriggio --> 13:00 - 19:00
        - sera       --> 19: 00 - 06:00
      */} 
    </>
  );
}









