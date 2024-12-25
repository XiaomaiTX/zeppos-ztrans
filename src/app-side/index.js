import { BaseSideService } from "@zeppos/zml/base-side";

// import OpenAI from "openai";

AppSideService(
	BaseSideService({
		onInit() {},
		getDataFromDevice() {
			return this.request({
				method: "your.method2",
				params: {
					param1: "param1",
					param2: "param2",
				},
			})
				.then((result) => {
					console.log("result=>", result);
				})
				.catch((error) => {
					console.error("error=>", error);
				});
		},

		notifyDevice() {
			this.call({
				method: "your.method4",
				params: {
					param1: "param1",
					param2: "param2",
				},
			});
		},

		onRequest(req, res) {
			switch (req.method) {
				case "CHAT":
					chat(res, req.params);
					break;
				default:
					res("error unknown method");
			}
		},

		onCall(data) {
			// no reply
			if (req.method === "your.method3") {
				console.log("req=>", JSON.string(data));
			}
		},
		onRun() {},

		onDestroy() {},
	})
);

async function test_chat(res, params) {
	if (!params.stream) {
		params.stream = false;
	}
	switch (params.stream) {
		case true:
			break;

		default:
			break;
	}
}
async function chat(res, params) {
	if (!params.stream) {
		params.stream = false;
	}
	switch (params.stream) {
		case true:
			// const openai = new OpenAI({
			// 	apiKey: params.api_key,
			// 	baseUrl: params.api_url,
			// });

			// const stream = await openai.chat.completions.create({
			// 	model: "gpt-4o-mini",
			// 	messages: [{ role: "user", content: "Say this is a test" }],
			// 	stream: true,
			// });
			// for await (const chunk of stream) {
			// 	console.log(chunk.choices[0]?.delta?.content || "");
			// }

			fetch({
				url: params.api_url,
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${params.api_key}`,
				},
				body: JSON.stringify(params.body),
			})
				.then((response) => {
					if (!response.ok) {
						throw new Error("Network response was not ok");
					}
					console.log("Fetch response:", response.body);

					const reader = response.body.getReader();
					let result = "";
					function read() {
						return reader.read().then(({ done, value }) => {
							if (done) {
								console.log("Stream finished:", result);
								return;
							}
							result += new TextDecoder("utf-8").decode(value);
							// TODO: 修改TEXT
							console.log(result);
							return read();
						});
					}
					return read();
				})
				.catch((error) => {
					console.error("Fetch error:", error);
				});

			break;
		default:
			try {
				await fetch({
					url: params.api_url,
					method: "POST",
					headers: {
						"Content-Type": "application/json",
						Authorization: `Bearer ${params.api_key}`,
					},
					body: JSON.stringify(params.body),
				}).then((response) => {
					const resBody =
						typeof response.body === "string"
							? JSON.parse(response.body)
							: response.body;
					res(null, {
						result: resBody,
					});
				});
			} catch (error) {
				console.error("Fetch error:", error);
				res(null, {
					result: "error: " + error,
				});
			}
	}
}
