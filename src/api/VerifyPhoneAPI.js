import mainCaller from "./main";

function VerifyPhoneAPI(phone) {
	return mainCaller("/verification/send-code", "POST", { phone: phone });
}

export default VerifyPhoneAPI;
