import { resources } from "api/resources";
import { sendMessage } from "hooks/useSendMessage";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { addNeedsWithDebounce } from "my-redux/actions/resource";
import { message } from "antd";
import { CopyTwoTone } from "@ant-design/icons";
import { getRamainedDays } from "configs/route/utils";

function getText(book, rent, user) {
	let remained = getRamainedDays(rent);

	// return ""
	let template = `Assalomu alaykum va rohmatullohi va barokatuh
Aziz kitobxonimiz ${user.firstName} ${user.lastName}. Kutubxonadan yozyapmiz
	
Kitob olgan ekansiz. O'ylaymizki o'qib bo'lib qoldingiz. 
Olgan kitobingiz: ${book.name}
Olingan: ${new Date(rent.leasedAt).toLocaleDateString("ru")}
Oxirgi muddat: ${new Date(rent.returningDate).toLocaleDateString("ru")}
${
	remained > 0
		? "Qoldi: " + remained + " kun"
		: "Muddat o'tib ketdi: " + remained + " kun"
}
\n\nVaqtida olib kelib bersangiz juda hursand bo'lamiz. Sababi juda ko'pchilik kitob so'rayapti. Qolganlarni ham siz kabi kitob o'qigisi kelyapgan ekan Alhamdulillah\n\nAlloh ilmingizni ziyoda qilsin aziz kitobxon🤲\n@ilm_va_ehson`;

	return template;
}

function UserFullName({ record }) {
	const user = record.user;
	const book = useSelector((state) =>
		state[resources.books].items.find((item) => item.id === record.stock.bookId)
	);
	const [copy, setCopy] = useState(false);

	useEffect(() => {
		record.stock.bookId &&
			addNeedsWithDebounce(resources.books, [record.stock.bookId]);
	}, [record.stock.bookId]);

	if (!user) return "";

	return (
		<div className="cursor-pointer">
			<b
				onClick={(e) => {
					window.fastSearchOnListView("u" + user.id);
				}}
			>
				{user.id}.
			</b>

			<a
				href="/"
				onClick={(e) => {
					e.preventDefault();
					sendMessage(
						{
							edit: true,
							id: user.id,
							resource: resources.users,
							record: user,
							form: resources.users,
						},
						"f_d"
					);
				}}
			>{` ${user.firstName} ${user.lastName}`}</a>
			<a href={"tel:" + user.phone}> tel</a>
			<CopyTwoTone
				onClick={() => {
					setCopy(true);
					setTimeout(() => {
						let el = document.getElementById("t_" + record.id);
						el?.select();
						let res = document.execCommand("copy");
						if (res) {
							message.success("Ko'chirildi");
						} else {
							message.error("Xatolik");
						}
					}, 200);
				}}
				style={{ marginLeft: "4px" }}
				color="green"
			/>

			{book && copy && (
				<textarea
					style={{ width: "20px", height: "20px", opacity: 0 }}
					id={"t_" + record.id}
					defaultValue={getText(book, record, record.user)}
				/>
			)}
		</div>
	);
}

export default UserFullName;
