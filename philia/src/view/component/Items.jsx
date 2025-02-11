import { useSelector } from "react-redux";
import { CardItemEsistente } from "./card_item/CardItem";
import { RowItemEsistente } from "./row_item/RowItem";

const getCampiCliente = (item) => {
  return {
    header: "Cliente", 
    tipoSelezione: item.tipo_selezione,  
    type: [null, null, "text", null],  
    name: ["nome", "cognome", "contatto", "note"], 
    value: [item.nome, item.cognome, item.contatto, item.note], 
    placeholder: ["Nome", "Cognome", "Contatto", "Note"], 
    valoreModificabile: [false, false, true, true], 
    onChange: (e) => handleInputChange(e, setItems), 
    onClick: null, 
    onBlur: null
  };
};

const getCampiProfessionista = (item) => {
  return {
    header: "Professionista", 
    tipoSelezione: item.tipo_selezione,
    type: [null, null, "text", "text", null], 
    name: ["nome", "professione", "contatto", "email", "note"], 
    value: [item.nome, item.professione, item.contatto, item.email, item.note], 
    placeholder: ["Nome", "Professione", "Contatto", "Email", "Note"], 
    valoreModificabile: [false, false, true, true, true], 
    onChange: (e) => handleInputChange(e, setItems), 
    onClick: null, 
    onBlur: null
  }
};

const indiciCliente = [0, 1, 2, 3];
const indiciProfessionista = [0, 1, 2, 3, 4];

const Items = ({tipoItem, items, selectOperation, emptyIsConsidered}) => {
  const formSession = useSelector((state) => state.formSession.value);
  const itemSession = useSelector((state) => state.itemSession.value);
  const ItemEsistenteTag = (itemSession.view === "card") ? CardItemEsistente : RowItemEsistente;
  return (
    <>
      {(items.length <= 0 && emptyIsConsidered) && (
        <div className='contenitore-1'>Nessun {tipoItem} trovato!!</div>
      )}
      {(items.length > 0) && (
        <>
          {items.map((item, index) => {
            return (
              <ItemEsistenteTag 
                key={index} 
                item={item} 
                campi={(tipoItem === "cliente") ? getCampiCliente(item) : getCampiProfessionista(item)} 
                indici={(tipoItem === "cliente") ? indiciCliente : indiciProfessionista} 
                selectOperation={selectOperation} 
              />
            )
          })}
        </>
      )}
    </>
  )
}

export default Items;









