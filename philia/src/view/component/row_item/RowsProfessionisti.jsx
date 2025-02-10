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
} from "./StyledRowItem";
import { 
  handleInputChange, cambiamentoBloccato, getCampiRicerca, getCampiNuovoItem
} from '../../../vario/Vario';
import { 
  OperazioniNuovoItem, OperazioniCercaItems, OperazioniItemEsistente, 
  getTextAreaTag, getInputTag, getSelectTag, 
  RowNuovoItem, RowRicercaItems, RowItemEsistente
} from './RowItem';

export function RowNuovoProfessionista({item, setItem, eseguiSalvataggio}) {
  let campi = {
    header: "Nuovo professionista", 
    type: [null, null, "text", "text", null], 
    name: ["nome", "professione", "contatto", "email", "note"], 
    value: [item.nome, item.professione, item.contatto, item.email, item.note], 
    placeholder: ["Nome", "Professione", "Contatto", "Email", "Note"], 
    errore: [item.errore_nome, item.errore_professione, item.errore_contatto, item.errore_email, item.errore_note], 
    onChange: (e) => handleInputChange(e, setItem), 
    onClick: null, 
    onBlur: null
  }
  const indici = [0, 1, 2, 3, 4];

  return (
    <>
      <RowNuovoItem 
        campi={campi}
        indici={indici}
        eseguiSalvataggio={eseguiSalvataggio}
      />
    </>
  );
}

export function RowRicercaProfessionisti({item, setItem, eseguiRicerca}) {
  let campi = {
    header: "Ricerca professionisti", 
    type: [null, null, "text", "text", null], 
    name: ["nome", "professione", "contatto", "email", "note"], 
    value: [item.nome, item.professione, item.contatto, item.email, item.note], 
    placeholder: ["Nome", "Professione", "Contatto", "Email", "Note"], 
    onChange: (e) => handleInputChange(e, setItem), 
    onClick: null, 
    onBlur: null
  }
  const indici = [0, 1, 2, 3, 4];

  return (
    <>
      <RowRicercaItems 
        item={item}
        campi={campi}
        indici={indici}
        eseguiRicerca={eseguiRicerca}
      />
    </>
  );
}

export function RowProfessionistaEsistente({item, items, setItems, selectOperation}) {
  let campi = {
    header: "Professionista", 
    tipoSelezione: item.tipo_selezione,
    type: [null, null, "text", "text", null], 
    name: ["nome", "professione", "contatto", "email", "note"], 
    value: [item.nome, item.professione, item.contatto, item.email, item.note], 
    placeholder: ["Nome", "Professione", "Contatto", "Email", "Note"], 
    valoreModificabile: [false, false, true, true, true], 
    onChange: (e) => handleInputChange(e, setItems), 
    onClick: null, 
    onBlur: null
  }
  const indici = [0, 1, 2, 3, 4];
  
  return (
    <>
      <RowItemEsistente 
        item={item}
        campi={campi}
        indici={indici}
        selectOperation={selectOperation}
      />
    </>
  );
}









