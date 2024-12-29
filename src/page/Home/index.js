import { getText } from "@zos/i18n";
import { px } from "@zos/utils";
import * as Styles from "zosLoader:./index.[pf].layout.js";
import * as hmUI from "@zos/ui";
import * as zosRouter from "@zos/router";
import * as zosDisplay from "@zos/display";
import * as zosSensor from "@zos/sensor";
import * as zosInteraction from "@zos/interaction";
const time = new zosSensor.Time();

import { BasePage } from "@zeppos/zml/base-page";
import EasyStorage from "@silver-zepp/easy-storage";
const storage = new EasyStorage();

import { translate } from "../../utils/adapter/adaper";

const SUPPORT_LANG = ["zh-CN", "en-US", "zh-TW", "ja-JP", "ko-KR"];

Page(
    BasePage({
        state: {
            textContainerOffset: Styles.TEXT_CONTAINER_STYLE.y,
        },
        onInit() {
            // set screen brightness
            if (
                zosDisplay.setPageBrightTime({
                    brightTime: 60000,
                }) === 0
            ) {
                console.log("setPageBrightTime success");
            }
            zosInteraction.onGesture({
                callback: (event) => {
                    if (event === zosInteraction.GESTURE_RIGHT) {
                        zosRouter.exit();
                        console.log("up");
                    }
                    return true;
                },
            });
        },
        build() {
            // Define UI
            const title = hmUI.createWidget(hmUI.widget.TEXT, {
                ...Styles.TITLE_STYLE,
                text: "ZTrans",
            });
            title.setEnable(false);
            const originButton = hmUI.createWidget(hmUI.widget.BUTTON, {
                ...Styles.ORIGIN_BUTTON_STYLE,
                text: storage.getKey("originLang"),
            });
            const transArrow = hmUI.createWidget(hmUI.widget.IMG, {
                ...Styles.TRANS_ARROW_STYLE,
            });
            const targetButton = hmUI.createWidget(hmUI.widget.BUTTON, {
                ...Styles.TAGET_BUTTON_STYLE,
                text: storage.getKey("targetLang"),
            });
            const textContainer = hmUI.createWidget(hmUI.widget.FILL_RECT, {
                ...Styles.TEXT_CONTAINER_STYLE,
            });
            textContainer.setEnable(false);
            const originText = hmUI.createWidget(hmUI.widget.TEXT, {
                ...Styles.ORIGIN_TEXT_STYLE,
            });
            const dilivingLine = hmUI.createWidget(hmUI.widget.FILL_RECT, {
                ...Styles.DILIVDING_LINE_STYLE,
            });
            dilivingLine.setEnable(false);
            dilivingLine.setProperty(hmUI.prop.VISIBLE, false);
            const targetText = hmUI.createWidget(hmUI.widget.TEXT, {
                ...Styles.TARGET_TEXT_STYLE,
            });
            targetText.setProperty(hmUI.prop.VISIBLE, false);
            const settingsButton = hmUI.createWidget(hmUI.widget.BUTTON, {
                ...Styles.SETTINGS_BUTTON_STYLE,
            });

            // EventListener
            originButton.addEventListener(hmUI.event.CLICK_UP, () => {
                zosRouter.push({
                    url: "page/components/radio",
                    params: JSON.stringify({
                        title: "Origin Lang",
                        storageKey: "originLang",
                        radio_data: SUPPORT_LANG,
                    }),
                });
            });
            targetButton.addEventListener(hmUI.event.CLICK_UP, () => {
                zosRouter.push({
                    url: "page/components/radio",
                    params: JSON.stringify({
                        title: "Target Lang",
                        storageKey: "targetLang",
                        radio_data: SUPPORT_LANG,
                    }),
                });
            });
            transArrow.addEventListener(hmUI.event.CLICK_UP, () => {
                const originLang = storage.getKey("originLang");
                const targetLang = storage.getKey("targetLang");
                originButton.setProperty(hmUI.prop.TEXT, targetLang);
                targetButton.setProperty(hmUI.prop.TEXT, originLang);
                storage.setKey("originLang", targetLang);
                storage.setKey("targetLang", originLang);
            });
            settingsButton.addEventListener(hmUI.event.CLICK_UP, () => {
                zosRouter.push({
                    url: "page/Settings/index",
                });
            });

            // debug
            storage.setKey("originText", "你好，世界");
            originText.addEventListener(hmUI.event.CLICK_UP, async () => {
                console.log("origin click");
                const originTextProp = hmUI.getTextLayout(
                    storage.getKey("originText"),
                    {
                        text_size: 24,
                        text_width: Styles.TEXT_CONTAINER_STYLE.w - 40,
                        wrapped: 1,
                    }
                );
                originText.setProperty(hmUI.prop.MORE, {
                    h: originTextProp.height,
                    text: originTextProp.text,
                    color: 0xffffff,
                });
                this.state.textContainerOffset +=
                    originTextProp.height + px(25);
                dilivingLine.setProperty(hmUI.prop.MORE, {
                    x: Styles.DILIVDING_LINE_STYLE.x,
                    y: this.state.textContainerOffset,
                    w: Styles.DILIVDING_LINE_STYLE.w,
                    h: Styles.DILIVDING_LINE_STYLE.h,
                });
                this.state.textContainerOffset +=
                    Styles.DILIVDING_LINE_STYLE.h + px(10);
                dilivingLine.setProperty(hmUI.prop.VISIBLE, true);

                targetText.setProperty(hmUI.prop.VISIBLE, false);

                var responseContent;
                switch (storage.getKey("adapter")) {
                    case "OpenAI":
                        console.log("[adapter]: OpenAI");
                        responseContent = await this.OpenAI();
                    case "Translated":
                        console.log("[adapter]: Translated");
                        responseContent = await this.Translated();

                        break;

                    default:
                        responseContent = "adapter error";
                        break;
                }

                console.log("[chat]: responseContent: ", responseContent);
                const targetTextProp = hmUI.getTextLayout(responseContent, {
                    text_size: 24,
                    text_width: Styles.TEXT_CONTAINER_STYLE.w - 40,
                    wrapped: 1,
                });

                targetText.setProperty(hmUI.prop.MORE, {
                    y: this.state.textContainerOffset,
                    h: targetTextProp.height,
                    text: targetTextProp.text,
                });
                targetText.setProperty(hmUI.prop.VISIBLE, true);
                this.state.textContainerOffset = Styles.TEXT_CONTAINER_STYLE.y;
            });
        },
        async OpenAI() {
            const api_url = "https://nio.cafero.town/api/v1/chat/completions";
            const api_key =
                "sk-6b9ada8b04aac6d23282f6e19d3350686b21a77e380326cf";
            const body = {
                model: "gpt-4o-mini",
                messages: [
                    {
                        role: "user",
                        content: `将以下内容从${storage.getKey(
                            "originLang"
                        )}翻译成${storage.getKey(
                            "targetLang"
                        )}: ${storage.getKey("originText")}`,
                    },
                ],
                temperature: 0.7,
            };
            try {
                const result = await this.httpRequest({
                    method: "POST",
                    url: api_url,
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${api_key}`,
                    },
                    body: JSON.stringify(body),
                });

                console.log("result.status", result.status);

                return JSON.stringify(
                    result.body.choices[0].message.content,
                    null,
                    2
                );
            } catch (error) {
                console.error("[OpenAI]:", error);
                throw error;
            }
        },
        async Translated() {
            try {
                const result = await this.httpRequest({
                    method: "POST",
                    url: `https://api.mymemory.translated.net/get?q=${storage.getKey(
                        "originText"
                    )}&langpair=${storage.getKey(
                        "originLang"
                    )}|${storage.getKey("targetLang")}`,
                });

                console.log("result.status", result.status);
                console.log("[result]", typeof result);
                console.log("[result]", JSON.stringify(result));

                return decodeURIComponent(
                    result.body.responseData.translatedText.replace(/\s+/g, "")
                );
            } catch (error) {
                console.error("[Translated]:", error);
                throw error;
            }
        },
    })
);
