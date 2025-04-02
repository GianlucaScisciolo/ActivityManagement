/************************************************** React e Redux **************************************************/
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Provider, useSelector } from "react-redux";

/************************************************** Store **************************************************/
import store from "./store/store.js";

/************************************************** View **************************************************/
import App from "./view/App.jsx";
// Autenticazione View
import Login from "./view/autenticazione_view/Login.jsx";
import Profilo from "./view/autenticazione_view/Profilo.jsx";
// Salone View
import Salone from "./view/salone_view/Salone.jsx";
// Cliente View
import Clienti from "./view/cliente_view/Clienti.jsx";
// Servizio View
import Servizi from "./view/servizio_view/Servizi.jsx";
// Spesa View
import Spese from "./view/spesa_view/Spese.jsx";
import FileSpese from "./view/spesa_view/FileSpese.jsx"
// Lavoro View
import Lavori from "./view/lavoro_view/Lavori.jsx";
import FileLavori from "./view/lavoro_view/FileLavori.jsx";

const Root = () => {
  const autenticazioneState = useSelector((state) => state.autenticazioneSliceReducer.value);

  return (
    <BrowserRouter>
    
      <Routes>
        <Route path="/" element={<App />} />
        {(autenticazioneState.isLogged === false) && (
          <Route path="/login" element={<Login />} />
        )}
        {(autenticazioneState.isLogged === true) && (
          <>
            <Route path="/profilo" element={<Profilo />} />
            <Route path="/clienti" element={<Clienti />} />
            <Route path="/servizi" element={<Servizi />} />
            <Route path="/lavori" element={<Lavori />} />
            <Route path="/file-lavori" element={<FileLavori />} />
            <Route path="/spese" element={<Spese />} />
            <Route path="/file-spese" element={<FileSpese />} />
            <Route path="/salone" element={<Salone />} />
          </>
        )}
      </Routes>
    </BrowserRouter>
  );
};

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <Root />
    </Provider>
  </React.StrictMode>
);
