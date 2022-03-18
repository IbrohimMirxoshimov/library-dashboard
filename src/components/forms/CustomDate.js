import { DatePicker } from "antd";
import React from "react";
import moment from "moment";

moment.locale("en", {
	week: {
		dow: 1,
	},
});

const dateFormat = "DD.MM.YYYY";
function CustomDate({ onChange, value, saveStorage, getDefaultValue }) {
	let dv;
	if (!value && getDefaultValue) {
		dv = getDefaultValue();
		onChange(dv);
	}
	return (
		<DatePicker
			style={{ width: "100%" }}
			value={(value && moment(value)) || (dv && moment(dv))}
			onChange={(value) => {
				if (value) {
					saveStorage && saveStorage(value);
					onChange(value.toISOString());
				}
			}}
			format={dateFormat}
		/>
	);
}

export default CustomDate;
