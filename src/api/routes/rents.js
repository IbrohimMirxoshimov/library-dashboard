import mainCaller from "../main";

export default class Rents {
	static return(id) {
		return mainCaller(`/rents/${id}/return`, "PUT");
	}
	static reject(id) {
		return mainCaller(`/rents/${id}/reject`, "PUT");
	}
	static destroy(id) {
		return mainCaller(`/rents/${id}`, "DELETE");
	}
}
