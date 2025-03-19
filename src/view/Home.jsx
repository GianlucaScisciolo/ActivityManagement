import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';
import { Plus, Save } from 'lucide-react';
import Header from "./component/Header";
import { DragAndDropWidgetHomePage } from "./DragAndDrop";
import { widgetSelected, widgetView } from "../store/redux/WidgetSlice";

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
  const autenticazioneReducer = useSelector((state) => state.autenticazioneReducer.value);
  
  const dispatch = useDispatch();
  const scegliWidgets = (e) => {
    e.preventDefault();
    // console.log(widgetsSession.lavori);
    setPlusCliccato(!plusCliccato);
    if(plusCliccato === true) {
      dispatch(widgetView());
    }
    else if(plusCliccato === false) {
      dispatch(widgetSelected());      
    }
  }
  
  const [plusCliccato, setPlusCliccato] = useState(false);
  const AddWidgetsTag = plusCliccato ? StyledSaveNotSelected : StyledPlusNotSelected;

  return (
    <>
      <Header />

      <br /> <br /> <br />
      {(autenticazioneReducer.isLogged === true) && (
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
              <AddWidgetsTag className="right" onClick={(e) => scegliWidgets(e)} />
            </button>
          </div>

          <DragAndDropWidgetHomePage plusCliccato={plusCliccato} />
        </>
      )}
    </>
  );
}

export default Home;









