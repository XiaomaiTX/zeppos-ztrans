import { getText } from "@zos/i18n";
import { px } from "@zos/utils";
import * as hmUI from "@zos/ui";

export const TITLE_STYLE = {
    x: px(0),
    y: px(30),
    w: px(480),
    h: px(35),
    color: 0xffffff,
    text_size: px(24),
    align_h: hmUI.align.CENTER_H,
    align_v: hmUI.align.CENTER_V,
    text_style: hmUI.text_style.NONE,
    text: "HELLO, Zepp OS",
};

export const ORIGIN_BUTTON_STYLE = {
    x: px(30),
    y: px(90),
    w: px(190),
    h: px(60),
    radius: px(10),
    normal_color: 0x1e1e1e,
    press_color: 0x1e1e1e,
    color: 0xffffff,
    text_size: px(24),
    text: "Origin",
};
export const TRANS_ARROW_STYLE = {
    x: px(228),
    y: px(108),
    src: "trans-arrow.png",
};

export const TAGET_BUTTON_STYLE = {
    x: px(260),
    y: px(90),
    w: px(190),
    h: px(60),
    radius: px(10),
    normal_color: 0x1e1e1e,
    press_color: 0x1e1e1e,
    text_size: px(24),
    color: 0xffffff,
    text: "Target",
};

export const TEXT_CONTAINER_STYLE = {
    x: px(30),
    y: px(160),
    w: px(420),
    h: px(200),
    radius: px(10),
    color: 0x262626,
};

export const ORIGIN_TEXT_STYLE = {
    x: TEXT_CONTAINER_STYLE.x + px(20),
    y: TEXT_CONTAINER_STYLE.y + px(10),
    w: TEXT_CONTAINER_STYLE.w - px(40),
    h: px(35),
    text_style: hmUI.text_style.WRAP,
    text_size: px(24),
    color: 0x9E9E9E,
    text: getText("home.origin-text.placeholder"),
};
export const DILIVDING_LINE_STYLE = {
    x: TEXT_CONTAINER_STYLE.x + px(20),
    y: TEXT_CONTAINER_STYLE.y + px(60),
    w: px(380),
    h: px(2),
    color: 0x787878,
};

export const TARGET_TEXT_STYLE = {
    x: TEXT_CONTAINER_STYLE.x + px(20),
    y: TEXT_CONTAINER_STYLE.y + px(77),
    w: TEXT_CONTAINER_STYLE.w - px(40),
    h: px(35),
    text_style: hmUI.text_style.WRAP,
    text_size: px(24),
    color: 0x0092ed,
    text: "Target",
};

export const SETTINGS_BUTTON_STYLE = {
    x: px(208),
    y: px(396),
    w: -1,
    h: -1,
    normal_src: "settings.png",
    press_src: "settings.png",
    click_func: () => {
        console.log("button click");
    },
};
