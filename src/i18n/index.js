const resource = require("./locale/uz.json");

export function tl(key) {
	return resource[key] || key;
}
