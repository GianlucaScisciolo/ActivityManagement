// React e Redux
import { useSelector } from 'react-redux';
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Card, Table } from 'react-bootstrap';
import { faFilePdf, faFileExcel } from '@fortawesome/free-solid-svg-icons';
import { Trash2, Pencil } from 'lucide-react';
// Riutilizzabile
import { 
  StyledPencilNotSelected, StyledPencilSelected, grandezzaIcona, 
  StyledTrashNotSelected, StyledTrashSelected, 
  StyledListGroupItem, StyledRow, StyledCol, StyledSaveNotSelected, 
  StyledEyeOpenNotSelected, StyledEyeClosedNotSelected,
  StyledSearchNotSelected, StyledArrowTopNotSelected, StyledArrowBottomNotSelected, 
  StyledFileIconNotSelected, StyledDownloadNotSelected, StyledTrashNotSelected2, 
  StyledLoginNotSelected, 
  StyledPencilNotSelected2, 
  StyledSelectBlock, StyledSelectModifica, StyledSelectElimina, 
  StyledInputBlock, StyledInputModifica, StyledInputElimina, 
  StyledTextAreaBlock, StyledTextAreaModifica, StyledTextAreaElimina, 
  StyledCard, StyledCardHeader, SlideContainer, 
  StyledSpanErrore, StyledEuroNotSelected
} from './StyledCardItem';

function getColor(value, j, tipo){
  // (i > 0) ? (
  //                       value < 0 ? "#FF0000" : (value > 0 ? "#00FF00" : "#FFFFFF")) : "#0000FF"
  return (j === 0) ? ("#FFFFFF") : (
    (value < 0) ? "#FF0000" : (value > 0 ? "#00FF00" : "#FFFFFF")
  )
}

const handleRightClick = (e, placeholder) => {
  e.preventDefault();
  alert(placeholder);
}

function onChangeVisibilityPassword(e, type) {
  e.preventDefault();
  console.log(type);
  type = (type === "text") ? "password" : "text";
  console.log(type);
}

function getPencilTag(tipoSelezione) {
  return (tipoSelezione === 0 || tipoSelezione === 2) ? StyledPencilNotSelected : (
    (tipoSelezione === 1) ? StyledPencilSelected : Pencil
  );
};

function getTrashTag(tipoSelezione) {
  // console.log(tipoSelezione);
  return (tipoSelezione === 0 || tipoSelezione === 1) ? StyledTrashNotSelected : (
    (tipoSelezione === 2) ? StyledTrashSelected : Trash2
  );
};

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

export function nascondiForm(setIsVisible, setArrowUp) {
  setIsVisible(prev => !prev);
  setTimeout(() => {
    setArrowUp(prev => !prev);
  }, 450); 
};

export function OperazioniNuovoItem({eseguiSalvataggio}) {
  return (
    <StyledListGroupItem style={{ border: "5px solid #000000", backgroundColor:"#000000" }}>
      <StyledRow>
        <StyledCol>
          <StyledSaveNotSelected 
            className="salvaItemButton" 
            size={grandezzaIcona} 
            onClick={eseguiSalvataggio} 
          />
        </StyledCol>
      </StyledRow>
    </StyledListGroupItem>
  )
}

export function OperazioniCercaItems({ setIsVisible, arrowUp, setArrowUp, handleSearch }) {
  return (
    <StyledListGroupItem style={{ border: "5px solid #000000", backgroundColor: "#000000" }}>
      <StyledSearchNotSelected 
        className="ricercaItemsButton" 
        size={grandezzaIcona} 
        style={{ 
          /* marginRight: "0%" 50% */ 
        }}
        onClick={handleSearch} 
      />
      {/*
      {arrowUp && (
        <StyledArrowTopNotSelected 
          className="nascondiFormButton" 
          size={grandezzaIcona} 
          onClick={() => nascondiForm(setIsVisible, setArrowUp)} 
        />
      )}
      {!arrowUp && (
        <StyledArrowBottomNotSelected 
          className="mostraFormButton" 
          size={grandezzaIcona} 
          onClick={() => nascondiForm(setIsVisible, setArrowUp)} 
        />
      )}
      */}
    </StyledListGroupItem>
  );
};

export function OperazioniRicercaEntrateUscite({ eseguiRicerca }) {
  return (
    <StyledListGroupItem style={{ border: "5px solid #000000", backgroundColor: "#000000" }}>
      <StyledSearchNotSelected 
        className="ricercaEntrateUsciteButton" 
        size={grandezzaIcona} 
        onClick={eseguiRicerca} 
      />
    </StyledListGroupItem>
  );
};

export function OperazioniItemEsistente ({ selectOperation, item }) {
  let TrashTag = getTrashTag(item.tipo_selezione);
  let PencilTag = getPencilTag(item.tipo_selezione);

  return (
    <StyledListGroupItem style={{ border: "5px solid #000000", backgroundColor: "#000000" }}>
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
    </StyledListGroupItem>
  )
}

