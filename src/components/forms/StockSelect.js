import React, { useState } from "react";
import { message, Select, Spin } from "antd";
import { debounce } from "utils/debounce";
import FetchResource from "api/crud";
import { addNews } from "redux/actions/resource";
import { resources } from "api/resources";
import { useDispatch } from "react-redux";

const { Option } = Select;

function StockSelect({
	resource,
	column = "name",
	fetchable,
	fetchSize,
	value,
	...props
}) {
	const [loading, setLoading] = useState(false);
	const [items, setItems] = useState([]);
	const dispatch = useDispatch();
	function fetch(name) {
		if (!fetchable) return;
		if (!name) return;

		debounce(
			() => {
				setLoading(true);

				FetchResource.getList(resource, { q: name, filters: { busy: false } })
					.then((page) => {
						dispatch(addNews(resources.stocks, page.items));
						setItems(page.items);
						setLoading(false);
					})
					.catch((e) => {
						message.error(e.message);
						console.error(e);
					});
			},
			"multiple-select-form-item",
			500
		);
	}

	function searchById(id) {
		if (!id || isNaN(parseInt(id))) return;

		debounce(
			() => {
				setLoading(true);
				FetchResource.getList(resource, {
					id: [parseInt(id)],
					filters: { busy: false },
				})
					.then((page) => {
						dispatch(addNews(resources.stocks, page.items));
						setItems(page.items);
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
				defaultValue={props.value}
				onChange={props.onChange}
				disabled={props.disabled}
				value={value}
			>
				{items.map((item, i) => {
					return (
						<Option key={i} value={item.id}>
							{item.book.name}
						</Option>
					);
				})}
			</Select>
			<Select
				id="stockInputRef"
				style={{ width: "30%", minWidth: "30%", marginLeft: 3 }}
				loading={loading}
				notFoundContent={loading && <Spin size="small" />}
				onSearch={searchById}
				onChange={props.onChange}
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
export default StockSelect;
