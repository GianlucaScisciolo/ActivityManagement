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
} from "../../../trasportabile/card_item/StyledCardItem";
import { 
  handleInputChange, cambiamentoBloccato
} from '../../../vario/Vario';

import { 
  OperazioniModificaProfilo, getInputTag, getTextAreaTag 
} from "../../../trasportabile/card_item/CardItem"

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
        </SlideContainer>
        <OperazioniModificaProfilo eseguiModificaProfilo={eseguiModificaProfilo} />
      </StyledCard> 
    </>
  );
}









