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

import { OperazioniNuovoItem, OperazioniCercaItems, OperazioniItemEsistente } from './CardItem';

const TextAreaTag = ({ tipoSelezione, nome, valore, modificabile, setItem, placeholder, items, setItems, tipoItem, id }) => {
  switch(tipoSelezione) {
    case 0:
      return <StyledTextAreaBlock rows="1" name={nome} placeholder={placeholder} value={valore} readOnly />;
    case 1:
      return (modificabile) ? <StyledTextAreaModifica rows="1" name={nome} placeholder={placeholder} value={valore} onChange={(e) => handleInputChange(e, setItem, items, setItems, tipoItem, id)} />
                            : <StyledTextAreaBlock rows="1" name={nome} placeholder={placeholder} value={valore} readOnly />;
    case 2:
      return <StyledTextAreaElimina rows="1" name={nome} placeholder={placeholder} value={valore} readOnly />;
    default:
      return <></>;
  }
}

const InputTag = ({ tipoSelezione, nome, tipo, valore, modificabile, setItem, placeholder, items, setItems, tipoItem, id }) => { 
  switch(tipoSelezione) {
    case 0:
      return <StyledInputBlock rows="1" type={tipo} name={nome} placeholder={placeholder} value={valore}  readOnly />;
    case 1:
      return (modificabile) ? <StyledInputModifica rows="1" type={tipo} name={nome} placeholder={placeholder} value={valore} onChange={(e) => handleInputChange(e, setItem, items, setItems, tipoItem, id)} />
                            : <StyledInputBlock rows="1" type={tipo} name={nome} placeholder={placeholder} value={valore} readOnly />;
    case 2:
      return <StyledInputElimina rows="1" type={tipo} name={nome} value={valore} placeholder={placeholder} readOnly />;
    default:
      return <></>;
  }
}

export function CardNuovoProfessionista({item, setItem, eseguiSalvataggio}) {
  let maxHeight = "2000px";

  return (
    <>
      <StyledCard>
        <StyledCardHeader>Nuovo professionista</StyledCardHeader>
        <StyledTextAreaModifica rows="1" placeholder="Nome*" name="nome" value={item.nome} onChange={(e) => handleInputChange(e, setItem)} />
        {(item.errore_nome !== "") && (<StyledSpanErrore>{item.errore_nome}</StyledSpanErrore>)}
        <StyledTextAreaModifica rows="1" placeholder="Professione*" name="professione" value={item.professione} onChange={(e) => handleInputChange(e, setItem)} />
        {(item.errore_professione !== "") && (<StyledSpanErrore>{item.errore_professione}</StyledSpanErrore>)}
        <StyledInputModifica rows="1" placeholder="Contatto" type="text" name="contatto" value={item.contatto} onChange={(e) => handleInputChange(e, setItem)} />
        {(item.errore_contatto !== "") && (<StyledSpanErrore>{item.errore_contatto}</StyledSpanErrore>)}
        <StyledInputModifica rows="1" placeholder="Email" type="text" name="email" value={item.email} onChange={(e) => handleInputChange(e, setItem)} />
        {(item.errore_email !== "") && (<StyledSpanErrore>{item.errore_email}</StyledSpanErrore>)}
        <StyledTextAreaModifica rows="1" placeholder="Note" name="note" value={item.note} onChange={(e) => handleInputChange(e, setItem)} />
        {(item.errore_note !== "") && (<StyledSpanErrore>{item.errore_note}</StyledSpanErrore>)}
        <OperazioniNuovoItem eseguiSalvataggio={eseguiSalvataggio} />
      </StyledCard>
    </>
  );
}

