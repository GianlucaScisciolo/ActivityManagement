import Row from "react-bootstrap/esm/Row";
import Col from "react-bootstrap/esm/Col";
import { formatoDate, formatoTime } from "../../../vario/Tempo";
import { 
  StyledRow, StyledCol, StyledColOperazioni, grandezzaIcona, 
  StyledTextAreaBlock, StyledTextAreaModifica, StyledTextAreaElimina, 
  StyledInputBlock, StyledInputModifica, StyledInputElimina, 
  StyledSaveNotSelected, StyledSearchNotSelected, 
  StyledArrowTopNotSelected, StyledArrowBottomNotSelected,  
  StyledPencilNotSelected, StyledPencilSelected, 
  StyledTrashNotSelected, StyledTrashSelected,
} from "./StyledRowItem";

const PencilTag = ({ tipoSelezione, selectOperation }) => {
  switch(tipoSelezione) {
    case 0:
    case 2:
      return <StyledPencilNotSelected size={grandezzaIcona} onClick={() => selectOperation("pencil")} style={{marginRight: "50%"}} />;
    case 1:
      return <StyledPencilSelected size={grandezzaIcona} onClick={() => selectOperation("pencil")} style={{marginRight: "50%"}} />;
    default:
      return <></>;
  }
}

const TrashTag = ({ tipoSelezione, selectOperation }) => {
  switch(tipoSelezione) {
    case 0:
    case 1:
      return <StyledTrashNotSelected size={grandezzaIcona} onClick={() => selectOperation("trash")} />;
    case 2:
      return <StyledTrashSelected size={grandezzaIcona} onClick={() => selectOperation("trash")} />;
    default:
      return <></>;
  }
}

const TextAreaTag = ({ tipoSelezione, nome, valore, modificabile }) => {
  switch(tipoSelezione) {
    case 0:
      return <StyledCol><StyledTextAreaBlock rows="1" name={nome} value={valore} /></StyledCol>;
    case 1:
      return <StyledCol>{(modificabile) 
                            ? <StyledTextAreaModifica rows="1" name={nome} value={valore} />
                            : <StyledTextAreaBlock rows="1" name={nome} value={valore} />}</StyledCol>;
    case 2:
      return <StyledCol><StyledTextAreaElimina rows="1" name={nome} value={valore} /></StyledCol>;
    default:
      return <></>;
  }
}

const InputTag = ({ tipoSelezione, tipo, nome, valore, modificabile }) => {
  switch(tipoSelezione) {
    case 0:
      return <StyledCol><StyledInputBlock rows="1" type={tipo} name={nome} value={valore} /></StyledCol>;
    case 1:
      return <StyledCol>{(modificabile) 
                            ? <StyledInputModifica rows="1" type={tipo} name={nome} value={valore} />
                            : <StyledInputBlock rows="1" type={tipo} name={nome} value={valore} />}</StyledCol>;
    case 2:
      return <StyledCol><StyledInputElimina rows="1" type={tipo} name={nome} value={valore} /></StyledCol>;
    default:
      return <></>;
  }
}

const OperazioniItemEsistente = ({ tipoSelezione, selectOperation }) => {
  return (
    <StyledColOperazioni>
      <PencilTag tipoSelezione={tipoSelezione} selectOperation={selectOperation} />
      <TrashTag tipoSelezione={tipoSelezione} selectOperation={selectOperation} />
    </StyledColOperazioni>
  )
}

const OperazioniNuovoItem = () => {
  return (
    <StyledColOperazioni>
      <StyledSaveNotSelected size={grandezzaIcona} />
    </StyledColOperazioni>
  )
}

const OperazioniCercaItems = () => {
  return (
    <StyledColOperazioni>
      <StyledSearchNotSelected size={grandezzaIcona} style={{ marginRight: "25%" }}/>
      <StyledArrowTopNotSelected size={grandezzaIcona} />
      <StyledArrowBottomNotSelected size={grandezzaIcona} style={{marginLeft: "25%", }}/>
    </StyledColOperazioni>
  )
}

function RowCliente({item, selectOperation}) {
  return (
    <>
        <OperazioniItemEsistente tipoSelezione={item.tipo_selezione} selectOperation={selectOperation} />
        <StyledCol><TextAreaTag tipoSelezione={item.tipo_selezione} nome="nome_cognome" valore={item.nome + " " + item.cognome} modificabile={false} /></StyledCol>
        <StyledCol><InputTag tipoSelezione={item.tipo_selezione} tipo="text" nome="contatto" valore={item.contatto} modificabile={true} /></StyledCol>
        <StyledCol><TextAreaTag tipoSelezione={item.tipo_selezione} nome="note" valore={item.note} modificabile={true} /></StyledCol>
    </>
  );
}

