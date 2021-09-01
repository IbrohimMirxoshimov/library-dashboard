import { Tag } from "antd";
import { resources } from "api/resources";
import { getDayLaterDate } from "utils/date";
import { CheckCircleTwoTone } from "@ant-design/icons";
import { getRamainedDays } from "./utils";

export const rents = {
	columns: [
		{
			title: "ID",
			key: "id",
			dataIndex: "id",
			cellRenderer: "editOpener",
		},
		{
			title: "CustomID",
			key: "customId",
			dataIndex: "customId",
			cellRenderer: "editOpener",
		},
		{
			dataIndex: "leasedAt",
			key: "leasedAt",
			title: "leasedAt",
			fieldProp: { type: "date" },
			render: (value) => new Date(value).toLocaleDateString("ru"),
		},
		{
			dataIndex: "returningDate",
			key: "returningDate",
			title: "returningDate",
			fieldProp: { type: "date" },
			render: (value) => new Date(value).toLocaleDateString("ru"),
		},
		{
			key: "remain",
			title: "remain",
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
			title: "returned",
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
			title: "userId",
			key: "userId",
			dataIndex: "userId",
			cellRenderer: "userFullName",
			resource: resources.users,
			sorter: false,
		},
		{
			title: "stockId",
			key: "stockId",
			dataIndex: "stockId",
			resource: resources.stocks,
			valueGetter: (stock) => `#${stock.id} - ${stock?.book?.name}`,
			sorter: false,
		},
	],
	formInitial: {
		leasedAt: new Date().toISOString(),
		returningDate: getDayLaterDate(30),
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
					item && `${item.id} - ${item.firstName} ${item.lastName}`,
			},
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
		},
		{
			name: "leasedAt",
			rules: [{ required: true }],
			field: "date",
		},
		{
			name: "returningDate",
			rules: [{ required: true }],
			field: "date",
		},
		{
			name: "customId",
			// rules: [{ required: true }],
			// disabledOnEdit: true,
			fieldProp: {
				type: "number",
			},
		},
		{
			name: "comment",
			sub: [
				{
					name: ["comment", "text"],
					fieldProp: {
						type: "textarea",
					},
				},
			],
		},
	],
};
