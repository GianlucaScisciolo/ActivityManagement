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

const nascondiForm = (visibilita, setVisibilita, setArrowUp) => {
  const steps = visibilita.length;
  for (let i = 1; i <= steps; i++) {
    setTimeout(() => {
      setVisibilita(prevState => {
        const newState = [...prevState];
        newState[steps - i] = false;
        return newState;
      });
    }, i * 250);
  }
  setTimeout(() => {
    setArrowUp(prev => !prev);
  }, steps * 250);
};

const mostraForm = (visibilita, setVisibilita, setArrowUp) => {
  const steps = visibilita.length;
  for (let i = 1; i <= steps; i++) {
    setTimeout(() => {
      setVisibilita(prevState => {
        const newState = [...prevState];
        newState[i - 1] = true;
        return newState;
      });
    }, i * 250);
  }
  setTimeout(() => {
    setArrowUp(prev => !prev);
  }, steps * 250);
};

const PencilTag = ({ tipoSelezione, selectOperation, item }) => {
  switch(tipoSelezione) {
    case 0:
    case 2:
      return <StyledPencilNotSelected size={grandezzaIcona} style={{ marginRight: "50%" }}  onClick={() => selectOperation("pencil", item)} />;
    case 1:
      return <StyledPencilSelected size={grandezzaIcona} style={{ marginRight: "50%" }}  onClick={() => selectOperation("pencil", item)} />;
    default:
      return <></>;
  }
}

const TrashTag = ({ tipoSelezione, selectOperation, item }) => {
  switch(tipoSelezione) {
    case 0:
    case 1:
      return <StyledTrashNotSelected size={grandezzaIcona} onClick={() => selectOperation("trash", item)} />;
    case 2:
      return <StyledTrashSelected size={grandezzaIcona} onClick={() => selectOperation("trash", item)} />;
    default:
      return <></>;
  }
}

function OperazioniNuovoItem({eseguiSalvataggio}) {
  return (
    <StyledColOperazioni>
      <StyledSaveNotSelected size={grandezzaIcona} onClick={eseguiSalvataggio} />
    </StyledColOperazioni>
  )
}

const OperazioniCercaItems = ({ visibilita, setVisibilita, arrowUp, setArrowUp, eseguiRicerca }) => {
  return (
    <StyledColOperazioni>
      <StyledSearchNotSelected size={grandezzaIcona} style={{ marginRight: "50%" }} onClick={eseguiRicerca} />
      {arrowUp && (
        <StyledArrowLeftNotSelected size={grandezzaIcona} onClick={() => nascondiForm(visibilita, setVisibilita, setArrowUp)} />
      )}
      {!arrowUp && (
        <StyledArrowRightNotSelected size={grandezzaIcona} onClick={() => mostraForm(visibilita, setVisibilita, setArrowUp)} />
      )}
    </StyledColOperazioni>
  );
};

function OperazioniItemEsistente ({ tipoSelezione, selectOperation, item }) {
  return (
    <StyledColOperazioni>
      <PencilTag tipoSelezione={item.tipo_selezione} selectOperation={selectOperation} item={item} />
      <TrashTag tipoSelezione={item.tipo_selezione} selectOperation={selectOperation} item={item} />
    </StyledColOperazioni>
  )
}

export function RowNuovoCliente({item, setItem, eseguiSalvataggio}) {
  // const [visibilita, setVisibilita] = useState(Array(Object.keys(item).length).fill(true));
  const [arrowUp, setArrowUp] = useState(true);

  return (
    <>
      <StyledRow>
        <OperazioniNuovoItem eseguiSalvataggio={eseguiSalvataggio} />
        <StyledCol>
          <StyledTextAreaModifica rows="1" placeholder="Nome" name="nome" value={item.nome} onChange={(e) => handleInputChange(e, setItem)} />
        </StyledCol>
        <StyledCol>
          <StyledTextAreaModifica rows="1" placeholder="Cognome" name="cognome" value={item.cognome} onChange={(e) => handleInputChange(e, setItem)} />
        </StyledCol>
      </StyledRow>
    </>
  );
}

export function RowRicercaClienti({item, setItem, eseguiRicerca}) {
  // const [visibilita, setVisibilita] = useState(Array(Object.keys(item).length).fill(true));
  let [visibilita, setVisibilita] = useState([true, true, true, true]);
  const [arrowUp, setArrowUp] = useState(true);

  return (
    <>
      <StyledRow>
        <OperazioniCercaItems 
          visibilita={visibilita} setVisibilita={setVisibilita} 
          arrowUp={arrowUp} setArrowUp={setArrowUp} eseguiRicerca={eseguiRicerca}
        />
        <StyledCol>
          {(visibilita[0]) && (
            <StyledTextAreaModifica rows="1" placeholder="Nome" name="nome" value={item.nome} onChange={(e) => handleInputChange(e, setItem)} />
          )}
        </StyledCol>
        <StyledCol>
          {(visibilita[1]) && (
            <StyledTextAreaModifica rows="1" placeholder="Cognome" name="cognome" value={item.cognome} onChange={(e) => handleInputChange(e, setItem)} />
          )}
        </StyledCol>
        <StyledCol>
          {(visibilita[2]) && (
            <StyledInputModifica rows="1" placeholder="Contatto" type="text" name="contatto" value={item.contatto} onChange={(e) => handleInputChange(e, setItem)} />
          )}
        </StyledCol>
        <StyledCol>
          {(visibilita[3]) && (
            <StyledTextAreaModifica rows="1" placeholder="Note" name="note" value={item.note} onChange={(e) => handleInputChange(e, setItem)} />
          )}
        </StyledCol>
      </StyledRow>
    </>
  );
}

export function RowClienteEsistente({item, items, setItems, selectOperation}) { 
  return (
    <>
      <StyledRow>
        <OperazioniItemEsistente selectOperation={selectOperation} item={item} />
        <StyledCol>
          <StyledTextAreaModifica rows="1" placeholder="Nome" name="nome" value={item.nome} onChange={(e) => handleInputChange(e, null, items, setItems, "cliente", item.id)} />
        </StyledCol>
        <StyledCol>
          <StyledTextAreaModifica rows="1" placeholder="Cognome" name="cognome" value={item.cognome} onChange={(e) => handleInputChange(e, null, items, setItems, "cliente", item.id)} />
        </StyledCol>
        <StyledCol>
          <StyledInputModifica rows="1" placeholder="Contatto" type="text" name="contatto" value={item.contatto} onChange={(e) => handleInputChange(e, null, items, setItems, "cliente", item.id)} />
        </StyledCol>
        <StyledCol>
          <StyledTextAreaModifica rows="1" placeholder="Note" name="note" value={item.note} onChange={(e) => handleInputChange(e, null, items, setItems, "cliente", item.id)} />
        </StyledCol>
      </StyledRow>
    </>
  );
}









