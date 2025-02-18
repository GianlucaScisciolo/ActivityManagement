import { useSelector } from "react-redux";
import { CardItemEsistente } from "./card_item/CardItem";
import { RowItemEsistente } from "./row_item/RowItem";
import { CardLavoroEsistente } from "./card_item/CardsLavori";
import { RowLavoroEsistente } from "./row_item/RowsLavori";
import { handleInputChangeLavoroEsistente } from "../../vario/Vario";

const getCampiCliente = (item) => {
  return {
    header: "Cliente", 
    tipoSelezione: item.tipo_selezione,  
    type: [null, "text", null],  
    name: ["nome_e_cognome", "contatto", "note"], 
    value: [item.nome + " " + item.cognome, item.contatto, item.note], 
    placeholder: ["Nome e cognome", "Contatto", "Note"], 
    valoreModificabile: [false, true, true], 
    onChange: (e) => handleInputChange(e, setItems), 
    onClick: null, 
    onBlur: null
  };
};

const getCampiProfessionista = (item) => {
  return {
    header: "Professionista", 
    tipoSelezione: item.tipo_selezione,
    type: [null, "text", "text", null], 
    name: ["nome e professione", "contatto", "email", "note"], 
    value: [item.nome + " - " + item.professione, item.contatto, item.email, item.note], 
    placeholder: ["Nome e professione", "Contatto", "Email", "Note"], 
    valoreModificabile: [false, true, true, true], 
    onChange: (e) => handleInputChange(e, setItems), 
    onClick: null, 
    onBlur: null
  };
};

const getCampiLavoro = (item) => {
  return "Da definire!!";
}

const indiciCliente = [0, 1, 2];
const indiciProfessionista = [0, 1, 2, 3];
const indiciLavoro = "Da definire";

export const Items = ({tipoItem, items, selectOperation, emptyIsConsidered}) => {
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

export const ItemsLavori = ({tipoItem, items, setItems, selectOperation, emptyIsConsidered, lavoriGiorniPresenti}) => {
  const formSession = useSelector((state) => state.formSession.value);
  const itemSession = useSelector((state) => state.itemSession.value);
  const LavoroEsistenteTag = (itemSession.view === "card") ? CardLavoroEsistente : RowLavoroEsistente;

  const ItemElement = ({key, lavoro, lavoriGiorniPresenti}) => {
    let lavoriGiorno = lavoriGiorniPresenti[lavoro.giorno];
    return (
      <LavoroEsistenteTag 
        key={key}
        handleInputChangeLavoroEsistente={handleInputChangeLavoroEsistente}
        item={lavoro} 
        items={items} 
        setItems={setItems} 
        selectOperation={selectOperation} 
        lavoriGiorno={lavoriGiorno}
      />
    )
  }

  return (
    <>
      {(items.length <= 0 && emptyIsConsidered) && (
        <div className='contenitore-1'>Nessun {tipoItem} trovato!!</div>
      )}
      {(items.length > 0) && (
        <>
          {(itemSession.view === "card") ? (
            <div className="contenitore-3">
              {items.map((item, index) => (
                <ItemElement
                  key={index} 
                  lavoro={item} 
                  lavoriGiorniPresenti={lavoriGiorniPresenti} 
                />
              ))}
            </div>
          ) : (     
            items.map((item, index) => (
              <ItemElement
                key={index} 
                lavoro={item} 
                lavoriGiorniPresenti={lavoriGiorniPresenti} 
              />
            ))
          )} 
        </>
      )}
    </>
  )
}











