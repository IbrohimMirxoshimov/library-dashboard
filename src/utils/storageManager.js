export function getDefaultRow() {
	return localStorage.getItem("drow") || 1;
}

export function getDefaultColumn() {
	return localStorage.getItem("dcol") || "A";
}

export function setDefaultRow(rowNumber) {
	localStorage.setItem("drow", rowNumber);
}

export function setDefaultColumn(columnIndex) {
	localStorage.setItem("dcol", columnIndex.toUpperCase().trim().slice(0, 1));
}
