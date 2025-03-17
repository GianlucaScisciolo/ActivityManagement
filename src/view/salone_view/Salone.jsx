import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import Header from "../component/Header";
import DragAndDrop from "../DragAndDrop";
import { LavoroAction } from "../../action/LavoroAction";
import { SpesaAction } from "../../action/SpesaAction";

const Salone = () => {
  const lavoroAction = new LavoroAction();
  const spesaAction = new SpesaAction();
  const formSession = useSelector((state) => state.formSession.value);
  const itemSession = useSelector((state) => state.itemSession.value);
  const [entrateLavori, setEntrateLavori] = useState(-1);
  const [usciteSpese, setUsciteSpese] = useState(-1);
  const [aggiornamento, setAggiornamento] = useState(0);
  const [initialPositions, setInitialPositions] = useState([]);
  
  useEffect(() => {
    lavoroAction.handleSearchEntrateLavori(setEntrateLavori);
  }, []);

  useEffect(() => {
    if(entrateLavori.length > 0)
      spesaAction.handleSearchUsciteSpese(setUsciteSpese);
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
