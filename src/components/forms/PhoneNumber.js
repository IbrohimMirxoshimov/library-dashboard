import React from "react";
import MaskedInput from "antd-mask-input";

function PhoneNumber(props) {
	return <MaskedInput mask="111111111" size="16" prefix="+998" {...props} />;
}

export default PhoneNumber;
