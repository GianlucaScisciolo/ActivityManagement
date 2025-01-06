import React, { useState, useEffect } from 'react';
import Header from '../component/Header';
import LavoroAction from '../../action/lavoro_action/LavoroAction';
import PersonaAction from '../../action/persona_action/PersonaAction';
import ProfessionistaAction from '../../action/professionista_action/ProfessionistaAction';
import personaStore from '../../store/persona_store/PersonaStore';
import professionistaStore from '../../store/professionista_store/ProfessionistaStore';
import lavoroStore from '../../store/lavoro_store/LavoroStore';
import { operazioniPersone, operazioniProfessionisti, operazioniLavori } from '../../vario/Operazioni';
import { controlloNuovoLavoro } from '../../vario/Controlli';
import Row from 'react-bootstrap/esm/Row';
import Col from 'react-bootstrap/esm/Col';
import CardItem from '../component/card_item/CardItem';
import { useSelector } from 'react-redux';

const NuovoLavoro = () => {
  const formSession = useSelector((state) => state.formSession.value);

  const [errori, setErrori] = useState ({
    erroreCliente: "",
    erroreProfessionista: "",
    erroreClienteEProfessionista: "",
    erroreDescrizione: "",
    erroreGiorno: "",
    erroreOrarioInizio: "",
    erroreOrarioFine: "",
    erroreOrari: "",
    erroreNote: ""
  })
  const [clienti, setClienti] = useState([]);
  const [professionisti, setProfessionisti] = useState([]);
  const [filteredClienti, setFilteredClienti] = useState([]);
  const [searchTermCliente, setSearchTermCliente] = useState('');
  const [searchTermProfessionista, setSearchTermProfessionista] = useState('');
  const [selectedCliente, setSelectedCliente] = useState('');
  const [selectedClienteId, setSelectedClienteId] = useState('');
  const [filteredProfessionisti, setFilteredProfessionisti] = useState([]);
  const [selectedProfessionista, setSelectedProfessionista] = useState('');
  const [selectedProfessionistaId, setSelectedProfessionistaId] = useState('');
  
  const handleInsert = async (data, form) => {
    if (confirm("Sei sicuro di voler salvare il lavoro?")) {
      if (controlloNuovoLavoro(data, setErrori) > 0) 
        return;
    
      try {
        const response = await fetch('/INSERISCI_LAVORO', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        });

        if (!response.ok) {
          throw new Error('Errore durante l\'inserimento del lavoro');
        }

        const result = await response.json();
        alert("L'inserimento del lavoro è andato a buon fine!!");

        form.reset();
      } catch (error) {
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
      setClienti(clientiAggiornati);
    };

    fetchClienti();

    const onChange = () => setClienti(personaStore.getClienti());
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

  return (
    <>
      <Header />
      <div className="main-content"></div>
      <div>
        <form 
          className={formSession.view === "form" ? 'containerForm' : ''} 
          onSubmit={(e) => {
            e.preventDefault();
            const formData = new FormData(e.target);
            const data = {
              id_cliente: formData.get('id_cliente'),
              id_professionista: formData.get('id_professionista'),
              descrizione: formData.get('descrizione'),
              giorno: formData.get('giorno'),
              orario_inizio: formData.get('orario_inizio'),
              orario_fine: formData.get('orario_fine'),
              note: formData.get('note'),
            };
            handleInsert(data, e.target);
          }}
        >

          {(formSession.view === "form") && (
            <>
              <label className='titoloForm'>Nuovo lavoro</label>

              <label className='labelForm'>Cliente</label>
              <input 
                className='inputFormModifica' 
                type='text' 
                placeholder='Cerca cliente'
                value={searchTermCliente}
                onChange={onChangeCliente} 
              />
              {filteredClienti.length > 0 && (
                <ul>
                  {filteredClienti.map(cliente => (
                    <button className='buttonForm'  key={cliente.id} onClick={(e) => handleClienteClick(e, cliente)}>
                      {cliente.cognome} {cliente.nome} - {cliente.contatto}
                    </button>
                  ))}
                </ul>
              )}
              <select
                className='inputFormModifica' // Aggiungi la classe qui
                name='cliente'
                value={selectedClienteId}
                onChange={(e) => setSelectedClienteId(e.target.value)}
              >
                <option value=''>Seleziona un cliente</option>
                {filteredClienti.map(cliente => (
                  <option key={cliente.id} value={cliente.id}>
                    {cliente.cognome} {cliente.nome} - {cliente.contatto}
                  </option>
                ))}
              </select>

              <span className='spanErrore'>{errori.erroreCliente}</span>

              <label className='labelForm'>Professionista</label>
              <input 
                className='inputFormModifica' 
                type='text' 
                placeholder='Cerca professionista'
                value={searchTermProfessionista}
                onChange={onChangeProfessionista} 
              />
              {filteredProfessionisti.length > 0 && (
                <ul>
                  {filteredProfessionisti.map(professionista => (
                    <button className='buttonForm'  key={professionista.id} onClick={(e) => handleProfessionistaClick(e, professionista)}>
                      {professionista.nome} - {professionista.professione} - {professionista.contatto} - {professionista.email}
                    </button>
                  ))}
                </ul>
              )}
              <select
                className='inputFormModifica' // Aggiungi la classe qui
                name='professionista'
                value={selectedProfessionistaId}
                onChange={(e) => setSelectedProfessionistaId(e.target.value)}
              >
                <option value=''>Seleziona un professionista</option>
                {filteredProfessionisti.map(professionista => (
                  <option key={professionista.id} value={professionista.id}>
                    {professionista.nome} - {professionista.professione} - {professionista.contatto} - {professionista.email}
                  </option>
                ))}
              </select>
              <input type='hidden' name='id_cliente' value={selectedClienteId} />
              <input type='hidden' name='id_professionista' value={selectedProfessionistaId} />
              <span className='spanErrore'>{errori.erroreProfessionista}</span>
              <span className='spanErrore'>{errori.erroreClienteEProfessionista}</span>
              
              <label className='labelForm'>Descrizione*</label>
              <textarea className='textAreaFormModifica' type='text' name='descrizione' />
              <span className='spanErrore'>{errori.erroreDescrizione}</span>

              <label className='labelForm'>Giorno*</label>
              <input className='inputFormModifica' type='date' name='giorno' />
              <span className='spanErrore'>{errori.erroreGiorno}</span>

              <label className='labelForm'>Orario inizio*</label>
              <input className='inputFormModifica' type='time' name='orario_inizio' />
              <span className='spanErrore'>{errori.erroreOrarioInizio}</span>

              <label className='labelForm'>Orario fine*</label>
              <input className='inputFormModifica' type='time' name='orario_fine' />
              <span className='spanErrore'>{errori.erroreOrarioFine}</span>
              <span className='spanErrore'>{errori.erroreOrari}</span>

              <label className='labelForm'>Note</label>
              <textarea className='textAreaFormModifica' name='note'></textarea>
              <span className='spanErrore'>{errori.erroreNote}</span>
            </>
          )}

          {(formSession.view === "card") && (
            <>
              <Row>
                <Col className='custom-col'>
                  <span>
                    <CardItem tipoItem={"nuovo lavoro"} item={null} header="Nuovo lavoro cliente"/>
                    <button className='buttonForm' type='submit' 
                      style={{
                        width:"100%", marginLeft: "0", marginRight: "0", 
                        marginTop: "35px", marginBottom:"0"
                      }}
                    >
                      Salva lavoro
                    </button>
                  </span>
                </Col>
                <Col className='custom-col'>
                  <span>
                    <CardItem tipoItem={"nuovo lavoro"} item={null} header="Nuovo lavoro professionista"/>
                    <button className='buttonForm' type='submit' 
                      style={{
                        width:"100%", marginLeft: "0", marginRight: "0", 
                        marginTop: "35px", marginBottom:"0"
                      }}
                    >
                      Salva lavoro
                    </button>
                  </span>
                </Col>
              </Row>
            </>
          )}

        </form>
      </div>
    </>
  );
};

export default NuovoLavoro;
