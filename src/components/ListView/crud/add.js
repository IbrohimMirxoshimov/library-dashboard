import { Card, message } from "antd";
import Title from "antd/lib/typography/Title";
import Flex from "components/shared-components/Flex";
import Loading from "components/shared-components/Loading";
import React, { useState } from "react";
import FormCrud from "./form";
import { useHistory } from "react-router-dom";
import { api, endPointName, singleName } from "./config";
import { randomString } from "utils/string";

export default function Add() {
	const history = useHistory();
	const [loading, setLoading] = useState(false);

	const onFinish = (values) => {
		setLoading(true);
		api
			.create(values)
			.then(() => {
				message.success("Muvoffaqiyatli amalga oshirildi");

				history.push(`/app/${endPointName}`);
			})
			.catch((err) => {
				setLoading(true);
				message.error(err.message);
			});
	};

	if (loading) return <Loading />;

	return (
		<Card>
			<Title level={3} style={{ marginBottom: "15px" }}>
				{singleName + " "} qo'shish
			</Title>
			<Flex alignItems="center" mobileFlex={false}>
				<FormCrud values={{ password: randomString() }} onFinish={onFinish} />
			</Flex>
		</Card>
	);
}
