import React, { useEffect, useMemo, useRef, useState } from "react";
import { message, Select, Spin } from "antd";
import { addNews } from "my-redux/actions/resource";
import { cancelDebounce, debounce, uniqueDebounceKey } from "utils/debounce";
import { matchesSearch } from "utils/search";
import FetchResource from "api/crud";
import { useResource } from "hooks/useResource";
import store from "my-redux/store";
const { Option } = Select;
const dispatch = store.dispatch;

function defaultOptionValueGetter(item) {
	return item.id;
}

function SelectFetch({
	resource,
	column = "name",
	fetchSize,
	render,
	value,
	withoutId,
	fetchable = true,
	optionValueGetter = defaultOptionValueGetter,
	...props
}) {
	const [loading, setLoading] = useState(false);
	// oxirgi qidiruv so'rovi va backend topgan qiymatlar (backend normallashtirib,
	// telefon/id bo'yicha ham topadi - ular client filtrda yashirinmasin)
	const [found, setFound] = useState({ q: "", values: [] });
	const [debounceKey] = useState(() => uniqueDebounceKey("select-fetch"));
	// eskirgan javoblar yangisini bosib ketmasligi uchun
	const requestRef = useRef(0);
	const neededIds = useMemo(() => [value], [value]);
	const items = useResource(resource, neededIds);

	useEffect(
		() => () => {
			cancelDebounce(debounceKey);
			requestRef.current += 1;
		},
		[debounceKey]
	);

	function load(query, onLoaded) {
		const requestId = ++requestRef.current;
		setLoading(true);
		FetchResource.getList(resource, query)
			.then((page) => {
				if (requestId !== requestRef.current) return;
				dispatch(addNews(resource, page.items));
				onLoaded && onLoaded(page.items);
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
			() =>
				load({ q: name, s: column, search: true }, (foundItems) =>
					setFound({ q: name, values: foundItems.map(optionValueGetter) })
				),
			debounceKey,
			500
		);
	}
	function searchById(id) {
		if (!id || isNaN(parseInt(id))) return;

		debounce(() => load({ id: [parseInt(id)] }), debounceKey, 500);
	}
	return (
		<div className="d-flex w-100">
			<Select
				{...props}
				style={{ width: !withoutId ? "70%" : "100%" }}
				placeholder={props.placeholder}
				loading={loading}
				optionFilterProp="children"
				notFoundContent={loading && <Spin size="small" />}
				onSearch={fetch}
				filterOption={(input, option) =>
					(found.q === input && found.values.includes(option.value)) ||
					matchesSearch(option.children, input)
				}
				showSearch
				onChange={props.onChange}
				disabled={props.disabled}
				value={value}
			>
				{items.map((item, i) => {
					return (
						<Option key={i} value={optionValueGetter(item)}>
							{(render && render(item)) || item[column] || ""}
						</Option>
					);
				})}
			</Select>
			{!withoutId && (
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
							<Option key={i} value={optionValueGetter(item)}>
								{item.id}
							</Option>
						);
					})}
				</Select>
			)}
		</div>
	);
}
export default SelectFetch;
