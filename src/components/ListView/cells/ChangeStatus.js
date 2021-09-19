import { message, Switch } from "antd";
import Rents from "api/routes/rents";
import React, { useState } from "react";

function ChangeStatus({ record, value }) {
	const [loading, setLoading] = useState(false);
	const [checked, setChecked] = useState(!!value);
	return (
		<Switch
			loading={loading}
			checked={checked}
			onChange={(ch) => {
				if (ch) {
					setLoading(true);
					Rents.return(record.id, { stockId: record.stockId })
						.then((r) => {
							setLoading(false);
							message.success("Success");
							setChecked(true);
						})
						.catch((err) => {
							console.error(err);
							setLoading(false);

							message.error(err.message);
						});
				} else {
					message.warning(
						"Berilgan kitobni orqaga qaytarish mumkin emas. Ijarani qayti tashkil qilishingiz mumkin.",
						5
					);
				}
			}}
		/>
	);
}

export default ChangeStatus;
