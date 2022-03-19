import { Button, Col, Form, notification, Row } from "antd";
import { resources } from "api/resources";
import CustomDate from "components/forms/CustomDate";
import SelectFetch from "components/forms/SelectFetch";
import StockSelect from "components/forms/StockSelect";
import React, { useEffect, useRef } from "react";
import FetchResource from "api/crud";
import { useSelector } from "react-redux";

const days = [5, 10, 15, 20, 30];

const openNotification = (userName, bookName) => {
	notification.success({
		message: <h3>Ijaraga berildi</h3>,
		description: (
			<p>
				<b>{bookName}</b> kitobi <b>{userName}</b>ga berildi
			</p>
		),
		onClick: () => {
			console.log("Notification Clicked!");
		},
		placement: "top",
	});
};

function CreateRent() {
	const users = useSelector((state) => state.users.items);
	const books = useSelector((state) => state.books.items);
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
				console.log(5);
				const d = e.code.split("Digit")[1];
				setDate(days[Number(d) - 1]);
			}
		};

		document.addEventListener("keypress", handleShortCut);
		return () => {
			document.removeEventListener("keypress", handleShortCut);
		};
	}, []);

	const onFinish = (values) => {
		FetchResource.create("rents", values).then((data) => {
			const bookId = stocks.find((s) => s.id === data.stockId).bookId;
			const book = books.find((b) => b.id === bookId);
			const user = users.find((u) => u.id === data.userId);
			openNotification(user.firstName + " " + user.lastName, book.name);
			printRent({ user, book, data });
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
			>
				<Form.Item required label={"Kitobxon"} name="userId">
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
				<Form.Item name="stockId" required label="Kitob zaxirasi">
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
						<Form.Item name="leasedAt" required label="Topshirilgan sana">
							<CustomDate
								saveStorage={(value) => {
									localStorage.setItem("ld", value.toISOString());
								}}
								getDefaultValue={() => localStorage.getItem("ld")}
							/>
						</Form.Item>
					</Col>
					<Col span={12}>
						<Form.Item
							name="returningDate"
							required
							label="Qaytarililishi kerak bo'lgan sana"
						>
							<CustomDate
								saveStorage={(value) => {
									localStorage.setItem("rd", value.toISOString());
								}}
								getDefaultValue={() => localStorage.getItem("rd")}
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