export function OperazioniFileItems({ottieniFileRangePDF, ottieniFileRangeExcel, eliminaItemsRange}) {
  return (
    <StyledListGroupItem style={{ border: "5px solid #000000", backgroundColor: "#000000", paddingTop: "3%" }}>
      <div>
        <StyledFileIconNotSelected icon={faFilePdf} size="2xl" style={{ marginRight: "50%" }} />
        <StyledFileIconNotSelected icon={faFileExcel} size="2xl" />
      </div>
      <br />
      <div>
        <StyledDownloadNotSelected size={grandezzaIcona} style={{ marginRight: "50%" }} onClick={ottieniFileRangePDF} />
        <StyledDownloadNotSelected size={grandezzaIcona} onClick={ottieniFileRangeExcel} />
      </div>
      <br />
      <div>
        <StyledTrashNotSelected size={grandezzaIcona} onClick={eliminaItemsRange} />
      </div>
      <br />
    </StyledListGroupItem>
  );
};

export function OperazioniLogin({eseguiLogin}) {
  return (
    <StyledListGroupItem style={{ border: "5px solid #000000", backgroundColor: "#000000", paddingTop: "3%", paddingBottom: "3%" }}>
      <StyledLoginNotSelected 
        className="loginButton" 
        size={grandezzaIcona} 
        onClick={eseguiLogin} 
      />
    </StyledListGroupItem>
  );
};

export function OperazioniModificaProfilo({eseguiModificaProfilo}) {
  return (
    <StyledListGroupItem style={{ border: "5px solid #000000", backgroundColor: "#000000" }}>
      <StyledPencilNotSelected2 
        className="modificaProfiloButton"
        size={grandezzaIcona} 
        onClick={eseguiModificaProfilo} 
      />
    </StyledListGroupItem>
  );
};

export function CardNuovoItem({campi, indici, eseguiSalvataggio}) {
  let maxHeight = "2000px";

  const handleRightClick = (e, placeholder) => {
    e.preventDefault();
    alert(placeholder);
  }
  
  return (
    <center>
      <StyledCard>
        <StyledCardHeader>{campi["header"]}</StyledCardHeader>
        <SlideContainer style={{maxHeight: `${maxHeight}`}}>
          {indici.map((i) => {
            const NomeTag = (campi.type[i]) ? getInputTag(1, true) : (
              getTextAreaTag(1, true)
            );
            return ( 
              <React.Fragment key={i}>
                <StyledRow>
                  <NomeTag 
                    rows={1}
                    name={campi.name[i]}
                    id={campi.id[i]}
                    type={campi.type[i]}
                    step={campi.step[i]}
                    value={(campi.value[i] !== " €") ? campi.value[i] : ""}
                    placeholder={campi.placeholder[i]}
                    onChange={campi.onChange}
                    onClick={campi.onClick}
                    onBlur={campi.onBlur}
                    onContextMenu={(e) => handleRightClick(e, campi.placeholder[i])}
                  />
                  {campi.options[i]}
                </StyledRow>
                {(campi.errore[i] !== "") && (<StyledSpanErrore>{campi.errore[i]}</StyledSpanErrore>)}
              </React.Fragment>
            );
          })}
        </SlideContainer>
        <OperazioniNuovoItem 
          eseguiSalvataggio={eseguiSalvataggio} 
        />
      </StyledCard>
    </center>
  );
}

export function CardRicercaItems({campi, indici, handleSearch}) {
  const [isVisible, setIsVisible] = useState(true);
  const [arrowUp, setArrowUp] = useState(true);
  let maxHeight = (isVisible) ? "2000px" : "0px";
  let InputTag = getInputTag(1, true);
  let TextAreaTag = getTextAreaTag(1, true);

  const handleRightClick = (e, placeholder) => {
    e.preventDefault();
    alert(placeholder);
  }

  return (
    <center>
      <StyledCard>
        <StyledCardHeader>{campi["header"]}</StyledCardHeader>
        <SlideContainer style={{maxHeight: `${maxHeight}`}}>
          {indici.map((i) => {
            const NomeTag = (campi.type[i]) ? getInputTag(1, true) : (
              getTextAreaTag(1, true)
            );
            return ( 
              <React.Fragment key={i}>
                <StyledRow>
                  <NomeTag 
                    rows={1}
                    name={campi.name[i]}
                    id={campi.id[i]}
                    type={campi.value[i]}
                    value={(campi.value[i] !== " €") ? campi.value[i] : ""}
                    placeholder={campi.placeholder[i]}
                    onChange={campi.onChange}
                    onClick={campi.onClick}
                    onBlur={campi.onBlur}
                    onContextMenu={(e) => handleRightClick(e, campi.placeholder[i])}
                  />
                </StyledRow>
              </React.Fragment>
            );
          })}
        </SlideContainer>
        <OperazioniCercaItems
          setIsVisible={setIsVisible}
          arrowUp={arrowUp}
          setArrowUp={setArrowUp}
          handleSearch={handleSearch}
          />
          {/*
         */}
      </StyledCard>
    </center>
  );
}

