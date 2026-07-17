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

    // 3. DeepL fallback: requiere backend/proxy — no viable client-side
    // (la API Key en VITE_* quedaría expuesta en el bundle público, y el
    // endpoint de DeepL no admite CORS desde navegador).

    return '⚠️ Error al traducir';
}
