import React, { useState, useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { faFilePdf, faFileExcel } from '@fortawesome/free-solid-svg-icons';
import Row from 'react-bootstrap/esm/Row';
import Col from 'react-bootstrap/esm/Col';
import ListGroup from 'react-bootstrap/ListGroup';
import { formatoDate, formatoTime } from "../../../vario/Tempo";
import { 
  StyledForm, StyledListGroupItem, StyledRow, StyledCol, 
  StyledLabel, StyledHeader, grandezzaIcona, SlideContainer, 
  StyledTextAreaBlock, StyledTextAreaModifica, StyledTextAreaElimina, 
  StyledInputBlock, StyledInputModifica, StyledInputElimina, 
  StyledSaveNotSelected, StyledSearchNotSelected, StyledPencilNotSelected,  
  StyledArrowTopNotSelected, StyledArrowBottomNotSelected, StyledSelect, StyledOption, 
  BottoneBluNonSelezionato, BottoneBluSelezionato, BottoneRossoNonSelezionato, BottoneRossoSelezionato, 
  StyledSpanErrore, StyledLoginNotSelected, StyledFileIconNotSelected, 
  StyledDownloadNotSelected, StyledDeleteNotSelected, StyledTrashNotSelected, 
  StyledSelectBlock, StyledSelectModifica, StyledSelectElimina
} from "../../../riutilizzabile/form_item/StyledFormItem";
import { 
  handleInputChange, handleInputChangeNuovoLavoro, 
  selezionaInserimentoLavoroCliente, selezionaInserimentoLavoroProfessionista
} from '../../../vario/Vario';
import { 
  OperazioniNuovoItem, OperazioniCercaItems, 
  FormRicercaItems 
} from "../../../riutilizzabile/form_item/FormItem";

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
        <StyledTrashNotSelected size={grandezzaIcona} onClick={eliminaLavoriRange} />
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

function selezionaDeselezionaBottone(e, setValue) {
  e.preventDefault();

  const nome_campi = ["lavoro_cliente_selezionato", "lavoro_professionista_selezionato"]
  
  const { name } = e.target;

  if(nome_campi.includes(name)) {
    if(name === "lavoro_cliente_selezionato") {
      setValue(prevState => ({
        ...prevState,
        "lavoro_cliente_selezionato": !prevState["lavoro_cliente_selezionato"],
        "lavoro_professionista_selezionato": false
      }))
    }
    else if(name === "lavoro_professionista_selezionato") {
      setValue(prevState => ({
        ...prevState,
        "lavoro_professionista_selezionato": !prevState["lavoro_professionista_selezionato"],
        "lavoro_cliente_selezionato": false
      }))
    }
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

export function FormNuovoLavoro({
  lavoriGiornoSelezionato, setLavoriGiornoSelezionato, handleInputChangeGiorno, handleGiornoBlur, 
  clienti, item, setItem, eseguiSalvataggio, orari, setOrari
}) {
  const autenticazioneSession = useSelector((state) => state.autenticazioneSession.value);
  const [giornoType, setGiornoType] = useState('text');
  let maxHeight = "2000px";

  item.giorno = item.giorno !== undefined ? item.giorno : '';

  return (
    <center>
      <StyledForm>
        <StyledHeader>Nuovo lavoro</StyledHeader>
        <SlideContainer style={{maxHeight: `${maxHeight}`}}>
          <StyledLabel htmlFor="id_cliente">Cliente</StyledLabel>
          <StyledSelectModifica style={{width: "100%"}} name="id_cliente" value={item.id_cliente} onChange={(e) => handleInputChangeNuovoLavoro(e, setItem)}>
            <StyledOption value="0">Seleziona il cliente</StyledOption>
            {clienti.map((cliente) => (
              <StyledOption key={cliente.id} value={cliente.id}>{cliente.nome + " " + cliente.cognome}</StyledOption>  
            ))}
          </StyledSelectModifica>
          {(item.errore_cliente) && (<StyledSpanErrore>{item.errore_cliente}</StyledSpanErrore>)}
          <StyledLabel htmlFor="giorno">Giorno</StyledLabel>
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
          {(item.errore_giorno) && (<StyledSpanErrore>{item.errore_giorno}</StyledSpanErrore>)}
          {(item.giorno) && (
            <>
              <StyledLabel htmlFor="orario_inizio">Orario</StyledLabel>
              <StyledSelectModifica name="orario_inizio" value={item.orario_inizio} onChange={(e) => handleInputChangeNuovoLavoro(e, setItem)}>
                <StyledOption value="">Orario</StyledOption>
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
              {(item.errore_orario_inizio) && (<StyledSpanErrore>{item.errore_orario_inizio}</StyledSpanErrore>)}
            </>
          )}
          <StyledLabel htmlFor="descrizione">Descrizione</StyledLabel>
          <StyledTextAreaModifica
            rows="1"
            placeholder="Descrizione*"
            name="descrizione"
            value={item.descrizione}
            onChange={(e) => handleInputChangeNuovoLavoro(e, setItem)}
            />
          {(item.errore_descrizione) && (<StyledSpanErrore>{item.errore_descrizione}</StyledSpanErrore>)}
          <StyledLabel htmlFor="note">Note</StyledLabel>
          <StyledTextAreaModifica
            rows="1"
            placeholder="Note*"
            name="note"
            value={item.note}
            onChange={(e) => handleInputChangeNuovoLavoro(e, setItem)}
            />
          {(item.errore_note) && (<StyledSpanErrore>{item.errore_note}</StyledSpanErrore>)}
          <br /> <br />
        </SlideContainer>
        <OperazioniNuovoItem eseguiSalvataggio={eseguiSalvataggio} /> 
      </StyledForm>
    </center>
  );
}

export function FormFileLavori({item, setItem, ottieniLavoriRangePDF, ottieniLavoriRangeExcel, eliminaLavoriRange}) {
  const [primoGiornoType, setPrimoGiornoType] = useState('text');
  const [ultimoGiornoType, setUltimoGiornoType] = useState('text');
  let maxHeight = "2000px";

  item.primo_giorno = (item.primo_giorno !== undefined) ? item.primo_giorno : '';
  item.ultimo_giorno = (item.ultimo_giorno !== undefined) ? item.ultimo_giorno : '';

  return (
    <>
      <StyledForm>
        <StyledHeader>File lavori</StyledHeader>
        <SlideContainer style={{maxHeight: `${maxHeight}`}}>
          <StyledLabel htmlFor="primo_giorno">Primo giorno</StyledLabel>
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
          
          <StyledLabel htmlFor="ultimo_giorno">ultimo giorno</StyledLabel>
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

          <br /> <br />
        </SlideContainer>
        <OperazioniFileItems 
          ottieniLavoriRangePDF={ottieniLavoriRangePDF} 
          ottieniLavoriRangeExcel={ottieniLavoriRangeExcel} 
          eliminaLavoriRange={eliminaLavoriRange} 
        />
      </StyledForm>
    </>
  );
}







