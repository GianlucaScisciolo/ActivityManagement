// React
import Row from "react-bootstrap/esm/Row";
import Col from "react-bootstrap/esm/Col";
// Riutilizzabile
import { getPencilTag, getTrashTag } from "./Tags";
// Icone
import { faFilePdf, faFileExcel, faFile } from '@fortawesome/free-solid-svg-icons';


export function OperazioniNuovoItem({eseguiSalvataggio, vistaItem, StyledComponents}) {
  return (
    (vistaItem === "card" || vistaItem === "form") ? ( 
      <StyledComponents.StyledListGroupItem style={{ border: "5px solid #000000", backgroundColor:"#000000", paddingTop: "2%", paddingBottom: "2%" }}>
        <StyledComponents.StyledRow>
          <StyledComponents.StyledCol>
            <StyledComponents.StyledSaveNotSelected 
              className="salvaItemButton" 
              size={StyledComponents.grandezzaIcona} 
              onClick={eseguiSalvataggio} 
            />
          </StyledComponents.StyledCol>
        </StyledComponents.StyledRow>
      </StyledComponents.StyledListGroupItem>
    ) : (
      <StyledComponents.StyledColOperazioni>
          <StyledComponents.StyledSaveNotSelected 
            className="center salvaItemButton" 
            size={StyledComponents.grandezzaIcona} 
            onClick={eseguiSalvataggio} 
          />
      </StyledComponents.StyledColOperazioni>
    )
  )
}

export function OperazioniCercaItems({ handleSearch, vistaItem, StyledComponents }) {
  return (
    (vistaItem === "card" || vistaItem === "form") ? (
      <StyledComponents.StyledListGroupItem style={{ border: "5px solid #000000", backgroundColor: "#000000", paddingTop: "2%", paddingBottom: "2%" }}>
        <StyledComponents.StyledSearchNotSelected 
          className="ricercaItemsButton" 
          size={StyledComponents.grandezzaIcona} 
          onClick={handleSearch} 
        />
      </StyledComponents.StyledListGroupItem>
    ) : (
      <StyledComponents.StyledColOperazioni>
        <div style={{width: "100%"}}>
          <StyledComponents.StyledSearchNotSelected 
            className="center ricercaItemsButton" 
            size={StyledComponents.grandezzaIcona} 
            onClick={handleSearch} 
          />
        </div>
      </StyledComponents.StyledColOperazioni>
    )
  );
};

export function OperazioniRicercaEntrateUscite({ eseguiRicerca, vistaItem, StyledComponents }) {
  return (
    (vistaItem === "card" || vistaItem === "form") ? (
      <StyledComponents.StyledListGroupItem style={{ border: "5px solid #000000", backgroundColor: "#000000", paddingTop: "2%", paddingBottom: "2%" }}>
        <StyledComponents.StyledSearchNotSelected 
          className="ricercaEntrateUsciteButton" 
          size={StyledComponents.grandezzaIcona} 
          onClick={eseguiRicerca} 
        />
      </StyledComponents.StyledListGroupItem>
    ) : (
      <StyledComponents.StyledColOperazioni>
        <div style={{width: "100%"}}>
          <StyledComponents.StyledSearchNotSelected 
            className="ricercaEntrateUsciteButton" 
            size={StyledComponents.grandezzaIcona} 
            onClick={eseguiRicerca} 
          />
        </div>
      </StyledComponents.StyledColOperazioni>
    )
  );
};

export function OperazioniLogin({ eseguiLogin, vistaItem, StyledComponents }) {
  return (
    (vistaItem === "card" || vistaItem === "form") ? (
      <StyledComponents.StyledListGroupItem style={{ border: "5px solid #000000", backgroundColor: "#000000", paddingTop: "3%", paddingBottom: "3%" }}>
        <StyledComponents.StyledLoginNotSelected 
          className="loginButton" 
          size={StyledComponents.grandezzaIcona} 
          onClick={eseguiLogin} 
        />
      </StyledComponents.StyledListGroupItem>
    ) : (
      <StyledComponents.StyledColOperazioni>
        <StyledComponents.StyledLoginNotSelected 
          className="center loginButton" 
          size={StyledComponents.grandezzaIcona} 
          onClick={eseguiLogin} 
        />
      </StyledComponents.StyledColOperazioni>
    )
  );
};

