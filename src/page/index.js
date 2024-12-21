import { getText } from "@zos/i18n";
import * as Styles from "zosLoader:./index.[pf].layout.js";
import zosRouter from "@zos/router";
Page({
    build() {
            zosRouter.push({
                url: "page/Home/index",
            });
    },
});
