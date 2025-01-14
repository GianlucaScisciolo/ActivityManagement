import React, { useState, useEffect } from 'react';
import { formatoDate, formatoTime } from "../../../vario/Tempo";
import { 
  StyledRow, StyledCol, StyledColBlack, StyledColOperazioni, StyledColAnimato, SlideContainer, grandezzaIcona, 
  StyledTextAreaBlock, StyledTextAreaModifica, StyledTextAreaElimina, 
  StyledInputBlock, StyledInputModifica, StyledInputElimina, 
  StyledSaveNotSelected, StyledSearchNotSelected, 
  StyledArrowLeftNotSelected, StyledArrowRightNotSelected,  
  StyledPencilNotSelected, StyledPencilSelected, 
  StyledTrashNotSelected, StyledTrashSelected, 
  StyledSelect, StyledOption, StyledSpanErrore
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

const TextAreaTag = ({ tipoSelezione, nome, valore, modificabile, setItem, placeholder }) => {
  switch(tipoSelezione) {
    case 0:
      return <StyledCol><StyledTextAreaBlock rows="1" name={nome} placeholder={placeholder} value={valore} readOnly /></StyledCol>;
    case 1:
      return <StyledCol>{(modificabile) 
                            ? <StyledTextAreaModifica rows="1" name={nome} placeholder={placeholder} value={valore} onChange={(e) => handleInputChange(e, setItem)} />
                            : <StyledTextAreaBlock rows="1" name={nome} placeholder={placeholder} value={valore} readOnly />}</StyledCol>;
    case 2:
      return <StyledCol><StyledTextAreaElimina rows="1" placeholder={placeholder} name={nome} value={valore} readOnly /></StyledCol>;
    default:
      return <></>;
  }
}

const InputTag = ({ tipoSelezione, tipo, nome, valore, modificabile, setItem, placeholder }) => {
  switch(tipoSelezione) {
    case 0:
      return <StyledCol><StyledInputBlock rows="1" type={tipo} name={nome} placeholder={placeholder} value={valore} readOnly /></StyledCol>;
    case 1:
      return <StyledCol>{(modificabile) 
                            ? <StyledInputModifica rows="1" type={tipo} name={nome} placeholder={placeholder} value={valore} onChange={(e) => handleInputChange(e, setItem)} />
                            : <StyledInputBlock rows="1" type={tipo} name={nome} placeholder={placeholder} value={valore} readOnly />}</StyledCol>;
    case 2:
      return <StyledCol><StyledInputElimina rows="1" type={tipo} name={nome} placeholder={placeholder} value={valore} readOnly /></StyledCol>;
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

const OperazioniNuovoItem = ({eseguiSalvataggio}) => {
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
  const [lavoro, setLavoro] = useState(item);

  return (
    <>
      <OperazioniItemEsistente tipoSelezione={lavoro.tipo_selezione} selectOperation={selectOperation} item={lavoro} />
      <StyledCol><InputTag tipoSelezione={lavoro.tipo_selezione} tipo="text" nome="tipo_lavoro" valore={lavoro.tipo_lavoro} setItem={setLavoro} modificabile={false} /></StyledCol>
      {(lavoro.tipo_lavoro === "Lavoro cliente") && (
        <StyledCol><TextAreaTag tipoSelezione={lavoro.tipo_selezione} nome="nome_cognome_cliente" valore={lavoro.nome_cliente + " " + lavoro.cognome_cliente} setItem={setLavoro} modificabile={false} /></StyledCol>
      )}
      {(lavoro.tipo_lavoro === "Lavoro professionista") && (
        <>
          <StyledCol><TextAreaTag tipoSelezione={lavoro.tipo_selezione} nome="professionista_e_professione" valore={lavoro.nome_professionista + " - " + lavoro.professione} setItem={setLavoro} modificabile={false} /></StyledCol>
        </>
      )}
       {(tipoItem.startsWith("lavoro")) && (
        <>
          <StyledCol><TextAreaTag     tipoSelezione={lavoro.tipo_selezione}             nome="descrizione"   valore={lavoro.descrizione}                       setItem={setLavoro} modificabile={true} /></StyledCol>
          <StyledCol><InputTag        tipoSelezione={lavoro.tipo_selezione} tipo="date" nome="giorno"        valore={formatoDate(lavoro.giorno, "AAAA-MM-GG")} setItem={setLavoro} modificabile={true} /></StyledCol>
          <StyledCol><InputTag        tipoSelezione={lavoro.tipo_selezione} tipo="time" nome="orario_inizio" valore={formatoTime(lavoro.orario_inizio)}        setItem={setLavoro} modificabile={true} /></StyledCol>
          <StyledCol><InputTag        tipoSelezione={lavoro.tipo_selezione} tipo="time" nome="orario_fine"   valore={formatoTime(lavoro.orario_fine)}        setItem={setLavoro} modificabile={true} /></StyledCol>
          <StyledCol><TextAreaTag     tipoSelezione={lavoro.tipo_selezione}             nome="note"          valore={lavoro.note}                              setItem={setLavoro} modificabile={true} /></StyledCol>
        </>
       )}
    </>
  );
}

function RowNuovoLavoro({clienti, professionisti, tipoLavoro, tipoItem, item, setItem, eseguiSalvataggio}) {
  const [clientiFiltrati, setClientiFiltrati] = useState([]);
  const [professionistiFiltrati, setProfessionistiFiltrati] = useState([]);
  useEffect(() => {
    setClientiFiltrati(clienti);
    setProfessionistiFiltrati(professionisti);
  })

  return (
    <>
      <OperazioniNuovoItem eseguiSalvataggio={eseguiSalvataggio} />
      <StyledCol style={{maxWidth:"1px"}}><InputTag tipoSelezione={0} tipo="text" nome="tipo_lavoro" valore={tipoLavoro} setItem={setItem} modificabile={false} /></StyledCol>
            
      {(tipoLavoro === "Lavoro cliente") && (
        <>
          <StyledCol>
            <StyledSelect value={item.id_cliente} name="id_cliente" onChange={(e) => handleInputChange(e, setItem)}>
              <StyledOption key={0} value="">Seleziona un cliente*</StyledOption>
                {clientiFiltrati.map((clienteFiltrato, index) => (
                  <StyledOption key={index + 1} value={clienteFiltrato.id}>
                            {clienteFiltrato.nome + " " + clienteFiltrato.cognome + " - " + clienteFiltrato.contatto}
                  </StyledOption>
                ))}
            </StyledSelect>
        </StyledCol>
        </>
      )}
      {(tipoLavoro === "Lavoro professionista") && (
        <>
          <StyledCol>
            <StyledSelect value={item.id_professionista} name="id_professionista" onChange={(e) => handleInputChange(e, setItem)}>
              <StyledOption key={0} value="">Seleziona un professionista*</StyledOption>
                {professionistiFiltrati.map((professionistaFiltrato, index) => (
                  <StyledOption key={index + 1} value={professionistaFiltrato.id}>
                            {professionistaFiltrato.nome + " - " + professionistaFiltrato.contatto + " - " + professionistaFiltrato.email}
                  </StyledOption>
                ))}
            </StyledSelect>
          </StyledCol>
        </>
      )}
      <StyledCol><TextAreaTag tipoSelezione={1} nome="descrizione" placeholder="Descrizione*" valore={item.descrizione} setItem={setItem} modificabile={true} /></StyledCol>
      <StyledCol><InputTag tipoSelezione={1} tipo="date" nome="giorno" placeholder="Giorno*" valore={item.giorno} setItem={setItem} modificabile={true} /></StyledCol>
      <StyledCol><InputTag tipoSelezione={1} tipo="time" nome="orario_inizio" placeholder="Orario inizio*" valore={item.orario_inizio} setItem={setItem} modificabile={true} /></StyledCol>
      <StyledCol><InputTag tipoSelezione={1} tipo="time" nome="orario_fine" placeholder="Orario fine*" valore={item.orario_fine} setItem={setItem} modificabile={true} /></StyledCol>
      <StyledCol><TextAreaTag tipoSelezione={1} nome="note" placeholder="Note*" valore={item.note} setItem={setItem} modificabile={true} /></StyledCol>
        
    </>
  );
}

function RowNuovoItem({tipoItem, item, setItem, eseguiSalvataggio, errori}) {
  const campiNuovoItem = getCampiNuovoItem(tipoItem, item, errori);
  return (
    <><div style={{width: "auto"}}>
      <OperazioniNuovoItem eseguiSalvataggio={eseguiSalvataggio} />
      <StyledSpanErrore></StyledSpanErrore>
      </div>
      {campiNuovoItem.map(([label, placeholder, name, value, type, errore], index) => (
        <React.Fragment key={index}>
          <StyledCol>
            <div style={{width: "100%"}}>
              {(type === null) && (
                <StyledTextAreaModifica rows="1" placeholder={placeholder} name={name} value={value} onChange={(e) => handleInputChange(e, setItem)} />
              )}
              {(type !== null) && (
                <StyledInputModifica rows="1" type={type} placeholder={placeholder} name={name} value={value} onChange={(e) => handleInputChange(e, setItem)} />
              )}
              <StyledSpanErrore>{errore}</StyledSpanErrore>
            </div>
          </StyledCol>
        </React.Fragment>
      ))}
    </>
  );
}

function RowRicercaItem({tipoItem, item, setItem, arrowUp, setArrowUp, eseguiRicerca}) {
  const [visibilita, setVisibilita] = useState(Array(Object.keys(item).length).fill(true));
  const campiRicerca = getCampiRicerca(tipoItem, item);

  return (
    <>
      <OperazioniCercaItems 
        visibilita={visibilita} setVisibilita={setVisibilita} 
        arrowUp={arrowUp} setArrowUp={setArrowUp} eseguiRicerca={eseguiRicerca}
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

function RowItem({errori, setErrori, clienti, professionisti, tipoLavoro, tipoItem, item, setItem, header, selectOperation, eseguiRicerca, eseguiSalvataggio}) {
  const [isVisible, setIsVisible] = useState(true);
  const [arrowUp, setArrowUp] = useState(true);

  return (
    <>
      {(tipoItem === "nuovo cliente" || tipoItem === "nuovo professionista") && (
        <StyledRow>
          <RowNuovoItem errori={errori} tipoItem={tipoItem} item={item} setItem={setItem} eseguiSalvataggio={eseguiSalvataggio} />
        </StyledRow>
      )}
      {(tipoItem === "nuovo lavoro") && (
        <StyledRow>
          <RowNuovoLavoro clienti={clienti} professionisti={professionisti} tipoLavoro={tipoLavoro} tipoItem={tipoItem} item={item} setItem={setItem} eseguiSalvataggio={eseguiSalvataggio} />
        </StyledRow>
      )}
      {(tipoItem.startsWith("cerca")) && (
        <StyledRow>
          <RowRicercaItem tipoItem={tipoItem} item={item} setItem={setItem} eseguiRicerca={eseguiRicerca} arrowUp={arrowUp} setArrowUp={setArrowUp} />
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









