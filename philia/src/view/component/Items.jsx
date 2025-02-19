import { useSelector } from "react-redux";
import { CardItemEsistente } from "./card_item/CardItem";
import { RowItemEsistente } from "./row_item/RowItem";
import { CardLavoroEsistente } from "./card_item/CardsLavori";
import { RowLavoroEsistente } from "./row_item/RowsLavori";
import { handleInputChangeLavoroEsistente, handleInputChange } from "../../vario/Vario";



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

const indiciProfessionista = [0, 1, 2, 3];
const indiciLavoro = "Da definire";

export const Items = ({tipoItem, items, setItems, selectOperation, emptyIsConsidered, campi, indici}) => {
  const formSession = useSelector((state) => state.formSession.value);
  const itemSession = useSelector((state) => state.itemSession.value);
  const ItemEsistenteTag = (itemSession.view === "card") ? CardItemEsistente : RowItemEsistente;
  
  const ItemElements = ({items}) => {
    return (
      <>
        {items.map((item, index) => {
          return (
            <ItemEsistenteTag 
              key={index} 
              item={item} 
              campi={campi(item, (e) => handleInputChange(e, setItems), null, null)} 
              indici={indici} 
              selectOperation={selectOperation} 
            />
          )
        })}
      </>
    );
  }

  return (
    <>
      {(items.length <= 0 && emptyIsConsidered) && (
        <div className='contenitore-1'>Nessun {tipoItem} trovato!!</div>
      )}
      {(items.length > 0) && (
        <>
          {itemSession.view === "card" ? (
            <div className="contenitore-3">
              <ItemElements items={items} />
            </div>
          ) : (
            <ItemElements items={items} />
          )}
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











