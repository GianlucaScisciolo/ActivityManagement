// React e Redux
import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import Row from 'react-bootstrap/esm/Row';
import Col from 'react-bootstrap/esm/Col';
// View
import Header from "../components/Header";
import DragAndDrop from "../components/DragAndDrop";
// Actions
import { LavoroActions } from "../../actions/LavoroActions";
import { SpesaActions } from "../../actions/SpesaActions";
import { SaloneActions } from '../../actions/SaloneActions';
import { ServizioActions } from "../../actions/ServizioActions";

import { CardEntrateItems, CardEntrateItemsByName, CardUsciteItems, CardRicavi, CardEntrateUscite } from '../../riutilizzabile/card_item/CardItem';
import { OperazioniForms } from '../forms/OperazioniForms';
import { FormEntrateUscite } from '../../riutilizzabile/form_item/FormItem';
import { RowEntrateUscite } from "../../riutilizzabile/row_item/RowItem";

const Salone = () => {
  const stileState = useSelector((state) => state.stileSliceReducer.value);
  const lavoroActions = new LavoroActions();
  const spesaActions = new SpesaActions();
  const saloneActions = new SaloneActions();
  const servizioActions = new ServizioActions();
  const [entrateLavori, setEntrateLavori] = useState(-1);
  const [usciteSpese, setUsciteSpese] = useState(-1);
  const [entrateServizi, setEntrateServizi] = useState(-1);
  const [aggiornamento, setAggiornamento] = useState(0);
  const [initialPositions, setInitialPositions] = useState([]);
  const operazioniForms = new OperazioniForms();
  const [aggiornamento2, setAggiornamento2] = useState(false);

  const [datiRicerca, setDatiRicerca] = useState({
    primo_anno: (new Date()).getFullYear() - 5, 
    ultimo_anno: (new Date()).getFullYear()
  });

  const eseguiRicerca = (e) => {
    e.preventDefault();
    setEntrateLavori([]);
    setEntrateServizi([]);
    setUsciteSpese([]);
    lavoroActions.handleSearchEntrateLavori(setEntrateLavori, datiRicerca);
  };
  
  useEffect(() => {
    if(entrateLavori.length > 0) {
      spesaActions.handleSearchUsciteSpese(setUsciteSpese, datiRicerca);
      servizioActions.handleSearchEntrateServizi(setEntrateServizi, datiRicerca); 
    }
  }, [entrateLavori]);

  return (
    <>
      <Header />
      
      <div className="main-content" />
      
      {(stileState.vistaForm === "form") && (
        <FormEntrateUscite 
          datiRicerca={datiRicerca}
          setDatiRicerca={setDatiRicerca}
          handleInputChange={operazioniForms.handleInputChange}
          eseguiRicerca={eseguiRicerca}
        />
      )}
      {(stileState.vistaForm === "card") && (
        <center>
          <CardEntrateUscite 
            datiRicerca={datiRicerca}
            setDatiRicerca={setDatiRicerca}
            handleInputChange={operazioniForms.handleInputChange}
            eseguiRicerca={eseguiRicerca}
          />
        </center>
      )}
      {(stileState.vistaForm === "row") && (
        <center>
          <RowEntrateUscite 
            datiRicerca={datiRicerca}
            setDatiRicerca={setDatiRicerca}
            handleInputChange={operazioniForms.handleInputChange}
            eseguiRicerca={eseguiRicerca}
          />
        </center>
      )}
      
      <br /> <br /> <br /> <br />
      
      <center>
        <Row>
          {(entrateLavori.length > 0 && entrateLavori !== -1) ? (
            <Col><CardEntrateItems entrateItems={entrateLavori} etichettaIta="Entrate lavori" etichettaEng="Revenue jobs" /></Col>
          ) : (<Col></Col>)}
          {(usciteSpese.length > 0 && usciteSpese !== -1) ? (
            <Col><CardUsciteItems usciteItems={usciteSpese} etichettaIta="Uscite spese" etichettaEng="Exit expenses" /></Col>
          ) : (<Col></Col>)}
        </Row>
        <br /> <br /> <br /> <br />
        <Row>
          {(entrateServizi.length > 0 && entrateServizi !== -1) ? (
            <Col><Col><CardEntrateItemsByName entrateItems={entrateServizi} tipoItemIta="SERVIZIO" tipoItemEng="SERVICE" etichettaIta="Entrate servizi" etichettaEng="Revenue services" /></Col></Col>
          ) : (<Col></Col>)}
          {((entrateLavori.length > 0 && entrateLavori !== -1) && (usciteSpese.length > 0 && usciteSpese !== -1)) ? (
            <Col><CardRicavi entrate={entrateLavori} uscite={usciteSpese} /></Col>
          ) : (<Col></Col>)}
        </Row>
      </center>

      <br /> <br /> <br /> <br />
    </>
  );
}

export default Salone;
