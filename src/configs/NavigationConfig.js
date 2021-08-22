import { APP_PREFIX_PATH } from "configs/AppConfig";

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
		{
			key: "users",
			path: `${APP_PREFIX_PATH}/users`,
			title: "Foydalanuvchilar",
			icon: "EnvironmentOutlined",
			role: roles.librarian,
			submenu: [],
		},
		{
			key: "stocks",
			path: `${APP_PREFIX_PATH}/stocks`,
			title: "Zaxira",
			icon: "EnvironmentOutlined",
			role: roles.librarian,
			submenu: [],
		},
		{
			key: "rents",
			path: `${APP_PREFIX_PATH}/rents`,
			title: "Ijara",
			icon: "EnvironmentOutlined",
			role: roles.librarian,
			submenu: [],
		},
		{
			key: "collections",
			path: `${APP_PREFIX_PATH}/collections`,
			title: "Kolleksiya",
			icon: "EnvironmentOutlined",
			role: roles.moderator,
			submenu: [],
		},
		{
			key: "books",
			path: `${APP_PREFIX_PATH}/books`,
			title: "Kitoblar",
			icon: "EnvironmentOutlined",
			role: roles.moderator,
			submenu: [],
		},
		{
			key: "booksgroups",
			path: `${APP_PREFIX_PATH}/booksgroups`,
			title: "To'plamlar",
			icon: "EnvironmentOutlined",
			role: roles.moderator,
			submenu: [],
		},
		{
			key: "authors",
			path: `${APP_PREFIX_PATH}/authors`,
			title: "Yozuvchilar",
			icon: "EnvironmentOutlined",
			role: roles.moderator,
			submenu: [],
		},
		{
			key: "locations",
			path: `${APP_PREFIX_PATH}/locations`,
			title: "Kutubxonalar",
			icon: "EnvironmentOutlined",
			role: roles.moderator,
			submenu: [],
		},
		{
			key: "publishings",
			path: `${APP_PREFIX_PATH}/publishings`,
			title: "Nashriyotlar",
			icon: "EnvironmentOutlined",
			role: roles.moderator,
			submenu: [],
		},
		{
			key: "regions",
			path: `${APP_PREFIX_PATH}/regions`,
			title: "Hududlar",
			icon: "EnvironmentOutlined",
			role: roles.moderator,
			submenu: [],
		},
	],
};

export const permissions = {
	READ_SEARCH_PANEL: "READ_SEARCH_PANEL",
};

export function generateNavigationConfig(roles) {
	console.log("roles", roles);

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
