import React, { useState } from 'react';
import { formatoDate, formatoTime } from "../../../vario/Tempo";
import { 
  StyledRow, StyledCol, StyledColOperazioni, StyledColAnimato, SlideContainer, grandezzaIcona, 
  StyledTextAreaBlock, StyledTextAreaModifica, StyledTextAreaElimina, 
  StyledInputBlock, StyledInputModifica, StyledInputElimina, 
  StyledSaveNotSelected, StyledSearchNotSelected, 
  StyledArrowLeftNotSelected, StyledArrowRightNotSelected,  
  StyledPencilNotSelected, StyledPencilSelected, 
  StyledTrashNotSelected, StyledTrashSelected,
} from "./StyledRowItem";
import { 
  handleInputChange, getCampiRicerca, getCampiNuovoItem
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

const PencilTag = ({ tipoSelezione, selectOperation }) => {
  switch(tipoSelezione) {
    case 0:
    case 2:
      return <StyledPencilNotSelected size={grandezzaIcona} onClick={() => selectOperation("pencil")} style={{marginRight: "50%"}} />;
    case 1:
      return <StyledPencilSelected size={grandezzaIcona} onClick={() => selectOperation("pencil")} style={{marginRight: "50%"}} />;
    default:
      return <></>;
  }
}

const TrashTag = ({ tipoSelezione, selectOperation }) => {
  switch(tipoSelezione) {
    case 0:
    case 1:
      return <StyledTrashNotSelected size={grandezzaIcona} onClick={() => selectOperation("trash")} />;
    case 2:
      return <StyledTrashSelected size={grandezzaIcona} onClick={() => selectOperation("trash")} />;
    default:
      return <></>;
  }
}

const TextAreaTag = ({ tipoSelezione, nome, valore, modificabile }) => {
  switch(tipoSelezione) {
    case 0:
      return <StyledCol><StyledTextAreaBlock rows="1" name={nome} value={valore} /></StyledCol>;
    case 1:
      return <StyledCol>{(modificabile) 
                            ? <StyledTextAreaModifica rows="1" name={nome} value={valore} />
                            : <StyledTextAreaBlock rows="1" name={nome} value={valore} />}</StyledCol>;
    case 2:
      return <StyledCol><StyledTextAreaElimina rows="1" name={nome} value={valore} /></StyledCol>;
    default:
      return <></>;
  }
}

const InputTag = ({ tipoSelezione, tipo, nome, valore, modificabile }) => {
  switch(tipoSelezione) {
    case 0:
      return <StyledCol><StyledInputBlock rows="1" type={tipo} name={nome} value={valore} /></StyledCol>;
    case 1:
      return <StyledCol>{(modificabile) 
                            ? <StyledInputModifica rows="1" type={tipo} name={nome} value={valore} />
                            : <StyledInputBlock rows="1" type={tipo} name={nome} value={valore} />}</StyledCol>;
    case 2:
      return <StyledCol><StyledInputElimina rows="1" type={tipo} name={nome} value={valore} /></StyledCol>;
    default:
      return <></>;
  }
}

const OperazioniItemEsistente = ({ tipoSelezione, selectOperation }) => {
  return (
    <StyledColOperazioni>
      <PencilTag tipoSelezione={tipoSelezione} selectOperation={selectOperation} />
      <TrashTag tipoSelezione={tipoSelezione} selectOperation={selectOperation} />
    </StyledColOperazioni>
  )
}

const OperazioniNuovoItem = () => {
  return (
    <StyledColOperazioni>
      <StyledSaveNotSelected size={grandezzaIcona} />
    </StyledColOperazioni>
  )
}

const OperazioniCercaItems = ({ visibilita, setVisibilita, arrowUp, setArrowUp }) => {
  return (
    <StyledColOperazioni>
      <StyledSearchNotSelected size={grandezzaIcona} style={{ marginRight: "50%" }} />
      {arrowUp && (
        <StyledArrowLeftNotSelected size={grandezzaIcona} onClick={() => nascondiForm(visibilita, setVisibilita, setArrowUp)} />
      )}
      {!arrowUp && (
        <StyledArrowRightNotSelected size={grandezzaIcona} onClick={() => mostraForm(visibilita, setVisibilita, setArrowUp)} />
      )}
    </StyledColOperazioni>
  );
};

function RowCliente({item, selectOperation}) {
  return (
    <>
        <OperazioniItemEsistente tipoSelezione={item.tipo_selezione} selectOperation={selectOperation} />
        <StyledCol><TextAreaTag tipoSelezione={item.tipo_selezione} nome="nome_cognome" valore={item.nome + " " + item.cognome} modificabile={false} /></StyledCol>
        <StyledCol><InputTag tipoSelezione={item.tipo_selezione} tipo="text" nome="contatto" valore={item.contatto} modificabile={true} /></StyledCol>
        <StyledCol><TextAreaTag tipoSelezione={item.tipo_selezione} nome="note" valore={item.note} modificabile={true} /></StyledCol>
    </>
  );
}

function RowProfessionista({item, selectOperation}) {
  return (
    <>
      <OperazioniItemEsistente tipoSelezione={item.tipo_selezione} selectOperation={selectOperation} />
      <TextAreaTag tipoSelezione={item.tipo_selezione} nome="nome" valore={item.nome} modificabile={false} />
      <TextAreaTag tipoSelezione={item.tipo_selezione} nome="professione" valore={item.professione} modificabile={false} />
      <InputTag tipoSelezione={item.tipo_selezione} tipo="text" nome="contatto" valore={item.contatto} modificabile={true} />
      <InputTag tipoSelezione={item.tipo_selezione} tipo="email" nome="email" valore={item.email} modificabile={true} />
      <TextAreaTag tipoSelezione={item.tipo_selezione} nome="note" valore={item.note} modificabile={true} />
    </>
  );
}

function RowLavoro({tipoItem, item, selectOperation}) {
  return (
    <>
      <OperazioniItemEsistente tipoSelezione={item.tipo_selezione} selectOperation={selectOperation} />
      {(tipoItem === "lavoro cliente") && (
        <TextAreaTag tipoSelezione={item.tipo_selezione} nome="nome_cognome_cliente" valore={item.nome_cliente + " " + item.cognome_cliente} modificabile={false} />
      )}
      {(tipoItem === "lavoro professionista") && (
        <>
          <TextAreaTag tipoSelezione={item.tipo_selezione} nome="nome_professionista" valore={item.nome_professionista} modificabile={false} />
          <TextAreaTag tipoSelezione={item.tipo_selezione} nome="professione" valore={item.professione} modificabile={false} />
        </>
      )}
      {(tipoItem.startsWith("lavoro")) && (
        <>
          <TextAreaTag tipoSelezione={item.tipo_selezione} nome="descrizione" valore={item.descrizione} modificabile={true} />
          <InputTag tipoSelezione={item.tipo_selezione} tipo="date" nome="giorno" valore={formatoDate(item.giorno, "AAAA-MM-GG")} modificabile={true} />
          <InputTag tipoSelezione={item.tipo_selezione} tipo="time" nome="orario_inizio" valore={formatoTime(item.orario_inizio)} modificabile={true} />
          <InputTag tipoSelezione={item.tipo_selezione} tipo="time" nome="orario_fine" valore={formatoTime(item.orario_inizio)} modificabile={true} />
          <TextAreaTag tipoSelezione={item.tipo_selezione} nome="note" valore={item.note} modificabile={true} />
        </>
      )}
    </>
  );
}

function RowNuovoItem({tipoItem, item, setItem}) {
  const campiNuovoItem = getCampiNuovoItem(tipoItem, item);
  return (
    <>
      <OperazioniNuovoItem  />
      {campiNuovoItem.map(([label, placeholder, name, value, type], index) => (
        <React.Fragment key={index}>
          <StyledCol>
            {(type === null) && (
              <StyledTextAreaModifica rows="1" placeholder={placeholder} name={name} value={value} onChange={(e) => handleInputChange(e, setItem)} />
            )}
            {(type !== null) && (
              <StyledInputModifica rows="1" type={type} placeholder={placeholder} name={name} value={value} onChange={(e) => handleInputChange(e, setItem)} />
            )}
          </StyledCol>
        </React.Fragment>
      ))}
    </>
  );
}

function RowRicerca({tipoItem, item, setItem, arrowUp, setArrowUp}) {
  const [visibilita, setVisibilita] = useState(Array(Object.keys(item).length).fill(true));
  const campiRicerca = getCampiRicerca(tipoItem, item);

  return (
    <>
      <OperazioniCercaItems 
        visibilita={visibilita} setVisibilita={setVisibilita} 
        arrowUp={arrowUp} setArrowUp={setArrowUp}
      />
      {campiRicerca.map(([label, placeholder, name, value, type], index) => (
        <React.Fragment key={index}>
          <StyledCol>
            {(visibilita[index]) && (
              <>
                {(type === null) && (
                  <StyledTextAreaModifica rows="1" placeholder={placeholder} name={name} value={value} onChange={(e) => handleInputChange(e, setItem)} />
                )}
                {(type !== null) && (
                  <StyledInputModifica rows="1" type={type} placeholder={placeholder} name={name} value={value} onChange={(e) => handleInputChange(e, setItem)} />
                )}
              </>
            )}
          </StyledCol>
        </React.Fragment>
      ))}
    </>
  );
}

function RowItem({selectOperation, tipoItem, item, setItem}) {
  const [isVisible, setIsVisible] = useState(true);
  const [arrowUp, setArrowUp] = useState(true);

  return (
    <>
      {(tipoItem.startsWith("nuovo")) && (
        <StyledRow>
          <RowNuovoItem tipoItem={tipoItem} item={item} setItem={setItem} />
        </StyledRow>
      )}
      {(tipoItem.startsWith("cerca")) && (
        <StyledRow>
          <RowRicerca tipoItem={tipoItem} item={item} setItem={setItem} arrowUp={arrowUp} setArrowUp={setArrowUp} />
        </StyledRow>
      )}
      {(tipoItem === "cliente") && (
        <RowCliente item={item} selectOperation={selectOperation} />
      )}
      {(tipoItem === "professionista") &&(
        <RowProfessionista item={item} selectOperation={selectOperation} />
      )}
      {(tipoItem.startsWith("lavoro")) &&(
        <RowLavoro tipoItem={tipoItem} item={item} selectOperation={selectOperation} />
      )}
      {(tipoItem.startsWith("modifica profilo")) &&(
        <RowModificaProfilo item={item} />
      )}
    </>
  );
}

export default RowItem;









