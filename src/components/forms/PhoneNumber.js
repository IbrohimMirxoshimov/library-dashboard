import React from "react";
import MaskedInput from "antd-mask-input";
import { CopyTwoTone } from "@ant-design/icons";
import copyText from "utils/copyText";

function PhoneNumber(props) {
	const suffix = (
		<CopyTwoTone
			onClick={() => copyText(props.id)}
			style={{
				fontSize: 16,
				cursor: "pointer",
			}}
		/>
	);
	return (
		<MaskedInput
			mask="111111111"
			size="16"
			prefix="+998"
			suffix={suffix}
			{...props}
		/>
	);
}

export default PhoneNumber;
