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

export const selectOperationBody = (
  icon, item, selectedIdsModifica, setSelectedIdsModifica, selectedIdsEliminazione, setSelectedIdsEliminazione, 
  setSelectedPencilCount, setSelectedTrashCount
) => {
  if(icon === "trash") {
    if(selectedIdsEliminazione.includes(item.id)) {
      item.tipo_selezione = 0;
      setSelectedIdsEliminazione(prevIds => prevIds.filter(itemId => itemId !== item.id));
      setSelectedTrashCount(prevCount => Math.max(prevCount - 1, 0));
    }
    else {
      item.tipo_selezione = 2;
      setSelectedIdsEliminazione(prevIds => [...prevIds, item.id]);
      setSelectedTrashCount(prevCount => prevCount + 1);
      setSelectedIdsModifica(prevIdsModifica => prevIdsModifica.filter(itemId => itemId !== item.id));
      setSelectedPencilCount(prevCount => Math.max(prevCount - 1, 0));
    }
  }
  else if(icon === "pencil") {
    if(selectedIdsModifica.includes(item.id)) {
      item.tipo_selezione = 0;
      setSelectedIdsModifica(prevIdsModifica => prevIdsModifica.filter(itemId => itemId !== item.id));
      setSelectedPencilCount(prevCount => Math.max(prevCount - 1, 0));
    }
    else {
      item.tipo_selezione = 1;
      setSelectedIdsModifica(prevIdsModifica => [...prevIdsModifica, item.id]);
      setSelectedPencilCount(prevCount => prevCount + 1);
      setSelectedIdsEliminazione(prevIds => prevIds.filter(itemId => itemId !== item.id));
      setSelectedTrashCount(prevCount => Math.max(prevCount - 1, 0));
    }
  }
}