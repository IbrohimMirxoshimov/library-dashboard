import {
	CLOSE_SHIFT,
	NEW_RENT,
	NEW_USER,
	OPEN_SHIFT,
	RETURNED_RENTS,
} from "my-redux/constants/ShiftTypes";
import storage from "redux-persist/lib/storage";
import { persistReducer } from "redux-persist";

const initState = {
	all_shifts: [],
	openedAt: 0,
	new_users: 0,
	closedAt: 0,
	new_rents: 0,
	returned_rents: 0,
};

const ShiftReduser = (state = initState, action) => {
	switch (action.type) {
		case OPEN_SHIFT:
			return {
				...state,
				openedAt: new Date(),
			};
		case NEW_USER:
			return {
				...state,
				new_users: state.new_users + 1,
			};
		case NEW_RENT:
			return {
				...state,
				new_rents: state.new_rents + 1,
			};
		case RETURNED_RENTS:
			return {
				...state,
				returned_rents: state.returned_rents + 1,
			};
		case CLOSE_SHIFT:
			return {
				...initState,
				all_shifts: [
					{ ...state, closedAt: new Date(), all_shifts: 0 },
					...state.all_shifts,
				],
			};
		default:
			return state;
	}
};

export default persistReducer(
	{
		key: "shift",
		storage: storage,
		keyPrefix: "l-",
	},
	ShiftReduser
);
