import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import Row from 'react-bootstrap/esm/Row';
import Col from 'react-bootstrap/esm/Col';
// Riutilizzabile
import { CardItemEsistente } from "./card_item/CardItem";
import { RowItemEsistente } from "./row_item/RowItem";

const scomponiStringa = (stringa) => {
  const indiceUltimaX = stringa.lastIndexOf(" x ");
  const nome = stringa.substring(0, indiceUltimaX).trim();
  let [quantita, prezzo] = stringa.substring(indiceUltimaX + 3).trim().split(" - ");
  prezzo = prezzo.substring(0, prezzo.length - 2);
  
  return {
    nome,
    quantita: parseInt(quantita, 10),
    prezzo: prezzo / quantita,
  };
};

const optionStr = (servizio) => {
  return `${servizio.nome} - ${servizio.prezzo} €`;
};

const aggiornaServizio = (item, lavoroActions, serviziLavoro, index, nuovoValore, setServiziLavoro) => {
  const nuoviServizi = [...serviziLavoro]; // Copia array
  nuoviServizi[index] = { ...nuoviServizi[index], quantita: parseInt(nuovoValore, 10) }; // Aggiorna la quantità
  if(item.tipo_selezione === 1) {
    let isModificabile = true;
    for(let nuovoServizio of nuoviServizi) {
      if(nuovoServizio.quantita < 0) {
        isModificabile = false;
        break;
      }
    }
    if(isModificabile === true) {
      lavoroActions.aggiornaLavoro(item.id, "servizi", nuoviServizi);
      lavoroActions.aggiornaLavoro(item.id, "totale", getTotale(nuoviServizi));
    }
  }
};

const getTotale = (serviziLavoro) => {
  let totale = 0;
  for (let servizio of serviziLavoro) {
    totale += servizio.prezzo * servizio.quantita;
  }
  return totale;
}

const OptionsServizi = ({ item, lavoroActions, serviziLavoro, sottoStringa, setServiziLavoro }) => {
  return (
    <>
      {serviziLavoro.length > 0 && (
        <div>
          Seleziona almeno 1 servizio:<br />
          {serviziLavoro
            .filter((servizio) =>
              optionStr(servizio).toLowerCase().includes(sottoStringa.toLowerCase())
            )
            .map((servizio, index) => (
              <Row key={index} style={{ padding: "10px" }}>
                <Col>
                  <label htmlFor={`servizio_${index}`}>{optionStr(servizio)}</label>
                </Col>
                <Col>
                  <input
                    style={{ width: "90px", padding: "5px 10px" }}
                    type="number"
                    value={servizio.quantita}
                    placeholder={`quantita_servizio_${index}`}
                    onChange={(e) =>
                      aggiornaServizio(item, lavoroActions, serviziLavoro, index, e.target.value, setServiziLavoro)
                    }
                  />
                </Col>
              </Row>
            ))}
        </div>
      )}
      {serviziLavoro && (
        <div>Totale: {parseFloat(getTotale(serviziLavoro)).toFixed(2)} €</div>
      )}
    </>
  );
};

