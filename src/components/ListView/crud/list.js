/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useMemo } from "react";
import { Card, Table, Button, message } from "antd";
import { PlusOutlined, ReloadOutlined } from "@ant-design/icons";
import Flex from "components/shared-components/Flex";
import Title from "antd/lib/typography/Title";
import SearchCrud from "components/SearchCrud";
import FetchResource from "api/crud";
import { sendMessage } from "hooks/useSendMessage";
import { unstable_batchedUpdates } from "react-dom";
import { ListViewContext } from "../utils/context";
import { cells } from "../cells";
import { useSelector } from "react-redux";
import { addNeeds } from "redux/actions/resource";
// import { resources } from "api/resources";

const initialQuery = {
	size: 20,
	page: 1,
	// sort: "updatedAt",
};

function hideOwner(page) {
	page.items = page.items.filter((user) => !user.owner);
	return page;
}

function ResourceRender({ id, resourceKey = "name", resource }) {
	const item = useSelector((state) =>
		state[resource].items.find((item) => item.id === id)
	);
	return (item && item[resourceKey]) || "";
}

function customizeColumns(columns, resource) {
	console.log(resource);

	return columns.map((column) => {
		if (column.sorter === undefined) {
			column.sorter = true;
		}

		if (column.cellRenderer) {
			let Component = cells[column.cellRenderer];
			column.render = (text, record) => (
				<Component record={record} value={text} resource={resource} />
			);
		}
		if (column.resource) {
			column.render = (value) => (
				<ResourceRender
					resource={column.resource}
					id={value}
					resourceKey={column.resourceKey}
				/>
			);
		}

		return column;
	});
}

function columnsResourcesAddNeeds(columns, page) {
	columns.forEach((column) => {
		if (column.resource) {
			addNeeds(
				column.resource,
				page.items.map((item) => item[column.dataIndex])
			);
		}
	});
}

const List = ({ resource, columns }) => {
	const [loading, setLoading] = useState(false);
	const [list, setList] = useState({
		items: [],
		totalCount: 0,
		page: 1,
	});

	const tableColumns = useMemo(() => {
		return customizeColumns(columns, resource.endpoint);
		// eslint-disable-next-line
	}, []);

	function handleTableChange(pagination, filter, sort) {
		let q = {
			size: pagination.pageSize,
			page: pagination.current,
		};

		if (sort.column) {
			q = {
				...q,
				sort: sort.field,
				order: sort.order === "ascend" ? "ASC" : "DESC",
			};
		}

		if (filter.returned && filter.returned.length !== 2) {
			q = {
				...q,
				filters: {
					returned: filter.returned.includes("returned"),
				},
			};
		}
		fetch(q);
	}

	async function fetch(query) {
		setLoading(true);
		FetchResource.getList(resource.endpoint, query)
			.then((page) => {
				unstable_batchedUpdates(() => {
					columnsResourcesAddNeeds(columns, page, resource.endpoint);
					setList(hideOwner(page));
					setLoading(false);
				});
			})
			.catch((err) => {
				console.error(err);
				setLoading(false);
				message.error("Error");
			});
	}

	useEffect(() => {
		fetch(initialQuery);
		// eslint-disable-next-line
	}, []);

	const openAddDrawer = () => {
		sendMessage({ form: resource.endpoint, resource: resource }, "f_d");
	};

	const onRefresh = () => {
		fetch(initialQuery);
	};

	return (
		<Card>
			<ListViewContext.Provider value={{ resource: resource }}>
				<Flex alignItems="center" justifyContent="between" mobileFlex={false}>
					<div>
						<Title level={3} style={{ marginBottom: "15px" }}>
							{resource.name}
						</Title>
					</div>
					<SearchCrud initialQuery={initialQuery} fetch={fetch} />
					<div className="d-flex">
						<Button
							className="mr-1 px-2"
							icon={<ReloadOutlined />}
							onClick={onRefresh}
						>
							Yangilash
						</Button>

						<Button
							type="primary"
							icon={<PlusOutlined />}
							block
							onClick={openAddDrawer}
						>
							Qo'shish
						</Button>
					</div>
				</Flex>
				<div className="table-responsive">
					<Table
						loading={loading}
						columns={tableColumns}
						rowKey={(record) => record.id}
						pagination={{
							total: list.totalCount,
							pageSize: initialQuery.size,
							current: list.page,
						}}
						showSorterTooltip
						dataSource={list.items}
						onChange={handleTableChange}
						size="small"
					/>
				</div>
			</ListViewContext.Provider>
		</Card>
	);
};

export default List;
