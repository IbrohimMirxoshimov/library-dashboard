import { Card } from "antd";
import React from "react";
import { useSelector } from "react-redux";

export default function Dashboard() {
	const user = useSelector((state) => state.auth.user);
	return (
		<Card>
			<h1>Xush kelibsiz {user.firstName + " " + (user.lastName || "")}🥳</h1>
		</Card>
	);
}
