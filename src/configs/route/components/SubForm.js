import { useState } from "react";
import { Button } from "antd";
import { FormDrawerMicro } from "components/FormDrawer";

export default function SubForm({ data }) {
	const [open, setOpen] = useState(0);
	return (
		<div>
			<FormDrawerMicro data={data} messageId={open} />
			<Button onClick={() => setOpen((p) => p + 1)}>
				Foydalanuvchi +
			</Button>
		</div>
	);
}
