import { Button, Col, Form, Row, Tag } from "antd";
import { resources } from "api/resources";
import CustomDate from "components/forms/CustomDate";
import StockSelect from "components/forms/StockSelect";
import React, { useEffect, useState } from "react";
import FetchResource from "api/crud";
import { useDispatch, useSelector, useStore } from "react-redux";
import printReciept from "utils/printReciept";
import { newRent, openShift } from "my-redux/actions/ShiftActions";
import { showError } from "./showError";
import {
	openNotification,
	SelectUserAndUserHistory,
	RightTools,
} from "./create-rent.utils";
import Popconfirm from "antd/es/popconfirm";
import { getResourcesByIds } from "my-redux/actions/resource";

const RENT_DAYS = [5, 10, 15, 20, 30];

function CreateRent() {
	const [form] = Form.useForm();
	const [day, setDay] = useState(10);
	const shift = useSelector((state) => state.shift);
	const dispatch = useDispatch();
	const [choosenStock, setChoosenStock] = useState();
	const store = useStore();
	const [latestUsersId, setLatestUsersId] = useState([]);

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
		setDay(d);
	};

	useEffect(() => {
		const handleShortCut = (e) => {
			if (e.ctrlKey && e.shiftKey && (e.key === "z" || e.key === "Z")) {
				document.getElementById("stockInputRef").focus();
			} else if (e.shiftKey && e.code.match(/Digit[1-5]/)) {
				const d = e.code.split("Digit")[1];
				setDate(RENT_DAYS[Number(d) - 1]);
			}
		};
		setDate(10);

		document.addEventListener("keypress", handleShortCut);
		return () => {
			document.removeEventListener("keypress", handleShortCut);
		};
		// eslint-disable-next-line
	}, []);

	function addLatestChoosenUser(user_id) {
		setLatestUsersId((ids) =>
			[user_id, ...ids.filter((id) => id !== user_id)].slice(0, 5)
		);
	}

	const onFinish = (values) => {
		FetchResource.create("rents", values)
			.then((data) => {
				dispatch(newRent());
				const users = store.getState().users.items;
				const stocks = store.getState().stocks.items;
				const book = stocks.find((s) => s.id === data.stockId).book;
				const user = users.find((u) => u.id === data.userId);
				openNotification(user.firstName + " " + user.lastName, book.name);
				printReciept({ user, book, rent: data });
				setChoosenStock(undefined);
				form.resetFields();
				setDate(10);
				addLatestChoosenUser(values.userId);
			})
			.catch(showError);
	};
	if (!shift.openedAt) {
		return (
			<div
				className="d-flex align-items-center justify-content-center"
				style={{ height: "90vh" }}
			>
				<Button
					className="big"
					style={{ width: "40%" }}
					htmlType="submit"
					type="primary"
					onClick={() => dispatch(openShift())}
				>
					Boshlash
				</Button>
			</div>
		);
	}

	return (
		<Row
			style={{ background: "#f8f8f8" }}
			className="p-3 c-rent color-bordered"
		>
			<Col md={24} lg={18}>
				<h3 className="ml-3">Ijara qo'shish</h3>
				<Form
					form={form}
					name="basic"
					layout="vertical"
					className="p-3"
					onFinish={onFinish}
				>
					<Form.Item
						rules={[{ required: true }]}
						label={"Kitobxon"}
						name="userId"
						className="mb-1"
					>
						<SelectUserAndUserHistory />
					</Form.Item>

					<div className="mb-3 mt-2">
						{getResourcesByIds(resources.users, latestUsersId).map((user) => {
							return (
								<Tag
									onClick={() => {
										form.setFieldsValue({ userId: user.id });
									}}
									style={{ fontSize: 18 }}
									color="blue"
									className="cursor-pointer"
									key={user.id}
								>
									{user.firstName} {user.lastName}
								</Tag>
							);
						})}
					</div>

					<Form.Item name="stockId" rules={[{ required: true }]} label="Kitob">
						<StockSelect
							placeholder={"Kitob nomi"}
							resource={resources.stocks}
							fetchable={true}
							column="name"
							onChangeItem={(stock) => {
								setDate(stock.book.rentDuration);
								setChoosenStock(stock);
							}}
						/>
					</Form.Item>
					<div className="mb-3">
						{RENT_DAYS.map(
							(d) =>
								(!choosenStock || choosenStock.book.rentDuration > d) && (
									<Button
										type={d === day ? "primary" : "default"}
										key={d}
										onClick={() => setDate(d)}
										className="mr-2"
										style={{ height: 50, fontSize: 20 }}
									>
										{d} kun
									</Button>
								)
						)}
						{choosenStock && (
							<Button
								type={
									day >= choosenStock.book.rentDuration ? "primary" : "default"
								}
								onClick={() => setDate(choosenStock.book.rentDuration)}
								className="mr-2"
								danger
								style={{ height: 50, fontSize: 20 }}
								disabled={!choosenStock}
							>
								{choosenStock.book.rentDuration} kun
							</Button>
						)}
					</div>
					<Row gutter={8} className="mt-4">
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
								label="Qaytarilishi kerak bo'lgan sana"
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
						<Popconfirm
							title={<h2>Kitobxon va kitob to'g'rimi?</h2>}
							okText="Ha"
							okButtonProps={{
								size: "large",
							}}
							cancelButtonProps={{
								size: "large",
								danger: true,
							}}
							cancelText="Yo'q"
							onConfirm={(e) => {
								form.submit();
							}}
						>
							<Button className="big" htmlType="submit" type="primary">
								Saqlash
							</Button>
						</Popconfirm>
					</Form.Item>
				</Form>
			</Col>
			<Col md={24} lg={6}>
				<RightTools
					form={form}
					onSelectUser={(user_id) => {
						addLatestChoosenUser(user_id);
					}}
				/>
			</Col>
		</Row>
	);
}

export default CreateRent;
