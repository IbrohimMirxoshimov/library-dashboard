import { DatePicker } from "antd";
import React from "react";
import moment from "moment";

function CustomDate({ onChange, value }) {
	return (
		<DatePicker
			value={value && moment(value)}
			onChange={(value) => {
				value && onChange(value.toISOString());
			}}
			format="DD.MM.YY"
		/>
	);
}

export default CustomDate;
