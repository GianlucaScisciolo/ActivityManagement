import React, { useState, useEffect } from "react";
import { Row } from "react-bootstrap";
import { Col } from "react-bootstrap";

const aggiornaServizio = (id, parametro, nuovoValore, setServizi) => {
  setServizi((prevServizi) =>
    prevServizi.map((servizio) =>
      servizio.id === id
        ? { ...servizio, [parametro]: nuovoValore }
        : servizio
    )
  );
};

const getAllServizi = async (setServizi) => {
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

const OptionsServiziNuovoLavoro = ({ item, classeFormWrapperCheckbox }) => {
  useEffect(() => {
    getAllServizi(setServizi);
  }, []);

  const [servizi, setServizi] = useState(-1);

  const optionStr = (servizio) => {
    return servizio.nome + " - " + servizio.prezzo + " €";
  }
  
  const sottoStringa = item.servizio;

  return (
    <>
      {(servizi !== -1) && (
        <>
          <div>
            {servizi.filter(servizio => 
              optionStr(servizio).toLowerCase().includes(sottoStringa.toLowerCase())
            ).map((servizio, index) => (
              <React.Fragment key={index}>
                {servizio.in_uso === 1 && (
                  <Row style={{padding: "10px"}}>
                    <Col>
                      <label htmlFor={"servizio_" + index}>
                        {optionStr(servizio)}
                      </label>
                    </Col>
                    <Col>
                      <input 
                        style={{width: "90px", padding:"5px 10px"}}
                        rows={1}
                        name={"servizio_" + index} 
                        id={"servizio_" + index} 
                        type="number" 
                        step={1}
                        value={servizio.quantita}
                        placeholder={"quantita_servizio_" + index}
                        onChange={(e) => {
                          const { value } = e.target;
                          if(servizio.quantita + value >= 0) {
                            aggiornaServizio(servizio.id, "quantita", value, setServizi);
                          } 
                        }}
                      />
                    </Col>
                  </Row>
                )}
              </React.Fragment>
            ))}
          </div>
        </>
      )}
    </>
  );
};

export default OptionsServiziNuovoLavoro;










