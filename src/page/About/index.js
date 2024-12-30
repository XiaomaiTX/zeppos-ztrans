import { getText } from "@zos/i18n";
import zosRouter from "@zos/router";

import EasyStorage from "@silver-zepp/easy-storage";
const storage = new EasyStorage();

import { SettingsPage } from "../../components/settings";

const settingsData = {
    title: "About",
    items: [
        {
            title: "Developer",
            description: "XiaomaiTX",
        },
        {
            title: "GitHub",
            description: "XiaomaiTX/zeppos-ztrans",
        },
    ],
};

Page({
    build() {
        new SettingsPage(settingsData);
    },
    
});
