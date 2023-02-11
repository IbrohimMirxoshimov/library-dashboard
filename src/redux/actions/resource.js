import { message } from "antd";
import {
	clearArrayNulls,
	convertToNumber,
	notIncludeId,
	removeDuplicates,
} from "utils/array";
import { ADD_NEEDS, ADD_NEWS } from "../constants/resource";
import store from "redux/store";
import FetchResource from "api/crud";
import { debounce } from "utils/debounce";

export const addNews = (resource, items) => {
	return {
		type: ADD_NEWS,
		resource: resource,
		items: items,
	};
};

export const addNeeds = async (resource, ids, sizeNeedItems) => {
	let fetchedResource = [];
	if (!sizeNeedItems) {
		ids = clearArrayNulls(removeDuplicates(convertToNumber(ids)));

		let state = store.getState()[resource];

		if (!state)
			throw new Error(
				"Resource " + resource + " not found. Please add it first"
			);

		let { items } = state;

		// get only needs
		let needIds = ids.filter((id) => notIncludeId(id, items));

		if (!needIds.length) return [];
		// fetch items
		fetchedResource = await FetchResource.getList(resource, {
			id: needIds,
		}).catch((err) => {
			message.warning("Fetching resource error\n" + err.message);

			return {
				items: [],
			};
		});
	} else {
		fetchedResource = await FetchResource.getList(resource, {
			size: sizeNeedItems,
		});
	}

	store.dispatch({
		type: ADD_NEEDS,
		resource: resource,
		items: fetchedResource.items,
	});
};

let debauncedTasksData = {};
export function addNeedsWithDebounce(resource, ids) {
	let data = debauncedTasksData[resource];
	if (data) {
		data = [...data, ...ids];
	} else {
		data = ids;
	}
	debauncedTasksData[resource] = data;
	debounce(() => {
		addNeeds(resource, data);
	}, "an-" + resource);
}

export const getResourcesByIds = (resource, ids) => {
	const items = store.getState()[resource].items;
	return items.filter((item) => ids.includes(item.id));
};
