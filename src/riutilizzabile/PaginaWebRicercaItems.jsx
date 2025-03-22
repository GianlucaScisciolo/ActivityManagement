// React e Redux
import React from "react";
// Riutilizzabile
import { FormRicercaItems } from "./form_item/FormItem";
import { CardRicercaItems } from "./card_item/CardItem";
import { RowRicercaItems } from "./row_item/RowItem";
import { OperazioniItems } from "./Operazioni";
import { Items } from "./Items";

const PaginaWebRicercaItems = ({ componenti }) => {
  const stileSliceReducer = componenti.stileSliceReducer;

  const RicercaItemsTag = (stileSliceReducer.vistaForm === "form") ? FormRicercaItems : (
    (stileSliceReducer.vistaForm === "card") ? CardRicercaItems : RowRicercaItems
  )

  return (
    <>
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









