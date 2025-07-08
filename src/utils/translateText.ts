// const DEEPL_API_KEY = import.meta.env.VITE_DEEPL_API_KEY;

export async function translateText({
    text,
    sourceLang,
    targetLang,
}: {
    text: string;
    sourceLang: string;
    targetLang: string;
}): Promise<string> {
    // 1. Chrome AI API
    try {
        if (typeof window !== 'undefined' && 'Translator' in window) {
            // @ts-expect-error: Translator is not typed on window
            const translator = await window.Translator.create({
                sourceLanguage: sourceLang,
                targetLanguage: targetLang,
            });
            const result = await translator.translate(text);
            return typeof result === 'string' ? result : result.text;
        }
    } catch (e) {
        console.warn('Chrome API fallback:', e)
    }


    /*
    // 2. Google Translate (pública, sin clave)
    try {
        const res = await fetch(
            `https://translate.googleapis.com/translate_a/single?client=gtx&sl=${sourceLang}&tl=${targetLang}&dt=t&q=${encodeURIComponent(
                text
            )}`
        );
        const data = await res.json();
        return data[0][0][0];
    } catch (err) {
        console.warn('Google Translate fallback failed:', err);
    }

    // 3. DeepL fallback
    if (DEEPL_API_KEY) {
        try {
            const res = await fetch('https://api-free.deepl.com/v2/translate', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    Authorization: `DeepL-Auth-Key ${DEEPL_API_KEY}`,
                },
                body: new URLSearchParams({
                    text,
                    source_lang: sourceLang.toUpperCase(),
                    target_lang: targetLang.toUpperCase(),
                }),
            });
            const data = await res.json();
            if (data.translations?.[0]?.text) return data.translations[0].text;
        } catch (err) {
            console.warn('DeepL fallback failed:', err);
        }
    }
    */

    return '⚠️ Error al traducir';
}
