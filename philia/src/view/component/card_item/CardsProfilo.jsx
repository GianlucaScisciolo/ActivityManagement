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
  handleInputChange, cambiamentoBloccato
} from '../../../vario/Vario';

import { 
  OperazioniModificaProfilo 
} from './CardItem';

export function CardModificaProfilo({ item, setItem, eseguiModificaProfilo }) {
  let maxHeight = "2000px";
  let InputTag = getInputTag(1, true);
  let TextAreaTag = getTextAreaTag(1, true);

  return (
    <>
      <StyledCard>
        <StyledCardHeader>Profilo</StyledCardHeader>
        <SlideContainer style={{maxHeight: `${maxHeight}`}}>
          <TextAreaTag rows="1" name="nuovo_username" placeholder='Nuovo username*' value={item.nuovo_username} onChange={(e) => handleInputChange(e, setItem)} />
          {(item.errore_nuovo_username !== "") && (<StyledSpanErrore>{item.errore_nuovo_username}</StyledSpanErrore>)}

          <TextAreaTag rows="1" name="note" placeholder='Note' value={item.note} onChange={(e) => handleInputChange(e, setItem)} />
          {(item.errore_note !== "") && (<StyledSpanErrore>{item.errore_note}</StyledSpanErrore>)}

          <InputTag rows="1" type="password" name="password_attuale" placeholder='Password attuale*' value={item.password_attuale} onChange={(e) => handleInputChange(e, setItem)} />
          {(item.errore_password_attuale !== "") && (<StyledSpanErrore>{item.errore_password_attuale}</StyledSpanErrore>)}

          <InputTag rows="1" type="password" name="nuova_password" placeholder='Nuova password' value={item.nuova_password} onChange={(e) => handleInputChange(e, setItem)} />
          {(item.errore_nuova_password !== "") && (<StyledSpanErrore>{item.errore_nuova_password}</StyledSpanErrore>)}

          <InputTag rows="1" type="password" name="conferma_nuova_password" placeholder='Conferma nuova password' value={item.conferma_nuova_password} onChange={(e) => handleInputChange(e, setItem)} />
          {(item.errore_conferma_nuova_password !== "") && (<StyledSpanErrore>{item.errore_conferma_nuova_password}</StyledSpanErrore>)}

          <Row>
            <Col style={{ padding: '0', margin: '0', paddingLeft: '19px' }}>
              <InputTag style={{width: "100%"}} rows="1" value={item.num_lavori_clienti} type="number" name="num_lavori_clienti" placeholder='Lavori cliente'  onChange={(e) => handleInputChange(e, setItem)} />
            </Col>
            <Col style={{ padding: '0', margin: '0'}}>
              <InputTag style={{width: "100%"}} rows="1" value={item.num_lavori_professionisti} type="number" name="num_lavori_professionisti" placeholder='Lavori professionista' onChange={(e) => handleInputChange(e, setItem)} />
            </Col>
            <Col style={{ padding: '0', margin: '0', paddingRight: '19px' }}>
              <InputTag style={{width: "100%"}} rows="1" value={item.num_lavori_giorno} type="number" name="num_lavori_giorno" placeholder='Lavori giorno' onChange={(e) => handleInputChange(e, setItem)} />
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









