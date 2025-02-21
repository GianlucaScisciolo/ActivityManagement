import React, { useState, useEffect } from 'react';
import Header from '../component/Header';
import { elimina } from '../../vario/OperazioniEliminazione';
import { modifica } from '../../vario/OperazioniModifica';
import { useSelector, useDispatch } from 'react-redux';
import personaStore from '../../store/persona_store/PersonaStore';
import { operazioniPersone } from '../../vario/Operazioni';
import { FormRicercaItems } from '../../trasportabile/form_item/FormItem';
import { CardRicercaItems } from '../../trasportabile/card_item/CardItem';
import { RowRicercaItems } from '../../trasportabile/row_item/RowItem';
import { CardClienteEsistente } from '../component/card_item/CardsClienti';
import { RowClienteEsistente } from '../component/row_item/RowsClienti';
import { eseguiRicerca } from '../../vario/OperazioniRicerca';
import { Items } from '../component/Items';
import { OperazioniItems, selectOperationBody } from '../component/Operazioni';
import { 
  getCampiRicercaClienti, getCampiClienteEsistente, 
  indiciRicercaClienti, indiciClienteEsistente
} from './ClientiVario';
import { handleInputChange } from '../../vario/Vario';

const Clienti = () => {
  const [clienti, setClienti] = useState(-1);
  const [selectedTrashCount, setSelectedTrashCount] = useState(0);
  const [selectedPencilCount, setSelectedPencilCount] = useState(0);
  const [selectedIdsEliminazione, setSelectedIdsEliminazione] = useState([]);
  const [selectedIdsModifica, setSelectedIdsModifica] = useState([]);

  const formSession = useSelector((state) => state.formSession.value);
  const itemSession = useSelector((state) => state.itemSession.value);
  
  const [datiRicerca, setDatiRicerca] = useState({
    nome: "", 
    cognome: "", 
    contatto: "", 
    email: "", 
    note: ""
  });

  const selectOperation = (icon, item) => {
    selectOperationBody(
      icon, item, selectedIdsModifica, setSelectedIdsModifica, selectedIdsEliminazione, setSelectedIdsEliminazione, 
      setSelectedPencilCount, setSelectedTrashCount
    )
  }

  useEffect(() => {
    const onChange = () => setClienti(personaStore.getClienti());
    personaStore.addChangeListener(operazioniPersone.VISUALIZZA_CLIENTI, onChange);
    return () => {
      personaStore.removeChangeListener(operazioniPersone.VISUALIZZA_CLIENTI, onChange);
    };
  }, []);

  const RicercaClientiTag = (formSession.view === "form") ? FormRicercaItems : (
    (formSession.view === "card") ? CardRicercaItems : RowRicercaItems
  )
  
  return (
    <>
      <Header />

      <div className="main-content" />
      
      <RicercaClientiTag 
        campi={getCampiRicercaClienti(datiRicerca, (e) => handleInputChange(e, setDatiRicerca), null, null)} 
        indici={indiciRicercaClienti}
        eseguiRicerca={(e) => eseguiRicerca(e, "clienti", setClienti, datiRicerca)}
      />

      <br /> <br /> <br /> <br />
      
      <Items 
        tipoItem={"cliente"} 
        items={clienti} 
        setItems={setClienti}
        selectOperation={selectOperation}
        emptyIsConsidered={true} 
        campi={getCampiClienteEsistente}
        indici={indiciClienteEsistente}
      />

      <br /> <br /> <br /> <br />
      
      <OperazioniItems 
        selectedIdsModifica={selectedIdsModifica} 
        selectedIdsEliminazione={selectedIdsEliminazione}
        modifica={(e) => modifica(e, "cliente", selectedIdsModifica, setSelectedIdsModifica, clienti, setClienti)} 
        elimina={(e) => elimina(e, "cliente", selectedIdsEliminazione, setSelectedIdsEliminazione, clienti, setClienti)}
      />
      
      <br /> <br /> <br /> <br />
    </>
  );
}

export default Clienti;









