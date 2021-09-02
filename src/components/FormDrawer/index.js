import React, { useState, useEffect } from "react";
import { Button, Drawer, message, Form, Row, Col } from "antd";
import useMessage from "hooks/useMessage";
import FetchResource from "api/crud";
import { unstable_batchedUpdates } from "react-dom";
import pagesConfig from "configs/route/pagesConfig";
import { useSelector } from "react-redux";
import FieldComponents from "components/forms/FieldComponents";
import { useForm } from "antd/lib/form/Form";

function getInitilaFormData(config, record = {}) {
	if (config?.formInitial) {
		return { ...config?.formInitial, ...record };
	}

	return record;
}

function generateFields(fields, user, data) {
	return fields
		.filter((field) => !field.role || user[field.role])
		.map((field, i) => {
			let Component = FieldComponents[field.field || "input"];
			return (
				<Col span={field.colSpan || 12} key={i}>
					<Form.Item
						key={field.name + (data?.id || "f")}
						name={!field.sub && field.name}
						valuePropName={field.propName || "value"}
						label={field.name}
						hidden={!data.edit && field.hidden}
						rules={field.rules}
					>
						{field.sub ? (
							generateFields(field.sub, user, data)
						) : (
							<Component
								key={field.name + (data?.id || "f")}
								disabled={field.disabledOnEdit && data.id ? true : false}
								{...field.fieldProp}
							/>
						)}
					</Form.Item>
				</Col>
			);
		});
}

function FormDrawer() {
	const user = useSelector((state) => state.auth.user);

	const [visible, setVisible] = useState(false);
	const { messageId, data = {} } = useMessage("f_d");
	const [loading, setLoading] = useState(false);
	const endpoint = data.form;
	const [form] = useForm();

	useEffect(() => {
		if (messageId && !visible) {
			setVisible(true);
			form.setFieldsValue(data.record || {});
		}
		// eslint-disable-next-line
	}, [messageId]);

	function onClose() {
		unstable_batchedUpdates(() => {
			setVisible(false);
			form.resetFields();
		});
	}

	function fetch(values) {
		if (data.record?.id) {
			return FetchResource.update(endpoint, data.record.id, values);
		}

		return FetchResource.create(endpoint, values);
	}

	function onFinish(values) {
		console.log(values);
		fetch(values)
			.then((res) => {
				message.success("Success");
				unstable_batchedUpdates(() => {
					setLoading(false);
					setVisible(false);
				});
				form.resetFields();
			})
			.catch((err) => {
				setLoading(false);
				message.error(
					err.response?.data?.message ||
						err.response?.data?.errors.message ||
						err.message
				);
			});
	}

	if (!data.form) {
		return "";
	}

	let config = pagesConfig[data.form];
	// console.log("data", data);
	let Custom = config.view?.Custom;

	return (
		<div>
			<Drawer
				title={endpoint}
				placement="right"
				onClose={onClose}
				visible={visible}
				footer={
					<div
						style={{
							textAlign: "right",
						}}
					>
						<Button onClick={onClose} style={{ marginRight: 8 }}>
							Bekor qilish
						</Button>
						<Button
							loading={loading}
							htmlType="submit"
							form="myform"
							type="primary"
						>
							Saqlash
						</Button>
					</div>
				}
			>
				<Form
					form={form}
					key={data?.id || "f"}
					layout="vertical"
					initialValues={getInitilaFormData(config, data.record)}
					id="myform"
					onFinish={onFinish}
				>
					<Row gutter={6}>{generateFields(config.form, user, data)}</Row>
				</Form>
				{Custom && <Custom {...data} />}
			</Drawer>
		</div>
	);
}

export default FormDrawer;
