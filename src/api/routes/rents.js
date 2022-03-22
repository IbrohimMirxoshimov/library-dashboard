import mainCaller from "../main";

export default class Rents {
	static return(id) {
		return mainCaller(`/rents/${id}/return`, "PUT");
	}
	static returnWithCustomId(customId) {
		return mainCaller(`/rents/${customId}/return-with-custom-id`, "PUT");
	}
	static reject(id) {
		return mainCaller(`/rents/${id}/reject`, "PUT");
	}
	static destroy(id) {
		return mainCaller(`/rents/${id}`, "DELETE");
	}
}
