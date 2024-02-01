import React, { useState } from "react";
import { message, Select, Spin } from "antd";
import { debounce } from "utils/debounce";
import FetchResource from "api/crud";
import { addNews } from "my-redux/actions/resource";
import { resources } from "api/resources";
import { useDispatch } from "react-redux";

function StockSelect({
	resource,
	column = "name",
	fetchable = true,
	fetchSize,
	value,
	onChangeItem,
	onChange,
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

	function onChangeInner(value) {
		if (onChangeItem) {
			const item = items.find((item) => item.id === value);
			onChangeItem(item);
		}
		onChange(value);
	}

	return (
		<div className="d-flex">
			<Select
				style={{ width: "70%" }}
				loading={loading}
				notFoundContent={loading && <Spin size="small" />}
				onSearch={fetch}
				filterOption={(input, option) => {
					return option.label.toLowerCase().indexOf(input.toLowerCase()) >= 0;
				}}
				showSearch
				onChange={onChangeInner}
				value={value}
				{...props}
				options={items.map((item) => {
					return {
						value: item.id,
						label: item.book.name,
					};
				})}
			/>
			<div className="custom-stock">
				<label>Kitob raqami</label>
				<Select
					id="stockInputRef"
					style={{ width: "100%", minWidth: "30%" }}
					loading={loading}
					notFoundContent={loading && <Spin size="small" />}
					onSearch={searchById}
					onChange={onChangeInner}
					showSearch
					value={value}
					placeholder={"Kitob raqami"}
					options={items.map((item) => {
						return {
							value: item.id,
							label: item.id,
						};
					})}
				/>
			</div>
		</div>
	);
}
export default StockSelect;
