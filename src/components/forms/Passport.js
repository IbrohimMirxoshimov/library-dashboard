import React from "react";
import MaskedInput from "antd-mask-input";

function Passport(props) {
	return (
		<MaskedInput
			mask="WW1111111"
			size="16"
			formatCharacters={{
				W: {
					validate(char) {
						return /[a-zA-Z]/.test(char);
					},
					transform(char) {
						return char.toUpperCase();
					},
				},
			}}
			{...props}
		/>
	);
}

export default Passport;
