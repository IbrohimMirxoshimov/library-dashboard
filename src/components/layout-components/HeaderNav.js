import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { Layout, Button } from "antd";
import {
	LogoutOutlined,
	MenuFoldOutlined,
	MenuUnfoldOutlined,
} from "@ant-design/icons";
import Logo from "./Logo";
import { toggleCollapsedNav, onMobileNavToggle } from "redux/actions/Theme";
import {
	NAV_TYPE_TOP,
	SIDE_NAV_COLLAPSED_WIDTH,
	SIDE_NAV_WIDTH,
} from "constants/ThemeConstant";
import utils from "utils";
import { signOut } from "redux/actions/Auth";
import { useHistory } from "react-router-dom";

const { Header } = Layout;

export const HeaderNav = (props) => {
	const {
		navCollapsed,
		mobileNav,
		navType,
		headerNavColor,
		toggleCollapsedNav,
		onMobileNavToggle,
		isMobile,
		currentTheme,
		signOut,
	} = props;
	const [, setSearchActive] = useState(false);
	const history = useHistory();
	const onSearchClose = () => {
		setSearchActive(false);
	};

	const onToggle = () => {
		if (!isMobile) {
			toggleCollapsedNav(!navCollapsed);
		} else {
			onMobileNavToggle(!mobileNav);
		}
	};

	const isNavTop = navType === NAV_TYPE_TOP ? true : false;
	const mode = () => {
		if (!headerNavColor) {
			return utils.getColorContrast(
				currentTheme === "dark" ? "#00000" : "#ffffff"
			);
		}
		return utils.getColorContrast(headerNavColor);
	};
	const navMode = mode();
	const getNavWidth = () => {
		if (isNavTop || isMobile) {
			return "0px";
		}
		if (navCollapsed) {
			return `${SIDE_NAV_COLLAPSED_WIDTH}px`;
		} else {
			return `${SIDE_NAV_WIDTH}px`;
		}
	};

	useEffect(() => {
		if (!isMobile) {
			onSearchClose();
		}
	});

	return (
		<Header
			className={`app-header ${navMode}`}
			style={{ backgroundColor: headerNavColor }}
		>
			<div className={`app-header-wrapper ${isNavTop ? "layout-top-nav" : ""}`}>
				<Logo logoType={navMode} />
				<div className="nav" style={{ width: `calc(100% - ${getNavWidth()})` }}>
					<div className="nav-left">
						<ul className="ant-menu ant-menu-root ant-menu-horizontal">
							{isNavTop && !isMobile ? null : (
								<li
									className="ant-menu-item ant-menu-item-only-child"
									onClick={() => {
										onToggle();
									}}
								>
									{navCollapsed || isMobile ? (
										<MenuUnfoldOutlined className="nav-icon" />
									) : (
										<MenuFoldOutlined className="nav-icon" />
									)}
								</li>
							)}
						</ul>
					</div>
					<div className="nav-right d-flex align-items-center">
						<Button
							icon={<LogoutOutlined className="mr-3" />}
							onClick={() => {
								signOut();
								history.push("/auth/login");
							}}
						>
							Chiqish
						</Button>
					</div>
				</div>
			</div>
		</Header>
	);
};

const mapStateToProps = ({ theme }) => {
	const {
		navCollapsed,
		navType,
		headerNavColor,
		mobileNav,
		currentTheme,
		direction,
	} = theme;
	return {
		navCollapsed,
		navType,
		headerNavColor,
		mobileNav,
		currentTheme,
		direction,
	};
};

export default connect(mapStateToProps, {
	toggleCollapsedNav,
	onMobileNavToggle,
	signOut,
})(HeaderNav);
