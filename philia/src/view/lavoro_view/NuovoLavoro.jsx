import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import Header from "../component/Header";
import PersonaAction from "../../action/persona_action/PersonaAction";
import personaStore from "../../store/persona_store/PersonaStore";
import ProfessionistaAction from "../../action/professionista_action/ProfessionistaAction";
import professionistaStore from "../../store/professionista_store/ProfessionistaStore";
import { operazioniPersone, operazioniProfessionisti } from "../../vario/Operazioni";
import FormItem from "../component/form_item/FormItem";
import { Items } from "../component/Items";
import { controlloLavoro } from "../../vario/Controlli";
import { FormNuovaData } from "../component/form_item/FormsLavori";
import { RowNuovaData } from "../component/row_item/RowsLavori";
import { CardNuovaData } from "../component/card_item/CardsLavori";

const NuovoLavoro = () => {
  const formSession = useSelector((state) => state.formSession.value);

  const [clienti, setClienti] = useState([]);
  const [professionisti, setProfessionisti] = useState([]);
  const [lavori, setLavori] = useState([]);

  // const [nuovoLavoro, setNuovoLavoro] = useState ({
  //   descrizione: "",
  //   giorno: "",
  //   orario_inizio: "",
  //   orario_fine: "",
  //   note: ""
  // });
  const [nuovoLavoro, setNuovoLavoro] = useState ({
    giorno: "",
    ora_inizio: "",
    minuto_inizio: "",
    ora_fine: "",
    minuto_fine: ""
  });

  const [errori, setErrori] = useState ({
    descrizione: "",
    giorno: "",
    orario_inizio: "",
    orario_fine: "",
    note: ""
  });

  const handleInsertLavoro = async (e) => {
    e.preventDefault();
  
    if (controlloLavoro(nuovoLavoro, setErrori) > 0) {
      return;
    }
  
    try {
      const response = await fetch('/INSERISCI_LAVORO', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(nuovoLavoro),
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        if (response.status === 409) {
          alert(errorData.message); // Mostra l'alert con il messaggio di errore specifico
        }
        else {
          throw new Error('Errore durante l\'inserimento del lavoro');
        }
      } else {
        // Non tentare di analizzare la risposta come JSON
        nuovoLavoro.note = (nuovoLavoro.note.split(' ').join('') === "") ? "Nota non inserita." : nuovoLavoro.note;
        
        setLavori(prevLavori => [...prevLavori, nuovoLavoro]);
        setNuovoLavoro(prevState => ({
          ...prevState,
          descrizione: "",
          giorno: "",
          orario_inizio: "",
          orario_fine: "",
          note: ""
        }));
      }
    } 
    catch (error) {
      console.error('Errore:', error);
      alert("C'è stato un errore durante l'inserimento del lavoro. Riprova più tardi.");
    }
  };
  
  useEffect(() => {
    const getClientiFiltrati = async () => {
      await PersonaAction.dispatchAction(null, operazioniPersone.OTTIENI_TUTTI_I_CLIENTI);
      const clientiFiltrati = personaStore.getClienti();
      // console.log(clientiFiltrati); // Visualizza i dati ottenuti
      setClienti(clientiFiltrati);
    };
  
    getClientiFiltrati();
    
    const onChange = () => setClienti(personaStore.getClienti());

    personaStore.addChangeListener(operazioniPersone.OTTIENI_TUTTI_I_CLIENTI, onChange);
      
    return () => personaStore.removeChangeListener(operazioniPersone.OTTIENI_TUTTI_I_CLIENTI, onChange);
  }, []);

  useEffect(() => {
    const getProfessionistiFiltrati = async () => {
      await ProfessionistaAction.dispatchAction(null, operazioniProfessionisti.OTTIENI_TUTTI_I_PROFESSIONISTI);
      const professionistiFiltrati = professionistaStore.getProfessionisti();
      setProfessionisti(professionistiFiltrati);
    };
  
    getProfessionistiFiltrati();
  
    const onChange = () => setProfessionisti(professionistaStore.getProfessionisti());
    
    professionistaStore.addChangeListener(operazioniProfessionisti.OTTIENI_TUTTI_I_PROFESSIONISTI, onChange);
  
    return () => professionistaStore.removeChangeListener(operazioniProfessionisti.OTTIENI_TUTTI_I_PROFESSIONISTI, onChange);
  }, []);

  return (
    <>
      <Header />

      <div className="main-content" />
      
      {formSession.view === "form" && (
        <FormNuovaData item={nuovoLavoro} setItem={setNuovoLavoro} eseguiSalvataggio={(e) => eseguiSalvataggio(e, setErrori)} />
      )}
      {formSession.view === "row" && (
        <RowNuovaData item={nuovoLavoro} setItem={setNuovoLavoro} eseguiSalvataggio={(e) => eseguiSalvataggio(e, setErrori)} />
      )}
      {(formSession.view === "card") && (
        <center>
          <CardNuovaData item={nuovoLavoro} setItem={setNuovoLavoro} eseguiSalvataggio={(e) => eseguiSalvataggio(e, setErrori)} />
        </center>
      )}

      {(lavori.length > 0) && (
        <>
          <div className="main-content" />
          <Items tipoItem={"lavoro"} items={lavori} setterItems={setLavori} errori={errori} setErrori={setErrori}/>    
        </>
      )}
    </>
  );
}

export default NuovoLavoro;









