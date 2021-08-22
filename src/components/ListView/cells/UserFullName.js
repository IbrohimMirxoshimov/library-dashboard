import { resources } from "api/resources";
import { sendMessage } from "hooks/useSendMessage";
import React from "react";
import { useSelector } from "react-redux";

function UserFullName({ record }) {
	const user = useSelector((state) =>
		state[resources.users].items.find((item) => item.id === record.id)
	);
	if (!user) {
		return "";
	}
	return (
		<a
			href="/"
			onClick={(e) => {
				e.preventDefault();
				sendMessage(
					{
						edit: true,
						id: user.id,
						resource: resources.users,
						record: user,
						form: resources.users,
					},
					"f_d"
				);
			}}
		>{`${user.firstName} ${user.lastName}`}</a>
	);
}

export default UserFullName;
