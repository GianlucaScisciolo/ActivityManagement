import Row from "react-bootstrap/esm/Row";
import Col from "react-bootstrap/esm/Col";

export const OperazioniItems = ({selectedIdsModifica, selectedIdsEliminazione, modifica, elimina}) => {
  return (
    <>
      <div className='contenitore-2'>
        <Row>
          {selectedIdsModifica.length > 0 && (
            <Col><button className="bottone-blu-non-selezionato" onClick={modifica}>Modifica</button></Col>
          )}
          {selectedIdsEliminazione.length > 0 && (
            <Col><button className="bottone-rosso-non-selezionato" onClick={elimina}>Elimina</button></Col>
          )}
        </Row>
      </div>
    </>
  );
}