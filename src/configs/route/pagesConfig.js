import { resources } from "api/resources";
import { roles } from "configs/NavigationConfig";
import { CheckCircleTwoTone, CloseCircleTwoTone } from "@ant-design/icons";
import { rents } from "./rents";
import { createdAtAndUpdatedAtColumns, getDateString } from "./utils";
import { tl } from "i18n";
import ActiveControllerCell from "./components/ActiveControllerCell";
import { Radio } from "antd";

const pagesConfig = {
	users: {
		name: tl("users"),
		nameOne: tl("user"),
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
				role: roles.owner,
			},
			{
				title: "Tug'ilgan",
				key: "birthDate",
				dataIndex: "birthDate",
				render: getDateString,
			},
			...createdAtAndUpdatedAtColumns,
		],
		form: [
			{
				name: "firstName",
				rules: [{ required: true }],
				label: tl("firstName"),
				// field: "userAutoComplate",
				// fieldProp: { resource: resources.users },
			},
			{ name: "lastName", label: tl("lastName"), rules: [{ required: true }] },
			{ name: "birthDate", label: tl("birthDate"), field: "date" },
			{ name: "passportId", label: tl("passportId"), field: "passport" },
			{
				name: "phone",
				rules: [
					{
						required: true,
					},
				],
				label: tl("phone"),
				field: "phoneNumber",
			},
			{
				name: "gender",
				field: "choice",
				label: tl("gender"),
				rules: [{ required: true }],
				fieldProp: {
					options: [
						{
							label: "Erkak",
							value: "male",
						},
						{
							label: "Ayol",
							value: "female",
						},
					],
					optionType: "button",
				},
				component: Radio.Group,
			},
			{
				name: "extraPhone",
				label: tl("extraPhone"),
				field: "phoneNumber",
			},
			{ name: "passportImage", label: tl("passportImage") },
			{
				name: "libraryId",
				field: "selectFetch",
				role: roles.owner,
				label: tl("libraryId"),
				fieldProp: { resource: resources.locations },
			},

			{
				name: "regionId",
				field: "selectFetch",
				role: roles.owner,
				fieldProp: { resource: resources.regions },
			},
			{ name: "username", role: roles.owner },
			{ name: "password", role: roles.owner },
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
				label: tl("verified"),
				propName: "checked",
			},

			{ name: "extra", label: tl("extra") },
		],
		view: { canDelete: (user) => true },
	},
	stocks: {
		name: tl("stocks"),
		nameOne: tl("stock"),
		view: { canDelete: (record) => !record.busy },
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
				valueGetter: (item) => `${item.id}. ${item.name}`,
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
			...createdAtAndUpdatedAtColumns,
		],
		form: [
			{
				name: "bookId",
				field: "selectFetch",
				label: tl("book"),
				rules: [
					{
						required: true,
					},
				],
				fieldProp: { resource: resources.books, fetchable: true },
			},
			{
				name: "locationId",
				label: tl("location"),
				field: "selectFetch",
				role: roles.owner,
				fieldProp: { resource: resources.locations, fetchSize: 30 },
			},
		],
	},
	locations: {
		name: tl("locations"),
		nameOne: tl("location"),
		view: { canDelete: (record) => true },
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
				title: "active",
				key: "active",
				dataIndex: "active",
				render: ActiveControllerCell,
			},
			{
				title: "link",
				key: "link",
				dataIndex: "link",
			},
			...createdAtAndUpdatedAtColumns,
		],
		form: [
			{
				name: "name",
				rules: [
					{
						required: true,
					},
				],
			},
			{
				name: "regionId",
				field: "selectFetch",
				rules: [
					{
						required: true,
					},
				],
				fieldProp: { resource: resources.regions, fetchable: true },
			},
			{
				name: "link",
				rules: [
					{
						required: true,
					},
				],
			},
			{
				name: "active",
				field: "switch",
				propName: "checked",
			},
			{
				name: "description",
				field: "input",
				fieldProp: { type: "text" },
			},
		],
	},
	regions: {
		name: tl("regions"),
		nameOne: tl("region"),
		view: { canDelete: () => true },
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
			...createdAtAndUpdatedAtColumns,
		],
		form: [
			{
				name: "name",
			},
		],
	},
	books: {
		name: tl("books"),
		nameOne: tl("book"),
		view: { canDelete: (record) => true },
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
			...createdAtAndUpdatedAtColumns,
		],
		form: [
			{
				name: "name",
				rules: [
					{
						required: true,
					},
				],
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
				rules: [
					{
						required: true,
					},
				],
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
		name: tl("booksgroups"),
		nameOne: tl("booksgroup"),
		view: { canDelete: (record) => true },
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
			...createdAtAndUpdatedAtColumns,
		],
		form: [
			{
				name: "name",
				rules: [
					{
						required: true,
					},
				],
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
		name: tl("collections"),
		nameOne: tl("collection"),
		view: { canDelete: (record) => true },
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
			...createdAtAndUpdatedAtColumns,
		],
		form: [
			{
				name: "name",
				rules: [
					{
						required: true,
					},
				],
			},
			{
				name: "sort",
				fieldProp: { type: "number" },
			},
		],
	},
	authors: {
		name: tl("authors"),
		nameOne: tl("author"),
		view: { canDelete: (record) => true },
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
			...createdAtAndUpdatedAtColumns,
		],
		form: [
			{
				name: "name",
				rules: [
					{
						required: true,
					},
				],
			},
		],
	},
	publishings: {
		name: tl("publishings"),
		nameOne: tl("publishing"),
		view: { canDelete: (record) => true },
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
			...createdAtAndUpdatedAtColumns,
		],
		form: [
			{
				name: "name",
				rules: [
					{
						required: true,
					},
				],
			},
		],
	},
	rents: rents,
};

export default pagesConfig;