export function CardItemEsistente({ item, campi, indici, selectOperation, tipoItem, handleBlurItem }) {
  const inputRefs = useRef([]); // Array di riferimenti per ogni input
  const [localValues, setLocalValues] = useState(() =>
    indici.reduce((acc, i) => ({ ...acc, [i]: campi.value[i] }), {})
  ); // Gestione dello stato locale

  const handleRightClick = (e, placeholder) => {
    e.preventDefault();
    alert(placeholder);
  }

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
      const isDecimal = !isNaN(value.substr(0, value)) && Number(value) === parseFloat(value);
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

  const handleClick = (e) => {
    if(["giorno_spesa", "giorno_lavoro"].includes(e.target.id)) {
      e.target.type = "date";
    }
    else if(["prezzo_servizio", "totale_spesa"].includes(e.target.id)) {
      e.target.value = e.target.value.substr(0, e.target.value.length-2);
    }
  }

  return (
    <StyledCard>
      <StyledCardHeader>{campi["header"]}</StyledCardHeader>
      <SlideContainer>
        {indici.map((i) => {
          const NomeTag = campi.type[i]
            ? getInputTag(campi.tipoSelezione, campi.valoreModificabile[i])
            : getTextAreaTag(campi.tipoSelezione, campi.valoreModificabile[i]);

          return (
            <React.Fragment key={`input-${i}`}>
              <StyledRow>
                <NomeTag
                  ref={(el) => (inputRefs.current[i] = el)} // Assegna il riferimento
                  rows={1}
                  name={campi.name[i]}
                  id={campi.id[i]}
                  type={campi.type[i]}
                  step={campi.step[i]}
                  value={localValues[i]} // stato locale per il valore
                  placeholder={campi.placeholder[i]}
                  onChange={(e) => handleChange(e, i)} // Aggiorna lo stato locale
                  onBlur={(e) => handleBlurItem(e, item)}
                  onClick={(e) => handleClick(e)}
                  readOnly={item.tipo_selezione !== 1}
                  onContextMenu={(e) => handleRightClick(e, campi.placeholder[i])}
                />
                {campi.options[i]}
              </StyledRow>
              {(campi.errore[i]) && (<StyledSpanErrore>{campi.errore[i]}</StyledSpanErrore>)}
            </React.Fragment>
          );
        })}
      </SlideContainer>
      <OperazioniItemEsistente selectOperation={selectOperation} item={item} />
    </StyledCard>
  );
}

export function CardFileItems({campi, indici, ottieniFileRangePDF, ottieniFileRangeExcel, eliminaItemsRange}) {
  let maxHeight = "2000px";

  const handleRightClick = (e, placeholder) => {
    e.preventDefault();
    alert(placeholder);
  }
  
  return (
    <center>
      <StyledCard>
        <StyledCardHeader>{campi["header"]}</StyledCardHeader>
        <SlideContainer style={{maxHeight: `${maxHeight}`}}>
          {indici.map((i) => {
            const NomeTag = (campi.type[i]) ? getInputTag(1, true) : (
              getTextAreaTag(1, true)
            );
            return ( 
              <React.Fragment key={i}>
                <NomeTag 
                  key={i}
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
                  onContextMenu={(e) => handleRightClick(e, campi.placeholder[i])}
                />
              </React.Fragment>
            );
          })}
        </SlideContainer>
        <OperazioniFileItems 
          ottieniFileRangePDF={ottieniFileRangePDF} 
          ottieniFileRangeExcel={ottieniFileRangeExcel} 
          eliminaItemsRange={eliminaItemsRange} 
        />
      </StyledCard>
    </center>
  );
}

export function CardLogin({campi, indici, eseguiLogin}) {
  let maxHeight = "2000px";
  const [inputType, setInputType] = useState('password');

  const onChangeVisibilityPassword = (e) => {
    e.preventDefault();
    setInputType(inputType === 'text' ? 'password' : 'text');
  };

  const handleRightClick = (e, placeholder) => {
    e.preventDefault();
    alert(placeholder);
  }
  
  return (
    <center>
      <StyledCard>
        <StyledCardHeader>{campi["header"]}</StyledCardHeader>
        <SlideContainer style={{maxHeight: `${maxHeight}`}}>
          {indici.map((i) => {
            const NomeTag = (campi.type[i]) ? getInputTag(1, true) : (
              getTextAreaTag(1, true)
            );
            const StyledEyeTag = (inputType === "password") ? StyledEyeClosedNotSelected : StyledEyeOpenNotSelected;
            return ( 
              <React.Fragment key={i}>
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
                    onContextMenu={(e) => handleRightClick(e, campi.placeholder[i])}
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
              </React.Fragment>
            );
          })}
        </SlideContainer>
        <OperazioniLogin
          eseguiLogin={eseguiLogin} 
        />
      </StyledCard>
    </center>
  );
}

export function CardProfilo({campi, indici, eseguiModificaProfilo}) {
  let maxHeight = "2000px";
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
    <center>
      <StyledCard>
        <StyledCardHeader>{campi["header"]}</StyledCardHeader>  
        <SlideContainer style={{maxHeight: `${maxHeight}`}}>
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
                    onContextMenu={(e) => handleRightClick(e, campi.placeholder[i])}
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
              </React.Fragment>
            );
          })}
        </SlideContainer>
        <OperazioniModificaProfilo 
          eseguiModificaProfilo={eseguiModificaProfilo}
        />
      </StyledCard>
    </center>
  );
}

