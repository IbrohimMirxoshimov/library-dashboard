import { APP_PREFIX_PATH } from "configs/AppConfig";
import { tl } from "i18n";
import { isMobile } from "utils/isMobile";

export const roles = {
	moderator: "moderator",
	owner: "owner",
	librarian: "librarian",
};

const dashBoardNavTree = {
	key: "home",
	path: `${APP_PREFIX_PATH}/`,
	title: "Dashboard",
	icon: "SearchOutlined",
	breadcrumb: false,
	submenu: [
		!isMobile() && {
			key: "create_rent",
			path: `${APP_PREFIX_PATH}/create-rent`,
			title: "Ijara qo'shish",
			icon: "PlusCircleOutlined",
			role: roles.librarian,
			submenu: [],
			other: true,
		},
		{
			key: "rents",
			path: `${APP_PREFIX_PATH}/rents`,
			title: "Ijaralar",
			icon: "FileDoneOutlined",
			role: roles.librarian,
			submenu: [],
		},
		{
			key: "users",
			path: `${APP_PREFIX_PATH}/users`,
			title: "Kitobxonlar",
			icon: "UserOutlined",
			role: roles.librarian,
			submenu: [],
		},
		{
			key: "stocks",
			path: `${APP_PREFIX_PATH}/stocks`,
			title: tl("stocks"),
			icon: "BookOutlined",
			role: roles.librarian,
			submenu: [],
		},

		{
			key: "books",
			path: `${APP_PREFIX_PATH}/books`,
			title: "Kitoblar",
			icon: "BookOutlined",
			role: roles.moderator,
			submenu: [],
		},
		{
			key: "booksgroups",
			path: `${APP_PREFIX_PATH}/booksgroups`,
			title: "To'plamlar",
			icon: "ContainerOutlined",
			role: roles.moderator,
			submenu: [],
		},
		{
			key: "authors",
			path: `${APP_PREFIX_PATH}/authors`,
			title: "Yozuvchilar",
			icon: "EditOutlined",
			role: roles.moderator,
			submenu: [],
		},
		{
			key: "collections",
			path: `${APP_PREFIX_PATH}/collections`,
			title: "Kolleksiya",
			icon: "FolderOpenOutlined",
			role: roles.moderator,
			submenu: [],
		},
		{
			key: "sms",
			path: `${APP_PREFIX_PATH}/sms`,
			title: "Sms",
			icon: "EnvironmentOutlined",
			role: roles.librarian,
			submenu: [],
		},
		{
			key: "locations",
			path: `${APP_PREFIX_PATH}/locations`,
			title: "Kutubxonalar",
			icon: "BankOutlined",
			role: roles.owner,
			submenu: [],
		},
		{
			key: "publishings",
			path: `${APP_PREFIX_PATH}/publishings`,
			title: "Nashriyotlar",
			icon: "PrinterOutlined",
			role: roles.moderator,
			submenu: [],
		},
		{
			key: "regions",
			path: `${APP_PREFIX_PATH}/regions`,
			title: "Hududlar",
			icon: "EnvironmentOutlined",
			role: roles.owner,
			submenu: [],
		},
		{
			key: "towns",
			path: `${APP_PREFIX_PATH}/towns`,
			title: "Tumanlar",
			icon: "EnvironmentOutlined",
			role: roles.owner,
			submenu: [],
		},
	].filter(Boolean),
};

export const permissions = {
	READ_SEARCH_PANEL: "READ_SEARCH_PANEL",
};

export function generateNavigationConfig(roles) {
	if (roles.owner) return [dashBoardNavTree];

	return [
		{
			...dashBoardNavTree,
			submenu: dashBoardNavTree.submenu.filter((menu) => roles[menu.role]),
		},
	];
}

const navigationConfig = [dashBoardNavTree];

export default navigationConfig;
