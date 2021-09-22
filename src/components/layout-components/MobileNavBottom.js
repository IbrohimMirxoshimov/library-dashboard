import React from "react";
import { Link } from "react-router-dom";
import Icon from "../util-components/Icon";
import navigationConfig from "configs/NavigationConfig";

const setLocale = (isLocaleOn, localeKey) => localeKey.toString();

export const MobileNav = ({ localization = true }) => {
  return (
    <div className="nav_bottom_menu">
      {navigationConfig[0].submenu.slice(0, 3).map((menu) => (
        <Link to={menu.path} className="menu-item" key={menu.key}>
          {menu.icon ? <Icon type={menu?.icon} /> : null}
          <span>{setLocale(localization, menu.title)}</span>
        </Link>
      ))}
    </div>
  );
};

export default MobileNav;
