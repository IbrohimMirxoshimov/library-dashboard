import { Switch, Checkbox, Input } from "antd";
import CustomDate from "./CustomDate";
import SelectFetch from "./SelectFetch";
import StockSelect from "./StockSelect";

const FieldComponents = {
	input: Input,
	imageUpload: Input,
	checkbox: Checkbox,
	switch: Switch,
	date: CustomDate,
	selectFetch: SelectFetch,
	stockSelect: StockSelect,
};

export default FieldComponents;
