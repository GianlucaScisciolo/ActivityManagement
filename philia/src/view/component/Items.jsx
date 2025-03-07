import { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { CardItemEsistente } from "../../riutilizzabile/card_item/CardItem";
import { RowItemEsistente } from "../../riutilizzabile/row_item/RowItem";
// import { CardLavoroEsistente } from "./card_item/CardsLavori";
// import { RowLavoroEsistente } from "./row_item/RowsLavori";
// import { handleInputChangeLavoroEsistente, handleInputChange } from "../../vario/Vario";
import { aggiornaCliente } from "../../store/redux/ClientiSlice";
import { aggiornaLavoro } from "../../store/redux/LavoriSlice";
import { aggiornaSpesa } from "../../store/redux/SpeseSlice";
import { aggiornaServizio } from "../../store/redux/ServiziSlice";

export const Items = ({tipoItem, items, setItems, selectOperation, emptyIsConsidered, campi, indici, servizi}) => {
  const formSession = useSelector((state) => state.formSession.value);
  const itemSession = useSelector((state) => state.itemSession.value);
  const dispatch = useDispatch();
  const ItemEsistenteTag = (itemSession.view === "card") ? CardItemEsistente : RowItemEsistente;

  const OptionsServizi = (servizi, descrizione, sottoStringa, item) => {
    
    if (!servizi) {
      return null;
    }
    // const [serviziSelezionati, setServiziSelezionati] = useState([]);
    const [serviziNonSelezionati, setServiziNonSelezionati] = useState(Object.values(servizi));
    // let [serviziSelezionatiAttuali, setServiziSelezionatiAttuali] = useState([]);
    // useEffect(() => {
    //   setServiziSelezionatiAttuali(descrizione.split(',').map(item => item.trim()).filter(item => item !== ""));
    //   for(let i = 0; i < serviziSelezionatiAttuali.length; i++) {
    //     serviziSelezionatiAttuali[i] = serviziSelezionatiAttuali[i].split('-').map(item => item.trim()).filter(item => item !== "");
    //     serviziSelezionatiAttuali[i] = {
    //       nome: serviziSelezionatiAttuali[i][0], 
    //       prezzo: serviziSelezionatiAttuali[i][1].substring(0, serviziSelezionatiAttuali[i][1].length-2)
    //     };
    //   }
      // setServiziSelezionati(serviziSelezionatiAttuali);
      //----------------------------------------------------------------------------------------------------//
      // dispatch(aggiornaLavoro({
      //   id_lavoro: item.id, 
      //   nome_attributo: "serviziSelezionati", 
      //   nuovo_valore: serviziSelezionatiAttuali
      // }));
      //----------------------------------------------------------------------------------------------------//
    // }, []);

    useEffect(() => {
      setServiziNonSelezionati(Object.values(servizi));
    }, [servizi]);
    
    const optionStr = (servizio) => {
      return servizio.nome + " - " + servizio.prezzo + " €";
    }

    const handleCheckboxChange = (e, servizio) => {
      if (e.target.checked) {
        dispatch(aggiornaLavoro({
          id_lavoro: item.id, 
          nome_attributo: "serviziSelezionati", 
          nuovo_valore: [...item["serviziSelezionati"], servizio]
        }));
        setServiziNonSelezionati(serviziNonSelezionati.filter(s => (optionStr(s)) !== optionStr(servizio)));
      } 
      else {
        // setServiziSelezionati(updatedSelezionati);
        dispatch(aggiornaLavoro({
          id_lavoro: item.id, 
          nome_attributo: "serviziSelezionati", 
          nuovo_valore: item["serviziSelezionati"].filter(s => (optionStr(s)) !== optionStr(servizio))
        }));
        // setServiziNonSelezionati([...serviziNonSelezionati, servizio]);
        let isPresent = false;
        for(let s of serviziNonSelezionati) {
          if(optionStr(s) === optionStr(servizio)) {
            isPresent = true;
            break;
          } 
        }
        if(isPresent !== true) {
          const updatedNonSelezionati = [...serviziNonSelezionati, servizio];
          setServiziNonSelezionati(updatedNonSelezionati);
        }
        // setIdServizi(prevIds => prevIds.filter(id => id !== servizio.id));
      }
    };
    return (
      <>
        {(servizi !== -1) && (
          <>
            <div>
              Seleziona almeno 1 servizio:<br />
              {serviziNonSelezionati.filter(servizio => 
                optionStr(servizio).toLowerCase().includes(sottoStringa.toLowerCase())
              ).map((servizio, index) => (
                <div key={index} className="checkbox-wrapper">
                  <input 
                    type="checkbox" 
                    id={"servizio_non_sel_" + index} 
                    name={"servizio_non_sel_" + index} 
                    value={optionStr(servizio)}
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
              {item["serviziSelezionati"].map((servizio, index) => (
                <div key={index} className="checkbox-wrapper">
                  <input 
                    type="checkbox" 
                    id={"servizio_sel_" + index} 
                    name={"servizio_sel_" + index} 
                    value={optionStr(servizio)} 
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

  const updatedItems = (e, item, inputRef) => {
    // e.preventDefault();
    const { name, value } = e.target;
    if(tipoItem === "cliente") {
      dispatch(aggiornaCliente({
        id_cliente: item.id, 
        nome_attributo: name,
        nuovo_valore: value
      }));
    }
    else if(tipoItem === "lavoro") {
      dispatch(aggiornaLavoro({
        id_lavoro: item.id, 
        nome_attributo: name,
        nuovo_valore: value
      }));
    }
    else if(tipoItem === "spesa") {
      dispatch(aggiornaSpesa({
        id_spesa: item.id, 
        nome_attributo: name,
        nuovo_valore: value
      }));
    }
    else if(tipoItem === "servizio") {
      dispatch(aggiornaServizio({
        id_servizio: item.id, 
        nome_attributo: name,
        nuovo_valore: value
      }));
    }
  };

  
  const ItemElements = () => {
    return (
      <>
        {items.map((item, index) => {
          // item["servizio"] = (item.servizio) ? item.servizio : "";
          const descrizione = item.descrizione;
          const sottoStringa = (item.servizio) ? item.servizio : "";
          // const [serviziSelezionati, setServiziSelezionati] = useState([]);
          const inputRef = useRef(null);
          // item["id_servizi"] = idServizi;          
          return (
            <ItemEsistenteTag 
              ref={inputRef}
              key={index} 
              item={item} 
              campi={campi(OptionsServizi(servizi, descrizione, sottoStringa, item), item, null, null, null)} 
              indici={indici} 
              selectOperation={selectOperation} 
              items={items} 
              setItems={setItems} 
              tipoItem={tipoItem}
              onChange={(e) => updatedItems(e, item, inputRef)}
              // itemsSelezionati=
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








