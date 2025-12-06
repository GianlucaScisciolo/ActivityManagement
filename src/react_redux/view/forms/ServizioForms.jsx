// React e Redux
import React, { useState, useEffect } from "react";
import { useSelector } from 'react-redux';
import { Row } from "react-bootstrap";
import { Col } from "react-bootstrap";
// Utils
import { controlloServizio } from "../../../utils/Controlli";
import { LavoroActions } from "../../actions/LavoroActions";

export class ServizioForms {
  attivitaState = useSelector((state) => state.attivita.value);
  lingua = this.attivitaState.lingua;

  constructor() {

  }

  getCampiNuovoServizio(item, handleOnChange, handleOnClick, handleOnBlur) {
    return {
      header: this.lingua === "italiano" ? "Nuovo servizio" : "New service", 
      label: [
        this.lingua === "italiano" ? "Nome*" : "Name*", 
        this.lingua === "italiano" ? "Prezzo*" : "Price*", 
        this.lingua === "italiano" ? "Note" : "Notes",
      ], 
      type: [null, "text", null], 
      step: [null, null, null], 
      min: [null, null, null], 
      name: ["nome", "prezzo", "note"], 
      id: ["nuovo_nome_servizio", "nuovo_prezzo_servizio", "nuove_note_servizio"], 
      value: [item.nome, item.prezzo, item.note], 
      placeholder: [
        this.lingua === "italiano" ? "Nome*" : "Name*", 
        this.lingua === "italiano" ? "Prezzo*" : "Price*", 
        this.lingua === "italiano" ? "Note" : "Notes",
      ], 
      errore: [item.errore_nome, item.errore_prezzo, item.errore_note], 
      options: [null, null, null],
      onChange: handleOnChange, 
      onClick: handleOnClick, 
      onBlur: handleOnBlur
    };
  };

  getCampiRicercaServizi(item, handleOnChange, handleOnClick, handleOnBlur) {
    return {
      header: this.lingua === "italiano" ? "Ricerca servizi" : "Services research", 
      label: [
        this.lingua === "italiano" ? "Nome" : "Name", 
        this.lingua === "italiano" ? "Prezzo minimo" : "Minimum price", 
        this.lingua === "italiano" ? "Prezzo massimo" : "Maximum price", 
        this.lingua === "italiano" ? "Note" : "Notes", 
        this.lingua === "italiano" ? "In uso" : "In use", 
      ], 
      type: [null, "text", "text", null, "text"], 
      step: [null, null, null, null, null], 
      min: [null, null, null, null, null], 
      name: ["nome", "prezzo_min", "prezzo_max", "note", "in_uso"], 
      id: ["ricerca_nome_servizio", "ricerca_prezzo_min_servizio", "ricerca_prezzo_max_servizio", "ricerca_note_servizio", "ricerca_in_uso_servizio"], 
      value: [item.nome, item.prezzo_min, item.prezzo_max, item.note, item.in_uso], 
      placeholder: [
        this.lingua === "italiano" ? "Nome" : "Name", 
        this.lingua === "italiano" ? "Prezzo minimo" : "Minimum price", 
        this.lingua === "italiano" ? "Prezzo massimo" : "Maximum price", 
        this.lingua === "italiano" ? "Note" : "Notes", 
        this.lingua === "italiano" ? "In uso" : "In use", 
      ], 
      onChange: handleOnChange, 
      onClick: handleOnClick, 
      onBlur: handleOnBlur
    };
  };

  getCampiServizioEsistente(item, handleOnChange, handleOnClick, handleOnBlur) {
    const attivitaState = useSelector((state) => state.attivita.value);
    const lingua = attivitaState.lingua;

    const [errori, setErrori] = useState({
      errore_nome: "", 
      errore_prezzo: "", 
      errore_note: "", 
      errore_in_uso: ""
    }); 
  
    useEffect(() => {
      controlloServizio(item, setErrori, lingua);
    }, [item]);
  
    return {
      header: lingua === "italiano" ? "Servizio" : "Service", 
      label: [null, null, null, null], 
      tipoSelezione: item.tipo_selezione,  
      type: [null, "text", null, "text"], 
      step: [null, null, null, null], 
      min: [null, null, null, null], 
      name: ["nome", "prezzo", "note", "in_uso"], 
      id: ["nome_servizio", "prezzo_servizio", "note_servizio", "in_uso_servizio"], 
      value: [item.nome, parseFloat(item.prezzo).toFixed(2) + " €", item.note, item.in_uso], 
      placeholder: [
        lingua === "italiano" ? "Nome" : "Name", 
        lingua === "italiano" ? "Prezzo" : "Price", 
        lingua === "italiano" ? "Note" : "Notes",
        lingua === "italiano" ? "In uso" : "In use", 
      ], 
      errore: [errori.errore_nome, errori.errore_prezzo, errori.errore_note, errori.errore_in_uso], 
      valoreModificabile: [true, true, true, true], 
      options: [null, null, null, null], 
      onChange: handleOnChange, 
      onClick: handleOnClick, 
      onBlur: handleOnBlur
    };
  };
}

