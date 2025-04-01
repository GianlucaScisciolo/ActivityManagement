// React e Redux
import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
// Riutilizzabile
import { CardItemEsistente } from "./card_item/CardItem";
import { RowItemEsistente } from "./row_item/RowItem";

export const Items = ({ tipoItem, items, setItems, selectOperation, emptyIsConsidered, campi, indici, servizi, handleBlurItem, lavoroActions }) => {
  const stileState = useSelector((state) => state.stileSliceReducer.value);
  const ItemEsistenteTag = stileState.vistaItem === "card" ? CardItemEsistente : RowItemEsistente;

  const OptionsServizi = (servizi, descrizione, sottoStringa, item) => {
    const optionStr = (servizio) => `${servizio.nome} - ${servizio.prezzo} €`;

    const [serviziNonSelezionati, setServiziNonSelezionati] = useState([]);

    // Effettua il calcolo dei servizi non selezionati
    useEffect(() => {
      if (!servizi || servizi === -1) return;

      const nonSelezionati = (servizi || []).filter(
        (s) => !item["serviziSelezionati"].some((ss) => optionStr(s) === optionStr(ss))
      );

      const uniciNonSelezionati = nonSelezionati.filter(
        (v, i, a) => a.findIndex((t) => optionStr(t) === optionStr(v)) === i
      );

      setServiziNonSelezionati(uniciNonSelezionati);
    }, [servizi, item["serviziSelezionati"]]);

    // Calcolo e aggiornamento del totale
    useEffect(() => {
      if (tipoItem === "lavoro" && item["serviziSelezionati"] !== -1) {
        let totale = 0;
        for (let s of item["serviziSelezionati"]) {
          totale += parseFloat(s.prezzo) || 0;
        }
        lavoroActions.aggiornaLavoro(item.id, "totale", totale);
      }
    }, [item["serviziSelezionati"], item.id]);

    const handleCheckboxChange = (e, servizio) => {
      e.preventDefault();

      if (e.target.checked) {
        lavoroActions.aggiornaLavoro(item.id, "serviziSelezionati", [...item["serviziSelezionati"], servizio]);

        const aggiornamentoNonSelezionati = serviziNonSelezionati.filter(
          (s) => optionStr(s) !== optionStr(servizio)
        );
        setServiziNonSelezionati(aggiornamentoNonSelezionati);
      } 
      else {
        lavoroActions.aggiornaLavoro(
          item.id, 
          "serviziSelezionati", 
          item["serviziSelezionati"].filter(
            (s) => optionStr(s) !== optionStr(servizio)
          )
        );

        const aggiornamentoNonSelezionati = [...serviziNonSelezionati, servizio].filter(
          (v, i, a) => a.findIndex((t) => optionStr(t) === optionStr(v)) === i
        );
        setServiziNonSelezionati(aggiornamentoNonSelezionati);
      }
    };

    const classeWrapperCheckbox =
      stileState.vistaItem === "form" ? "checkbox-wrapper-form" : "checkbox-wrapper";

    return (
      <>
        {servizi !== -1 && (
          <>
            {(item.tipo_selezione === 1) && (
              <div>
                Seleziona almeno 1 servizio:
                <br />
                {serviziNonSelezionati
                  .filter((servizio) =>
                    optionStr(servizio).toLowerCase().includes(sottoStringa.toLowerCase())
                  )
                  .map((servizio, index) => (
                    <div key={index} className={classeWrapperCheckbox}>
                      <input
                        type="checkbox"
                        id={`servizio_non_sel_${index}`}
                        name={`servizio_non_sel_${index}`}
                        value={optionStr(servizio)}
                        checked={false}
                        onChange={(e) => handleCheckboxChange(e, servizio)}
                        className="custom-checkbox"
                      />
                      <label htmlFor={`servizio_non_sel_${index}`}>{optionStr(servizio)}</label>
                    </div>
                  ))}
              </div>
            )}
            {(item.tipo_selezione === 1) && (
              <div>
                {tipoItem === "lavoro" && item["serviziSelezionati"].map((servizio, index) => (
                  <div key={index} className="checkbox-wrapper">
                    <input
                      type="checkbox"
                      id={`servizio_sel_${index}`}
                      name={`servizio_sel_${index}`}
                      value={optionStr(servizio)}
                      checked={true}
                      onChange={(e) => handleCheckboxChange(e, servizio)}
                      className="custom-checkbox"
                    />
                    <label htmlFor={`servizio_sel_${index}`}>{optionStr(servizio)}</label>
                  </div>
                ))}
              </div>
            )}
            {(item.tipo_selezione !== 1) && (
              <div>
                <ul>
                  {tipoItem === "lavoro" && item["serviziSelezionati"].map((servizio, index) => (
                    <li key={index} style={{textAlign:"left", padding:"10px"}}>{optionStr(servizio)}</li>
                  ))}
                </ul>
              </div>
            )}
          </>
        )}
      </>
    );
  };

  const ItemElements = () => {
    return (
      <>
        {items.map((item, index) => {
          const descrizione = item.descrizione;
          const sottoStringa = item.servizio ? item.servizio : "";
          return (
            <ItemEsistenteTag
              key={index}
              item={item}
              campi={campi(OptionsServizi(servizi, descrizione, sottoStringa, item), item, null, null, null)}
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
      {items.length <= 0 && emptyIsConsidered && (
        <div className="contenitore-1">Nessun {tipoItem} trovato!!</div>
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
};
