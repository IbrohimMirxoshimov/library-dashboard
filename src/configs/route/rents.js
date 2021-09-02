import { Tag } from "antd";
import { resources } from "api/resources";
// import { getDayLaterDate } from "utils/date";
import { CheckCircleTwoTone } from "@ant-design/icons";
import { getRamainedDays } from "./utils";
import Comments from "./components/Comments";

export const rents = {
	columns: [
		{
			title: "ID",
			key: "id",
			dataIndex: "id",
			cellRenderer: "editOpener",
		},
		{
			title: "KvID",
			key: "customId",
			dataIndex: "customId",
			cellRenderer: "editOpener",
		},
		{
			dataIndex: "leasedAt",
			key: "leasedAt",
			title: "Topshirilgan",
			render: (value) => new Date(value).toLocaleDateString("ru"),
		},
		{
			dataIndex: "returningDate",
			key: "returningDate",
			title: "Qaytadi",
			render: (value) => new Date(value).toLocaleDateString("ru"),
		},
		{
			key: "remain",
			title: "Qoldi",
			width: 40,
			sorter: false,
			render: (v, record) => {
				if (!record.returned) {
					let remainDays = getRamainedDays(record);

					if (remainDays > 20) {
						return <Tag color="green">{remainDays}</Tag>;
					} else if (remainDays > 5) {
						return <Tag color="orange">{remainDays}</Tag>;
					} else if (remainDays > 0) {
						return <Tag color="red">{remainDays}</Tag>;
					} else {
						return <Tag color="black">{remainDays}</Tag>;
					}
				}

				return <CheckCircleTwoTone twoToneColor="#52c41a" className="pl-2" />;
			},
		},
		{
			dataIndex: "returned",
			key: "returned",
			title: "Qaytgan",
			cellRenderer: "returnedChangeStatus",
			filters: [
				{
					text: "Qaytarilgan",
					value: "returned",
				},
				{
					text: "Qaytarilmagan",
					value: "n",
				},
			],
		},
		{
			title: "Kitobxon",
			key: "userId",
			dataIndex: "userId",
			cellRenderer: "userFullName",
			resource: resources.users,
			sorter: false,
			// width: 180,
		},
		{
			title: "Zaxira",
			key: "stockId",
			dataIndex: "stockId",
			resource: resources.stocks,
			valueGetter: (stock) => `#${stock.id} - ${stock?.book?.name}`,
			sorter: false,
		},
		{
			dataIndex: "createdAt",
			key: "createdAt",
			title: "Yasalgan",
			render: (value) => new Date(value).toLocaleDateString("ru"),
		},
		{
			dataIndex: "updatedAt",
			key: "updatedAt",
			title: "Yangilangan",
			render: (value) => new Date(value).toLocaleDateString("ru"),
		},
	],
	// formInitial: {
	// 	leasedAt: localStorage.getItem("ld"),
	// 	returningDate: localStorage.getItem("rd"),
	// },
	view: {
		Custom(props) {
			return <Comments resourceId={props.id} resourceFilterName="rentId" />;
		},
	},
	form: [
		{
			name: "userId",
			field: "selectFetch",
			rules: [{ required: true }],
			disabledOnEdit: true,
			fieldProp: {
				resource: resources.users,
				fetchable: true,
				column: "fullName",
				query: {
					busy: false,
				},
				render: (item) =>
					item &&
					`${item.id} - ${item.firstName} ${item.lastName} -  ${item.phone}`,
			},
			colSpan: 24,
		},
		{
			name: "stockId",
			field: "stockSelect",
			rules: [{ required: true }],
			disabledOnEdit: true,
			fieldProp: {
				resource: resources.stocks,
				fetchable: true,
				column: "name",
			},
			colSpan: 24,
		},
		{
			name: "leasedAt",
			rules: [{ required: true }],
			field: "date",
			fieldProp: {
				saveStorage(value) {
					localStorage.setItem("ld", value.toISOString());
				},
				getDefaultValue: () => localStorage.getItem("ld"),
			},
		},
		{
			name: "returningDate",
			rules: [{ required: true }],
			field: "date",
			fieldProp: {
				saveStorage(value) {
					localStorage.setItem("rd", value.toISOString());
				},
				getDefaultValue: () => localStorage.getItem("rd"),
			},
		},
		{
			name: "customId",
			// rules: [{ required: true }],
			// disabledOnEdit: true,
			fieldProp: {
				type: "number",
			},
		},
		// {
		// 	name: "comment",
		// 	sub: [
		// 		{
		// 			name: ["comment", "text"],
		// 			fieldProp: {
		// 				type: "textarea",
		// 			},
		// 		},
		// 	],
		// },
	],
};
