import React from "react";
import { useSelector } from "react-redux";
import { FormNuovoItem } from "./form_item/FormItem";
import { CardNuovoItem } from "./card_item/CardItem";
import { RowNuovoItem } from "./row_item/RowItem";
import Header from "../view/component/Header";
import { Items } from "../view/component/Items"
import { OperazioniItems } from "../view/component/Operazioni";

const PaginaWebNewItem = ({ componenti }) => {
  const formReducer = useSelector((state) => state.formReducer.value);

  const NuovoItemTag = (formReducer.view === "form") ? FormNuovoItem : (
    (formReducer.view === "card") ? CardNuovoItem : RowNuovoItem
  )

  return (
    <>
      <Header />

      <div className="main-content" />

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









