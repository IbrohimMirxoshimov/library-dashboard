import React from "react";
import { Link, withRouter } from "react-router-dom";
import Icon from "../util-components/Icon";
import { generateNavigationConfig } from "configs/NavigationConfig";
import { useSelector } from "react-redux";

export const MobileNav = ({ location }) => {
	const user = useSelector((state) => state.auth.user);

	if (location.pathname === "/app/create-rent") {
		return "";
	}

	return (
		<div className="nav_bottom_menu">
			{generateNavigationConfig(user)[0]
				.submenu.slice(0, 4)
				.map((menu) => (
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
