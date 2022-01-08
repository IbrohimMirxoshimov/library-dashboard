import { message, Tag } from "antd";
import { resources } from "api/resources";
import { CheckCircleTwoTone } from "@ant-design/icons";
import { getDateString, getRamainedDays } from "./utils";
import Comments from "./components/Comments";
import { tl } from "i18n";
import RejectRent from "components/shared-components/RejectRent";
import SubForm from "./components/SubForm";
// import ScanBarcode from "components/shared-components/ScanBarcode";

export const rents = {
	name: tl("rents"),
	nameOne: tl("rent"),
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
			title: "Berildi",
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
				if (!record.returnedAt) {
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

				return (
					<CheckCircleTwoTone
						twoToneColor="#52c41a"
						className="pl-2"
						style={{ cursor: "pointer" }}
						onClick={() =>
							message.info(
								"Qaytarilgan: " + getDateString(record.returnedAt),
								3
							)
						}
					/>
				);
			},
		},
		{
			dataIndex: "returnedAt",
			key: "returnedAt",
			title: "Qaytgan",
			cellRenderer: "returnedChangeStatus",
			filters: [
				{
					text: "Qaytarilmagan",
					value: "returnedAt",
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
		},
		{
			title: tl("stock"),
			key: "stockId",
			dataIndex: "stockId",
			resource: resources.stocks,
			sorter: false,
			valueGetter: (stock) =>
				`${stock.id}/${stock?.book?.id} - ${stock?.book?.name}`,
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
			return (
				<div>
					<Comments resourceId={props.id} resourceFilterName="rentId" />
					{<RejectRent {...props} />}
				</div>
			);
		},
	},
	footer: (data, form) => {
		return [
			<SubForm
				data={{
					form: "users",
					resource: { endpoint: "users", name: "Foydalanuvchi" },
				}}
			/>,
			// <ScanBarcode data={data} form={form} />,
		];
	},
	form: [
		{
			name: "userId",
			field: "selectFetch",
			rules: [{ required: true }],
			disabledOnEdit: true,
			label: "Kitobxon",
			fieldProp: {
				resource: resources.users,
				fetchable: true,
				column: "fullName",
				render: (item) =>
					item &&
					`${item.firstName} ${item.lastName} - ${item.phone} - ${item.passportId}`,
			},
			colSpan: 24,
		},
		{
			name: "stockId",
			field: "stockSelect",
			label: "Kitob zaxirasi",
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
			label: "Topshirilgan sana",
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
			label: "Qaytarililishi kerak bo'lgan sana",
			fieldProp: {
				saveStorage(value) {
					localStorage.setItem("rd", value.toISOString());
				},
				getDefaultValue: () => localStorage.getItem("rd"),
			},
		},
		{
			name: "customId",
			label: "Maxsus raqami",
			fieldProp: {
				type: "number",
			},
		},
	],
};
