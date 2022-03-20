import { message, Switch } from "antd";
import Rents from "api/routes/rents";
import { getDateString } from "configs/route/utils";
import React, { useState } from "react";

function ChangeStatus({ record, value }) {
	const [loading, setLoading] = useState(false);
	const [checked, setChecked] = useState(!!value);
	return (
		<Switch
			title={getDateString(record.returnedAt)}
			loading={loading}
			checked={checked}
			onChange={(ch) => {
				if (ch) {
					setLoading(true);
					Rents.return(record.id)
						.then((r) => {
							setLoading(false);
							message.success("Bo'shatildi");
							setChecked(true);
						})
						.catch((err) => {
							console.error(err);
							setLoading(false);
							message.error(err.message);
						});
				} else {
					message.warning("Berilgan kitobni orqaga qaytarish mumkin emas", 1);
				}
			}}
		/>
	);
}

export default ChangeStatus;
