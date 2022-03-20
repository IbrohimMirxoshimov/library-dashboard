import {
	Button,
	Col,
	Form,
	InputNumber,
	message,
	Modal,
	notification,
	Row,
} from "antd";
import { resources } from "api/resources";
import CustomDate from "components/forms/CustomDate";
import SelectFetch from "components/forms/SelectFetch";
import StockSelect from "components/forms/StockSelect";
import React, { Fragment, useEffect, useState } from "react";
import FetchResource from "api/crud";
import { useDispatch, useSelector } from "react-redux";
import printReciept from "utils/printReciept";
import {
	BookOutlined,
	CloseCircleOutlined,
	UserOutlined,
} from "@ant-design/icons";
import { FormDrawerMicro } from "components/FormDrawer";
import Rents from "api/routes/rents";
import {
	closeShift,
	newRent,
	newUser,
	openShift,
	returnedRent,
} from "redux/actions/ShiftActions";

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
	const [day, setDay] = useState(10);
	const shift = useSelector((state) => state.shift);
	const dispatch = useDispatch();

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
				setDate(days[Number(d) - 1]);
			}
		};
		setDate(10);

		document.addEventListener("keypress", handleShortCut);
		return () => {
			document.removeEventListener("keypress", handleShortCut);
		};
		// eslint-disable-next-line
	}, []);

	const onFinish = (values) => {
		FetchResource.create("rents", values)
			.then((data) => {
				dispatch(newRent());
				const book = stocks.find((s) => s.id === data.stockId).book;
				const user = users.find((u) => u.id === data.userId);
				openNotification(user.firstName + " " + user.lastName, book.name);
				printReciept({ user, book, rent: data });
				form.resetFields();
				setDate(10);
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
		<Row style={{ background: "#f8f8f8" }} className="p-3">
			<Col span={18}>
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
					>
						<SelectFetch
							placeholder={"Kitobxon ism, familiya yoki telefon raqam"}
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
							placeholder={"Kitob nomi"}
							resource={resources.stocks}
							fetchable={true}
							column="name"
						/>
					</Form.Item>
					<Row className="mb-3">
						{days.map((d) => (
							<Button
								type={d === day ? "primary" : "default"}
								key={d}
								onClick={() => setDate(d)}
								className="mr-2"
							>
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
						<Button className="big" htmlType="submit" type="primary">
							Saqlash
						</Button>
					</Form.Item>
				</Form>
			</Col>
			<RightTools />
		</Row>
	);
}

function LeaseRent({ incramentReturning }) {
	const [loading, setLoading] = useState(false);
	const [form] = Form.useForm();

	function onFinish(values) {
		if (values.rentId) {
			setLoading(true);
			Rents.return(values.rentId)
				.then((r) => {
					incramentReturning();
					message.success(values.rentId + " raqamili ijara bo'shatildi!");
					setLoading(false);
					form.resetFields();
				})
				.catch((err) => {
					console.error(err);
					message.error("Ijara bo'shatishda qandaydi muammo");
					setLoading(false);
				});
		}
	}

	return (
		<Fragment>
			<h3 className="ml-3">Bo'shatish</h3>
			<Form form={form} layout="vertical" className="p-3" onFinish={onFinish}>
				<Form.Item name={"rentId"} label={"Ijara raqami"}>
					<InputNumber style={{ width: "100%" }} />
				</Form.Item>
				<Form.Item>
					<Button
						className="big"
						disabled={loading}
						loading={loading}
						htmlType="submit"
						type="primary"
					>
						Bo'shatish
					</Button>
				</Form.Item>
			</Form>
		</Fragment>
	);
}

function CloseShift() {
	const [modal, setModal] = useState(false);
	const shift = useSelector((state) => state.shift);
	const dispatch = useDispatch();

	return (
		<Fragment>
			<Button
				className="my-1 big"
				icon={<CloseCircleOutlined />}
				// type="primary"
				ghost
				danger
				onClick={() => setModal(true)}
			>
				Yakunlash
			</Button>

			<Modal
				visible={modal}
				onCancel={() => setModal(false)}
				okText="Yakunlash"
				onOk={() => dispatch(closeShift())}
				cancelText="Orqaga"
				okButtonProps={{ danger: true }}
				title={<h2>Bugun bajarilgan amallar</h2>}
			>
				<h2>Qaytarilgan ijaralar: {shift.returned_rents}</h2>
				<h2>Yangi ijaralar: {shift.new_rents}</h2>
				<h2>Yangi kitobxonlar: {shift.new_users}</h2>
			</Modal>
		</Fragment>
	);
}

function RightTools() {
	const formsData = {
		stocks: {
			form: "stocks",
			resource: { endpoint: "stocks", nameOne: "Kitob" },
		},
		users: {
			form: "users",
			resource: { endpoint: "users", nameOne: "Kitobxon" },
		},
	};

	const [activeForm, setActiveForm] = useState();
	const dispatch = useDispatch();

	return (
		<Col span={6}>
			<LeaseRent incramentReturning={() => dispatch(returnedRent())} />
			{activeForm && (
				<FormDrawerMicro
					data={activeForm}
					messageId={1}
					onFormClose={(created) =>
						setTimeout(() => {
							if (activeForm.form === "users") dispatch(newUser());

							setActiveForm(undefined);
						}, 500)
					}
				/>
			)}
			<div className="p-3">
				<Button
					className="big"
					onClick={() => setActiveForm(formsData.users)}
					icon={<UserOutlined />}
					type="primary"
					ghost
				>
					Kitobxon qo'shish
				</Button>
				<Button
					className="my-1 big"
					onClick={() => setActiveForm(formsData.stocks)}
					icon={<BookOutlined />}
					type="primary"
					ghost
				>
					Kitob qo'shish
				</Button>
				<CloseShift />
			</div>
		</Col>
	);
}

export default CreateRent;
