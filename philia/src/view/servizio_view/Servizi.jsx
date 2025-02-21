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
import servizioStore from "../../store/servizio_store/ServizioStore";
import { operazioniServizi } from "../../vario/Operazioni";
import { Items } from "../component/Items";
import { 
  getCampiRicercaServizi, getCampiServizioEsistente, 
  indiciRicercaServizi, indiciServizioEsistente
} from "./ServiziVario";

const Servizi = () => {
  const formSession = useSelector((state) => state.formSession.value);
  const itemSession = useSelector((state) => state.itemSession.value);

  const [servizi, setServizi] = useState(-1);
  const [selectedTrashCount, setSelectedTrashCount] = useState(0);
  const [selectedPencilCount, setSelectedPencilCount] = useState(0);
  const [selectedIdsEliminazione, setSelectedIdsEliminazione] = useState([]);
  const [selectedIdsModifica, setSelectedIdsModifica] = useState([]);
  const [datiRicerca, setDatiRicerca] = useState({
    nome: "", 
    prezzo_min: "",
    prezzo_max: "",  
    note: ""
  });
  
  const selectOperation = (icon, item) => {
    selectOperationBody(
      icon, item, selectedIdsModifica, setSelectedIdsModifica, selectedIdsEliminazione, setSelectedIdsEliminazione, 
      setSelectedPencilCount, setSelectedTrashCount
    )
  }

  const RicercaServiziTag = (formSession.view === "form") ? FormRicercaItems : (
    (formSession.view === "card") ? CardRicercaItems : RowRicercaItems
  )

  useEffect(() => {
    const onChange = () => setServizi(servizioStore.getServizi());
    servizioStore.addChangeListener(operazioniServizi.VISUALIZZA_SERVIZI, onChange);
    return () => {
      servizioStore.removeChangeListener(operazioniServizi.VISUALIZZA_SERVIZI, onChange);
    };
  }, []);

  return (
    <>
      <Header />

      <div className="main-content" />

      <RicercaServiziTag 
        campi={getCampiRicercaServizi(datiRicerca, (e) => handleInputChange(e, setDatiRicerca), null, null)} 
        indici={indiciRicercaServizi}
        eseguiRicerca={(e) => eseguiRicerca(e, "servizi", setServizi, datiRicerca)}
      />

      <br /> <br /> <br /> <br />
      
      <Items 
        tipoItem={"servizio"} 
        items={servizi} 
        setItems={setServizi}
        selectOperation={selectOperation}
        emptyIsConsidered={true} 
        campi={getCampiServizioEsistente}
        indici={indiciServizioEsistente}
      />

      <br /> <br /> <br /> <br />

      <OperazioniItems 
        selectedIdsModifica={selectedIdsModifica} 
        selectedIdsEliminazione={selectedIdsEliminazione}
        modifica={(e) => modifica(e, "servizio", selectedIdsModifica, setSelectedIdsModifica, servizi, setServizi)} 
        elimina={(e) => elimina(e, "servizio", selectedIdsEliminazione, setSelectedIdsEliminazione, servizi, setServizi)}
      />

      <br /> <br /> <br /> <br />
    </>
  );
}

export default Servizi;