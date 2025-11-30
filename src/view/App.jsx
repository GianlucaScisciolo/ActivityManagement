// React e Redux
import React from "react";
// View
import Home from "./Home.jsx";

import { generateRandomString, encryptPassword, passwordIsCorrect } from "../utils/Sicurezza.js";

function App() {
  return (
    <>
      <Home />
      <button onClick={() => (
        alert(encryptPassword("Password10!!", "agOlMPnXA4lZSZ9i", "13pmcWU1ZAjDFi22U6ANycDY0len2k5H"))
      )} >Cripta password</button>
    </>
  );
}

export default App;









