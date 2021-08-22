// import React from "react";
// import { Form, Input, DatePicker, Button, Row, Col } from "antd";
// import moment from "moment";

// function CustomDate({ onChange, value }) {
// 	return (
// 		<DatePicker
// 			defaultValue={moment(value)}
// 			onChange={(value) => {
// 				onChange(value.toISOString());
// 			}}
// 			format="DD.MM.YY"
// 		/>
// 	);
// }

// function FormTest2() {
// 	return (
// 		<Row gutter={10}>
// 			{[1, 2, 3, 4, 5].map((v, i) => {
// 				return (
// 					<Col xs={8}>
// 						<Form.Item key={i}>
// 							<Input />
// 						</Form.Item>
// 					</Col>
// 				);
// 			})}
// 		</Row>
// 	);
// }
// function FormTest() {
// 	function onFinish(v) {
// 		console.log(v);
// 	}
// 	return (
// 		<Row>
// 			<Form
// 				onFinish={onFinish}
// 				initialValues={{ a: "2021-03-08T09:36:36.491Z" }}
// 			>
// 				<Form.Item
// 					initialValue={"2021-03-10T09:36:36.491Z"}
// 					name="a"
// 					label="Time"
// 				>
// 					<CustomDate />
// 				</Form.Item>
// 				<Form.Item>
// 					<Button htmlType="submit">Sub</Button>
// 				</Form.Item>
// 			</Form>
// 		</Row>
// 	);
// }

function NotFound() {
	// return <ErrorOne />;
	return "404";
}

export default NotFound;
