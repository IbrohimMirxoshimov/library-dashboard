import { SEND_MESSAGE } from "../constants/message";

export const sendMessage = (componentId, data, messageId) => {
	return {
		type: SEND_MESSAGE,
		data: data,
		componentId: componentId,
		messageId: messageId || Math.floor(Math.random() * 1000000),
	};
};
