import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Provider, useSelector } from "react-redux";

import store from "./store/redux/store.js";

import App from "./view/App.jsx";

import Salone from "./view/salone_view/Salone.jsx";

import Login from "./view/autenticazione_view/Login.jsx";
import Profilo from "./view/autenticazione_view/Profilo.jsx";

import NuovoCliente from "./view/cliente_view/NuovoCliente.jsx";
import Clienti from "./view/cliente_view/Clienti.jsx";

import NuovoServizio from "./view/servizio_view/NuovoServizio.jsx";
import Servizi from "./view/servizio_view/Servizi.jsx";

import NuovaSpesa from "./view/spesa_view/NuovaSpesa.jsx";
import Spese from "./view/spesa_view/Spese.jsx";
import FileSpese from "./view/spesa_view/FileSpese.jsx"

import NuovoLavoro from "./view/lavoro_view/NuovoLavoro.jsx";
import Lavori from "./view/lavoro_view/Lavori.jsx";
import FileLavori from "./view/lavoro_view/FileLavori.jsx";

// console.log("Store:", store.getState());

const Root = () => {
  const autenticazioneSession = useSelector((state) => state.autenticazioneSession.value);

  return (
    <BrowserRouter>
    
      <Routes>
        <Route path="/" element={<App />} />
        {(autenticazioneSession.isLogged === false) && (
          <Route path="/login" element={<Login />} />
        )}
        {(autenticazioneSession.isLogged === true) && (
          <>
            <Route path="/profilo" element={<Profilo />} />
            <Route path="/clienti" element={<Clienti />} />
            <Route path="/nuovo-cliente" element={<NuovoCliente />} />
            <Route path="/servizi" element={<Servizi />} />
            <Route path="/nuovo-servizio" element={<NuovoServizio />} />
            <Route path="/lavori" element={<Lavori />} />
            <Route path="/nuovo-lavoro" element={<NuovoLavoro />} />
            <Route path="/file-lavori" element={<FileLavori />} />
            <Route path="/nuova-spesa" element={<NuovaSpesa />} />
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
