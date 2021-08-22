import { SEND_MESSAGE } from "../constants/message";

const initialState = {
	data: {},
	componentId: 0,
	messageId: 0,
};

const messageReduser = (state = initialState, action) => {
	switch (action.type) {
		case SEND_MESSAGE:
			return {
				...state,
				data: action.data,
				componentId: action.componentId,
				messageId: action.messageId,
			};
		case "CLEAN_UP":
			return initialState;
		default:
			return state;
	}
};

export default messageReduser;
