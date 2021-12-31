import React, { useState } from "react";
import { message, Select, Spin } from "antd";
import { addNews } from "redux/actions/resource";
import { debounce } from "utils/debounce";
import FetchResource from "api/crud";
import { useResource } from "hooks/useResource";
import store from "redux/store";
const { Option } = Select;
const dispatch = store.dispatch;
function SelectFetch({
	resource,
	column = "name",
	fetchable,
	fetchSize,
	render,
	value,
	...props
}) {
	const [loading, setLoading] = useState(false);
	const items = useResource(
		resource,
		[props.value]
		// !fetchable && (fetchSize || 20),
		// null,
		// !fetchable
	);
	// console.log(items);

	function fetch(name) {
		// if (!fetchable) return;
		if (!name) return;

		debounce(
			() => {
				setLoading(true);
				FetchResource.getList(resource, { q: name, s: column, search: true })
					.then((page) => {
						dispatch(addNews(resource, page.items));
						setLoading(false);
					})
					.catch((e) => {
						message.error(e.message);
						console.error(e);
						setLoading(false);
					});
			},
			"multiple-select-form-item",
			500
		);
	}
	function searchById(id) {
		if (!id || parseInt(id) === NaN) return;

		debounce(
			() => {
				setLoading(true);
				FetchResource.getList(resource, { id: [parseInt(id)] })
					.then((page) => {
						dispatch(addNews(resource, page.items));
						setLoading(false);
					})
					.catch((e) => {
						message.error(e.message);
						console.error(e);
						setLoading(false);
					});
			},
			"multiple-select-form-item",
			500
		);
	}
	return (
		<div className="d-flex">
			<Select
				style={{ width: "70%" }}
				placeholder={props.placeholder}
				loading={loading}
				optionFilterProp="children"
				notFoundContent={loading && <Spin size="small" />}
				onSearch={fetch}
				filterOption={(input, option) =>
					option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
				}
				showSearch
				onChange={props.onChange}
				disabled={props.disabled}
				value={value}
			>
				{items.map((item, i) => {
					return (
						<Option key={i} value={item.id}>
							{(render && render(item)) || item[column] || ""}
						</Option>
					);
				})}
			</Select>
			<Select
				style={{ width: "30%", minWidth: "30%", marginLeft: 3 }}
				loading={loading}
				notFoundContent={loading && <Spin size="small" />}
				onSearch={searchById}
				onChange={props.onChange}
				disabled={props.disabled}
				showSearch
				value={value}
				placeholder={"ID"}
			>
				{items.map((item, i) => {
					return (
						<Option key={i} value={item.id}>
							{item.id}
						</Option>
					);
				})}
			</Select>
		</div>
	);
}
export default SelectFetch;
