import { getText } from "@zos/i18n";
import zosRouter from "@zos/router";

import EasyStorage from "@silver-zepp/easy-storage";
const storage = new EasyStorage();

import { SettingsPage } from "../../components/settings";

const settingsData = {
    title: "Settings",
    items: [
        {
            title: "Adapter",
            description: storage.getKey("adapter"),
            icon: "arrow-down-s-fill.png",
            action: (value) => {
                zosRouter.push({
                    url: "page/components/radio",
                    params: JSON.stringify({
                        title: "Adapter",
                        storageKey: "adapter",
                        radio_data: ["Translated", "OpenAI"],
                    }),
                });
            },
            value: "adapter",
        },
        {
            title: "Adapter Setting",
            icon: "arrow-right-double-fill.png",
            action: () => {
                zosRouter.push({
                    url: "page/Settings/" + storage.getKey("adapter"),
                });
            },
        },
        {
            title: "About",
            icon: "arrow-right-double-fill.png",
            action: () => {
                zosRouter.push({
                    url: "page/Settings/adapter",
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
