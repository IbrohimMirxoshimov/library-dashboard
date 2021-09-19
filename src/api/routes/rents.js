import mainCaller from "../main";

export default class Rents {
	static return(id, { stockId }) {
		return mainCaller(`/rents/${id}/return`, "PUT", {
			stockId,
		});
	}
	static reject(id, deleteStock) {
		return mainCaller(`/rents/${id}/reject`, "PUT", {
			deleteStock,
		});
	}
}
