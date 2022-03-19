import React from "react";
import { Layout } from "antd";
import { connect } from "react-redux";
import {
	SIDE_NAV_WIDTH,
	SIDE_NAV_DARK,
	NAV_TYPE_SIDE,
} from "constants/ThemeConstant";
import MenuContent from "./MenuContent";

const { Sider } = Layout;

export const SideNav = ({
	navCollapsed,
	sideNavTheme,
	routeInfo,
	hideGroupTitle,
	localization = true,
}) => {
	const props = { sideNavTheme, routeInfo, hideGroupTitle, localization };
	return (
		<Sider
			className={`side-nav ${
				sideNavTheme === SIDE_NAV_DARK ? "side-nav-dark" : ""
			}`}
			width={SIDE_NAV_WIDTH}
			collapsed={navCollapsed}
		>
			<MenuContent type={NAV_TYPE_SIDE} {...props} />
		</Sider>
	);
};

const mapStateToProps = ({ theme }) => {
	const { navCollapsed, sideNavTheme } = theme;
	return { navCollapsed, sideNavTheme };
};

export default connect(mapStateToProps)(SideNav);
