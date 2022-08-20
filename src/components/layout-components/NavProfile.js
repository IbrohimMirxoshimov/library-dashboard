import React from "react";
import { Menu, Dropdown, Avatar, message } from "antd";
import {
	LogoutOutlined, CopyOutlined
} from '@ant-design/icons';
import { useHistory } from "react-router-dom";

export const NavProfile = ({ signOut, user, token }) => {
	const history = useHistory()
	const profileMenu = (
		<div className="nav-profile nav-dropdown">
			<div className="nav-profile-header">
				<div className="d-flex">
					<Avatar size={45}>{user.firstName?.[0] || "U"}</Avatar>
					<div className="pl-3">
						<h4 className="mb-0">{user.firstName} {user.lastName}</h4>
						<span className="text-muted">Kutubxonachi</span>
					</div>
				</div>
			</div>
			<div className="nav-profile-body">
				<Menu>
					<Menu.Item onClick={() => {
						signOut();
						history.push("/auth/login");
					}}>
						<span>
							<LogoutOutlined className="mr-3" />
							<span className="font-weight-normal">Chiqish</span>
						</span>
					</Menu.Item>
					<Menu.Item onClick={() => {
						window.navigator.clipboard.writeText(token)
						message.success("Token ko'chirildi")
					}}>
						<span>
							<CopyOutlined className="mr-3" />
							<span className="font-weight-normal">Token olish</span>
						</span>
					</Menu.Item>
				</Menu>
			</div>
		</div>
	);
	return (
		<Dropdown placement="bottomRight" overlay={profileMenu} trigger={["click"]}>
			<Menu className="d-flex align-item-center" mode="horizontal">
				<Menu.Item>
					<Avatar style={{
						color: '#3e79f7',
						backgroundColor: '#3e79f72e',
					}} size={45}>{user.firstName?.[0] || "U"}</Avatar>
				</Menu.Item>
			</Menu>
		</Dropdown>
	);
}

export default NavProfile