export const Items = ({ tipoItem, items, setItems, selectOperation, emptyIsConsidered, campi, indici, servizi, handleBlurItem, lavoroActions, tipoForm }) => {
  const stileState = useSelector((state) => state.stileSliceReducer.value);
  const ItemEsistenteTag = stileState.vistaItem === "card" ? CardItemEsistente : RowItemEsistente;
  
  /*
  if (tipoItem === "lavoro") {
    const [serviziLavoroState, setServiziLavoroState] = useState({});
    
    const handleServiziLavoroChange = (item, itemIndex, nuoviServizi, totale) => {
      if(item.tipo_selezione === 1) {
        let isModificabile = true;
        for(let nuovoServizio of nuoviServizi) {
          if(nuovoServizio.quantita < 0) {
            isModificabile = false;
            break;
          }
        }
        if(isModificabile === true) {
          setServiziLavoroState((prevState) => ({
            ...prevState,
            [itemIndex]: nuoviServizi,
          }));
          lavoroActions.aggiornaLavoro(item.id, "servizi", nuoviServizi);
          lavoroActions.aggiornaLavoro(item.id, "totale", getTotale(nuoviServizi));
        }
      }
    };

    const calcolaServiziLavoro = (descrizione, servizi) => {
      
      let serviziLavoro = descrizione.substring(0, descrizione.length - 2).split(",");
      serviziLavoro = serviziLavoro.map(scomponiStringa);

      servizi.forEach((servizio) => {
        if (!serviziLavoro.some((servizioLavoro) => optionStr(servizio) === optionStr(servizioLavoro))) {
          serviziLavoro.push(servizio);
        }
      });

      return serviziLavoro;
    };

    const ItemElements = () => {
      return (
        <>
          {items.map((item, index) => {
            const descrizione = item.descrizione;
            const sottoStringa = item.servizio || "";
            const serviziLavoro = (tipoItem === "lavoro") ? serviziLavoroState[index] || calcolaServiziLavoro(descrizione, servizi) : null;
            const totale = getTotale(serviziLavoro);
            
            return (
              <ItemEsistenteTag
                key={index}
                item={item}
                campi={campi((tipoItem === "lavoro") ? (
                  <OptionsServizi
                    serviziLavoro={serviziLavoro}
                    sottoStringa={sottoStringa}
                    setServiziLavoro={(nuoviServizi) =>
                      handleServiziLavoroChange(item, index, nuoviServizi, totale)
                    }
                  />) : (null),
                  item,
                  null,
                  null,
                  null
                )}
                indici={indici}
                selectOperation={selectOperation}
                items={items}
                setItems={setItems}
                tipoItem={tipoItem}
                handleBlurItem={handleBlurItem}
              />
            );
          })}
        </>
      );
    };

    return (
      <>
        {tipoForm === "search" && items.length === 0 && (
          <div className="contenitore-1">Nessun elemento trovato.</div>
        )}
        {items.length > 0 && (
          <>
            {stileState.vistaItem === "card" ? (
              <div className="contenitore-3">
                <ItemElements />
              </div>
            ) : (
              <ItemElements />
            )}
          </>
        )}
      </>
    );
  }
  */
  
  if (tipoItem === "lavoro") {
    
    // const handleServiziLavoroChange = (item, itemIndex, nuoviServizi, totale) => {
    //   if(item.tipo_selezione === 1) {
    //     let isModificabile = true;
    //     for(let nuovoServizio of nuoviServizi) {
    //       if(nuovoServizio.quantita < 0) {
    //         isModificabile = false;
    //         break;
    //       }
    //     }
    //     if(isModificabile === true) {
    //       setServiziLavoroState((prevState) => ({
    //         ...prevState,
    //         [itemIndex]: nuoviServizi,
    //       }));
    //       lavoroActions.aggiornaLavoro(item.id, "servizi", nuoviServizi);
    //       lavoroActions.aggiornaLavoro(item.id, "totale", getTotale(nuoviServizi));
    //     }
    //   }
    // };

    const ItemElements = () => {
      return (
        <>
          {items.map((item, index) => {
            // const descrizione = item.descrizione;
            const sottoStringa = item.servizio || "";
            // const serviziLavoro = serviziLavoroState[index] || calcolaServiziLavoro(descrizione, servizi);
            // const totale = getTotale(serviziLavoro);
            // lavoroActions.aggiornaLavoro(item.id, "servizi", calcolaServiziLavoro(item["servizi"], servizi));
            
            return (
              <ItemEsistenteTag
                key={index}
                item={item}
                campi={campi(
                  <OptionsServizi
                    item={item}
                    lavoroActions={lavoroActions}
                    serviziLavoro={item["servizi"]}
                    sottoStringa={sottoStringa}
                    setServiziLavoro={/*(nuoviServizi) =>
                      handleServiziLavoroChange(item, index, nuoviServizi, totale)
                    */null}
                  />, 
                  item,
                  null,
                  null,
                  null
                )}
                indici={indici}
                selectOperation={selectOperation}
                items={items}
                setItems={setItems}
                tipoItem={tipoItem}
                handleBlurItem={handleBlurItem}
              />
            );
          })}
        </>
      );
    };

    return (
      <>
        {tipoForm === "search" && items.length === 0 && (
          <div className="contenitore-1">Nessun elemento trovato.</div>
        )}
        {items.length > 0 && (
          <>
            {stileState.vistaItem === "card" ? (
              <div className="contenitore-3">
                <ItemElements />
              </div>
            ) : (
              <ItemElements />
            )}
          </>
        )}
      </>
    );
  }
  else {
    const ItemElements = () => {
      return (
        <>
          {items.map((item, index) => {
            return(
              <>
                <ItemEsistenteTag
                  key={index}
                  item={item}
                  campi={campi(null, item, null, null, null)}
                  indici={indici}
                  selectOperation={selectOperation}
                  items={items}
                  setItems={setItems}
                  tipoItem={tipoItem}
                  handleBlurItem={handleBlurItem}
                />
              </>
            );
          })}
        </>
      );
    };

    return (
      <>
        {tipoForm === "search" && items.length === 0 && (
          <div className="contenitore-1">Nessun elemento trovato.</div>
        )}
        {items.length > 0 && (
          <>
            {stileState.vistaItem === "card" ? (
              <div className="contenitore-3">
                <ItemElements />
              </div>
            ) : (
              <ItemElements />
            )}
          </>
        )}
      </>
    );
  }
};
