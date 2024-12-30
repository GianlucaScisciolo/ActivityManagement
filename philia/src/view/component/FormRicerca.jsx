import { useState, useEffect, useRef } from "react";
import { aggiornamentoLista, eseguiRicerca } from "../../vario/OperazioniRicerca";

export const FormRicerca = ({tipoLista, setterLista1, setterLista2, setterDatiLastSearch}) => {
  const [nome, setNome] = useState('');
  const [cognome, setCognome] = useState('');
  const [contatto, setContatto] = useState('');
  const [note, setNote] = useState('');
  const [professione, setProfessione] = useState('');
  const [email, setEmail] = useState('');
  const [nomeCliente, setNomeCliente] = useState('');
  const [cognomeCliente, setCognomeCliente] = useState('');
  const [nomeProfessionista, setNomeProfessionista] = useState('');
  const [descrizione, setDescrizione] = useState('');
  const [primoGiorno, setPrimoGiorno] = useState('');
  const [ultimoGiorno, setUltimoGiorno] = useState('');
  const [formIsVisible, setFormIsVisible] = useState(true);
  const [contentHeight, setContentHeight] = useState('auto');
  const ref = useRef(null);

  const updateContentHeight = () => {
    if (ref.current) {
      setContentHeight('1000px');
    }
  };

  const handleClickNascondiForm = (e) => {
    e.preventDefault();
    setFormIsVisible(!formIsVisible);
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    // console.log(value.length);
    switch (name) {
      case 'nome':
        setNome(value);
        break;
      case 'cognome':
        setCognome(value);
        break;
      case 'contatto':
        setContatto(value);
        break;
      case 'note':
        setNote(value);
        break;
      case 'professione':
        setProfessione(value);
        break;
      case 'email':
        setEmail(value);
        break;
      case 'nomeCliente':
        setNomeCliente(value);
        break;
      case 'cognomeCliente':
        setCognomeCliente(value);
        break;
      case 'nomeProfessionista':
        setNomeProfessionista(value);
        break;
      case 'descrizione':
        setDescrizione(value);
        break;
      case 'primoGiorno':
        setPrimoGiorno(value);
        break;
      case 'ultimoGiorno':
        setUltimoGiorno(value);
        break;
      default:
        break;
    }
  };

  const getTitolo = (titolo) => {
    return <label className='titoloForm'>{titolo}</label>
  }

  const getCampoNome = () => {
    return (
      <>
        <label className='labelForm'>Nome</label>
        <input className='inputFormModifica' type='text' name='nome' value={nome} onChange={handleInputChange} />
        <span className='spanErrore'></span>
      </>
    )
  }

  const getCampoCognome = () => {
    return (
      <>
        <label className='labelForm'>Cognome</label>
        <input className='inputFormModifica' type='text' name='cognome' value={cognome} onChange={handleInputChange} />
        <span className='spanErrore'></span>
      </>
    )
  }

  const getCampoProfessione = () => {
    return (
      <>
        <label className='labelForm'>Professione</label>
        <input className='inputFormModifica' type='text' name='professione' value={professione} onChange={handleInputChange} />
        <span className='spanErrore'></span>
      </>
    )
  }

  const getCampoContatto = () => {
    return (
      <>
        <label className='labelForm'>Contatto</label>
        <input className='inputFormModifica' type='text' name='contatto' value={contatto} onChange={handleInputChange} />
        <span className='spanErrore'></span>
      </>
    )
  }

  const getCampoEmail = () => {
    return (
      <>
        <label className='labelForm'>Email</label>
        <input className='inputFormModifica' type='text' name='email' value={email} onChange={handleInputChange} />
        <span className='spanErrore'></span>
      </>
    )
  }

  const getCampoNote = () => {
    return (
      <>
        <label className='labelForm'>Note</label>
        <input className='textAreaFormModifica' name='note' value={note} onChange={handleInputChange} />
        <span className='spanErrore'></span>
      </>
    )
  }

  const getCampoNomeCliente = () => {
    return (
      <>
        <label className='labelForm'>Nome cliente</label>
        <textarea className='inputFormModifica' name='nomeCliente' value={nomeCliente} onChange={handleInputChange} />
        <span className='spanErrore'></span>
      </>
    )
  }

  const getCampoCognomeCliente = () => {
    return (
      <>
        <label className='labelForm'>Cognome cliente</label>
        <textarea className='inputFormModifica' name='cognomeCliente' value={cognomeCliente} onChange={handleInputChange} />
        <span className='spanErrore'></span>
      </>
    )
  }

  const getCampoNomeProfessionista = () => {
    return (
      <>
        <label className='labelForm'>Nome professionista</label>
        <textarea className='inputFormModifica' name='nomeProfessionista' value={nomeProfessionista} onChange={handleInputChange} />
        <span className='spanErrore'></span>
      </>
    )
  }

  const getCampoDescrizione = () => {
    return (
      <>
        <label className='labelForm'>Descrizione</label>
        <input className='inputFormModifica' type='text' name='descrizione' value={descrizione} onChange={handleInputChange} />
        <span className='spanErrore'></span>
      </>
    )
  }

  const getCampoPrimoGiorno = () => {
    return (
      <>
        <label className='labelForm'>Primo giorno</label>
        <textarea className='textAreaFormModifica' name='primoGiorno' value={primoGiorno} onChange={handleInputChange} />
        <span className='spanErrore'></span>
      </>
    )
  }

  const getCampoUltimoGiorno = () => {
    return (
      <>
        <label className='labelForm'>Ultimo giorno</label>
        <textarea className='textAreaFormModifica' name='ultimoGiorno' value={ultimoGiorno} onChange={handleInputChange} />
        <span className='spanErrore'></span>
      </>
    )
  }

  const getFormCercaClienti = () => {
    return (
      <>
        {getTitolo("Cerca clienti")}
        {getCampoNome()}
        {getCampoCognome()}
        {getCampoContatto()}
        {getCampoNote()}
      </>
    );
  }

  const getFormCercaProfessionisti = () => {
    return (
      <>
        {getTitolo("Cerca professionisti")}
        {getCampoNome()}
        {getCampoProfessione()}
        {getCampoContatto()}
        {getCampoEmail()}
        {getCampoNote()}
      </>
    );
  }

  const getFormCercaLavori = () => {
    return (
      <>
        {getTitolo("Cerca lavori")}
        {getCampoNomeCliente()}
        {getCampoCognomeCliente()}
        {getCampoNomeProfessionista()}
        {getCampoProfessione()}
        {getCampoDescrizione()}
        {getCampoPrimoGiorno()}
        {getCampoUltimoGiorno()}
        {getCampoNote()}
      </>
    );
  }

  useEffect(() => {
    aggiornamentoLista(tipoLista, setterLista1, setterLista2, updateContentHeight);
  }, []);

  useEffect(() => {
    updateContentHeight();
  }, [formIsVisible]);

  return (
    <div className='visible'>
      <form className='containerForm' onSubmit={(e) => eseguiRicerca(e, tipoLista, setterLista1, setterLista2, setterDatiLastSearch)}>
        <>
          {(formIsVisible) && (tipoLista === "clienti") && (
            getFormCercaClienti()
          )}
          {(formIsVisible) && (tipoLista === "professionisti") && (
            getFormCercaProfessionisti()
          )}
          {(formIsVisible) && (tipoLista === "lavori") && (
            getFormCercaLavori()
          )}

          <button className='buttonForm' onClick={handleClickNascondiForm}>
            {formIsVisible ? 'Nascondi ricerca' : 'Mostra ricerca'}
          </button>
          {formIsVisible && (
            <button className='buttonForm' type='submit'>Esegui ricerca</button>
          )}
        </>
      </form>
    </div>
  );
}








