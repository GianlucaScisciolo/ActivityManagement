export const handleInputChange = (e, setItem) => {
  e.preventDefault();
  const { name, value } = e.target;
    
  setItem(prevState => ({
    ...prevState, 
    [name]: value
  }));
  
  if(name === "id_cliente") {
    setItem(prevState => ({
      ...prevState, 
      "id_professionista": 0
    }));
  }
  else if(name === "id_professionista") {
    setItem(prevState => ({
      ...prevState, 
      "id_cliente": 0
    }));
  }
};