export function OperazioniModificaProfilo({ eseguiModificaProfilo, vistaItem, StyledComponents }) {
  let StyledPencilNotSelectedUsed = (vistaItem === "form") ? StyledComponents.StyledPencilNotSelected : StyledComponents.StyledPencilNotSelected2
  return (
    (vistaItem === "card" || vistaItem === "form") ? (
      <StyledComponents.StyledListGroupItem style={{ border: "5px solid #000000", backgroundColor: "#000000", paddingTop: "2%", paddingBottom: "2%" }}>
        <StyledPencilNotSelectedUsed
          className="modificaProfiloButton"
          size={StyledComponents.grandezzaIcona} 
          onClick={eseguiModificaProfilo} 
        />
      </StyledComponents.StyledListGroupItem>
    ) : (
      <StyledComponents.StyledColOperazioni>
        <StyledComponents.StyledPencilNotSelectedModificaProfilo 
          className="center modificaProfiloButton" 
          size={StyledComponents.grandezzaIcona} 
          onClick={eseguiModificaProfilo} 
        />
      </StyledComponents.StyledColOperazioni>
    )
  );
};

export function OperazioniFileItems({ ottieniFileRangePDF, ottieniFileRangeExcel, eliminaItemsRange, vistaItem, StyledComponents }) {
  return (
    (vistaItem === "card" || vistaItem === "form") ? (
      <StyledComponents.StyledListGroupItem style={{ border: "5px solid #000000", backgroundColor: "#000000", paddingTop: "3%" }}>
        <div>
          <StyledComponents.StyledFileIconNotSelected icon={faFilePdf} size="2xl" style={{ marginRight: "50%" }} />
          <StyledComponents.StyledFileIconNotSelected icon={faFileExcel} size="2xl" />
        </div>
        <br />
        <div>
          <StyledComponents.StyledDownloadNotSelected size={StyledComponents.grandezzaIcona} style={{ marginRight: "50%" }} onClick={ottieniFileRangePDF} />
          <StyledComponents.StyledDownloadNotSelected size={StyledComponents.grandezzaIcona} onClick={ottieniFileRangeExcel} />
        </div>
        <br />
        <div>
          <StyledComponents.StyledTrashNotSelected size={StyledComponents.grandezzaIcona} onClick={eliminaItemsRange} />
        </div>
        <br />
      </StyledComponents.StyledListGroupItem>
    ) : (
      <>
        <StyledComponents.StyledColOperazioni>
          <div style={{width: "100%"}}>
            <StyledComponents.StyledFileIconNotSelected icon={faFilePdf} className="left" style={{ marginRight: "50%" }} size="2xl" />
            <StyledComponents.StyledDownloadNotSelected size={StyledComponents.grandezzaIcona} className="rigth" onClick={ottieniFileRangePDF} />
          </div>
        </StyledComponents.StyledColOperazioni>
        <StyledComponents.StyledColOperazioni>
          <div style={{width: "100%"}}>
            <StyledComponents.StyledFileIconNotSelected icon={faFileExcel} className="left" style={{ marginRight: "50%" }} size="2xl" />
            <StyledComponents.StyledDownloadNotSelected size={StyledComponents.grandezzaIcona} className="rigth" onClick={ottieniFileRangeExcel} />
          </div>
        </StyledComponents.StyledColOperazioni>
        <StyledComponents.StyledColOperazioni>
          <div style={{width: "100%"}}>
            <StyledComponents.StyledTrashNotSelected2 size={StyledComponents.grandezzaIcona} className="center" onClick={eliminaItemsRange} />
          </div>
        </StyledComponents.StyledColOperazioni>
      </>
    )
  );
};

export function OperazioniItemEsistente ({ selectOperation, item, vistaItem, StyledComponents }) {
  let TrashTag = getTrashTag(item.tipo_selezione, StyledComponents);
  let PencilTag = getPencilTag(item.tipo_selezione, StyledComponents);

  return (
    (vistaItem === "card" || vistaItem === "form") ? (
      <StyledComponents.StyledListGroupItem style={{ border: "5px solid #000000", backgroundColor: "#000000" }}>
        <PencilTag 
          className="modificaItemButton" 
          size={StyledComponents.grandezzaIcona} 
          onClick={() => selectOperation("pencil", item)} 
          style={{ marginRight: "50%" }} 
        />
        <TrashTag 
          className="eliminaItemButton" 
          size={StyledComponents.grandezzaIcona} 
          onClick={() => selectOperation("trash", item)} 
        />
      </StyledComponents.StyledListGroupItem>
    ) : (
      <StyledComponents.StyledColOperazioni>
        <div style={{width: "100%"}}>
          <PencilTag 
            className="left modificaItemButton"
            size={StyledComponents.grandezzaIcona} 
            onClick={() => selectOperation("pencil", item)} 
            style={{ marginRight: "50%" }} 
          />
          <TrashTag 
            className="rigth eliminaItemButton" 
            size={StyledComponents.grandezzaIcona} 
            onClick={() => selectOperation("trash", item)} 
          />
        </div>
      </StyledComponents.StyledColOperazioni> 
    )
  )
}