export function CardWidget({nome, img, id, onClickWidget, backgroundColor}) {  
  return (
    <Card 
      style={{ 
        width: "300px", 
        height: "400px", 
        backgroundColor: backgroundColor, 
        borderRadius: "50px", 
        display: "flex", 
        flexDirection: "column", 
        alignItems: "center",
        justifyContent: "center",
      }}
      onClick={(e) => {
        // e.stopPropagation(); // Prevenire interferenze
        onClickWidget(e, id);
      }}
      draggable={false} // Assicurati che il Card non sia draggable
    >
      <Card.Img 
        style={{ 
          width: "220px", 
          height: "220px", 
          borderRadius: "20px",
          marginTop: "40px", 
          marginBottom: "20px", 
          pointerEvents: "none", // Ignora eventi per prevenire interferenze
        }} 
        variant="top" 
        src={img} 
      />
      <Card.Body>
        <Card.Title
          style={{color: "#FFFFFF", textAlign: "center"}}
        >{nome}</Card.Title>
      </Card.Body>
    </Card>
  );
}

export function CardEntrateLavori({ entrateLavori }) {
  const saloneState = useSelector((state) => state.saloneSliceReducer.value);
  const lingua = saloneState.lingua;
  return (
    <Card
      style={{
        display: 'inline-block',  // Cambiato da 'auto' a 'inline-block'
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        borderRadius: '50px',
        // padding: '10px',
        paddingLeft: "50px", 
        paddingRight: "50px",
        paddingBottom: "50px",
        overflowX: 'auto',
      }}
    >
      <Card.Body>
        <center>
          <Card.Title style={{ color: '#FFFFFF' }}>{lingua === "italiano" ? "Entrate lavori" : "Revenue jobs"}</Card.Title>
        </center>
      </Card.Body>
      <center>
        <Table
          striped
          bordered
          hover
          variant='dark'
          style={{
            borderRadius: '50px',
            marginTop: '0',
            marginBottom: '10px',
            textAlign: 'center',
          }}
        >
          <thead>
            <tr>
              <th style={{color: "#FFFFFF"}}>{lingua === "italiano" ? "ANNO" : "YEAR"}</th>
              <th style={{color: "#FFFFFF"}}>{lingua === "italiano" ? "GEN" : "JAN"}</th>
              <th style={{color: "#FFFFFF"}}>FEB</th>
              <th style={{color: "#FFFFFF"}}>MAR</th>
              <th style={{color: "#FFFFFF"}}>APR</th>
              <th style={{color: "#FFFFFF"}}>{lingua === "italiano" ? "MAG" : "MAY"}</th>
              <th style={{color: "#FFFFFF"}}>{lingua === "italiano" ? "GIU" : "JUN"}</th>
              <th style={{color: "#FFFFFF"}}>{lingua === "italiano" ? "LUG" : "JUL"}</th>
              <th style={{color: "#FFFFFF"}}>{lingua === "italiano" ? "AGO" : "AUG"}</th>
              <th style={{color: "#FFFFFF"}}>{lingua === "italiano" ? "SET" : "SEP"}</th>
              <th style={{color: "#FFFFFF"}}>{lingua === "italiano" ? "OTT" : "OCT"}</th>
              <th style={{color: "#FFFFFF"}}>NOV</th>
              <th style={{color: "#FFFFFF"}}>{lingua === "italiano" ? "DIC" : "DEC"}</th>
              <th style={{color: "#FFFFFF"}}>{lingua === "italiano" ? "TOT ENTRATE" : "TOT REVENUE"}</th>
            </tr>
          </thead>
          <tbody>
            {entrateLavori.map((lavoro, i) => (
              (i > 1) && (
                <tr key={i}>
                  {Object.values(lavoro).map((value, j) => (
                    <td 
                      style={{
                        color: getColor(value, j, "entrata"),
                        fontWeight: (j === 0) ? "bold" : null,
                      }} 
                      key={j}
                    >
                      {(j > 0) ? parseFloat(value).toFixed(2) + " €" : value}
                    </td>
                  ))}
                </tr>
              )
            ))}
          </tbody>
          <tbody>
            <tr>
              {Object.values(entrateLavori[0]).map((value, j) => (
                <td
                  style={{
                    color: getColor(value, j, "entrata"),
                    fontWeight: (j === 0) ? "bold" : null,
                  }}  
                  key={j}
                >
                  {(j > 0) ? parseFloat(value).toFixed(2) + " €" : value}
                </td>
              ))}
            </tr>
          </tbody>
        </Table>
      </center>
    </Card>
  );
}

const getTotaleEntrateAnno = (entrata) => {
  return (
      entrata.totale_gennaio   + entrata.totale_febbraio + entrata.totale_marzo    + entrata.totale_aprile 
    + entrata.totale_maggio    + entrata.totale_giugno   + entrata.totale_luglio   + entrata.totale_agosto 
    + entrata.totale_settembre + entrata.totale_ottobre  + entrata.totale_novembre + entrata.totale_dicembre
  ); 
}

const getQuantitaEntrateAnno = (entrata) => {
  return (
      parseInt(entrata.quantita_gennaio) + parseInt(entrata.quantita_febbraio) + parseInt(entrata.quantita_marzo) 
    + parseInt(entrata.quantita_aprile)  + parseInt(entrata.quantita_maggio)   + parseInt(entrata.quantita_giugno) 
    + parseInt(entrata.quantita_luglio)  + parseInt(entrata.quantita_agosto)   + parseInt(entrata.quantita_settembre) 
    + parseInt(entrata.quantita_ottobre)  + parseInt(entrata.quantita_novembre)   + parseInt(entrata.quantita_dicembre) 
  ); 
}

