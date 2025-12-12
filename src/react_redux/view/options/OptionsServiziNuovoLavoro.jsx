// React e Redux
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

const OptionsServiziNuovoLavoro = ({ servizi, setServizi, item, classeFormWrapperCheckbox }) => {
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










