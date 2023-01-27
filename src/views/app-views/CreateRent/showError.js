import { message } from "antd";

export function showError(err, custom_message) {
	console.error(err);
	if (err.response?.data?.message === "Validation error")
		message.error("Bu seriyali foydalanuvchi allaqachon mavjud mavjud");
	else
		message.error(
			err.response?.data?.message ||
				err.response?.data?.errors.message ||
				custom_message ||
				err.message,
			10
		);
}
