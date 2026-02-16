import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { translations } from "../data/translations";

type Language = "es" | "en";
type Translations = typeof translations.es;

interface LanguageContextType {
    language: Language;
    setLanguage: (lang: Language) => void;
    t: Translations;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
    const [language, setLanguage] = useState<Language>(() => {
        // Try to get from localStorage, default to 'es'
        const saved = localStorage.getItem("language");
        return (saved === "es" || saved === "en") ? saved : "es";
    });

    useEffect(() => {
        localStorage.setItem("language", language);
    }, [language]);

    const value = {
        language,
        setLanguage,
        t: translations[language],
    };

    return (
        <LanguageContext.Provider value={value}>
            {children}
        </LanguageContext.Provider>
    );
};

export const useLanguage = () => {
    const context = useContext(LanguageContext);
    if (context === undefined) {
        throw new Error("useLanguage must be used within a LanguageProvider");
    }
    return context;
};
