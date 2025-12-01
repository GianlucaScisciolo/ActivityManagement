// React
import React from "react";
// Riutilizzabile
import { FormNuovoItem } from "./form_item/FormItem";
import { FormRicercaItems } from "./form_item/FormItem";
import { CardNuovoItem, CardRicercaItems } from "./card_item/CardItem";
import { RowNuovoItem, RowRicercaItems } from "./row_item/RowItem";
import { OperazioniItems } from "../riutilizzabile/Operazioni";
import { Items } from "../view/components/Items";

const PaginaWeb = ({ componenti }) => {
  const stileState = componenti.stileState;

  const NuovoItemTag = (stileState.vistaForm === "form") ? FormNuovoItem : (
    (stileState.vistaForm === "card") ? CardNuovoItem : RowNuovoItem
  )
  const RicercaItemsTag = (stileState.vistaForm === "form") ? FormRicercaItems : (
    (stileState.vistaForm === "card") ? CardRicercaItems : RowRicercaItems
  )

  return (
    <>
      {Object.entries(componenti).map(([key, value], index) => {
        return (
          <React.Fragment key={index}>
            {(key === "nuovo_item") && (
              <NuovoItemTag 
                campi={value.campi}  
                indici={value.indici} 
                eseguiSalvataggio={value.handle_insert} 
              />
            )}
            {(key === "ricerca_items") && (
              <RicercaItemsTag 
                campi={value.campi} 
                indici={value.indici}
                handleSearch={value.handle_search}
              />
            )}
            {(key === "items") && (
              <Items 
                tipoItem={value.tipo_item} 
                items={value.items} 
                setItems={value.set_items}
                selectOperation={value.select_operation}
                emptyIsConsidered={true} 
                campi={value.campi}
                indici={value.indici}
                servizi={value.servizi}
                handleBlurItem={value.handleBlurItem}
                lavoroActions={value.lavoroActions} 
              />
            )}                
            {(key === "operazioni_items") && (
              <OperazioniItems 
                selectedIdsModifica={value.selected_ids_modifica}
                selectedIdsEliminazione={value.selected_ids_eliminazione}
                handleEdit={value.handle_edit}
                handleDelete={value.handle_delete}
              />
            )}
            <br /> <br /> <br /> <br />
          </React.Fragment>
        );
      })}
    </>
  );
}

export default PaginaWeb;









