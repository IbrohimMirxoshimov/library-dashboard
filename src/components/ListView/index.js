/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useMemo } from "react";
import { Card, Table, Button, message, Input } from "antd";
import { PlusOutlined, ReloadOutlined } from "@ant-design/icons";
import Flex from "components/shared-components/Flex";
import Title from "antd/lib/typography/Title";
import FetchResource from "api/crud";
import { sendMessage } from "hooks/useSendMessage";
import { unstable_batchedUpdates } from "react-dom";
import { ListViewContext } from "./utils/context";
import { cells } from "./cells";
import { useSelector } from "react-redux";
import { addNeeds } from "redux/actions/resource";
import { debounce } from "utils/debounce";

// import { resources } from "api/resources";
const { Search } = Input;

const initialQuery = {
	size: 20,
	page: 1,
	s: "name",
	// sort: "updatedAt
};

function hideOwner(page) {
	page.items = page.items.filter((user) => !user.owner);
	return page;
}

function ResourceRender({ id, resourceKey = "name", resource, valueGetter }) {
	const item = useSelector((state) =>
		state[resource].items.find((item) => item.id === id)
	);

	if (item) {
		if (valueGetter) {
			return valueGetter(item);
		}

		let value = item[resourceKey];
		if (value) {
			return value;
		}
	}

	return id;
}

function customizeColumns(columns, resource, user) {
	// console.log(resource);
	return columns
		.filter((column) => !column.role || user[column.role])
		.map((column) => {
			if (column.sorter === undefined) {
				column.sorter = true;
				column.showSorterTooltip = false;
			}

			if (column.cellRenderer) {
				let Component = cells[column.cellRenderer];
				column.render = (text, record) => (
					<Component record={record} value={text} resource={resource} />
				);
			} else if (column.resource) {
				column.render = (value) => (
					<ResourceRender
						resource={column.resource}
						id={value}
						resourceKey={column.resourceKey}
						valueGetter={column.valueGetter}
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

const ListView = ({ resource, columns, search }) => {
	const [loading, setLoading] = useState(false);
	const [list, setList] = useState({
		items: [],
		totalCount: 0,
		page: 1,
	});
	const [filter, setFilter] = useState({ ...initialQuery, s: search?.key });
	const user = useSelector((state) => state.auth.user);
	const tableColumns = useMemo(() => {
		return customizeColumns(columns, resource.endpoint, user);
		// eslint-disable-next-line
	}, []);
	function handleTableChange(pagination, _filter, sort) {
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
		if (_filter.returnedAt) {
			q = {
				...q,
				filters: {
					returnedAt: 0,
				},
			};
		} else if ("returnedAt" in _filter) {
			delete filter.filters?.returnedAt;
		}

		if (_filter.busy && _filter.busy.length !== 2) {
			q = {
				...q,
				filters: {
					busy: _filter.busy.includes("busy"),
				},
			};
		} else if ("busy" in _filter) {
			delete filter.filters?.busy;
		}
		q = { ...filter, ...q };
		setFilter(q);
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

	const openAddDrawer = () => {
		sendMessage({ form: resource.endpoint, resource: resource }, "f_d");
	};

	const onRefresh = () => {
		fetch(filter);
	};

	const onSearch = (v) => {
		debounce(
			() => {
				let query = { ...filter, page: 1, q: v };
				setFilter(query);
				fetch(query);
			},
			"srch",
			300
		);
	};

	useEffect(() => {
		fetch(initialQuery);
		document.querySelector("title").innerText = resource.name;

		function hotKeys(e) {
			if (e.shiftKey)
				switch (e.key) {
					case "R":
						onRefresh();
						break;
					case "F":
						document.getElementById("main-search")?.focus();
						break;
					case "C":
						openAddDrawer();
						break;

					default:
						break;
				}
		}

		window.addEventListener("keyup", hotKeys);
		window.refreshList = (resource_refresh) => {
			if (resource_refresh === resource.endpoint) {
				fetch(filter);
			}
		};
		return () => {
			window.removeEventListener("keyup", hotKeys);
		};
		// eslint-disable-next-line
	}, []);
	// console.log(list);

	return (
		<Card className="expanded">
			<ListViewContext.Provider value={{ resource: resource }}>
				<Flex
					alignItems="center"
					className="m-3"
					justifyContent="between"
					mobileFlex={false}
				>
					<div>
						<Title level={3} style={{ marginBottom: "15px" }}>
							{resource.name}
						</Title>
					</div>
					<div>
						<Search
							placeholder="Qidiruv..."
							onSearch={onSearch}
							id="main-search"
							style={{ width: "100%", marginBottom: 3 }}
							enterButton
						/>
					</div>
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
							pageSize: filter.size,
							current: list.page,
							showTotal: (total) => "Umumiy: " + total,
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

export default ListView;
