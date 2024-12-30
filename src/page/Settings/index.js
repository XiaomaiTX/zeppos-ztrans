import { getText } from "@zos/i18n";
import zosRouter from "@zos/router";

import EasyStorage from "@silver-zepp/easy-storage";
const storage = new EasyStorage();

import { SettingsPage } from "../../components/settings";

const settingsData = {
    title: getText("settings.title"),
    items: [
        {
            title: getText("settings.adapter"),
            description: storage.getKey("adapter"),
            icon: "arrow-down-s-fill.png",
            action: (value) => {
                zosRouter.push({
                    url: "components/radio",
                    params: JSON.stringify({
                        title: getText("settings.adapter"),
                        storageKey: "adapter",
                        radio_data: ["Translated", "OpenAI"],
                    }),
                });
            },
            value: "adapter",
        },
        {
            title: getText("settings.adapter-settings"),
            icon: "arrow-right-double-fill.png",
            action: () => {
                zosRouter.push({
                    url: "page/Settings/" + storage.getKey("adapter"),
                });
            },
        },
        {
            title: getText("settings.about"),
            icon: "arrow-right-double-fill.png",
            action: () => {
                zosRouter.push({
                    url: "page/About/index",
                });
            },
        },
    ],
};

Page({
    build() {
        new SettingsPage(settingsData);
    },
});
