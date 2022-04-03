import mainCaller from "../main";
import qs from "qs";

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
	static getOne(id) {
		return mainCaller(`/rents/${id}`, "GET");
	}
	static getOneBtCustomId(id) {
		return mainCaller(`/rents?filters[customId]=${id}`, "GET").then((r) => {
			if (r.items.length === 0) {
				throw new Error("Kvitansiya topilmadi");
			}

			if (r.items.length === 1) {
				return r.items[0];
			}

			throw new Error("Ko'p kvitansiyalar bor");
		});
	}
	static getList(query) {
		return mainCaller(`/rents?` + qs.stringify(query), "GET").then((r) => {
			if (r.items.length === 0) {
				throw new Error("Kvitansiya topilmadi");
			}

			if (r.items.length === 1) {
				return r.items[0];
			}

			throw new Error("Ko'p kvitansiyalar bor");
		});
	}
}
