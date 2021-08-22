export function setIdsToObject(object) {
	let i = 1;
	for (const key in object) {
		if (Object.hasOwnProperty.call(object, key)) {
			const element = object[key];
			element.id = i;
			element.name = key;
			i++;
		}
	}
}

export function makeObjectCustomArray(object) {
	return Object.values(object);
}

export function arrayToObjectById(array) {
	let object = {};
	array.forEach((element) => {
		object[element.id] = element;
	});
	return object;
}
