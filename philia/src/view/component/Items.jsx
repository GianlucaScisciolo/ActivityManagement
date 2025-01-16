import { useState } from "react";
import { useSelector } from "react-redux";
import Row from "react-bootstrap/esm/Row";
import Col from "react-bootstrap/esm/Col";
import CardItem from "./card_item/CardItem";
import RowItem from "./row_item/RowItem";
import { elimina } from "../../vario/OperazioniEliminazione";
import { modifica } from "../../vario/OperazioniModifica";

export const Items = ({tipoItem, items, setterItems}) => {
  const [selectedTrashCount, setSelectedTrashCount] = useState(0);
  const [selectedPencilCount, setSelectedPencilCount] = useState(0);
  const [selectedIdsEliminazione, setSelectedIdsEliminazione] = useState([]);
  const [selectedIdsModifica, setSelectedIdsModifica] = useState([]);

  const itemSession = useSelector((state) => state.itemSession.value);
  
  const selectOperation = (icon, item) => {
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

  return (
    <>
      {itemSession.view === "list" && (
        <>
          {items.map((item, index) => (  
            <RowItem key={index} selectOperation={selectOperation} tipoItem={tipoItem} item={item} items={items} setItems={setterItems} />
          ))}
        </>
        // <button>Lista</button>
      )}
      {itemSession.view === "card" && (
        <div className='contenitore-3'>
          {items.map((item, index) => (  
            <CardItem key={index} selectOperation={selectOperation} tipoItem={tipoItem} item={item} items={items} 
              setItems={setterItems} header={tipoItem.charAt(0).toUpperCase() + tipoItem.slice(1)} 
            />
          ))}
        </div>
      )}

      <div className="main-content" />

      <div className='contenitore-2'>
        <Row>
          {selectedIdsModifica.length > 0 && (
            <Col>
              {/* <button className='bottone-blu-non-selezionato' onClick={() => modifica("tipoItem"ClienteLastSearch, selectedIdsModifica, setSelectedIdsModifica, clienti, setClienti, null, null, setErrori, null)}>Modifica</button> */}
              <button className="bottone-blu-non-selezionato"
                onClick={(e) => modifica(e, tipoItem, selectedIdsModifica, setSelectedIdsModifica, items, setErrori, setterItems)}
              >
                Modifica
              </button>
            </Col>
          )}        
          {selectedIdsEliminazione.length > 0 && (
            <Col>
              <button className='bottone-rosso-non-selezionato'
                onClick={(e) => elimina(e, tipoItem, selectedIdsEliminazione, setSelectedIdsEliminazione, items, setterItems)}
              >
                Elimina
              </button>
            </Col>
          )}
        </Row>
      </div>

      <br /> <br />
    </>
  );
}









