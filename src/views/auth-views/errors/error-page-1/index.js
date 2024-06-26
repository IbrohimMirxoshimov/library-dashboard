import React from "react";
import { Button, Row, Col } from "antd";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";

const ErrorOne = () => {
	const theme = "light";
	return (
		<div className={`h-100 ${theme === "light" ? "bg-white" : ""}`}>
			<div className="container-fluid d-flex flex-column justify-content-between h-100 px-md-4 pb-md-4 pt-md-1">
				<div>
					<img
						className="img-fluid"
						src={`/img/${theme === "light" ? "logo.png" : "logo-white.png"}`}
						alt=""
					/>
				</div>
				<div className="container">
					<Row align="middle">
						<Col xs={24} sm={24} md={8}>
							<h1 className="font-weight-bold mb-4 display-4">
								Sahifa topilmadi
							</h1>
							<p className="font-size-md mb-4">
								Sizni adashganingizni payqadik, tashvishlanmang, biz sizga
								to'g'ri yo'lni topishda yordam beramiz.
							</p>
							<Link to="/app">
								<Button type="primary" icon={<ArrowLeftOutlined />}>
									Orqaga
								</Button>
							</Link>
						</Col>
						<Col xs={24} sm={24} md={{ span: 14, offset: 2 }}>
							<img
								className="img-fluid mt-md-0 mt-4"
								src="/img/others/img-20.png"
								alt=""
							/>
						</Col>
					</Row>
				</div>
			</div>
		</div>
	);
};

export default ErrorOne;