export function CardEntrateServizi({ entrateServizi }) {
  const saloneState = useSelector((state) => state.saloneSliceReducer.value);
  const lingua = saloneState.lingua;
  const [annoTmp, setAnnoTmp] = useState(0);
  return (
    <Card
      style={{
        display: 'inline-block',  // Cambiato da 'auto' a 'inline-block'
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        borderRadius: '50px',
        // padding: '10px',
        paddingLeft: "50px", 
        paddingRight: "50px",
        paddingBottom: "50px",
        overflowX: 'auto',
      }}
    >
      <Card.Body>
        <center>
          <Card.Title style={{ color: '#FFFFFF' }}>{lingua === "italiano" ? "Entrate servizi" : "Revenue services"}</Card.Title>
        </center>
      </Card.Body>
      <center>
        <Table
          striped
          bordered
          hover
          variant='dark'
          style={{
            borderRadius: '50px',
            marginTop: '0',
            marginBottom: '10px',
            textAlign: 'center',
          }}
        >
          <thead></thead>
          <tbody>
            {entrateServizi.map((entrata, i) => (
              <React.Fragment key={i}>
                {(i === 0 || entrateServizi[i].anno !== entrateServizi[i-1].anno) && (
                  <>
                    <tr><th colSpan={14}>{lingua==="italiano" ? "ANNO" : "YEAR"} = {entrata.anno}</th></tr>
                    <tr>
                      <th style={{color: "#FFFFFF"}}>{lingua === "italiano" ? "SERVIZIO" : "SERVICE"}</th>
                      <th style={{color: "#FFFFFF"}}>{lingua === "italiano" ? "GEN" : "JAN"}</th>
                      <th style={{color: "#FFFFFF"}}>FEB</th>
                      <th style={{color: "#FFFFFF"}}>MAR</th>
                      <th style={{color: "#FFFFFF"}}>APR</th>
                      <th style={{color: "#FFFFFF"}}>{lingua === "italiano" ? "MAG" : "MAY"}</th>
                      <th style={{color: "#FFFFFF"}}>{lingua === "italiano" ? "GIU" : "JUN"}</th>
                      <th style={{color: "#FFFFFF"}}>{lingua === "italiano" ? "LUG" : "JUL"}</th>
                      <th style={{color: "#FFFFFF"}}>{lingua === "italiano" ? "AGO" : "AUG"}</th>
                      <th style={{color: "#FFFFFF"}}>{lingua === "italiano" ? "SET" : "SEP"}</th>
                      <th style={{color: "#FFFFFF"}}>{lingua === "italiano" ? "OTT" : "OCT"}</th>
                      <th style={{color: "#FFFFFF"}}>NOV</th>
                      <th style={{color: "#FFFFFF"}}>{lingua === "italiano" ? "DIC" : "DEC"}</th>
                      <th style={{color: "#FFFFFF"}}>{lingua === "italiano" ? "TOT ENTRATE" : "TOT REVENUE"}</th>
                    </tr>
                  </>
                )}
                <tr>                
                  <td style={{ color: "#FFFFFF", fontWeight: "bold", }}>
                    {entrata.servizio}
                  </td>
                  <td style={{ color: getColor(entrata.totale_gennaio, 1, "entrata"), fontWeight: "bold", }}>
                    x {entrata.quantita_gennaio} = {parseFloat(entrata.totale_gennaio).toFixed(2) + " €"}
                  </td>
                  <td style={{ color: getColor(entrata.totale_febbraio, 1, "entrata"), fontWeight: "bold", }}>
                    x {entrata.quantita_febbraio} = {parseFloat(entrata.totale_febbraio).toFixed(2) + " €"}
                  </td>
                  <td style={{ color: getColor(entrata.totale_marzo, 1, "entrata"), fontWeight: "bold", }}>
                    x {entrata.quantita_marzo} = {parseFloat(entrata.totale_marzo).toFixed(2) + " €"}
                  </td>
                  <td style={{ color: getColor(entrata.totale_aprile, 1, "entrata"), fontWeight: "bold", }}>
                    x {entrata.quantita_aprile} = {parseFloat(entrata.totale_aprile).toFixed(2) + " €"}
                  </td>
                  <td style={{ color: getColor(entrata.totale_maggio, 1, "entrata"), fontWeight: "bold", }}>
                    x {entrata.quantita_maggio} = {parseFloat(entrata.totale_maggio).toFixed(2) + " €"}
                  </td>
                  <td style={{ color: getColor(entrata.totale_giugno, 1, "entrata"), fontWeight: "bold", }}>
                    x {entrata.quantita_giugno} = {parseFloat(entrata.totale_giugno).toFixed(2) + " €"}
                  </td>
                  <td style={{ color: getColor(entrata.totale_luglio, 1, "entrata"), fontWeight: "bold", }}>
                    x {entrata.quantita_luglio} = {parseFloat(entrata.totale_luglio).toFixed(2) + " €"}
                  </td>
                  <td style={{ color: getColor(entrata.totale_agosto, 1, "entrata"), fontWeight: "bold", }}>
                    x {entrata.quantita_agosto} = {parseFloat(entrata.totale_agosto).toFixed(2) + " €"}
                  </td>
                  <td style={{ color: getColor(entrata.totale_settembre, 1, "entrata"), fontWeight: "bold", }}>
                    x {entrata.quantita_settembre} = {parseFloat(entrata.totale_settembre).toFixed(2) + " €"}
                  </td>
                  <td style={{ color: getColor(entrata.totale_ottobre, 1, "entrata"), fontWeight: "bold", }}>
                    x {entrata.quantita_ottobre} = {parseFloat(entrata.totale_ottobre).toFixed(2) + " €"}
                  </td>
                  <td style={{ color: getColor(entrata.totale_novembre, 1, "entrata"), fontWeight: "bold", }}>
                    x {entrata.quantita_novembre} = {parseFloat(entrata.totale_novembre).toFixed(2) + " €"}
                  </td>
                  <td style={{ color: getColor(entrata.totale_dicembre, 1, "entrata"), fontWeight: "bold", }}>
                    x {entrata.quantita_dicembre} = {parseFloat(entrata.totale_dicembre).toFixed(2) + " €"}
                  </td>
                  <td style={{ color: getColor(getTotaleEntrateAnno(entrata), 1, "entrata"), fontWeight: "bold", }}>
                    x {getQuantitaEntrateAnno(entrata)} = {parseFloat(getTotaleEntrateAnno(entrata)).toFixed(2) + " €"}
                  </td>
                </tr>
              </React.Fragment>
            ))}
          </tbody>
        </Table>
      </center>
    </Card>
  );
}

