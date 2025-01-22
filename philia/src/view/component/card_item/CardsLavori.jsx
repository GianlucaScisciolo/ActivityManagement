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

function OperazioniNuovoItem({eseguiSalvataggio}) {
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

function OperazioniCercaItems({ setIsVisible, arrowUp, setArrowUp, eseguiRicerca }) {
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

function OperazioniItemEsistente ({ tipoSelezione, selectOperation, item }) {
  return (
    <StyledListGroupItem style={{ border: "5px solid #000000", backgroundColor: "#000000", paddingTop: "3%" }}>
      <PencilTag tipoSelezione={item.tipo_selezione} selectOperation={selectOperation} item={item} />
      <TrashTag tipoSelezione={item.tipo_selezione} selectOperation={selectOperation} item={item} />
    </StyledListGroupItem>
  )
}

const handleGiornoClick = (setGiornoType) => {
  return () => {
    setGiornoType('date');
  };
};

const handleGiornoBlur = (setGiornoType, item, setItem) => {
  return () => {
    if(!item.giorno)
      setGiornoType('text');
    else
      setGiornoType('date');
  };
};

function cambioValoriOrari(e, setValue) {
  e.preventDefault();

  const nome_campi = [
    "ora_inizio", "ora_fine", "minuto_inizio", "minuto_fine"
  ]
  
  const { name, value } = e.target;

  if(nome_campi.includes(name)) {
    setValue(prevState => ({
      ...prevState,
      [name]: value
    }))
  }
  else {
    alert("Errore, nome campo " + name + " non valido.");
  }
}


export function CardNuovoLavoro({clienti, professionisti, header, item, setItem, eseguiSalvataggio}) {
  const ore = ["07", "08", "09", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22"];
  const minuti = ["00", "30"];
  let maxHeight = "2000px";

  const [giornoType, setGiornoType] = useState('text');

  item.giorno = item.giorno !== undefined ? item.giorno : '';

  return (
    <>
      <StyledCard>
        <StyledCardHeader>{header}</StyledCardHeader>
        {(header === "Nuovo lavoro cliente") && (
          <>
            <StyledSelect style={{width: "100%"}} name="id_cliente" value={item.id_cliente} onChange={(e) => handleInputChange(e, setItem)}>
              <StyledOption value="0">Seleziona il cliente</StyledOption>
              {clienti.map((cliente) => (
                <StyledOption key={cliente.id} value={cliente.id}>{cliente.nome + " " + cliente.cognome}</StyledOption>  
              ))}
            </StyledSelect>
          </>
        )}
        {(header === "Nuovo lavoro professionista") && (
          <>
            <StyledSelect style={{width: "100%"}} name="id_professionista" value={item.id_professionista} onChange={(e) => handleInputChange(e, setItem)}>
              <StyledOption value="0">Seleziona il professionista</StyledOption>
              {professionisti.map((professionista) => (
                <StyledOption key={professionista.id} value={professionista.id}>{professionista.nome + " - " + professionista.professione}</StyledOption>  
              ))}
            </StyledSelect>
          </>
        )}
        <StyledInputModifica
          rows="1"
          placeholder="Giorno*"
          type={giornoType}
          name="giorno"
          value={item.giorno}
          onClick={handleGiornoClick(setGiornoType)}
          onBlur={handleGiornoBlur(setGiornoType, item, setItem)}
          onChange={(e) => handleInputChange(e, setItem)}
        />
        <Row>
          <Col style={{ padding: '0', margin: '0', paddingLeft: '19px' }}>
            <StyledSelect name="ora_inizio" value={item.ora_inizio} onChange={(e) => cambioValoriOrari(e, setItem)}>
              <StyledOption value="">Ora inizio</StyledOption>
              {ore.map((ora) => (
                <StyledOption key={ora} value={ora}>{ora}</StyledOption>  
              ))}
            </StyledSelect>
          </Col>
          <Col style={{ padding: '0', margin: '0', paddingRight: '19px' }}>
            <StyledSelect name="minuto_inizio" value={item.minuto_inizio} onChange={(e) => cambioValoriOrari(e, setItem)}>
              <StyledOption value="">Minuto inizio</StyledOption>
              {minuti.map((minuto) => (
                <StyledOption key={minuto} value={minuto}>{minuto}</StyledOption>  
              ))}
            </StyledSelect>
          </Col>
        </Row>
        <Row>
          <Col style={{ padding: '0', margin: '0', paddingLeft: '19px' }}>
            <StyledSelect name="ora_fine" value={item.ora_fine} onChange={(e) => cambioValoriOrari(e, setItem)}>
              <StyledOption value="">Ora fine</StyledOption>
              {ore.map((ora) => (
                <StyledOption key={ora} value={ora}>{ora}</StyledOption>  
              ))}
            </StyledSelect>
          </Col>
          <Col style={{ padding: '0', margin: '0', paddingRight: '19px' }}>
            <StyledSelect name="minuto_fine" value={item.minuto_fine} onChange={(e) => cambioValoriOrari(e, setItem)}>
              <StyledOption value="">Minuto fine</StyledOption>
              {minuti.map((minuto) => (
                <StyledOption key={minuto} value={minuto}>{minuto}</StyledOption>  
              ))}
            </StyledSelect>
          </Col>
        </Row>
        <StyledTextAreaModifica
          rows="1"
          placeholder="Descrizione*"
          name="descrizione"
          value={item.descrizione}
          onChange={(e) => handleInputChange(e, setItem)}
        />
        <StyledTextAreaModifica
          rows="1"
          placeholder="Note*"
          name="note"
          value={item.note}
          onChange={(e) => handleInputChange(e, setItem)}
        />
        <OperazioniNuovoItem eseguiSalvataggio={eseguiSalvataggio} />
      </StyledCard>
    </>
  );
}

export function CardCercaLavori({ item, setItem, eseguiRicerca }) {
  const ore = ["07", "08", "09", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22"];
  const minuti = ["00", "30"];
  const [isVisible, setIsVisible] = useState(true);
  const [arrowUp, setArrowUp] = useState(true);
  let maxHeight = (isVisible) ? "2000px" : "0px";

  const [primoGiornoType, setPrimoGiornoType] = useState('text');
  const [ultimoGiornoType, setUltimoGiornoType] = useState('text');

  item.primo_giorno = (item.primo_giorno !== undefined) ? item.primo_giorno : '';
  item.ultimo_giorno = (item.ultimo_giorno !== undefined) ? item.ultimo_giorno : '';  
  
  return (
    <>
      <StyledCard>
        <StyledCardHeader>Ricerca lavori</StyledCardHeader>
        <StyledInputModifica
          rows="1"
          placeholder="Nome cliente"
          type="text"
          name="nome_cliente"
          value={item.nome_cliente}
          onChange={(e) => handleInputChange(e, setItem)}
        />
        <StyledInputModifica
          rows="1"
          placeholder="Cognome cliente"
          type="text"
          name="cognome_cliente"
          value={item.cognome_cliente}
          onChange={(e) => handleInputChange(e, setItem)}
        />
        <StyledInputModifica
          rows="1"
          placeholder="Nome professionista"
          type="text"
          name="nome_professionista"
          value={item.nome_professionista}
          onChange={(e) => handleInputChange(e, setItem)}
        />
        <StyledInputModifica
          rows="1"
          placeholder="Professione"
          type="text"
          name="professione"
          value={item.professione}
          onChange={(e) => handleInputChange(e, setItem)}
        />
        <StyledInputModifica
          rows="1"
          placeholder="Primo giorno"
          type={primoGiornoType}
          name="primo_giorno"
          value={item.primo_giorno}
          onClick={handleGiornoClick(setPrimoGiornoType)}
          onBlur={handleGiornoBlur(setPrimoGiornoType, item, setItem)}
          onChange={(e) => handleInputChange(e, setItem)}
        />
        <StyledInputModifica
          rows="1"
          placeholder="Ultimo giorno"
          type={ultimoGiornoType}
          name="ultimo_giorno"
          value={item.ultimo_giorno}
          onClick={handleGiornoClick(setUltimoGiornoType)}
          onBlur={handleGiornoBlur(setUltimoGiornoType, item, setItem)}
          onChange={(e) => handleInputChange(e, setItem)}
        />
        <StyledTextAreaModifica
          rows="1"
          placeholder="Descrizione"
          name="descrizione"
          value={item.descrizione}
          onChange={(e) => handleInputChange(e, setItem)}
        />
        <StyledTextAreaModifica
          rows="1"
          placeholder="Note"
          name="note"
          value={item.note}
          onChange={(e) => handleInputChange(e, setItem)}
        />
        <OperazioniCercaItems
          setIsVisible={setIsVisible}
          arrowUp={arrowUp}
          setArrowUp={setArrowUp}
          eseguiRicerca={eseguiRicerca}
        />
      </StyledCard>
    </>
  );
}

export function CardLavoroEsistente({item, items, setItems, selectOperation}) {
  const ore = ["07", "08", "09", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22"];
  const minuti = ["00", "30"];
  let maxHeight = "2000px";
  const [giornoType, setGiornoType] = useState('text');
  item.giorno = item.giorno !== undefined ? item.giorno : '';

  return (
    <>
      <StyledCard>
        <StyledCardHeader>Lavoro</StyledCardHeader>
        <SlideContainer style={{maxHeight: `${maxHeight}`}}>
          <StyledInputModifica
            rows="1"
            placeholder="Giorno*"
            type={giornoType}
            name="giorno"
            value={formatoDate(item.giorno, "AAAA-MM-GG")}
            onClick={handleGiornoClick(setGiornoType)}
            onBlur={handleGiornoBlur(setGiornoType, item, setItems)}
            onChange={(e) => handleInputChange(e, setItems)}
          />
          <Row>
            <Col style={{ padding: '0', margin: '0', paddingLeft: '19px' }}>
              <StyledSelect name="ora_inizio" value={item.ora_inizio} onChange={(e) => cambioValoriOrari(e, setItem)}>
                <StyledOption value="">Ora inizio</StyledOption>
                {ore.map((ora) => (
                  <StyledOption key={ora} value={ora}>{ora}</StyledOption>  
                ))}
              </StyledSelect>
            </Col>
            <Col style={{ padding: '0', margin: '0', paddingRight: '19px' }}>
              <StyledSelect name="minuto_inizio" value={item.minuto_inizio} onChange={(e) => cambioValoriOrari(e, setItem)}>
                <StyledOption value="">Minuto inizio</StyledOption>
                {minuti.map((minuto) => (
                  <StyledOption key={minuto} value={minuto}>{minuto}</StyledOption>  
                ))}
              </StyledSelect>
            </Col>
          </Row>
          <Row>
            <Col style={{ padding: '0', margin: '0', paddingLeft: '19px' }}>
              <StyledSelect name="ora_fine" value={item.ora_fine} onChange={(e) => cambioValoriOrari(e, setItem)}>
                <StyledOption value="">Ora fine</StyledOption>
                {ore.map((ora) => (
                  <StyledOption key={ora} value={ora}>{ora}</StyledOption>  
                ))}
              </StyledSelect>
            </Col>
            <Col style={{ padding: '0', margin: '0', paddingRight: '19px' }}>
              <StyledSelect name="minuto_fine" value={item.minuto_fine} onChange={(e) => cambioValoriOrari(e, setItem)}>
                <StyledOption value="">Minuto fine</StyledOption>
                {minuti.map((minuto) => (
                  <StyledOption key={minuto} value={minuto}>{minuto}</StyledOption>  
                ))}
              </StyledSelect>
            </Col>
          </Row>
          <StyledTextAreaModifica
            rows="1"
            placeholder="Descrizione*"
            name="descrizione"
            value={item.descrizione}
            onChange={(e) => handleInputChange(e, setItem)}
          />
          <StyledTextAreaModifica
            rows="1"
            placeholder="Note*"
            name="note"
            value={item.note}
            onChange={(e) => handleInputChange(e, setItem)}
          />
        </SlideContainer>
        <OperazioniItemEsistente selectOperation={selectOperation} item={item} />
      </StyledCard>
    </>
  );
}














