const { message } = require("antd");

export default function copyText(fieldId) {
	document.getElementById(fieldId)?.select();
	if (document.execCommand("copy")) {
		message.success("Ko'chirildi");
	} else {
		message.error("Xatolik");
	}
}
