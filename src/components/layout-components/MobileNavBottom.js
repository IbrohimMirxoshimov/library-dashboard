import React from "react";
import { Link, withRouter } from "react-router-dom";
import Icon from "../util-components/Icon";
import navigationConfig from "configs/NavigationConfig";

export const MobileNav = ({ location }) => {
	if (location.pathname === "/app/create-rent") {
		return "";
	}

	return (
		<div className="nav_bottom_menu">
			{navigationConfig[0].submenu.slice(0, 4).map((menu) => (
				<Link
					to={menu.path}
					className={
						"menu-item" + (location.pathname === menu.path ? " active" : "")
					}
					key={menu.key}
				>
					{menu.icon ? <Icon type={menu?.icon} /> : null}
					<span>{menu.title}</span>
				</Link>
			))}
		</div>
	);
};

export default withRouter(MobileNav);
