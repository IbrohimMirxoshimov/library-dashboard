import React from "react";
import List from "./crud/list";

function ListView({ resource, columns }) {
	return <List resource={resource} columns={columns} />;
}

export default ListView;
