import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import Header from "../component/Header";
import { OperazioniItems, selectOperationBody } from "../component/Operazioni";
import { elimina } from "../../vario/OperazioniEliminazione";
import { modifica } from "../../vario/OperazioniModifica";
import { handleInputChange } from "../../vario/Vario";
import { eseguiRicerca } from "../../vario/OperazioniRicerca";
import { FormRicercaItems } from "../../trasportabile/form_item/FormItem";
import { CardRicercaItems } from "../../trasportabile/card_item/CardItem";
import { RowRicercaItems } from "../../trasportabile/row_item/RowItem";
import saloneStore from "../../store/salone_store/SaloneStore";
import { operazioniSaloni } from "../../vario/Operazioni";
import { Items } from "../component/Items";
import { 
  getCampiRicercaSpese, getCampiSpesaEsistente, 
  indiciRicercaSpese, indiciSpesaEsistente
} from "./SpeseVario";

const Spese = () => {
  const formSession = useSelector((state) => state.formSession.value);
  const itemSession = useSelector((state) => state.itemSession.value);
  const speseSession = useSelector((state) => state.speseSession.value);
  
  const [spese, setSpese] = useState(speseSession.spese);
  const [selectedTrashCount, setSelectedTrashCount] = useState(0);
  const [selectedPencilCount, setSelectedPencilCount] = useState(0);
  const [selectedIdsEliminazione, setSelectedIdsEliminazione] = useState([]);
  const [selectedIdsModifica, setSelectedIdsModifica] = useState([]);
  const [datiRicerca, setDatiRicerca] = useState({
    nome: "", 
    descrizione: "", 
    totale_min: "",
    totale_max: "",  
    primo_giorno: "", 
    ultimo_giorno: "", 
    note: ""
  });
  
  const selectOperation = (icon, item) => {
    selectOperationBody(
      icon, item, selectedIdsModifica, setSelectedIdsModifica, selectedIdsEliminazione, setSelectedIdsEliminazione, 
      setSelectedPencilCount, setSelectedTrashCount
    )
  }

  const RicercaSpeseTag = (formSession.view === "form") ? FormRicercaItems : (
    (formSession.view === "card") ? CardRicercaItems : RowRicercaItems
  )

  useEffect(() => {
    const onChange = () => setSpese(saloneStore.getSpese());
    saloneStore.addChangeListener(operazioniSaloni.VISUALIZZA_SPESE, onChange);
    return () => {
      saloneStore.removeChangeListener(operazioniSaloni.VISUALIZZA_SPESE, onChange);
    };
  }, []);

  return (
    <>
      <Header />

      <div className="main-content" />

      <RicercaSpeseTag 
        campi={getCampiRicercaSpese(datiRicerca, (e) => handleInputChange(e, setDatiRicerca), null, null)} 
        indici={indiciRicercaSpese}
        eseguiRicerca={(e) => eseguiRicerca(e, "spese", setSpese, datiRicerca)}
      />

      <br /> <br /> <br /> <br />
      
      <Items 
        tipoItem={"spesa"} 
        items={spese} 
        setItems={setSpese}
        selectOperation={selectOperation}
        emptyIsConsidered={true} 
        campi={getCampiSpesaEsistente}
        indici={indiciSpesaEsistente}
        servizi={null}
      />

      <br /> <br /> <br /> <br />

      <OperazioniItems 
        selectedIdsModifica={selectedIdsModifica} 
        selectedIdsEliminazione={selectedIdsEliminazione}
        modifica={(e) => modifica(e, "spesa", selectedIdsModifica, setSelectedIdsModifica, spese, setSpese)} 
        elimina={(e) => elimina(e, "spesa", selectedIdsEliminazione, setSelectedIdsEliminazione, spese, setSpese)}
      /> 

        {/* 
        */}
      <br /> <br /> <br /> <br />
    </>
  );
}

export default Spese;