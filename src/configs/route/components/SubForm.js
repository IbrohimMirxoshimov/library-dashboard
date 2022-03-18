import { useState } from "react";
import { Button } from "antd";
import { FormDrawerMicro } from "components/FormDrawer";

export default function SubForm({ data, buttonText }) {
	const [open, setOpen] = useState(0);
	return (
		<div>
			<FormDrawerMicro data={data} messageId={open} />
			<Button onClick={() => setOpen((p) => p + 1)}>{buttonText}</Button>
		</div>
	);
}
