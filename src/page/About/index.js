import { getText } from "@zos/i18n";
import zosRouter from "@zos/router";

import EasyStorage from "@silver-zepp/easy-storage";
const storage = new EasyStorage();

import { SettingsPage } from "../../components/settings";

const settingsData = {
    title: getText("about.title"),
    items: [
        {
            title: getText("about.author"),
            description: "XiaomaiTX",
        },
        {
            title: getText("about.email"),
            description: "Me@XiaomaiTX.com",
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
