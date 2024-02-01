import { AUTH_TOKEN, AUTHENTICATED, SIGNOUT } from "../constants/Auth";
import storage from "redux-persist/lib/storage";
import { persistReducer } from "redux-persist";

export function getTOKEN() {
	return localStorage.getItem(AUTH_TOKEN);
}

export function setTOKEN(token) {
	return localStorage.setItem(AUTH_TOKEN, token);
}

const initState = {
	loading: false,
	message: "",
	showMessage: false,
	redirect: "",
	token: null,
	user: {},
};

const auth = (state = initState, action) => {
	switch (action.type) {
		case AUTHENTICATED:
			setTOKEN(action.token);
			return {
				...state,
				loading: false,
				redirect: "/",
				token: action.token,
				user: action.user,
			};
		case SIGNOUT: {
			localStorage.removeItem(AUTH_TOKEN);
			localStorage.removeItem("l-auth");
			return {
				...state,
				token: null,
				user: {},
				redirect: "/",
				loading: false,
			};
		}
		default:
			return state;
	}
};

export default persistReducer(
	{
		key: "auth",
		storage: storage,
		keyPrefix: "l-",
	},
	auth
);
