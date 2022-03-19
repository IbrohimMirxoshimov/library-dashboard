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
		console.log("PRINF ");
		win.close();
	}, 100);
}

function getRecieptContent({ user, book, rent }) {
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
		<h2 style="text-align: center; margin: 10px;">Mehr kutubxonasi</h2>
	</div>

	<div>
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
			<div class="bold">${user.firstName + " " + user.lastName}</div>
		</div>
		<div class="row">
			<div>Kitob:</div>
			<div class="bold"> ${book.name}</div>
		</div>
	</div>

	<div style="margin: 10px 0px;">
		Kitobni o'qishingizni va vaqtida qaytarishingizni so'raymiz. Qancha tez o'qib bo'lsangiz shuncha yaxshi
	</div>
	<div>
		<div>Telegram: @mehr_kutubxonasi</div>
		<div>Telefon: +998909359034</div>
	</div>
</body>

</html>`;
}
