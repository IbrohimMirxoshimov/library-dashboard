import mainCaller from "../main";

export default class Rents {
	static return(id, { stockId, returned }) {
		return mainCaller(`/rents/${id}/return`, "PUT", {
			stockId,
			returned,
		});
	}
}
