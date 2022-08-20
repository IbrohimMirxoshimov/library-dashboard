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

	function parseDate(data_str) {
		let match = data_str
			.match(/(\d{2})(\d{2})(\d{2})/)
			.slice(1, 4)
			.reverse();
		let year = parseInt(match[0]);

		// this works until 2040 year))
		if (year > 40) {
			match[0] = "19" + match[0];
		} else {
			match[0] = "20" + match[0];
		}

		return new Date(match.join("-")).toISOString();
	}

	if (match) {
		return {
			passportId: match[1],
			gender: genders[match[2]],
			birthDate: parseDate(match[3]),
			pinfl: match[3] + match[4],
		};
	}
}

function parseDate(text) {
	if (text.length > 7 && text.length < 13) {
		let match = text.match(/\d+/g)?.join("");
		if (match?.length === 8) {
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
					console.log(birthDate);
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
			name: ["address", "region"],
			field: "selectFetch",
			label: "Viloyat",
			role: roles.owner,
			fieldProp: {
				resource: resources.regions, defaultOptionValueGetter(item) {
					return item.name
				}
			},
		},
		{
			name: ["address", "town"],
			field: "selectFetch",
			label: "Tuman",
			role: roles.librarian,
			fieldProp: {
				resource: resources.towns, defaultOptionValueGetter(item) {
					return item.name
				}
			},
		},
		{
			name: ["address", "addressLine"],
			label: "Manzil",
			role: roles.librarian,
			colSpan: 24,
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
		{ name: "extra", label: tl("extra"), field: "textarea" },
	],
	view: { canDelete: (user) => true },
};
