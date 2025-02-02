import React, { useState, useEffect } from 'react';
import ListGroup from 'react-bootstrap/ListGroup';
import Row from 'react-bootstrap/esm/Row';
import Col from 'react-bootstrap/esm/Col';
import { Trash2, Pencil, Plus, Search } from 'lucide-react';
import { HookItems } from '../../../vario/HookItems';
import { useSelector, useDispatch } from 'react-redux';
import { faFilePdf, faFileExcel } from '@fortawesome/free-solid-svg-icons';
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
  StyledSelectBlock, StyledSelectModifica, StyledSelectElimina, StyledOption, StyledSpanErrore, StyledLoginNotSelected, 
  StyledFileIconNotSelected, StyledDownloadNotSelected, StyledDeleteNotSelected, StyledTrashNotSelected2
} from './StyledCardItem';
import { 
  handleInputChange, handleInputChangeLavoroEsistente, handleInputChangeNuovoLavoro, cambiamentoBloccato, getCampiRicerca, getCampiNuovoItem
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

const SelectTag = ({ tipoSelezione, nome, valore, modificabile, setItem, items, setItems, tipoItem, id }) => {
  switch(tipoSelezione) {
    case 0:
      return <StyledSelectBlock name={nome} value={valore} onChange={onChangeFunction}></StyledSelectBlock>;
    case 1:
      return (modificabile) ? <StyledSelectModifica name={nome} value={valore} onChange={onChangeFunction}></StyledSelectModifica>
                            : <StyledSelectBlock name={nome} value={valore} onChange={onChangeFunction}></StyledSelectBlock>;
    case 2:
      return <StyledSelectElimina name={nome} value={valore} onChange={onChangeFunction}></StyledSelectElimina>;
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

function OperazioniFileItems({ottieniLavoriRangePDF, ottieniLavoriRangeExcel, eliminaLavoriRange}) {
  return (
    <StyledListGroupItem style={{ border: "5px solid #000000", backgroundColor: "#000000", paddingTop: "3%" }}>
      <div>
        <StyledFileIconNotSelected icon={faFilePdf} size="2xl" style={{ marginRight: "50%" }} />
        <StyledFileIconNotSelected icon={faFileExcel} size="2xl" />
      </div>
      <br />
      <div>
        <StyledDownloadNotSelected size={grandezzaIcona} style={{ marginRight: "50%" }} onClick={ottieniLavoriRangePDF} />
        <StyledDownloadNotSelected size={grandezzaIcona} onClick={ottieniLavoriRangeExcel} />
      </div>
      <br />
      <div>
        <StyledTrashNotSelected2 size={grandezzaIcona} onClick={eliminaLavoriRange} />
      </div>
      <br />
    </StyledListGroupItem>
  );
};

const handleGiornoClick = (setGiornoType) => {
  return () => {
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

export function CardNuovoLavoro({lavoriGiornoSelezionato, setLavoriGiornoSelezionato, handleInputChangeGiorno, handleGiornoBlur, clienti, professionisti, item, setItem, eseguiSalvataggio}) {
  const orari = {
    "07:00": [0, 0, 0], "07:30": [1, 0, 0], 
    "08:00": [2, 0, 0], "08:30": [3, 0, 0], 
    "09:00": [4, 0, 0], "09:30": [5, 0, 0], 
    "10:00": [6, 0, 0], "10:30": [7, 0, 0], 
    "11:00": [8, 0, 0], "11:30": [9, 0, 0], 
    "12:00": [10, 0, 0], "12:30": [11, 0, 0], 
    "13:00": [12, 0, 0], "13:30": [13, 0, 0], 
    "14:00": [14, 0, 0], "14:30": [15, 0, 0], 
    "15:00": [16, 0, 0], "15:30": [17, 0, 0], 
    "16:00": [18, 0, 0], "16:30": [19, 0, 0], 
    "17:00": [20, 0, 0], "17:30": [21, 0, 0], 
    "18:00": [22, 0, 0], "18:30": [23, 0, 0], 
    "19:00": [24, 0, 0], "19:30": [25, 0, 0], 
    "20:00": [26, 0, 0], "20:30": [27, 0, 0], 
    "21:00": [28, 0, 0], "21:30": [29, 0, 0], 
    "22:00": [30, 0, 0]
  };

  const [giornoType, setGiornoType] = useState('text');

  let maxHeight = "2000px";

  item.giorno = item.giorno !== undefined ? item.giorno : '';

  return (
    <>

      <StyledCard>
        <StyledCardHeader>Nuovo lavoro</StyledCardHeader>
        {Object.entries(orari).map(([key, value], index) => (
          <React.Fragment key={index}>
            <div>{key} - [{value[0]}, {value[1]}, {value[2]}]</div>
          </React.Fragment>
        ))}
        <StyledSelectModifica style={{width: "100%"}} name="id_cliente" value={item.id_cliente} onChange={(e) => handleInputChangeNuovoLavoro(e, setItem)}>
          <StyledOption value="0">Seleziona il cliente</StyledOption>
          {clienti.map((cliente) => (
            <StyledOption key={cliente.id} value={cliente.id}>{cliente.nome + " " + cliente.cognome}</StyledOption>  
          ))}
        </StyledSelectModifica>
        <StyledSelectModifica style={{width: "100%"}} name="id_professionista" value={item.id_professionista} onChange={(e) => handleInputChangeNuovoLavoro(e, setItem)}>
          <StyledOption value="0">Seleziona il professionista</StyledOption>
          {professionisti.map((professionista) => (
            <StyledOption key={professionista.id} value={professionista.id}>{professionista.nome + " - " + professionista.professione}</StyledOption>  
          ))}
        </StyledSelectModifica>
        {(item.errore_cliente_e_professionista !== "") && (<StyledSpanErrore>{item.errore_cliente_e_professionista}</StyledSpanErrore>)}
        <StyledInputModifica
          rows="1"
          placeholder="Giorno*"
          type={giornoType}
          name="giorno"
          value={item.giorno}
          onClick={handleGiornoClick(setGiornoType)}
          onBlur={handleGiornoBlur(setGiornoType, item, orari)}
          onChange={handleInputChangeGiorno}
        />
        {(item.errore_giorno !== "") && (<StyledSpanErrore>{item.errore_giorno}</StyledSpanErrore>)}
        {(item.giorno) && (
          <>
            <Row>
              <Col style={{ padding: '0', margin: '0', paddingLeft: '19px' }}>
                <StyledSelectModifica name="orario_inizio" value={item.orario_inizio} onChange={(e) => handleInputChangeNuovoLavoro(e, setItem)}>
                  <StyledOption value="">Orario inizio</StyledOption>
                  {Object.entries(orari).map(([key, value], index) => (
                    <React.Fragment key={index}>
                      <StyledOption value={value}>{key}</StyledOption>
                    </React.Fragment>
                  ))}
                </StyledSelectModifica>
              </Col>
              <Col style={{ padding: '0', margin: '0', paddingRight: '19px' }}>
                <StyledSelectModifica name="orario_fine" value={item.orario_fine} onChange={(e) => handleInputChangeNuovoLavoro(e, setItem)}>
                  <StyledOption value="">Orario fine</StyledOption>
                  {Object.entries(orari).map(([key, value], index) => (
                    <React.Fragment key={index}>
                      <StyledOption value={value}>{key}</StyledOption>
                    </React.Fragment>
                  ))}
                </StyledSelectModifica>
              </Col>
            </Row>
            {(item.errore_orario_inizio !== "") && (<StyledSpanErrore>{item.errore_orario_inizio}</StyledSpanErrore>)}
            {(item.errore_orario_fine !== "") && (<StyledSpanErrore>{item.errore_orario_fine}</StyledSpanErrore>)}
            {lavoriGiornoSelezionato.length > 0 && (
              <>
                {lavoriGiornoSelezionato.map((lgs, index) => (
                  <div key={index}>
                    {lgs.tipo_lavoro} -- {lgs.orario_inizio} - {lgs.orario_fine}</div>
                ))}
              </>
            )}
          </>
        )}
        <StyledTextAreaModifica
          rows="1"
          placeholder="Descrizione*"
          name="descrizione"
          value={item.descrizione}
          onChange={(e) => handleInputChangeNuovoLavoro(e, setItem)}
        />
        {(item.errore_descrizione !== "") && (<StyledSpanErrore>{item.errore_descrizione}</StyledSpanErrore>)}
        <StyledTextAreaModifica
          rows="1"
          placeholder="Note*"
          name="note"
          value={item.note}
          onChange={(e) => handleInputChangeNuovoLavoro(e, setItem)}
        />
        {(item.errore_note !== "") && (<StyledSpanErrore>{item.errore_note}</StyledSpanErrore>)}
        <OperazioniNuovoItem eseguiSalvataggio={eseguiSalvataggio} />
      </StyledCard>
    </>
  );
}

export function CardCercaLavori({ handleGiornoBlur, item, setItem, eseguiRicerca }) {
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

export function CardLavoroEsistente({ handleGiornoBlur, item, items, setItems, selectOperation }) {
  const orari = {
    "07:00": [0, 0, 0], "07:30": [1, 0, 0], 
    "08:00": [2, 0, 0], "08:30": [3, 0, 0], 
    "09:00": [4, 0, 0], "09:30": [5, 0, 0], 
    "10:00": [6, 0, 0], "10:30": [7, 0, 0], 
    "11:00": [8, 0, 0], "11:30": [9, 0, 0], 
    "12:00": [10, 0, 0], "12:30": [11, 0, 0], 
    "13:00": [12, 0, 0], "13:30": [13, 0, 0], 
    "14:00": [14, 0, 0], "14:30": [15, 0, 0], 
    "15:00": [16, 0, 0], "15:30": [17, 0, 0], 
    "16:00": [18, 0, 0], "16:30": [19, 0, 0], 
    "17:00": [20, 0, 0], "17:30": [21, 0, 0], 
    "18:00": [22, 0, 0], "18:30": [23, 0, 0], 
    "19:00": [24, 0, 0], "19:30": [25, 0, 0], 
    "20:00": [26, 0, 0], "20:30": [27, 0, 0], 
    "21:00": [28, 0, 0], "21:30": [29, 0, 0], 
    "22:00": [30, 0, 0]
  };

  let maxHeight = "2000px";
  const [giornoType, setGiornoType] = useState('text');
  item.giorno = item.giorno !== undefined ? item.giorno : '';
  const header = (item.nome_cliente) ? "Lavoro cliente" : "Lavoro professionista";
  // if(item.ora_inizio.toString().length === 1) item.ora_inizio = "0" + item.ora_inizio.toString();
  // if(item.ora_fine.toString().length === 1) item.ora_fine = "0" + item.ora_fine.toString();
  // if(item.minuto_inizio.toString().length === 1) item.minuto_inizio = "0" + item.minuto_inizio.toString();
  // if(item.minuto_fine.toString().length === 1) item.minuto_fine = "0" + item.minuto_fine.toString();
  
  const ClasseSelect = (item.tipo_selezione !== 1 && item.tipo_selezione !== 2) ? StyledSelectBlock : (
    item.tipo_selezione === 1) ? StyledSelectModifica : StyledSelectElimina;

  const ClasseInputModificabile = (item.tipo_selezione !== 1 && item.tipo_selezione !== 2) ? StyledInputBlock : (
    item.tipo_selezione === 1) ? StyledInputModifica : StyledInputElimina;

  const ClasseInputNonModificabile = (item.tipo_selezione !== 2) ? StyledInputBlock : StyledInputElimina;
    
  const ClasseTextAreaModificabile = (item.tipo_selezione !== 1 && item.tipo_selezione !== 2) ? StyledTextAreaBlock : (
    item.tipo_selezione === 1) ? StyledTextAreaModifica : StyledTextAreaElimina;
  
  const ClasseTextAreaNonModificabile = (item.tipo_selezione !== 2) ? StyledTextAreaBlock : StyledTextAreaElimina;

  return (
    <>
      <StyledCard>
        <StyledCardHeader>{header}</StyledCardHeader>
        <SlideContainer style={{maxHeight: `${maxHeight}`}}>
          {/* <div>|{item.id_cliente}|</div> */}
          {/* <div>|{item.id_professionista}|</div> */}
          {/* <div>|{item.id_lavoro}|</div> */}
          {(item.nome_cliente) && (
            <ClasseTextAreaNonModificabile 
              rows="1" 
              name="nome_cognome_cliente" 
              value={item.nome_cliente + " " + item.cognome_cliente} 
              placeholder="Nome e cognome cliente*"
              readOnly 
            />
          )}
          {(item.nome_professionista) && (
            <ClasseTextAreaNonModificabile 
              rows="1" 
              name="nome_professione_professionista" 
              value={item.nome_professionista + " - " + item.professione} 
              placeholder="Nome e professione professionista*"
              readOnly 
            />
          )}

          <ClasseInputModificabile 
            rows="1" 
            name="giorno" 
            type={giornoType} 
            value={formatoDate(item.giorno, "AAAA-MM-GG")} 
            placeholder="Giorno*" 
            onClick={handleGiornoClick(setGiornoType)}
            onBlur={handleGiornoBlur(setGiornoType, item, setItems)}
            readOnly={item.tipo_selezione !== 1}
            onChange={item.tipo_selezione === 1 ? (e) => handleInputChangeLavoroEsistente(e, items, setItems, item.id_lavoro, item.id_cliente, item.id_professionista) : undefined}
          />

          <Row>
            <Col style={{ padding: '0', margin: '0', paddingLeft: '19px' }}>
              <ClasseSelect 
                name="orario_inizio" 
                value={item.orario_inizio} 
                readOnly={item.tipo_selezione !== 1}
                onChange={item.tipo_selezione === 1 ? (e) => handleInputChangeLavoroEsistente(e, items, setItems, item.id_lavoro, item.id_cliente, item.id_professionista) : undefined}
              >
                <StyledOption value="">Orario inizio</StyledOption>
                {Object.entries(orari).map(([key, value], index) => (
                  <React.Fragment key={index}>
                    <StyledOption value={key}>{key}</StyledOption>
                  </React.Fragment>
                ))}
              </ClasseSelect>
            </Col>
            <Col style={{ padding: '0', margin: '0', paddingRight: '19px' }}>
              <ClasseSelect 
                name="orario_fine" 
                value={item.orario_fine} 
                readOnly={item.tipo_selezione !== 1}
                onChange={item.tipo_selezione === 1 ? (e) => handleInputChangeLavoroEsistente(e, items, setItems, item.id_lavoro, item.id_cliente, item.id_professionista) : undefined}
              >
                <StyledOption value="">Orario fine</StyledOption>
                {Object.entries(orari).map(([key, value], index) => (
                  <React.Fragment key={index}>
                    <StyledOption value={key}>{key}</StyledOption>
                  </React.Fragment>
                ))}
              </ClasseSelect>
            </Col>
          </Row>
          <ClasseTextAreaModificabile 
            rows="1" 
            name="descrizione" 
            value={item.descrizione}
            placeholder="Descrizione*"
            readOnly={item.tipo_selezione !== 1}
            onChange={item.tipo_selezione === 1 ? (e) => handleInputChangeLavoroEsistente(e, items, setItems, item.id_lavoro, item.id_cliente, item.id_professionista) : undefined}
          />
          <ClasseTextAreaModificabile 
            rows="1" 
            name="note" 
            value={item.note} 
            placeholder="Note" 
            readOnly={item.tipo_selezione !== 1}
            onChange={item.tipo_selezione === 1 ? (e) => handleInputChangeLavoroEsistente(e, items, setItems, item.id_lavoro, item.id_cliente, item.id_professionista) : undefined}
          />
        </SlideContainer>
        <OperazioniItemEsistente selectOperation={selectOperation} item={item} />
      </StyledCard>
    </>
  );
}

export function CardFileLavori({item, setItem, ottieniLavoriRangePDF, ottieniLavoriRangeExcel, eliminaLavoriRange}) {
  const [primoGiornoType, setPrimoGiornoType] = useState('text');
  const [ultimoGiornoType, setUltimoGiornoType] = useState('text');
  let maxHeight = "2000px";

  item.primo_giorno = (item.primo_giorno !== undefined) ? item.primo_giorno : '';
  item.ultimo_giorno = (item.ultimo_giorno !== undefined) ? item.ultimo_giorno : '';

  return (
    <>
      <StyledCard>
        <StyledCardHeader>File lavori</StyledCardHeader>
        <SlideContainer style={{maxHeight: `${maxHeight}`}}>
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
        </SlideContainer>
        <OperazioniFileItems 
          ottieniLavoriRangePDF={ottieniLavoriRangePDF} 
          ottieniLavoriRangeExcel={ottieniLavoriRangeExcel} 
          eliminaLavoriRange={eliminaLavoriRange} 
        />
      </StyledCard>
    </>
  );
}














