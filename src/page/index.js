import { getText } from "@zos/i18n";
import * as Styles from "zosLoader:./index.[pf].layout.js";
import * as hmUI from "@zos/ui";
import zosRouter from "@zos/router";
Page({
    build() {
        hmUI.createWidget(hmUI.widget.IMG, {
            ...Styles.LOGO,
        });
        setTimeout(() => {
            zosRouter.push({
                url: "page/Home/index",
            });
        }, 500);
    },
});
