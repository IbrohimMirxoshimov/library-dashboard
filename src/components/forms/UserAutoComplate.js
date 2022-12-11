import React from "react";
import { AutoComplete, message } from "antd";
import { addNews } from "redux/actions/resource";
import { debounce } from "utils/debounce";
import FetchResource from "api/crud";
import { useResource } from "hooks/useResource";
import store from "redux/store";

const dispatch = store.dispatch;
function UserAutoComplate({ resource, ...props }) {
	const items = useResource(resource, [props.value], null, null, true);
	// console.log(items);

	function fetch(name) {
		if (!name) return;

		debounce(
			() => {
				// setLoading(true);
				FetchResource.getList("users", { q: name })
					.then((page) => {
						dispatch(addNews(resource, page.items));
						// setLoading(false);
					})
					.catch((e) => {
						message.error(e.message);
						console.error(e);
					});
			},
			"a-c",
			500
		);
	}
	return (
		<AutoComplete
			options={items.map((item) => {
				let l = `${item.id} ${item.firstName} ${item.lastName}`;
				return {
					label: l,
					value: item.firstName,
				};
			})}
			// style={{ width: 200 }}
			// onSelect={onSelect}
			filterOption={(input, option) =>
				option.props.children?.toLowerCase().indexOf(input.toLowerCase()) >= 0
			}
			onSearch={fetch}
			{...props}
		/>
	);
}
export default UserAutoComplate;
