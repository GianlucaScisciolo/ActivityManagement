import React, { useState, useEffect } from 'react';
import ListGroup from 'react-bootstrap/ListGroup';
import Row from 'react-bootstrap/esm/Row';
import Col from 'react-bootstrap/esm/Col';
import { Trash2, Pencil, Plus, Search } from 'lucide-react';
import { HookItems } from '../../../vario/HookItems';
import { useSelector, useDispatch } from 'react-redux';
import { faFilePdf, faFileExcel } from '@fortawesome/free-solid-svg-icons';
import { formatoDate, formatoTime, dizionarioOrari } from '../../../vario/Tempo';
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
  handleInputChange, handleInputChangeLavoroEsistente, handleInputChangeNuovoLavoro, cambiamentoBloccato
} from '../../../vario/Vario';
import { 
  OperazioniNuovoItem, OperazioniCercaItems, OperazioniItemEsistente, OperazioniFileItems, 
  getTextAreaTag, getInputTag, getSelectTag, 
  CardRicercaItems
} from './CardItem';

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

function OrariOptions({orari, item, autenticazioneSession}) {
  if(orari) {
  let listaOrari = Object.entries(orari);
  let orariPossibili = [];
  for (let i = 0; i < listaOrari.length; i++) {
    // console.log("| " + listaOrari[i][0] + " | " + listaOrari[i][1][0] + " | " + listaOrari[i][1][1] + " | " + listaOrari[i][1][2] + " | ");
    if(parseInt(listaOrari[i][1][0], 10) > parseInt(orari[item.orario_inizio][0])) {
      if(item.id_cliente !== 0 && autenticazioneSession.num_lavori_clienti > listaOrari[i][1][1]) {
        orariPossibili.push(<StyledOption key={listaOrari[i][0]} value={listaOrari[i][0]}>{listaOrari[i][0]}</StyledOption>);
      }
      else if(item.id_professionista !== 0 && autenticazioneSession.num_lavori_professionisti > listaOrari[i][1][2]) {
        orariPossibili.push(<StyledOption key={listaOrari[i][0]} value={listaOrari[i][0]}>{listaOrari[i][0]}</StyledOption>);
      }
      else {
        break;
      }
    }
  }
  return orariPossibili;
  }
  return orari;
}

