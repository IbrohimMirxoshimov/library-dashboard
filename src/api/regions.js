import mainCaller from "./main";
import qs from "qs";

export function getOneRegion(id) {
	return mainCaller("/regions/" + id, "GET");
}

export function getRegionList(query) {
	return mainCaller("/regions?" + qs.stringify(query), "GET");
}

export function updateRegion(id, data) {
	return mainCaller("/regions/" + id, "PUT", data);
}

export function createRegion(data) {
	return mainCaller("/regions/", "POST", data);
}
