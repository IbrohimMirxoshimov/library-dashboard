import React, { useState } from "react";
import { Image, Upload, message } from "antd";
import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";
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

function beforeUpload(file) {
	if (!file.type.startsWith("image/")) {
		message.error("Faqat rasm yuklash mumkin");
		return Upload.LIST_IGNORE;
	}
	if (file.size > MAX_SIZE) {
		message.error("Rasm hajmi 10 MB dan oshmasligi kerak");
		return Upload.LIST_IGNORE;
	}
	return true;
}

// Value is the image URL. Square picture card: upload, preview, remove.
function ImageUpload({ value, onChange, disabled }) {
	const [loading, setLoading] = useState(false);
	const [previewOpen, setPreviewOpen] = useState(false);

	const fileList = value
		? [{ uid: "-1", name: "image.jpg", status: "done", url: value }]
		: [];

	function customRequest({ file, onSuccess, onError }) {
		setLoading(true);
		uploadImage(file)
			.then((url) => {
				onSuccess(url);
				onChange && onChange(url);
			})
			.catch((err) => {
				onError(err);
				message.error(err.response?.data?.message || err.message);
			})
			.finally(() => setLoading(false));
	}

	return (
		<>
			<Upload
				listType="picture-card"
				accept="image/*"
				maxCount={1}
				disabled={disabled}
				fileList={fileList}
				beforeUpload={beforeUpload}
				customRequest={customRequest}
				// "" (not null): nullish keys are stripped before update, backend stores "" as null
				onRemove={() => onChange && onChange("")}
				onPreview={() => setPreviewOpen(true)}
			>
				{!value && (
					<div>
						{loading ? <LoadingOutlined /> : <PlusOutlined />}
						<div style={{ marginTop: 8 }}>Rasm yuklash</div>
					</div>
				)}
			</Upload>
			{value && (
				<Image
					src={value}
					style={{ display: "none" }}
					preview={{
						visible: previewOpen,
						onVisibleChange: setPreviewOpen,
					}}
				/>
			)}
		</>
	);
}

export default ImageUpload;
