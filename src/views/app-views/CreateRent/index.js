import {
	Button,
	Col,
	Form,
	Input,
	InputNumber,
	message,
	Modal,
	notification,
	Radio,
	Row,
	Switch,
} from "antd";
import { resources } from "api/resources";
import CustomDate from "components/forms/CustomDate";
import SelectFetch from "components/forms/SelectFetch";
import StockSelect from "components/forms/StockSelect";
import React, { Fragment, useEffect, useState } from "react";
import FetchResource from "api/crud";
import { useDispatch, useSelector, useStore } from "react-redux";
import printReciept from "utils/printReciept";
import {
	BookOutlined,
	CloseCircleOutlined,
	UserOutlined,
} from "@ant-design/icons";
import Rents from "api/routes/rents";
import {
	closeShift,
	newRent,
	newUser,
	openShift,
	returnedRent,
} from "redux/actions/ShiftActions";
import { addNeeds, addNews } from "redux/actions/resource";
import Passport from "components/forms/Passport";
import { tl } from "i18n";
import PhoneNumber from "components/forms/PhoneNumber";
import { clearNullishKeysFromObject } from "utils/array";
import VerifyPhoneAPI from "api/VerifyPhoneAPI";
import Loading from "components/shared-components/Loading";

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

function showError(err, custom_message) {
	console.error(err);
	if (err.response?.data?.message === "Validation error")
		message.error("Bu seriyali foydalanuvchi allaqachon mavjud mavjud");
	else
		message.error(
			err.response?.data?.message ||
				err.response?.data?.errors.message ||
				custom_message ||
				err.message,
			10
		);
}

