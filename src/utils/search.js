// Qidiruv normalizatsiyasi - backend app/utils/search.js bilan bir xil qoidalar:
// 1. kichik harf
// 2. apostroflar (' ` ‘ ’ ʻ ʼ) olib tashlanadi: go'zal = go‘zal = gozal
// 3. h -> x: ibrohim = ibroxim
const APOSTROPHE_REGEX = /['`‘’ʻʼ]/g;

export function normalizeSearchText(str) {
	return String(str ?? "")
		.replace(/İ/g, "I")
		.toLowerCase()
		.replace(APOSTROPHE_REGEX, "")
		.replace(/h/g, "x");
}

export function getSearchWords(query) {
	return normalizeSearchText(query).split(/\s+/).filter(Boolean);
}

// Har bir so'z matnda bo'lishi kerak (tartib ahamiyatsiz)
export function matchesSearch(text, query) {
	const words = getSearchWords(query);
	if (!words.length) return true;

	const normalized = normalizeSearchText(text);
	return words.every((word) => normalized.includes(word));
}
