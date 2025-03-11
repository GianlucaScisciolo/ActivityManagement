import React, { useState, useEffect, useRef } from 'react';
import { 
  StyledPencilNotSelected, StyledPencilSelected, grandezzaIcona, 
  StyledTrashNotSelected, StyledTrashSelected, 
  StyledColOperazioni, StyledSaveNotSelected, 
  StyledSearchNotSelected, StyledArrowLeftNotSelected, StyledArrowRightNotSelected, 
  StyledFileIconNotSelected, StyledDownloadNotSelected, StyledTrashNotSelected2, 
  StyledLoginNotSelected, 
  StyledPencilNotSelectedModificaProfilo, 
  StyledInputBlock, StyledInputModifica, StyledInputElimina, 
  StyledTextAreaBlock, StyledTextAreaModifica, StyledTextAreaElimina, 
  StyledRow, StyledCol, StyledSpanErrore, 
  StyledSelectBlock, StyledSelectModifica, StyledSelectElimina, 
  StyledEyeClosedNotSelected, StyledEyeOpenNotSelected, 
  StyledEuroNotSelected 
} from "./StyledRowItem";
import { Trash2, Pencil } from 'lucide-react';
import { faFilePdf, faFileExcel } from '@fortawesome/free-solid-svg-icons';
import { aggiornaCliente } from '../../store/redux/ClientiSlice';
import { aggiornaServizio } from '../../store/redux/ServiziSlice';
import { aggiornaSpesa } from '../../store/redux/SpeseSlice';
import { aggiornaLavoro } from '../../store/redux/LavoriSlice';

export function getSelectTag(tipoSelezione) {
  return (tipoSelezione !== 1 && tipoSelezione !== 2) ? StyledSelectBlock : (
    (tipoSelezione === 1) ? StyledSelectModifica : StyledSelectElimina
  );
}; 

export function getInputTag(tipoSelezione, isModificabile) {
  return (isModificabile) ? (
    (tipoSelezione !== 1 && tipoSelezione !== 2) ? StyledInputBlock : (
      (tipoSelezione === 1) ? StyledInputModifica : StyledInputElimina
    )
  ) : (
    (tipoSelezione !== 2) ? StyledInputBlock : StyledInputElimina
  );
};

export function getTextAreaTag(tipoSelezione, isModificabile) {
  return (isModificabile) ? (
    (tipoSelezione !== 1 && tipoSelezione !== 2) ? StyledTextAreaBlock : (
      (tipoSelezione === 1) ? StyledTextAreaModifica : StyledTextAreaElimina
    )
  ) : (
    (tipoSelezione !== 2) ? StyledTextAreaBlock : StyledTextAreaElimina
  );
};

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

function getPencilTag(tipoSelezione) {
  return (tipoSelezione === 0 || tipoSelezione === 2) ? StyledPencilNotSelected : (
    (tipoSelezione === 1) ? StyledPencilSelected : Pencil
  );
}

function getTrashTag(tipoSelezione) {
  return (tipoSelezione === 0 || tipoSelezione === 1) ? StyledTrashNotSelected : (
    (tipoSelezione === 2) ? StyledTrashSelected : Trash2
  );
}

export function OperazioniNuovoItem({eseguiSalvataggio}) {
  return (
    <StyledColOperazioni>
        <StyledSaveNotSelected 
          className="center salvaItemButton" 
          size={grandezzaIcona} 
          onClick={eseguiSalvataggio} 
        />
    </StyledColOperazioni>
  )
}

export function OperazioniCercaItems({ visibilita, setVisibilita, arrowUp, setArrowUp, handleSearch }) {
  return (
    <StyledColOperazioni>
      <div style={{width: "100%"}}>
        <StyledSearchNotSelected 
          className="left ricercaItemsButton" 
          size={grandezzaIcona} 
          // style={{ marginRight: "50%" }} 
          onClick={handleSearch} 
        />
        {arrowUp && (
          <StyledArrowLeftNotSelected 
            className="right nascondiFormButton"
            size={grandezzaIcona} 
            onClick={() => nascondiForm(visibilita, setVisibilita, setArrowUp)} 
          />
        )}
        {!arrowUp && (
          <StyledArrowRightNotSelected 
            className="right mostraFormButton" 
            size={grandezzaIcona} 
            onClick={() => mostraForm(visibilita, setVisibilita, setArrowUp)} 
          />
        )}
      </div>
    </StyledColOperazioni>
  );
};

