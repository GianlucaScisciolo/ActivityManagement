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

import { OperazioniModificaProfilo } from './FormItem';

export function FormModificaProfilo({ item, setItem, eseguiModificaProfilo }) {
  let maxHeight = "2000px";

  return (
    <>
      <StyledForm>
        <StyledHeader>Profilo</StyledHeader>
        <SlideContainer style={{maxHeight: `${maxHeight}`}}>
          <StyledLabel>Username*</StyledLabel>
          <StyledTextAreaModifica rows="1" name="nuovo_username" placeholder='Nuovo username*' value={item.nuovo_username} onChange={(e) => handleInputChange(e, setItem)} />
          {(item.errore_nuovo_username !== "") && (<StyledSpanErrore>{item.errore_nuovo_username}</StyledSpanErrore>)}

          <StyledLabel>Note</StyledLabel>
          <StyledTextAreaModifica rows="1" name="note" placeholder='Note' value={item.note} onChange={(e) => handleInputChange(e, setItem)} />
          {(item.errore_note !== "") && (<StyledSpanErrore>{item.errore_note}</StyledSpanErrore>)}

          <StyledLabel>Password attuale*</StyledLabel>
          <StyledInputModifica rows="1" type="password" name="password_attuale" placeholder='Password attuale*' value={item.password_attuale} onChange={(e) => handleInputChange(e, setItem)} />
          {(item.errore_password_attuale !== "") && (<StyledSpanErrore>{item.errore_password_attuale}</StyledSpanErrore>)}

          <StyledLabel>Nuova password</StyledLabel>
          <StyledInputModifica rows="1" type="password" name="nuova_password" placeholder='Nuova password' value={item.nuova_password} onChange={(e) => handleInputChange(e, setItem)} />
          {(item.errore_nuova_password !== "") && (<StyledSpanErrore>{item.errore_nuova_password}</StyledSpanErrore>)}

          <StyledLabel>Conferma nuova password</StyledLabel>
          <StyledInputModifica rows="1" type="password" name="conferma_nuova_password" placeholder='Conferma nuova password' value={item.conferma_nuova_password} onChange={(e) => handleInputChange(e, setItem)} />
          {(item.errore_conferma_nuova_password !== "") && (<StyledSpanErrore>{item.errore_conferma_nuova_password}</StyledSpanErrore>)}
          
          <StyledLabel htmlFor="orario_inizio">Numero di lavori*</StyledLabel>
          <Row>
            <Col style={{ padding: '0', margin: '0', paddingLeft: '19px' }}>
              <StyledInputModifica style={{width: "100%"}} rows="1" value={item.num_lavori_clienti} type="number" name="num_lavori_clienti" placeholder='Lavori cliente'  onChange={(e) => handleInputChange(e, setItem)} />
            </Col>
            <Col style={{ padding: '0', margin: '0'}}>
              <StyledInputModifica style={{width: "100%"}} rows="1" value={item.num_lavori_professionisti} type="number" name="num_lavori_professionisti" placeholder='Lavori professionista' onChange={(e) => handleInputChange(e, setItem)} />
            </Col>
            <Col style={{ padding: '0', margin: '0', paddingRight: '19px' }}>
              <StyledInputModifica style={{width: "100%"}} rows="1" value={item.num_lavori_giorno} type="number" name="num_lavori_giorno" placeholder='Lavori giorno' onChange={(e) => handleInputChange(e, setItem)} />
            </Col>
          </Row>
          {(item.errore_num_lavori_clienti !== "") && (<StyledSpanErrore>{item.errore_num_lavori_clienti}</StyledSpanErrore>)}
          {(item.errore_num_lavori_professionisti !== "") && (<StyledSpanErrore>{item.errore_num_lavori_professionisti}</StyledSpanErrore>)}
          {(item.errore_num_lavori_giorno !== "") && (<StyledSpanErrore>{item.errore_num_lavori_giorno}</StyledSpanErrore>)}

          <br /> <br /> 
        </SlideContainer>
        <OperazioniModificaProfilo eseguiModificaProfilo={eseguiModificaProfilo} />
      </StyledForm>
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






