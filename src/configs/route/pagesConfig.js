import { resources } from "api/resources";
import { roles } from "configs/NavigationConfig";
import { CheckCircleTwoTone, CloseCircleTwoTone } from "@ant-design/icons";
import { rents } from "./rents";

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
			{
				name: "firstName",
				rules: [{ required: true }],
				// field: "userAutoComplate",
				// fieldProp: { resource: resources.users },
			},
			{ name: "lastName", rules: [{ required: true }] },
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
				name: "extraPhone",
				field: "phoneNumber",
			},
			{ name: "birthDate", field: "date" },
			{
				name: "gender",
				field: "choice",
				fieldProp: {
					choices: [
						{
							name: "Erkak",
							value: "male",
						},
						{
							name: "Ayol",
							value: "female",
						},
					],
				},
			},
			{ name: "passportId", field: "passport" },
			{ name: "passportImage" },
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
				propName: "checked",
			},

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
	rents: rents,
};

export default pagesConfig;
