// React e Redux
import React, { useState, useEffect } from 'react';
import Row from 'react-bootstrap/esm/Row';
import Col from 'react-bootstrap/esm/Col';
// View
import Header from "../components/Header";
import DragAndDrop from "../components/DragAndDrop";
// Actions
import { LavoroActions } from "../../actions/LavoroActions";
import { SpesaActions } from "../../actions/SpesaActions";
import { SaloneActions } from '../../actions/SaloneActions';

import { CardEntrateLavori, CardEntrateServizi, CardUsciteSpese, CardRicavi } from '../../riutilizzabile/card_item/CardItem';
import { OperazioniForms } from '../forms/OperazioniForms';

const Salone = () => {
  const lavoroActions = new LavoroActions();
  const spesaActions = new SpesaActions();
  const saloneActions = new SaloneActions();
  const [entrateLavori, setEntrateLavori] = useState(-1);
  const [usciteSpese, setUsciteSpese] = useState(-1);
  const [aggiornamento, setAggiornamento] = useState(0);
  const [initialPositions, setInitialPositions] = useState([]);
  const operazioniForms = new OperazioniForms();
  const [aggiornamento2, setAggiornamento2] = useState(false);

  const [datiRicerca, setDatiRicerca] = useState({
    primo_anno: 2021, 
    ultimo_anno: 2025
  })

  const eseguiRicerca = (e) => {
    e.preventDefault();
    setAggiornamento2(!aggiornamento2);
  }
  
  useEffect(() => {
    lavoroActions.handleSearchEntrateLavori(setEntrateLavori, datiRicerca);
  }, [aggiornamento2]);

  useEffect(() => {
    if(entrateLavori.length > 0)
      spesaActions.handleSearchUsciteSpese(setUsciteSpese, datiRicerca);
  }, [entrateLavori]);

  useEffect(() => {
    if(entrateLavori.length > 0 && usciteSpese.length > 0) {
      setInitialPositions([
        { id: '1', tipo: "CardEntrateLavori", entrateLavori: entrateLavori, x: 100, y: 100 }, 
        { id: '2', tipo: "CardUsciteSpese", usciteSpese: usciteSpese, x: 2000, y: 100 }, 
        { id: '3', tipo: "CardRicavi", entrateLavori: entrateLavori, usciteSpese: usciteSpese, x: 100, y: 1000 }
      ]);
    }
  }, [usciteSpese]);

  return (
    <>
      <Header />
      
      <div className="main-content" />
      
      <center>
        <Row>
          <Col>
            <input 
              // style={{backgroundColor:"transparent", border: "0px solid transparent", color:"#FFFFFF", textAlign:"center"}} 
              name="primo_anno"
              type='number' 
              value={datiRicerca.primo_anno}
              placeholder="Primo anno" 
              id="primo_anno"
              onChange={(e) => operazioniForms.handleInputChange(e, setDatiRicerca)}
            /> 
          </Col>
          <Col>
            <input 
              // style={{backgroundColor:"transparent", border: "0px solid transparent", color:"#FFFFFF", textAlign:"center"}} 
              name="ultimo_anno"
              type='number' 
              value={datiRicerca.ultimo_anno}
              placeholder="Ultimo anno"
              id="ultimo_anno"
              onChange={(e) => operazioniForms.handleInputChange(e, setDatiRicerca)}
            />
          </Col>
          <Col> 
            <button 
              // style={{backgroundColor:"transparent", border: "0px solid transparent", color:"#FFFFFF", textAlign:"center"}}
              onClick={(e) => eseguiRicerca(e)}
            >Ricerca</button>
          </Col>
        </Row> 
      </center>
      <br /> <br /> <br /> <br />
      <center>
        <Row>
          {(entrateLavori.length > 0 && entrateLavori !== -1) ? (
            <Col><CardEntrateLavori entrateLavori={entrateLavori} /></Col>
          ) : (<Col></Col>)}
          {(usciteSpese.length > 0 && usciteSpese !== -1) ? (
            <Col><CardUsciteSpese usciteSpese={usciteSpese} /></Col>
          ) : (<Col></Col>)}
        </Row>
        <br /> <br /> <br /> <br />
        <Row>
          {((entrateLavori.length > 0 && entrateLavori !== -1) && (usciteSpese.length > 0 && usciteSpese !== -1)) ? (
            <Col><CardRicavi entrateLavori={entrateLavori} usciteSpese={usciteSpese} /></Col>
          ) : (<Col></Col>)}
          {/* {((entrateLavori.length > 0 && entrateLavori !== -1) && (usciteSpese.length > 0 && usciteSpese !== -1)) ? (
            <Col><CardRicavi entrateLavori={entrateLavori} usciteSpese={usciteSpese} /></Col>
          ) : (<Col></Col>)} */}
          <Col><CardEntrateServizi entrateServizi={null} /></Col>
        </Row>
      </center>

      <br /> <br /> <br /> <br />
    </>
  );
}

export default Salone;
