// React e Redux
import React, { useState, useEffect } from 'react';
// View
import Header from "../components/Header";
import DragAndDrop from "../components/DragAndDrop";
// Actions
import { LavoroActions } from "../../actions/LavoroActions";
import { SpesaActions } from "../../actions/SpesaActions";

const Salone = () => {
  const lavoroActions = new LavoroActions();
  const spesaActions = new SpesaActions();
  const [entrateLavori, setEntrateLavori] = useState(-1);
  const [usciteSpese, setUsciteSpese] = useState(-1);
  const [aggiornamento, setAggiornamento] = useState(0);
  const [initialPositions, setInitialPositions] = useState([]);
  
  useEffect(() => {
    lavoroActions.handleSearchEntrateLavori(setEntrateLavori);
  }, []);

  useEffect(() => {
    if(entrateLavori.length > 0)
      spesaActions.handleSearchUsciteSpese(setUsciteSpese);
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
      
      {(initialPositions.length > 0) && (
        <DragAndDrop initialPositions={initialPositions} />
      )}
    </>
  );
}

export default Salone;
