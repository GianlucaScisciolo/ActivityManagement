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
  StyledSelect, StyledOption, StyledSpanErrore, StyledLoginNotSelected
} from './StyledCardItem';
import { 
  handleInputChange, cambiamentoBloccato
} from '../../../vario/Vario';
import { 
  OperazioniNuovoItem, OperazioniCercaItems, OperazioniItemEsistente, 
  getInputTag, getTextAreaTag, 
  CardRicercaItems, CardNuovoItem, CardItemEsistente
} from './CardItem';

export function CardNuovoCliente({item, setItem, eseguiSalvataggio}) {
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
      <CardNuovoItem 
        campi={campi}
        indici={indici}
        eseguiSalvataggio={eseguiSalvataggio}
      />
    </>
  );
}

export function CardRicercaClienti({item, setItem, eseguiRicerca}) {
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
      <CardRicercaItems 
        item={item}
        campi={campi}
        indici={indici}
        eseguiRicerca={eseguiRicerca}
      />
    </>
  );
}

export function CardClienteEsistente({item, items, setItems, selectOperation}) {
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
      <CardItemEsistente 
        item={item}
        campi={campi}
        indici={indici}
        selectOperation={selectOperation}
      />
    </>
  );
}








