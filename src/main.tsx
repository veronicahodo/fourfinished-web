import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import i18n from "i18next";
import { I18nextProvider, initReactI18next } from "react-i18next";
import Backend from "i18next-http-backend";
import LanguageDetector from "i18next-browser-languagedetector";

i18n.use(Backend)
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
        fallbackLng: "en",
        debug: true,
        ns: ["common", "error", "list", "login", "modal", "widget"],
        defaultNS: "common",
        backend: {
            loadPath: "/lang/{{lng}}/{{ns}}.json",
        },
        interpolation: {
            escapeValue: false,
        },
    });

createRoot(document.getElementById("root")!).render(
    <StrictMode>
        <I18nextProvider i18n={i18n}>
            <App />
        </I18nextProvider>
    </StrictMode>
);
