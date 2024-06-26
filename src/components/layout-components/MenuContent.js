import React from "react";
import { Link } from "react-router-dom";
import { Menu, Grid } from "antd";
import Icon from "../util-components/Icon";
import { connect } from "react-redux";
import { SIDE_NAV_LIGHT, NAV_TYPE_SIDE } from "constants/ThemeConstant";
import utils from "utils";
import { onMobileNavToggle } from "my-redux/actions/Theme";
import { generateNavigationConfig } from "configs/NavigationConfig";
// import Version from "components/Version";

const { SubMenu } = Menu;
const { useBreakpoint } = Grid;

const setLocale = (isLocaleOn, localeKey) => localeKey.toString();

const setDefaultOpen = (key) => {
	let keyList = [];
	let keyString = "";
	if (key) {
		const arr = key.split("-");
		for (let index = 0; index < arr.length; index++) {
			const elm = arr[index];
			index === 0 ? (keyString = elm) : (keyString = `${keyString}-${elm}`);
			keyList.push(keyString);
		}
	}
	return keyList;
};

const SideNavContent = (props) => {
	const {
		sideNavTheme,
		routeInfo,
		hideGroupTitle,
		localization,
		onMobileNavToggle,
		user,
	} = props;
	const isMobile = !utils.getBreakPoint(useBreakpoint()).includes("lg");
	const closeMobileNav = () => {
		if (isMobile) {
			onMobileNavToggle(false);
		}
	};
	return (
		<Menu
			theme={sideNavTheme === SIDE_NAV_LIGHT ? "light" : "dark"}
			mode="inline"
			style={{ height: "100%", borderRight: 0 }}
			defaultSelectedKeys={[routeInfo?.key]}
			defaultOpenKeys={setDefaultOpen(routeInfo?.key)}
			className={hideGroupTitle ? "hide-group-title" : ""}
		>
			{generateNavigationConfig(user).map((menu) =>
				menu.submenu.length > 0 ? (
					<Menu.ItemGroup
						key={menu.key}
						title={setLocale(localization, menu.title)}
					>
						{menu.submenu.map((subMenuFirst) =>
							subMenuFirst.submenu.length > 0 ? (
								<SubMenu
									icon={
										subMenuFirst.icon ? (
											<Icon type={subMenuFirst?.icon} />
										) : null
									}
									key={subMenuFirst.key}
									title={
										<Link to={subMenuFirst.path}>
											{setLocale(localization, subMenuFirst.title)}
										</Link>
									}
								>
									{subMenuFirst.submenu.map((subMenuSecond) => (
										<Menu.Item key={subMenuSecond.key}>
											{subMenuSecond.icon ? (
												<Icon type={subMenuSecond?.icon} />
											) : null}
											<span>
												{setLocale(localization, subMenuSecond.title)}
											</span>
											<Link
												onClick={() => closeMobileNav()}
												to={subMenuSecond.path}
											/>
										</Menu.Item>
									))}
								</SubMenu>
							) : (
								<Menu.Item key={subMenuFirst.key}>
									{subMenuFirst.icon ? <Icon type={subMenuFirst.icon} /> : null}
									<span>{setLocale(localization, subMenuFirst.title)}</span>
									<Link
										onClick={() => closeMobileNav()}
										to={subMenuFirst.path}
									/>
								</Menu.Item>
							)
						)}
					</Menu.ItemGroup>
				) : (
					<Menu.Item key={menu.key}>
						{menu.icon ? <Icon type={menu?.icon} /> : null}
						<span>{setLocale(localization, menu?.title)}</span>
						{menu.path ? (
							<Link onClick={() => closeMobileNav()} to={menu.path} />
						) : null}
					</Menu.Item>
				)
			)}
			{/* <Version /> */}
		</Menu>
	);
};

const TopNavContent = () => {
	return <div>TopNavContent</div>;
};

const MenuContent = (props) => {
	return props.type === NAV_TYPE_SIDE ? (
		<SideNavContent {...props} />
	) : (
		<TopNavContent {...props} />
	);
};

const mapStateToProps = ({ theme, auth }) => {
	const { sideNavTheme, topNavColor } = theme;
	return { sideNavTheme, topNavColor, user: auth.user };
};

export default connect(mapStateToProps, { onMobileNavToggle })(MenuContent);
