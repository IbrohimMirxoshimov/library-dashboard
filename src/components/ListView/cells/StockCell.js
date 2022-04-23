import { resources } from "api/resources";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { addNeedsWithDebounce } from "redux/actions/resource";

function StockCell({ stock }) {
	const bookName = useSelector((state) => {
		return state.books.items.find((book) => stock.bookId === book.id)?.name;
	});

	useEffect(() => {
		addNeedsWithDebounce(resources.books, [stock.bookId]);
		// eslint-disable-next-line
	}, []);

	if (!stock) return "-";

	return (
		<div className="cursor-pointer">
			<b
				onClick={(e) => {
					window.fastSearchOnListView("s" + stock.id);
				}}
			>
				{stock.id}/
			</b>
			<b
				onClick={(e) => {
					window.fastSearchOnListView("b" + stock.bookId);
				}}
			>
				{stock.bookId} -
			</b>
			{bookName}
		</div>
	);
}

export default StockCell;
