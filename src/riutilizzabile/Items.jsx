// Riutilizzabile
import { CardItemEsistente } from "./card_item/CardItem";
import { RowItemEsistente } from "./row_item/RowItem";

export const Items = ({ tipoItem, items, setItems, selectOperation, campi, handleBlurItem, tipoForm, vistaItem }) => {
  const ItemEsistenteTag = vistaItem === "card" ? CardItemEsistente : RowItemEsistente;

  const ItemElements = () => {
    return (
      <>
        {items.map((item, index) => {
          return (
            <ItemEsistenteTag 
              key={index}
              item={item}
              campi={(item) ? campi(item, null, null, null ) : []}
              indici={[...Array(campi(item, null, null, null).label.length).keys()]}
              selectOperation={selectOperation}
              items={items}
              setItems={setItems}
              tipoItem={tipoItem}
              handleBlurItem={handleBlurItem}
            />
          );
        })}
      </>
    );
  };

  return (
    <>
      {tipoForm === "search" && items.length === 0 && (
        <div className="contenitore-1">Nessun elemento trovato.</div>
      )}
      {items.length > 0 && (
        <>
          {vistaItem === "card" ? (
            <div className="contenitore-3">
              <ItemElements />
            </div>
          ) : (
            <ItemElements />
          )}
        </>
      )}
    </>
  );
};