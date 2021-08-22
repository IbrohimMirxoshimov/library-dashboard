import mainCaller from "./main";
const endPoint = "/sync";

export function getLastUpdate() {
	return mainCaller(endPoint + "/", "GET");
}

export function getUpdatedProducts() {
	return mainCaller(endPoint + "/get-updated-products", "GET");
}

export function getUpdatedStocks() {
	return mainCaller(endPoint + "/get-updated-stocks", "GET");
}

export function connectStocksToProducts() {
	return mainCaller(endPoint + "/connect-stocks-and-write", "POST");
}

export function syncStockOfLocation(locationId, records) {
	return mainCaller(`/locations/${locationId}/sync-stocks`, "PATCH", {
		records,
	});
}
