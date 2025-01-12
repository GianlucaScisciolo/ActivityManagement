import React, { useState } from 'react';
import { formatoDate, formatoTime } from "../../../vario/Tempo";
import { 
  StyledRow, StyledCol, StyledColBlack, StyledColOperazioni, StyledColAnimato, SlideContainer, grandezzaIcona, 
  StyledTextAreaBlock, StyledTextAreaModifica, StyledTextAreaElimina, 
  StyledInputBlock, StyledInputModifica, StyledInputElimina, 
  StyledSaveNotSelected, StyledSearchNotSelected, 
  StyledArrowLeftNotSelected, StyledArrowRightNotSelected,  
  StyledPencilNotSelected, StyledPencilSelected, 
  StyledTrashNotSelected, StyledTrashSelected
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
      return <StyledPencilNotSelected size={grandezzaIcona} onClick={() => selectOperation("pencil", item)} style={{marginRight: "50%"}} />;
    case 1:
      return <StyledPencilSelected size={grandezzaIcona} onClick={() => selectOperation("pencil", item)} style={{marginRight: "50%"}} />;
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

const TextAreaTag = ({ tipoSelezione, nome, valore, modificabile, setItem }) => {
  switch(tipoSelezione) {
    case 0:
      return <StyledCol><StyledTextAreaBlock rows="1" name={nome} value={valore} readOnly /></StyledCol>;
    case 1:
      return <StyledCol>{(modificabile) 
                            ? <StyledTextAreaModifica rows="1" name={nome} value={valore} onChange={(e) => handleInputChange(e, setItem)} />
                            : <StyledTextAreaBlock rows="1" name={nome} value={valore} readOnly />}</StyledCol>;
    case 2:
      return <StyledCol><StyledTextAreaElimina rows="1" name={nome} value={valore} readOnly /></StyledCol>;
    default:
      return <></>;
  }
}

const InputTag = ({ tipoSelezione, tipo, nome, valore, modificabile, setItem }) => {
  switch(tipoSelezione) {
    case 0:
      return <StyledCol><StyledInputBlock rows="1" type={tipo} name={nome} value={valore} readOnly /></StyledCol>;
    case 1:
      return <StyledCol>{(modificabile) 
                            ? <StyledInputModifica rows="1" type={tipo} name={nome} value={valore} onChange={(e) => handleInputChange(e, setItem)} />
                            : <StyledInputBlock rows="1" type={tipo} name={nome} value={valore} readOnly />}</StyledCol>;
    case 2:
      return <StyledCol><StyledInputElimina rows="1" type={tipo} name={nome} value={valore} readOnly /></StyledCol>;
    default:
      return <></>;
  }
}

const OperazioniItemEsistente = ({ tipoSelezione, selectOperation, item }) => {
  return (
    <StyledColOperazioni>
      <PencilTag tipoSelezione={tipoSelezione} selectOperation={selectOperation} item={item} />
      <TrashTag tipoSelezione={tipoSelezione} selectOperation={selectOperation} item={item} />
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

function RowCliente({tipoItem, item, selectOperation}) {
  const [cliente, setCliente] = useState(item);

  return (
    <>
      <OperazioniItemEsistente tipoSelezione={cliente.tipo_selezione} selectOperation={selectOperation} item={cliente} />
      <StyledCol style={{maxWidth:"1px"}}><InputTag tipoSelezione={cliente.tipo_selezione} tipo="text" nome="contatto"     valore={tipoItem.charAt(0).toUpperCase() + tipoItem.slice(1)} setItem={setCliente} modificabile={false} /></StyledCol>
      <StyledCol><TextAreaTag                       tipoSelezione={cliente.tipo_selezione}             nome="nome_cognome" valore={cliente.nome + " " + cliente.cognome}                 setItem={setCliente} modificabile={false} /></StyledCol>
      <StyledCol><InputTag                          tipoSelezione={cliente.tipo_selezione} tipo="text" nome="contatto"     valore={cliente.contatto}                                     setItem={setCliente} modificabile={true}  /></StyledCol>
      <StyledCol><TextAreaTag                       tipoSelezione={cliente.tipo_selezione}             nome="note"         valore={cliente.note}                                         setItem={setCliente} modificabile={true}  /></StyledCol>
    </>
  );
}

function RowProfessionista({tipoItem, item, selectOperation}) {
  const [professionista, setProfessionista] = useState(item);

  return (
    <>
      <OperazioniItemEsistente tipoSelezione={professionista.tipo_selezione} selectOperation={selectOperation} item={professionista} />
      <StyledCol style={{maxWidth:"1px"}}><InputTag tipoSelezione={professionista.tipo_selezione} tipo="text" nome="contatto"    valore={tipoItem.charAt(0).toUpperCase() + tipoItem.slice(1)} setItem={setProfessionista} modificabile={false} /></StyledCol>
      <StyledCol><TextAreaTag                       tipoSelezione={professionista.tipo_selezione}             nome="nome"        valore={professionista.nome}                                  setItem={setProfessionista} modificabile={false} /></StyledCol>
      <StyledCol><TextAreaTag                       tipoSelezione={professionista.tipo_selezione}             nome="professione" valore={professionista.professione}                           setItem={setProfessionista} modificabile={false} /></StyledCol>
      <StyledCol><InputTag                          tipoSelezione={professionista.tipo_selezione} tipo="text" nome="contatto"    valore={professionista.contatto}                              setItem={setProfessionista} modificabile={true}  /></StyledCol>
      <StyledCol><InputTag                          tipoSelezione={professionista.tipo_selezione} tipo="text" nome="email"       valore={professionista.email}                                 setItem={setProfessionista} modificabile={true}  /></StyledCol>
      <StyledCol><TextAreaTag                       tipoSelezione={professionista.tipo_selezione}             nome="note"        valore={professionista.note}                                  setItem={setProfessionista} modificabile={true}  /></StyledCol>
    </>
  );
}

function RowLavoro({tipoItem, item, selectOperation}) {
  item.tipo_lavoro = (item.id_professionista !== null) ? "Lavoro professionista" : "Lavoro cliente";
  const [lavoro, setLavoro] = useState(item);
  
  return (
    <>
      <OperazioniItemEsistente tipoSelezione={lavoro.tipo_selezione} selectOperation={selectOperation} item={lavoro} />
      <StyledCol><InputTag tipoSelezione={lavoro.tipo_selezione} tipo="text" nome="tipo_lavoro" valore={lavoro.tipo_lavoro} setItem={setLavoro} modificabile={false} /></StyledCol>
      {(lavoro.nome_cliente !== null) && (lavoro.cognome_cliente !== null) && (
        <StyledCol><TextAreaTag tipoSelezione={lavoro.tipo_selezione} nome="nome_cognome_cliente" valore={lavoro.nome_cliente + " " + lavoro.cognome_cliente} setItem={setLavoro} modificabile={false} /></StyledCol>
      )}
      {(lavoro.nome_professionista !== null) && (lavoro.professione !== null) && (
        <>
          <StyledCol><TextAreaTag tipoSelezione={lavoro.tipo_selezione} nome="professionista_e_professione" valore={lavoro.nome_professionista + " - " + lavoro.professione} setItem={setLavoro} modificabile={false} /></StyledCol>
        </>
      )}
      <StyledCol><TextAreaTag     tipoSelezione={lavoro.tipo_selezione}             nome="descrizione"   valore={lavoro.descrizione}                       setItem={setLavoro} modificabile={true} /></StyledCol>
      <StyledCol><InputTag        tipoSelezione={lavoro.tipo_selezione} tipo="date" nome="giorno"        valore={formatoDate(lavoro.giorno, "AAAA-MM-GG")} setItem={setLavoro} modificabile={true} /></StyledCol>
      <StyledCol><InputTag        tipoSelezione={lavoro.tipo_selezione} tipo="time" nome="orario_inizio" valore={formatoTime(lavoro.orario_inizio)}        setItem={setLavoro} modificabile={true} /></StyledCol>
      <StyledCol><InputTag        tipoSelezione={lavoro.tipo_selezione} tipo="time" nome="orario_fine"   valore={formatoTime(lavoro.orario_fine)}        setItem={setLavoro} modificabile={true} /></StyledCol>
      <StyledCol><TextAreaTag     tipoSelezione={lavoro.tipo_selezione}             nome="note"          valore={lavoro.note}                              setItem={setLavoro} modificabile={true} /></StyledCol>
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
        <StyledRow>
          <RowCliente tipoItem={tipoItem} item={item} selectOperation={selectOperation} />
        </StyledRow>
      )}
      {(tipoItem === "professionista") &&(
        <StyledRow>
          <RowProfessionista tipoItem={tipoItem} item={item} selectOperation={selectOperation} />
        </StyledRow>
      )}
      {(tipoItem === "lavoro") &&(
        <StyledRow>
          <RowLavoro tipoItem={tipoItem} item={item} selectOperation={selectOperation} />
        </StyledRow>
      )}
      {(tipoItem.startsWith("modifica profilo")) &&(
        <RowModificaProfilo key={item.id} item={item} />
      )}
    </>
  );
}

export default RowItem;