export function CardNuovoLavoro({
  lavoriGiornoSelezionato, setLavoriGiornoSelezionato, handleInputChangeGiorno, handleGiornoBlur, 
  clienti, professionisti, item, setItem, eseguiSalvataggio, orari, setOrari
}) {
  // const [orari, setOrari] = useState(dizionarioOrari);
  const autenticazioneSession = useSelector((state) => state.autenticazioneSession.value);
  const [giornoType, setGiornoType] = useState('text');
  let maxHeight = "2000px";

  item.giorno = item.giorno !== undefined ? item.giorno : '';

  return (
    <center>
      {/* <button>{item.id_cliente}</button>
      <button>{item.id_professionista}</button> */}
      <StyledCard>
        <StyledCardHeader>Nuovo lavoro</StyledCardHeader>
        {/* {Object.entries(orari).map(([key, value], index) => (
          <React.Fragment key={index}>
            <div>{key} - [{value[0]}, {value[1]}, {value[2]}]</div>
          </React.Fragment>
        ))} */}
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
  onBlur={handleGiornoBlur(setGiornoType, item, orari, setOrari)}
  onChange={handleInputChangeGiorno}
/>
{(item.errore_giorno !== "") && (<StyledSpanErrore>{item.errore_giorno}</StyledSpanErrore>)}
{(item.giorno) && (
  <>
    <Row>
      <Col style={{ padding: '0', margin: '0', paddingLeft: '19px' }}>
        <StyledSelectModifica name="orario_inizio" value={item.orario_inizio} onChange={(e) => handleInputChangeNuovoLavoro(e, setItem)}>
          <StyledOption value="">Orario inizio</StyledOption>
          {(autenticazioneSession.num_lavori_giorno > lavoriGiornoSelezionato.length) && (
            <>
              {Object.entries(orari).map(([key, value], index) => (
                <React.Fragment key={index}>
                  {((item.id_cliente !== 0 && autenticazioneSession.num_lavori_clienti > value[1]) || 
                    (item.id_professionista !== 0 && autenticazioneSession.num_lavori_professionisti > value[2])) && (
                    <StyledOption value={key}>{key}</StyledOption>
                  )}
                </React.Fragment>
              ))}
            </>
          )}
        </StyledSelectModifica>
      </Col>
      {(item.orario_inizio) && (
        <Col style={{ padding: '0', margin: '0', paddingRight: '19px' }}>
          <StyledSelectModifica name="orario_fine" value={item.orario_fine} onChange={(e) => handleInputChangeNuovoLavoro(e, setItem)}>
            <StyledOption value="">Orario fine</StyledOption>
            <OrariOptions orari={orari} item={item} autenticazioneSession={autenticazioneSession} />
          </StyledSelectModifica>
        </Col>
      )}
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
    </center>
  );
}

export function CardRicercaLavori({ handleGiornoBlur, item, setItem, eseguiRicerca }) {
  const [primoGiornoType, setPrimoGiornoType] = useState('text');
  const [ultimoGiornoType, setUltimoGiornoType] = useState('text');

  item.primo_giorno = (item.primo_giorno !== undefined) ? item.primo_giorno : '';
  item.ultimo_giorno = (item.ultimo_giorno !== undefined) ? item.ultimo_giorno : '';  

  let campi = {
    header: "Ricerca lavori", 
    type: [null, null, null, null, primoGiornoType, ultimoGiornoType, null, null], 
    name: [
      "nome_cliente", "cognome_cliente", "nome_professionista", "professione", 
      "primo_giorno", "ultimo_giorno", "descrizione", "note"
    ], 
    value: [
      item.nome_cliente, item.cognome_cliente, item.nome_professionista, item.professione, 
      item.primo_giorno, item.ultimo_giorno, item.descrizione, item.note
    ], 
    placeholder: [
      "Nome cliente", "Cognome cliente", "nome professionista", "Professione", 
      "Primo giorno", "Ultimo giorno", "Descrizione", "Note"
    ], 
    onChange: (e) => handleInputChange(e, setItem), 
    onClick: null, 
    onBlur: null
  }
  const indici = [0, 1, 2, 3, 4, 5, 6, 7];
  
  return (
    <>
      <CardRicercaItems 
        campi={campi}
        indici={indici}
        eseguiRicerca={eseguiRicerca}
      />
    </>
  );
}

function CardLavoro({
  header, item, clienti, professionisti, giornoType, setGiornoType, orari, setOrari, 
  handleInputChangeLavoroEsistente, items, setItems, selectOperation, lavoriGiorniPresenti
}) {
  const autenticazioneSession = useSelector((state) => state.autenticazioneSession.value);
  const [lavoriGiornoSelezionato, setLavoriGiornoSelezionato] = useState(0);
  const [aggiornato, setAggiornato] = useState(false);

  const aggiornaOrari = (lavoriGiornoSelezionato, orari, setOrari) => {
    // console.log("Funzione aggiornaOrari!!");
    if(lavoriGiornoSelezionato !== -1 && lavoriGiornoSelezionato !== 0) {
      let listaOrari = Object.entries(orari);
      for(let lavoroGiorno of lavoriGiornoSelezionato) {
        console.log(lavoroGiorno.tipo_lavoro + ": " + lavoroGiorno.orario_inizio + " - " + lavoroGiorno.orario_fine);
        let indicePrimoGiornoConsiderato = orari[lavoroGiorno.orario_inizio][0];
        let indiceUltimoGiornoConsiderato = orari[lavoroGiorno.orario_fine][0] - 1;
        for (let i = indicePrimoGiornoConsiderato; i <= indiceUltimoGiornoConsiderato; i++) {
          // console.log(`| ${listaOrari[i]} | : | ${listaOrari[i][0]} - ( ${listaOrari[i][1][0]} - ${listaOrari[i][1][1]} - ${listaOrari[i][1][2]} ) |`);
          if (lavoroGiorno.tipo_lavoro === "lavoro_cliente") {
            listaOrari[i][1][1] += 1;
          } else if (lavoroGiorno.tipo_lavoro === "lavoro_professionista") {
            listaOrari[i][1][2] += 1;
          }
        }
        setOrari(Object.fromEntries(listaOrari));
      }
      if(lavoriGiornoSelezionato.length === 0) {
        console.log("Nessun lavoro trovato per il giorno selezionato!!");
      }
    }
  };

  const ottieniLavoriGiorno = async (setGiornoType, item, setLavoriGiornoSelezionato) => {
    let nuovoLavoro = [];
    const response = await fetch('/OTTIENI_LAVORI_GIORNO', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(item),
    });

    // console.log((response).status);
    if(response.status === 200) {
      const risultato = await response.json();
      // console.log(risultato.lavoriGiornoSelezionato);
      setLavoriGiornoSelezionato(risultato.lavoriGiornoSelezionato);
    }
    else {
      const errorData = await response.json();
      if (response.status === 409 || response.status === 500) {
        alert(errorData.message);
      }
      else {
        response.status = 500;
        alert('Errore durante l\'ottenimento dei lavori.');
      }
    }
  }

  const handleGiornoBlur = (setGiornoType, item, orari, setOrari, setLavoriGiornoSelezionato) => {
    return () => {
      if(!item.giorno)
        setGiornoType('text');
      else {
        setGiornoType('date');
      }
    };
  };

  const getNumLavoriOrario = (orario) => {
    let lavoriGiorno = lavoriGiorniPresenti[item.giorno];
    let numLavori = 0;
    for (let i = 0; i < lavoriGiorno.length; i++) {
      if(item.id_cliente) {
        if(lavoriGiorno[i].tipo_lavoro === "lavoro_cliente" && lavoriGiorno[i].orario_inizio === orario) {
          numLavori++;
        }
      }
      else if(item.id_professionista) {
        if(lavoriGiorno[i].tipo_lavoro === "lavoro_professionista" && lavoriGiorno[i].orario_inizio === orario) {
          numLavori++;
        }
      }
    }

    return numLavori;
  }

  const orarioVisbile = (orario) => {
    const numLavoriOrario = getNumLavoriOrario(orario);
    if(item.id_cliente && autenticazioneSession.num_lavori_clienti > numLavoriOrario) {
      return true;
    }
    else if(item.id_professionista && autenticazioneSession.num_lavori_professionisti > numLavoriOrario) {
      return true;
    }
    else {
      return false;
    }
  }

  const OrarioInizioOptions = () => {
    return (
      <>
        {Object.entries(orari).map(([key, value], index) => (
          (orarioVisbile(key) || key === item.orario_inizio) && (
            <StyledOption key={index} value={key}>{key}</StyledOption>  
          )
        ))}
      </>
    )
  }

  const OrarioFineOptions = () => {
    let listaOrari = Object.entries(orari);
    let orariDaVisualizzare = [];
    for (let orario of listaOrari) {
      // console.log(orari[item.orario_inizio][0]);
      if (orario[1][0] > orari[item.orario_inizio][0]) {
        if(orarioVisbile(orario[0]) || orario[0] === item.orario_fine) {
          orariDaVisualizzare.push(orario[0]);
        }
        else {
          break;
        }
      }
    }
    return (
      <>
        {orariDaVisualizzare.map((orario, index) => (
          <StyledOption key={index} value={orario}>{orario}</StyledOption>
        ))}
      </>
    );
  };
  

  return (
    <StyledCard> 
      <StyledCardHeader>{header}</StyledCardHeader>
      
      {(item.id_cliente) ? (
        <StyledSelectModifica style={{width: "100%"}} name="id_cliente" value={item.id_cliente} onChange={(e) => handleInputChangeNuovoLavoro(e, setItem)}>
          <StyledOption value="0">Seleziona il cliente</StyledOption>
          {clienti.map((cliente) => (
            <StyledOption key={cliente.id} value={cliente.id}>{cliente.nome + " " + cliente.cognome}</StyledOption>  
          ))}
        </StyledSelectModifica>
      ) : (!item.id_cliente) && (
        <StyledSelectModifica style={{width: "100%"}} name="id_professionista" value={item.id_professionista} onChange={(e) => handleInputChangeNuovoLavoro(e, setItem)}>
          <StyledOption value="0">Seleziona il professionista</StyledOption>
          {professionisti.map((professionista) => (
            <StyledOption key={professionista.id} value={professionista.id}>{professionista.nome + " - " + professionista.professione}</StyledOption>  
          ))}
        </StyledSelectModifica>
      )}
      {(item.errore_cliente_e_professionista) && (<StyledSpanErrore>{item.errore_cliente_e_professionista}</StyledSpanErrore>)}
      <StyledInputModifica
        rows="1"
        placeholder="Giorno*"
        type={giornoType}
        name="giorno"
        value={item.giorno}
        onClick={handleGiornoClick(setGiornoType)}
        onBlur={handleGiornoBlur(setGiornoType, item, orari, setOrari, setLavoriGiornoSelezionato)}
        onChange={(e) => handleInputChangeLavoroEsistente(e, items, setItems, item.id_lavoro, item.id_cliente, item.id_professionista)}
      />
      {(item.errore_giorno) && (<StyledSpanErrore>{item.errore_giorno}</StyledSpanErrore>)}
      {(item.giorno) && (
        <>
          <Row>
            <Col style={{ padding: '0', margin: '0', paddingLeft: '19px' }}>
              <StyledSelectModifica name="orario_inizio" value={item.orario_inizio} onChange={(e) => handleInputChangeLavoroEsistente(e, items, setItems, item.id_lavoro, item.id_cliente, item.id_professionista)}>
                <StyledOption value="">Orario inizio</StyledOption>
                {(lavoriGiorniPresenti[item.giorno]) && (
                  <>
                    {(autenticazioneSession.num_lavori_giorno > lavoriGiorniPresenti[item.giorno].length) && (
                      <>
                        <OrarioInizioOptions />
                      </>
                    )}
                  </>
                )}
              </StyledSelectModifica>
            </Col>
            {(item.orario_inizio) && (
              <Col style={{ padding: '0', margin: '0', paddingRight: '19px' }}>
                <StyledSelectModifica name="orario_fine" value={item.orario_fine} onChange={(e) => handleInputChangeLavoroEsistente(e, items, setItems, item.id_lavoro, item.id_cliente, item.id_professionista)}>
                  <StyledOption value="">Orario fine</StyledOption>
                  {/* <OrariOptions orari={orari} item={item} autenticazioneSession={autenticazioneSession} /> */}
                  {(lavoriGiorniPresenti[item.giorno]) && (
                    <>
                      {(autenticazioneSession.num_lavori_giorno > lavoriGiorniPresenti[item.giorno].length) && (
                        <>
                          <OrarioFineOptions />
                        </>
                      )}
                    </>
                  )}
                </StyledSelectModifica>
              </Col>
            )}
          </Row>
          {(item.errore_orario_inizio) && (<StyledSpanErrore>{item.errore_orario_inizio}</StyledSpanErrore>)}
          {(item.errore_orario_fine) && (<StyledSpanErrore>{item.errore_orario_fine}</StyledSpanErrore>)}
        </>
      )}
      <StyledTextAreaModifica
        rows="1"
        placeholder="Descrizione*"
        name="descrizione"
        value={item.descrizione}
        onChange={(e) => handleInputChangeLavoroEsistente(e, items, setItems, item.id_lavoro, item.id_cliente, item.id_professionista)}
      />
      {(item.errore_descrizione) && (<StyledSpanErrore>{item.errore_descrizione}</StyledSpanErrore>)}
      <StyledTextAreaModifica
        rows="1"
        placeholder="Note*"
        name="note"
        value={item.note}
        onChange={(e) => handleInputChangeLavoroEsistente(e, items, setItems, item.id_lavoro, item.id_cliente, item.id_professionista)}
      />
      {(item.errore_note) && (<StyledSpanErrore>{item.errore_note}</StyledSpanErrore>)}
      <OperazioniItemEsistente selectOperation={selectOperation} item={item} />
    </StyledCard>
  )
}

export function CardLavoroEsistente({ 
  lavoriGiornoSelezionato, setLavoriGiornoSelezionato, handleInputChangeLavoroEsistente, 
  clienti, professionisti, item, items, setItems, selectOperation, lavoriGiorniPresenti
}) {
  item.giorno = item.giorno !== undefined ? formatoDate(item.giorno, "AAAA-MM-GG") : '';
  
  const [orari, setOrari] = useState(dizionarioOrari);
  const autenticazioneSession = useSelector((state) => state.autenticazioneSession.value);
  const [giornoType, setGiornoType] = useState('text');
  const maxHeight = "2000px";
  const header = (item.nome_cliente) ? "Lavoro cliente" : "Lavoro professionista";

  return (
    <CardLavoro 
      header={header} 
      item={item} 
      clienti={clienti}
      professionisti={professionisti} 
      giornoType={giornoType} 
      setGiornoType={setGiornoType}  
      orari={orari} 
      setOrari={setOrari}
      handleInputChangeLavoroEsistente={handleInputChangeLavoroEsistente}
      items={items}
      setItems={setItems}
      selectOperation={selectOperation}
      lavoriGiorniPresenti={lavoriGiorniPresenti}
    />
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














