import { Switch, Checkbox, Input } from "antd";
import Choice from "./Choice";
import ImageUpload from "./ImageUpload";
import CustomDate from "./CustomDate";
import Passport from "./Passport";
import PhoneNumber from "./PhoneNumber";
import SelectFetch from "./SelectFetch";
import StockSelect from "./StockSelect";
import UserAutoComplate from "./UserAutoComplate";

const FieldComponents = {
	input: Input,
	textarea: Input.TextArea,
	imageUpload: ImageUpload,
	checkbox: Checkbox,
	switch: Switch,
	choice: Choice,
	date: CustomDate,
	selectFetch: SelectFetch,
	stockSelect: StockSelect,
	phoneNumber: PhoneNumber,
	userAutoComplate: UserAutoComplate,
	passport: Passport,
};

export default FieldComponents;