export function OperazioniItemEsistente ({ selectOperation, item }) {
  let TrashTag = getTrashTag(item.tipo_selezione);
  let PencilTag = getPencilTag(item.tipo_selezione);
  return (
    <StyledColOperazioni>
      <div style={{width: "100%"}}>
        <PencilTag 
          className="left modificaItemButton"
          size={grandezzaIcona} 
          onClick={() => selectOperation("pencil", item)} 
          style={{ marginRight: "50%" }} 
        />
        <TrashTag 
          className="rigth eliminaItemButton" 
          size={grandezzaIcona} 
          onClick={() => selectOperation("trash", item)} 
        />
      </div>
    </StyledColOperazioni>
  )
}

export function OperazioniFileItems({ottieniFileRangePDF, ottieniFileRangeExcel, eliminaItemsRange}) {
  return (
    <>
      <StyledColOperazioni>
        <div style={{width: "100%"}}>
          <StyledFileIconNotSelected icon={faFilePdf} className="left" style={{ marginRight: "50%" }} size="2xl" />
          <StyledDownloadNotSelected size={grandezzaIcona} className="rigth" onClick={ottieniFileRangePDF} />
        </div>
      </StyledColOperazioni>
      <StyledColOperazioni>
        <div style={{width: "100%"}}>
          <StyledFileIconNotSelected icon={faFileExcel} className="left" style={{ marginRight: "50%" }} size="2xl" />
          <StyledDownloadNotSelected size={grandezzaIcona} className="rigth" onClick={ottieniFileRangeExcel} />
        </div>
      </StyledColOperazioni>
      <StyledColOperazioni>
        <div style={{width: "100%"}}>
          <StyledTrashNotSelected2 size={grandezzaIcona} className="center" onClick={eliminaItemsRange} />
        </div>
      </StyledColOperazioni>
    </>
  );
};

export function OperazioniLogin({eseguiLogin}) {
  return (
    <StyledColOperazioni>
      <StyledLoginNotSelected 
        className="center loginButton" 
        size={grandezzaIcona} 
        onClick={eseguiLogin} 
      />
    </StyledColOperazioni>
  );
};

export function OperazioniModificaProfilo({eseguiModificaProfilo}) {
  return (
    <StyledColOperazioni>
      <StyledPencilNotSelectedModificaProfilo 
        className="center modificaProfiloButton" 
        size={grandezzaIcona} 
        onClick={eseguiModificaProfilo} 
      />
    </StyledColOperazioni>
  );
};

export function RowNuovoItem({campi, indici, eseguiSalvataggio}) {
  let InputTag = getInputTag(1, true);
  let TextAreaTag = getTextAreaTag(1, true);

  return (
    <StyledRow>
      <OperazioniNuovoItem eseguiSalvataggio={eseguiSalvataggio} />
      {indici.map((i) => {
        // onClick={handleGiornoClick(setUltimoGiornoType)}
        // onBlur={handleGiornoBlur(setUltimoGiornoType, item, setItem)}
        // onChange={(e) => handleInputChange(e, setItem)}
        const NomeTag = (campi.type[i]) ? getInputTag(1, true) : (
          getTextAreaTag(1, true)
        );
        return ( 
          <React.Fragment key={i}>
            <StyledCol>
              <div style={{width: "100%"}}>
                <StyledRow>
                  <NomeTag 
                    rows={1}
                    style={(["prezzo", "totale"].includes(campi.name[i])) ? {maxWidth:"90%"} : null}
                    name={campi.name[i]}
                    id={campi.id[i]}
                    type={campi.type[i]}
                    step={campi.step[i]}
                    value={campi.value[i]}
                    placeholder={campi.placeholder[i]}
                    onChange={campi.onChange}
                    onClick={campi.onClick}
                    onBlur={campi.onBlur}
                  />
                  {(["prezzo", "totale"].includes(campi.name[i])) && (
                    <StyledEuroNotSelected
                      style={{
                        // border: "5px solid #000000",
                        maxWidth: "10%",
                        marginLeft: "-6px", 
                        // marginTop: "13px"
                      }} 
                      size={grandezzaIcona} 
                      onClick={null} 
                    />
                  )}
                  {campi.options[i]}
                </StyledRow>
                {(campi.errore[i] !== "") && (<StyledSpanErrore>{campi.errore[i]}</StyledSpanErrore>)}
              </div>
            </StyledCol>
          </React.Fragment>
        );
      })}
    </StyledRow>
  );
}

