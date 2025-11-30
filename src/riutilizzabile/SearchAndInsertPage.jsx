// React e Redux
import React, { useState, useEffect } from "react";
// Riutilizzabile
import { CambioTipoForm, FormNuovoItem, FormRicercaItems } from "./form_item/FormItem";
import { CardNuovoItem, CardRicercaItems } from "./card_item/CardItem";
import { RowNuovoItem, RowRicercaItems } from "./row_item/RowItem";
import { OperazioniItems } from "./Operazioni";
import { Items } from "./Items"
import StyledComponents from "./form_item/StyledFormItem";

const SearchAndInsertPage = ({ componenti }) => {
  const stileState = componenti.stileState;
  const [tipoForm, setTipoForm] = useState("search");

  const NuovoItemTag = (stileState.vistaForm === "form") ? FormNuovoItem : (
    (stileState.vistaForm === "card") ? CardNuovoItem : RowNuovoItem
  )

  const RicercaItemsTag = (stileState.vistaForm === "form") ? FormRicercaItems : (
    (stileState.vistaForm === "card") ? CardRicercaItems : RowRicercaItems
  )

  return (
    <>
      <CambioTipoForm 
        tipoForm={tipoForm}
        setTipoForm={setTipoForm}
        StyledComponents={StyledComponents}
      />

      <br /> <br /> <br /> <br />

      {(tipoForm === "insert") && (
        <>
          <NuovoItemTag 
            campi={componenti.campiNuovoItem}  
            indici={componenti.indiciNuovoItem} 
            eseguiSalvataggio={componenti.handleInsert} 
          />

          <br /> <br /> <br /> <br />
        </>
      )}

      {(tipoForm === "search") && (
        <>
          <RicercaItemsTag 
            campi={componenti.campiRicercaItems} 
            indici={componenti.indiciRicercaItems}
            handleSearch={componenti.handleSearch}
          />
          
          <br /> <br /> <br /> <br />
        </>
      )}

      <Items 
        tipoItem={componenti.tipoItem} 
        items={componenti.items} 
        setItems={componenti.setItems}
        selectOperation={componenti.selectOperation}
        emptyIsConsidered={true} 
        campi={componenti.campiItemEsistente}
        servizi={componenti.servizi}
        handleBlurItem={componenti.handleBlurItem}
        lavoroActions={componenti.lavoroActions} // DA VEDERE !!!!
        tipoForm={tipoForm}
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









