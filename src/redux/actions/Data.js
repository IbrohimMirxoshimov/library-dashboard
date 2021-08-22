import {
	SET_FULL_LIST,
	ADD_REGIONS,
	ADD_SUPPLIERS,
	ADD_LOCATIONS,
} from "../constants/Data";

export function setFullList(fullList) {
	return {
		type: SET_FULL_LIST,
		fullList: fullList,
	};
}

export function addRegions(list) {
	return {
		type: ADD_REGIONS,
		list: list,
	};
}

export function addSuppliers(list) {
	return {
		type: ADD_SUPPLIERS,
		list: list,
	};
}
export function addLocations(list) {
	return {
		type: ADD_LOCATIONS,
		list: list,
	};
}

class DataActions {
	static add = {
		regions: (list) => {
			return {
				type: ADD_REGIONS,
				list: list,
			};
		},
		suppliers: (list) => {
			return {
				type: ADD_SUPPLIERS,
				list: list,
			};
		},
		locations: (list) => {
			return {
				type: ADD_LOCATIONS,
				list: list,
			};
		},
	};
}

export default DataActions;
