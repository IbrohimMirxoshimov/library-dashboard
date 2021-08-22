import {
	SET_FULL_LIST,
	ADD_REGIONS,
	ADD_SUPPLIERS,
	ADD_LOCATIONS,
} from "../constants/Data";

const initState = {
	fullList: [],
	lastUpdateTime: 0,
	regions: [],
	suppliers: [],
	locations: [],
};

function mergeArrayById(prevList = [], newList) {
	return [
		...prevList,
		...newList.filter(
			(newItem) => !prevList.find((prevItem) => prevItem.id === newItem.id)
		),
	];
}

const Data = (state = initState, action) => {
	switch (action.type) {
		case SET_FULL_LIST:
			return {
				...state,
				fullList: action.fullList,
				lastUpdateTime: Date.now(),
			};
		case ADD_REGIONS:
			return {
				...state,
				regions: mergeArrayById(state.regions, action.list),
			};
		case ADD_SUPPLIERS:
			return {
				...state,
				suppliers: mergeArrayById(state.suppliers, action.list),
			};
		case ADD_LOCATIONS:
			return {
				...state,
				locations: mergeArrayById(state.locations, action.list),
			};
		default:
			return state;
	}
};

export default Data;
