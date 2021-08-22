import React, { useEffect, useState } from "react";
import { message, Select, Spin } from "antd";
import { addNeeds } from "redux/actions/resource";
import { debounce } from "utils/debounce";
import FetchResource from "api/crud";
import { useSelector } from "react-redux";

const { Option } = Select;

function StockSelect({
	resource,
	column = "name",
	fetchable,
	fetchSize,
	...props
}) {
	const [loading, setLoading] = useState(false);
	const item = useSelector((state) =>
		state[resource].items.find((i) => i.id === props.value)
	);
	const [items, setItems] = useState(item ? [item] : []);
	useEffect(() => {
		addNeeds(resource, [props.value]);
	});

	function fetch(name) {
		if (!fetchable) return;
		if (!name) return;

		debounce(
			() => {
				setLoading(true);

				FetchResource.getList(resource, { q: name, filters: { busy: false } })
					.then((page) => {
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
	return (
		<Select
			placeholder={props.placeholder}
			loading={loading}
			optionFilterProp="children"
			notFoundContent={loading && <Spin size="small" />}
			onSearch={fetch}
			filterOption={(input, option) =>
				option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
			}
			showSearch
			{...props}
		>
			{items.map((item, i) => {
				return (
					<Option key={i} value={item.id}>
						{`${item.id} - ${item.book.name}`}
					</Option>
				);
			})}
		</Select>
	);
}
export default StockSelect;
