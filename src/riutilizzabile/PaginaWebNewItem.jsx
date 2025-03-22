// React e Redux
import React from "react";
// Riutilizzabile
import { FormNuovoItem } from "./form_item/FormItem";
import { CardNuovoItem } from "./card_item/CardItem";
import { RowNuovoItem } from "./row_item/RowItem";
import { OperazioniItems } from "./Operazioni";
import { Items } from "./Items"

const PaginaWebNewItem = ({ componenti }) => {
  const stileSliceReducer = componenti.stileSliceReducer;

  const NuovoItemTag = (stileSliceReducer.vistaForm === "form") ? FormNuovoItem : (
    (stileSliceReducer.vistaForm === "card") ? CardNuovoItem : RowNuovoItem
  )

  return (
    <>
      <NuovoItemTag 
        campi={componenti.campiNuovoItem}  
        indici={componenti.indiciNuovoItem} 
        eseguiSalvataggio={componenti.handleInsert} 
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
        lavoroActions={componenti.lavoroActions} // DA VEDERE !!!!
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

export default PaginaWebNewItem;









