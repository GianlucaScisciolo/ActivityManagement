import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Provider, useSelector } from "react-redux";
import store from "./store/redux/store.js";

import App from "./App.jsx";
import Home from "./view/Home.jsx";
import Login from "./view/autenticazione_view/Login.jsx";
import NuovoCliente from "./view/persona_view/NuovoCliente.jsx";
import NuovoProfessionista from "./view/professionista_view/NuovoProfessionista.jsx";
import NuovoLavoro from "./view/lavoro_view/NuovoLavoro.jsx";
import Clienti from "./view/persona_view/Clienti.jsx";
import Professionisti from "./view/professionista_view/Professionisti.jsx";
import Lavori from "./view/lavoro_view/Lavori.jsx";
import Profilo from "./view/persona_view/Profilo.jsx";
import FileLavori from "./view/lavoro_view/FileLavori.jsx";

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
            <Route path="/professionisti" element={<Professionisti />} />
            <Route path="/nuovo-professionista" element={<NuovoProfessionista />} />
            <Route path="/lavori" element={<Lavori />} />
            <Route path="/nuovo-lavoro" element={<NuovoLavoro />} />
            <Route path="/file-lavori" element={<FileLavori />} />
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
