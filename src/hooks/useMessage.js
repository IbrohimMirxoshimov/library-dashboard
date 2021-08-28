import { useEffect } from "react";
import { useSelector } from "react-redux";
import store from "redux/store/index";
const getMessageState = () => store.getState().message;
const messagesSession = {};
function clear(componentId) {
	delete messagesSession[componentId];
}
function useMessage(componentId) {
	let m = useSelector(
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

	useEffect(() => {
		return () => {
			if (getMessageState().componentId === componentId) {
				store.dispatch({ type: "CLEAN_UP" });
			}
			clear(componentId);
		};
		// eslint-disable-next-line
	}, []);

	return m;
}

export default useMessage;
