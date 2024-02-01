import {
	CLOSE_SHIFT,
	NEW_RENT,
	NEW_USER,
	OPEN_SHIFT,
	RETURNED_RENTS,
} from "my-redux/constants/ShiftTypes";

export const openShift = () => {
	return {
		type: OPEN_SHIFT,
	};
};

export const closeShift = () => {
	return {
		type: CLOSE_SHIFT,
	};
};

export const newUser = () => {
	return {
		type: NEW_USER,
	};
};

export const newRent = () => {
	return {
		type: NEW_RENT,
	};
};

export const returnedRent = () => {
	return {
		type: RETURNED_RENTS,
	};
};