export function CardUsciteSpese({ usciteSpese }) {
  const saloneState = useSelector((state) => state.saloneSliceReducer.value);
  const lingua = saloneState.lingua;
  return (
    <Card
      style={{
        display: 'inline-block',  // Cambiato da 'auto' a 'inline-block'
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        borderRadius: '50px',
        // padding: '10px',
        paddingLeft: "50px", 
        paddingRight: "50px",
        paddingBottom: "50px",
        overflowX: 'auto',
      }}
    >
      <Card.Body>
        <center>
          <Card.Title style={{ color: '#FFFFFF' }}>{lingua === "italiano" ? "Uscite spese" : "Exit expenses"}</Card.Title>
        </center>
      </Card.Body>
      <center>
        <Table
          striped
          bordered
          hover
          variant='dark'
          style={{
            borderRadius: '50px',
            marginTop: '0',
            marginBottom: '10px',
            textAlign: 'center',
          }}
        >
          <thead>
            <tr>
              <th style={{color: "#FFFFFF"}}>{lingua === "italiano" ? "ANNO" : "YEAR"}</th>
              <th style={{color: "#FFFFFF"}}>{lingua === "italiano" ? "GEN" : "JAN"}</th>
              <th style={{color: "#FFFFFF"}}>FEB</th>
              <th style={{color: "#FFFFFF"}}>MAR</th>
              <th style={{color: "#FFFFFF"}}>APR</th>
              <th style={{color: "#FFFFFF"}}>{lingua === "italiano" ? "MAG" : "MAY"}</th>
              <th style={{color: "#FFFFFF"}}>{lingua === "italiano" ? "GIU" : "JUN"}</th>
              <th style={{color: "#FFFFFF"}}>{lingua === "italiano" ? "LUG" : "JUL"}</th>
              <th style={{color: "#FFFFFF"}}>{lingua === "italiano" ? "AGO" : "AUG"}</th>
              <th style={{color: "#FFFFFF"}}>{lingua === "italiano" ? "SET" : "SEP"}</th>
              <th style={{color: "#FFFFFF"}}>{lingua === "italiano" ? "OTT" : "OCT"}</th>
              <th style={{color: "#FFFFFF"}}>NOV</th>
              <th style={{color: "#FFFFFF"}}>{lingua === "italiano" ? "DIC" : "DEC"}</th>
              <th style={{color: "#FFFFFF"}}>{lingua === "italiano" ? "TOT USCITE" : "TOT EXIT"}</th>
            </tr>
          </thead>
          <tbody>
            {usciteSpese.map((spesa, i) => (
              (i > 1) && (
                <tr key={i}>
                  {Object.values(spesa).map((value, j) => (
                    <td
                      style={{
                        color: getColor(-value, j, "uscita"),
                        fontWeight: (j === 0) ? "bold" : null,
                      }}  
                      key={j}
                    >
                      {(j > 0) ? parseFloat(-value).toFixed(2) + " €" : value}
                    </td>
                  ))}
                </tr>
              )
            ))}
          </tbody>
          <tbody>
            <tr>
              {Object.values(usciteSpese[0]).map((value, j) => (
                <td
                  style={{
                    color: getColor(-value, j, "uscita"),
                    fontWeight: (j === 0) ? "bold" : null,
                  }}  
                  key={j}
                >
                  {(j > 0) ? parseFloat(-value).toFixed(2) + " €" : value}
                </td>
              ))}
            </tr>
          </tbody>
        </Table>
      </center>
    </Card>
  );
}

