import { resources } from "api/resources";
import { roles } from "configs/NavigationConfig";
import { CheckCircleTwoTone, CloseCircleTwoTone } from "@ant-design/icons";
import { rents } from "./rents";
import { createdAtAndUpdatedAtColumns } from "./utils";
import { tl } from "i18n";
import ActiveControllerCell from "./components/ActiveControllerCell";
import { users } from "./users";
import SubForm from "./components/SubForm";

const pagesConfig = {
	users: users,
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
				title: "image",
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
		footer: (data, form) => {
			return [
				<SubForm
					data={{
						form: "authors",
						resource: { endpoint: "authors", nameOne: "Muallif" },
					}}
					buttonText={"Muallif +"}
				/>,
				<SubForm
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
