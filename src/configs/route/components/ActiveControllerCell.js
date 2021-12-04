import { message, Switch } from "antd";
import React, { useState } from "react";
import FetchResource from "api/crud";
function ActiveControllerCell(init, data) {
	const [checked, setChecked] = useState(init);
	const [loading, setLoading] = useState(false);
	return (
		<Switch
			loading={loading}
			checked={checked}
			onChange={(v) => {
				setLoading(true);
				FetchResource.update("locations", data.id, {
					active: v,
				})
					.then((r) => {
						message.success("Success");
						setLoading(false);
						setChecked(v);
					})
					.catch((r) => {
						console.error(r);
						message.error("Error");
						setLoading(false);
					});
			}}
		/>
	);
}

export default ActiveControllerCell;
