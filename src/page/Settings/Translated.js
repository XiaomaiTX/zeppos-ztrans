import { getText } from "@zos/i18n";
import * as hmUI from "@zos/ui";

import { SettingsPage } from "../components/settings";

const settingsData = {
    title: "Translated",
    items: [
        {
            title: "Nothing to do",
            action: (value) => {},
            value: "",
        },
    ],
};

Page({
    build() {
        new SettingsPage(settingsData);
    },
});