export function CardCercaProfessionisti({item, setItem, eseguiRicerca}) {
  const [isVisible, setIsVisible] = useState(true);
  const [arrowUp, setArrowUp] = useState(true);
  let maxHeight = (isVisible) ? "2000px" : "0px";

  return (
    <>
      <StyledCard>
        <StyledCardHeader>Ricerca professionisti</StyledCardHeader>
        <SlideContainer style={{maxHeight: `${maxHeight}`}}>
          <StyledTextAreaModifica rows="1" placeholder="Nome" name="nome" value={item.nome} onChange={(e) => handleInputChange(e, setItem)} />
          <StyledTextAreaModifica rows="1" placeholder="Professione" name="professione" value={item.professione} onChange={(e) => handleInputChange(e, setItem)} />
          <StyledInputModifica rows="1" placeholder="Contatto" type="text" name="contatto" value={item.contatto} onChange={(e) => handleInputChange(e, setItem)} />
          <StyledInputModifica rows="1" placeholder="Email" type="text" name="email" value={item.email} onChange={(e) => handleInputChange(e, setItem)} />
          <StyledTextAreaModifica rows="1" placeholder="Note" name="note" value={item.note} onChange={(e) => handleInputChange(e, setItem)} />
        </SlideContainer>
        <OperazioniCercaItems setIsVisible={setIsVisible} arrowUp={arrowUp} setArrowUp={setArrowUp} eseguiRicerca={eseguiRicerca} />
      </StyledCard>
    </>
  );
}

export function CardProfessionistaEsistente({item, items, setItems, selectOperation}) {
  let maxHeight = "2000px";

  return (
    <>
      <StyledCard>
        <StyledCardHeader>Professionista</StyledCardHeader>
        <SlideContainer style={{maxHeight: `${maxHeight}`}}>
          <TextAreaTag 
            tipoSelezione={item.tipo_selezione} 
            nome="nome" 
            valore={item.nome} 
            modificabile={false} 
            placeholder="Nome*" 
            items={items} 
            setItems={setItems} 
            tipoItem={"professionista"} 
            id={item.id}
          />
          <TextAreaTag 
            tipoSelezione={item.tipo_selezione} 
            nome="professione" 
            valore={item.professione} 
            modificabile={false} 
            placeholder="Professione*" 
            items={items} 
            setItems={setItems} 
            tipoItem={"professionista"} 
            id={item.id}
          />
          <InputTag 
            tipoSelezione={item.tipo_selezione} 
            nome="contatto" 
            tipo="text" 
            valore={item.contatto} 
            modificabile={true} 
            placeholder="Contatto" 
            items={items} 
            setItems={setItems} 
            tipoItem={"professionista"} 
            id={item.id} 
          />
          <InputTag 
            tipoSelezione={item.tipo_selezione} 
            nome="email" 
            tipo="text" 
            valore={item.email} 
            modificabile={true} 
            placeholder="Email" 
            items={items} 
            setItems={setItems} 
            tipoItem={"professionista"} 
            id={item.id} 
          />
          <TextAreaTag 
            tipoSelezione={item.tipo_selezione} 
            nome="note" 
            valore={item.note} 
            modificabile={true} 
            placeholder="Note" 
            items={items} 
            setItems={setItems} 
            tipoItem={"professionista"} 
            id={item.id}
          />
          {/* <StyledTextAreaModifica rows="1" placeholder="Nome" name="nome" value={item.nome} onChange={(e) => handleInputChange(e, setItem)} /> */}
          {/* <StyledTextAreaModifica rows="1" placeholder="Professione" name="professione" value={item.professione} onChange={(e) => handleInputChange(e, setItem)} /> */}
          {/* <StyledInputModifica rows="1" placeholder="Contatto" type="text" name="contatto" value={item.contatto} onChange={(e) => handleInputChange(e, setItem)} /> */}
          {/* <StyledInputModifica rows="1" placeholder="Email" type="text" name="email" value={item.email} onChange={(e) => handleInputChange(e, setItem)} /> */}
          {/* <StyledTextAreaModifica rows="1" placeholder="Note" name="note" value={item.note} onChange={(e) => handleInputChange(e, setItem)} /> */}
        </SlideContainer>
        <OperazioniItemEsistente selectOperation={selectOperation} item={item} />
      </StyledCard>
    </>
  );
}








