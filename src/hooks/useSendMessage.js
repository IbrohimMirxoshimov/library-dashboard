import { useDispatch } from "react-redux";
import { sendMessage as sendMessageAction } from "my-redux/actions/message";
import store from "my-redux/store";

function useSendMessage(toComponentId) {
	const dispatch = useDispatch();

	const sendMessage = (data, componentId = toComponentId, messageId) => {
		if (!componentId) {
			throw new Error("Component id must");
		}

		dispatch(sendMessageAction(componentId, data, messageId));
	};

	// // console.log(message);

	return sendMessage;
}

export function sendMessage(data, componentId, messageId) {
	store.dispatch(sendMessageAction(componentId, data, messageId));
}

export default useSendMessage;
