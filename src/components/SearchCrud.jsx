import React from "react";
import { Input } from "antd";
const { Search } = Input;

function SearchCrud({ initialQuery, fetch }) {
	return (
		<div>
			<Search
				placeholder="Qidiruv..."
				onSearch={(value) => fetch({ ...initialQuery, q: value })}
				style={{ width: "100%", marginBottom: 3 }}
				enterButton
			/>
		</div>
	);
}

export default SearchCrud;
