import styled from 'styled-components';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import { Trash2, Pencil, Save, Search } from 'lucide-react';

export const grandezzaIcona = 50;

export const StyledCard = styled(Card)`
  width: 18rem;
  background-color: #111111;
  overflow: hidden;
  border: 5px solid #000000;
  border-radius: 40px;
`;

export const StyledCardHeader = styled(Card.Header)`
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

export const StyledTextArea = styled.textarea`
  width: 100%;
  color: #ffffff;
  background-color: transparent;
  border: 5px solid #000000;
  border-radius: 5px;
  padding: 10px;
  box-sizing: border-box;
  text-align: center;
  min-height: 70px;
`;

export const StyledTextAreaBlock = styled(StyledTextArea)`
  background-color: #111111;
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
  border-radius: 5px;
  padding: 10px;
  box-sizing: border-box;
  text-align: center;
  min-height: 70px;
`;

export const StyledInputBlock = styled(StyledInput)`
  background-color: #111111;
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

export const StyledPencilNotSelected = styled(Pencil)`
  ${styledIconNotSelected}
`;

export const StyledPencilSelected = styled(Pencil)`
  color: #0050EF;
  cursor: pointer;
`;

export const StyledTrashNotSelected = styled(Trash2)`
  ${styledIconNotSelected}
`;

export const StyledTrashSelected = styled(Trash2)`
  color: #500000;
  cursor: pointer;
`;













