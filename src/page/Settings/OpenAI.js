import { getText } from "@zos/i18n";
import zosRouter from "@zos/router";
import { BasePage } from "@zeppos/zml/base-page";

import EasyStorage from "@silver-zepp/easy-storage";
const storage = new EasyStorage();

import { SettingsPage } from "../../components/settings";

const settingsData = {
    title: "OpenAI",
    items: [
        {
            title: "Endpoint",
            description: storage.getKey("openai_endpoint"),
            icon: "arrow-down-s-fill.png",
            action: (value) => {
                zosRouter.push({
                    url: "page/components/input",
                    params: JSON.stringify({
                        value: "openai_endpoint",
                    })
                });
            },
            value: "openai_endpoint",
        },
        {
            title: "API Key",
            description: storage.getKey("openai_api_key"),
            icon: "arrow-down-s-fill.png",
            action: (value) => {
                zosRouter.push({
                    url: "page/components/input",
                    params: JSON.stringify({
                        value: "openai_api_key",
                    })
                });
            },
            value: "openai_api_key",
        },
        {
            title: "Model",
            description: storage.getKey("openai_model"),
            icon: "arrow-down-s-fill.png",
            action: (value) => {
                zosRouter.push({
                    url: "page/components/input",
                    params: JSON.stringify({
                        value: "openai_model",
                    })
                });
            },
            value: "openai_model",
        },
        {
            title: "Check",
            description: "",
            icon: "arrow-down-s-fill.png",
            action: (value) => {
            },
        },
    ],
};
Page(
    BasePage({
        build() {
            new SettingsPage(settingsData);
        },
        async OpenAI() {
            const api_url = storage.getKey("openai_endpoint");
            const api_key = storage.getKey("openai_api_key");
            const body = {
                model: "gpt-4o-mini",
                messages: [
                    {
                        role: "user",
                        content: `将以下内容从${storage.getKey(
                            "originLang"
                        )}翻译成${storage.getKey(
                            "targetLang"
                        )}: ${storage.getKey("originText")}`,
                    },
                ],
                temperature: 0.7,
            };
            try {
                const result = await this.httpRequest({
                    method: "POST",
                    url: api_url,
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${api_key}`,
                    },
                    body: JSON.stringify(body),
                });

                console.log("result.status", result.status);

                return JSON.stringify(
                    result.body.choices[0].message.content,
                    null,
                    2
                );
            } catch (error) {
                console.error("[OpenAI]:", error);
                throw error;
            }
        },
    })
);
