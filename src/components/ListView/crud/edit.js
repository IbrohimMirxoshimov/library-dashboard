import { Card, message } from "antd";
import Title from "antd/lib/typography/Title";
import Flex from "components/shared-components/Flex";
import Loading from "components/shared-components/Loading";
import React, { useEffect, useState } from "react";
import { api, singleName } from "./config";
import FormCrud from "./form";
import { useHistory } from "react-router-dom";
import { endPointName } from "./config";

export default function Edit({ match }) {
	const id = match.params.id;
	const [loading, setLoading] = useState(true);
	const [item, setItem] = useState({});
	const history = useHistory();
	const onFinish = (values) => {
		setLoading(true);
		api
			.update(id, values)
			.then(() => {
				setItem({ ...item, ...values });
				setLoading(false);
				message.success("Muvoffaqiyatli amalga oshirildi");
				history.push(`/app/${endPointName}`);
			})
			.catch((err) => {
				setLoading(false);
				message.error(err.message);
			});
	};

	useEffect(() => {
		api
			.getOne(id)
			.then((item) => {
				setItem(item);
				setLoading(false);
			})
			.catch((err) => {
				message.error(err.message);
			});
	}, [id]);

	if (loading) return <Loading />;

	return (
		<Card>
			<Title level={3} style={{ marginBottom: "15px" }}>
				{singleName + " "} o'zgartirish
			</Title>
			<Flex alignItems="center" mobileFlex={false}>
				<FormCrud values={item} onFinish={onFinish} />
			</Flex>
		</Card>
	);
}
