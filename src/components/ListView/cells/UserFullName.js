import { resources } from "api/resources";
import { sendMessage } from "hooks/useSendMessage";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { addNeedsWithDebounce } from "redux/actions/resource";

function UserFullName({ record }) {
	const user = useSelector((state) =>
		state[resources.users].items.find((item) => item.id === record.userId)
	);
	// const book = useSelector((state) =>
	// 	state[resources.books].items.find((item) => item.id === record.stock.bookId)
	// );

	// useEffect(() => {
	// 	record.stock.bookId &&
	// 		addNeedsWithDebounce(resources.books, [record.stock.bookId]);
	// }, [record.stock.bookId]);

	if (!user) return "";

	return (
		<div>
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
			{/* <textarea>{book?.name}</textarea> */}
		</div>
	);
}

export default UserFullName;
