export function toMatrix(list, elementsPerSubArray) {
	var matrix = [],
		i,
		k;
	for (i = 0, k = -1; i < list.length; i++) {
		if (i % elementsPerSubArray === 0) {
			k++;
			matrix[k] = [];
		}
		matrix[k].push(list[i]);
	}
	return matrix;
}

export function isEmptyObject(obj) {
	for (var prop in obj) {
		if (Object.prototype.hasOwnProperty.call(obj, prop)) {
			return false;
		}
	}

	return JSON.stringify(obj) === JSON.stringify({});
}

export function divideArray(array) {
	const half = Math.round(array.length / 2);
	return [array.slice(0, half), array.slice(half)];
}

export function groupBy(list, keyGetter) {
	const map = new Map();
	list.forEach((item) => {
		const key = keyGetter(item);
		const collection = map.get(key);
		if (!collection) {
			map.set(key, [item]);
		} else {
			collection.push(item);
		}
	});
	return map;
}

export function dotNotationToObject(object) {
	if (!Object.keys(object).find((key) => key.includes("."))) {
		return object;
	}

	let dotKeys = Array.from(
		groupBy(
			Object.keys(object)
				.filter((key) => key.includes("."))
				.map((key) => key.split(".")),
			([key]) => key
		)
	);
	let subObjects = {};

	dotKeys.forEach(([key, items]) => {
		let o = {};

		items.forEach(([key, subkey]) => {
			let mk = key + "." + subkey;

			o[subkey] = object[mk];
		});

		subObjects[key] = o;
	});

	let newObject = { ...subObjects };

	for (const key in object) {
		if (Object.hasOwnProperty.call(object, key)) {
			if (!key.includes(".")) {
				const value = object[key];
				newObject[key] = value;
			}
		}
	}

	return newObject;
}

export function unflatten(arr) {
	var tree = [],
		mappedArr = {},
		arrElem,
		mappedElem;

	// First map the nodes of the array to an object -> create a hash table.
	for (var i = 0, len = arr.length; i < len; i++) {
		arrElem = arr[i];
		mappedArr[arrElem.id] = arrElem;
		mappedArr[arrElem.id]["children"] = [];
	}

	for (var id in mappedArr) {
		if (mappedArr.hasOwnProperty(id)) {
			mappedElem = mappedArr[id];
			// If the element is not at the root level, add it to its parent array of children.
			if (mappedElem.parent) {
				mappedArr[mappedElem["parent"]]["children"].push(mappedElem);
			}
			// If the element is at the root level, add it to first level elements array.
			else {
				tree.push(mappedElem);
			}
		}
	}
	return tree;
}

export function deepEqual(object1, object2) {
	const keys1 = Object.keys(object1);
	const keys2 = Object.keys(object2);

	if (keys1.length !== keys2.length) {
		return false;
	}

	for (const key of keys1) {
		const val1 = object1[key];
		const val2 = object2[key];
		const areObjects = isObject(val1) && isObject(val2);
		if (
			(areObjects && !deepEqual(val1, val2)) ||
			(!areObjects && val1 !== val2)
		) {
			return false;
		}
	}

	return true;
}

export function isObject(object) {
	return object != null && typeof object === "object";
}

export function mergeSame(array) {
	return Array.from(new Set(array));
}

export function arrayToKeyValueObjectById(array, object = {}) {
	for (const item of array) {
		object[item.id] = item;
	}
	return object;
}

export function mergeArraysToUniqueList(baseArray, newArray) {
	let object = arrayToKeyValueObjectById(newArray);
	let onlyNews = baseArray.reduce((pv, cv) => {
		if (!object[cv.id]) return [...pv, cv];

		return pv;
	}, []);
	return [...newArray, ...onlyNews];
}

export function searchItem(query, items, nameGetter) {
	query = query.toLowerCase();
	// console.log(query);

	if (query.length === 0) {
		return items.map((item) => {
			delete item.searchIndex;

			return item;
		});
	} else {
		return items
			.map((item) => {
				// console.log(nameGetter(item).toLowerCase().indexOf(query));
				return {
					...item,
					searchIndex: nameGetter(item).toLowerCase().indexOf(query),
				};
			})
			.sort((a, b) => a.searchIndex - b.searchIndex);
	}
}

export function notIncludeId(id, list) {
	return !list.find((item) => item.id === id);
}

export function removeDuplicates(list) {
	return Array.from(new Set(list));
}

export function clearArrayNulls(list) {
	return list.filter((e) => e);
}

export function convertToNumber(list) {
	return list.map((item) => {
		if (typeof item === "string") return Number(item);

		return item;
	});
}

export function arrayToKeyValueObject(array, object = {}) {
	for (const item of array) {
		object[item] = item;
	}
	return object;
}

export function clearNullishKeysFromObject(object) {
	Object.keys(object).forEach((key) => {
		if (!object[key] && object[key] !== 0) {
			delete object[key];
		}
	});

	return object;
}
