import Row from "react-bootstrap/esm/Row";
import Col from "react-bootstrap/esm/Col";
import { getClientePrimaDellaModifica } from "../../../store/redux/ClientiSlice";
import { getServizioPrimaDellaModifica } from "../../../store/redux/ServiziSlice";
import { getSpesaPrimaDellaModifica } from "../../../store/redux/SpeseSlice";
import { getLavoroPrimaDellaModifica } from "../../../store/redux/LavoriSlice";


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

export const selectOperationBody = (
  icon, item, selectedIdsModifica, setSelectedIdsModifica, selectedIdsEliminazione, setSelectedIdsEliminazione, 
  setSelectedPencilCount, setSelectedTrashCount, aggiornaTipoSelezioneItem, dispatch, tipoItem 
) => {
  if(icon === "trash") {
    if(selectedIdsEliminazione.includes(item.id)) {
      aggiornaTipoSelezioneItem(item.id, 0);
      setSelectedIdsEliminazione(prevIds => prevIds.filter(itemId => itemId !== item.id));
      setSelectedTrashCount(prevCount => Math.max(prevCount - 1, 0));
    }
    else {
      aggiornaTipoSelezioneItem(item.id, 2);
      setSelectedIdsEliminazione(prevIds => [...prevIds, item.id]);
      setSelectedTrashCount(prevCount => prevCount + 1);
      setSelectedIdsModifica(prevIdsModifica => prevIdsModifica.filter(itemId => itemId !== item.id));
      setSelectedPencilCount(prevCount => Math.max(prevCount - 1, 0));
    }
  }
  else if(icon === "pencil") {
    if(selectedIdsModifica.includes(item.id)) {
      // QUI !!!!
      if(tipoItem === "cliente") {
        dispatch(getClientePrimaDellaModifica({
          id_cliente: item.id,
        }));
      }
      else if(tipoItem === "servizio") {
        dispatch(getServizioPrimaDellaModifica({
          id_servizio: item.id,
        }));
      }
      else if(tipoItem === "spesa") {
        dispatch(getSpesaPrimaDellaModifica({
          id_spesa: item.id, 
        }));
      }
      else if(tipoItem === "lavoro") {
        dispatch(getLavoroPrimaDellaModifica({
          id_lavoro: item.id, 
        }));
      }
      aggiornaTipoSelezioneItem(item.id, 0);
      setSelectedIdsModifica(prevIdsModifica => prevIdsModifica.filter(itemId => itemId !== item.id));
      setSelectedPencilCount(prevCount => Math.max(prevCount - 1, 0));
    }
    else {
      aggiornaTipoSelezioneItem(item.id, 1);
      setSelectedIdsModifica(prevIdsModifica => [...prevIdsModifica, item.id]);
      setSelectedPencilCount(prevCount => prevCount + 1);
      setSelectedIdsEliminazione(prevIds => prevIds.filter(itemId => itemId !== item.id));
      setSelectedTrashCount(prevCount => Math.max(prevCount - 1, 0));
    }
  }
}









