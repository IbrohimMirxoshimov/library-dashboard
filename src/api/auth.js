import axios from "axios";
import { mainUrl } from "./main";

export default function checkAuth({ username, password }) {
	return axios({
		method: "POST",
		url: mainUrl() + "/auth/signin",
		data: {
			username: username,
			password: password,
		},
		headers: { "Content-type": "application/json" },
	}).then((r) => r.data);
}
