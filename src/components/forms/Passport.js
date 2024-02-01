import React from "react";
import MaskedInput from "antd-mask-input";

function Passport(props) {
	return (
		<MaskedInput
			className="masked"
			mask={"aa0000000"}
			maskOptions={{
				prepare: (value) => {
					return value.toUpperCase();
				},
			}}
			{...props}
		/>
	);
}

export default Passport;
