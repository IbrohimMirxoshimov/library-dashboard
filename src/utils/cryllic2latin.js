const letters = {
	Ё: "YO",
	Й: "Y",
	Ц: "S",
	У: "U",
	К: "K",
	Е: "E",
	Н: "N",
	Г: "G",
	Ш: "SH",
	Щ: "SH",
	З: "Z",
	Х: "x",
	Ъ: "",
	ё: "yo",
	й: "y",
	ц: "s",
	у: "u",
	к: "k",
	е: "e",
	н: "n",
	г: "g",
	ш: "sh",
	щ: "sh",
	з: "z",
	х: "x",
	ъ: "",
	Ф: "F",
	Ы: "I",
	В: "V",
	А: "a",
	П: "P",
	Р: "R",
	О: "O",
	Л: "L",
	Д: "D",
	Ж: "J",
	Э: "E",
	ф: "f",
	ы: "i",
	в: "v",
	а: "a",
	п: "p",
	р: "r",
	о: "o",
	л: "l",
	д: "d",
	ж: "j",
	э: "e",
	Я: "Ya",
	Ч: "CH",
	С: "S",
	М: "M",
	И: "I",
	Т: "T",
	Ь: "",
	Б: "B",
	Ю: "YU",
	я: "ya",
	ч: "ch",
	с: "s",
	м: "m",
	и: "i",
	т: "t",
	ь: "",
	б: "b",
	ю: "yu",
};

export function cryllic2Lation(word) {
	return word
		.split("")
		.map((char) => {
			let m = letters[char];
			if (m === undefined) return char;
			return m;
		})
		.join("");
}

export function isLatin(char) {
	return "A" < char && "z" > char;
}

const escapeSymbols = {
	ts: "s",
	h: "x",
};

export function escapeSomeSymbols(word) {
	return word
		.split("")
		.map((char) => {
			return escapeSymbols[char] || char;
		})
		.join("");
}
