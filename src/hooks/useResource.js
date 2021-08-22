import { useEffect } from "react";
import { useSelector } from "react-redux";
import { addNeeds } from "redux/actions/resource";

export function useResourceArray(resource, ids) {
	if (ids && ids.length && typeof ids[0] === "string")
		ids = ids.map((id) => Number(id));

	const items = useSelector((state) => {
		if (!ids || !ids.length) return [];

		return state[resource].items.filter((item) => ids.includes(item.id));
	});

	return items;
}

export function useResourceObject(resource, id) {
	if (id && typeof id === "string") id = Number(id);

	const item = useSelector((state) => {
		if (!id) return null;

		return state[resource].items.find((item) => id === item.id);
	});

	return item;
}

export function useResource(resource, ids, sizeItems, filter, showAll) {
	if (!sizeItems && ids && ids.length && typeof ids[0] === "string")
		ids = ids.map((id) => Number(id));

	const items = useSelector((state) => {
		if (showAll) {
			return state[resource].items;
		}

		if (!sizeItems && (!ids || !ids.length)) return [];

		if (sizeItems) {
			return state[resource].items;
		}

		if (filter) {
			state[resource].items.filter((item) => ids.includes(item.id));
		}

		return state[resource].items;
	});

	useEffect(() => {
		if (ids && ids.length) {
			addNeeds(resource, ids, sizeItems);
		}
		// eslint-disable-next-line
	}, [ids]);

	return items;
}
