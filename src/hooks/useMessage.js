import { useSelector } from "react-redux";

const messagesSession = {};

function useMessage(componentId) {
	return useSelector(
		(state) => {
			if (state.message.componentId === componentId) {
				messagesSession[componentId] = state.message;
				return state.message;
			}

			return messagesSession[componentId] || {};
		},
		(left, right) =>
			left.componentId === right.componentId &&
			left.messageId === right.messageId
	);
}

export default useMessage;
