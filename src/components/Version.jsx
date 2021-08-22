// import { mainUrl } from "api/main";
// import axios from "axios";
import React from "react";

// let versions = {};

// const getVersions = () => {
// 	axios
// 		.get(mainUrl() + "/versions")
// 		.then((r) => {
// 			versions = r.data;
// 		})
// 		.catch((err) => {});
// };
// getVersions();

export default function Version() {
	return (
		<div
			style={{
				position: "absolute",
				bottom: "0px",
				left: "24px",
				fontSize: "small",
			}}
		>
			<p>
				Dashboard: 0.1.0
				<br />
				Core: 0.1.0
			</p>
		</div>
	);
}
