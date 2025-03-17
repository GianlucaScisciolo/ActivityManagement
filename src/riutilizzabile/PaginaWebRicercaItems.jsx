import React from "react";
import { useSelector } from "react-redux";
import { FormRicercaItems } from "./form_item/FormItem";
import { CardRicercaItems } from "./card_item/CardItem";
import { RowRicercaItems } from "./row_item/RowItem";
import Header from "../view/component/Header";
import { Items } from "../view/component/Items";
import { OperazioniItems } from "../view/component/Operazioni";

const PaginaWebRicercaItems = ({ componenti }) => {
  const formSession = useSelector((state) => state.formSession.value);

  const RicercaItemsTag = (formSession.view === "form") ? FormRicercaItems : (
    (formSession.view === "card") ? CardRicercaItems : RowRicercaItems
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