//////////////////////////////////////////////////

const optionStr = (servizio) => {
  return `${servizio.nome} - ${servizio.prezzo} €`;
};

const getQuantita = (servizio, item) => {
  for(let collegamento of item["collegamenti"]) {
    if(servizio.id === collegamento.id_servizio) {
      return collegamento.quantita;
    }
  }
  return 0;
}

const getTotale = (collegamenti, servizi) => {
  let totale = 0;
  collegamenti = (collegamenti != -1 && collegamenti) ? collegamenti : []; 
  servizi = (servizi != -1 && servizi) ? servizi : []; 
  for(let collegamento of collegamenti) {
    for(let servizio of servizi) {
      if(collegamento.id_servizio === servizio.id) {
        totale += servizio.prezzo * collegamento.quantita;
      }
    }
  }
  return totale;
}

const aggiornaCollegamento = (servizi, item, lavoroActions, index, nuovoValore, setServiziLavoro) => {
  if(item.tipo_selezione === 1) {
    let isAggiornato = false;
    if(nuovoValore >= 0) {
      let nuoviCollegamenti = [];
      for(let collegamento of item["collegamenti"]) {
        if(collegamento["id_servizio"] === servizi[index]["id"]) {
          nuoviCollegamenti.push({
            id_servizio: collegamento["id_servizio"], 
            id_lavoro: collegamento["id_lavoro"], 
            quantita: nuovoValore
          });
          isAggiornato = true;
        }
        else {
          nuoviCollegamenti.push(collegamento);
        }
      }
      if(isAggiornato === false) {
        nuoviCollegamenti.push({
          id_servizio: servizi[index]["id"], 
          id_lavoro: nuoviCollegamenti[0]["id_lavoro"], 
          quantita: nuovoValore
        })
      }
      lavoroActions.aggiornaLavoro(item.id, "collegamenti", nuoviCollegamenti);
      lavoroActions.aggiornaLavoro(item.id, "totale", getTotale(nuoviCollegamenti, servizi));
    }
  }
};

export const OptionsServizi = ({ item, sottoStringa, setServiziLavoro }) => {
  const lavoroActions = new LavoroActions();
  const [servizi, setServizi] = useState([]);

  const getAllServizi = async () => {
    const response = await fetch('/OTTIENI_TUTTI_GLI_ITEMS', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({tipo_item: "servizio"}),
    });

    if(response.status === 200) {
      const result = await response.json();
      setServizi(result.items);
    }
    else {
      alert(attivitaState.lingua === "italiano" ? "Errore durante l\'ottenimento dei clienti per l\'inserimento di un nuovo lavoro, riprova più tardi." : "Error while obtaining clients for new job entry, try again later.");
    }
  };
  
  useEffect(() => {
    getAllServizi();
  }, []);
  
  return (
    <>
      {servizi && servizi.length > 0 && (
        <div>
          {servizi.filter((servizio) => optionStr(servizio).toLowerCase().includes(sottoStringa.toLowerCase())).map((servizio, index) => {
            const quantita = getQuantita(servizio, item);
            if( (servizio.in_uso === 1) || (servizio.in_uso === 0 && quantita > 0) ) {
              return (
                <React.Fragment key={index}>
                  <Row key={index} style={{ padding: "10px" }}>
                    <Col>
                      <label htmlFor={`servizio_${index}`}>{optionStr(servizio)}</label>
                    </Col>
                    <Col>
                      <input
                        style={{ width: "90px", padding: "5px 10px" }}
                        type="number"
                        value={quantita}
                        placeholder={`quantita_servizio_${index}`}
                        onChange={(e) =>
                          aggiornaCollegamento(servizi, item, lavoroActions, index, e.target.value, setServiziLavoro)
                        }
                      />
                    </Col>
                  </Row>
                </React.Fragment>
              )
            }
          })}
        </div>
      )}
      {item["collegamenti"] && servizi && (
        <div>Total: {parseFloat(getTotale(item["collegamenti"], servizi)).toFixed(2)} €</div> 
      )}
    </>
  );
};








