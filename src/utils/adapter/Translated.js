const API_URL = "https://api.mymemory.translated.net";

export class Translated {
	constructor() {}
	name = "Translated";
	static  translate(originalLang, targetLang, text) {
		if (originalLang === targetLang || text.length === 0) return text;
		// const resp = await fetch(
		// 	`${API_URL}/get?q=${encodeURIComponent(
		// 		text
		// 	)}&langpair=${originalLang}|${targetLang}`
		// );
		// if (!resp.ok) {
		// 	throw new Error(`HTTP error! status: ${resp.status}`);
		// }
		// const data = await resp.json();
		// const translatedText = data.responseData.translatedText;
		return text;
	}
}
