// React e Redux
import React from "react";
import Row from "react-bootstrap/esm/Row";
import Col from "react-bootstrap/esm/Col";

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











