import React, { useState } from "react";
import { message, Select, Spin } from "antd";
import { addNeeds } from "redux/actions/resource";
import { debounce } from "utils/debounce";
import FetchResource from "api/crud";
import { useResource } from "hooks/useResource";
const { Option } = Select;

function SelectFetch({
	resource,
	column = "name",
	fetchable,
	fetchSize,
	...props
}) {
	const [loading, setLoading] = useState(false);
	const items = useResource(
		resource,
		props.value,
		!fetchable && (fetchSize || 20),
		null,
		fetchable
	);

	function fetch(name) {
		if (!fetchable) return;
		if (!name) return;

		debounce(
			() => {
				setLoading(true);
				FetchResource.getList(resource, { q: name, s: column })
					.then((page) => {
						addNeeds(
							resource,
							page.items.map((item) => item.id)
						);
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
						{item[column] || ""}
					</Option>
				);
			})}
		</Select>
	);
}
export default SelectFetch;
