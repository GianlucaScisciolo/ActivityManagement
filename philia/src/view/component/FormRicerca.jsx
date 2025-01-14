import { useState, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { aggiornamentoLista, eseguiRicerca } from "../../vario/OperazioniRicerca";
import Row from 'react-bootstrap/esm/Row';
import Col from 'react-bootstrap/esm/Col';
import CardItem from "../component/card_item/CardItem";
import RowItem from "./row_item/RowItem";
import FormItem from "./form_item/FormItem";

export const FormRicerca = ({tipoLista, setLista1, setLista2, datiRicerca, setDatiRicerca}) => {
  const formSession = useSelector((state) => state.formSession.value);
  const tipoItem = `cerca ${tipoLista}`;
  const header = `Ricerca ${tipoLista}`;
  
  useEffect(() => {
    aggiornamentoLista(tipoLista, setLista1, setLista2);
  }, []);

  const prova = (e, txt) => {
    e.preventDefault();
    alert(txt);
  }

  return (
    <form>
      {formSession.view === "form" && (
        <FormItem   tipoItem={tipoItem} item={datiRicerca} setItem={setDatiRicerca} header={header} eseguiRicerca={(e) => eseguiRicerca(e, tipoLista, setLista1, setLista2, datiRicerca)} />
      )}
      {(formSession.view === "row") && (
        <RowItem    tipoItem={tipoItem} item={datiRicerca} setItem={setDatiRicerca}                 eseguiRicerca={(e) => eseguiRicerca(e, tipoLista, setLista1, setLista2, datiRicerca)} />
      )}
      {(formSession.view === "card") && (
        <center>
          <CardItem tipoItem={tipoItem} item={datiRicerca} setItem={setDatiRicerca} header={header} eseguiRicerca={(e) => eseguiRicerca(e, tipoLista, setLista1, setLista2, datiRicerca)} />
        </center>
      )}
    </form>
  );
}








