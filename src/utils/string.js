export function clearString(str) {
	return str
		.replace(/(\D)\.|(\D),/g, "$1")
		.replace(/\n|\r/g, "")
		.replace(/ +(?= )/g, "")
		.trim();
}

export const randomString = () => Math.random().toString(36).slice(-8);
