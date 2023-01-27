export function openOnce(url, target = "NewWindow") {
	// open a blank "target" window
	// or get the reference to the existing "target" window
	const winref = window.open("", target, "");
	const newUrl = new URL(url);

	// if the "target" window was just opened, change its url
	if (
		winref.location.href === "about:blank" ||
		(winref.location.href !== newUrl.href &&
			winref.location.pathname === newUrl.pathname &&
			winref.location.origin === newUrl.origin)
	) {
		winref.location.href = url;
	}
	return winref;
}