function CreateRent() {
	const [form] = Form.useForm();
	const [day, setDay] = useState(10);
	const shift = useSelector((state) => state.shift);
	const dispatch = useDispatch();
	const [choosenStock, setChoosenStock] = useState();
	const store = useStore();
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
				const users = store.getState().users.items;
				const stocks = store.getState().stocks.items;
				const book = stocks.find((s) => s.id === data.stockId).book;
				const user = users.find((u) => u.id === data.userId);
				openNotification(user.firstName + " " + user.lastName, book.name);
				printReciept({ user, book, rent: data });
				setChoosenStock(undefined);
				form.resetFields();
				setDate(10);
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
		<Row style={{ background: "#f8f8f8" }} className="p-3 c-rent">
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
					<Form.Item name="stockId" rules={[{ required: true }]} label="Kitob">
						<StockSelect
							placeholder={"Kitob nomi"}
							resource={resources.stocks}
							fetchable={true}
							column="name"
							onChangeItem={(stock) => {
								setDay(stock.book.rentDuration);
								setChoosenStock(stock);
							}}
						/>
					</Form.Item>
					<div className="mb-3">
						{days.map(
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
						<Button className="big" htmlType="submit" type="primary">
							Saqlash
						</Button>
					</Form.Item>
				</Form>
			</Col>
			<RightTools form={form} />
		</Row>
	);
}

function LeaseRent({ incramentReturning }) {
	const [loading, setLoading] = useState(false);
	const [form] = Form.useForm();
	const [modal, setModal] = useState({ open: false, rent: {} });
	const store = useStore();

	async function onCheck() {
		try {
			const values = form.getFieldsValue();
			if (values.id || values.customId || values.stockId) {
				setLoading(true);

				const rent = await Rents.getList({
					filters: clearNullishKeysFromObject({ ...values, returnedAt: 0 }),
				});

				await addNeeds(resources.users, [rent.userId]);
				rent.user = store
					.getState()
					.users.items.find((user) => user.id === rent.userId);

				setModal({ open: true, rent });
				setLoading(false);
			}
		} catch (error) {
			showError(error);
			setLoading(false);
		}
	}

	function onFinish() {
		function success(id) {
			if (modal.open) {
				setModal({ open: false });
			}
			incramentReturning();
			message.success(id + " raqamli ijara bo'shatildi!");
			setLoading(false);
			form.resetFields();
		}

		function error(err) {
			showError(err, "Ijara bo'shatishda qandaydir muammo");
			setLoading(false);
		}

		setLoading(true);
		Rents.return(modal.rent.id)
			.then((r) => success(modal.rent.id))
			.catch(error);
	}

	return (
		<Fragment>
			<h3 className="ml-3">Bo'shatish</h3>
			<Form
				id="rent-form"
				form={form}
				layout="vertical"
				className="p-3"
				onFinish={onFinish}
			>
				<Form.Item name={"id"} label={"Yangi kvitansiya"}>
					<InputNumber style={{ width: "100%" }} />
				</Form.Item>
				<div className="d-flex">
					<Form.Item name={"customId"} label={"Eski kv"}>
						<InputNumber style={{ width: "100%" }} />
					</Form.Item>
					<Form.Item name={"stockId"} label={"Kitob bilan"}>
						<InputNumber style={{ width: "100%" }} />
					</Form.Item>
				</div>
				<Form.Item>
					<Button
						className="big"
						disabled={loading}
						loading={loading}
						onClick={onCheck}
						// htmlType="submit"
						type="primary"
					>
						Bo'shatish
					</Button>
				</Form.Item>
			</Form>
			{modal.open && (
				<CheckModal
					rent={modal.rent}
					loading={loading}
					close={() => setModal({ open: false })}
				/>
			)}
		</Fragment>
	);
}

function CheckModal({ rent, loading, close }) {
	const book = useSelector(
		(state) =>
			rent.stock &&
			state.books.items.find((book) => book.id === rent.stock.bookId)
	);

	useEffect(() => {
		if (!book) {
			addNeeds(resources.books, [rent.stock.bookId]);
		}
		// eslint-disable-next-line
	}, []);

	return (
		<Modal
			title="Tekshiramiz"
			visible={true}
			onCancel={close}
			className="rent-check-modal"
			footer={
				<Button
					className="big"
					disabled={loading}
					loading={loading}
					htmlType="submit"
					type="primary"
					form={"rent-form"}
				>
					Bo'shatish
				</Button>
			}
		>
			{rent.customId ? (
				<h1>
					Eski kvitansiya raqami: <span>{rent.customId}</span>
				</h1>
			) : (
				<h1>
					Kvitansiya raqami: <span>{rent.id}</span>
				</h1>
			)}
			<h1>
				Kitob raqami: <span>{rent.stockId}</span>
			</h1>
			<h1>
				Kitob: <span>{book?.name}</span>
			</h1>
			<h1>
				Kitobxon:{" "}
				<span>
					{rent?.user?.firstName} {rent?.user?.lastName}
				</span>
			</h1>
		</Modal>
	);
}

function CloseShift() {
	const [modal, setModal] = useState(false);
	const shift = useSelector((state) => state.shift);
	const dispatch = useDispatch();

	return (
		<Fragment>
			<Button
				className="big"
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

function RightTools({ form }) {
	const formsData = {
		stocks: "stocks",
		users: "users",
	};
	const [activeForm, setActiveForm] = useState();
	const dispatch = useDispatch();

	const onUserFormClose = (user) => {
		if (user) {
			dispatch(newUser());
			dispatch(addNews(resources.users, [user]));
			form.setFieldsValue({ userId: user.id });
		}

		setActiveForm(undefined);
	};

	return (
		<Col span={6}>
			<LeaseRent incramentReturning={() => dispatch(returnedRent())} />
			{activeForm === formsData.users && (
				<UserForm onFormClose={onUserFormClose} />
			)}
			{activeForm === formsData.stocks && (
				<StockForm
					onFormClose={(stock) => {
						setActiveForm(undefined);

						if (stock) {
							message.success(stock.id + " - yangi kitob raqami", 10);
						}
					}}
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
const rules = {
	required: [{ required: true }],
};
function UserForm({ onFormClose }) {
	const [loading, setLoading] = useState(false);
	const [verifyPhone, setVerifyPhone] = useState({
		verifing: false,
		verify: true,
	});

	function setVerifing(verifing) {
		setVerifyPhone({
			verifing: verifing,
			verify: true,
		});
	}

	function onSubmit(values) {
		// if (verifyPhone) {
		// 	setVerifing(true);
		// } else {
		// }
		onFinish(values);
	}

	const [form] = Form.useForm();
	function onFinish(values) {
		setLoading(true);
		FetchResource.create(resources.users, values)
			.then((user) => {
				setLoading(false);
				onFormClose(user);
				message.success("Foydalanuvchi qo'shildi");
			})
			.catch((err) => {
				setLoading(false);
				showError(err);
			});
	}

	return (
		<Fragment>
			{verifyPhone.verify && verifyPhone.verifing && (
				<VerifyPhone
					phone={form.getFieldValue("phone")}
					setCodeFinish={(code) => {
						if (code) {
							onFinish({ code: code, ...form.getFieldsValue() });
						}

						setVerifing(false);
					}}
				/>
			)}
			<Modal
				width={700}
				closeIcon={" "}
				title={"Kitobxon qo'shish"}
				visible={true}
				footer={
					<div className="d-flex justify-content-between">
						<Button className="big" danger onClick={() => onFormClose()}>
							Orqaga
						</Button>
						<Button
							className="big"
							disabled={loading}
							loading={loading}
							htmlType="submit"
							type="primary"
							form={"user-form"}
						>
							Saqlash
						</Button>
					</div>
				}
			>
				<Form
					form={form}
					className="c-rent"
					id="user-form"
					onFinish={onSubmit}
					layout="vertical"
				>
					<Row gutter={8}>
						<Col span={12}>
							<Form.Item
								label={tl("firstName")}
								name="firstName"
								rules={rules.required}
							>
								<Input />
							</Form.Item>
						</Col>
						<Col span={12}>
							<Form.Item
								label={tl("lastName")}
								name="lastName"
								rules={rules.required}
							>
								<Input />
							</Form.Item>
						</Col>

						<Col span={12}>
							<Form.Item
								label={tl("phone")}
								name="phone"
								rules={rules.required}
							>
								<PhoneNumber />
							</Form.Item>
						</Col>
						<Col span={12}>
							<Form.Item
								label={tl("extraPhone")}
								name="extraPhone"
								rules={rules.required}
							>
								<PhoneNumber />
							</Form.Item>
						</Col>
						<Col span={12}>
							<Form.Item
								label={tl("passportId")}
								name="passportId"
								rules={rules.required}
							>
								<Passport />
							</Form.Item>
						</Col>
						<Col span={8}>
							<Form.Item
								label={tl("gender")}
								name="gender"
								rules={rules.required}
							>
								<Radio.Group
									options={[
										{
											label: "Erkak",
											value: "male",
										},
										{
											label: "Ayol",
											value: "female",
										},
									]}
									optionType={"button"}
								/>
							</Form.Item>
						</Col>
						<Col span={4}>
							<Form.Item label={tl("verifyPhone")}>
								<Switch
									checked={verifyPhone.verify}
									onChange={(s) => setVerifyPhone((p) => ({ ...p, verify: s }))}
								/>
							</Form.Item>
						</Col>
					</Row>
				</Form>
			</Modal>
		</Fragment>
	);
}

function VerifyPhone({ phone, setCodeFinish }) {
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		VerifyPhoneAPI(phone)
			.then((r) => {
				setLoading(false);
			})
			.catch(showError);

		// eslint-disable-next-line
	}, []);

	return (
		<Modal
			okButtonProps={{ htmlType: "submit", form: "verify-phone" }}
			visible={true}
			destroyOnClose
			onCancel={() => setCodeFinish(0)}
		>
			<h3>Tasdiqlash kodi {phone} ga yuborildi.</h3>
			{loading ? (
				<Loading />
			) : (
				<Form
					className="c-rent"
					id="verify-phone"
					style={{ fontSize: "30px !important" }}
					layout="vertical"
					onFinish={({ code }) => {
						setCodeFinish(code);
					}}
				>
					<Form.Item
						rules={[{ required: true }]}
						label={"Kodni kriting"}
						name="code"
					>
						<InputNumber style={{ width: "100%" }} />
					</Form.Item>
				</Form>
			)}
		</Modal>
	);
}

function StockForm({ onFormClose }) {
	const [loading, setLoading] = useState(false);

	function onFinish(values) {
		setLoading(true);
		FetchResource.create(resources.stocks, values)
			.then((stock) => {
				setLoading(false);
				onFormClose(stock);
			})
			.catch((err) => {
				setLoading(false);
				showError(err);
			});
	}
	return (
		<Modal
			width={700}
			closeIcon={" "}
			title={"Kitobxon qo'shish"}
			visible={true}
			footer={
				<div className="d-flex justify-content-between">
					<Button danger className="big" onClick={() => onFormClose()}>
						Orqaga
					</Button>
					<Button
						className="big"
						disabled={loading}
						loading={loading}
						htmlType="submit"
						type="primary"
						form={"stock-form"}
					>
						Saqlash
					</Button>
				</div>
			}
		>
			<Form id="stock-form" onFinish={onFinish} layout="vertical">
				<Form.Item label={tl("book")} name="bookId" rules={rules.required}>
					<SelectFetch {...{ resource: resources.books, fetchable: true }} />
				</Form.Item>
			</Form>
		</Modal>
	);
}

export default CreateRent;
