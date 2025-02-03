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
  handleInputChange, cambiamentoBloccato, getCampiRicerca, getCampiNuovoItem
} from '../../../vario/Vario';
import { 
  OperazioniNuovoItem, OperazioniCercaItems, OperazioniItemEsistente, 
  getTextAreaTag, getInputTag, 
  CardRicercaItems, CardNuovoItem, CardItemEsistente
} from './CardItem';

export function CardNuovoProfessionista({item, setItem, eseguiSalvataggio}) {
  let campi = {
    header: "Ricerca professionisti", 
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
      <CardNuovoItem 
        campi={campi}
        indici={indici}
        eseguiSalvataggio={eseguiSalvataggio}
      />
    </>
  );
}

export function CardRicercaProfessionisti({item, setItem, eseguiRicerca}) {
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
      <CardRicercaItems 
        campi={campi}
        indici={indici}
        eseguiRicerca={eseguiRicerca}
      />
    </>
  );
}

export function CardProfessionistaEsistente({item, items, setItems, selectOperation}) {
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
      <CardItemEsistente 
        item={item}
        campi={campi}
        indici={indici}
        selectOperation={selectOperation}
      />
    </>
  );
}








