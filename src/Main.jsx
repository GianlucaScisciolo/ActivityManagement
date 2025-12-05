// React e Redux
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Provider, useSelector } from "react-redux";

// Store
import store from "./react_redux/store/store.js";

// View
import App from "./react_redux/view/App.jsx";
import Login from "./react_redux/view/autenticazione_view/Login.jsx";
import Profilo from "./react_redux/view/autenticazione_view/Profilo.jsx";
import Salone from "./react_redux/view/salone_view/Salone.jsx";
import Clienti from "./react_redux/view/cliente_view/Clienti.jsx";
import Servizi from "./react_redux/view/servizio_view/Servizi.jsx";
import Spese from "./react_redux/view/spesa_view/Spese.jsx";
import Lavori from "./react_redux/view/lavoro_view/Lavori.jsx";

const Root = () => {
  const autenticazioneState = useSelector((state) => state.autenticazione.value);

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
            <Route path="/spese" element={<Spese />} />
            <Route path="/analisi" element={<Salone />} />
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
