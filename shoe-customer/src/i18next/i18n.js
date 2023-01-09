import i18next from "i18next";
import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import TokenService from "src/services/TokenService";
import English from "./eng.json";
import Vietnamese from "./vie.json";

const resources = {
    eng: {
        translation: English,
    },
    vie: {
        translation: Vietnamese,
    },
};


const dataLanguage = TokenService.getLocalLanguage();

i18next
    .use(initReactI18next)
    .init({
        resources,
        lng: dataLanguage || "vie",
        keySeparator: false,
        interpolation: {
            escapeValue: false,
        },
    })

export default i18n;