import { applyMiddleware, createStore } from "redux";
import persistStore from "redux-persist/es/persistStore";
import { createBrowserHistory } from "history";
import { routerMiddleware } from "connected-react-router";
import { composeWithDevTools } from "redux-devtools-extension";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import thunkMiddleware from "redux-thunk";

import { rootReducer } from "../reducers/rootReducer/rootReducer";
import { SetPostsState } from "../transform/postsPersistTranform";
import { SetUserPersonalDataState } from "../transform/userPersonalDataPersistTranform";
import { SetUsersDBState } from "../transform/usersDBPersistTranform";

const persistConfig = {
  key: "root",
  storage,
  transforms: [SetPostsState, SetUserPersonalDataState, SetUsersDBState],
  blacklist: ["toastr", "router"],
};

export const history = createBrowserHistory();

const persistedReducer = persistReducer(persistConfig, rootReducer(history));

const localStore = () => {
  const store = createStore(
    persistedReducer,
    composeWithDevTools(applyMiddleware(routerMiddleware(history), thunkMiddleware))
  );
  const persistor = persistStore(store);
  return { store, persistor };
};

export default localStore();
