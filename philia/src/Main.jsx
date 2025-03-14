import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Provider, useSelector } from "react-redux";
import store from "./store/redux/store.js";

import App from "./app/app_view/App.jsx"
import Salone from "./salone/salone_view/Salone.jsx"

import Login from "./autenticazione/autenticazione_view/Login.jsx";
import Profilo from "./autenticazione/autenticazione_view/Profilo.jsx";

import NuovoCliente from "./cliente/ciente_view/NuovoCliente.jsx";
import Clienti from "./cliente/ciente_view/Clienti.jsx";

import NuovoServizio from "./servizio/servizio_view/NuovoServizio.jsx";
import Servizi from "./servizio/servizio_view/Servizi.jsx";

import NuovaSpesa from "./spesa/spesa_view/NuovaSpesa.jsx";
import Spese from "./spesa/spesa_view/Spese.jsx";
import FileSpese from "./spesa/spesa_view/FileSpese.jsx"

import NuovoLavoro from "./lavoro/lavoro_view/NuovoLavoro.jsx";
import Lavori from "./lavoro/lavoro_view/Lavori.jsx";
import FileLavori from "./lavoro/lavoro_view/FileLavori.jsx";

console.log("Store:", store.getState());

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
