import React, { useState } from "react";
import { Form, Input, Button, message } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import checkAuth from "api/auth";
import { useDispatch } from "react-redux";
import { authenticated } from "redux/actions/Auth";
import { generateNavigationConfig } from "configs/NavigationConfig";

const LoginForm = ({ history }) => {
	const [loading, setLoading] = useState(false);
	const dispatch = useDispatch();
	const onFinish = (values) => {
		setLoading(true);
		checkAuth(values)
			.then(({ token, user }) => {
				const navigationConfig = generateNavigationConfig({
					moderator: user.moderator,
					owner: user.owner,
					librarian: user.librarian,
				});
				dispatch(
					authenticated(token, {
						...user,
						navigationConfig: navigationConfig,
					})
				);
				message.success("Muvoffaqiyatli amalga oshirildi!");
				history.push("/app");
			})
			.catch((err) => {
				message.error("Xatolik");
				setLoading(false);
			});
	};

	return (
		<Form
			name="normal_login"
			className="login-form"
			initialValues={{ remember: true }}
			onFinish={onFinish}
		>
			<Form.Item
				name="username"
				rules={[{ required: true, message: "Please input your Username!" }]}
			>
				<Input
					prefix={<UserOutlined className="site-form-item-icon" />}
					placeholder="Username"
				/>
			</Form.Item>
			<Form.Item
				name="password"
				rules={[{ required: true, message: "Please input your Password!" }]}
			>
				<Input
					prefix={<LockOutlined className="site-form-item-icon" />}
					type="password"
					placeholder="Password"
				/>
			</Form.Item>

			<Form.Item>
				<Button
					loading={loading}
					type="primary"
					htmlType="submit"
					className="login-form-button"
				>
					Kirish
				</Button>
			</Form.Item>
		</Form>
	);
};

export default LoginForm;
