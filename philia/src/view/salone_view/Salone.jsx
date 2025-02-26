import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Header from '../component/Header';
import { operazioniSaloni } from '../../vario/Operazioni';
import SaloneAction from '../../action/salone_action/SaloneAction';
import saloneStore from '../../store/salone_store/SaloneStore';
import DragAndDrop from '../../DragAndDrop';

const Salone = () => {
  const formSession = useSelector((state) => state.formSession.value);
  const itemSession = useSelector((state) => state.itemSession.value);
  const [entrateLavori, setEntrateLavori] = useState(-1);
  const [usciteSpese, setUsciteSpese] = useState(-1);
  const [aggiornamento, setAggiornamento] = useState(0);
  const [initialPositions, setInitialPositions] = useState([]);
  
  const getEntrateLavori = async () => {
    setEntrateLavori(-1);
    saloneStore.setEntrateLavori(-1);
    await SaloneAction.dispatchAction(null, operazioniSaloni.VISUALIZZA_ENTRATE_LAVORI);
    setEntrateLavori(saloneStore.getEntrateLavori());
  };

  const getUsciteSpese = async () => {
    setUsciteSpese(-1);
    saloneStore.setUsciteSpese(-1);
    await SaloneAction.dispatchAction(null, operazioniSaloni.VISUALIZZA_USCITE_SPESE);
    setUsciteSpese(saloneStore.getUsciteSpese());
  };

  useEffect(() => {
    getEntrateLavori();
    const onChange = () => setEntrateLavori(saloneStore.getEntrateLavori());
    saloneStore.addChangeListener(operazioniSaloni.VISUALIZZA_ENTRATE_LAVORI, onChange);
    return () => saloneStore.removeChangeListener(operazioniSaloni.VISUALIZZA_ENTRATE_LAVORI, onChange);
  }, []);

  useEffect(() => {
    getUsciteSpese();
    const onChange = () => setUsciteSpese(saloneStore.getUsciteSpese());
    saloneStore.addChangeListener(operazioniSaloni.VISUALIZZA_USCITE_SPESE, onChange);
    saloneStore.removeChangeListener(operazioniSaloni.VISUALIZZA_USCITE_SPESE, onChange);
    console.log("Aggiornamento in corso...");
    setAggiornamento(true);
  }, []);

  useEffect(() => {
    if(aggiornamento !== 0) {
      if(entrateLavori.length > 0 && usciteSpese.length > 0) {
        console.log("Aggiornamento completato.");
        setInitialPositions([
          { id: '1', tipo: "CardEntrateLavori", entrateLavori: entrateLavori, x: 100, y: 100 }, 
          { id: '2', tipo: "CardUsciteSpese", usciteSpese: usciteSpese, x: 2000, y: 100 }, 
          { id: '3', tipo: "CardRicavi", entrateLavori: entrateLavori, usciteSpese: usciteSpese, x: 100, y: 1000 }
        ]);
        setAggiornamento("FINE"); // Set to a different value to prevent infinite loop
      }      
      else {
        console.log("Aggiornamento in corso...");
        setEntrateLavori(saloneStore.getEntrateLavori());
        setUsciteSpese(saloneStore.getUsciteSpese());
        setAggiornamento(!aggiornamento);
      }
    }
  }, [aggiornamento]);

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
