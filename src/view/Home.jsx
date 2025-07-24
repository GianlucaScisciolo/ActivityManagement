// React e Redux
import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Plus, Save } from 'lucide-react';
import styled from 'styled-components';
// View
import Header from "./components/Header";
import { DragAndDropWidgetHomePage } from "./components/DragAndDrop";
// Actions
import { SaloneActions } from '../actions/SaloneActions';
import { generateRandomString, encryptPassword, passwordIsCorrect, PEPPER_HEX } from '../utils/Sicurezza';

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
  const saloneActions = new SaloneActions();
  const autenticazioneState = useSelector((state) => state.autenticazioneSliceReducer.value);
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
              <AddWidgetsTag className="right" onClick={(e) => saloneActions.scegliWidgets(e, setPlusCliccato, plusCliccato)} />
            </button>
          </div>

          <DragAndDropWidgetHomePage plusCliccato={plusCliccato} />
        </>
      )}
      
      <button onClick={
        (e) => {
          let salt_hex = generateRandomString(32);
          let password_criptata = encryptPassword("PassWord10!!", salt_hex, PEPPER_HEX)
          console.log("SALT_HEX: " + salt_hex);
          console.log("PASSWORD CRIPTATA: " + password_criptata);
        }
      }>Password criptata</button>
      
    </>
  );
}

export default Home;









