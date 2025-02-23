import React, { useState, useEffect } from 'react';
import { formatoDate, formatoTime } from "../../../vario/Tempo";
import { 
  StyledRow, StyledCol, StyledColBlack, StyledColOperazioni, StyledColAnimato, SlideContainer, grandezzaIcona, 
  StyledTextAreaBlock, StyledTextAreaModifica, StyledTextAreaElimina, 
  StyledInputBlock, StyledInputModifica, StyledInputElimina, 
  StyledSaveNotSelected, StyledSearchNotSelected, 
  StyledArrowLeftNotSelected, StyledArrowRightNotSelected,  
  StyledPencilNotSelected, StyledPencilSelected, 
  StyledTrashNotSelected, StyledTrashSelected, StyledPencilNotSelectedModificaProfilo, 
  StyledSelect, StyledOption, StyledSpanErrore, StyledLoginNotSelected
} from "../../../trasportabile/row_item/StyledRowItem";
import { 
  handleInputChange, cambiamentoBloccato
} from "../../../vario/Vario";

import { OperazioniModificaProfilo, getInputTag, getTextAreaTag } from "../../../trasportabile/row_item/RowItem"

export function RowModificaProfilo({ item, setItem, eseguiModificaProfilo }) {
  let InputTag = getInputTag(1, true);
  let TextAreaTag = getTextAreaTag(1, true);

  return (
    <>
      <StyledRow>
        <OperazioniModificaProfilo eseguiModificaProfilo={eseguiModificaProfilo} />
        <StyledCol>
          <div style={{width: "100%"}}>
            <TextAreaTag rows="1" name="nuovo_username" placeholder='Nuovo username*' value={item.nuovo_username} onChange={(e) => handleInputChange(e, setItem)} />
            {(item.errore_nuovo_username !== "") && (<StyledSpanErrore>{item.errore_nuovo_username}</StyledSpanErrore>)}
          </div>
        </StyledCol>
        <StyledCol>
          <div style={{width: "100%"}}>
            <TextAreaTag rows="1" name="note" placeholder='Note' value={item.note} onChange={(e) => handleInputChange(e, setItem)} />
            {(item.errore_note !== "") && (<StyledSpanErrore>{item.errore_note}</StyledSpanErrore>)}
          </div>
        </StyledCol>
        <StyledCol>
          <div style={{width: "100%"}}>
            <InputTag rows="1" type="password" name="password_attuale" placeholder='Password attuale*' value={item.password_attuale} onChange={(e) => handleInputChange(e, setItem)} />
            {(item.errore_password_attuale !== "") && (<StyledSpanErrore>{item.errore_password_attuale}</StyledSpanErrore>)}
          </div>
        </StyledCol>
        <StyledCol>
          <div style={{width: "100%"}}>
            <InputTag rows="1" type="password" name="nuova_password" placeholder='Nuova password' value={item.nuova_password} onChange={(e) => handleInputChange(e, setItem)} />
            {(item.errore_nuova_password !== "") && (<StyledSpanErrore>{item.errore_nuova_password}</StyledSpanErrore>)}
          </div>
        </StyledCol>
        <StyledCol>
          <div style={{width: "100%"}}>
            <InputTag rows="1" type="password" name="conferma_nuova_password" placeholder='Conferma nuova password' value={item.conferma_nuova_password} onChange={(e) => handleInputChange(e, setItem)} />
            {(item.errore_conferma_nuova_password !== "") && (<StyledSpanErrore>{item.errore_conferma_nuova_password}</StyledSpanErrore>)}
          </div>
        </StyledCol>
      </StyledRow>
    </>
  );
}