export function RowRicercaItems({campi, indici, handleSearch}) {
  let [visibilita, setVisibilita] = useState([true, true, true, true, true, true, true, true]);
  const [arrowUp, setArrowUp] = useState(true);
  let InputTag = getInputTag(1, true);
  let TextAreaTag = getTextAreaTag(1, true);

  return (
    <StyledRow>
      <OperazioniCercaItems 
        visibilita={visibilita} 
        setVisibilita={setVisibilita} 
        arrowUp={arrowUp} 
        setArrowUp={setArrowUp} 
        handleSearch={handleSearch}
      />
      {indici.map((i) => {
        const NomeTag = (campi.type[i]) ? getInputTag(1, true) : (
          getTextAreaTag(1, true)
        );
        return ( 
          <React.Fragment key={i}>
            <StyledCol>
              <div style={{width: "100%"}}>
                <StyledRow>
                  {(visibilita[i]) && (
                    <>
                      <NomeTag 
                        style={(["prezzo_min", "prezzo_max", "totale_min", "totale_max"].includes(campi.name[i])) ? {maxWidth:"90%"} : null}
                        rows={1}
                        name={campi.name[i]}
                        id={campi.id[i]}
                        type={campi.type[i]}
                        step={campi.step[i]}
                        value={campi.value[i]}
                        placeholder={campi.placeholder[i]}
                        onChange={campi.onChange}
                        onClick={campi.onClick}
                        onBlur={campi.onBlur}
                      />
                      {(["prezzo_min", "prezzo_max", "totale_min", "totale_max"].includes(campi.name[i])) && (
                        <StyledEuroNotSelected
                          style={{
                            maxWidth: "20%",
                            marginLeft: "-6px", 
                          }} 
                          size={grandezzaIcona} 
                          onClick={null} 
                        />
                      )}
                    </>
                  )}
                </StyledRow>
              </div>
            </StyledCol>
          </React.Fragment>
        );
      })} 
    </StyledRow>
  );
}

