import { Switch, Checkbox, Input } from "antd";
import CustomDate from "./CustomDate";
import PhoneNumber from "./PhoneNumber";
import SelectFetch from "./SelectFetch";
import StockSelect from "./StockSelect";
import UserAutoComplate from "./UserAutoComplate";

const FieldComponents = {
	input: Input,
	imageUpload: Input,
	checkbox: Checkbox,
	switch: Switch,
	date: CustomDate,
	selectFetch: SelectFetch,
	stockSelect: StockSelect,
	phoneNumber: PhoneNumber,
	userAutoComplate: UserAutoComplate,
};

export default FieldComponents;
