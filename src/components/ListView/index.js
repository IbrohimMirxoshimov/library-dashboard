import React from "react";
import List from "./crud/list";

function ListView({ resource, columns }) {
	// console.log("ss", resource);
	return (
		<div>
			<List resource={resource} columns={columns} />
		</div>
	);
}

export default ListView;
