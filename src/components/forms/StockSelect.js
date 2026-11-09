import React, { useEffect, useRef, useState } from "react";
import { message, Select, Spin } from "antd";
import { cancelDebounce, debounce, uniqueDebounceKey } from "utils/debounce";
import { matchesSearch } from "utils/search";
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
	// items qaysi qidiruv so'rovi natijasi (backend normallashtirib topgan - client filtrda yashirinmasin)
	const [itemsQuery, setItemsQuery] = useState("");
	const [debounceKey] = useState(() => uniqueDebounceKey("stock-select"));
	// eskirgan javoblar yangisini bosib ketmasligi uchun
	const requestRef = useRef(0);
	const dispatch = useDispatch();

	useEffect(
		() => () => {
			cancelDebounce(debounceKey);
			requestRef.current += 1;
		},
		[debounceKey]
	);

	function load(query, forQuery) {
		const requestId = ++requestRef.current;
		setLoading(true);
		FetchResource.getList(resource, query)
			.then((page) => {
				if (requestId !== requestRef.current) return;
				dispatch(addNews(resources.stocks, page.items));
				setItems(page.items);
				setItemsQuery(forQuery);
				setLoading(false);
			})
			.catch((e) => {
				if (requestId !== requestRef.current) return;
				message.error(e.message);
				console.error(e);
				setLoading(false);
			});
	}

	function fetch(name) {
		if (!fetchable) return;
		if (!name) return;

		debounce(
			() => load({ q: name, filters: { busy: false } }, name),
			debounceKey,
			500
		);
	}

	function searchById(id) {
		if (!id || isNaN(parseInt(id))) return;

		debounce(
			() => load({ id: [parseInt(id)], filters: { busy: false } }, null),
			debounceKey,
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
				filterOption={(input, option) =>
					itemsQuery === input || matchesSearch(option.label, input)
				}
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
