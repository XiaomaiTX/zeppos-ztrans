const API_URL = "https://api.openai.com/v1";

export class OpenAI {
	constructor() {}
	name = "OpenAI";
	static translate(originalLang, targetLang, text) {
		if (originalLang === targetLang || text.length === 0) return text;
		// const resp = await fetch(
        //     `${API_URL}/completions?model=text-davinci-003&prompt=${encodeURIComponent(
        //         text
        //     )}&temperature=0.7&max_tokens=256&top_p=1&frequency_penalty=0&presence_penalty=0&stop=%5B%22%22%5D`,
        //     {
        //         method: "POST",
        //         headers: {
        //             "Content-Type": "application/json",
        //             Authorization: `Bearer ${storage.getKey("openai_api_key")}`,
        //         },
                
        //     }
        // );
		// if (!resp.ok) {
		// 	throw new Error(`HTTP error! status: ${resp.status}`);
		// }
		// const data = await resp.json();
		// const translatedText = data.ressssssssssponseData.translatedText;
		return text;
	}
}
