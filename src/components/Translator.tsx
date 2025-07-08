import { useState } from 'react'
import { translateText } from '../utils/translateText'

type Language = {
  code: string
  label: string
}

const LANGUAGES: Language[] = [
  { code: 'ar', label: 'العربية (ar)' },
  { code: 'de', label: 'Deutsch (de)' },
  { code: 'en', label: 'English (en)' },
  { code: 'es', label: 'Español (es)' },
  { code: 'hi', label: 'हिन्दी (hi)' },
  { code: 'ja', label: '日本語 (ja)' },
  { code: 'fr', label: 'Français (fr)' },
  { code: 'ko', label: '한국어 (ko)' },
  { code: 'it', label: 'Italiano (it)' },
  { code: 'pt', label: 'Português (pt)' },
  { code: 'ru', label: 'Русский (ru)' },
  { code: 'zh', label: '中文 (zh)' },
]

type TranslationsMap = {
  [langCode: string]: string
}

export default function Translator() {
  const [text, setText] = useState('')
  const [sourceLang, setSourceLang] = useState('es')
  const [targetLangs, setTargetLangs] = useState<string[]>(['en'])
  const [translations, setTranslations] = useState<TranslationsMap>({})
  const [loading, setLoading] = useState(false)

  const handleLangSelection = (langCode: string) => {
    setTargetLangs((prev) =>
      prev.includes(langCode)
        ? prev.filter((l) => l !== langCode)
        : [...prev, langCode]
    )
  }

  const translate = async () => {
    if (!text || targetLangs.length === 0) return
    setLoading(true)
    const newTranslations: TranslationsMap = {}

    for (const targetLang of targetLangs) {
      try {
        const resultText = await translateText({
          text,
          sourceLang,
          targetLang,
          // deepLApiKey: 'TU_API_KEY' // opcional
        })
        newTranslations[targetLang] = resultText
      } catch {
        newTranslations[targetLang] = '⚠️ Error al traducir'
      }
    }

    setTranslations(newTranslations)
    setLoading(false)
  }

  return (
    <div>
      <label>Texto a traducir:</label>
      <textarea rows={3} value={text} onChange={(e) => setText(e.target.value)} />

      <div>
        <label>Idioma de origen:</label>
        <select value={sourceLang} onChange={(e) => setSourceLang(e.target.value)}>
          {LANGUAGES.map((lang) => (
            <option key={lang.code} value={lang.code}>
              {lang.label}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label>Idiomas destino:</label>
        <div>
          {LANGUAGES.filter((l) => l.code !== sourceLang).map((lang) => (
            <label key={lang.code} style={{ marginRight: '1rem' }}>
              <input
                type="checkbox"
                value={lang.code}
                checked={targetLangs.includes(lang.code)}
                onChange={() => handleLangSelection(lang.code)}
              />
              {lang.label}
            </label>
          ))}
        </div>
      </div>

      <button onClick={translate} disabled={loading}>
        {loading ? 'Traduciendo...' : 'Traducir'}
      </button>

      {Object.keys(translations).length > 0 && (
        <>
          <h2>Traducciones:</h2>
          <table>
            <thead>
              <tr>
                <th>Idioma</th>
                <th>Traducción</th>
              </tr>
            </thead>
            <tbody>
              {Object.entries(translations).map(([lang, result]) => (
                <tr key={lang}>
                  <td>{LANGUAGES.find((l) => l.code === lang)?.label || lang}</td>
                  <td>{result}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}
    </div>
  )
}
