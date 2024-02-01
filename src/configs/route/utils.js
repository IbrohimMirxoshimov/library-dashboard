import { ONE_DAY_IN_MS } from "constants/time";

export const getRamainedDays = (rent) => {
	let remain = new Date(rent.returningDate) - new Date();
	let remainDays = Math.floor(remain / ONE_DAY_IN_MS);

	return remainDays;
};
export const getLeasedDays = (rent) => {
	let remain = new Date() - new Date(rent.leasedAt);
	let remainDays = Math.floor(remain / ONE_DAY_IN_MS);

	return remainDays;
};

export const deleteColumn = {
	title: "A",
	key: "id",
	dataIndex: "id",
	cellRenderer: "actions",
	width: 20,
	sorter: false,
};

export const getDateString = (iso) =>
	new Date(iso).toLocaleString("ru").slice(0, -3);

export const createdAtAndUpdatedAtColumns = [
	{
		dataIndex: "createdAt",
		key: "createdAt",
		title: "Yasalgan",
		render: getDateString,
	},
	{
		dataIndex: "updatedAt",
		key: "updatedAt",
		title: "Yangilangan",
		render: getDateString,
	},
];

export const PASSPORT_PATTERN = /^[A-Z]{2}\d{7}$/;
