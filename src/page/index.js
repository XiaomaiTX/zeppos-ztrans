import { getText } from "@zos/i18n";
import * as Styles from "zosLoader:./index.[pf].layout.js";
import * as hmUI from "@zos/ui";
import zosRouter from "@zos/router";

import EasyStorage from "@silver-zepp/easy-storage";
const storage = new EasyStorage();


Page({
    onInit() {
        console.log("[General] init config");
        // init storage
        if (!storage.hasKey("originLang")) {
            console.log("[storage] can not find origin, set en-US");
            storage.setKey("originLang", "en-US");
        }
        if (!storage.hasKey("targetLang")) {
            console.log("[storage] can not find target, set zh-CN");
            storage.setKey("targetLang", "zh-CN");
        }
        if (!storage.hasKey("adapter")) {
            console.log("[storage] can not find adapter, set OpenAI");
            storage.setKey("adapter", "OpenAI");
        }
        if (!storage.hasKey("originText")) {
            storage.setKey("originText", "");
        }
        if (!storage.hasKey("targetText")) {
            storage.setKey("targetText", "");
        }
        console.log("[OpenAI] init config");
        if (!storage.hasKey("openai_endpoint")) {
            console.log("[storage] can not find openai_endpoint, set https://api.openai.com/v1");
            storage.setKey("openai_endpoint", "https://api.openai.com/v1");
        }
        if (!storage.hasKey("openai_api_key")) {
            console.log("[storage] can not find openai_api_key, set ");
            storage.setKey("openai_api_key", "");
        }
        if (!storage.hasKey("openai_model")) {
            console.log("[storage] can not find openai_model, set gpt-3.5-turbo");
            storage.setKey("openai_model", "gpt-3.5-turbo");
        }
    
    },

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
