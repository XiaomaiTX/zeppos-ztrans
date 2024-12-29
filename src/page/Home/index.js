import { getText } from "@zos/i18n";
import { px } from "@zos/utils";
import * as Styles from "zosLoader:./index.[pf].layout.js";
import * as hmUI from "@zos/ui";
import * as zosRouter from "@zos/router";
import * as zosDisplay from "@zos/display";
import * as zosSensor from "@zos/sensor";
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
            console.log("[Home] init config");
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
            if (
                zosDisplay.setPageBrightTime({
                    brightTime: 60000,
                }) === 0
            ) {
                console.log("setPageBrightTime success");
            }
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
            originText.addEventListener(hmUI.event.CLICK_UP, async () => {
                console.log("origin click");
                const originTextProp = hmUI.getTextLayout(
                    "turn right and go to that side",
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

                const res = await this.getYourData({
                    api_url: "https://nio.cafero.town/api/v1/chat/completions",
                    api_key:
                        "sk-6b9ada8b04aac6d23282f6e19d3350686b21a77e380326cf",
                    body: {
                        model: "gpt-4o-mini",
                        messages: [
                            {
                                role: "user",
                                content: `将以下内容从${storage.getKey(
                                    "originLang"
                                )}翻译成${storage.getKey(
                                    "targetLang"
                                )}: "turn right and go to that side"`,
                            },
                        ],
                        temperature: 0.7,
                    },
                });
                console.log("receive data");
                console.log("[chat]: typeof res: ", typeof res);
                console.log("[chat]: res: ", JSON.stringify(res));
                const responseContent = JSON.stringify(
                    res.choices[0].message.content,
                    null,
                    2
                );
                console.log("[chat]: responseContent: ", responseContent);
                // ZMarkdown.createWidget(hmUI.widget.TEXT, {
                //     ...STYLE.MARKDOWN_TEXT,
                //     text: responseContent.slice(1, -1).replace(/\\n/g, "\n"),
                // });
                const targetTextProp = hmUI.getTextLayout(
                    // translate({
                    //     adaper: storage.getKey("adapter"),
                    //     originalLang: storage.getKey("originLang"),
                    //     targetLang: storage.getKey("targetLang"),
                    //     text: "turn right and go to that side",
                    // })
                    responseContent,
                    {
                        text_size: 24,
                        text_width: Styles.TEXT_CONTAINER_STYLE.w - 40,
                        wrapped: 1,
                    }
                );

                targetText.setProperty(hmUI.prop.MORE, {
                    y: this.state.textContainerOffset,
                    h: targetTextProp.height,
                    text: targetTextProp.text,
                });
                targetText.setProperty(hmUI.prop.VISIBLE, true);
                this.state.textContainerOffset = Styles.TEXT_CONTAINER_STYLE.y;
            });
        },
        async getYourData(params) {
            console.log("params=>", JSON.stringify(params));
            try {
                const result = await this.httpRequest({
                    method: "POST",
                    url: params.api_url,
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${params.api_key}`,
                    },
                    body: JSON.stringify(params.body),
                });

                console.log("result.status", result.status);
                console.log("result.statusText", result.statusText);
                console.log("result.headers", result.headers);
                console.log("result.body", result.body);
                console.log("[result]", typeof result);
                console.log("[result]", JSON.stringify(result));

                // Return result.body to the caller
                return result.body;
            } catch (error) {
                console.error("Error in getYourData:", error);
                throw error;
            }
        },
    })
);
