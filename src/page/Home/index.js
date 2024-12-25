import { getText } from "@zos/i18n";
import { px } from "@zos/utils";
import * as Styles from "zosLoader:./index.[pf].layout.js";
import * as hmUI from "@zos/ui";
import zosRouter from "@zos/router";

import { BasePage } from "@zeppos/zml/base-page";
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

Page(
    BasePage({
        state: {
            textContainerOffset: Styles.TEXT_CONTAINER_STYLE.y,
        },
        build() {
            initConfig();
            // Define UI
            const title = hmUI.createWidget(hmUI.widget.TEXT, {
                ...Styles.TITLE_STYLE,
                text: "ZTrans",
            });
            title.setEnable(false);
            const originButton = hmUI.createWidget(hmUI.widget.BUTTON, {
                ...Styles.ORIGIN_BUTTON_STYLE,
                text: storage.getKey("origin"),
            });
            const transArrow = hmUI.createWidget(hmUI.widget.IMG, {
                ...Styles.TRANS_ARROW_STYLE,
            });
            const targetButton = hmUI.createWidget(hmUI.widget.BUTTON, {
                ...Styles.TAGET_BUTTON_STYLE,
                text: storage.getKey("target"),
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
            settingsButton.addEventListener(hmUI.event.CLICK_UP, () => {
                zosRouter.push({
                    url: "page/Settings/index",
                });
            });

            // debug
            originText.addEventListener(hmUI.event.CLICK_UP, () => {
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
                console.log(this.state.textContainerOffset);
                dilivingLine.setProperty(hmUI.prop.MORE, {
                    x: Styles.DILIVDING_LINE_STYLE.x,
                    y: this.state.textContainerOffset,
                    w: Styles.DILIVDING_LINE_STYLE.w,
                    h: Styles.DILIVDING_LINE_STYLE.h,
                });
                this.state.textContainerOffset +=
                    Styles.DILIVDING_LINE_STYLE.h + px(10);
                console.log(this.state.textContainerOffset);
                const targetTextProp = hmUI.getTextLayout("右转去那边", {
                    text_size: 24,
                    text_width: Styles.TEXT_CONTAINER_STYLE.w - 40,
                    wrapped: 1,
                });

                targetText.setProperty(hmUI.prop.MORE, {
                    y: this.state.textContainerOffset,
                    h: targetTextProp.height,
                    text: targetTextProp.text,
                });
                dilivingLine.setProperty(hmUI.prop.VISIBLE, true);
                targetText.setProperty(hmUI.prop.VISIBLE, true);
                this.state.textContainerOffset = Styles.TEXT_CONTAINER_STYLE.y;
            });
        },
        getDataFromMobile() {
            return this.request({
              method: 'your.method1',
              params: {
                param1: 'param1',
                param2: 'param2',
              },
            })
              .then((result) => {
                // receive your data
                console.log('result=>', result)
              })
              .catch((error) => {
                // receive your error
                console.error('error=>', error)
              })
          },
      
          notifyMobile() {
            this.call({
              method: 'your.method3',
              params: {
                param1: 'param1',
                param2: 'param2',
              },
            })
          },
      
          onRequest(req, res) {
            // need reply
            // node style callback
            // first param is error
            // second param is your data
            if (req.method === 'your.method2') {
              // do something
              console.log('req=>', JSON.string(req))
              res(null, {
                test: 1,
              })
            } else {
              res('error happened')
            }
          },
      
          onCall(data) {
           // no reply
           if (req.method === 'your.method4') {
             // do something
             console.log('req=>', JSON.string(data))
           }
          },
    })
);