export function CardRicavi({ entrateLavori, usciteSpese }) {
  const saloneState = useSelector((state) => state.saloneSliceReducer.value);
  const lingua = saloneState.lingua;
  return (
    <Card
      style={{
        display: 'inline-block',  // Cambiato da 'auto' a 'inline-block'
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        borderRadius: '50px',
        // padding: '10px',
        paddingLeft: "50px", 
        paddingRight: "50px",
        paddingBottom: "50px",
        overflowX: 'auto',
      }}
    >
      <Card.Body>
        <center>
          <Card.Title style={{ color: '#FFFFFF' }}>{lingua === "italiano" ? "Ricavi" : "Revenues"}</Card.Title>
        </center>
      </Card.Body>
      <center>
        <Table
          striped
          bordered
          hover
          variant='dark'
          style={{
            borderRadius: '50px',
            marginTop: '0',
            marginBottom: '10px',
            textAlign: 'center',
          }}
        >
          <thead>
            <tr>
              <th style={{color: "#FFFFFF"}}>{lingua === "italiano" ? "ANNO" : "YEAR"}</th>
              <th style={{color: "#FFFFFF"}}>{lingua === "italiano" ? "GEN" : "JAN"}</th>
              <th style={{color: "#FFFFFF"}}>FEB</th>
              <th style={{color: "#FFFFFF"}}>MAR</th>
              <th style={{color: "#FFFFFF"}}>APR</th>
              <th style={{color: "#FFFFFF"}}>{lingua === "italiano" ? "MAG" : "MAY"}</th>
              <th style={{color: "#FFFFFF"}}>{lingua === "italiano" ? "GIU" : "JUN"}</th>
              <th style={{color: "#FFFFFF"}}>{lingua === "italiano" ? "LUG" : "JUL"}</th>
              <th style={{color: "#FFFFFF"}}>{lingua === "italiano" ? "AGO" : "AUG"}</th>
              <th style={{color: "#FFFFFF"}}>{lingua === "italiano" ? "SET" : "SEP"}</th>
              <th style={{color: "#FFFFFF"}}>{lingua === "italiano" ? "OTT" : "OCT"}</th>
              <th style={{color: "#FFFFFF"}}>NOV</th>
              <th style={{color: "#FFFFFF"}}>{lingua === "italiano" ? "DIC" : "DEC"}</th>
              <th style={{color: "#FFFFFF"}}>{lingua === "italiano" ? "TOT RICAVI" : "TOT EARNINGS"}</th>
            </tr>
          </thead>
          <tbody>
            {entrateLavori.map((entrata, i) => (
              i > 1 && (
                <tr key={i}>
                  <td                  
                    style={{
                      fontWeight: "bold",
                    }} 
                  >{entrata.Anno}</td>
                  {usciteSpese[i] && (
                    <>
                  <td style={{color:getColor(entrata.gen - usciteSpese[i].gen)}}>{parseFloat(entrata.gen - usciteSpese[i].gen).toFixed(2)} €</td>
                  <td style={{color:getColor(entrata.feb - usciteSpese[i].feb)}}>{parseFloat(entrata.feb - usciteSpese[i].feb).toFixed(2)} €</td>
                  <td style={{color:getColor(entrata.mar - usciteSpese[i].mar)}}>{parseFloat(entrata.mar - usciteSpese[i].mar).toFixed(2)} €</td>
                  <td style={{color:getColor(entrata.apr - usciteSpese[i].apr)}}>{parseFloat(entrata.apr - usciteSpese[i].apr).toFixed(2)} €</td>
                  <td style={{color:getColor(entrata.mag - usciteSpese[i].mag)}}>{parseFloat(entrata.mag - usciteSpese[i].mag).toFixed(2)} €</td>
                  <td style={{color:getColor(entrata.giu - usciteSpese[i].giu)}}>{parseFloat(entrata.giu - usciteSpese[i].giu).toFixed(2)} €</td>
                  <td style={{color:getColor(entrata.lug - usciteSpese[i].lug)}}>{parseFloat(entrata.lug - usciteSpese[i].lug).toFixed(2)} €</td>
                  <td style={{color:getColor(entrata.ago - usciteSpese[i].ago)}}>{parseFloat(entrata.ago - usciteSpese[i].ago).toFixed(2)} €</td>
                  <td style={{color:getColor(entrata.set - usciteSpese[i].set)}}>{parseFloat(entrata.set - usciteSpese[i].set).toFixed(2)} €</td>
                  <td style={{color:getColor(entrata.ott - usciteSpese[i].ott)}}>{parseFloat(entrata.ott - usciteSpese[i].ott).toFixed(2)} €</td>
                  <td style={{color:getColor(entrata.nov - usciteSpese[i].nov)}}>{parseFloat(entrata.nov - usciteSpese[i].nov).toFixed(2)} €</td>
                  <td style={{color:getColor(entrata.dic - usciteSpese[i].dic)}}>{parseFloat(entrata.dic - usciteSpese[i].dic).toFixed(2)} €</td>
                  <td style={{color:getColor(entrata.totale_anno - usciteSpese[i].totale_anno)}}>{parseFloat(entrata.totale_anno - usciteSpese[i].totale_anno).toFixed(2)} €</td>
                </>
                )}
                </tr>
              )
            ))}
            <tr key={0}>
              <td
                style={{
                  fontWeight: "bold",
                }} 
              >{entrateLavori[0].Anno}</td>
              <td style={{color:getColor(entrateLavori[0].gen - usciteSpese[0].gen, 1)}}>{parseFloat(entrateLavori[0].gen - usciteSpese[0].gen).toFixed(2)} €</td>
              <td style={{color:getColor(entrateLavori[0].feb - usciteSpese[0].feb)}}>{parseFloat(entrateLavori[0].feb - usciteSpese[0].feb).toFixed(2)} €</td>
              <td style={{color:getColor(entrateLavori[0].mar - usciteSpese[0].mar)}}>{parseFloat(entrateLavori[0].mar - usciteSpese[0].mar).toFixed(2)} €</td>
              <td style={{color:getColor(entrateLavori[0].apr - usciteSpese[0].apr)}}>{parseFloat(entrateLavori[0].apr - usciteSpese[0].apr).toFixed(2)} €</td>
              <td style={{color:getColor(entrateLavori[0].mag - usciteSpese[0].mag)}}>{parseFloat(entrateLavori[0].mag - usciteSpese[0].mag).toFixed(2)} €</td>
              <td style={{color:getColor(entrateLavori[0].giu - usciteSpese[0].giu)}}>{parseFloat(entrateLavori[0].giu - usciteSpese[0].giu).toFixed(2)} €</td>
              <td style={{color:getColor(entrateLavori[0].lug - usciteSpese[0].lug)}}>{parseFloat(entrateLavori[0].lug - usciteSpese[0].lug).toFixed(2)} €</td>
              <td style={{color:getColor(entrateLavori[0].ago - usciteSpese[0].ago)}}>{parseFloat(entrateLavori[0].ago - usciteSpese[0].ago).toFixed(2)} €</td>
              <td style={{color:getColor(entrateLavori[0].set - usciteSpese[0].set)}}>{parseFloat(entrateLavori[0].set - usciteSpese[0].set).toFixed(2)} €</td>
              <td style={{color:getColor(entrateLavori[0].ott - usciteSpese[0].ott)}}>{parseFloat(entrateLavori[0].ott - usciteSpese[0].ott).toFixed(2)} €</td>
              <td style={{color:getColor(entrateLavori[0].nov - usciteSpese[0].nov)}}>{parseFloat(entrateLavori[0].nov - usciteSpese[0].nov).toFixed(2)} €</td>
              <td style={{color:getColor(entrateLavori[0].dic - usciteSpese[0].dic)}}>{parseFloat(entrateLavori[0].dic - usciteSpese[0].dic).toFixed(2)} €</td>
              <td style={{color:getColor(entrateLavori[0].totale_anno - usciteSpese[0].totale_anno)}}>{parseFloat(entrateLavori[0].totale_anno - usciteSpese[0].totale_anno).toFixed(2)} €</td>
            </tr>
          </tbody>
        </Table>
      </center>
    </Card>
  );
}

