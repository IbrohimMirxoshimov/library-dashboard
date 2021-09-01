import { DatePicker } from "antd";
import React from "react";
import moment from "moment";

moment.locale("en", {
	week: {
		dow: 1,
	},
});

const dateFormat = "DD.MM.YY";
function CustomDate({ onChange, value }) {
	return (
		<DatePicker
			value={value && moment(value)}
			onChange={(value) => {
				value && onChange(value.toISOString());
			}}
			format={dateFormat}
		/>
	);
}

export default CustomDate;
