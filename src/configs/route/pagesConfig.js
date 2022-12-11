import { resources } from "api/resources";
import { CheckCircleTwoTone, CloseCircleTwoTone } from "@ant-design/icons";
import { rents } from "./rents";
import { createdAtAndUpdatedAtColumns } from "./utils";
import { tl } from "i18n";
import ActiveControllerCell from "./components/ActiveControllerCell";
import { users } from "./users";
import { smsbulks } from "./smsbulks";
import SubForm from "./components/SubForm";

const pagesConfig = {
	users: users,
	sms: smsbulks,
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
			// {
			// 	name: "locationId",
			// 	label: tl("location"),
			// 	field: "selectFetch",
			// 	role: roles.owner,
			// 	fieldProp: { resource: resources.locations, fetchSize: 30 },
			// },
		],
		footer: (data, form) => {
			return [
				<SubForm
					data={{
						form: "books",

						resource: { endpoint: "books", nameOne: "Kitob" },
					}}
					buttonText={"Kitob +"}
				/>,
			];
		},
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
	towns: {
		name: tl("towns"),
		nameOne: tl("town"),
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
				title: tl("name"),
				key: "name",
				dataIndex: "name",
				cellRenderer: "editOpener",
			},
			{
				title: tl("image"),
				key: "image",
				dataIndex: "image",
				render: (image) =>
					image ? (
						<a href={image} rel="noreferrer" target={"_blank"}>
							Ochish
						</a>
					) : (
						"-"
					),
			},
			{
				title: tl("group"),
				key: "booksgroup",
				dataIndex: "booksGroupId",
				resource: resources.booksgroups,
			},
			{
				title: tl("pages"),
				key: "pages",
				dataIndex: "pages",
			},
			{
				title: tl("rentDuration"),
				key: "rentDuration",
				dataIndex: "rentDuration",
			},
			{
				title: tl("author"),
				key: "authorId",
				dataIndex: "authorId",
				resource: resources.authors,
			},
			{
				title: tl("isbn"),
				key: "isbn",
				dataIndex: "isbn",
			},
			...createdAtAndUpdatedAtColumns,
		],
		form: [
			{
				name: "name",
				label: tl("name"),
				rules: [
					{
						required: true,
					},
				],
			},
			{
				name: "rentDuration",
				label: tl("rentDuration"),
				rules: [
					{
						required: true,
					},
				],
				fieldProp: { type: "number" },
			},
			{
				name: "isbn",
				label: tl("isbn"),
				// rules: [
				// 	{
				// 		required: true,
				// 	},
				// ],
			},
			{
				name: "pages",
				label: tl("pages"),
				fieldProp: { type: "number" },
			},
			{
				name: "price",
				label: tl("price"),
				rules: [
					{
						required: true,
					},
				],
				fieldProp: { type: "number" },
			},
			{
				name: "authorId",
				label: tl("author"),
				field: "selectFetch",
				fieldProp: { resource: resources.authors, fetchable: true },
			},
			{
				label: tl("description"),
				name: "description",
			},
			{
				name: "image",
				label: tl("image"),
				field: "imageUpload",
			},

			{
				name: "few",
				field: "choice",
				label: tl("Tanqislik"),
				fieldProp: {
					choices: [
						{
							value: 0,
							name: "Tanqis emas",
						},
						{
							value: 1,
							name: "Tanqis",
						},
						{
							value: 2,
							name: "Tizim",
						},
					],
				},
			},
			{
				name: "booksGroupId",
				field: "selectFetch",
				label: tl("group"),
				fieldProp: { resource: resources.booksgroups, fetchable: true },
			},

			{
				name: "publishingId",
				field: "selectFetch",
				label: tl("publishing"),
				fieldProp: { resource: resources.publishings, fetchable: true },
			},
			{
				name: "printedAt",
				label: tl("printedAt"),
				fieldProp: { type: "date" },
			},

			{
				name: "sort",
				label: tl("sort"),
				fieldProp: { type: "number" },
			},
		],
		footer: (data, form) => {
			return [
				<SubForm
					key={1}
					data={{
						form: "authors",
						resource: { endpoint: "authors", nameOne: "Muallif" },
					}}
					buttonText={"Muallif +"}
				/>,
				<SubForm
					key={2}
					data={{
						form: "publishings",
						resource: { endpoint: "publishings", nameOne: "Nashriyot" },
					}}
					buttonText={"Nashriyot +"}
				/>,
			];
		},
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
				label: tl("name"),
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
				label: tl("name"),
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
