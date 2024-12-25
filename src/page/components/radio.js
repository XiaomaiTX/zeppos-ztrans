import { getText } from "@zos/i18n";
import * as hmUI from "@zos/ui";
import zosRouter from "@zos/router";

import EasyStorage from "@silver-zepp/easy-storage";
const storage = new EasyStorage();

Page({
    onInit(params) {
        const paramsObj = JSON.parse(params)
        this.state.params = paramsObj
      },
    state: {
        params: {},
        buttonOffset: 0,
    },
    build() {
        const title = hmUI.createWidget(hmUI.widget.TEXT, {
            ...Styles.TITLE,
            text: this.state.params.title,
        });
        const buttonsGroup = hmUI.createWidget(hmUI.widget.GROUP, {
            x: px(30),
            y: px(180),
            w: px(420),
            h: this.state.params.radio_data.length * (px(80) + px(10)),
        });

        const radioGroup = hmUI.createWidget(hmUI.widget.RADIO_GROUP, {
            x: 0,
            y: 0,
            w: px(420),
            h: px(80),
            check_func: (group, index, checked) => {
                if (checked) {
                    console.log(this.state.params.radio_data[index]);
                    storage.setKey(this.state.params.storageKey, this.state.params.radio_data[index]);
                }
            },
        });

        for (let i = 0; i < this.state.params.radio_data.length; i++) {
            const itemData = this.state.params.radio_data[i];
            buttonsGroup
                .createWidget(hmUI.widget.FILL_RECT, {
                    x: px(0),
                    y: px(0) + this.state.buttonOffset,
                    w: px(420),
                    h: px(80),
                    radius: px(10),
                    color: 0x1e1e1e,
                })
                .addEventListener(hmUI.event.CLICK_UP, () => {
                    radioGroup.setProperty(
                        hmUI.prop.CHECKED,
                        globalThis["radio_" + itemData]
                    );
                    zosRouter.back();

                });
            buttonsGroup
                .createWidget(hmUI.widget.TEXT, {
                    x: px(20),
                    y: px(23) + this.state.buttonOffset,
                    w: px(380),
                    h: px(35),
                    color: 0xffffff,
                    text_size: px(24),
                    align_h: hmUI.align.LEFT,
                    align_v: hmUI.align.CENTER_V,
                    text_style: hmUI.text_style.NONE,
                    text: itemData,
                })
                .setEnable(false);

            globalThis["radio_" + itemData] = radioGroup.createWidget(
                hmUI.widget.STATE_BUTTON,
                {
                    x: px(420 - 24),
                    y: px(180) + px(80 - 24) / 2 + this.state.buttonOffset,
                    w: px(24),
                    h: px(24),
                }
            );
            this.state.buttonOffset += px(80) + px(10);
            
        }
        radioGroup.setProperty(hmUI.prop.INIT, globalThis["radio_" + storage.getKey(this.state.params.storageKey)]);

        
    },
});

const Styles = {
    TITLE: {
        x: px(50),
        y: px(100),
        w: px(380),
        h: px(70),
        color: 0xffffff,
        text_size: px(48),
        align_h: hmUI.align.LEFT,
        align_v: hmUI.align.CENTER_V,
        text_style: hmUI.text_style.NONE,
},
};
