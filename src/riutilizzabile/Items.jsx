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

const getTotale = (collegamenti, servizi) => {
  let totale = 0;
  for(let collegamento of collegamenti) {
    for(let servizio of servizi) {
      if(collegamento.id_servizio === servizio.id) {
        totale += servizio.prezzo * collegamento.quantita;
      }
    }
  }
  return totale;
}

const getQuantita = (servizio, item) => {
  for(let collegamento of item["collegamenti"]) {
    if(servizio.id === collegamento.id_servizio) {
      return collegamento.quantita;
    }
  }
  return 0;
}

const aggiornaCollegamento = (servizi, item, lavoroActions, index, nuovoValore, setServiziLavoro) => {
  if(item.tipo_selezione === 1) {
    let isAggiornato = false;
    if(nuovoValore >= 0) {
      let nuoviCollegamenti = [];
      for(let collegamento of item["collegamenti"]) {
        if(collegamento["id_servizio"] === servizi[index]["id"]) {
          nuoviCollegamenti.push({
            id_servizio: collegamento["id_servizio"], 
            id_lavoro: collegamento["id_lavoro"], 
            quantita: nuovoValore
          });
          isAggiornato = true;
        }
        else {
          nuoviCollegamenti.push(collegamento);
        }
      }
      if(isAggiornato === false) {
        nuoviCollegamenti.push({
          id_servizio: servizi[index]["id"], 
          id_lavoro: nuoviCollegamenti[0]["id_lavoro"], 
          quantita: nuovoValore
        })
      }
      lavoroActions.aggiornaLavoro(item.id, "collegamenti", nuoviCollegamenti);
      lavoroActions.aggiornaLavoro(item.id, "totale", getTotale(nuoviCollegamenti, servizi));
    }
  }
};

const OptionsServizi = ({ servizi, item, lavoroActions, sottoStringa, setServiziLavoro }) => {
  return (
    <>
      {servizi && servizi.length > 0 && (
        <div>
          {servizi.filter((servizio) => optionStr(servizio).toLowerCase().includes(sottoStringa.toLowerCase())).map((servizio, index) => {
            const quantita = getQuantita(servizio, item);
            if( (servizio.in_uso === 1) || (servizio.in_uso === 0 && quantita > 0) ) {
              return (
                <React.Fragment key={index}>
                  <Row key={index} style={{ padding: "10px" }}>
                    <Col>
                      <label htmlFor={`servizio_${index}`}>{optionStr(servizio)}</label>
                    </Col>
                    <Col>
                      <input
                        style={{ width: "90px", padding: "5px 10px" }}
                        type="number"
                        value={quantita}
                        placeholder={`quantita_servizio_${index}`}
                        onChange={(e) =>
                          aggiornaCollegamento(servizi, item, lavoroActions, index, e.target.value, setServiziLavoro)
                        }
                      />
                    </Col>
                  </Row>
                </React.Fragment>
              )
            }
          })}
        </div>
      )}
      {item["collegamenti"] && servizi && (
        <div>Totale: {parseFloat(getTotale(item["collegamenti"], servizi)).toFixed(2)} €</div> 
      )}
    </>
  );
};

export const Items = ({ tipoItem, items, setItems, selectOperation, emptyIsConsidered, campi, indici, servizi, handleBlurItem, lavoroActions, tipoForm }) => {
  const stileState = useSelector((state) => state.stileSliceReducer.value);
  const ItemEsistenteTag = stileState.vistaItem === "card" ? CardItemEsistente : RowItemEsistente;
  
  if (tipoItem === "lavoro") {
    const ItemElements = () => {
      return (
        <>
          {items.map((item, index) => {
            const sottoStringa = item.servizio || "";
            
            return (
              <ItemEsistenteTag
                key={index}
                item={item}
                campi={campi(
                  <OptionsServizi
                    servizi={servizi}
                    item={item}
                    lavoroActions={lavoroActions}
                    // serviziLavoro={servizi}
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
