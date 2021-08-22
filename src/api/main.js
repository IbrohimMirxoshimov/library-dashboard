import axios from "axios";
import { getTOKEN } from "redux/reducers/Auth";
import { signOutDirectly } from "redux/store";
import { isDevelopment } from "utils/methods";
export const mainUrl = () =>
	isDevelopment() ? "http://localhost:3201" : "http://bk.softly.uz";

export default function mainCaller(path, method, data, headers) {
	const _headers = {
		Accept: "application/json",
		Authorization: "Bearer " + getTOKEN(),
		...headers,
	};

	const options = {
		method,
		url: mainUrl() + "/api" + path,
	};

	if (data) {
		_headers["Content-type"] = "application/json";
		options.data = JSON.stringify(data);
	}

	options.headers = _headers;

	return axios(options)
		.then((r) => r.data)
		.catch((err) => {
			if (err.response.status === 403) {
				signOutDirectly();
				return {};
			}
			// if (err.response.status === 404) {
			// 	createBrowserHistory().push("/404");
			// 	window.location.reload();
			// 	return {};
			// }
			throw err;
		});
}
