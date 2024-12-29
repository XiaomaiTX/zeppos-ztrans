import  { OpenAI }  from "./OpenAI";
import { Translated } from "./Translated";

const adaper = [OpenAI, Translated];
export function translate(params) {
    for (let i = 0; i < adaper.length; i++) {
        if (adaper[i].name === params.adaper) {
            console.log(adaper[i]);
            return adaper[i].translate(
                params.originalLang,
                params.targetLang,
                params.text
            );
        }
    }
}
