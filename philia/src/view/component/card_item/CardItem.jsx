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
  StyledArrowTopNotSelected, StyledArrowBottomNotSelected, 
  StyledSelect, StyledOption, StyledSpanErrore
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

const TextAreaTag = ({ tipoSelezione, nome, valore, modificabile, setItem, placeholder }) => {
  switch(tipoSelezione) {
    case 0:
      return <StyledTextAreaBlock rows="1" name={nome} placeholder={placeholder} value={valore} readOnly />;
    case 1:
      return (modificabile) ? <StyledTextAreaModifica rows="1" name={nome} placeholder={placeholder} value={valore} onChange={(e) => handleInputChange(e, setItem)} />
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

const InputTag = ({ tipoSelezione, tipo, nome, valore, modificabile, setItem, placeholder }) => {
  switch(tipoSelezione) {
    case 0:
      return <StyledInputBlock rows="1" type={getTypeIfEmpty(tipo, valore)} name={nome} placeholder={placeholder} value={valore}  readOnly />;
    case 1:
      return (modificabile) ? <StyledInputModifica rows="1" type={getTypeIfEmpty(tipo, valore)} name={nome} placeholder={placeholder} value={valore} onClick={() => cambiaTipo({tipo})} onChange={(e) => handleInputChange(e, setItem)} />
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

function CardCliente({ item, selectOperation }) {
  const [cliente, setCliente] = useState(item);
  
  return (
    <>
      <div>{item.id}</div>
      <TextAreaTag             tipoSelezione={cliente.tipo_selezione}             nome="nome_cognome" valore={cliente.nome + " " + cliente.cognome} setItem={setCliente} modificabile={false} />
      <InputTag                tipoSelezione={cliente.tipo_selezione} tipo="text" nome="contatto"     valore={cliente.contatto}                     setItem={setCliente} modificabile={true} />
      <TextAreaTag             tipoSelezione={cliente.tipo_selezione}             nome="note"         valore={cliente.note}                         setItem={setCliente} modificabile={true} />
      <OperazioniItemEsistente tipoSelezione={cliente.tipo_selezione} selectOperation={selectOperation} item={cliente} />
    </>
  );
}

function CardProfessionista({ item, selectOperation }) {
  const [professionista, setProfessionista] = useState(item);
  
  return (
    <>
      <div>{item.id}</div>
      <div>{item.tipo_selezione}</div>
      <TextAreaTag             tipoSelezione={professionista.tipo_selezione}              nome="nome"        valore={professionista.nome}        setItem={setProfessionista} modificabile={false} />
      <TextAreaTag             tipoSelezione={professionista.tipo_selezione}              nome="professione" valore={professionista.professione} setItem={setProfessionista} modificabile={false} />
      <InputTag                tipoSelezione={professionista.tipo_selezione} tipo="text"  nome="contatto"    valore={professionista.contatto}    setItem={setProfessionista} modificabile={true} />
      <InputTag                tipoSelezione={professionista.tipo_selezione} tipo="email" nome="email"       valore={professionista.email}       setItem={setProfessionista} modificabile={true} />
      <TextAreaTag             tipoSelezione={professionista.tipo_selezione}              nome="note"        valore={professionista.note}        setItem={setProfessionista} modificabile={true} />
      <OperazioniItemEsistente tipoSelezione={professionista.tipo_selezione} selectOperation={selectOperation} item={professionista} />
    </>
  );
}

function CardLavoro({ tipoItem, item, selectOperation }) {
  const [lavoro, setLavoro] = useState(item);

  return (
    <>
      {(lavoro.tipo_lavoro === "Lavoro cliente") && (
        <TextAreaTag   tipoSelezione={lavoro.tipo_selezione}             nome="nome_cognome_cliente" valore={lavoro.nome_cliente + " " + lavoro.cognome_cliente} setItem={setLavoro} modificabile={false}   />
      )}
      {(lavoro.tipo_lavoro === "Lavoro professionista") && (
        <>
          <TextAreaTag tipoSelezione={lavoro.tipo_selezione}             nome="nome_professionista_e_professione"  valore={lavoro.nome_professionista + " - " + lavoro.professione}                         setItem={setLavoro} modificabile={false} />
        </>
      )}
      {(tipoItem.startsWith("lavoro")) && (
        <>
          <TextAreaTag tipoSelezione={lavoro.tipo_selezione}             nome="descrizione"          valore={lavoro.descrizione}                                 setItem={setLavoro} modificabile={true} />
          <InputTag    tipoSelezione={lavoro.tipo_selezione} tipo="date" nome="giorno"               valore={formatoDate(lavoro.giorno, "AAAA-MM-GG")}           setItem={setLavoro} modificabile={true} />
          <InputTag    tipoSelezione={lavoro.tipo_selezione} tipo="time" nome="orario_inizio"        valore={formatoTime(lavoro.orario_inizio)}                  setItem={setLavoro} modificabile={true} />
          <InputTag    tipoSelezione={lavoro.tipo_selezione} tipo="time" nome="orario_fine"          valore={formatoTime(lavoro.orario_fine)}                    setItem={setLavoro} modificabile={true} />
          <TextAreaTag tipoSelezione={lavoro.tipo_selezione}             nome="note"                 valore={lavoro.note}                                        setItem={setLavoro} modificabile={true} />
        </>
      )}
      <OperazioniItemEsistente tipoSelezione={lavoro.tipo_selezione} selectOperation={selectOperation} item={lavoro} />
    </>
  );
}

function CardModificaProfilo({ item }) {
  return (
    <>
      <StyledTextArea rows="1" name="username" placeholder='Username*'/>
      <StyledTextArea rows="1" name="note" placeholder='Note'/>
      <StyledTextArea rows="1" name="password_attuale" placeholder='Password attuale*'/>
      <StyledTextArea rows="1" name="nuova_password" placeholder='Nuova password'/>
      <StyledTextArea rows="1" name="conferma_nuova_password" placeholder='Conferma nuova password'/>
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
  return (
    <>
      <SlideContainer isVisible={true}>
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

function CardItem({errori, clienti, professionisti, tipoLavoro, tipoItem, item, setItem, header, selectOperation, eseguiRicerca, eseguiSalvataggio}) {
  const [isVisible, setIsVisible] = useState(true);
  const [arrowUp, setArrowUp] = useState(true);
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
          <CardNuovoLavoro clienti={clienti} professionisti={professionisti} tipoLavoro={tipoLavoro} tipoItem={tipoItem} item={item} setItem={setItem} eseguiSalvataggio={eseguiSalvataggio} />
        )}
        {(tipoItem.startsWith("cerca")) && (
          <CardRicercaItem tipoItem={tipoItem} item={item} setItem={setItem} eseguiRicerca={eseguiRicerca} 
            isVisible={isVisible} setIsVisible={setIsVisible} 
            arrowUp={arrowUp} setArrowUp={setArrowUp} 
          />
        )}
        {(tipoItem === "cliente") &&(
          <CardCliente item={item} selectOperation={selectOperation} />
        )}
        {(tipoItem === "professionista") &&(
          <CardProfessionista item={item} selectOperation={selectOperation} />
        )}
        {(tipoItem.startsWith("lavoro")) &&(
          <CardLavoro tipoItem={tipoItem} item={item} selectOperation={selectOperation} />
        )}
        {(tipoItem.startsWith("modifica profilo")) &&(
          <CardModificaProfilo item={item} />
        )}
      </StyledListGroupItem>
    </StyledCard>
  );
}

export default CardItem;









