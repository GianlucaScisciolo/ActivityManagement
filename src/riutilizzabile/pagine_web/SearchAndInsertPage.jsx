// React
import { useState } from "react";
// Riutilizzabile
import { CambioTipoForm, FormNuovoItem, FormRicercaItems } from "../form_item/FormItem";
import { CardNuovoItem, CardRicercaItems } from "../card_item/CardItem";
import { RowNuovoItem, RowRicercaItems } from "../row_item/RowItem";
import { OperazioniItems } from "../Operazioni";
import { Items } from "../Items"
import StyledComponents from "../form_item/StyledFormItem";

const SearchAndInsertPage = ({ componenti, vistaItem, vistaForm }) => {
  const [tipoForm, setTipoForm] = useState("search");

  const NuovoItemTag = (vistaForm === "form") ? FormNuovoItem : (
    (vistaForm === "card") ? CardNuovoItem : RowNuovoItem
  )

  const RicercaItemsTag = (vistaForm === "form") ? FormRicercaItems : (
    (vistaForm === "card") ? CardRicercaItems : RowRicercaItems
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
        campi={componenti.campiItemEsistente}
        handleBlurItem={componenti.handleBlurItem}
        tipoForm={tipoForm}
        vistaItem={vistaItem}
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









