/**
 * Opens a new window with the receipt content and triggers the print dialog.
 *
 * @param {Object} data - The data to be included in the receipt.
 * @param {Object} data.user - The user information.
 * @param {number} data.user.locationId - The location ID of the user.
 * @param {string} data.user.firstName - The first name of the user.
 * @param {string} data.user.lastName - The last name of the user.
 * @param {Object} data.book - The book information.
 * @param {string} data.book.name - The name of the book.
 * @param {Object} data.rent - The rent information.
 * @param {number} data.rent.id - The ID of the rent.
 * @param {Date} data.rent.leasedAt - The date when the book was leased.
 * @param {Date} data.rent.returningDate - The date when the book should be returned.
 * @param {number} data.rent.userId - The ID of the user who rented the book.
 * @param {number} data.rent.stockId - The stock ID of the rented book.
 */
export default function printReciept(data) {
	const winUrl = URL.createObjectURL(
		new Blob([getRecieptContent(data)], { type: "text/html" })
	);

	const win = window.open(
		winUrl,
		"win",
		`width=800,height=400,screenX=200,screenY=200`
	);

	setTimeout(() => {
		win.print();
		// console.log("PRINF ");
		setTimeout(() => win.close(), 2000);
	}, 100);
}

function getRentIdForBarcode(id) {
	let zeros = "0";
	let id_str = String(id);
	return "R" + zeros.repeat(9 - id_str.length) + id_str;
}

function getRecieptContent({ user, book, rent }) {
	// boshqa kutubxonada chiqayotgan bo'lsa
	const isMainLibrary = user.locationId === 1 || "";

	return `<!DOCTYPE html>
<html lang="en">

<head>
	<meta charset="UTF-8">
	<meta http-equiv="X-UA-Compatible" content="IE=edge">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<title>Public</title>
	<style>
		.row {
			display: flex;
			justify-content: space-between;
		}

		.bold {
			font-weight: bold;
			text-align: end;
			/* margin-top: auto; */
		}
	</style>
</head>

<body style="width: 200px;font-family: sans-serif;margin: 0px;font-size: 14px;">
	<div>
		${
      isMainLibrary &&
      `
		<h2 style="text-align: center; margin: 10px 20px;">Mehr kutubxonasi</h2>
		<h2 style="text-align: center; margin: 5px;">*********************</h2>
		`
    }
	</div>
	<div>
		<div class="row">
			<div>Ijara raqami:</div>
			<div class="bold">${rent.id}</div>
		</div>
		<div class="row">
			<div>Topshirildi:</div>
			<div class="bold"> ${new Date(rent.leasedAt).toLocaleDateString("ru")}</div>
		</div>
		<div class="row">
			<div>Qaytarilishi kerak:</div>
			<div class="bold"> ${new Date(rent.returningDate).toLocaleDateString(
        "ru"
      )}</div>
		</div>
		<div class="row">
			<div>Kitobxon:</div>
			<div class="bold">${user.firstName + " " + user.lastName} #${rent.userId}</div>
		</div>
		<div class="row">
			<div>Kitob:</div>
			<div class="bold"> ${book.name} #${rent.stockId}</div>
		</div>
	</div>

	<div style="margin: 10px 0px; font-size: 15px; font-weight: bold; text-align: center;">
		Eslatma!
	</div>
	<div style="margin: 10px 0px;">
		<b>* Kitobni o'qishingizni va vaqtida qaytarishingizni so'raymiz</b>
	</div>
${
  isMainLibrary &&
  `
	<div style="margin: 10px 0px;">
		<b>* Siz ham kutubxonaga ehson qilib ko'pchilikning ilm olishga sababchi bo'lishingiz mumkin</b>
	</div>

	<div>
		<h2 style="text-align: center; margin: 10px 0px 0px 0px;">*********************</h2>
	</div>

	<div>
		<div>Sayt: <b>mehrkutubxonasi.uz</b></div>
		<div>Telefon: <b>+998 90 9359034</b></div>
		<div>Instagram: <b>@mehr_kutubxonasi</b></div>
		<div>Telegram: <b>@mehr_kutubxonasi</b></div>
	</div>`
}
	
	<div>
		<h2 style="text-align: center; margin: 10px 0px 0px 0px;">*********************</h2>
	</div>
	<div style="display: flex; justify-content: center; margin-bottom: 20px;"><svg id="code128"></svg></div>
	<script src="https://cdn.jsdelivr.net/npm/jsbarcode@3.11.0/dist/barcodes/JsBarcode.code128.min.js"></script>
	<script>
		JsBarcode("#code128", "${getRentIdForBarcode(rent.id)}", {
			width: 1.5,
			height: 70,
			displayValue: false,
			fontSize: 15
		});
	</script>
</body>

</html>`;
}
