import { getText } from "@zos/i18n";
import zosRouter from "@zos/router";

import EasyStorage from "@silver-zepp/easy-storage";
const storage = new EasyStorage();

import { SettingsPage } from "../components/settings";

const settingsData = {
    title: "OpenAI",
    items: [
        {
            title: "Endpoint",
            description: storage.getKey("openai_endpoint"),
            icon: "arrow-down-s-fill.png",
            action: (value) => {},
            value: "openai_endpoint",
        },
        {
            title: "API Key",
            description: storage.getKey("openai_api_key"),
            icon: "arrow-down-s-fill.png",
            action: (value) => {},
            value: "openai_api_key",
        },
        {
            title: "Model",
            description: storage.getKey("openai_model"),
            icon: "arrow-down-s-fill.png",
            action: (value) => {},
            value: "openai_model",
        },
    ],
};
Page({
    build() {
        new SettingsPage(settingsData);
    },
});
