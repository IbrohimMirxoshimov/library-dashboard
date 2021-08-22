import ChangeStatus from "./ChangeStatus";
import UserFullName from "./UserFullName";

const { default: EditOpener } = require("./EditOpener");

export const cells = {
	editOpener: EditOpener,
	returnedChangeStatus: ChangeStatus,
	userFullName: UserFullName,
};
