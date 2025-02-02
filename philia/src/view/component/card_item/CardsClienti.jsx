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
  getInputTag, getTextAreaTag
 } from './CardItem';


// function TextAreaTag({ tipoSelezione, nome, valore, modificabile, setItem, placeholder, items, setItems, tipoItem, id }) {
//   switch(tipoSelezione) {
//     case 0:
//       return <StyledTextAreaBlock rows="1" name={nome} placeholder={placeholder} value={valore} readOnly />;
//     case 1:
//       return (modificabile) ? <StyledTextAreaModifica rows="1" name={nome} placeholder={placeholder} value={valore} onChange={(e) => handleInputChange(e, setItem, items, setItems, tipoItem, id)} />
//                             : <StyledTextAreaBlock rows="1" name={nome} placeholder={placeholder} value={valore} readOnly />;
//     case 2:
//       return <StyledTextAreaElimina rows="1" name={nome} placeholder={placeholder} value={valore} readOnly />;
//     default:
//       return <> </>;
//   }
// }


// const InputTag = ({ tipoSelezione, nome, tipo, valore, modificabile, setItem, placeholder, items, setItems, tipoItem, id }) => {
//   switch(tipoSelezione) {
//     case 0:
//       return <StyledInputBlock rows="1" type={tipo} name={nome} placeholder={placeholder} value={valore}  readOnly />;
//     case 1:
//       return (modificabile) ? <StyledInputModifica rows="1" type={tipo} name={nome} placeholder={placeholder} value={valore} onChange={(e) => handleInputChange(e, setItem, items, setItems, tipoItem, id)} />
//                             : <StyledInputBlock rows="1" type={tipo} name={nome} placeholder={placeholder} value={valore} readOnly />;
//     case 2:
//       return <StyledInputElimina rows="1" type={tipo} name={nome} value={valore} placeholder={placeholder} readOnly />;
//     default:
//       return <></>;
//   }
// }

export function CardNuovoCliente({item, setItem, eseguiSalvataggio}) {
  let maxHeight = "2000px";
  let InputTag = getInputTag(1, true);
  let TextAreaTag = getTextAreaTag(1, true);

  return (
    <>
      <StyledCard>
        <StyledCardHeader>Nuovo cliente</StyledCardHeader>
        <SlideContainer style={{maxHeight: `${maxHeight}`}}>
          <TextAreaTag rows="1" placeholder="Nome*" name="nome" value={item.nome} onChange={(e) => handleInputChange(e, setItem)} />
          {(item.errore_nome !== "") && (<StyledSpanErrore>{item.errore_nome}</StyledSpanErrore>)}
          <TextAreaTag rows="1" placeholder="Cognome*" name="cognome" value={item.cognome} onChange={(e) => handleInputChange(e, setItem)} />
          {(item.errore_cognome !== "") && (<StyledSpanErrore>{item.errore_cognome}</StyledSpanErrore>)}
          <InputTag rows="1" placeholder="Contatto*" type="text" name="contatto" value={item.contatto} onChange={(e) => handleInputChange(e, setItem)} />
          {(item.errore_contatto !== "") && (<StyledSpanErrore>{item.errore_contatto}</StyledSpanErrore>)}
          <TextAreaTag rows="1" placeholder="Note" name="note" value={item.note} onChange={(e) => handleInputChange(e, setItem)} />
          {(item.errore_note !== "") && (<StyledSpanErrore>{item.errore_note}</StyledSpanErrore>)}
        </SlideContainer>
        <OperazioniNuovoItem eseguiSalvataggio={eseguiSalvataggio} />
      </StyledCard>
    </>
  );
}

export function CardCercaClienti({item, setItem, eseguiRicerca}) {
  const [isVisible, setIsVisible] = useState(true);
  const [arrowUp, setArrowUp] = useState(true);
  let maxHeight = (isVisible) ? "2000px" : "0px";
  let InputTag = getInputTag(1, true);
  let TextAreaTag = getTextAreaTag(1, true);

  return (
    <>
      <StyledCard>
        <StyledCardHeader>Ricerca clienti</StyledCardHeader>
        <SlideContainer style={{maxHeight: `${maxHeight}`}}>
          <TextAreaTag rows="1" placeholder="Nome" name="nome" value={item.nome} onChange={(e) => handleInputChange(e, setItem)} />
          <TextAreaTag rows="1" placeholder="Cognome" name="cognome" value={item.cognome} onChange={(e) => handleInputChange(e, setItem)} />
          <InputTag rows="1" placeholder="Contatto" type="text" name="contatto" value={item.contatto} onChange={(e) => handleInputChange(e, setItem)} />
          <TextAreaTag rows="1" placeholder="Note" name="note" value={item.note} onChange={(e) => handleInputChange(e, setItem)} />
        </SlideContainer>
        <OperazioniCercaItems setIsVisible={setIsVisible} arrowUp={arrowUp} setArrowUp={setArrowUp} eseguiRicerca={eseguiRicerca} />
      </StyledCard>
    </>
  );
}

export function CardClienteEsistente({item, items, setItems, selectOperation}) {
  let maxHeight = "2000px";
  let InputModificabileTag = getInputTag(item.tipo_selezione, true);
  let TextAreaModificabileTag = getTextAreaTag(item.tipo_selezione, true);
  let InputNonModificabileTag = getInputTag(item.tipo_selezione, false);
  let TextAreaNonModificabileTag = getTextAreaTag(item.tipo_selezione, false);

  return (
    <>
      <StyledCard>
        <StyledCardHeader>Cliente</StyledCardHeader>
        <SlideContainer style={{maxHeight: `${maxHeight}`}}>
          <TextAreaNonModificabileTag 
            rows={1}
            tipoSelezione={item.tipo_selezione} 
            nome="nome" 
            valore={item.nome} 
            modificabile={false} 
            placeholder="Nome*" 
            items={items} 
            setItems={setItems} 
            tipoItem={"cliente"} 
            id={item.id}
          />
          <TextAreaNonModificabileTag 
            rows={1}
            tipoSelezione={item.tipo_selezione} 
            nome="cognome" 
            valore={item.cognome} 
            modificabile={false} 
            placeholder="Cognome*" 
            items={items} 
            setItems={setItems} 
            tipoItem={"cliente"} 
            id={item.id}
          />
          <InputModificabileTag 
            rows={1}
            tipoSelezione={item.tipo_selezione} 
            nome="contatto" 
            tipo="text" 
            valore={item.contatto} 
            modificabile={true} 
            placeholder="Contatto*" 
            items={items} 
            setItems={setItems} 
            tipoItem={"cliente"} 
            id={item.id} 
          />
          <TextAreaModificabileTag 
            rows={1}
            tipoSelezione={item.tipo_selezione} 
            nome="note" 
            valore={item.note} 
            modificabile={true} 
            placeholder="Note" 
            items={items} 
            setItems={setItems} 
            tipoItem={"cliente"} 
            id={item.id}
          />
        </SlideContainer>
        <OperazioniItemEsistente selectOperation={selectOperation} item={item} />
      </StyledCard>
    </>
  );
}








