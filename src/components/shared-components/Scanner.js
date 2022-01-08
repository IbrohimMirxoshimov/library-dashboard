import Quagga from "quagga";
import React, { useEffect } from "react";

const Scanner = ({ onScan, setOpen }) => {
	useEffect(() => {
		Quagga.init(
			{
				inputStream: {
					type: "LiveStream",
					constraints: {
						width: 450,
						height: 300,
						facingMode: "environment", // or user
					},
					target: document.querySelector("#barcode-scanner"),
				},
				locator: {
					patchSize: "medium",
					halfSample: true,
				},
				numOfWorkers: 4,
				decoder: {
					readers: ["code_128_reader"],
				},
				locate: true,
			},
			function (err) {
				if (err) {
					return console.log(err);
				}
				Quagga.start();
				console.log("Scan started...");
			}
		);
		Quagga.onDetected(function (result) {
			Quagga.stop();
			alert(result.codeResult.code);
			onScan(result.codeResult.code);
			setOpen(false);
		});
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);
	return (
		<div id="interactive" style={{ height: "350px" }} className="viewport" />
	);
};

export default Scanner;
