import { message, Switch } from "antd";
import Rents from "api/routes/rents";
import React from "react";

function ChangeStatus({ record, value }) {
	return (
		<Switch
			defaultChecked={value}
			onChange={(ch) => {
				Rents.return(record.id, { returned: ch, stockId: record.stockId })
					.then((r) => {
						message.success("Success");
					})
					.catch((err) => {
						console.error(err);
						message.error(err.message);
					});
			}}
		/>
	);
}

export default ChangeStatus;
