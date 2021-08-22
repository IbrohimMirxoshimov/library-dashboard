import React from "react";
import MaskedInput from "antd-mask-input";

function PhoneNumber(props) {
	return (
		<MaskedInput
			mask="11 111 1111"
			name="card"
			size="16"
			prefix="+998"
			{...props}
			// onChange={(e) => {
			// 	props.onChange(e.target.value.replace(/ /g, "").replace("+998", ""));
			// }}
		/>
	);
}

export default PhoneNumber;
