import React from "react";
import { useSelector } from "react-redux";
import { FormRicercaItems } from "./form_item/FormItem";
import { CardRicercaItems } from "./card_item/CardItem";
import { RowRicercaItems } from "./row_item/RowItem";
import Header from "../view/components/Header";
import { Items } from "../view/components/Items";
import { OperazioniItems } from "../view/components/Operazioni";

const PaginaWebRicercaItems = ({ componenti }) => {
  const formSliceReducer = useSelector((state) => state.formSliceReducer.value);

  const RicercaItemsTag = (formSliceReducer.view === "form") ? FormRicercaItems : (
    (formSliceReducer.view === "card") ? CardRicercaItems : RowRicercaItems
  )

  return (
    <>
      <Header />

      <div className="main-content" />

      <RicercaItemsTag 
        campi={componenti.campiRicercaItems} 
        indici={componenti.indiciRicercaItems}
        handleSearch={componenti.handleSearch}
      />

      <br /> <br /> <br /> <br />

      <Items 
        tipoItem={componenti.tipoItem} 
        items={componenti.items} 
        setItems={componenti.setItems}
        selectOperation={componenti.selectOperation}
        emptyIsConsidered={true} 
        campi={componenti.campiItemEsistente}
        indici={componenti.indiciItemEsistente}
        servizi={componenti.servizi}
      />

      <br /> <br /> <br /> <br />

      <OperazioniItems 
        selectedIdsModifica={componenti.selectedIdsModifica}
        selectedIdsEliminazione={componenti.selectedIdsEliminazione}
        handleEdit={componenti.handleEdit}
        handleDelete={componenti.handleDelete}
      />

      <br /> <br /> <br /> <br />
    </>
  );
}

export default PaginaWebRicercaItems;









