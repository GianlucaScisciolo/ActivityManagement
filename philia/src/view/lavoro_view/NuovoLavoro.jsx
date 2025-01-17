import React, { useState, useEffect } from 'react';
import Header from '../component/Header';
import LavoroAction from '../../action/lavoro_action/LavoroAction';
import PersonaAction from '../../action/persona_action/PersonaAction';
import ProfessionistaAction from '../../action/professionista_action/ProfessionistaAction';
import personaStore from '../../store/persona_store/PersonaStore';
import professionistaStore from '../../store/professionista_store/ProfessionistaStore';
import lavoroStore from '../../store/lavoro_store/LavoroStore';
import { operazioniPersone, operazioniProfessionisti, operazioniLavori } from '../../vario/Operazioni';
import { controlloLavoro } from '../../vario/Controlli';
import Row from 'react-bootstrap/esm/Row';
import Col from 'react-bootstrap/esm/Col';
import CardItem from '../component/card_item/CardItem';
import { useSelector } from 'react-redux';
import RowItem from '../component/row_item/RowItem';
import FormItem from '../component/form_item/FormItem';
import { Items } from '../component/Items';

const NuovoLavoro = () => {
  const formSession = useSelector((state) => state.formSession.value);

  const [nuovoLavoro, setNuovoLavoro] = useState ({
    lavoro_cliente_selezionato: false, 
    lavoro_professionista_selezionato: false,
    id_cliente: 0,
    id_professionista: 0,
    descrizione: "",
    giorno: "",
    orario_inizio: "",
    orario_fine: "",
    note: ""
  });

  const [nuovoLavoroCliente, setNuovoLavoroCliente] = useState ({
    tipo_lavoro: "Lavoro cliente",
    id_cliente: 0,
    descrizione: "",
    giorno: "",
    orario_inizio: "",
    orario_fine: "",
    note: ""
  });

  const [nuovoLavoroProfessionista, setNuovoLavoroProfessionista] = useState ({
    tipo_lavoro: "Lavoro professionista",
    id_professionista: 0,
    descrizione: "",
    giorno: "",
    orario_inizio: "",
    orario_fine: "",
    note: ""
  });

  const [errori, setErrori] = useState ({
    cliente_e_professionista: "Errore cliente e professionista",
    descrizione: "Errore descrizione",
    giorno: "Errore giorno",
    orario_inizio: "Errore orario inizio",
    orario_fine: "Errore orario fine",
    note: "Errore note"
  });

  const [clienti, setClienti] = useState([]);
  const [professionisti, setProfessionisti] = useState([]);
  const [lavori, setLavori] = useState([]);
  const [filteredClienti, setFilteredClienti] = useState([]);
  const [searchTermCliente, setSearchTermCliente] = useState('');
  const [searchTermProfessionista, setSearchTermProfessionista] = useState('');
  const [selectedCliente, setSelectedCliente] = useState('');
  const [selectedClienteId, setSelectedClienteId] = useState('');
  const [filteredProfessionisti, setFilteredProfessionisti] = useState([]);
  const [selectedProfessionista, setSelectedProfessionista] = useState('');
  const [selectedProfessionistaId, setSelectedProfessionistaId] = useState('');
  
  const handleInsert = async (nuovoLavoro, setNuovoLavoro, setLavori) => {
    if (confirm("Sei sicuro di voler salvare il lavoro?")) {
      nuovoLavoro.id_cliente === (!nuovoLavoro.tipoLavoro === "Lavoro cliente") ? 0 : nuovoLavoro.id_cliente;
      nuovoLavoro.id_professionista === (!nuovoLavoro.tipoLavoro === "Lavoro profesionista") ? 0 : nuovoLavoro.id_professionista; 
      if (controlloLavoro(nuovoLavoro, setErrori) > 0) 
        return;

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
        }
        else {
          const result = await response.json();

          nuovoLavoro.note = (nuovoLavoro.note.split(' ').join('') === "") ? "Nota non inserita." : nuovoLavoro.note;
          nuovoLavoro["tipo_lavoro"] = (nuovoLavoro.id_cliente > 0) ? "Lavoro cliente" : "Lavoro professionista";
          if(nuovoLavoro.tipo_lavoro === "Lavoro cliente") {
            for(let i = 0; i < clienti.length; i++) {
              // console.log(professionisti[i].id.toString() + " - " + nuovoLavoro.id_professionista.toString());
              if(clienti[i].id.toString() === nuovoLavoro.id_cliente.toString()) {
                nuovoLavoro["nome_cliente"] = clienti[i].nome;
                nuovoLavoro["cognome_cliente"] = clienti[i].cognome;
                break; 
              }
              // console.log("   " + professionisti[i].id + "\n");
            }
          }
          else if(nuovoLavoro.tipo_lavoro === "Lavoro professionista") {
            for(let i = 0; i < professionisti.length; i++) {
              // console.log(professionisti[i].id.toString() + " - " + nuovoLavoro.id_professionista.toString());
              if(professionisti[i].id.toString() === nuovoLavoro.id_professionista.toString()) {
                nuovoLavoro["nome_professionista"] = professionisti[i].nome;
                nuovoLavoro["professione"] = professionisti[i].professione;
                break; 
              }
              // console.log("   " + professionisti[i].id + "\n");
            }
          }
          setLavori(prevLavori => [...prevLavori, nuovoLavoro]);
          setNuovoLavoro(prevState => ({
            ...prevState,
            id_cliente: 0,
            id_professionista: 0,
            descrizione: "",
            giorno: "",
            orario_inizio: "",
            orario_fine: "",
            note: ""
          }));
          alert("L'inserimento del lavoro è andato a buon fine!!");
        }
      } 
      catch (error) {
        console.error('Errore:', error);
        alert("C'è stato un errore durante l'inserimento del lavoro. Riprova più tardi.");
      }
    }
    else {
      alert("Salvataggio annullato.");
    }
  };
  
  useEffect(() => {
    const fetchClienti = async () => {
      await PersonaAction.dispatchAction(null, operazioniPersone.OTTIENI_TUTTI_I_CLIENTI);
      const clientiAggiornati = personaStore.getClienti();
      console.log(clientiAggiornati); // Aggiungi questo per vedere cosa viene restituito
      setClienti(clientiAggiornati);
    };
  
    fetchClienti();
  
    const onChange = () => {
      const nuoviClienti = personaStore.getClienti();
      console.log(nuoviClienti); // Aggiungi questo per vedere lo stato aggiornato
      setClienti(nuoviClienti);
    };
    personaStore.addChangeListener(operazioniPersone.OTTIENI_TUTTI_I_CLIENTI, onChange);
  
    return () => {
      personaStore.removeChangeListener(operazioniPersone.OTTIENI_TUTTI_I_CLIENTI, onChange);
    };
  }, []);
  

  useEffect(() => {
    const fetchProfessionisti = async () => {
      await ProfessionistaAction.dispatchAction(null, operazioniProfessionisti.OTTIENI_TUTTI_I_PROFESSIONISTI);
      const professionistiAggiornati = professionistaStore.getProfessionisti();
      setProfessionisti(professionistiAggiornati);
    };

    fetchProfessionisti();

    const onChange = () => setProfessionisti(professionistaStore.getProfessionisti());
    professionistaStore.addChangeListener(operazioniProfessionisti.OTTIENI_TUTTI_I_PROFESSIONISTI, onChange);

    return () => {
      professionistaStore.removeChangeListener(operazioniProfessionisti.OTTIENI_TUTTI_I_PROFESSIONISTI, onChange);
    };
  }, []);

  const onChangeCliente = (e) => {
    const value = e.target.value.toLowerCase();
    setSearchTermCliente(value);
    const clientiValidi = clienti.filter(cliente =>
      `${cliente.cognome} ${cliente.nome} - ${cliente.contatto}`.toLowerCase().includes(value)
    );
    setFilteredClienti(clientiValidi);
    setSelectedCliente(value);
  };

  const handleClienteClick = (e, cliente) => {
    e.preventDefault();
    setSelectedCliente(`${cliente.cognome} ${cliente.nome}`);
    setSelectedClienteId(`${cliente.id}`);
    setSearchTermCliente('');
  };

  const onChangeProfessionista = (e) => {
    const value = e.target.value.toLowerCase();
    setSearchTermProfessionista(value);
    const professionistiValidi = professionisti.filter(professionista =>
      `${professionista.nome} - ${professionista.professione} - ${professionista.contatto} - ${professionista.email}`.toLowerCase().includes(value) 
    );
    setFilteredProfessionisti(professionistiValidi);
  };

  const handleProfessionistaClick = (e, professionista) => {
    e.preventDefault();
    setSelectedProfessionista(`${professionista.nome} ${professionista.professione}`);
    setSelectedProfessionistaId(`${professionista.id}`);
    setSearchTermProfessionista('');
  };

  const eseguiSalvataggio = (e, tipoLavoro, setErrori) => {
    e.preventDefault();
    // alert(tipoLavoro);
    if(tipoLavoro === "Lavoro") {
      handleInsert(nuovoLavoro, setNuovoLavoro, setLavori, setErrori);
    }
    else if(tipoLavoro === "Lavoro cliente") {
      handleInsert(nuovoLavoroCliente, setNuovoLavoroCliente, setLavori, setErrori);
    }
    else if(tipoLavoro === "Lavoro professionista") {
      handleInsert(nuovoLavoroProfessionista, setNuovoLavoroProfessionista, setLavori, setErrori);
    }
  }

  return (
    <>
      <Header />
      <div className="main-content"></div>
      
      <form>
        {formSession.view === "form" && (
          <>
            <FormItem errori={errori} setErrori={setErrori} clienti={clienti} professionisti={professionisti} tipoItem={"nuovo lavoro"} item={nuovoLavoro} setItem={setNuovoLavoro} header="Nuovo lavoro" eseguiSalvataggio={(e) => eseguiSalvataggio(e, "Lavoro", setErrori)} />
          </>
        )}
        {formSession.view === "row" && (
          <>
            <RowItem errori={errori} setErrori={setErrori} clienti={clienti} tipoLavoro={"Lavoro cliente"} tipoItem={"nuovo lavoro"} item={nuovoLavoroCliente} setItem={setNuovoLavoroCliente} eseguiSalvataggio={(e) => eseguiSalvataggio(e, nuovoLavoroCliente.tipo_lavoro, setErrori)} />
            <RowItem errori={errori} setErrori={setErrori} professionisti={professionisti} tipoLavoro={"Lavoro professionista"} tipoItem={"nuovo lavoro"} item={nuovoLavoroProfessionista} setItem={setNuovoLavoroProfessionista} eseguiSalvataggio={(e) => eseguiSalvataggio(e, nuovoLavoroProfessionista.tipo_lavoro, setErrori)} />
          </>
        )}
        {(formSession.view === "card") && (
          <>
          <Row style={{ display: 'flex', justifyContent: 'center' }}>
            <CardItem errori={errori} setErrori={setErrori} clienti={clienti} tipoLavoro={"Lavoro cliente"} tipoItem={"nuovo lavoro"} item={nuovoLavoroCliente} setItem={setNuovoLavoroCliente} header="Nuovo lavoro cliente" eseguiSalvataggio={(e) => eseguiSalvataggio(e, nuovoLavoroCliente.tipo_lavoro, setErrori)} />
            &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
            <CardItem errori={errori} setErrori={setErrori} professionisti={professionisti} tipoLavoro={"Lavoro professionista"} tipoItem={"nuovo lavoro"} item={nuovoLavoroProfessionista} setItem={setNuovoLavoroProfessionista} header="Nuovo lavoro professionista" eseguiSalvataggio={(e) => eseguiSalvataggio(e, nuovoLavoroProfessionista.tipo_lavoro, setErrori)} />
          </Row>
          </>
        )}
      </form>

      {(lavori.length > 0) && (
        <>
          <div className="main-content"></div>
          <Items tipoItem={"lavoro"} items={lavori} setterItems={setLavori} errori={errori} setErrori={setErrori}/>    
        </>
      )}
    </>
  );
};

export default NuovoLavoro;
