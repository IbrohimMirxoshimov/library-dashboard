import React from "react";
import { Provider } from "react-redux";
import store, { persistor } from "./redux/store";
import { BrowserRouter as Router } from "react-router-dom";
import Views from "./views";
import { Route, Switch } from "react-router-dom";
import cacheClear from "utils/cacheClear";
import { PersistGate } from "redux-persist/integration/react";

// import Search from "./aa_views/search";
cacheClear();
function App() {
	return (
		<div className="App">
			{/* <div style={{ marginTop: "2%" }}>
				<Search />
			</div> */}
			<Provider store={store}>
				<PersistGate persistor={persistor}>
					<Router>
						<Switch>
							<Route path="/" component={Views} />
						</Switch>
					</Router>
				</PersistGate>
			</Provider>
		</div>
	);
}

export default App;
