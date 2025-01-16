import styled from 'styled-components';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import Row from 'react-bootstrap/esm/Row';
import Col from 'react-bootstrap/esm/Col';
import { Trash2, Pencil, Save, Search, ChevronUp, ChevronDown, LogIn } from 'lucide-react';

export const grandezzaIcona = 50;

export const StyledForm = styled(Card)`
  background-color: #111111;
  overflow: hidden;
  border: 5px solid #000000;
  border-radius: 40px;
  margin-left: 30%;
  margin-right: 30%;

  color: white;
  text-align: center;
`;

export const StyledHeader = styled(Card.Header)`
  color: #ffffff;
  background-color: transparent;
  border: 5px solid #000000;
  min-height: 70px;
`;

export const StyledListGroupItem = styled(ListGroup.Item)`
  color: #ffffff;
  background-color: transparent;
  border: 5px solid #000000;
  min-height: 70px;
`;

export const SlideContainer = styled.div`
  /* max-height: ${(props) => ((props.$isvisible === "true") ? '2000px' : '0px')};  */
  overflow: hidden;
  transition: max-height 1.5s ease-out;
`;


export const StyledRow = styled(Row)`
  display: flex;
  flex-wrap: wrap;
  padding-left: 3%;
  padding-right: 3%;
`;

export const StyledCol = styled(Col)`
  position: relative; 
  color: #FFFFFF;
  border-radius: 40px;
  padding: 0;
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  height: auto;
  min-height: 50px;
  min-width: 300px;
`;

export const StyledLabel = styled.label`
  width: 100%;
  color: #ffffff;
  background-color: transparent;
  border-radius: 40px;
  padding: 10px;
  box-sizing: border-box;
  text-align: center;
  min-height: 70px;
  margin-top: 2%;
`;

export const StyledTextArea = styled.textarea`
  width: 100%;
  color: #ffffff;
  background-color: transparent;
  border: 5px solid #000000;
  padding: 10px;
  box-sizing: border-box;
  text-align: center;
  min-height: 70px;
  margin-bottom: 20px;
`;

export const StyledTextAreaBlock = styled(StyledTextArea)`
  background-color: #000000;
`;

export const StyledTextAreaModifica = styled(StyledTextArea)`
  background-color: #0050EF;
`;

export const StyledTextAreaElimina = styled(StyledTextArea)`
  background-color: #500000;
`;

export const StyledInput = styled.input`
  width: 100%;
  color: #ffffff;
  background-color: transparent;
  border: 5px solid #000000;
  padding: 10px;
  box-sizing: border-box;
  text-align: center;
  min-height: 70px;
  margin-bottom: 20px;
`;

export const StyledInputBlock = styled(StyledInput)`
  background-color: #000000;
`;

export const StyledInputModifica = styled(StyledInput)`
  background-color: #0050EF;
`;

export const StyledInputElimina = styled(StyledInput)`
  background-color: #500000;
`;

const styledIconNotSelected = `
  color: #FFFFFF;
  cursor: pointer;
`;

export const StyledSaveNotSelected = styled(Save)`
  ${styledIconNotSelected}
  transition: 0.5s all ease-out;
  &:hover {
    color: #0050EF;
  }
`;

export const StyledSearchNotSelected = styled(Search)`
  ${styledIconNotSelected}
  transition: 0.5s all ease-out;
  &:hover {
    color: #0050EF;
  }
`;

export const StyledArrowTopNotSelected = styled(ChevronUp)`
  ${styledIconNotSelected}
  transition: 0.5s all ease-out;
  &:hover {
    color: #0050EF;
  }
`;

export const StyledArrowBottomNotSelected = styled(ChevronDown)`
  ${styledIconNotSelected}
  transition: 0.5s all ease-out;
  &:hover {
    color: #0050EF;
  }
`;

export const StyledLoginNotSelected = styled(LogIn)`
  ${styledIconNotSelected}
  transition: 0.5s all ease-out;
  &:hover {
    color: #0050EF;
  }
`;

export const StyledButton =  styled.button`
  border-radius: 40px;
  border: 5px solid #000000;
  background-color: #000000;
  color: #FFFFFF;
  text-align: center;  
  padding: 2% 15%;
  cursor: pointer;
`;

export const BottoneBluNonSelezionato =  styled(StyledButton)`
  transition: 0.5s all ease-out;
  &:hover {
    background-color: #0050EF;
    color: #FFFFFF;
  }
`;

export const BottoneRossoNonSelezionato =  styled(StyledButton)`
  transition: 0.5s all ease-out;
  &:hover {
    background-color: #500000;
    color: #FFFFFF;
  }
`;

export const BottoneBluSelezionato =  styled(StyledButton)`
  background-color: #0050EF;
`;

export const BottoneRossoSelezionato =  styled(StyledButton)`
  background-color: #500000;
`;

export const StyledSelect =  styled.select`
  background-color: #0050EF;
  border: 5px solid #000000;
  color: #FFFFFF;
  text-align: center;
`;

export const StyledOption =  styled.option`
  background-color: #0050EF;
  &:hover {
    background-color: #0050EF;
  }
`;

export const StyledSpanErrore =  styled.span`
  color: #FF0000;
  /* background-color: #000000; */
  padding: 10px;
`;

export const StyledPencilNotSelected = styled(Pencil)`
  ${styledIconNotSelected}
  transition: 0.5s all ease-out;
  &:hover {
    color: #0050EF;
  }
`;