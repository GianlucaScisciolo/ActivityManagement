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
  getTextAreaTag, getInputTag, getSelectTag
} from './RowItem';

export function RowNuovoCliente({item, setItem, eseguiSalvataggio}) {
  let InputTag = getInputTag(1, true);
  let TextAreaTag = getTextAreaTag(1, true);

  return (
    <>
      <StyledRow>
        <OperazioniNuovoItem eseguiSalvataggio={eseguiSalvataggio} />
        <StyledCol>
          <div style={{width: "100%"}}>
            <TextAreaTag rows="1" placeholder="Nome*" name="nome" value={item.nome} onChange={(e) => handleInputChange(e, setItem)} />
            {(item.errore_nome !== "") && (<StyledSpanErrore>{item.errore_nome}</StyledSpanErrore>)}
          </div>
        </StyledCol>
        <StyledCol>
          <div style={{width: "100%"}}>
            <TextAreaTag rows="1" placeholder="Cognome*" name="cognome" value={item.cognome} onChange={(e) => handleInputChange(e, setItem)} />
            {(item.errore_cognome !== "") && (<StyledSpanErrore>{item.errore_cognome}</StyledSpanErrore>)}
          </div>
        </StyledCol>
        <StyledCol>
          <div style={{width: "100%"}}>
            <InputTag rows="1" placeholder="Contatto*" type="text" name="contatto" value={item.contatto} onChange={(e) => handleInputChange(e, setItem)} />
            {(item.errore_contatto !== "") && (<StyledSpanErrore>{item.errore_contatto}</StyledSpanErrore>)}
          </div>
        </StyledCol>
        <StyledCol>
          <div style={{width: "100%"}}>
            <TextAreaTag rows="1" placeholder="Note" name="note" value={item.note} onChange={(e) => handleInputChange(e, setItem)} />
            {(item.errore_note !== "") && (<StyledSpanErrore>{item.errore_note}</StyledSpanErrore>)}
          </div>
        </StyledCol>
      </StyledRow>
    </>
  );
}

export function RowRicercaClienti({item, setItem, eseguiRicerca}) {
  let [visibilita, setVisibilita] = useState([true, true, true, true]);
  const [arrowUp, setArrowUp] = useState(true);
  let InputTag = getInputTag(1, true);
  let TextAreaTag = getTextAreaTag(1, true);

  return (
    <>
      <StyledRow>
        <OperazioniCercaItems 
          visibilita={visibilita} setVisibilita={setVisibilita} 
          arrowUp={arrowUp} setArrowUp={setArrowUp} eseguiRicerca={eseguiRicerca}
        />
        <StyledCol>
          {(visibilita[0]) && (
            <TextAreaTag rows="1" placeholder="Nome" name="nome" value={item.nome} onChange={(e) => handleInputChange(e, setItem)} />
          )}
        </StyledCol>
        <StyledCol>
          {(visibilita[1]) && (
            <TextAreaTag rows="1" placeholder="Cognome" name="cognome" value={item.cognome} onChange={(e) => handleInputChange(e, setItem)} />
          )}
        </StyledCol>
        <StyledCol>
          {(visibilita[2]) && (
            <InputTag rows="1" placeholder="Contatto" type="text" name="contatto" value={item.contatto} onChange={(e) => handleInputChange(e, setItem)} />
          )}
        </StyledCol>
        <StyledCol>
          {(visibilita[3]) && (
            <TextAreaTag rows="1" placeholder="Note" name="note" value={item.note} onChange={(e) => handleInputChange(e, setItem)} />
          )}
        </StyledCol>
      </StyledRow>
    </>
  );
}

export function RowClienteEsistente({item, items, setItems, selectOperation}) {
  let InputModificabileTag = getInputTag(item.tipo_selezione, true);
  let TextAreaModificabileTag = getTextAreaTag(item.tipo_selezione, true);
  let InputNonModificabileTag = getInputTag(item.tipo_selezione, false);
  let TextAreaNonModificabileTag = getTextAreaTag(item.tipo_selezione, false);
  
  return (
    <>
      <StyledRow>
        <OperazioniItemEsistente selectOperation={selectOperation} item={item} />
        <StyledCol>
          <TextAreaNonModificabileTag 
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
        </StyledCol>
        <StyledCol>
          <TextAreaNonModificabileTag 
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
        </StyledCol>
        <StyledCol>
        <InputModificabileTag 
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
        </StyledCol>
        <StyledCol>
          <TextAreaModificabileTag 
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
        </StyledCol>
      </StyledRow>
    </>
  );
}









