import React, { useContext } from "react";
import { DeleteTwoTone } from "@ant-design/icons";
import FetchResource from "api/crud";
import { ListViewContext } from "../utils/context";
import { message, Popconfirm } from "antd";

function ActionsColumn({ value }) {
	const { resource } = useContext(ListViewContext);
	return (
		<Popconfirm
			title="Ishonchingiz komilmi"
			okText="Ha"
			cancelText="Yo'q"
			onConfirm={() => {
				FetchResource.destroy(resource.endpoint, value)
					.then((res) => message.success("O'chirildi"))
					.catch((err) => {
						message.error("O'chirishda xatolik");
					});
			}}
		>
			<DeleteTwoTone twoToneColor="#eb2f96" />
		</Popconfirm>
	);
}

export default ActionsColumn;
