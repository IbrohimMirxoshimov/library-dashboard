export function getDayLaterDate(days, date = new Date()) {
	date.setDate(date.getDate() + days);
	return date.toISOString();
}
