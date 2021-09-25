import { debounce } from "./debounce";

function cacheClear() {
	let i = 0;

	window.addEventListener("keypress", (e) => {
		if (e.key === "+") {
			i++;
			debounce(
				() => {
					if (i === 3) {
						localStorage.clear();
						window.location.reload();
						// console.log("cache cleared");
					} else {
						i = 0;
					}
				},
				"clearcashe",
				300
			);
		}
	});
}

export default cacheClear;
