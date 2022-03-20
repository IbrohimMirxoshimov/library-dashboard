import { combineReducers } from "redux";
import Auth from "./Auth";
import Data from "./Data";
import messageReduser from "./message";
import resourceRedusers from "./resources";
import ShiftReduser from "./ShiftReduser";
import Theme from "./Theme";

const reducers = combineReducers({
	theme: Theme,
	auth: Auth,
	data: Data,
	message: messageReduser,
	shift: ShiftReduser,
	...resourceRedusers,
});

export default reducers;
