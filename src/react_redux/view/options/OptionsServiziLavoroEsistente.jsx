// React
import React, { useState, useEffect } from "react";
import { Row } from "react-bootstrap";
import { Col } from "react-bootstrap";
// Actions
import { LavoroActions } from "../../actions/LavoroActions";

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

const OptionsServiziLavoroEsistente = ({ item, sottoStringa, setServiziLavoro }) => {
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

export default OptionsServiziLavoroEsistente;









