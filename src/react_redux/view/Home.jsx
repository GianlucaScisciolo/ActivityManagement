// node_modules
import styled from 'styled-components';
// React e Redux
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { Plus, Save } from 'lucide-react';
// View
import Header from "./components/Header";
import { DragAndDropWidgetHomePage } from "./components/DragAndDrop";
// Actions
import { AttivitaActions } from '../actions/AttivitaActions';

const styledIconNotSelected = `
  color: #FFFFFF;
  cursor: pointer;
  background-color: #000000;
  padding: 10px;
  width: 80px;
  height: auto;
  border-radius: 100%;
  transition: 0.5s all ease-out;

  &:hover {
    color: #0050EF;
  }
`;

const StyledPlusNotSelected = styled(Plus)`
  ${styledIconNotSelected}
`;

const StyledSaveNotSelected = styled(Save)`
  ${styledIconNotSelected}
`;


const Home = () => {
  const attivitaActions = new AttivitaActions();
  const autenticazioneState = useSelector((state) => state.autenticazione.value);
  const [plusCliccato, setPlusCliccato] = useState(false);
  const AddWidgetsTag = plusCliccato ? StyledSaveNotSelected : StyledPlusNotSelected;

  return (
    <>
      <Header />

      <br /> <br /> <br />
      {(autenticazioneState.isLogged === true) && (
        <>
          <div style={{ display: "flex", justifyContent: "flex-end", marginRight: "200px" }}>
            <button
              style={{
                backgroundColor: "transparent",
                border: "none",
                cursor: "pointer",
                outline: "none",
                padding: "10px",
                borderRadius: "100%"
              }}
            >
              <AddWidgetsTag className="right" onClick={(e) => attivitaActions.scegliWidgets(e, setPlusCliccato, plusCliccato)} />
            </button>
          </div>

          <DragAndDropWidgetHomePage plusCliccato={plusCliccato} />
        </>
      )}
    </>
  );
}

export default Home;









