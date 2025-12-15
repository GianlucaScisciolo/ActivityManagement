// React
import { useState, useEffect } from "react";

const OptionsClientiNuovoLavoro = ({ clienti, item, setItem, classeFormWrapperCheckbox }) => {
  const [clientiSelezionati, setClientiSelezionati] = useState([]);
  const [clientiNonSelezionati, setClientiNonSelezionati] = useState(Object.values(clienti));
  
  useEffect(() => {
    setClientiNonSelezionati(Object.values(clienti));
  }, [clienti]);
  
  const optionStr = (cliente) => {
    return cliente.nome + " " + cliente.cognome +
      ((cliente.contatto && cliente.contatto !== "Contatto non inserito.") ? (" - " + cliente.contatto) : "") + 
      ((cliente.email && cliente.email !== "Email non inserita.") ? (" - " + cliente.email) : "")
  }
  
  const sottoStringa = item.cliente ?  item.cliente : "";

  const handleCheckboxChange = (e, cliente) => {
    if (e.target.checked) {
      if (clientiSelezionati.length === 0) {
        setClientiSelezionati([cliente]);
        setClientiNonSelezionati(clientiNonSelezionati.filter(c => c.id !== cliente.id));
        setItem(prevState => ({
          ...prevState,
          id_cliente: cliente.id
        }));
      } 
      else {
        // Sposta il cliente già presente in clientiSelezionati a clientiNonSelezionati
        const clienteCorrente = clientiSelezionati[0];
        setClientiNonSelezionati([
          ...clientiNonSelezionati,
          clienteCorrente
        ].filter(c => c.id !== cliente.id));
  
        // Aggiorna il cliente selezionato
        setClientiSelezionati([cliente]);
        setItem(prevState => ({
          ...prevState,
          id_cliente: cliente.id
        }));
      }
    } else {
      // Deseleziona il cliente e reimposta lo stato
      setClientiSelezionati([]);
      setClientiNonSelezionati([...clientiNonSelezionati, cliente]);
      setItem(prevState => ({
        ...prevState,
        id_cliente: 0
      }));
    }
  };
  

  return (
    <>
      {(clienti !== -1) && (
        <>
          <div>
            Seleziona solo 1 cliente:<br />
            {clientiNonSelezionati.filter(cliente => 
              optionStr(cliente).toLowerCase().includes(sottoStringa.toLowerCase())
            ).map((cliente, index) => (
              <div key={index} className={classeFormWrapperCheckbox + " clientiNonSelezionati"}>
                <input 
                  type="checkbox" 
                  id={"cliente_non_sel_" + index} 
                  name={"cliente_non_sel_" + index} 
                  value={cliente.id}
                  checked={false}
                  onChange={(e) => handleCheckboxChange(e, cliente)}
                  className="custom-checkbox-rounded"
                />
                <label htmlFor={"cliente_non_sel_" + index}>
                  {optionStr(cliente)}
                </label>
              </div>                
            ))}
          </div>
          <div>
            {clientiSelezionati.map((cliente, index) => (
              <div key={index} className={classeFormWrapperCheckbox + " clientiSelezionati"}>
                <input 
                  type="checkbox" 
                  id={"cliente_sel_" + index} 
                  name={"cliente_sel_" + index} 
                  value={cliente.id} 
                  checked={true}
                  onChange={(e) => handleCheckboxChange(e, cliente)}
                  className="custom-checkbox-rounded"
                />
                <label htmlFor={"cliente_sel_" + index}>
                  {optionStr(cliente)}
                </label>
              </div>
            ))}
          </div>
        </>
      )}
    </>
  );
};

export default OptionsClientiNuovoLavoro;









