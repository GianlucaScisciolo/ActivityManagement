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

function OperazioniItemEsistente ({ tipoSelezione, selectOperation, item }) {
  return (
    <StyledColOperazioni>
      <PencilTag tipoSelezione={item.tipo_selezione} selectOperation={selectOperation} item={item} />
      <TrashTag tipoSelezione={item.tipo_selezione} selectOperation={selectOperation} item={item} />
    </StyledColOperazioni>
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

export function RowNuovoLavoro({clienti, professionisti, header, item, setItem, eseguiSalvataggio}) {
  const ore = ["07", "08", "09", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22"];
  const minuti = ["00", "30"];
  // let [visibilita, setVisibilita] = useState([true, true, true, true, true, true, true]);
  const [arrowUp, setArrowUp] = useState(true);

  const [giornoType, setGiornoType] = useState('text');
  const [orario, setOrario] = useState({
    ora_inizio: "", 
    ora_fine: "",
    minuto_inizio: "", 
    minuto_fine: ""
  });

  const giornoValue = item.giorno !== undefined ? item.giorno : '';

  return (
    <>
      <StyledRow>
        <OperazioniNuovoItem eseguiSalvataggio={eseguiSalvataggio} />
        <StyledCol>
          {(header === "Nuovo lavoro cliente") && (
            <>
              <StyledSelect name="id_cliente" value={item.id_cliente} onChange={(e) => handleInputChange(e, setItem)}>
                <StyledOption value="0">Seleziona il cliente</StyledOption>
                {clienti.map((cliente) => (
                  <StyledOption key={cliente.id} value={cliente.id}>{cliente.nome + " " + cliente.cognome}</StyledOption>  
                ))}
              </StyledSelect>
            </>
          )}
          {(header === "Nuovo lavoro professionista") && (
            <>
              <StyledSelect name="id_professionista" value={item.id_professionista} onChange={(e) => handleInputChange(e, setItem)}>
                <StyledOption value="0">Seleziona il professionista</StyledOption>
                {professionisti.map((professionista) => (
                  <StyledOption key={professionista.id} value={professionista.id}>{professionista.nome + " - " + professionista.professione}</StyledOption>  
                ))}
              </StyledSelect>
            </>
          )}
        </StyledCol>
        <StyledCol>
          <StyledInputModifica
            rows="1"
            placeholder="Giorno*"
            type={giornoType}
            name="giorno"
            value={giornoValue}
            onClick={handleGiornoClick(setGiornoType)}
            onBlur={handleGiornoBlur(setGiornoType, item, setItem)}
            onChange={(e) => handleInputChange(e, setItem)}
          />
        </StyledCol>
        <StyledCol>
          <StyledSelect name="ora_inizio" value={item.ora_inizio} onChange={(e) => cambioValoriOrari(e, setItem)}>
            <StyledOption value="">Ora inizio</StyledOption>
            {ore.map((ora) => (
              <StyledOption key={ora} value={ora}>{ora}</StyledOption>  
            ))}
          </StyledSelect>
        </StyledCol>
        <StyledCol>
          <StyledSelect name="minuto_inizio" value={item.minuto_inizio} onChange={(e) => cambioValoriOrari(e, setItem)}>
            <StyledOption value="">Minuto inizio</StyledOption>
            {minuti.map((minuto) => (
              <StyledOption key={minuto} value={minuto}>{minuto}</StyledOption>  
            ))}
          </StyledSelect>
        </StyledCol>
        <StyledCol>
          <StyledSelect name="ora_fine" value={item.ora_fine} onChange={(e) => cambioValoriOrari(e, setItem)}>
            <StyledOption value="">Ora fine</StyledOption>
            {ore.map((ora) => (
              <StyledOption key={ora} value={ora}>{ora}</StyledOption>  
            ))}
          </StyledSelect>
        </StyledCol>
        <StyledCol>
          <StyledSelect name="minuto_fine" value={item.minuto_fine} onChange={(e) => cambioValoriOrari(e, setItem)}>
            <StyledOption value="">Minuto fine</StyledOption>
            {minuti.map((minuto) => (
              <StyledOption key={minuto} value={minuto}>{minuto}</StyledOption>  
            ))}
          </StyledSelect>
        </StyledCol>
        <StyledCol>
          <StyledTextAreaModifica
            rows="1"
            placeholder="Descrizione*"
            name="descrizione"
            value={item.descrizione}
            onChange={(e) => handleInputChange(e, setItem)}
          />
        </StyledCol>
        <StyledCol>
          <StyledTextAreaModifica
            rows="1"
            placeholder="Note"
            name="note"
            value={item.note}
            onChange={(e) => handleInputChange(e, setItem)}
          />
        </StyledCol>
      </StyledRow>
    </>
  );
}

export function RowRicercaLavori({item, setItem, eseguiRicerca}) {
  const ore = ["07", "08", "09", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22"];
  const minuti = ["00", "30"];
  let [visibilita, setVisibilita] = useState([true, true, true, true, true, true, true, true]);
  const [arrowUp, setArrowUp] = useState(true);
  let maxHeight = "2000px";

  const [primoGiornoType, setPrimoGiornoType] = useState('text');
  const [ultimoGiornoType, setUltimoGiornoType] = useState('text');

  item.primo_giorno = (item.primo_giorno !== undefined) ? item.primo_giorno : '';
  item.ultimo_giorno = (item.ultimo_giorno !== undefined) ? item.ultimo_giorno : ''; 

  return (
    <>
      <StyledRow>
        <OperazioniCercaItems 
          visibilita={visibilita} setVisibilita={setVisibilita} 
          arrowUp={arrowUp} setArrowUp={setArrowUp} eseguiRicerca={eseguiRicerca}
        />
        <StyledCol>
          {(visibilita[0]) && (
            <StyledInputModifica
              rows="1"
              placeholder="Nome cliente"
              type="text"
              name="nome_cliente"
              value={item.nome_cliente}
              onChange={(e) => handleInputChange(e, setItem)}
            />
          )}
        </StyledCol>
        <StyledCol>
          {(visibilita[1]) && (
            <StyledInputModifica
              rows="1"
              placeholder="Cognome cliente"
              type="text"
              name="cognome_cliente"
              value={item.cognome_cliente}
              onChange={(e) => handleInputChange(e, setItem)}
            />
          )}
        </StyledCol>        
        <StyledCol>
          {(visibilita[2]) && (
            <StyledInputModifica
              rows="1"
              placeholder="Nome professionista"
              type="text"
              name="nome_professionista"
              value={item.nome_professionista}
              onChange={(e) => handleInputChange(e, setItem)}
            />
          )}
        </StyledCol>        
        <StyledCol>
          {(visibilita[3]) && (
            <StyledInputModifica
              rows="1"
              placeholder="Professione"
              type="text"
              name="professione"
              value={item.professione}
              onChange={(e) => handleInputChange(e, setItem)}
            />
          )}
        </StyledCol>        
        <StyledCol>
          {(visibilita[4]) && (
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
          )}
        </StyledCol>        
        <StyledCol>
          {(visibilita[5]) && (
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
          )}
        </StyledCol>        
        <StyledCol>
          {(visibilita[6]) && (
            <StyledTextAreaModifica
              rows="1"
              placeholder="Descrizione"
              name="descrizione"
              value={item.descrizione}
              onChange={(e) => handleInputChange(e, setItem)}
            />
          )}
        </StyledCol>        
        <StyledCol>
          {(visibilita[7]) && (
            <StyledTextAreaModifica
              rows="1"
              placeholder="Note"
              name="note"
              value={item.note}
              onChange={(e) => handleInputChange(e, setItem)}
            />
          )}
        </StyledCol>
      </StyledRow>
    </>
  );
}

export function RowProfessionistaEsistente({item, items, setItems, selectOperation}) { 
  return (
    <>
      <StyledRow>
        <OperazioniItemEsistente selectOperation={selectOperation} item={item} />
        <StyledCol>
          <StyledTextAreaModifica rows="1" placeholder="Nome" name="nome" value={item.nome} onChange={(e) => handleInputChange(e, null, items, setItems, "cliente", item.id)} />
        </StyledCol>
        <StyledCol>
          <StyledTextAreaModifica rows="1" placeholder="Professione" name="professione" value={item.professione} onChange={(e) => handleInputChange(e, setItem)} />
        </StyledCol>
        <StyledCol>
          <StyledInputModifica rows="1" placeholder="Contatto" type="text" name="contatto" value={item.contatto} onChange={(e) => handleInputChange(e, null, items, setItems, "cliente", item.id)} />
        </StyledCol>
        <StyledCol>
          <StyledInputModifica rows="1" placeholder="Email" type="text" name="email" value={item.email} onChange={(e) => handleInputChange(e, setItem)} />
        </StyledCol>
        <StyledCol>
          <StyledTextAreaModifica rows="1" placeholder="Note" name="note" value={item.note} onChange={(e) => handleInputChange(e, null, items, setItems, "cliente", item.id)} />
        </StyledCol>
      </StyledRow>
    </>
  );
}









