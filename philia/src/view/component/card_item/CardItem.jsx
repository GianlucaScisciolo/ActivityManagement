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

const nascondiForm = (setIsVisible, setArrowUp) => {
  setIsVisible(prev => !prev);
  
  setTimeout(() => {
    setArrowUp(prev => !prev);
  }, 450); 
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

const getTypeIfEmpty = (type, value) => {
  // return (value === "") ? "text" : type;
  return type;
}

const InputTag = ({ tipoSelezione, tipo, nome, valore, modificabile, setItem, placeholder, items, setItems, tipoItem, id }) => {
  switch(tipoSelezione) {
    case 0:
      return <StyledInputBlock rows="1" type={getTypeIfEmpty(tipo, valore)} name={nome} placeholder={placeholder} value={valore}  readOnly />;
    case 1:
      return (modificabile) ? <StyledInputModifica rows="1" type={getTypeIfEmpty(tipo, valore)} name={nome} placeholder={placeholder} value={valore} onChange={(e) => handleInputChange(e, setItem, items, setItems, tipoItem, id)} />
                            : <StyledInputBlock rows="1" type={getTypeIfEmpty(tipo, valore)} name={nome} placeholder={placeholder} value={valore} readOnly />;
    case 2:
      return <StyledInputElimina rows="1" type={getTypeIfEmpty(tipo, valore)} name={nome} value={valore} placeholder={placeholder} readOnly />;
    default:
      return <></>;
  }
}

const OperazioniItemEsistente = ({ tipoSelezione, selectOperation, item }) => {
  return (
    <StyledListGroupItem style={{ border: "5px solid #000000", backgroundColor: "#000000", paddingTop: "3%" }}>
      <PencilTag tipoSelezione={tipoSelezione} selectOperation={selectOperation} item={item} />
      <TrashTag tipoSelezione={tipoSelezione} selectOperation={selectOperation} item={item} />
    </StyledListGroupItem>
  )
}

const OperazioniNuovoItem = ({eseguiSalvataggio}) => {
  return (
    <StyledListGroupItem style={{border: "5px solid #000000", backgroundColor:"#000000", paddingTop: "3%"}}>
      <StyledRow>
        <StyledCol>
          <StyledSaveNotSelected size={grandezzaIcona} onClick={eseguiSalvataggio} />
        </StyledCol>
      </StyledRow>
    </StyledListGroupItem>
  )
}

const OperazioniCercaItems = ({ setIsVisible, arrowUp, setArrowUp, eseguiRicerca }) => {
  return (
    <StyledListGroupItem style={{ border: "5px solid #000000", backgroundColor: "#000000", paddingTop: "3%" }}>
      <StyledSearchNotSelected size={grandezzaIcona} style={{ marginRight: "50%" }} onClick={eseguiRicerca} />
      {arrowUp && (
        <StyledArrowTopNotSelected size={grandezzaIcona} onClick={() => nascondiForm(setIsVisible, setArrowUp)} />
      )}
      {!arrowUp && (
        <StyledArrowBottomNotSelected size={grandezzaIcona} onClick={() => nascondiForm(setIsVisible, setArrowUp)} />
      )}
    </StyledListGroupItem>
  );
};

const OperazioniLogin = ({eseguiLogin}) => {
  return (
    <StyledListGroupItem style={{ border: "5px solid #000000", backgroundColor: "#000000", paddingTop: "3%", paddingBottom: "3%" }}>
      <StyledLoginNotSelected size={grandezzaIcona} onClick={eseguiLogin} />
    </StyledListGroupItem>
  );
};

const OperazioniModificaProfilo = ({eseguiModificaProfilo}) => {
  return (
    <StyledListGroupItem style={{ border: "5px solid #000000", backgroundColor: "#000000", paddingTop: "3%", paddingBottom: "3%" }}>
      <StyledPencilNotSelectedModificaProfilo size={grandezzaIcona} onClick={eseguiModificaProfilo} />
    </StyledListGroupItem>
  );
};

function CardCliente({ selectOperation, item, setItems, items, tipoItem }) {
  return (
    <>
      <TextAreaTag             setItems={setItems} id={item.id} items={items} tipoItem={tipoItem} tipoSelezione={item.tipo_selezione}             nome="nome_cognome" valore={item.nome + " " + item.cognome} modificabile={false} />
      <InputTag                setItems={setItems} id={item.id} items={items} tipoItem={tipoItem} tipoSelezione={item.tipo_selezione} tipo="text" nome="contatto"     valore={item.contatto}                  modificabile={true} />      
      <TextAreaTag             setItems={setItems} id={item.id} items={items} tipoItem={tipoItem} tipoSelezione={item.tipo_selezione}             nome="note"         valore={item.note}                      modificabile={true} />
      <OperazioniItemEsistente setItems={setItems} id={item.id} items={items} tipoItem={tipoItem} tipoSelezione={item.tipo_selezione} selectOperation={selectOperation} item={item} />
    </>
  );
}

function CardProfessionista({ selectOperation, item, setItems, items, tipoItem }) {  
  return (
    <>
      {/* <div>{item.id}</div> */}
      {/* <div>{item.tipo_selezione}</div> */}
      <TextAreaTag             setItems={setItems} id={item.id} items={items} tipoItem={tipoItem} tipoSelezione={item.tipo_selezione}              nome="nome"        valore={item.nome}        modificabile={false} />
      <TextAreaTag             setItems={setItems} id={item.id} items={items} tipoItem={tipoItem} tipoSelezione={item.tipo_selezione}              nome="professione" valore={item.professione} modificabile={false} />
      <InputTag                setItems={setItems} id={item.id} items={items} tipoItem={tipoItem} tipoSelezione={item.tipo_selezione} tipo="text"  nome="contatto"    valore={item.contatto}    modificabile={true} />
      <InputTag                setItems={setItems} id={item.id} items={items} tipoItem={tipoItem} tipoSelezione={item.tipo_selezione} tipo="email" nome="email"       valore={item.email}       modificabile={true} />
      <TextAreaTag             setItems={setItems} id={item.id} items={items} tipoItem={tipoItem} tipoSelezione={item.tipo_selezione}              nome="note"        valore={item.note}        modificabile={true} />
      <OperazioniItemEsistente tipoSelezione={item.tipo_selezione} selectOperation={selectOperation} item={item} />
    </>
  );
}

function CardLavoro({selectOperation, item, items, setItems, setItem, tipoItem}) {
  return (
    <>
      {/* {(item.tipo_lavoro === "Lavoro cliente") && (
        <TextAreaTag  setItems={setItems} id={item.id} items={items} tipoItem={tipoItem} tipoSelezione={item.tipo_selezione}             nome="nome_cognome_cliente" valore={item.nome_cliente + " " + item.cognome_cliente} modificabile={false}   />
      )}
      {(item.tipo_lavoro === "Lavoro professionista") && (
        <>
          <TextAreaTag setItems={setItems} id={item.id} items={items} tipoItem={tipoItem} tipoSelezione={item.tipo_selezione}             nome="nome_professionista_e_professione"  valore={item.nome_professionista + " - " + item.professione}                         modificabile={false} />
        </>
      )} */}
      {/* {(tipoItem.startsWith("lavoro")) && ( */}
        {/* <> */}
          <TextAreaTag setItems={setItems} id={item.id} items={items} tipoItem={tipoItem} tipoSelezione={item.tipo_selezione}             nome="descrizione"          valore={item.descrizione}                                 modificabile={true} />
          <InputTag    setItems={setItems} id={item.id} items={items} tipoItem={tipoItem} tipoSelezione={item.tipo_selezione} tipo="date" nome="giorno"               valore={formatoDate(item.giorno, "AAAA-MM-GG")}           modificabile={true} />
          <InputTag    setItems={setItems} id={item.id} items={items} tipoItem={tipoItem} tipoSelezione={item.tipo_selezione} tipo="time" nome="orario_inizio"        valore={formatoTime(item.orario_inizio)}                  modificabile={true} />
          <InputTag    setItems={setItems} id={item.id} items={items} tipoItem={tipoItem} tipoSelezione={item.tipo_selezione} tipo="time" nome="orario_fine"          valore={formatoTime(item.orario_fine)}                    modificabile={true} />
          <TextAreaTag setItems={setItems} id={item.id} items={items} tipoItem={tipoItem} tipoSelezione={item.tipo_selezione}             nome="note"                 valore={item.note}                                        modificabile={true} />
        {/* </> */}
      {/* )} */}
      <OperazioniItemEsistente tipoSelezione={item.tipo_selezione} selectOperation={selectOperation} item={item} />
    </>
  );
}

function CampiItem({campiItem, setItem, eseguiSalvataggio}) {
  return (
    <>
      {campiItem.map(([label, placeholder, name, value, type, errore], index) => (
        <React.Fragment key={index}>
          {(type === null) && (
            <StyledTextAreaModifica rows="1" placeholder={placeholder} name={name} value={value} onChange={(e) => handleInputChange(e, setItem)} />
          )}
          {(type !== null) && (
            <StyledInputModifica rows="1" type={type} placeholder={placeholder} name={name} value={value} onChange={(e) => handleInputChange(e, setItem)} />
          )}
          <StyledSpanErrore>{errore}</StyledSpanErrore>
        </React.Fragment>
      ))}
    </>
  );
}

function CardNuovoLavoro({clienti, professionisti, tipoLavoro, tipoItem, item, setItem, eseguiSalvataggio}) {
  const [clientiFiltrati, setClientiFiltrati] = useState([]);
  const [professionistiFiltrati, setProfessionistiFiltrati] = useState([]);
  useEffect(() => {
    setClientiFiltrati(clienti);
    setProfessionistiFiltrati(professionisti);
  })

  return (
    <>
      {(tipoLavoro === "Lavoro cliente") && (
        <>
          <StyledSelect value={item.id_cliente} name="id_cliente" onChange={(e) => handleInputChange(e, setItem)}>
            <StyledOption key={0} value="">Seleziona un cliente*</StyledOption>
              {clientiFiltrati.map((clienteFiltrato, index) => (
                <StyledOption key={index + 1} value={clienteFiltrato.id}>
                          {clienteFiltrato.nome + " " + clienteFiltrato.cognome + " - " + clienteFiltrato.contatto}
                </StyledOption>
              ))}
          </StyledSelect>
        </>
      )}
      {(tipoLavoro === "Lavoro professionista") && (
        <>
          <StyledSelect value={item.id_professionista} name="id_professionista" onChange={(e) => handleInputChange(e, setItem)}>
            <StyledOption key={0} value="">Seleziona un professionista*</StyledOption>
              {professionistiFiltrati.map((professionistaFiltrato, index) => (
                <StyledOption key={index + 1} value={professionistaFiltrato.id}>
                          {professionistaFiltrato.nome + " - " + professionistaFiltrato.contatto + " - " + professionistaFiltrato.email}
                </StyledOption>
              ))}
          </StyledSelect>
        </>
      )}
      <TextAreaTag tipoSelezione={1} nome="descrizione" placeholder="Descrizione*" valore={item.descrizione} setItem={setItem} modificabile={true} />
      <InputTag tipoSelezione={1} tipo="date" nome="giorno" placeholder="Giorno*" valore={item.giorno} setItem={setItem} modificabile={true} />
      <InputTag tipoSelezione={1} tipo="time" nome="orario_inizio" placeholder="Orario inizio*" valore={item.orario_inizio} setItem={setItem} modificabile={true} />
      <InputTag tipoSelezione={1} tipo="time" nome="orario_fine" placeholder="Orario fine*" valore={item.orario_fine} setItem={setItem} modificabile={true} />
      <TextAreaTag tipoSelezione={1} nome="note" placeholder="Note*" valore={item.note} setItem={setItem} modificabile={true} />
      <OperazioniNuovoItem eseguiSalvataggio={eseguiSalvataggio} />
    </>
  );
}

function CardNuovoItem({tipoItem, item, setItem, eseguiSalvataggio, errori}) {
  const campiNuovoItem = getCampiNuovoItem(tipoItem, item, errori);
  // let maxHeight = (isVisible) ? "2000px" : "0px";
  let maxHeight = "2000px";
  return (
    <>
      <SlideContainer style={{maxHeight: `${maxHeight}`}}>
        <CampiItem campiItem={campiNuovoItem} setItem={setItem} />
      </SlideContainer>
      <OperazioniNuovoItem eseguiSalvataggio={eseguiSalvataggio} />
    </>
  );
}

function CardRicercaItem({tipoItem, item, setItem, eseguiRicerca, isVisible, setIsVisible, arrowUp, setArrowUp}) {
  const campiRicercaItems = getCampiRicerca(tipoItem, item);
  let maxHeight = (isVisible) ? "2000px" : "0px";
  return (
    <>
      <SlideContainer style={{maxHeight: `${maxHeight}`}}>
        <CampiItem campiItem={campiRicercaItems} setItem={setItem} />
      </SlideContainer>
      <OperazioniCercaItems setIsVisible={setIsVisible} arrowUp={arrowUp} setArrowUp={setArrowUp} eseguiRicerca={eseguiRicerca}
      />
    </>
  );
}

function CardLogin({item, setItem, errori, setErrori, eseguiLogin}) {
  return (
    <>
      <StyledTextAreaModifica rows="1" name="username" placeholder='Username*' value={item.username} onChange={(e) => handleInputChange(e, setItem)} />
      <StyledSpanErrore>{errori.username}</StyledSpanErrore>
      <StyledTextAreaModifica rows="1" name="password" placeholder='Password*' value={item.password} onChange={(e) => handleInputChange(e, setItem)} />
      <StyledSpanErrore>{errori.password}</StyledSpanErrore>
      <OperazioniLogin eseguiLogin={eseguiLogin} />
    </>
  );
}

function CardModificaProfilo({ item, setItem, errori, eseguiModificaProfilo }) {
  return (
    <>
      <StyledTextAreaModifica rows="1" name="nuovo_username" placeholder='Nuovo username*' value={item.nuovo_username} onChange={(e) => handleInputChange(e, setItem)} />
      {(errori.nuovo_username !== "") && (<StyledSpanErrore>{errori.nuovo_username}</StyledSpanErrore>)}
      <StyledTextAreaModifica rows="1" name="note" placeholder='Note' value={item.note} onChange={(e) => handleInputChange(e, setItem)} />
      {(errori.note !== "") && (<StyledSpanErrore>{errori.note}</StyledSpanErrore>)}
      <StyledTextAreaModifica rows="1" name="password_attuale" placeholder='Password attuale*' value={item.password_attuale} onChange={(e) => handleInputChange(e, setItem)} />
      {(errori.password_attuale !== "") && (<StyledSpanErrore>{errori.password_attuale}</StyledSpanErrore>)}
      <StyledTextAreaModifica rows="1" name="nuova_password" placeholder='Nuova password' value={item.nuova_password} onChange={(e) => handleInputChange(e, setItem)} />
      {(errori.nuova_password !== "") && (<StyledSpanErrore>{errori.nuova_password}</StyledSpanErrore>)}  
      <StyledTextAreaModifica rows="1" name="conferma_nuova_password" placeholder='Conferma nuova password' value={item.conferma_nuova_password} onChange={(e) => handleInputChange(e, setItem)} />
      {(errori.conferma_nuova_password !== "") && (<StyledSpanErrore>{errori.conferma_nuova_password}</StyledSpanErrore>)}
      <OperazioniModificaProfilo eseguiModificaProfilo={eseguiModificaProfilo} />
    </>
  );
}

function CardItem({errori, setErrori, clienti, professionisti, tipoLavoro, tipoItem, item, setItem, items, setItems, header, selectOperation, eseguiRicerca, eseguiSalvataggio, eseguiLogin, eseguiModificaProfilo}) {
  const [isVisible, setIsVisible] = useState(true);
  const [arrowUp, setArrowUp] = useState(true);
  const [erroriCliente, setErroriCliente] = useState({
    contatto: "Errore contatto.", 
    note: "Errore note."
  })
  item.tipo_selezione = (item.tipo_selezione === undefined) ? 0 : item.tipo_selezione;
  header = (tipoItem === "lavoro") ? item.tipo_lavoro : header;
  return (
    <StyledCard>
      <StyledCardHeader style={{backgroundColor: "#000000"}}>{(header !== "") ? header : " "}</StyledCardHeader>
      <StyledListGroupItem variant="flush">
        {(tipoItem === "nuovo cliente" || tipoItem === "nuovo professionista") && (
          <CardNuovoItem tipoItem={tipoItem} item={item} setItem={setItem} eseguiSalvataggio={eseguiSalvataggio} errori={errori} />
        )}
        {(tipoItem === "nuovo lavoro") && (
          // <CardNuovoLavoro clienti={clienti} professionisti={professionisti} tipoLavoro={tipoLavoro} tipoItem={tipoItem} item={item} setItem={setItem} eseguiSalvataggio={eseguiSalvataggio} />
          <button>Nuovo lavoro</button>
        )}
        {(tipoItem.startsWith("cerca")) && (
          <CardRicercaItem tipoItem={tipoItem} item={item} setItem={setItem} eseguiRicerca={eseguiRicerca} 
            isVisible={isVisible} setIsVisible={setIsVisible} 
            arrowUp={arrowUp} setArrowUp={setArrowUp} 
          />
        )}
        {(tipoItem === "cliente") && (
          <CardCliente items={items} tipoItem={tipoItem} selectOperation={selectOperation} item={item} setItems={setItems} />
        )}
        {(tipoItem === "professionista") && (
          <CardProfessionista item={item} selectOperation={selectOperation} items={items} tipoItem={tipoItem} setItems={setItems} />
        )}
        {(tipoItem.startsWith("lavoro")) && (
          <CardLavoro tipoItem={tipoItem} item={item} selectOperation={selectOperation} items={items} setItems={setItems} />
        )}
        {(tipoItem === "login") && (
          <CardLogin item={item} setItem={setItem} errori={errori} setErrori={setErrori} eseguiLogin={eseguiLogin} />
        )}
        {(tipoItem.startsWith("modifica profilo")) && (
          <CardModificaProfilo item={item} setItem={setItem} errori={errori} eseguiModificaProfilo={eseguiModificaProfilo} />
        )}
      </StyledListGroupItem>
    </StyledCard>
  );
}

export default CardItem;









