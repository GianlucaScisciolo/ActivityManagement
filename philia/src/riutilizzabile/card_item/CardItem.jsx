import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Card, Table } from 'react-bootstrap';
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
import { faFilePdf, faFileExcel } from '@fortawesome/free-solid-svg-icons';
import { Trash2, Pencil } from 'lucide-react';
import { handleInputChange } from '../../vario/Vario';

function getColor(value, j, tipo){
  // (i > 0) ? (
  //                       value < 0 ? "#FF0000" : (value > 0 ? "#00FF00" : "#FFFFFF")) : "#0000FF"
  return (j === 0) ? ("#FFFFFF") : (
    (value < 0) ? "#FF0000" : (value > 0 ? "#00FF00" : "#FFFFFF")
  )
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
    <StyledListGroupItem style={{border: "5px solid #000000", backgroundColor:"#000000", paddingTop: "3%"}}>
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
    <StyledListGroupItem style={{ border: "5px solid #000000", backgroundColor: "#000000", paddingTop: "3%" }}>
      <StyledSearchNotSelected 
        className="ricercaItemsButton" 
        size={grandezzaIcona} 
        style={{ marginRight: "50%" }} 
        onClick={handleSearch} 
      />
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
    </StyledListGroupItem>
  );
};

export function OperazioniItemEsistente ({ selectOperation, item }) {
  let TrashTag = getTrashTag(item.tipo_selezione);
  let PencilTag = getPencilTag(item.tipo_selezione);

  return (
    <StyledListGroupItem style={{ border: "5px solid #000000", backgroundColor: "#000000", paddingTop: "3%" }}>
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
    <StyledListGroupItem style={{ border: "5px solid #000000", backgroundColor: "#000000", paddingTop: "3%", paddingBottom: "3%" }}>
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
  
  return (
    <center>
      <StyledCard>
        <StyledCardHeader>{campi["header"]}</StyledCardHeader>
        <SlideContainer style={{maxHeight: `${maxHeight}`}}>
          {indici.map((i) => {
            // onClick={handleGiornoClick(setUltimoGiornoType)}
            // onBlur={handleGiornoBlur(setUltimoGiornoType, item, setItem)}
            // onChange={(e) => handleInputChange(e, setItem)}
            const NomeTag = (campi.type[i]) ? getInputTag(1, true) : (
              getTextAreaTag(1, true)
            );
            return ( 
              <React.Fragment key={i}>
                <StyledRow>
                  <NomeTag 
                    style={(["prezzo", "totale"].includes(campi.name[i])) ? {maxWidth:"80%"} : null}
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
                  {(["prezzo", "totale"].includes(campi.name[i])) && (
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

  return (
    <center>
      <StyledCard>
        <StyledCardHeader>{campi["header"]}</StyledCardHeader>
        <SlideContainer style={{maxHeight: `${maxHeight}`}}>
          {indici.map((i) => {
            // onClick={handleGiornoClick(setUltimoGiornoType)}
            // onBlur={handleGiornoBlur(setUltimoGiornoType, item, setItem)}
            // onChange={(e) => handleInputChange(e, setItem)}
            const NomeTag = (campi.type[i]) ? getInputTag(1, true) : (
              getTextAreaTag(1, true)
            );
            return ( 
              <React.Fragment key={i}>
                <StyledRow>
                  <NomeTag 
                    style={(["prezzo_min", "prezzo_max", "totale_min", "totale_max"].includes(campi.name[i])) ? {maxWidth:"80%"} : null}
                    rows={1}
                    name={campi.name[i]}
                    id={campi.id[i]}
                    type={campi.value[i]}
                    value={campi.value[i]}
                    placeholder={campi.placeholder[i]}
                    onChange={campi.onChange}
                    onClick={campi.onClick}
                    onBlur={campi.onBlur}
                  />
                  {(["prezzo_min", "prezzo_max", "totale_min", "totale_max"].includes(campi.name[i])) && (
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
      </StyledCard>
    </center>
  );
}

export function CardItemEsistente({ item, campi, indici, selectOperation, items, setItems, tipoItem, onChange }) {
  const inputRef = useRef(null);

  return (
    <>
      <StyledCard>
        <StyledCardHeader>{campi["header"]}</StyledCardHeader>
        <SlideContainer>
          {indici.map((i) => {
            const NomeTag = campi.type[i] ? getInputTag(campi.tipoSelezione, campi.valoreModificabile[i]) : getTextAreaTag(campi.tipoSelezione, campi.valoreModificabile[i]);
            return (
              <React.Fragment key={i}>
                <StyledRow>
                  <NomeTag 
                    ref={inputRef} // Add the ref here
                    rows={1}
                    style={(campi.name[i] === "totale") ? { maxWidth: "80%" } : null}
                    name={campi.name[i]}
                    id={campi.id[i]}
                    type={campi.type[i]}
                    value={campi.value[i]}
                    placeholder={campi.placeholder[i]}
                    onChange={onChange}
                    readOnly={item.tipo_selezione !== 1}
                    onClick={null}
                    onBlur={campi.onBlur}
                  />
                  {(campi.name[i] === "totale") && (
                    <StyledEuroNotSelected
                      style={{ maxWidth: "20%", marginLeft: "-6px", marginTop: "13px" }}
                      size={grandezzaIcona}
                      onClick={null}
                    />
                  )}
                  {campi.options[i]}
                </StyledRow>
              </React.Fragment>
            );
          })}
        </SlideContainer>
        <OperazioniItemEsistente 
          selectOperation={selectOperation} 
          item={item}
        />
      </StyledCard>
    </>
  );
}

export function CardFileItems({campi, indici, ottieniFileRangePDF, ottieniFileRangeExcel, eliminaItemsRange}) {
  let maxHeight = "2000px";
  
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
        // backgroundColor: (isSelected === true) ? "#0050EF" : "rgba(0, 0, 0, 0.5)",
        backgroundColor: backgroundColor, 
        borderRadius: "50px", 
      }}
      onClick={(e) => onClickWidget(e, id)}
    >
      <center>
        <Card.Img 
          style={{ 
            width: "220px", 
            height: "220px", 
            borderRadius: "20px",
            marginTop: "50px",
            marginBottom: "10px", 
          }} 
          variant="top" 
          src={img} 
        />
      </center>
      <Card.Body>
        <center>
          <Card.Title
            style={{color:"#FFFFFF"}}
          >{nome}</Card.Title>
        </center>
      </Card.Body>
    </Card>
  );
}

export function CardEntrateLavori({ entrateLavori }) {
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
          <Card.Title style={{ color: '#FFFFFF' }}>Entrate lavori</Card.Title>
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
              <th style={{color: "#FFFFFF"}}>ANNO</th>
              <th style={{color: "#FFFFFF"}}>GEN</th>
              <th style={{color: "#FFFFFF"}}>FEB</th>
              <th style={{color: "#FFFFFF"}}>MAR</th>
              <th style={{color: "#FFFFFF"}}>APR</th>
              <th style={{color: "#FFFFFF"}}>MAG</th>
              <th style={{color: "#FFFFFF"}}>GIU</th>
              <th style={{color: "#FFFFFF"}}>LUG</th>
              <th style={{color: "#FFFFFF"}}>AGO</th>
              <th style={{color: "#FFFFFF"}}>SET</th>
              <th style={{color: "#FFFFFF"}}>OTT</th>
              <th style={{color: "#FFFFFF"}}>NOV</th>
              <th style={{color: "#FFFFFF"}}>DIC</th>
              <th style={{color: "#FFFFFF"}}>TOT ENTRATE</th>
            </tr>
          </thead>
          <tbody>
            {entrateLavori.map((lavoro, i) => (
              (i > 0) && (
                <tr key={i}>
                  {Object.values(lavoro).map((value, j) => (
                    <td 
                      style={{
                        color: getColor(value, j, "entrata"),
                        fontWeight: (j === 0) ? "bold" : null,
                      }} 
                      key={j}
                    >{parseFloat(value).toFixed(2)} {j > 0 ? "€" : ""}</td>
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
                >{parseFloat(value).toFixed(2)} {j > 0 ? "€" : ""}</td>
              ))}
            </tr>
          </tbody>
        </Table>
      </center>
    </Card>
  );
}

export function CardUsciteSpese({ usciteSpese }) {
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
          <Card.Title style={{ color: '#FFFFFF' }}>Uscite spese</Card.Title>
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
              <th style={{color: "#FFFFFF"}}>ANNO</th>
              <th style={{color: "#FFFFFF"}}>GEN</th>
              <th style={{color: "#FFFFFF"}}>FEB</th>
              <th style={{color: "#FFFFFF"}}>MAR</th>
              <th style={{color: "#FFFFFF"}}>APR</th>
              <th style={{color: "#FFFFFF"}}>MAG</th>
              <th style={{color: "#FFFFFF"}}>GIU</th>
              <th style={{color: "#FFFFFF"}}>LUG</th>
              <th style={{color: "#FFFFFF"}}>AGO</th>
              <th style={{color: "#FFFFFF"}}>SET</th>
              <th style={{color: "#FFFFFF"}}>OTT</th>
              <th style={{color: "#FFFFFF"}}>NOV</th>
              <th style={{color: "#FFFFFF"}}>DIC</th>
              <th style={{color: "#FFFFFF"}}>TOT ENTRATE</th>
            </tr>
          </thead>
          <tbody>
            {usciteSpese.map((spesa, i) => (
              (i > 0) && (
                <tr key={i}>
                  {Object.values(spesa).map((value, j) => (
                    <td
                      style={{
                        color: getColor(-value, j, "uscita"),
                        fontWeight: (j === 0) ? "bold" : null,
                      }}  
                      key={j}
                    >{parseFloat(-value).toFixed(2)} {j > 0 ? "€" : ""}</td>
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
                >{parseFloat(-value).toFixed(2)} {j > 0 ? "€" : ""}</td>
              ))}
            </tr>
          </tbody>
        </Table>
      </center>
    </Card>
  );
}

export function CardRicavi({ entrateLavori, usciteSpese }) {
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
          <Card.Title style={{ color: '#FFFFFF' }}>Ricavi</Card.Title>
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
              <th style={{color: "#FFFFFF"}}>ANNO</th>
              <th style={{color: "#FFFFFF"}}>GEN</th>
              <th style={{color: "#FFFFFF"}}>FEB</th>
              <th style={{color: "#FFFFFF"}}>MAR</th>
              <th style={{color: "#FFFFFF"}}>APR</th>
              <th style={{color: "#FFFFFF"}}>MAG</th>
              <th style={{color: "#FFFFFF"}}>GIU</th>
              <th style={{color: "#FFFFFF"}}>LUG</th>
              <th style={{color: "#FFFFFF"}}>AGO</th>
              <th style={{color: "#FFFFFF"}}>SET</th>
              <th style={{color: "#FFFFFF"}}>OTT</th>
              <th style={{color: "#FFFFFF"}}>NOV</th>
              <th style={{color: "#FFFFFF"}}>DIC</th>
              <th style={{color: "#FFFFFF"}}>TOT ENTRATE</th>
            </tr>
          </thead>
          <tbody>
            {entrateLavori.map((entrata, i) => (
              i > 0 && (
                <tr key={i}>
                  <td                  
                    style={{
                      fontWeight: "bold",
                    }} 
                  >{entrata.Anno}</td>
                  <td style={{color:getColor(entrata.gen - usciteSpese[i].gen, 1)}}>{parseFloat(entrata.gen - usciteSpese[i].gen).toFixed(2)} €</td>
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
