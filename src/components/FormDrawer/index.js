import React, { useState, useEffect } from "react";
import { Button, Drawer, message, Form, Row, Col } from "antd";
import useMessage from "hooks/useMessage";
import FetchResource from "api/crud";
import pagesConfig from "configs/route/pagesConfig";
import { useSelector } from "react-redux";
import FieldComponents from "components/forms/FieldComponents";
import { useForm } from "antd/lib/form/Form";
import DeleteButton from "components/forms/DeleteButton";
import { isEmptyObject } from "utils/array";

function getInitilaFormData(config, record = {}) {
	if (config?.formInitial) {
		return { ...config?.formInitial, ...record };
	}

	return record;
}

function generateFields(fields, user, data, form) {
	return fields
		.filter((field) => !field.role || user[field.role])
		.map((field, i) => {
			let Component = field.Component;
			let FieldComponent =
				field.fieldComponent || FieldComponents[field.field || "input"];

			if (Component) {
				return (
					<Col xs={24} xl={field.colSpan || 12} key={i}>
						<Component form={form} user={user} data={data} />
					</Col>
				);
			}

			return (
				<Col xs={24} xl={field.colSpan || 12} key={i}>
					<Form.Item
						key={field.name + (data?.id || "f")}
						name={!field.sub && field.name}
						valuePropName={field.propName || "value"}
						label={field.label || field.name}
						hidden={!data.edit && field.hidden}
						rules={field.rules}
					>
						{field.sub ? (
							generateFields(field.sub, user, data, form)
						) : (
							<FieldComponent
								key={field.name + (data?.id || "f")}
								disabled={
									field.disabledOnEdit && data.id ? true : user[field.role]
								}
								{...field.fieldProp}
							/>
						)}
					</Form.Item>
				</Col>
			);
		});
}

function FormDrawer() {
	const { messageId, data = {} } = useMessage("f_d");

	return <FormDrawerMicro messageId={messageId} data={data} />;
}

export function FormDrawerMicro({ messageId, data, onFormClose }) {
	const user = useSelector((state) => state.auth.user);

	const [visible, setVisible] = useState(false);
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

	function onClose(response) {
		setVisible(false);
		form.resetFields();
		onFormClose && onFormClose(response);
	}

	function fetch(values) {
		if (data.record?.id) {
			return FetchResource.update(endpoint, data.record.id, values);
		}

		return FetchResource.create(endpoint, values);
	}

	function onFinish(values) {
		setLoading(true);
		if (isEmptyObject(values.address)) {
			values.address = undefined;
		}
		fetch(values)
			.then((res) => {
				message.success("Success");
				setLoading(false);
				onClose(res);
				window.refreshList && window.refreshList();
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

	useEffect(() => {
		function hotKeys(e) {
			if (e.shiftKey && e.key === "S") {
				form.submit();
			}
		}

		if (visible) {
			window.addEventListener("keyup", hotKeys);
		}

		return () => {
			window.removeEventListener("keyup", hotKeys);
		};
		// eslint-disable-next-line
	}, [visible]);

	if (!data.form) {
		return "";
	}

	let config = pagesConfig[data.form];
	// console.log("data", data);
	let Custom = config.view?.Custom;
	// console.log(config.view);
	return (
		<div>
			<Drawer
				key={messageId}
				title={resource.nameOne}
				placement="right"
				onClose={onClose}
				visible={visible}
				footer={
					<div
						key={messageId}
						className="d-flex justify-content-between overflow-auto"
					>
						<Button
							disabled={loading}
							onClick={onClose}
							style={{ marginRight: 8 }}
						>
							Orqaga
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
						{config.footer && config.footer(data, form)}
						<Button
							loading={loading}
							disabled={loading}
							htmlType="submit"
							form={"mf-" + endpoint}
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
					id={"mf-" + endpoint}
					onFinish={onFinish}
				>
					<Row gutter={6}>{generateFields(config.form, user, data, form)}</Row>
				</Form>
				{data.id && Custom && (
					<Custom {...data} onClose={onClose} form={form} user={user} />
				)}
			</Drawer>
		</div>
	);
}

export default FormDrawer;