export function RowItemEsistente({ item, campi, indici, selectOperation, tipoItem, dispatch }) {
  const NomeTagHeader = getTextAreaTag(campi.tipoSelezione, false);
  const [localValues, setLocalValues] = useState(() =>
    indici.reduce((acc, i) => ({ ...acc, [i]: campi.value[i] }), {})
  ); // Gestione dello stato locale
  
  const handleChange = (e, index) => {
    e.preventDefault();
    const { name, value, id } = e.target;
    console.log(id);
  
    let modificabile = true;
  
    if([
      "note_cliente", "note_servizio", "note_lavoro", "note_spesa" 
    ].includes(id)) {
      if(value.length > 200) {
        modificabile = false;
      }
    }
    else if([
      "descrizione_spesa" 
    ].includes(id)) {
      if(value.length > 1000) {
        modificabile = false;
      }
    }
    else if([
      "nome_servizio" 
    ].includes(id)) {
      if(value.length > 100) {
        modificabile = false;
      }
    }
    else if ([
      "prezzo_servizio", "totale_spesa" 
    ].includes(id)) {
      // console.log("|" + value + "|");
      const isDecimal = !isNaN(value) && Number(value) === parseFloat(value);
      if (!isDecimal || value < 0) {
        modificabile = false;
      }
    }
    else if([
      "email_cliente" 
    ].includes(id)) {
      if(value.length > 254) {
        modificabile = false;
      }
    }
    else if([
      "contatto_cliente" 
    ].includes(id)) {
      if(value === "") {
        modificabile = true;
      }
      else if (!(/^\d+$/.test(value)) || !((value.startsWith("0") && value.length <= 11) || (value.startsWith("3") && value.length <= 10))) {
        modificabile = false;
      }
    }
    
    // Aggiorno solo lo stato locale
    if(modificabile === true) {
      setLocalValues((prevValues) => ({
        ...prevValues,
        [index]: value,
      }));
    }
  };

  
  const handleBlur = (e, item, index) => {
    const { name, value, type } = e.target;

    // Dispatch dell'azione solo quando l'elemento perde il focus
    if (tipoItem === "cliente") {
      dispatch(aggiornaCliente({
        id_cliente: item.id,
        nome_attributo: name,
        nuovo_valore: value,
      }));
    } else if (tipoItem === "lavoro") {
      dispatch(aggiornaLavoro({
        id_lavoro: item.id,
        nome_attributo: name,
        nuovo_valore: value,
      }));
    } else if (tipoItem === "spesa") {
      dispatch(aggiornaSpesa({
        id_spesa: item.id,
        nome_attributo: name,
        nuovo_valore: value,
      }));
    } else if (tipoItem === "servizio") {
      dispatch(aggiornaServizio({
        id_servizio: item.id,
        nome_attributo: name,
        nuovo_valore: value,
      }));
    }

    if(["giorno_spesa", "giorno_lavoro"].includes(e.target.id)) {
      e.target.type = (!e.target.value) ? "text" : "date";
    }
  };

  const handleClick = (e) => {
    if(["giorno_spesa", "giorno_lavoro"].includes(e.target.id)) {
      e.target.type = "date";
    }
  }

  return (
    <StyledRow>
      <OperazioniItemEsistente selectOperation={selectOperation} item={item} />
      
      <StyledCol>
        <div style={{width: "100%"}}>
          <StyledRow>
            <NomeTagHeader
              rows={1}
              name="header"
              value={campi.header}
              placeholder={campi.header}
              readOnly
            />
          </StyledRow>
        </div>
      </StyledCol>
      
      {indici.map((i) => {
        const NomeTag = (campi.type[i]) ? getInputTag(campi.tipoSelezione, campi.valoreModificabile[i]) : (
          getTextAreaTag(campi.tipoSelezione, campi.valoreModificabile[i])
        );
        return ( 
          <React.Fragment key={i}>
            <StyledCol>
            <div style={{width: "100%"}}>
              <StyledRow>
                <NomeTag 
                  style={["prezzo", "totale"].includes(campi.name[i]) ? {maxWidth:"80%"} : null}
                  rows={1}
                  name={campi.name[i]}
                  id={campi.id[i]}
                  type={campi.type[i]}
                  step={campi.step[i]}
                  value={localValues[i]}
                  placeholder={campi.placeholder[i]}
                  onChange={(e) => handleChange(e, i)}
                  onBlur={(e) => handleBlur(e, item, i)} 
                  onClick={(e) => handleClick(e)}
                  readOnly={item.tipo_selezione !== 1}
                />
                {(["prezzo", "totale"].includes(campi.name[i])) && (
                  <StyledEuroNotSelected
                    style={{ maxWidth: "20%", marginLeft: "-6px" }} 
                    size={grandezzaIcona} 
                  />
                )}
                {campi.options[i]}
              </StyledRow>
              {(campi.errore[i]) && (<StyledSpanErrore>{campi.errore[i]}</StyledSpanErrore>)}
            </div>
            </StyledCol>
          </React.Fragment>
        );
      })}
    </StyledRow>
  )
}

export function RowFileItems({campi, indici, ottieniFileRangePDF, ottieniFileRangeExcel, eliminaItemsRange}) {
  return (
    <StyledRow>
      <OperazioniFileItems 
        ottieniFileRangePDF={ottieniFileRangePDF} 
        ottieniFileRangeExcel={ottieniFileRangeExcel} 
        eliminaItemsRange={eliminaItemsRange} 
      />
      {indici.map((i) => {
        const NomeTag = (campi.type[i]) ? getInputTag(1, true) : (
          getTextAreaTag(1, true)
        );
        return ( 
          <React.Fragment key={i}>
            <StyledCol>
              <div style={{width: "100%"}}>
                <StyledRow>
                  <NomeTag 
                    rows={1}
                    name={campi.name[i]}
                    id={campi.id[i]}
                    type={campi.type[i]}
                    step={campi.step[i]}
                    value={campi.value[i]}
                    placeholder={campi.placeholder[i]}
                    onChange={campi.onChange}
                    onClick={campi.onClick}
                    onBlur={campi.onBlur}
                  />
                </StyledRow>
              </div>
            </StyledCol>
          </React.Fragment>
        );
      })}
    </StyledRow>
  )
}

