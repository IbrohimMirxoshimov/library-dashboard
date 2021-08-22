import React from "react";
import { Select } from "antd";

const { Option } = Select;

const Choice = ({ placeholder, choices, ...props }) => {
	return (
		<Select placeholder={placeholder} showSearch {...props}>
			{choices.map((choice, i) => (
				<Option key={i} value={choice.value}>
					{choice.name}
				</Option>
			))}
		</Select>
	);
};

export default Choice;
