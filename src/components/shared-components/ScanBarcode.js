import { Button, Modal } from "antd";
import React, { useState } from "react";
import Scanner from "./Scanner";
function ScanBarcode({ onScan }) {
	const [open, setOpen] = useState(false);
	return (
		<div>
			{open && (
				<Modal
					onCancel={() => setOpen(false)}
					footer={<></>}
					open={open}
					title={"Barcode scanner"}
				>
					<Scanner setOpen={setOpen} onScan={onScan} />
				</Modal>
			)}
			<Button
				onClick={() => {
					setOpen((prev) => !prev);
					// scanBarcode();
				}}
				type="primary"
			>
				Barcode
			</Button>
		</div>
	);
}

export default ScanBarcode;
