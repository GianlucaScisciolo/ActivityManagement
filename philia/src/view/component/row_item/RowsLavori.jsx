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

export function RowRicercaDate({item, setItem, eseguiRicerca}) {
  const ore = ["07", "08", "09", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22"];
  const minuti = ["00", "30"];
  let [visibilita, setVisibilita] = useState([true, true, true, true, true]);
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
        <OperazioniCercaItems 
          visibilita={visibilita} setVisibilita={setVisibilita} 
          arrowUp={arrowUp} setArrowUp={setArrowUp} eseguiRicerca={eseguiRicerca}
        />
        <StyledCol>
          {(visibilita[0]) && (
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
          )}
        </StyledCol>
        <StyledCol>
          {(visibilita[1]) && (
            <StyledSelect name="ora_inizio" value={orario.ora_inizio} onChange={(e) => cambioValoriOrari(e, setOrario)}>
              <StyledOption value="">Ora inizio</StyledOption>
              {ore.map((ora) => (
                <StyledOption key={ora} value={ora}>{ora}</StyledOption>  
              ))}
            </StyledSelect>
          )}
        </StyledCol>
        <StyledCol>
          {(visibilita[2]) && (
            <StyledSelect name="minuto_inizio" value={orario.minuto_inizio} onChange={(e) => cambioValoriOrari(e, setOrario)}>
              <StyledOption value="">Minuto inizio</StyledOption>
              {minuti.map((minuto) => (
                <StyledOption key={minuto} value={minuto}>{minuto}</StyledOption>  
              ))}
            </StyledSelect>
          )}
        </StyledCol>
        <StyledCol>
          {(visibilita[3]) && (
            <StyledSelect name="ora_fine" value={orario.ora_fine} onChange={(e) => cambioValoriOrari(e, setOrario)}>
              <StyledOption value="">Ora fine</StyledOption>
              {ore.map((ora) => (
                <StyledOption key={ora} value={ora}>{ora}</StyledOption>  
              ))}
            </StyledSelect>
          )}
        </StyledCol>
        <StyledCol>
          {(visibilita[4]) && (
            <StyledSelect name="minuto_fine" value={orario.minuto_fine} onChange={(e) => cambioValoriOrari(e, setOrario)}>
              <StyledOption value="">Minuto fine</StyledOption>
              {minuti.map((minuto) => (
                <StyledOption key={minuto} value={minuto}>{minuto}</StyledOption>  
              ))}
            </StyledSelect>
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









