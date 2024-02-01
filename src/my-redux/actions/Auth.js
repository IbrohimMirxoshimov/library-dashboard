import { AUTHENTICATED, SIGNOUT } from "../constants/Auth";

export const authenticated = (token, user) => {
	return {
		type: AUTHENTICATED,
		token,
		user,
	};
};

export const signOut = () => {
	return {
		type: SIGNOUT,
	};
};
