import { Tag } from "antd";
import { resources } from "api/resources";
import { roles } from "configs/NavigationConfig";
import { ONE_DAY_IN_MS } from "constants/time";
import { getDayLaterDate } from "utils/date";
import { CheckCircleTwoTone, CloseCircleTwoTone } from "@ant-design/icons";
const pagesConfig = {
	users: {
		listView: {
			search: {
				key: "fullName",
			},
		},
		columns: [
			{
				title: "ID",
				key: "id",
				dataIndex: "id",
			},
			{
				title: "Ism",
				key: "firstName",
				dataIndex: "firstName",
				cellRenderer: "editOpener",
			},
			{
				title: "Familiya",
				key: "lastName",
				dataIndex: "lastName",
			},
			{
				title: "Phone",
				key: "phone",
				dataIndex: "phone",
			},
			{
				title: "Passport",
				key: "passportId",
				dataIndex: "passportId",
			},
			{
				title: "Location",
				key: "locationId",
				dataIndex: "locationId",
				resource: resources.locations,
				resourceKey: "name",
			},
		],
		form: [
			{ name: "firstName", rules: [{ required: true }] },
			{ name: "lastName", rules: [{ required: true }] },
			{ name: "username", role: roles.owner },
			{
				name: "phone",
				rules: [
					{
						required: true,
					},
				],
				field: "phoneNumber",
			},
			{
				name: "locationId",
				field: "selectFetch",
				role: roles.owner,
				fieldProp: { resource: resources.locations },
			},
			{
				name: "regionId",
				field: "selectFetch",
				role: roles.owner,
				fieldProp: { resource: resources.regions },
			},
			{ name: "password", role: roles.owner },
			{ name: "birthDate", field: "date" },
			{
				name: "moderator",
				field: "switch",
				propName: "checked",
				role: roles.owner,
			},

			{
				name: "librarian",
				field: "switch",
				propName: "checked",
				role: roles.owner,
			},
			{
				name: "verified",
				field: "switch",
				propName: "checked",
			},
			{ name: "passportId" },
			{ name: "passportImage" },
			{ name: "extra" },
		],
	},
	stocks: {
		
		columns: [
			{
				title: "Kitob raqami",
				key: "id",
				dataIndex: "id",
				cellRenderer: "editOpener",
			},
			{
				title: "Kitob",
				key: "book",
				dataIndex: "bookId",
				resource: resources.books,
			},
			{
				title: "Bandlik",
				key: "busy",
				dataIndex: "busy",
				render: (value) =>
					value ? (
						<CloseCircleTwoTone twoToneColor="#d9505c" className="pl-2" />
					) : (
						<CheckCircleTwoTone twoToneColor="#52c41a" className="pl-2" />
					),
				filters: [
					{
						text: "Band",
						value: "busy",
					},
					{
						text: "Bo'sh",
						value: "free",
					},
				],
			},
		],
		form: [
			{
				name: "bookId",
				field: "selectFetch",
				fieldProp: { resource: resources.books, fetchable: true },
			},
			{
				name: "locationId",
				field: "selectFetch",
				role: roles.owner,
				fieldProp: { resource: resources.locations, fetchSize: 30 },
			},
		],
	},
	locations: {
		columns: [
			{
				title: "name",
				key: "name",
				dataIndex: "name",
				cellRenderer: "editOpener",
			},
			{
				title: "region",
				key: "region",
				dataIndex: "regionId",
				resource: resources.regions,
			},
			{
				title: "phone",
				key: "phone",
				dataIndex: "phone",
			},
		],
		form: [
			{
				name: "name",
			},
			{
				name: "phone",
				rules: [
					{
						required: true,
						type: "number",
					},
				],
				fieldProp: { prefix: "+998" },
			},
			{
				name: "regionId",
				field: "selectFetch",
				role: roles.moderator,
				fieldProp: { resource: resources.regions, fetchable: true },
			},
		],
	},
	regions: {
		columns: [
			{
				title: "name",
				key: "name",
				dataIndex: "name",
				cellRenderer: "editOpener",
			},
		],
		form: [
			{
				name: "name",
			},
		],
	},
	books: {
		columns: [
			{
				title: "name",
				key: "name",
				dataIndex: "name",
				cellRenderer: "editOpener",
			},
			{
				title: "To'plam",
				key: "booksgroup",
				dataIndex: "booksGroupId",
				resource: resources.booksgroups,
			},
			{
				title: "author",
				key: "authorId",
				dataIndex: "authorId",
				resource: resources.authors,
			},
		],
		form: [
			{
				name: "name",
			},
			{
				name: "description",
			},
			{
				name: "image",
				field: "imageUpload",
			},
			{
				name: "rentDuration",
				fieldProp: { defaultValue: 30, type: "number" },
			},
			{
				name: "booksGroupId",
				field: "selectFetch",
				fieldProp: { resource: resources.booksgroups, fetchable: true },
			},
			{
				name: "authorId",
				field: "selectFetch",
				fieldProp: { resource: resources.authors, fetchable: true },
			},
			{
				name: "publishingId",
				field: "selectFetch",
				fieldProp: { resource: resources.publishings, fetchable: true },
			},
			{
				name: "printedAt",
				fieldProp: { type: "date" },
			},
			{
				name: "pages",
				fieldProp: { type: "number" },
			},
			{
				name: "sort",
				fieldProp: { type: "number" },
			},
		],
	},
	booksgroups: {
		columns: [
			{
				title: "ID",
				key: "id",
				dataIndex: "id",
			},
			{
				title: "name",
				key: "name",
				dataIndex: "name",
				cellRenderer: "editOpener",
			},
			{
				title: "collectionId",
				key: "collectionId",
				dataIndex: "collectionId",
				resource: resources.collections,
			},
		],
		form: [
			{
				name: "name",
			},
			{
				name: "description",
			},
			{
				name: "collectionId",
				field: "selectFetch",
				fieldProp: { resource: resources.collections, fetchable: true },
			},
		],
	},
	collections: {
		columns: [
			{
				title: "ID",
				key: "id",
				dataIndex: "id",
			},
			{
				title: "name",
				key: "name",
				dataIndex: "name",
				cellRenderer: "editOpener",
			},
			{
				title: "sort",
				key: "sort",
				dataIndex: "sort",
			},
		],
		form: [
			{
				name: "name",
			},
			{
				name: "sort",
				fieldProp: { type: "number" },
			},
		],
	},
	authors: {
		columns: [
			{
				title: "ID",
				key: "id",
				dataIndex: "id",
				cellRenderer: "editOpener",
			},
			{
				title: "name",
				key: "name",
				dataIndex: "name",
			},
		],
		form: [
			{
				name: "name",
			},
		],
	},
	publishings: {
		columns: [
			{
				title: "ID",
				key: "id",
				dataIndex: "id",
				cellRenderer: "editOpener",
			},
			{
				title: "name",
				key: "name",
				dataIndex: "name",
			},
		],
		form: [
			{
				name: "name",
			},
		],
	},
	rents: {
		columns: [
			{
				title: "ID",
				key: "id",
				dataIndex: "id",
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
						let remain = new Date(record.returningDate) - new Date();
						let remainDays = Math.floor(remain / ONE_DAY_IN_MS);

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
		],
	},
};

export default pagesConfig;
