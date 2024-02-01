import { message } from "antd";
import Crud from "api/crud";
import DataActions from "my-redux/actions/Data";

export const fetchInitial = (dispatch, fetchs) => {
	fetchs.forEach((f) => {
		if (f.ids.length)
			Crud.getList(f.endpoint, { id: f.ids })
				.then(({ items }) => dispatch(DataActions.add[f.endpoint](items)))
				.catch((err) => {
					console.error(err);
				});
	});
};

export const searchAndSaveResult = (dispatch, value, endpoint) => {
	Crud.getList(endpoint, { q: value.toLowerCase() })
		.then(({ items }) => dispatch(DataActions.add[endpoint](items)))
		.catch((err) => {
			console.error(err);
		});
};

export function getNeededElementsIds(hasList, currentList, key) {
	let ids = {};
	for (const ci of currentList) {
		let id = ci[key];
		if (id) {
			ids[id] = id;
		}
	}
	return Object.values(ids).filter((id) => !getById(hasList, id));
}

export async function fetchExtraDataOfPage(page, dispatch, fetches) {
	try {
		fetches.forEach(async (f) => {
			let suppliersIds = getNeededElementsIds(f.hasList, page.items, f.key);
			let items =
				suppliersIds.length > 0
					? (await Crud.getList("suppliers", { id: suppliersIds })).items
					: [];
			dispatch(DataActions.add[f.endpoint](items));
		});
	} catch (error) {
		console.error(error);
		message.error(error.message);
	}
}

export function getById(list, id) {
	return list.find((e) => e.id === id);
}