export function RowLogin({campi, indici, eseguiLogin}) {
  const [inputType, setInputType] = useState('password');

  const onChangeVisibilityPassword = (e) => {
    e.preventDefault();
    setInputType(inputType === 'text' ? 'password' : 'text');
  };

  return (
    <StyledRow>
      <OperazioniLogin eseguiLogin={eseguiLogin} />
      {indici.map((i) => {
        const NomeTag = (campi.type[i]) ? getInputTag(1, true) : (
          getTextAreaTag(1, true)
        );
        const StyledEyeTag = (inputType === "password") ? StyledEyeClosedNotSelected : StyledEyeOpenNotSelected;
        return ( 
          <React.Fragment key={i}>
            <StyledCol>
              <div style={{width: "100%"}}>
                <StyledRow>
                  <NomeTag 
                    style={(campi.name[i] === "password") ? {maxWidth:"80%"} : null}
                    rows={1}
                    name={campi.name[i]}
                    id={campi.id[i]}
                    type={(campi.name[i] === "password") ? inputType : campi.type[i]}
                    step={campi.step[i]}
                    min={campi.min[i]}
                    value={campi.value[i]}
                    placeholder={campi.placeholder[i]}
                    onChange={campi.onChange}
                    onClick={campi.onClick}
                    onBlur={campi.onBlur}
                  />
                  {(campi.name[i] === "password") && (
                    <StyledEyeTag
                      style={{
                        maxWidth: "20%",
                        marginLeft: "-6px", 
                      }} 
                      size={grandezzaIcona} 
                      onClick={onChangeVisibilityPassword} 
                    />
                  )}
                </StyledRow>
                {campi.options[i]}
                {(campi.errore[i]) && (<StyledSpanErrore>{campi.errore[i]}</StyledSpanErrore>)}
              </div>
            </StyledCol>
          </React.Fragment>
        );
      })}
    </StyledRow>
  );
}

export function RowProfilo({campi, indici, eseguiModificaProfilo}) {
  const [passwordAttualeType, setPasswordAttualeType] = useState('password');
  const [nuovaPasswordType, setNuovaPasswordType] = useState('password');
  const [confermaNuovaPasswordType, setConfermaNuovaPasswordType] = useState('password');

  const onChangeVisibilityPassword = (e, nome) => {
    e.preventDefault();
    if(nome === "password_attuale") {
      setPasswordAttualeType(passwordAttualeType === 'text' ? 'password' : 'text');
    }
    else if(nome === "nuova_password") {
      setNuovaPasswordType(nuovaPasswordType === 'text' ? 'password' : 'text');
    }
    else if(nome === "conferma_nuova_password") {
      setConfermaNuovaPasswordType(confermaNuovaPasswordType === 'text' ? 'password' : 'text');
    } 
  };

  return (
    <StyledRow>
      <OperazioniModificaProfilo eseguiModificaProfilo={eseguiModificaProfilo} />
      {indici.map((i) => {
        const NomeTag = (campi.type[i]) ? getInputTag(1, true) : (
          getTextAreaTag(1, true)
        );
        const StyledEyeTag = (
          (
            campi.name[i] === "password_attuale" && passwordAttualeType === "password" || 
            campi.name[i] === "nuova_password" && nuovaPasswordType === "password" || 
            campi.name[i] === "conferma_nuova_password" && confermaNuovaPasswordType === "password"
          ) ? StyledEyeClosedNotSelected : StyledEyeOpenNotSelected
        );

        return ( 
          <React.Fragment key={i}>
            <StyledCol>
              <div style={{width: "100%"}}>
                <StyledRow>
                  <NomeTag 
                    style={(campi.name[i].includes("password")) ? {maxWidth:"80%"} : null}
                    rows={1}
                    name={campi.name[i]}
                    id={campi.id[i]}
                    type={(campi.name[i].includes("password")) ? (
                      (campi.name[i] === "password_attuale") ? passwordAttualeType : (
                        (campi.name[i] === "nuova_password")) ? nuovaPasswordType : confermaNuovaPasswordType
                    ) : campi.type[i]}
                    step={campi.step[i]}
                    min={campi.min[i]}
                    value={campi.value[i]}
                    placeholder={campi.placeholder[i]}
                    onChange={campi.onChange}
                    onClick={campi.onClick}
                    onBlur={campi.onBlur}
                  />
                  {(campi.name[i].includes("password")) && (
                    <StyledEyeTag
                      style={{
                        // border: "5px solid #000000",
                        maxWidth: "20%",
                        marginLeft: "-6px", 
                      }} 
                      size={grandezzaIcona} 
                      onClick={(e) => onChangeVisibilityPassword(e, campi.name[i])} 
                    />
                  )}
                </StyledRow>
                {campi.options[i]}
                {(campi.errore[i]) && (<StyledSpanErrore>{campi.errore[i]}</StyledSpanErrore>)}
              </div>
            </StyledCol>
          </React.Fragment>
        );
      })}
    </StyledRow>
  );
}










