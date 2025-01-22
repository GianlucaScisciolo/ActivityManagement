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

export function RowNuovoProfessionista({item, setItem, eseguiSalvataggio}) {
  // const [visibilita, setVisibilita] = useState(Array(Object.keys(item).length).fill(true));
  const [arrowUp, setArrowUp] = useState(true);

  return (
    <>
      <StyledRow>
        <OperazioniNuovoItem eseguiSalvataggio={eseguiSalvataggio} />
        <StyledCol>
          <StyledTextAreaModifica rows="1" placeholder="Nome*" name="nome" value={item.nome} onChange={(e) => handleInputChange(e, setItem)} />
        </StyledCol>
        <StyledCol>
          <StyledTextAreaModifica rows="1" placeholder="Professione*" name="professione" value={item.professione} onChange={(e) => handleInputChange(e, setItem)} />
        </StyledCol>
        <StyledCol>
          <StyledInputModifica rows="1" placeholder="Contatto" type="text" name="contatto" value={item.contatto} onChange={(e) => handleInputChange(e, setItem)} />
        </StyledCol>
        <StyledCol>
          <StyledInputModifica rows="1" placeholder="Email" type="text" name="email" value={item.email} onChange={(e) => handleInputChange(e, setItem)} />
        </StyledCol>
        <StyledCol>
          <StyledTextAreaModifica rows="1" placeholder="Note" name="note" value={item.note} onChange={(e) => handleInputChange(e, setItem)} />
        </StyledCol>
      </StyledRow>
    </>
  );
}

export function RowRicercaProfessionisti({item, setItem, eseguiRicerca}) {
  // const [visibilita, setVisibilita] = useState(Array(Object.keys(item).length).fill(true));
  let [visibilita, setVisibilita] = useState([true, true, true, true, true]);
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
            <StyledTextAreaModifica rows="1" placeholder="Professione" name="professione" value={item.professione} onChange={(e) => handleInputChange(e, setItem)} />
          )}
        </StyledCol>
        <StyledCol>
          {(visibilita[2]) && (
            <StyledInputModifica rows="1" placeholder="Contatto" type="text" name="contatto" value={item.contatto} onChange={(e) => handleInputChange(e, setItem)} />
          )}
        </StyledCol>
        <StyledCol>
          {(visibilita[3]) && (
            <StyledInputModifica rows="1" placeholder="Email" type="text" name="email" value={item.email} onChange={(e) => handleInputChange(e, setItem)} />
          )}
        </StyledCol>
        <StyledCol>
          {(visibilita[4]) && (
            <StyledTextAreaModifica rows="1" placeholder="Note" name="note" value={item.note} onChange={(e) => handleInputChange(e, setItem)} />
          )}
        </StyledCol>
      </StyledRow>
    </>
  );
}

export function RowProfessionistaEsistente({item, items, setItems, selectOperation}) { 
  return (
    <>
      <StyledRow>
        <OperazioniItemEsistente selectOperation={selectOperation} item={item} />
        <StyledCol>
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
        </StyledCol>
        <StyledCol>
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
        </StyledCol>
        <StyledCol>
          <InputTag 
            tipoSelezione={item.tipo_selezione} 
            nome="contatto" 
            tipo="text" 
            valore={item.contatto} 
            modificabile={true} 
            placeholder="Contatto" 
            items={items} 
            setItems={setItems} 
            tipoItem={"cliente"} 
            id={item.id} 
          />
        </StyledCol>
        <StyledCol>
          <InputTag 
            tipoSelezione={item.tipo_selezione} 
            nome="email" 
            tipo="text" 
            valore={item.email} 
            modificabile={true} 
            placeholder="Email" 
            items={items} 
            setItems={setItems} 
            tipoItem={"cliente"} 
            id={item.id} 
          />
        </StyledCol>
        <StyledCol>
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
        </StyledCol>
      </StyledRow>
    </>
  );
}









