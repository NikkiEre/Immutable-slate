import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import ReduxToastr from "react-redux-toastr";

import Router from "./Router/Router";
import localStore from "./store/rootStore/rootStore";

import "./App.scss";

function App(): JSX.Element {
  const { store, persistor } = localStore;

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <div className="App container__app">
          <Router />
          <ReduxToastr
            timeOut={4000}
            newestOnTop={false}
            preventDuplicates
            position="top-center"
            transitionIn="bounceIn"
            transitionOut="bounceOut"
            closeOnToastrClick
          />
        </div>
      </PersistGate>
    </Provider>
  );
}

export default App;
