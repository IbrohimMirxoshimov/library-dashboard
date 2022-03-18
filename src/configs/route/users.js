import { resources } from "api/resources";
import { roles } from "configs/NavigationConfig";
import { createdAtAndUpdatedAtColumns, getDateString } from "./utils";
import { tl } from "i18n";
import { Input, Radio } from "antd";

function getInfoFromPassportSerial(text) {
	let match = text
		.trim()
		.match(/^([A-Z]{2}\d{7})\d{1}UZB\d{7}(F|M)\d{8}(\d{6})(\d{8})\d{1}$/);

	const genders = {
		F: "female",
		M: "male",
	};
	if (match) {
		return {
			passportId: match[1],
			gender: genders[match[2]],
			birthDate: new Date(
				match[3]
					.match(/(\d{2})(\d{2})(\d{2})/)
					.slice(1, 4)
					.reverse()
					.join("/")
			).toISOString(),
			pinfl: match[3] + match[4],
		};
	}
}

function parseDate(text) {
	if (text.length > 7) {
		let match = text.match(/\d+/g)?.join("");
		if (match.length === 8) {
			return new Date(
				match
					.match(/(\d{2})(\d{2})(\d{4})/)
					.slice(1, 4)
					.reverse()
					.join("/")
			).toISOString();
		}
	}
}

function Tokenization({ form }) {
	return (
		<Input
			placeholder="Tokenization => paste here passport serial or birthdate (like 25 11 1997)"
			className="mb-4"
			onChange={(e) => {
				if (e.target.value) {
					let birthDate = parseDate(e.target.value);
					if (birthDate) {
						form.setFieldsValue({
							birthDate: birthDate,
						});
					} else {
						let userInfo = getInfoFromPassportSerial(e.target.value);
						form.setFieldsValue(userInfo);
					}
				}
			}}
		/>
	);
}

export const users = {
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
			fieldComponent: Radio.Group,
		},
		{
			name: "extraPhone",
			label: tl("extraPhone"),
			field: "phoneNumber",
		},
		{ name: "passportImage", label: tl("passportImage") },
		{
			colSpan: 24,
			Component: Tokenization,
		},
		{
			name: "libraryId",
			field: "selectFetch",
			role: roles.owner,
			label: tl("libraryId"),
			fieldProp: { resource: resources.locations },
		},
		{
			name: "pinfl",
			label: tl("pinfl"),
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
};
