import { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { CardItemEsistente } from "../../riutilizzabile/card_item/CardItem";
import { RowItemEsistente } from "../../riutilizzabile/row_item/RowItem";
import { aggiornaLavoro } from "../../store/redux/LavoriSlice";

export const Items = ({ tipoItem, items, setItems, selectOperation, emptyIsConsidered, campi, indici, servizi }) => {
  const formSession = useSelector((state) => state.formSession.value);
  const itemSession = useSelector((state) => state.itemSession.value);
  const dispatch = useDispatch();
  const ItemEsistenteTag = itemSession.view === "card" ? CardItemEsistente : RowItemEsistente;

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
      if (item["serviziSelezionati"] !== -1) {
        let totale = 0;
        for (let s of item["serviziSelezionati"]) {
          totale += parseFloat(s.prezzo) || 0;
        }

        dispatch(
          aggiornaLavoro({
            id_lavoro: item.id,
            nome_attributo: "totale",
            nuovo_valore: totale,
          })
        );
      }
    }, [item["serviziSelezionati"], item.id, dispatch]);

    const handleCheckboxChange = (e, servizio) => {
      e.preventDefault();

      if (e.target.checked) {
        dispatch(
          aggiornaLavoro({
            id_lavoro: item.id,
            nome_attributo: "serviziSelezionati",
            nuovo_valore: [...item["serviziSelezionati"], servizio],
          })
        );

        const aggiornamentoNonSelezionati = serviziNonSelezionati.filter(
          (s) => optionStr(s) !== optionStr(servizio)
        );
        setServiziNonSelezionati(aggiornamentoNonSelezionati);
      } else {
        dispatch(
          aggiornaLavoro({
            id_lavoro: item.id,
            nome_attributo: "serviziSelezionati",
            nuovo_valore: item["serviziSelezionati"].filter(
              (s) => optionStr(s) !== optionStr(servizio)
            ),
          })
        );

        const aggiornamentoNonSelezionati = [...serviziNonSelezionati, servizio].filter(
          (v, i, a) => a.findIndex((t) => optionStr(t) === optionStr(v)) === i
        );
        setServiziNonSelezionati(aggiornamentoNonSelezionati);
      }
    };

    const classeWrapperCheckbox =
      itemSession.view === "form" ? "checkbox-wrapper-form" : "checkbox-wrapper";

    return (
      <>
        {servizi !== -1 && (
          <>
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
            <div>
              {item["serviziSelezionati"].map((servizio, index) => (
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
              dispatch={dispatch}
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
          {itemSession.view === "card" ? (
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