function RowNuovoCliente({item}) {
  return (
    <>
      <OperazioniNuovoItem />
      <StyledCol><StyledTextAreaModifica rows="1" placeholder='Nome*' name="nome" value={item.nome} /></StyledCol>
      <StyledCol><StyledTextAreaModifica rows="1" placeholder='Cognome*' name="cognome" value={item.cognome} /></StyledCol>
      <StyledCol><StyledInputModifica rows="1" type="text" placeholder='Contatto*' name="contatto" value={item.contatto} /></StyledCol>
      <StyledCol><StyledTextAreaModifica rows="1" placeholder='Note' name="note" value={item.note} /></StyledCol>
    </>
  );
}

function RowCercaClienti({item}) {
  return (
    <>
      <OperazioniCercaItems />
      <StyledCol><StyledTextAreaModifica rows="1" placeholder='Nome*' name="nome" value={item.nome} /></StyledCol>
      <StyledCol><StyledTextAreaModifica rows="1" placeholder='Cognome*' name="cognome" value={item.cognome} /></StyledCol>
      <StyledCol><StyledInputModifica rows="1" type="text" placeholder='Contatto*' name="contatto" value={item.contatto} /></StyledCol>
      <StyledCol><StyledTextAreaModifica rows="1" placeholder='Note' name="note" value={item.note} /></StyledCol>  
    </>
  );
}

function RowProfessionista({item, selectOperation}) {
  return (
    <>
      <OperazioniItemEsistente tipoSelezione={item.tipo_selezione} selectOperation={selectOperation} />
      <TextAreaTag tipoSelezione={item.tipo_selezione} nome="nome" valore={item.nome} modificabile={false} />
      <TextAreaTag tipoSelezione={item.tipo_selezione} nome="professione" valore={item.professione} modificabile={false} />
      <InputTag tipoSelezione={item.tipo_selezione} tipo="text" nome="contatto" valore={item.contatto} modificabile={true} />
      <InputTag tipoSelezione={item.tipo_selezione} tipo="email" nome="email" valore={item.email} modificabile={true} />
      <TextAreaTag tipoSelezione={item.tipo_selezione} nome="note" valore={item.note} modificabile={true} />
    </>
  );
}

function RowNuovoProfessionista({item}) {
  return (
    <>
      <OperazioniNuovoItem />
      <StyledCol><StyledTextAreaModifica rows="1" name="nome" placeholder='Nome*' value={item.nome} /></StyledCol>
      <StyledCol><StyledInputModifica rows="1" type="text" name="contatto" placeholder='Contatto' value={item.contatto} /></StyledCol>
      <StyledCol><StyledInputModifica rows="1" type="text" name="email" placeholder='Email' value={item.email} /></StyledCol>
      <StyledCol><StyledTextAreaModifica rows="1" name="note" placeholder='Note' value={item.note} /></StyledCol>
    </>
  );
}

function RowCercaProfessionisti({item}) {
  return (
    <>
      <OperazioniCercaItems />
      <StyledCol><StyledTextAreaModifica rows="1" name="nome" placeholder='Nome*' value={item.nome} /></StyledCol>
      <StyledCol><StyledTextAreaModifica rows="1" name="professione" placeholder='Professione*' value={item.professione} /></StyledCol>
      <StyledCol><StyledInputModifica rows="1" type="text" name="contatto" placeholder='Contatto' value={item.contatto} /></StyledCol>
      <StyledCol><StyledInputModifica rows="1" type="text" name="email" placeholder='Email' value={item.email} /></StyledCol>
      <StyledCol><StyledTextAreaModifica rows="1" name="note" placeholder='Note' value={item.note} /></StyledCol>
    </>
  );
}

function RowLavoro({tipoItem, item, selectOperation}) {
  return (
    <>
      <OperazioniItemEsistente tipoSelezione={item.tipo_selezione} selectOperation={selectOperation} />
      {(tipoItem === "lavoro cliente") && (
        <TextAreaTag tipoSelezione={item.tipo_selezione} nome="nome_cognome_cliente" valore={item.nome_cliente + " " + item.cognome_cliente} modificabile={false} />
      )}
      {(tipoItem === "lavoro professionista") && (
        <>
          <TextAreaTag tipoSelezione={item.tipo_selezione} nome="nome_professionista" valore={item.nome_professionista} modificabile={false} />
          <TextAreaTag tipoSelezione={item.tipo_selezione} nome="professione" valore={item.professione} modificabile={false} />
        </>
      )}
      {(tipoItem.startsWith("lavoro")) && (
        <>
          <TextAreaTag tipoSelezione={item.tipo_selezione} nome="descrizione" valore={item.descrizione} modificabile={true} />
          <InputTag tipoSelezione={item.tipo_selezione} tipo="date" nome="giorno" valore={formatoDate(item.giorno, "AAAA-MM-GG")} modificabile={true} />
          <InputTag tipoSelezione={item.tipo_selezione} tipo="time" nome="orario_inizio" valore={formatoTime(item.orario_inizio)} modificabile={true} />
          <InputTag tipoSelezione={item.tipo_selezione} tipo="time" nome="orario_fine" valore={formatoTime(item.orario_inizio)} modificabile={true} />
          <TextAreaTag tipoSelezione={item.tipo_selezione} nome="note" valore={item.note} modificabile={true} />
        </>
      )}
    </>
  );
}

