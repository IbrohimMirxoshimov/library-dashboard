import React, { useRef, useState } from "react";
import { Button, Input, message } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import axios from "axios";
import { getTOKEN } from "my-redux/reducers/Auth";
import { mainUrl } from "api/main";

const MAX_SIZE = 10 * 1024 * 1024;

function uploadImage(file) {
	return axios
		.post(mainUrl() + "/api/files/image", file, {
			headers: {
				Authorization: "Bearer " + getTOKEN(),
				"Content-Type": file.type,
			},
		})
		.then((r) => r.data.url);
}

// Value is the image URL: either typed in or returned by the upload.
function ImageUpload({ value, onChange, disabled }) {
	const [loading, setLoading] = useState(false);
	const inputRef = useRef();

	function onFileSelected(e) {
		const file = e.target.files[0];
		e.target.value = "";
		if (!file) return;

		if (!file.type.startsWith("image/")) {
			return message.error("Faqat rasm yuklash mumkin");
		}
		if (file.size > MAX_SIZE) {
			return message.error("Rasm hajmi 10 MB dan oshmasligi kerak");
		}

		setLoading(true);
		uploadImage(file)
			.then((url) => {
				onChange && onChange(url);
				message.success("Rasm yuklandi");
			})
			.catch((err) => {
				message.error(err.response?.data?.message || err.message);
			})
			.finally(() => setLoading(false));
	}

	return (
		<div>
			<div className="d-flex">
				<Input
					value={value}
					disabled={disabled}
					allowClear
					placeholder="https://..."
					onChange={(e) => onChange && onChange(e.target.value)}
				/>
				<Button
					className="ml-1"
					icon={<UploadOutlined />}
					loading={loading}
					disabled={disabled}
					onClick={() => inputRef.current.click()}
				>
					Rasm yuklash
				</Button>
				<input
					ref={inputRef}
					type="file"
					accept="image/*"
					style={{ display: "none" }}
					onChange={onFileSelected}
				/>
			</div>
			{value && (
				<a href={value} target="_blank" rel="noreferrer">
					<img
						src={value}
						alt=""
						className="mt-2"
						style={{ maxHeight: 160, maxWidth: "100%", borderRadius: 4 }}
					/>
				</a>
			)}
		</div>
	);
}

export default ImageUpload;
