import React from "react";
import { Drawer } from "antd";
import { connect } from "react-redux";
import { NAV_TYPE_SIDE } from "constants/ThemeConstant";
import MenuContent from "./MenuContent";
import { onMobileNavToggle } from "my-redux/actions/Theme";
import Logo from "./Logo";
import Flex from "components/shared-components/Flex";
import { ArrowLeftOutlined } from "@ant-design/icons";

export const MobileNav = ({
	sideNavTheme,
	mobileNav,
	onMobileNavToggle,
	routeInfo,
	hideGroupTitle,
	localization = true,
}) => {
	const props = { sideNavTheme, routeInfo, hideGroupTitle, localization };

	const onClose = () => {
		onMobileNavToggle(false);
	};

	return (
		<Drawer
			placement="left"
			closable={false}
			onClose={onClose}
			open={mobileNav}
			bodyStyle={{ padding: 5 }}
		>
			<Flex flexDirection="column" className="h-100">
				<Flex justifyContent="between" alignItems="center">
					<Logo mobileLogo={true} />
					<div className="nav-close" onClick={() => onClose()}>
						<ArrowLeftOutlined />
					</div>
				</Flex>
				<div className="mobile-nav-menu">
					<MenuContent type={NAV_TYPE_SIDE} {...props} />
				</div>
			</Flex>
		</Drawer>
	);
};

const mapStateToProps = ({ theme }) => {
	const { navCollapsed, sideNavTheme, mobileNav } = theme;
	return { navCollapsed, sideNavTheme, mobileNav };
};

export default connect(mapStateToProps, { onMobileNavToggle })(MobileNav);
