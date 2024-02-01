import axios from "axios";
import { getTOKEN } from "my-redux/reducers/Auth";
import { signOutDirectly } from "my-redux/store";
export const mainUrl = () =>
	localStorage.getItem("_mainUrl") ||
	process.env.REACT_APP_API_URL ||
	"https://library.softly.uz";

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
			if (!err.response && err.message === "Network Error") {
				err.message =
					"Internet bilan bog'liq muammo. Internetni tekshiring yoki dasturchiga bog'laning";
			} else if (err.response.status === 401) {
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
