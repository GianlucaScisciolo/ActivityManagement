// React e Redux
import React from "react";
// Riutilizzabile
import { FormNuovoItem, FormRicercaItems } from "./form_item/FormItem";
import { CardNuovoItem, CardRicercaItems } from "./card_item/CardItem";
import { RowNuovoItem, RowRicercaItems } from "./row_item/RowItem";
import { OperazioniItems } from "./Operazioni";
import { Items } from "./Items"

const SearchAndInsertPage = ({ componenti }) => {
  const stileState = componenti.stileState;

  const NuovoItemTag = (stileState.vistaForm === "form") ? FormNuovoItem : (
    (stileState.vistaForm === "card") ? CardNuovoItem : RowNuovoItem
  )

  const RicercaItemsTag = (stileState.vistaForm === "form") ? FormRicercaItems : (
    (stileState.vistaForm === "card") ? CardRicercaItems : RowRicercaItems
  )

  return (
    <>
      <NuovoItemTag 
        campi={componenti.campiNuovoItem}  
        indici={componenti.indiciNuovoItem} 
        eseguiSalvataggio={componenti.handleInsert} 
      />

      <br /> <br /> <br /> <br />

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
        handleBlurItem={componenti.handleBlurItem}
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

export default SearchAndInsertPage;









