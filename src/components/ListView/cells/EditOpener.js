import { sendMessage } from "hooks/useSendMessage";
import React, { useContext } from "react";
import { ListViewContext } from "../utils/context";

function EditOpener({ record, value }) {
	const { resource } = useContext(ListViewContext);
	return (
		<a
			href="/"
			onClick={(e) => {
				e.preventDefault();
				sendMessage(
					{
						edit: true,
						id: record.id,
						resource: resource,
						record: record,
						form: resource.endpoint,
					},
					"f_d"
				);
			}}
		>
			{value}
		</a>
	);
}

export default EditOpener;