function RowNuovoLavoro({item}) {
  return (
    <>
      <OperazioniNuovoItem />
      <StyledCol><StyledTextAreaModifica rows="1" name="cliente" placeholder='cliente' value="Mario Rossi" /></StyledCol>
      <StyledCol><StyledTextAreaModifica rows="1" name="professionista" placeholder='professionista' value="Alessandro Volta SRL" /></StyledCol>
      <StyledCol><StyledTextAreaModifica rows="1" name="professione" placeholder='professione' value="Elettricisti" /></StyledCol>
      {/* <StyledTextAreaModifica rows="1" name="id_cliente" placeholder='Cliente'/> */}
      {/* <StyledTextArea rows="1" name="id_professionista" placeholder='Professionista'/> */}
      <StyledCol><StyledTextAreaModifica rows="1" name="descrizione" placeholder='Descrizione*' value={item.descrizione} /></StyledCol>
      <StyledCol><StyledTextAreaModifica rows="1" name="giorno" placeholder='Giorno*' value={formatoDate(item.giorno, "AAAA-MM-GG")} /></StyledCol>
      <StyledCol><StyledTextAreaModifica rows="1" name="orario_inizio" placeholder='Orario inizio*' value={formatoTime(item.orario_inizio)} /></StyledCol>
      <StyledCol><StyledTextAreaModifica rows="1" name="orario_fine" placeholder='Orario fine*' value={formatoTime(item.orario_fine)} /></StyledCol>
      <StyledCol><StyledTextAreaModifica rows="1" name="note" placeholder='Note' value={item.note} /></StyledCol>
    </>
  );
}

function RowCercaLavori({item}) {
  return (
    <>
      <OperazioniCercaItems />
      <StyledCol><StyledTextAreaModifica rows="1" name="nome_cliente" placeholder='Nome cliente' value={item.nomeCliente} /></StyledCol>
      <StyledCol><StyledTextAreaModifica rows="1" name="cognome_cliente" placeholder='Cognome cliente' value={item.cognomeCliente} /></StyledCol>
      <StyledCol><StyledTextAreaModifica rows="1" name="nome_professionista" placeholder='Nome professionista' value={item.nomeProfessionista} /></StyledCol>
      <StyledCol><StyledTextAreaModifica rows="1" name="descrizione" placeholder='Descrizione' value={item.descrizione} /></StyledCol>
      <StyledCol><StyledInputModifica rows="1" type="date" name="primo_giorno" placeholder='Primo giorno' value={item.primoGiorno} /></StyledCol>
      <StyledCol><StyledInputModifica rows="1" type="date" name="ultimo_giorno" placeholder='Ultimo giorno' value={item.ultimoGiorno} /></StyledCol>
      <StyledCol><StyledTextAreaModifica rows="1" name="note" placeholder='Note' value={item.note} /></StyledCol>
    </>
  );
}

function RowItem({selectOperation, tipoItem, item}) {
  return (
    <>
      <StyledRow>
      {(tipoItem === "cliente") &&(
        <RowCliente item={item} selectOperation={selectOperation} />
      )}
      {(tipoItem === "nuovo cliente") &&(
        <RowNuovoCliente item={item} />
      )}
      {(tipoItem === "cerca clienti") &&(
        <RowCercaClienti item={item} />
      )}
      {(tipoItem === "professionista") &&(
        <RowProfessionista item={item} selectOperation={selectOperation} />
      )}
      {(tipoItem === "nuovo professionista") &&(
        <RowNuovoProfessionista item={item} />
      )}
      {(tipoItem === "cerca professionisti") &&(
        <RowCercaProfessionisti item={item} />
      )}
      {(tipoItem.startsWith("lavoro")) &&(
        <RowLavoro tipoItem={tipoItem} item={item} selectOperation={selectOperation} />
      )}
      {(tipoItem.startsWith("nuovo lavoro")) &&(
        <RowNuovoLavoro item={item} />
      )}
      {(tipoItem.startsWith("cerca lavori")) &&(
        <RowCercaLavori item={item} />
      )}
      {(tipoItem.startsWith("modifica profilo")) &&(
        <RowModificaProfilo item={item} />
      )}
      </StyledRow>
    </>
  );
}

export default RowItem;









