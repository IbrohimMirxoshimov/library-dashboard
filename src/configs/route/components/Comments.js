import { Button, Form, Input, message } from "antd";
import { useForm } from "antd/lib/form/Form";
import FetchResource from "api/crud";
import React, { useEffect, useState } from "react";

function Comments({ resourceId, resourceFilterName }) {
	const [comments, setComments] = useState([]);
	const [loading, setLoading] = useState(true);
	const [form] = useForm();
	useEffect(() => {
		resourceId &&
			FetchResource.getList("comments", {
				filters: {
					[resourceFilterName]: resourceId,
				},
				order: "ASC",
			})
				.then((r) => {
					setComments(r.items);
					setLoading(false);
				})
				.catch((e) => {
					setLoading(false);
					message.error("Xatolik");
				});
	}, [resourceId, resourceFilterName]);
	return (
		<div>
			<h3>Izohlar</h3>
			{comments.length
				? comments.map((c) => (
						<p>
							{c.id}. {c.text} : {" "}
							{new Date(c.createdAt).toLocaleDateString("ru")}
						</p>
				  ))
				: "-"}
			<Form
				autoComplete="false"
				key="cccc"
				layout="vertical"
				id="comment"
				form={form}
				onFinish={(v) => {
					v.text &&
						FetchResource.create("comments", {
							text: v.text,
							[resourceFilterName]: resourceId,
						})
							.then((r) => {
								setComments((prev) => [...prev, r]);
								form.resetFields();
							})
							.catch((err) => {
								message.error("Xatolik");
							});
				}}
			>
				<Form.Item name="text" label="Izoh qoldiring">
					<Input.TextArea disabled={loading} />
				</Form.Item>
				<Form.Item>
					<Button
						disabled={loading}
						loading={loading}
						type="default"
						// form="comment"
						onClick={() => {
							form.submit();
						}}
					>
						Komment qoldirish
					</Button>
				</Form.Item>
			</Form>
		</div>
	);
}

export default Comments;
