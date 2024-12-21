import { getText } from "@zos/i18n";
import * as Styles from "zosLoader:./index.[pf].layout.js";
import * as hmUI from "@zos/ui";
import EasyStorage from "@silver-zepp/easy-storage";
const storage = new EasyStorage();

function initConfig() {
    console.log("[Home] init config");
    if (!storage.hasKey("origin")) {
        console.log("[storage] can not find origin, set en-US");
        storage.setKey("origin", "en-US");
    }
    if (!storage.hasKey("target")) {
        console.log("[storage] can not find target, set zh-CN");
        storage.setKey("target", "zh-CN");
    }
    if (!storage.hasKey("adapter")) {
        console.log("[storage] can not find adapter, set Translated");
        storage.setKey("adapter", "Translated");
    }
}

Page({
    build() {
        initConfig();
        // Define UI
        const title = hmUI.createWidget(hmUI.widget.TEXT, {
            ...Styles.TITLE_STYLE,
            text: "ZTrans",
        });
        const originButton = hmUI.createWidget(hmUI.widget.BUTTON, {
            ...Styles.ORIGIN_BUTTON_STYLE,
            text: storage.getKey("origin"),
        });
        hmUI.createWidget(hmUI.widget.IMG, {
            ...Styles.TRANS_ARROW_STYLE,
        });
        const targetButton = hmUI.createWidget(hmUI.widget.BUTTON, {
            ...Styles.TAGET_BUTTON_STYLE,
            text: storage.getKey("target"),
        });
        const textContainer = hmUI.createWidget(hmUI.widget.FILL_RECT, {
            ...Styles.TEXT_CONTAINER_STYLE,
        });
        const originText = hmUI.createWidget(hmUI.widget.TEXT, {
            ...Styles.ORIGIN_TEXT_STYLE,
        });
        const dilivingLine = hmUI.createWidget(hmUI.widget.FILL_RECT, {
            ...Styles.DILIVDING_LINE_STYLE,
        });
        dilivingLine.setProperty(hmUI.prop.VISIBLE, false);
        const targetText = hmUI.createWidget(hmUI.widget.TEXT, {
            ...Styles.TARGET_TEXT_STYLE,
        });
        targetText.setProperty(hmUI.prop.VISIBLE, false);
        const settingsButton = hmUI.createWidget(hmUI.widget.BUTTON, {
            ...Styles.SETTINGS_BUTTON_STYLE,
        });

        // debug
        originText.addEventListener(hmUI.event.CLICK, () => {
            console.log("origin click");
            originText.setProperty(hmUI.prop.TEXT, "Test");
            originText
        })
    },
});
