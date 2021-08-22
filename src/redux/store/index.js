import { createStore, compose } from "redux";
import reducers from "../reducers";
import { persistStore } from "redux-persist";
import { signOut } from "redux/actions/Auth";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducers, composeEnhancers());

export const persistor = persistStore(store);

export const signOutDirectly = () => {
	store.dispatch(signOut());
};

export default store;
