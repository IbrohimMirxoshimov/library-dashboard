import React, { useState, useEffect } from "react";
import { Button, Drawer, message, Form, Row, Col } from "antd";
import useMessage from "hooks/useMessage";
import FetchResource from "api/crud";
import { unstable_batchedUpdates } from "react-dom";
import pagesConfig from "configs/route/pagesConfig";
import { useSelector } from "react-redux";
import FieldComponents from "components/forms/FieldComponents";
import { useForm } from "antd/lib/form/Form";
import DeleteButton from "components/forms/DeleteButton";

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
						label={field.label || field.name}
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
	const resource = data.resource;
	const [form] = useForm();

	useEffect(() => {
		if (messageId && !visible) {
			setVisible(true);
			form.setFieldsValue(data.record || {});
		}
		// eslint-disable-next-line
	}, [messageId]);

	function onClose() {
		setVisible(false);
		form.resetFields();
	}

	function fetch(values) {
		if (data.record?.id) {
			return FetchResource.update(endpoint, data.record.id, values);
		}

		return FetchResource.create(endpoint, values);
	}

	function onFinish(values) {
		setLoading(true);
		fetch(values)
			.then((res) => {
				message.success("Success");
				unstable_batchedUpdates(() => {
					setLoading(false);
					onClose();
				});
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
	console.log(config.view);
	return (
		<div>
			<Drawer
				key={messageId}
				title={resource.nameOne}
				placement="right"
				onClose={onClose}
				visible={visible}
				footer={
					<div key={messageId} className="d-flex justify-content-between">
						<Button
							disabled={loading}
							onClick={onClose}
							style={{ marginRight: 8 }}
						>
							Bekor qilish
						</Button>
						{data.id &&
						config.view?.canDelete &&
						config.view.canDelete(data.record) ? (
							<DeleteButton
								{...data}
								onClose={onClose}
								setLoading={setLoading}
								loading={loading}
							/>
						) : (
							""
						)}
						<Button
							loading={loading}
							disabled={loading}
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
					// key={data?.id || "f"}
					layout="vertical"
					initialValues={getInitilaFormData(config, data.record)}
					id="myform"
					onFinish={onFinish}
				>
					<Row gutter={6}>{generateFields(config.form, user, data)}</Row>
				</Form>
				{data.id && Custom && (
					<Custom {...data} onClose={onClose} user={user} />
				)}
			</Drawer>
		</div>
	);
}

export default FormDrawer;
