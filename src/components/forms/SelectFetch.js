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
	...props
}) {
	const [loading] = useState(false);
	const items = useResource(
		resource,
		[props.value]
		// !fetchable && (fetchSize || 20),
		// null,
		// !fetchable
	);
	console.log(items);

	function fetch(name) {
		// if (!fetchable) return;
		if (!name) return;

		debounce(
			() => {
				// setLoading(true);
				FetchResource.getList(resource, { q: name, s: column, search: true })
					.then((page) => {
						dispatch(addNews(resource, page.items));
						// setLoading(false);
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
			defaultValue={props.value}
			onChange={props.onChange}
			disabled={props.disabled}
		>
			{items.map((item, i) => {
				return (
					<Option key={i} value={item.id}>
						{item[column] || ""}
					</Option>
				);
			})}
		</Select>
	);
}
export default SelectFetch;
