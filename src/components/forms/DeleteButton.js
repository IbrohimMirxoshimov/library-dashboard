import React from "react";
import { DeleteOutlined } from "@ant-design/icons";
import FetchResource from "api/crud";
import { Button, message, Popconfirm } from "antd";

function DeleteButton({ id, resource, setLoading, loading, onClose }) {
	console.log(id, resource);
	return (
		<Popconfirm
			title="Ishonchingiz komilmi"
			okText="Ha"
			cancelText="Yo'q"
			onConfirm={() => {
				setLoading(true);

				FetchResource.destroy(resource.endpoint, id)
					.then((res) => {
						setLoading(false)
						onClose();
						message.success("O'chirildi");
					})
					.catch((err) => {
						message.error("O'chirishda xatolik");
					});
			}}
		>
			<Button
				type="primary"
				danger
				loading={loading}
				icon={<DeleteOutlined />}
			>
				O'chirish
			</Button>
		</Popconfirm>
	);
}

export default DeleteButton;
