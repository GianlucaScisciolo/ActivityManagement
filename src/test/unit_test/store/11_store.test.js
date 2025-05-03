// Mock del localStorage
beforeAll(() => {
  // Configura il mock globale di localStorage
  global.localStorage = {
    getItem: jest.fn(() => null), // Simula uno stato vuoto nel localStorage.
    setItem: jest.fn(),
    removeItem: jest.fn(),
    clear: jest.fn(),
  };
});

// Import dello store (deve avvenire dopo il mock)
import store from "../../../store/store.js";

describe('Test sullo store', () => {
  it('dovrebbe avere i reducers corretti', () => {
    const state = store.getState();

    // Verifica che ogni reducer sia definito nello stato
    expect(state).toHaveProperty('stileSliceReducer');
    expect(state).toHaveProperty('saloneSliceReducer');
    expect(state).toHaveProperty('autenticazioneSliceReducer');
    expect(state).toHaveProperty('clienteSliceReducer');
    expect(state).toHaveProperty('servizioSliceReducer');
    expect(state).toHaveProperty('lavoroSliceReducer');
    expect(state).toHaveProperty('spesaSliceReducer');
  });

  // it('dovrebbe chiamare localStorage.getItem', () => {
  //   // Simula un'azione sullo store (se necessaria per il tuo test)
  //   store.dispatch({ type: 'TEST_ACTION' });

  //   // Verifica che localStorage.getItem sia stato chiamato
  //   expect(localStorage.getItem).toHaveBeenCalled();
  // });
});
