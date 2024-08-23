import { createdAtAndUpdatedAtColumns } from "./utils";
import { Button, message, Select, Table, Tag } from "antd";
import React, { useEffect, useState } from "react";
import FetchResource from "api/crud";
import { tl } from "i18n";

const users_filter_types = {
  all: "all",
  active_reading: "active_reading",
  rent_expired: "rent_expired",
  top_librarians: "top_librarians",
  by_json: "by_json",
};

const subTableColumns = [
	{
		title: "Index",
		key: "id",
		render: (t, r, index) => index + 1,
	},
	{
		title: "ID",
		dataIndex: "id",
		key: "id",
		width: "20px"
	},
	{
		title: "Phone",
		dataIndex: "phone",
		key: "phone",
	},
	{
		title: "Status",
		key: "status",
		dataIndex: "status",
		render: (status) => {
			switch (status) {
				case "error":
					return <Tag color="#f50">{status}</Tag>;
				case "done":
					return <Tag color="green">{status}</Tag>;
				case "pending":
					return <Tag color="orange">{status}</Tag>;
				default:
					return <Tag color="blue">{status}</Tag>;
			}
		},
	},
	{
		title: "Text",
		key: "text",
		dataIndex: "text"
	},
	{
		title: "Error",
		key: "error_reason",
		dataIndex: "error_reason"
	},
];
const SubTable = React.memo(
	({ item }) => {
		const [data, setData] = useState([]);

		useEffect(() => {
			FetchResource.getList("sms/messages", {
				size: 1000,
				filters: {
					smsbulkId: item.id,
				},
			})
				.then((res) => {
					console.log(res);
					setData(res.items);
				})
				.catch((e) => {
					message.error(e.message);
				});
			// eslint-disable-next-line
		}, []);

		return (
			<>
				<div>
					{Object.entries(
						data.reduce(
							(pv, cv) => {
								switch (cv.status) {
									case "error":
										pv.error = pv.error + 1;
										break;
									case "done":
										pv.done = pv.done + 1;
										break;
									case "pending":
										pv.pending = pv.pending + 1;
										break;
									default:
										pv.draft = pv.draft + 1;
								}

								return pv;
							},
							{
								error: 0,
								done: 0,
								pending: 0,
								draft: 0,
							}
						)
					).map(([key, value]) => (
						<Tag color="blue">
							{key}:{value}
						</Tag>
					))}
				</div>
				<Table
					loading={!data.length}
					columns={subTableColumns}
					dataSource={data}
					pagination={false}
					scroll={{
						x: "100%"
					}}
				/>
			</>
		);
	},
	(pv, cv) => pv.id === cv.id
);

const expandedRowRender = (record, t, y, open) => {
	if (open) {
		return <SubTable item={record} />;
	}
};

export const smsbulks = {
	name: tl("smsbulk"),
	nameOne: tl("smsbulk"),
	tableProps: {
		expandable: {
			expandedRowRender: expandedRowRender,
		},
	},
	columns: [
		{
			title: "ID",
			key: "id",
			dataIndex: "id",
			cellRenderer: "editOpener",
			width: 100
		},
		{
			title: "Text",
			key: "text",
			dataIndex: "text",
			width: 150,
			ellipsis: true,
		},
		...createdAtAndUpdatedAtColumns,
		{
			title: "Action",
			key: "action",
			dataIndex: "id",
			render: (id) => {
				return (
					<Button
						size="small"
						onClick={() => {
							FetchResource.update("sms", id, {
								status: "error",
							})
								.then((r) => message.success("Updated"))
								.catch((e) => message.error(e.message));
						}}
						danger
						type="primary"
					>
						STOP
					</Button>
				);
			},
		},
	],
	form: [
		{
			name: "text",
			rules: [{ required: true }],
			label: tl("text"),
			colSpan: 24,
			field: "textarea",
			fieldProp: {
				showCount: true,
			},
			disabledOnEdit: true,
		},
		{
			name: "users_filter",
			label: tl("users_filter"),
			colSpan: 24,
			disabledOnEdit: true,
			fieldProp: {
				options: Object.values(users_filter_types).map((uft) => ({
					label: tl(uft),
					value: uft,
				})),
			},
			fieldComponent: Select,
		},
		{
			name: "phones",
			label: tl("phones"),
			colSpan: 24,
			disabledOnEdit: true,
			fieldProp: {
				mode: "tags",
				tokenSeparators: [","],
			},
			fieldComponent: Select,
		},
	],
	search: { key: "text" },
};
