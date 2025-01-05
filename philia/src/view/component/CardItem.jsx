import React from 'react';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';

const stileCard = () => ({
  width: "18rem",
  backgroundColor: "#111111",
  overflow: "hidden", 
  borderTop: "5px solid #000000",
  borderRight: "5px solid #000000",
  borderLeft: "5px solid #000000",
  borderBottom: "5px solid #000000",  
  borderRadius: "40px",
});

const stileCardHeader = () => ({
  color: "#FFFFFF",
  backgroundColor: "transparent",
  borderTop: "5px solid #000000",
  borderRight: "5px solid #000000",
  borderLeft: "5px solid #000000",
  borderBottom: "5px solid #000000",
  minHeight: "70px",  
});

const stileListGroupItem = () => ({
  color: "#FFFFFF",
  backgroundColor: "transparent",
  borderTop: "5px solid #000000",
  borderRight: "5px solid #000000",
  borderLeft: "5px solid #000000",
  borderBottom: "5px solid #000000", 
  minHeight: "70px",
});

const stileTextArea = () => ({
  width: "100%",
  color: "#FFFFFF",
  backgroundColor: "transparent",
  borderTop: "5px solid #000000",
  borderRight: "5px solid #000000",
  borderLeft: "5px solid #000000",
  borderBottom: "5px solid #000000",
  borderRadius: "5px",
  padding: "10px", // Aggiungi imbottitura per comfort
  boxSizing: "border-box", // Assicura che padding non influenzi larghezza
  textAlign: "center",
  minHeight: "70px",
});

const stileInput = () => ({
  width: "100%",
  color: "#FFFFFF",
  backgroundColor: "transparent",
  borderTop: "5px solid #000000",
  borderRight: "5px solid #000000",
  borderLeft: "5px solid #000000",
  borderBottom: "5px solid #000000",
  borderRadius: "5px",
  padding: "10px", // Aggiungi imbottitura per comfort
  boxSizing: "border-box", // Assicura che padding non influenzi larghezza
  textAlign: "center",
  minHeight: "70px",
});

function CardItem({tipoItem, item}) {
  return (
    <Card style={stileCard()}>
      {/* <Card.Header style={stileCardHeader()}>
        {tipoItem.charAt(0).toUpperCase() + tipoItem.slice(1)}
      </Card.Header> */}
      <ListGroup variant="flush">
        {(tipoItem === "cliente") && (
          <>
            <textarea 
              style={stileTextArea()} 
              rows="1" 
              value={item.nome + " " + item.cognome}
            />
            <input 
              style={stileInput()} 
              rows="1" 
              type='text'
              value={item.contatto}
            />
            <textarea 
              style={stileTextArea()} 
              rows="1" 
              value={item.note}
            />
          </>  
        )}
        {(tipoItem === "professionista") && (
          <>
            <textarea 
              style={stileTextArea()} 
              rows="1" 
              value={item.nome}
            />
            <textarea 
              style={stileTextArea()} 
              rows="1" 
              value={item.professione}
            />
            <input 
              style={stileInput()} 
              rows="1" 
              type='text'
              value={item.contatto}
            />
            <input 
              style={stileInput()} 
              rows="1" 
              type='text'
              value={item.email}
            />
            <textarea 
              style={stileTextArea()} 
              rows="1" 
              value={item.note}
            />
          </>
        )}
        {(tipoItem === "lavoro cliente") && (
          <>
            <textarea 
              style={stileTextArea()} 
              rows="1" 
              value={item.nome_cliente + " " + item.cognome_cliente}
            />
          </>
        )}
        {(tipoItem === "lavoro professionista") && (
          <>
            <textarea 
              style={stileTextArea()} 
              rows="1" 
              value={item.nome_professionista}
            />
            <textarea 
              style={stileTextArea()} 
              rows="1" 
              value={item.professione}
            />
          </>
        )}
        {(tipoItem.startsWith("lavoro")) && (
          <>
            <textarea 
              style={stileTextArea()} 
              rows="1" 
              value={item.descrizione}
            />
            <textarea 
              style={stileTextArea()} 
              rows="1" 
              value={item.giorno}
            />
            <textarea 
              style={stileTextArea()} 
              rows="1" 
              value={item.orario_inizio}
            />
            <textarea 
              style={stileTextArea()} 
              rows="1" 
              value={item.orario_fine}
            />
            <textarea 
              style={stileTextArea()} 
              rows="1" 
              value={item.note}
            />
          </>
        )}
      </ListGroup>
      
      
    </Card>
  );
}

export default CardItem;
/*
        <Item 
          key={`${item.id}`}
          id={item.id} // Passa l'ID come una proprietà distinta
          tipoItem={tipoItem}
          item={item}
          setterItems={setterItems}
          viewElements={viewElements}
          setSelectedTrashCount={setSelectedTrashCount}
          setSelectedPencilCount={setSelectedPencilCount}
          selectedIds={selectedIds}
          setSelectedIds={setSelectedIds}
          selectedIdsModifica={selectedIdsModifica}
          setSelectedIdsModifica={setSelectedIdsModifica}
        />
*/