import React, { Component } from "react";
import { SettingOutlined } from "@ant-design/icons";
import { Drawer, Menu } from "antd";
// import ThemeConfigurator from './ThemeConfigurator';
import { connect } from "react-redux";
import { DIR_RTL } from "constants/ThemeConstant";

export class NavPanel extends Component {
	state = { visible: false };

	showDrawer = () => {
		this.setState({
			visible: true,
		});
	};

	onClose = () => {
		this.setState({
			visible: false,
		});
	};

	render() {
		return (
			<>
				<Menu mode="horizontal">
					<Menu.Item onClick={this.showDrawer}>
						<SettingOutlined className="nav-icon mr-0" />
					</Menu.Item>
				</Menu>
				<Drawer
					title="Theme Config"
					placement={this.props.direction === DIR_RTL ? "left" : "right"}
					width={350}
					onClose={this.onClose}
					open={this.state.visible}
				>
					{/* <ThemeConfigurator/> */}
				</Drawer>
			</>
		);
	}
}

const mapStateToProps = ({ theme }) => {
	const { locale } = theme;
	return { locale };
};

export default connect(mapStateToProps)(NavPanel);
