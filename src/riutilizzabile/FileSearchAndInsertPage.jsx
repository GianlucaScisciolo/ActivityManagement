// React e Redux
import React, {useState} from "react";
// Riutilizzabile
import { CambioTipoForm2, FormNuovoItem, FormRicercaItems, FormFileItems } from "./form_item/FormItem";
import { CardNuovoItem, CardRicercaItems, CardFileItems, CardInformazioni } from "./card_item/CardItem";
import { RowNuovoItem, RowRicercaItems, RowFileItems } from "./row_item/RowItem";
import { OperazioniItems } from "./Operazioni";
import { Items } from "./Items"

const FileSearchAndInsertPage = ({ componenti }) => {
  const stileState = componenti.stileState;
  const [tipoForm, setTipoForm] = useState("search");

  const NuovoItemTag = (stileState.vistaForm === "form") ? FormNuovoItem : (
    (stileState.vistaForm === "card") ? CardNuovoItem : RowNuovoItem
  )

  const RicercaItemsTag = (stileState.vistaForm === "form") ? FormRicercaItems : (
    (stileState.vistaForm === "card") ? CardRicercaItems : RowRicercaItems
  )

  const FormFileTag = (stileState.vistaForm === "form") ? FormFileItems : (
    (stileState.vistaForm === "card") ? CardFileItems : RowFileItems
  );

  return (
    <>
      <CambioTipoForm2 
        tipoForm={tipoForm}
        setTipoForm={setTipoForm}
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

      {(tipoForm === "file") && (
        <>
          <FormFileTag 
            campi={componenti.campiFile} 
            indici={componenti.indiciFile}
            ottieniFileRangePDF={componenti.handleSearchRangeFilePDF}
            ottieniFileRangeExcel={componenti.handleSearchRangeFileExcel}
            eliminaItemsRange={componenti.handleDeleteRangeFile}
          />
          
          <br /> <br /> <br /> <br />
        </>
      )}
      {(tipoForm !== "file") && (
        <>
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
            tipoForm={tipoForm}
          />

          <br /> <br /> <br /> <br />

          {componenti.visualizzazioneInformazioni === true && componenti.items.length > 0 && (
            <>
              <center>
                <CardInformazioni 
                  totaleItems={componenti.totaleItems}
                  // totaleItems={"totale: 10.00 €"}
                />
              </center>

              <br /> <br /> <br /> <br />
            </>
          )}

          <OperazioniItems 
            selectedIdsModifica={componenti.selectedIdsModifica}
            selectedIdsEliminazione={componenti.selectedIdsEliminazione}
            handleEdit={componenti.handleEdit}
            handleDelete={componenti.handleDelete}
          />

          <br /> <br /> <br /> <br />
        </>
      )}
    </>
  );
}

export default FileSearchAndInsertPage;









