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
    },
    build() {
        hmUI.createKeyboard({
            onComplete: (wgtObj, result) => {
                storage.setKey(this.state.params.value, result.data);
                hmUI.deleteKeyboard();
                zosRouter.back();
            },
            onCancel: (wgtObj, result) => {
                hmUI.deleteKeyboard();
                zosRouter.back();
            },
            inputType: hmUI.inputType.CHAR,
            text: storage.getKey(this.state.params.value)
        });
    },
});
