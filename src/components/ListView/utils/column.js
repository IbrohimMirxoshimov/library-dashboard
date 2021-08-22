import { EditOutlined } from "@ant-design/icons";
import { Checkbox } from "antd";
import { Link } from "react-router-dom";

export const getTableColumns = (resource) => [
	{
		title: "ID",
		key: "id",
		dataIndex: "id",
	},
	{
		title: "First name",
		key: "firstName",
		// render: (record) => {
		// 	return (
		// 		<Link to={endPointName + "/edit/" + record.id}>{record.firstName}</Link>
		// 	);
		// },
	},
	{
		title: "Last name",
		key: "lastName",
		// render: (record) => {
		// 	return (
		// 		<Link to={endPointName + "/edit/" + record.id}>{record.lastName}</Link>
		// 	);
		// },
	},
	{
		title: "Phone",
		dataIndex: "phone",
		key: "phone",
	},
	{
		title: "Answered",
		render: (record) => {
			return (
				<Checkbox
					checked={record.chat?.answered}
					disabled={!record.chat?.answered}
				></Checkbox>
			);
		},
		key: "answered",
	},

	{
		title: "",
		key: "action",
		// render: (record) => {
		// 	return (
		// 		<Link to={endPointName + "/edit/" + record.id}>
		// 			<div className="text-right">
		// 				<EditOutlined />
		// 			</div>
		// 		</Link>
		// 	);
		// },
	},
];
