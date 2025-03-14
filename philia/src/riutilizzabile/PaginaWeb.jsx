import React from "react";
import { useSelector } from "react-redux";
import Header from "../app/app_view/component/Header";
import { FormNuovoItem } from "./form_item/FormItem";
import { FormRicercaItems } from "./form_item/FormItem";
import { CardNuovoItem } from "./card_item/CardItem";
import { CardRicercaItems } from "./card_item/CardItem";
import { RowNuovoItem } from "./row_item/RowItem";
import { RowRicercaItems } from "./row_item/RowItem";
import { Items } from "../app/app_view/component/Items";
import { OperazioniItems } from "../app/app_view/component/Operazioni";

const PaginaWeb = ({ componenti }) => {
  const formSession = useSelector((state) => state.formSession.value);

  const NuovoItemTag = (formSession.view === "form") ? FormNuovoItem : (
    (formSession.view === "card") ? CardNuovoItem : RowNuovoItem
  )
  const RicercaItemsTag = (formSession.view === "form") ? FormRicercaItems : (
    (formSession.view === "card") ? CardRicercaItems : RowRicercaItems
  )

  return (
    <>
      <Header />

      <div className="main-content" />

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









