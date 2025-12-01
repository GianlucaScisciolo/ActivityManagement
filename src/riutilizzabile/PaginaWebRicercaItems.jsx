// Riutilizzabile
import { FormRicercaItems } from "./form_item/FormItem";
import { CardRicercaItems } from "./card_item/CardItem";
import { RowRicercaItems } from "./row_item/RowItem";
import { OperazioniItems } from "./Operazioni";
import { Items } from "./Items";

const PaginaWebRicercaItems = ({ componenti }) => {
  const stileState = componenti.stileState;

  const RicercaItemsTag = (stileState.vistaForm === "form") ? FormRicercaItems : (
    (stileState.vistaForm === "card") ? CardRicercaItems : RowRicercaItems
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
        handleBlurItem={componenti.handleBlurItem}
        lavoroActions={componenti.lavoroActions}
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









