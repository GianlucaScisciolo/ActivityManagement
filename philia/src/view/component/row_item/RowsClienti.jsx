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
  handleInputChange, cambiamentoBloccato
} from '../../../vario/Vario';

import { 
  OperazioniNuovoItem, OperazioniCercaItems, OperazioniItemEsistente, 
  getTextAreaTag, getInputTag, getSelectTag, 
  RowNuovoItem, RowRicercaItems, RowItemEsistente
} from './RowItem';

export function RowNuovoCliente({item, setItem, eseguiSalvataggio}) {
  let campi = {
    header: "Nuovo cliente", 
    type: [null, null, "text", null],  
    name: ["nome", "cognome", "contatto", "note"], 
    value: [item.nome, item.cognome, item.contatto, item.note], 
    placeholder: ["Nome", "Cognome", "Contatto", "Note"],
    errore: [item.errore_nome, item.errore_cognome, item.errore_contatto, item.errore_note], 
    onChange: (e) => handleInputChange(e, setItem), 
    onClick: null, 
    onBlur: null
  }
  const indici = [0, 1, 2, 3];

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

export function RowRicercaClienti({item, setItem, eseguiRicerca}) {
  let campi = {
    header: "Ricerca clienti", 
    type: [null, null, "text", null],  
    name: ["nome", "cognome", "contatto", "note"], 
    value: [item.nome, item.cognome, item.contatto, item.note], 
    placeholder: ["Nome", "Cognome", "Contatto", "Note"], 
    onChange: (e) => handleInputChange(e, setItem), 
    onClick: null, 
    onBlur: null
  }
  const indici = [0, 1, 2, 3];

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

export function RowClienteEsistente({item, items, setItems, selectOperation}) {
  let campi = {
    header: "Cliente", 
    tipoSelezione: item.tipo_selezione,  
    type: [null, null, "text", null],  
    name: ["nome", "cognome", "contatto", "note"], 
    value: [item.nome, item.cognome, item.contatto, item.note], 
    placeholder: ["Nome", "Cognome", "Contatto", "Note"], 
    valoreModificabile: [false, false, true, true], 
    onChange: (e) => handleInputChange(e, setItems), 
    onClick: null, 
    onBlur: null
  }
  const indici = [0, 1, 2, 3];
  
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









