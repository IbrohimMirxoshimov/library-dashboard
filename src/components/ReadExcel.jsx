import React, { useState } from "react";
import { Input, message } from "antd";
import readXlsxFile from "read-excel-file";
import Loading from "./shared-components/Loading";

import {
	getDefaultColumn,
	getDefaultRow,
	setDefaultColumn,
	setDefaultRow,
} from "utils/storageManager";

const path = require("path");
const acceptedFiles = [".xlsx", ".xls"];
function ReadExcel({ onRead }) {
	const [loading, setLoading] = useState(false);
	const onChange = (e) => {
		let [file] = e.target.files;

		if (!file) return onRead([]);

		if (!acceptedFiles.includes(path.extname(file.name)))
			return message.error("Fayl turi xato. Faqat Excel fayl yuklang");

		setLoading(true);

		readXlsxFile(file, {})
			.then((rows) => {
				onRead(rows);
				setLoading(false);
				// console.log(rows);
			})
			.catch((err) => {
				setLoading(false);
				console.error(err);
				message.error("Excel yuklashda xatolik\n" + err?.message);
			});
	};
	return (
		<div>
			<div className="d-flex mb-2">
				<Input
					className="mr-2"
					placeholder="Ustun: A, B, C"
					defaultValue={getDefaultColumn()}
					onChange={(e) => setDefaultColumn(e.target.value)}
				/>
				<Input
					type="number"
					placeholder="Qator: 1, 2, 3"
					onChange={(e) => setDefaultRow(e.target.value)}
					defaultValue={getDefaultRow()}
				/>
			</div>
			<div className="d-flex">
				<Input
					maxLength={1}
					accept="xls, xlsx"
					size="small"
					type="file"
					onChange={onChange}
				/>
				{loading && <Loading cover="inline" />}
			</div>
		</div>
	);
}

export default ReadExcel;
