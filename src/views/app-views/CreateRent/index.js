import { Button, Col, Form, message, notification, Row } from "antd";
import { resources } from "api/resources";
import CustomDate from "components/forms/CustomDate";
import SelectFetch from "components/forms/SelectFetch";
import StockSelect from "components/forms/StockSelect";
import React, { useEffect } from "react";
import FetchResource from "api/crud";
import { useSelector } from "react-redux";
import printReciept from "utils/printReciept";

const days = [5, 10, 15, 20, 30];

const openNotification = (userName, bookName) => {
	notification.success({
		message: <h3>Ijaraga berildi</h3>,
		description: (
			<p>
				<b>{bookName}</b> kitobi <b>{userName}</b>ga berildi
			</p>
		),
		duration: 1,
		placement: "top",
	});
};

function CreateRent() {
	const users = useSelector((state) => state.users.items);
	const stocks = useSelector((state) => state.stocks.items);
	const [form] = Form.useForm();

	const setDate = (d) => {
		const now = new Date().toISOString();
		const returnDate = new Date(
			new Date().getTime() + 1000 * 60 * 60 * 24 * d
		).toISOString();
		form.setFieldsValue({
			...form.getFieldsValue(),
			leasedAt: now,
			returningDate: returnDate,
		});
	};

	useEffect(() => {
		const handleShortCut = (e) => {
			if (e.ctrlKey && e.shiftKey && (e.key === "z" || e.key === "Z")) {
				document.getElementById("stockInputRef").focus();
			} else if (e.shiftKey && e.code.match(/Digit[1-5]/)) {
				const d = e.code.split("Digit")[1];
				setDate(days[Number(d) - 1]);
			}
		};

		document.addEventListener("keypress", handleShortCut);
		return () => {
			document.removeEventListener("keypress", handleShortCut);
		};
		// eslint-disable-next-line
	}, []);

	const onFinish = (values) => {
		localStorage.setItem("ld", values.leasedAt);
		localStorage.setItem("rd", values.returningDate);
		FetchResource.create("rents", values)
			.then((data) => {
				const book = stocks.find((s) => s.id === data.stockId).book;
				const user = users.find((u) => u.id === data.userId);
				openNotification(user.firstName + " " + user.lastName, book.name);
				printReciept({ user, book, rent: data });
				form.resetFields();
			})
			.catch((err) => {
				console.error(err);
				message.error(
					err.response?.data?.message ||
						err.response?.data?.errors.message ||
						err.message
				);
			});
	};

	return (
		<div>
			<h3 className="m-3">Ijara qo'shish</h3>
			<Form
				form={form}
				name="basic"
				layout="vertical"
				className="p-3"
				onFinish={onFinish}
				initialValues={{
					leasedAt: localStorage.getItem("ld"),
					returningDate: localStorage.getItem("rd"),
				}}
			>
				<Form.Item
					rules={[{ required: true }]}
					label={"Kitobxon"}
					name="userId"
				>
					<SelectFetch
						resource={resources.users}
						fetchable={true}
						column={"fullName"}
						render={(item) =>
							item &&
							`${item.firstName} ${item.lastName} - ${item.phone} - ${item.passportId}`
						}
					/>
				</Form.Item>
				<Form.Item
					name="stockId"
					rules={[{ required: true }]}
					label="Kitob zaxirasi"
				>
					<StockSelect
						resource={resources.stocks}
						fetchable={true}
						column="name"
					/>
				</Form.Item>
				<Row className="mb-3">
					{days.map((d) => (
						<Button key={d} onClick={() => setDate(d)} className="mr-2">
							{d} kun
						</Button>
					))}
				</Row>
				<Row gutter={8}>
					<Col span={12}>
						<Form.Item
							name="leasedAt"
							rules={[{ required: true }]}
							label="Topshirilgan sana"
						>
							<CustomDate
								saveStorage={(value) => {
									localStorage.setItem("ld", value.toISOString());
								}}
							/>
						</Form.Item>
					</Col>
					<Col span={12}>
						<Form.Item
							name="returningDate"
							rules={[{ required: true }]}
							label="Qaytarililishi kerak bo'lgan sana"
						>
							<CustomDate
								saveStorage={(value) => {
									localStorage.setItem("rd", value.toISOString());
								}}
							/>
						</Form.Item>
					</Col>
				</Row>
				<Form.Item>
					<Button htmlType="submit" type="primary">
						Saqlash
					</Button>
				</Form.Item>
			</Form>
		</div>
	);
}

export default CreateRent;
