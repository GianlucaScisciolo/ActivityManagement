import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router-dom";
import { render } from "@testing-library/react";
import stileSliceReducer from "../../../../store/slice/StileSlice.js";
import Login from "../../../../view/autenticazione_view/Login.jsx";

const mockStore = configureStore({
  reducer: { stileSliceReducer },
  preloadedState: {
    stileSliceReducer: { value: { vistaForm: "form" } },
  },
});

test("Verifica che il form Login venga renderizzato correttamente.", () => {
  render(
    <Provider store={mockStore}>
      <MemoryRouter>
        <Login />
      </MemoryRouter>
    </Provider>
  );

  // Verifica che gli elementi principali siano presenti
  expect(screen.getByText("Invia")).toBeInTheDocument();
});

test("Simula la compilazione e sottomissione del form", () => {
  render(
    <Provider store={store}>
      <MemoryRouter>
        <Login />
      </MemoryRouter>
    </Provider>
  );

  // Trova l'input e inserisci un valore
  const inputUsername = screen.getByPlaceholderText("Inserisci il tuo nome utente");
  fireEvent.change(inputUsername, { target: { value: "Gianluca" } });

  // Trova il pulsante e cliccalo
  const button = screen.getByText("Invia");
  fireEvent.click(button);

  // Puoi aggiungere un controllo per verificare che una funzione venga chiamata
});
