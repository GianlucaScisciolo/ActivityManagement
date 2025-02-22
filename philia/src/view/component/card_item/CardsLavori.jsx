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
} from "../../../trasportabile/card_item/StyledCardItem";
import { 
  handleInputChange, handleInputChangeLavoroEsistente, handleInputChangeNuovoLavoro, cambiamentoBloccato
} from '../../../vario/Vario';
import { 
  OperazioniNuovoItem, OperazioniCercaItems, OperazioniItemEsistente, OperazioniFileItems, 
  getTextAreaTag, getInputTag, getSelectTag, 
  CardRicercaItems
} from "../../../trasportabile/card_item/CardItem"

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
  clienti, item, setItem, eseguiSalvataggio, orari, setOrari
}) {
  // const [orari, setOrari] = useState(dizionarioOrari);
  const autenticazioneSession = useSelector((state) => state.autenticazioneSession.value);
  const [giornoType, setGiornoType] = useState('text');
  let maxHeight = "2000px";

  item.giorno = item.giorno !== undefined ? item.giorno : '';

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

  const orarioVisibile = (orario) => {
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
          (orarioVisibile(key) || key === item.orario_inizio) && (
            <StyledOption key={index} value={key}>{key}</StyledOption>  
          )
        ))}
      </>
    )
  }

  return (
    <center>
      <StyledCard>
        <StyledCardHeader>Nuovo lavoro</StyledCardHeader>
        <StyledSelectModifica style={{width: "100%"}} name="id_cliente" value={item.id_cliente} onChange={(e) => handleInputChangeNuovoLavoro(e, setItem)}>
          <StyledOption value="0">Seleziona il cliente</StyledOption>
          {clienti.map((cliente) => (
            <StyledOption key={cliente.id} value={cliente.id}>{cliente.nome + " " + cliente.cognome}</StyledOption>  
          ))}
        </StyledSelectModifica>
        
        {(item.errore_cliente !== "") && (<StyledSpanErrore>{item.errore_cliente}</StyledSpanErrore>)}
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
            <StyledSelectModifica name="orario_inizio" value={item.orario_inizio} onChange={(e) => handleInputChangeNuovoLavoro(e, setItem)}>
              <StyledOption value="">Orario inizio</StyledOption>
              {(autenticazioneSession.num_lavori_giorno > lavoriGiornoSelezionato.length) && (
                <>
                  {/* {Object.entries(orari).map(([key, value], index) => (
                    <React.Fragment key={index}>
                      {((item.id_cliente !== 0 && autenticazioneSession.num_lavori_clienti > value[1]) || 
                        (item.id_professionista !== 0 && autenticazioneSession.num_lavori_professionisti > value[2])) && (
                        <StyledOption value={key}>{key}</StyledOption>
                      )}
                    </React.Fragment>
                  ))} */}
                  <OrarioInizioOptions />
                </>
              )}
            </StyledSelectModifica>
            {(item.errore_orario_inizio !== "") && (<StyledSpanErrore>{item.errore_orario_inizio}</StyledSpanErrore>)}
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

// export function CardRicercaLavori({ item, setItem, eseguiRicerca }) {
//   const [primoGiornoType, setPrimoGiornoType] = useState('text');
//   const [ultimoGiornoType, setUltimoGiornoType] = useState('text');

//   item.primo_giorno = (item.primo_giorno !== undefined) ? item.primo_giorno : '';
//   item.ultimo_giorno = (item.ultimo_giorno !== undefined) ? item.ultimo_giorno : '';  

//   let campi = {
//     header: "Ricerca lavori", 
//     type: [null, null, primoGiornoType, ultimoGiornoType, null, null], 
//     name: [
//       "nome_cliente", "cognome_cliente", "primo_giorno", "ultimo_giorno", "descrizione", "note"
//     ], 
//     value: [
//       item.nome_cliente, item.cognome_cliente, item.primo_giorno, item.ultimo_giorno, item.descrizione, item.note
//     ], 
//     placeholder: [
//       "Nome cliente", "Cognome cliente", "Primo giorno", "Ultimo giorno", "Descrizione", "Note"
//     ], 
//     onChange: (e) => handleInputChange(e, setItem), 
//     onClick: null, 
//     onBlur: null
//   }
//   const indici = [0, 1, 2, 3, 4, 5];
  
//   return (
//     <>
//       <CardRicercaItems 
//         campi={campi}
//         indici={indici}
//         eseguiRicerca={eseguiRicerca}
//       />
//     </>
//   );
// }

function CardLavoro({
  header, item, clienti, professionisti, giornoType, setGiornoType, orari, setOrari, 
  handleInputChangeLavoroEsistente, items, setItems, selectOperation, lavoriGiorno
}) {
  const autenticazioneSession = useSelector((state) => state.autenticazioneSession.value);
  const [lavoriGiornoSelezionato, setLavoriGiornoSelezionato] = useState(0);
  const [aggiornato, setAggiornato] = useState(false);

  /****************************************************************************************************/

  const handleGiornoBlur = (setGiornoType, item, orari, setOrari, setLavoriGiornoSelezionato) => {
    return () => {
      if(!item.giorno)
        setGiornoType('text');
      else {
        setGiornoType('date');
      }
    };
  };

  const orarioVisibile = (orario) => {
    let numLavoriOrario = 0;
    for (let i = 0; i < lavoriGiorno.length; i++) {
      console.log(
        "<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<< " + 
        lavoriGiorno[i].orario_inizio + 
        " >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>"
      )
      if(lavoriGiorno[i].orario_inizio === orario) {
        numLavoriOrario++;
      }
    }

    console.log("NUMERO LAVORI ORARIO: " + orario + " = " + numLavoriOrario);
    
    return (item.id_cliente && autenticazioneSession.num_lavori_clienti > numLavoriOrario) ? true : false;
  }

  const OrarioInizioOptions = () => {
    return (
      <>
        {Object.entries(orari).map(([key, value], index) => (
          (orarioVisibile(key) || key === item.orario_inizio) && (
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
      if (orario[1][0] > orari[item.orario_inizio][0]) {
        if(orarioVisibile(orario[0]) || orario[0] === item.orario_fine) {
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
  
  /****************************************************************************************************/

  const InputModificabileTag = getInputTag(item.tipo_selezione, true);
  const InputNonModificabileTag = getInputTag(item.tipo_selezione, false);
  const TextAreaModificabileTag = getTextAreaTag(item.tipo_selezione, true);
  const TextAreaNonModificabileTag = getTextAreaTag(item.tipo_selezione, false);
  const SelectModificabileTag = getSelectTag(item.tipo_selezione);

  return (
    <StyledCard> 
      <StyledCardHeader>{header}</StyledCardHeader>
      <TextAreaNonModificabileTag
        rows="1"
        placeholder={(item.id_cliente) ? "Cliente" : "Professionista"}
        name={(item.id_cliente) ? "id_cliente" : "id_professionista"}
        value={(item.id_cliente) ? (
          item.nome_cliente + " " + item.cognome_cliente
        ) : (
          item.nome_professionista + " - " + item.professione
        )}
        readOnly
      />
      <InputModificabileTag
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
          <SelectModificabileTag name="orario_inizio" value={item.orario_inizio} onChange={(e) => handleInputChangeLavoroEsistente(e, items, setItems, item.id_lavoro, item.id_cliente, item.id_professionista)}>
            <StyledOption value="">Orario inizio</StyledOption>
            {(lavoriGiorno) && (
              <>
                {(autenticazioneSession.num_lavori_giorno > lavoriGiorno.length) && (
                  <>
                    <OrarioInizioOptions />
                  </>
                )}
              </>
            )}
          </SelectModificabileTag>
          {(item.errore_orario_inizio) && (<StyledSpanErrore>{item.errore_orario_inizio}</StyledSpanErrore>)}
        </>
      )}
      <TextAreaModificabileTag
        rows="1"
        placeholder="Descrizione*"
        name="descrizione"
        value={item.descrizione}
        onChange={(e) => handleInputChangeLavoroEsistente(e, items, setItems, item.id_lavoro, item.id_cliente, item.id_professionista)}
      />
      {(item.errore_descrizione) && (<StyledSpanErrore>{item.errore_descrizione}</StyledSpanErrore>)}
      <TextAreaModificabileTag
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
  handleInputChangeLavoroEsistente, clienti, professionisti, 
  item, items, setItems, selectOperation, lavoriGiorno
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
      lavoriGiorno={lavoriGiorno}
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














