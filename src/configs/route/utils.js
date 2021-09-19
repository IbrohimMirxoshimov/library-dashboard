import { ONE_DAY_IN_MS } from "constants/time";

export const getRamainedDays = (rent) => {
	let remain = new Date(rent.returningDate) - new Date();
	let remainDays = Math.floor(remain / ONE_DAY_IN_MS);

	return remainDays + 1;
};

export const deleteColumn = {
	title: "A",
	key: "id",
	dataIndex: "id",
	cellRenderer: "actions",
	width: 20,
	sorter: false,
};

export const getDateString = (iso) => new Date(iso).toLocaleDateString("ru");
