import { SaloneActions } from "../../../actions/SaloneActions.js";
import { Dispatcher } from "../../../dispatcher/Dispatcher.js";
jest.mock("../../../dispatcher/Dispatcher.js");
jest.mock("../../../utils/Controlli.js");

global.confirm = jest.fn(() => true); // Mock di confirm
global.alert = jest.fn(() => true); // Mock di confirm

describe("Test su 'azzeraListe'", () => {
  let saloneActions;
  let mockDispatcher;

  beforeEach(() => {
    mockDispatcher = new Dispatcher();
    saloneActions = new SaloneActions();
    saloneActions.dispatcher = mockDispatcher;
  });

  test("test 1.", async () => {
    saloneActions.azzeraListe();

    expect(saloneActions.dispatcher.azzeraListe).toHaveBeenCalled();
  });
});

describe("Test su 'ricercaEntrateUsciteRicavi'", () => {
  let saloneActions;
  let mockDispatcher;

  beforeEach(() => {
    mockDispatcher = new Dispatcher();
    mockDispatcher.ricercaEntrateUsciteRicavi = jest.fn();
    saloneActions = new SaloneActions();
    saloneActions.dispatcher = mockDispatcher;
  });

  test("test 1: ricerca effettuata con successo", async () => {
    const datiRicerca = { query: "test" };
    await saloneActions.ricercaEntrateUsciteRicavi({ preventDefault: jest.fn() }, datiRicerca);
    expect(mockDispatcher.ricercaEntrateUsciteRicavi).toHaveBeenCalledWith(datiRicerca);
  });
});

describe("Test su 'scegliWidgets'", () => {
  let saloneActions;
  let mockDispatcher;

  beforeEach(() => {
    mockDispatcher = new Dispatcher();
    mockDispatcher.widgetView = jest.fn();
    mockDispatcher.widgetSelected = jest.fn();
    saloneActions = new SaloneActions();
    saloneActions.dispatcher = mockDispatcher;
  });

  test("test 1: plusCliccato === true", async () => {
    await saloneActions.scegliWidgets({ preventDefault: jest.fn() }, jest.fn(), false);
    // expect(saloneActions.dispatcher.widgetView).toHaveBeenCalled();
    expect(saloneActions.dispatcher.widgetSelected).toHaveBeenCalled();
  });

  test("test 2: plusCliccato === false", async () => {
    await saloneActions.scegliWidgets({ preventDefault: jest.fn() }, jest.fn(), true);
    // expect(saloneActions.dispatcher.widgetSelected).toHaveBeenCalled();
    expect(saloneActions.dispatcher.widgetView).toHaveBeenCalled();
  });
});

describe("Test su 'modificaWidget'", () => {
  let saloneActions;
  let mockDispatcher;

  beforeEach(() => {
    mockDispatcher = new Dispatcher();
    mockDispatcher.modificaWidget = jest.fn();
    saloneActions = new SaloneActions();
    saloneActions.dispatcher = mockDispatcher;
  });

  test("test 1: modificaWidget eseguita con successo.", async () => {
    await saloneActions.modificaWidget("Test nome widget", 1);
    expect(saloneActions.dispatcher.modificaWidget).toHaveBeenCalledWith("Test nome widget", 1);
  });
});