export const OperazioniItems = ({selectedIdsModifica, selectedIdsEliminazione, handleEdit, handleDelete}) => {
  return (
    <>
      <div className='contenitore-2'>
        <Row>
          {selectedIdsModifica.length > 0 && (
            <Col><button className="bottone-blu-non-selezionato" onClick={handleEdit}>Modifica</button></Col>
          )}
          {selectedIdsEliminazione.length > 0 && (
            <Col><button className="bottone-rosso-non-selezionato" onClick={handleDelete}>Elimina</button></Col>
          )}
        </Row>
      </div>
    </>
  );
}

export function OperazioniCambioTipoForm({ tipoForm, setTipoForm, StyledComponents }) {
  const cambioTipoForm = () => {
    setTipoForm((tipoForm === "search") ? "insert" : "search");
  }

  return (
    <StyledComponents.StyledListGroupItem 
      style={{ border: "5px solid #000000", backgroundColor: "#000000", paddingTop: "20px", paddingBottom: "20px" }} 
    >
      {(tipoForm === "search") ? (
        <>
          <StyledComponents.StyledSearchSelected2 
            size={StyledComponents.grandezzaIcona} 
            style={{ marginRight: "50px" }} 
            onClick={cambioTipoForm} 
          />
          <StyledComponents.StyledSaveNotSelected2 
            size={StyledComponents.grandezzaIcona} 
            onClick={cambioTipoForm} 
          />
        </>
      ) : (
        <>
          <StyledComponents.StyledSearchNotSelected2  
            size={StyledComponents.grandezzaIcona} 
            style={{ marginRight: "50px" }}  
            onClick={cambioTipoForm} 
          />
          <StyledComponents.StyledSaveSelected2 
            size={StyledComponents.grandezzaIcona} 
            onClick={cambioTipoForm} 
          />
        </>
      )}
    </StyledComponents.StyledListGroupItem>
  );
};

export function OperazioniCambioTipoForm2({ elementi, tipoForm, setTipoForm, StyledComponents }) {
  const cambioTipoForm2 = (nuovoTipo) => {
    setTipoForm(nuovoTipo);
  }

  return (
    <StyledComponents.StyledListGroupItem 
      style={{ border: "5px solid #000000", backgroundColor: "#000000", paddingTop: "20px", paddingBottom: "20px" }} 
    >
      {(elementi.includes("insert") && tipoForm === "insert") && (
        <>
          {elementi.includes("search") && (
            <StyledComponents.StyledSearchNotSelected2  
              size={StyledComponents.grandezzaIcona} 
              style={{ marginRight: "50px" }}  
              onClick={() => cambioTipoForm2("search")} 
            />
          )}
          <StyledComponents.StyledSaveSelected2 
            size={StyledComponents.grandezzaIcona} 
            style={{ marginRight: "50px" }} 
            onClick={() => cambioTipoForm2("insert")} 
          />
          {elementi.includes("file") && (
            <StyledComponents.StyledFileIconNotSelected2 
              icon={faFile} 
              size="2xl"
              onClick={() => cambioTipoForm2("file")} 
            />
          )}
        </>
      )}
      {(elementi.includes("search") && tipoForm === "search") && (
        <>
          <StyledComponents.StyledSearchSelected2  
            size={StyledComponents.grandezzaIcona} 
            style={{ marginRight: "50px" }}  
            onClick={() => cambioTipoForm2("search")} 
          />
          {elementi.includes("insert") && (
            <StyledComponents.StyledSaveNotSelected2 
              size={StyledComponents.grandezzaIcona} 
              style={{ marginRight: "50px" }} 
              onClick={() => cambioTipoForm2("insert")} 
            />
          )}
          {elementi.includes("file") && (
            <StyledComponents.StyledFileIconNotSelected2 
              icon={faFile} 
              size="2xl"
              onClick={() => cambioTipoForm2("file")} 
            />
          )}
        </>
      )}
      {(elementi.includes("file") && tipoForm === "file") && (
        <>
          {elementi.includes("search") && (
            <StyledComponents.StyledSearchNotSelected2  
              size={StyledComponents.grandezzaIcona} 
              style={{ marginRight: "50px" }}  
              onClick={() => cambioTipoForm2("search")} 
            />
          )}
          {elementi.includes("insert") && (
            <StyledComponents.StyledSaveNotSelected2 
              size={StyledComponents.grandezzaIcona} 
              style={{ marginRight: "50px" }} 
              onClick={() => cambioTipoForm2("insert")} 
            />
          )}
          <StyledComponents.StyledFileIconNotSelected2 
            icon={faFile} 
            size="2xl"
            onClick={() => cambioTipoForm2("file")} 
          />
        </>
      )}
    </StyledComponents.StyledListGroupItem>
  );
};









