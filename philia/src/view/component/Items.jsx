import { useState, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { CardItemEsistente } from "../../trasportabile/card_item/CardItem";
import { RowItemEsistente } from "../../trasportabile/row_item/RowItem";
import { CardLavoroEsistente } from "./card_item/CardsLavori";
import { RowLavoroEsistente } from "./row_item/RowsLavori";
import { handleInputChangeLavoroEsistente, handleInputChange } from "../../vario/Vario";

export const Items = ({tipoItem, items, setItems, selectOperation, emptyIsConsidered, campi, indici, servizi}) => {
  const formSession = useSelector((state) => state.formSession.value);
  const itemSession = useSelector((state) => state.itemSession.value);
  const ItemEsistenteTag = (itemSession.view === "card") ? CardItemEsistente : RowItemEsistente;

  const OptionsServizi = (servizi, descrizione, sottoStringa, setIdServizi) => {
    if (!servizi) {
      return null;
    }
    const [serviziSelezionati, setServiziSelezionati] = useState([]);
    const [serviziNonSelezionati, setServiziNonSelezionati] = useState(Object.values(servizi));
    
    useEffect(() => {
      const serviziSelezionatiAttuali = descrizione.split(',').map(item => item.trim()).filter(item => item !== "");
      for(let i = 0; i < serviziSelezionatiAttuali.length; i++) {
        serviziSelezionatiAttuali[i] = serviziSelezionatiAttuali[i].split('-').map(item => item.trim()).filter(item => item !== "");
        serviziSelezionatiAttuali[i] = {
          nome: serviziSelezionatiAttuali[i][0], 
          prezzo: serviziSelezionatiAttuali[i][1].substring(0, serviziSelezionatiAttuali[i][1].length-2)
        };
      }
      setServiziSelezionati(serviziSelezionatiAttuali);
    }, []);

    useEffect(() => {
      setServiziNonSelezionati(Object.values(servizi));
    }, [servizi]);
    
    const optionStr = (servizio) => {
      return servizio.nome + " - " + servizio.prezzo + " €";
    }

    const handleCheckboxChange = (e, servizio) => {
      if (e.target.checked) {
        const updatedSelezionati = [...serviziSelezionati, servizio];
        setServiziSelezionati(updatedSelezionati);
        setServiziNonSelezionati(serviziNonSelezionati.filter(s => s.id !== servizio.id));
        setIdServizi(prevIds => [...prevIds, servizio.id]);
      } 
      else {
        const updatedSelezionati = serviziSelezionati.filter(s => s.id !== servizio.id);
        setServiziSelezionati(updatedSelezionati);
        setServiziNonSelezionati([...serviziNonSelezionati, servizio]);
        setIdServizi(prevIds => prevIds.filter(id => id !== servizio.id));
      }
    };

    return (
      <>
        {(servizi !== -1) && (
          <>
            <div>
              Servizi non selezionati:<br />
              {serviziNonSelezionati.filter(servizio => 
                optionStr(servizio).toLowerCase().includes(sottoStringa.toLowerCase())
              ).map((servizio, index) => (
                <div key={index} className="checkbox-wrapper">
                  <input 
                    type="checkbox" 
                    id={"servizio_non_sel_" + index} 
                    name={"servizio_non_sel_" + index} 
                    value={servizio.id}
                    checked={false}
                    onChange={(e) => handleCheckboxChange(e, servizio)}
                    className="custom-checkbox"
                  />
                  <label htmlFor={"servizio_non_sel_" + index}>
                    {optionStr(servizio)}
                  </label>
                </div>                
              ))}
            </div>
            <div>
              Servizi selezionati (seleziona almeno un servizio):<br />
              {serviziSelezionati.map((servizio, index) => (
                <div key={index} className="checkbox-wrapper">
                  <input 
                    type="checkbox" 
                    id={"servizio_sel_" + index} 
                    name={"servizio_sel_" + index} 
                    value={servizio.id} 
                    checked={true}
                    onChange={(e) => handleCheckboxChange(e, servizio)}
                    className="custom-checkbox"
                  />
                  <label htmlFor={"servizio_sel_" + index}>
                    {optionStr(servizio)}
                  </label>
                </div>
              ))}
            </div>
          </>
        )}
      </>
    );
  }

  const modifica = (e, item) => {
    // e.preventDefault();
    const { name, value } = e.target;
    setItems((prevItems) => {
      const newItems = prevItems.map(currentItem => 
        currentItem.id === item.id 
          ? { ...currentItem, [name]: value }
          : currentItem
      );
      // Ritornare l'elemento modificato
      setTimeout(() => updatedItems({target: {name, value}}, item), 0);
      return newItems;
    });
  };
  
  const updatedItems = (e, item) => {
    console.log("TMP");
    modifica(e, item);
  };
  

  
  const ItemElements = () => {
    return (
      <>
        {items.map((item, index) => {
          item["servizio"] = (item.servizio) ? item.servizio : "";
          const descrizione = item.descrizione;
          const sottoStringa = item.servizio;
          const [idServizi, setIdServizi] = useState([]);
          item["id_servizi"] = idServizi;
          return (
            <ItemEsistenteTag 
              key={index} 
              item={item} 
              campi={campi(OptionsServizi(servizi, descrizione, sottoStringa, setIdServizi), item, null, null, null)} 
              indici={indici} 
              selectOperation={selectOperation} 
              items={items} 
              setItems={setItems} 
              tipoItem={tipoItem}
              onChange={(e) => updatedItems(e, item)}
            />
          )
        })}
      </>
    );
  }


  return (
    <>
      {((items.length <= 0 && emptyIsConsidered)) && (
        <div className='contenitore-1'>Nessun {tipoItem} trovato!!</div>
      )}
      {(items.length > 0) && (
        <>
          {itemSession.view === "card" ? (
            <div className="contenitore-3">
              {/* <ItemElements items={items} setItems={setItems} tipoItem={tipoItem} /> */}
              <ItemElements />
            </div>
          ) : (
            <ItemElements />
          )}
        </>
      )} 
    </>
  )
}








