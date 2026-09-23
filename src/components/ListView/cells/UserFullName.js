import { resources } from "api/resources";
import { sendMessage } from "hooks/useSendMessage";
import React from "react";
import FetchResource from "api/crud";
import { showError } from "views/app-views/CreateRent/showError";

function UserFullName({ record }) {
	const user = record.user;
	if (!user) return "";

	return (
		<div className="cursor-pointer">
			<b
				onClick={(e) => {
					window.fastSearchOnListView("u" + user.id);
				}}
			>
				{user.id}.
			</b>

			<a
				href="/"
				onClick={(e) => {
					e.preventDefault();
					FetchResource.getOne(resources.users, user.id)
						.then((fullUser) => {
							sendMessage(
								{
									edit: true,
									id: fullUser.id,
									resource: resources.users,
									record: fullUser,
									form: resources.users,
								},
								"f_d"
							);
						})
						.catch((err) => {
							showError(err);
						});
				}}
			>{` ${user.firstName} ${user.lastName}`}</a>
		</div>
	);
}

export default UserFullName;