export function CardInformazioni({ totaleItems }) {
  return (
    <StyledCard>
      <StyledCardHeader>Informations</StyledCardHeader>
      <SlideContainer>
        {totaleItems && (
          <StyledInputBlock 
            rows={1} 
            name="totale_items" 
            id="totale_items" 
            type="text" 
            value={totaleItems ? totaleItems : "Errore!!"} 
            readOnly 
          />
        )}
      </SlideContainer>
    </StyledCard>
  );
}

export function CardEntrateUscite({datiRicerca, setDatiRicerca, handleInputChange, eseguiRicerca}) {
  const saloneState = useSelector((state) => state.saloneSliceReducer.value);
  const lingua = saloneState.lingua;
  let maxHeight = "2000px";
  return (
    <StyledCard>
      <StyledCardHeader>{lingua === "italiano" ? "Ricerca entrate e uscite" : "Searching for inputs and outputs"}</StyledCardHeader>
      <SlideContainer style={{maxHeight: `${maxHeight}`}}>
        <StyledInputModifica
          rows={1}
          name="primo_anno"
          id="primo_anno"
          type="number"
          step={1}
          value={datiRicerca.primo_anno}
          placeholder="Primo anno"
          onChange={(e) => handleInputChange(e, setDatiRicerca)}
          onContextMenu={(e) => handleRightClick(e, "Primo anno")}
        />
        <StyledSelectModifica 
          name="ultimo_anno" 
          id="ultimo_anno"
          value={datiRicerca.ultimo_anno}
          onChange={(e) => handleInputChange(e, setDatiRicerca)}
          onContextMenu={(e) => handleRightClick(e, "Ultimo anno")}
        >
          <option value={parseInt(datiRicerca.primo_anno)+1}>{parseInt(datiRicerca.primo_anno)+1}</option>
          <option value={parseInt(datiRicerca.primo_anno)+2}>{parseInt(datiRicerca.primo_anno)+2}</option>
          <option value={parseInt(datiRicerca.primo_anno)+3}>{parseInt(datiRicerca.primo_anno)+3}</option>
          <option value={parseInt(datiRicerca.primo_anno)+4}>{parseInt(datiRicerca.primo_anno)+4}</option>
          <option value={parseInt(datiRicerca.primo_anno)+5}>{parseInt(datiRicerca.primo_anno)+5}</option>
        </StyledSelectModifica>
      </SlideContainer>
      <OperazioniRicercaEntrateUscite 
        eseguiRicerca={(e) => eseguiRicerca(e)}  
      />
    </StyledCard>
  )
}








