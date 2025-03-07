import React, { useState, useEffect } from 'react';
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
        className="salvaItemButton" 
        size={grandezzaIcona} 
        onClick={eseguiSalvataggio} 
      />
    </StyledColOperazioni>
  )
}

export function OperazioniCercaItems({ visibilita, setVisibilita, arrowUp, setArrowUp, eseguiRicerca }) {
  return (
    <StyledColOperazioni>
      <StyledSearchNotSelected 
        className="ricercaItemsButton" 
        size={grandezzaIcona} 
        style={{ marginRight: "50%" }} 
        onClick={eseguiRicerca} 
      />
      {arrowUp && (
        <StyledArrowLeftNotSelected 
          className="nascondiFormButton"
          size={grandezzaIcona} 
          onClick={() => nascondiForm(visibilita, setVisibilita, setArrowUp)} 
        />
      )}
      {!arrowUp && (
        <StyledArrowRightNotSelected 
          className="mostraFormButton" 
          size={grandezzaIcona} 
          onClick={() => mostraForm(visibilita, setVisibilita, setArrowUp)} 
        />
      )}
    </StyledColOperazioni>
  );
};

export function OperazioniItemEsistente ({ selectOperation, item }) {
  let TrashTag = getTrashTag(item.tipo_selezione);
  let PencilTag = getPencilTag(item.tipo_selezione);
  return (
    <StyledColOperazioni>
      <PencilTag 
        className="modificaItemButton"
        size={grandezzaIcona} 
        onClick={() => selectOperation("pencil", item)} 
        style={{ marginRight: "50%" }} 
      />
      <TrashTag 
        className="eliminaItemButton" 
        size={grandezzaIcona} 
        onClick={() => selectOperation("trash", item)} 
      />
    </StyledColOperazioni>
  )
}

export function OperazioniFileItems({ottieniFileRangePDF, ottieniFileRangeExcel, eliminaItemsRange}) {
  return (
    <>
      <StyledColOperazioni>
        <StyledFileIconNotSelected icon={faFilePdf} style={{ marginRight: "50%" }} size="2xl" />
        <StyledDownloadNotSelected size={grandezzaIcona} onClick={ottieniFileRangePDF} />
      </StyledColOperazioni>
      <StyledColOperazioni>
        <StyledFileIconNotSelected icon={faFileExcel} style={{ marginRight: "50%" }} size="2xl" />
        <StyledDownloadNotSelected size={grandezzaIcona} onClick={ottieniFileRangeExcel} />
      </StyledColOperazioni>
      <StyledColOperazioni>
        <StyledTrashNotSelected2 size={grandezzaIcona} onClick={eliminaItemsRange} />
      </StyledColOperazioni>
    </>
  );
};

export function OperazioniLogin({eseguiLogin}) {
  return (
    <StyledColOperazioni>
      <StyledLoginNotSelected 
        className="loginButton" 
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
        className="modificaProfiloButton" 
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
                    style={(campi.name[i] === "prezzo") ? {maxWidth:"90%"} : null}
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
                  {(campi.name[i] === "prezzo") && (
                    <StyledEuroNotSelected
                      style={{
                        // border: "5px solid #000000",
                        maxWidth: "10%",
                        marginLeft: "-6px", 
                        marginTop: "13px"
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

export function RowRicercaItems({campi, indici, eseguiRicerca}) {
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
        eseguiRicerca={eseguiRicerca}
      />
      {indici.map((i) => {
        const NomeTag = (campi.type[i]) ? getInputTag(1, true) : (
          getTextAreaTag(1, true)
        );
        return ( 
          <React.Fragment key={i}>
            <StyledCol>
              {(visibilita[i]) && (
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
              )}
            </StyledCol>
          </React.Fragment>
        );
      })} 
    </StyledRow>
  );
}

export function RowItemEsistente({item, campi, indici, selectOperation}) {
  const NomeTagHeader = getTextAreaTag(campi.tipoSelezione, false);

  return (
    <StyledRow>
      <OperazioniItemEsistente 
        selectOperation={selectOperation} 
        item={item} 
      />
      <StyledCol>
        <NomeTagHeader
          rows={1}
          name="header"
          value={campi.header}
          placeholder={campi.header}
          readOnly
        />
      </StyledCol>
      {indici.map((i) => {
        // onClick={handleGiornoClick(setUltimoGiornoType)}
        // onBlur={handleGiornoBlur(setUltimoGiornoType, item, setItem)}
        // onChange={(e) => handleInputChange(e, setItem)}
        const NomeTag = (campi.type[i]) ? getInputTag(campi.tipoSelezione, campi.valoreModificabile[i]) : (
          getTextAreaTag(campi.tipoSelezione, campi.valoreModificabile[i])
        );
        return ( 
          <React.Fragment key={i}>
            <StyledCol>
            <div style={{width: "100%"}}>
              <StyledRow>
                <NomeTag 
                  style={(campi.name[i] === "totale") ? {maxWidth:"80%"} : null}
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
                {(campi.name[i] === "totale") && (
                    <StyledEuroNotSelected
                      style={{
                        // border: "5px solid #000000",
                        maxWidth: "20%",
                        marginLeft: "-6px", 
                        marginTop: "13px"
                      }} 
                      size={grandezzaIcona} 
                      onClick={null} 
                    />
                  )}
              </StyledRow>
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
                        // border: "5px solid #000000",
                        maxWidth: "20%",
                        marginLeft: "-6px", 
                        marginTop: "13px"
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

export function RowProfilo({campi, indici, eseguiLogin}) {
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
      <OperazioniLogin eseguiLogin={eseguiLogin} />
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
                        marginTop: "13px"
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










