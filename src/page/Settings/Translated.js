import { getText } from "@zos/i18n";
import * as hmUI from "@zos/ui";
import * as Styles from "zosLoader:./index.[pf].layout.js";
import zosRouter from "@zos/router";

Page({
    build() {
        const title = hmUI.createWidget(hmUI.widget.TEXT, {
            ...Styles.TITLE_STYLE,
            text: "Translated",
        });
        const textContainer = hmUI.createWidget(hmUI.widget.GROUP, Styles.SETTINGS_CONTAINER_STYLE);
        const text = textContainer.createWidget(hmUI.widget.TEXT, {
            ...Styles.SETTINGS_TEXT_STYLE,
            text: "Nothing to show",
        });
    },
});
