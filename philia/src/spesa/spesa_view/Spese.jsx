import { useState } from "react";
import { useSelector } from "react-redux";
import { selectOperationBody } from "../../app/app_view/component/Operazioni";
import { handleInputChange, handleInputClick, handleInputBlur } from "../../vario/Vario";
import { FormRicercaItems } from "../../riutilizzabile/form_item/FormItem";
import { CardRicercaItems } from "../../riutilizzabile/card_item/CardItem";
import { RowRicercaItems } from "../../riutilizzabile/row_item/RowItem";
import { getCampiRicercaSpese, getCampiSpesaEsistente, indiciRicercaSpese, indiciSpesaEsistente } from "../spesa_action/SpeseVario";
import { useDispatch } from "react-redux";
import PaginaWeb from "../../riutilizzabile/PaginaWeb";
import PaginaWebRicercaItems from "../../riutilizzabile/PaginaWebRicercaItems";
import { aggiornaSpese, aggiornaTipoSelezione, getSpesaPrimaDellaModifica, getSpesaDopoLaModifica } from "../../store/redux/SpeseSlice";

const Spese = () => {
  const speseSession = useSelector((state) => state.speseSession.value);
  const dispatch = useDispatch();
  
  const [selectedTrashCount, setSelectedTrashCount] = useState(0);
  const [selectedPencilCount, setSelectedPencilCount] = useState(0);
  const [selectedIdsEliminazione, setSelectedIdsEliminazione] = useState([]);
  const [selectedIdsModifica, setSelectedIdsModifica] = useState([]);
  
  const [datiRicerca, setDatiRicerca] = useState({
    tipo_item: "spesa", 
    nome: "", 
    descrizione: "", 
    totale_min: "",
    totale_max: "",  
    primo_giorno: "", 
    ultimo_giorno: "", 
    note: ""
  });

  const aggiornaTipoSelezioneItem = (id, nuova_selezione) => {
    dispatch(aggiornaTipoSelezione({
      id_spesa: id, 
      nuova_selezione: nuova_selezione
    }));
  }
  
  const selectOperation = (icon, item) => {
    selectOperationBody(
      icon, item, selectedIdsModifica, setSelectedIdsModifica, selectedIdsEliminazione, setSelectedIdsEliminazione, 
      setSelectedPencilCount, setSelectedTrashCount, aggiornaTipoSelezioneItem, dispatch, "spesa" 
    )
  }

  const handleSearch = async (e) => {
    e.preventDefault();
        
    try {
      const response = await fetch('/VISUALIZZA_ITEMS', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(datiRicerca),
      });

      if(response.status === 200) {
        const result = await response.json();
        dispatch(aggiornaSpese({
          spese: result.items,
        }));
      }
      else {
        alert("Errore durante la ricerca delle spese, riprova più tardi.");
      }
    }
    catch (error) {
      console.error('Errore:', error);
      alert("Errore durante la ricerca delle spese, riprova più tardi.");
    }
  }

  const handleDelete = async (e) => {
    e.preventDefault();
    if (confirm("Sei sicuro di voler eliminare le spese?")) {
      const dati = {
        tipo_item: "spesa", 
        ids: selectedIdsEliminazione
      }
      const itemsDaEliminare = speseSession.spese.filter(spesa => dati.ids.includes(spesa.id));
      const itemsRestanti = speseSession.spese.filter(spesa => !dati.ids.includes(spesa.id));
      try {
        const response = await fetch('/ELIMINA_ITEMS', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(dati),
        });
        if(response.status === 200) {          
          dispatch(aggiornaSpese({
            spese: itemsRestanti, 
          }))
          setSelectedIdsEliminazione([]);
          alert("Eliminazione completata con successo.");
        }
        else {
          alert("Errore durante l\'eliminazione delle spese, riprova più tardi.");
        }
      }
      catch (error) {
        console.error('Errore:', error);
        alert("Errore durante l\'eliminazione delle spese, riprova più tardi.");
      }
    }
    else {
      alert("Eliminazione annullata.");
    }
  }

  const handleEdit = async (e) => {
    e.preventDefault();
    if (confirm("Sei sicuro di voler modificare le spese?")) {
      let speseDaNonModificare = speseSession.spese.filter(spesa => !selectedIdsModifica.includes(spesa.id));
      let speseDaModificare = speseSession.spese.filter(spesa => selectedIdsModifica.includes(spesa.id)); 
      // let copiaSpeseDaModificare = [...speseDaModificare];
      
      let idSpeseNonModificate = [];
      let idSpeseModificate = [];
      let esitoModifica = "Esito modifica:\n";
      for(let i = 0; i < speseDaModificare.length; i++) {
        const dati = {
          tipo_item: "spesa", 
          item: speseDaModificare[i] 
        }
        const response = await fetch('/MODIFICA_ITEM', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(dati),
        });
        if(response.status === 200) {           
          esitoModifica += "Spesa numero " + (i+1) + ": modifica avvenuta con successo.\n";
          idSpeseModificate.push(speseDaModificare[i].id);
        }
        else if(response.status === 400) {
          esitoModifica += "Spesa numero " + (i+1) + ": errore durante la modifica: spesa gia\' presente.\n";
          idSpeseNonModificate.push(speseDaModificare[i].id);
        }
        else {
          esitoModifica += "Spesa numero " + (i+1) + ": errore durante la modifica.\n";
          idSpeseNonModificate.push(speseDaModificare[i].id);
        }
      }

      let speseAggiornate = [];
      for (let i = 0; i < speseSession.spese.length; i++) {
        let spesaAggiornata = { ...speseSession.spese[i] };
        if(spesaAggiornata.tipo_selezione === 1) {
          spesaAggiornata.tipo_selezione = 0;
        }
        speseAggiornate.push(spesaAggiornata);
      }
      // setSpese(speseAggiornate);
      dispatch(aggiornaSpese({
        spese: speseAggiornate, 
      }));

      for(let id of idSpeseNonModificate) {
        console.log("\\"+id+"/");
        dispatch(getSpesaPrimaDellaModifica({
          id_spesa: id
        }));
      }
      for(let id of idSpeseModificate) {
        console.log("\\"+id+"/");
        dispatch(getSpesaDopoLaModifica({
          id_spesa: id
        }));
      }

      setSelectedIdsModifica([]);

      // alert("Risultati modifica:\n")
      alert(esitoModifica);
    }
    else {
      alert("Salvataggio annullato.");
    }
  };

  return (
    <>
      <PaginaWebRicercaItems 
        componenti={ 
          {
            campiRicercaItems: getCampiRicercaSpese(
              datiRicerca, 
              (e) => handleInputChange(e, setDatiRicerca), 
              (e) => handleInputClick(e), 
              (e) => handleInputBlur(e) 
            ),
            indiciRicercaItems: indiciRicercaSpese, 
            handleSearch: (e) => handleSearch(e), 
            tipoItem: "spesa", 
            items: speseSession.spese, 
            setItems: null, 
            selectOperation: selectOperation, 
            campiItemEsistente: getCampiSpesaEsistente, 
            indiciItemEsistente: indiciSpesaEsistente, 
            servizi: null, 
            selectedIdsModifica: selectedIdsModifica, 
            selectedIdsEliminazione: selectedIdsEliminazione, 
            handleEdit: (e) => handleEdit(e),  
            handleDelete: (e) => handleDelete(e)
          }
        }
      />
    </>
  );
}

export default Spese;









