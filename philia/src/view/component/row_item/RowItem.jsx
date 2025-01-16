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

const TextAreaTag = ({ id, items, tipoSelezione, nome, valore, modificabile, setItem, placeholder, tipoItem, setItems }) => {
  switch(tipoSelezione) {
    case 0:
      return <StyledCol><StyledTextAreaBlock rows="1" name={nome} placeholder={placeholder} value={valore} readOnly /></StyledCol>;
    case 1:
      return <StyledCol>{(modificabile) 
                            ? <StyledTextAreaModifica rows="1" name={nome} placeholder={placeholder} value={valore} onChange={(e) => handleInputChange(e, setItem, items, setItems, tipoItem, id)} />
                            : <StyledTextAreaBlock rows="1" name={nome} placeholder={placeholder} value={valore} readOnly />}</StyledCol>;
    case 2:
      return <StyledCol><StyledTextAreaElimina rows="1" placeholder={placeholder} name={nome} value={valore} readOnly /></StyledCol>;
    default:
      return <></>;
  }
}

const InputTag = ({ id, items, tipoSelezione, tipo, nome, valore, modificabile, setItem, placeholder, tipoItem, setItems }) => {
  switch(tipoSelezione) {
    case 0:
      return <StyledCol><StyledInputBlock rows="1" type={tipo} name={nome} placeholder={placeholder} value={valore} readOnly /></StyledCol>;
    case 1:
      return <StyledCol>{(modificabile) 
                            ? <StyledInputModifica rows="1" type={tipo} name={nome} placeholder={placeholder} value={valore} onChange={(e) => handleInputChange(e, setItem, items, setItems, tipoItem, id)} />
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

const OperazioniLogin = ({eseguiLogin}) => {
  return (
    <StyledColOperazioni>
      <StyledLoginNotSelected size={grandezzaIcona} onClick={eseguiLogin} />
    </StyledColOperazioni>
  );
};

const OperazioniModificaProfilo = ({eseguiModificaProfilo}) => {
  return (
    <StyledColOperazioni>
      <StyledPencilNotSelectedModificaProfilo size={grandezzaIcona} onClick={eseguiModificaProfilo} />
    </StyledColOperazioni>
  );
};

function RowCliente({items, tipoItem, item, selectOperation, setItems}) {
  return (
    <>
      <OperazioniItemEsistente tipoSelezione={item.tipo_selezione} selectOperation={selectOperation} item={item} />
      <StyledCol style={{maxWidth:"1px"}}><InputTag setItems={setItems} id={item.id} items={items} tipoItem={tipoItem} tipoSelezione={item.tipo_selezione} tipo="text" nome="contatto"     valore={tipoItem.charAt(0).toUpperCase() + tipoItem.slice(1)} modificabile={false} /></StyledCol>
      <StyledCol><TextAreaTag                       setItems={setItems} id={item.id} items={items} tipoItem={tipoItem} tipoSelezione={item.tipo_selezione}             nome="nome_cognome" valore={item.nome + " " + item.cognome}                 modificabile={false} /></StyledCol>
      <StyledCol><InputTag                          setItems={setItems} id={item.id} items={items} tipoItem={tipoItem} tipoSelezione={item.tipo_selezione} tipo="text" nome="contatto"     valore={item.contatto}                                     modificabile={true} /></StyledCol>
      <StyledCol><TextAreaTag                       setItems={setItems} id={item.id} items={items} tipoItem={tipoItem} tipoSelezione={item.tipo_selezione}             nome="note"         valore={item.note}                                         modificabile={true} /></StyledCol>
    </>
  );
}

function RowProfessionista({tipoItem, item, selectOperation}) {
  return (
    <>
      <OperazioniItemEsistente tipoSelezione={item.tipo_selezione} selectOperation={selectOperation} item={item} />
      <StyledCol style={{maxWidth:"1px"}}><InputTag tipoSelezione={item.tipo_selezione} tipo="text" nome="contatto"    valore={tipoItem.charAt(0).toUpperCase() + tipoItem.slice(1)} modificabile={false} /></StyledCol>
      <StyledCol><TextAreaTag                       tipoSelezione={item.tipo_selezione}             nome="nome"        valore={item.nome}                                  modificabile={false} /></StyledCol>
      <StyledCol><TextAreaTag                       tipoSelezione={item.tipo_selezione}             nome="professione" valore={item.professione}                           modificabile={false} /></StyledCol>
      <StyledCol><InputTag                          tipoSelezione={item.tipo_selezione} tipo="text" nome="contatto"    valore={item.contatto}                              modificabile={true}  /></StyledCol>
      <StyledCol><InputTag                          tipoSelezione={item.tipo_selezione} tipo="text" nome="email"       valore={item.email}                                 modificabile={true}  /></StyledCol>
      <StyledCol><TextAreaTag                       tipoSelezione={item.tipo_selezione}             nome="note"        valore={item.note}                                  modificabile={true}  /></StyledCol>
    </>
  );
}

function RowLavoro({tipoItem, item, selectOperation}) {
  return (
    <>
      <OperazioniItemEsistente tipoSelezione={item.tipo_selezione} selectOperation={selectOperation} item={item} />
      <StyledCol><InputTag tipoSelezione={item.tipo_selezione} tipo="text" nome="tipo_lavoro" valore={item.tipo_lavoro} modificabile={false} /></StyledCol>
      {(item.tipo_lavoro === "Lavoro cliente") && (
        <StyledCol><TextAreaTag tipoSelezione={item.tipo_selezione} nome="nome_cognome_cliente" valore={item.nome_cliente + " " + item.cognome_cliente} modificabile={false} /></StyledCol>
      )}
      {(item.tipo_lavoro === "Lavoro professionista") && (
        <>
          <StyledCol><TextAreaTag tipoSelezione={item.tipo_selezione} nome="professionista_e_professione" valore={item.nome_professionista + " - " + item.professione} modificabile={false} /></StyledCol>
        </>
      )}
       {(tipoItem.startsWith("lavoro")) && (
        <>
          <StyledCol><TextAreaTag     tipoSelezione={item.tipo_selezione}             nome="descrizione"   valore={item.descrizione}                       modificabile={true} /></StyledCol>
          <StyledCol><InputTag        tipoSelezione={item.tipo_selezione} tipo="date" nome="giorno"        valore={formatoDate(item.giorno, "AAAA-MM-GG")} modificabile={true} /></StyledCol>
          <StyledCol><InputTag        tipoSelezione={item.tipo_selezione} tipo="time" nome="orario_inizio" valore={formatoTime(item.orario_inizio)}        modificabile={true} /></StyledCol>
          <StyledCol><InputTag        tipoSelezione={item.tipo_selezione} tipo="time" nome="orario_fine"   valore={formatoTime(item.orario_fine)}          modificabile={true} /></StyledCol>
          <StyledCol><TextAreaTag     tipoSelezione={item.tipo_selezione}             nome="note"          valore={item.note}                              modificabile={true} /></StyledCol>
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
    <>
      <div style={{width: "auto"}}>
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

function RowLogin({item, setItem, errori, setErrori, eseguiLogin}) {
  return (
    <>
      <div style={{width: "auto"}}>
        <OperazioniLogin eseguiLogin={eseguiLogin} />
        <StyledSpanErrore></StyledSpanErrore>
      </div>
      <StyledCol>
        <div style={{width: "100%"}}>
          <StyledTextAreaModifica rows="1" name="username" placeholder='Username*' value={item.username} onChange={(e) => handleInputChange(e, setItem)} />
          <StyledSpanErrore>{errori.username}</StyledSpanErrore>
        </div>
      </StyledCol>
      <StyledCol>
        <div style={{width: "100%"}}>
          <StyledTextAreaModifica rows="1" name="password" placeholder='Password*' value={item.password} onChange={(e) => handleInputChange(e, setItem)} />
          <StyledSpanErrore>{errori.password}</StyledSpanErrore>
        </div>
      </StyledCol>
    </>
  );
}

function RowModificaProfilo({ item, setItem, errori, eseguiModificaProfilo }) {
  return (
    <>
      <div style={{width: "auto"}}>
        <OperazioniModificaProfilo eseguiModificaProfilo={eseguiModificaProfilo} />
        <StyledSpanErrore></StyledSpanErrore>
      </div>
      <StyledCol>
        <div style={{width: "100%"}}>
          <StyledTextAreaModifica rows="1" name="nuovo_username" placeholder='Nuovo username*' value={item.nuovo_username} onChange={(e) => handleInputChange(e, setItem)} />
          {(errori.nuovo_username !== "") && (<StyledSpanErrore>{errori.nuovo_username}</StyledSpanErrore>)}
        </div>
      </StyledCol>
      <StyledCol>
        <div style={{width: "100%"}}>
          <StyledTextAreaModifica rows="1" name="note" placeholder='Note' value={item.note} onChange={(e) => handleInputChange(e, setItem)} />
          {(errori.note !== "") && (<StyledSpanErrore>{errori.note}</StyledSpanErrore>)}
        </div>
      </StyledCol>
      <StyledCol>
        <div style={{width: "100%"}}>
          <StyledTextAreaModifica rows="1" name="password_attuale" placeholder='Password attuale*' value={item.password_attuale} onChange={(e) => handleInputChange(e, setItem)} />
          {(errori.password_attuale !== "") && (<StyledSpanErrore>{errori.password_attuale}</StyledSpanErrore>)}
        </div>
      </StyledCol>
      <StyledCol>
        <div style={{width: "100%"}}>
          <StyledTextAreaModifica rows="1" name="nuova_password" placeholder='Nuova password' value={item.nuova_password} onChange={(e) => handleInputChange(e, setItem)} />
          {(errori.nuova_password !== "") && (<StyledSpanErrore>{errori.nuova_password}</StyledSpanErrore>)}
        </div>
      </StyledCol>
      <StyledCol>
        <div style={{width: "100%"}}>
          <StyledTextAreaModifica rows="1" name="conferma_nuova_password" placeholder='Conferma nuova password' value={item.conferma_nuova_password} onChange={(e) => handleInputChange(e, setItem)} />
          {(errori.conferma_nuova_password !== "") && (<StyledSpanErrore>{errori.conferma_nuova_password}</StyledSpanErrore>)}
        </div>
      </StyledCol>  
    </>
  );
}

function RowItem({items, errori, setErrori, clienti, professionisti, tipoLavoro, tipoItem, item, setItem, setItems, header, selectOperation, eseguiRicerca, eseguiSalvataggio, eseguiLogin, eseguiModificaProfilo}) {
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
          <RowCliente      items={items} selectOperation={selectOperation} item={item} setItems={setItems} tipoItem={tipoItem} />
        </StyledRow>
      )}
      {(tipoItem === "professionista") && (
        <StyledRow>
          <RowProfessionista selectOperation={selectOperation} item={item} setItems={setItems} tipoItem={tipoItem} />
        </StyledRow>
      )}
      {(tipoItem === "lavoro") && (
        <StyledRow>
          <RowLavoro         selectOperation={selectOperation} item={item} setItems={setItems} tipoItem={tipoItem} />
        </StyledRow>
      )}
      {(tipoItem === "login") && (
        <StyledRow>
          <RowLogin item={item} setItem={setItem} errori={errori} setErrori={setErrori} eseguiLogin={eseguiLogin} />
        </StyledRow>
      )}
      {(tipoItem.startsWith("modifica profilo")) &&(
        <StyledRow>
          <RowModificaProfilo item={item} setItem={setItem} errori={errori} eseguiModificaProfilo={eseguiModificaProfilo} />
        </StyledRow>
      )}
    </>
  );
}

export default RowItem;









