import { message, Switch } from "antd";
import Rents from "api/routes/rents";
import React, { useState } from "react";

function ChangeStatus({ record, value }) {
	const [loading, setLoading] = useState(false);
	return (
		<Switch
			loading={loading}
			defaultChecked={value}
			onChange={(ch) => {
				setLoading(true);
				Rents.return(record.id, { returned: ch, stockId: record.stockId })
					.then((r) => {
						setLoading(false);
						message.success("Success");
					})
					.catch((err) => {
						console.error(err);
						setLoading(false);

						message.error(err.message);
					});
			}}
		/>
	);
}

export default ChangeStatus;
