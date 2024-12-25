import { getText } from "@zos/i18n";
import * as hmUI from "@zos/ui";
import * as Styles from "zosLoader:./index.[pf].layout.js";
import zosRouter from "@zos/router";

import EasyStorage from "@silver-zepp/easy-storage";
const storage = new EasyStorage();

function initConfig() {
    console.log("[OpenAI] init config");
    if (!storage.hasKey("openai_endpoint")) {
        console.log("[storage] can not find openai_endpoint, set https://api.openai.com/v1");
        storage.setKey("openai_endpoint", "https://api.openai.com/v1");
    }
}

Page({
    state: {
        buttonOffset: 0,
    },
    build() {
        initConfig()
        const TEST_DATA = {
            adapter: storage.getKey("adapter"),
        };

        const settingButtons = [
            {
                title: "ENDPOINT",
                description: storage.getKey("openai_endpoint"),
                icon: "arrow-down-s-fill.png",
                action: (value) => {
                },
                value: "openai_endpoint",
            },
        ];
        const title = hmUI.createWidget(hmUI.widget.TEXT, {
            ...Styles.TITLE_STYLE,
            text: "OpenAI",
        });
        const buttonsGroup = hmUI.createWidget(hmUI.widget.GROUP, {
            ...Styles.SETTINGS_CONTAINER_STYLE,
            h:
                settingButtons.length *
                (Styles.SETTINGS_BUTTON_STYLE.h + px(10)),
        });
        for (let i = 0; i < settingButtons.length; i++) {
            const itemData = settingButtons[i];
            buttonsGroup
                .createWidget(hmUI.widget.FILL_RECT, {
                    ...Styles.SETTINGS_BUTTON_STYLE,
                    y: Styles.SETTINGS_BUTTON_STYLE.y + this.state.buttonOffset,
                })
                .addEventListener(hmUI.event.CLICK_UP, () => {
                    itemData.action();
                });

            if (itemData && itemData.description) {
                buttonsGroup
                    .createWidget(hmUI.widget.TEXT, {
                        ...Styles.SETTINGS_BUTTON_SUBTITLE_STYLE,
                        y:
                            Styles.SETTINGS_BUTTON_SUBTITLE_STYLE.y +
                            this.state.buttonOffset,
                        text: itemData.title,
                    })
                    .setEnable(false);
                if (itemData.value) {
                    buttonsGroup
                        .createWidget(hmUI.widget.TEXT, {
                            ...Styles.SETTINGS_BUTTON_DESCRIPTION_STYLE,
                            y:
                                Styles.SETTINGS_BUTTON_DESCRIPTION_STYLE.y +
                                this.state.buttonOffset,
                            text: storage.getKey(itemData.value),
                        })
                        .setEnable(false);
                } else {
                    buttonsGroup
                        .createWidget(hmUI.widget.TEXT, {
                            ...Styles.SETTINGS_BUTTON_DESCRIPTION_STYLE,
                            y:
                                Styles.SETTINGS_BUTTON_DESCRIPTION_STYLE.y +
                                this.state.buttonOffset,
                            text: itemData.description,
                        })
                        .setEnable(false);
                }
            } else if (itemData) {
                buttonsGroup
                    .createWidget(hmUI.widget.TEXT, {
                        ...Styles.SETTINGS_BUTTON_TITLE_STYLE,
                        y:
                            Styles.SETTINGS_BUTTON_TITLE_STYLE.y +
                            this.state.buttonOffset,
                        text: itemData.title,
                    })
                    .setEnable(false);
            }
            if (itemData && itemData.icon) {
                buttonsGroup
                    .createWidget(hmUI.widget.IMG, {
                        ...Styles.SETTINGS_BUTTON_ICON_STYLE,
                        y:
                            Styles.SETTINGS_BUTTON_ICON_STYLE.y +
                            this.state.buttonOffset,
                        src: itemData.icon,
                    })
                    .setEnable(false);
            }
            this.state.buttonOffset += Styles.SETTINGS_BUTTON_STYLE.h + px(10);
        }
    },
});
