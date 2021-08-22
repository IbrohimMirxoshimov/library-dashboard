export function isDevelopment() {
	return process.env.NODE_ENV === "development";
}

export function isDevBuild() {
	return process.env.REACT_APP_DEV === "1";
}

export function getCreditials() {
	let parseToken = document.cookie.match(/token=(\S+)/);

	return isDevelopment()
		? {
				subdomain: localStorage.getItem("dev_subdomain"),
				token: localStorage.getItem("dev_token"),
		  }
		: {
				subdomain: window.location.host.split(".")[0],
				token: parseToken && parseToken[1],
		  };
}
