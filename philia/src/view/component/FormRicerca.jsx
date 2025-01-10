import { useState, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { aggiornamentoLista, eseguiRicerca } from "../../vario/OperazioniRicerca";
import Row from 'react-bootstrap/esm/Row';
import Col from 'react-bootstrap/esm/Col';
import CardItem from "../component/card_item/CardItem";
import RowItem from "./row_item/RowItem";
import FormItem from "./form_item/FormItem";

export const FormRicerca = ({tipoLista, setLista1, setLista2, datiLastSearch, setDatiLastSearch}) => {
  const formSession = useSelector((state) => state.formSession.value);
  const tipoItem = `cerca ${tipoLista}`;
  const header = `Ricerca ${tipoLista}`;
  
  useEffect(() => {
    aggiornamentoLista(tipoLista, setLista1, setLista2);
  }, []);

  return (
    <form onSubmit={(e) => eseguiRicerca(e, tipoLista, setLista1, setLista2, setDatiLastSearch)}>
      {formSession.view === "form" && (
        <FormItem tipoItem={tipoItem} item={datiLastSearch} header={header} setDatiLastSearch={setDatiLastSearch} />
      )}
      {(formSession.view === "row") && (
        <RowItem tipoItem={tipoItem} item={datiLastSearch} setDatiLastSearch={setDatiLastSearch} />
      )}
      {(formSession.view === "card") && (
        <CardItem tipoItem={tipoItem} item={datiLastSearch} header={header} setDatiLastSearch={setDatiLastSearch} />
      )}
    </form>
  );
}








