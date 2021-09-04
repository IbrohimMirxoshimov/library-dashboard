import { Button, message, Popconfirm } from "antd";
import React, { useState } from "react";
import { CloseCircleOutlined } from "@ant-design/icons";
import Rents from "api/routes/rents";

function RejectRent({ id, onClose }) {
	const [loading, setLoading] = useState(false);
	return (
		<div className="d-flex justify-content-between">
			<Popconfirm
				title="Eslatma!!! Agar Ijarani bekor qilsangiz shunga bog'langan kitob ham o'chib ketadi!"
				okText="Roziman"
				cancelText="Yo'q"
				okButtonProps={{
					danger: true,
				}}
				onConfirm={() => {
					setLoading(true);
					Rents.reject(id, true)
						.then(() => {
							setLoading(true);
							onClose();
							message.success("Muvoffaqiyatli bekor qilindi");
						})
						.catch((err) => {
							setLoading(true);
							console.log(err);
							message.error("O'chirishda xatolik");
						});
				}}
				icon={<CloseCircleOutlined style={{ color: "red" }} />}
			>
				<Button
					type="primary"
					danger
					loading={loading}
					icon={<CloseCircleOutlined />}
				>
					Qaytarilmasdan bekor qilish
				</Button>
			</Popconfirm>
			<Popconfirm
				title="Eslatma!!! Bog'langan kitob kutubxonadan bo'sh holatda saqlanib qoladi."
				okText="Roziman"
				cancelText="Yo'q"
				okButtonProps={{
					danger: true,
				}}
				onConfirm={() => {
					setLoading(true);

					Rents.reject(id, false)
						.then(() => {
							setLoading(true);
							onClose();
							message.success("Muvoffaqiyatli");
						})
						.catch((err) => {
							setLoading(true);
							message.error("O'chirishda xatolik");
						});
				}}
				icon={<CloseCircleOutlined style={{ color: "red" }} />}
			>
				<Button
					type="primary"
					danger
					loading={loading}
					icon={<CloseCircleOutlined />}
				>
					Oddiy o'chirish
				</Button>
			</Popconfirm>
		</div>
	);
}

export default RejectRent;
