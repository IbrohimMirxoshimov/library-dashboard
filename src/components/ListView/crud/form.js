import React from "react";
import { Form, Input, Button } from "antd";

export default function FormCrud({ values = {}, onFinish }) {
	return (
		<Form name="form-crud" initialValues={values} onFinish={onFinish}>
			<Form.Item
				name="firstName"
				extra="Ism"
				rules={[{ required: true, message: "Please fill!" }]}
			>
				<Input placeholder="Nomi" />
			</Form.Item>
			<Form.Item
				name="lastName"
				extra="Familiya"
				rules={[{ required: true, message: "Please fill!" }]}
			>
				<Input placeholder="Nomi" />
			</Form.Item>
			<Form.Item
				name="username"
				extra="Login (username)"
				rules={[{ required: true, message: "Please fill!" }]}
			>
				<Input placeholder="Login (username)" />
			</Form.Item>
			<Form.Item
				name="password"
				extra="Password"
				rules={[{ required: true, message: "Please fill!" }]}
			>
				<Input placeholder="password" />
			</Form.Item>
			<Form.Item
				name="phone"
				extra="Telefon raqamni shu xolatda kiriting: 991234567"
				rules={[{ required: false, message: "Please fill!" }]}
			>
				<Input prefix="+998" placeholder="Telefon raqam" />
			</Form.Item>

			<Form.Item>
				<Button type="primary" htmlType="submit">
					Saqlash
				</Button>
			</Form.Item>
		</Form>
	);
}
