# 🌐 Traductor Multilenguaje con Fallbacks

[![Deploy to GitHub Pages](https://github.com/David7ce/translator-multilang/actions/workflows/deploy.yml/badge.svg)](https://github.com/David7ce/translator-multilang/actions/workflows/deploy.yml)

🔗 **Demo:** https://David7ce.github.io/translator-multilang/

Proyecto web desarrollado en **React + TypeScript** que permite traducir texto desde un idioma fuente a múltiples idiomas destino. Funciona en **cualquier navegador**, no solo Chrome:

- 🧠 **Chrome AI Translator API** (`window.Translator`) — solo Chrome 138+ con el flag/origin trial habilitado. Traduce local, sin red, cuando está disponible.
- 🟨 **Google Translate pública** (fetch sin clave) — fallback automático, es lo que corre en Firefox, Safari, Edge y Chrome sin la API experimental. Es el camino que usa la demo en producción.
- 🟦 DeepL — **no implementado** (ver Advertencias).

## 🚀 Características

- Traducción simultánea a múltiples idiomas seleccionables.
- UI sencilla con entrada de texto, selección de idioma fuente y checkboxes de idiomas destino.
- Funciona en cualquier navegador vía fallback a Google Translate; en Chrome con la API experimental habilitada, traduce local.
- Soporte para 12 idiomas populares.

## 🗂 Estructura del proyecto

```txt
src/
├── App.tsx              # Componente principal
├── index.tsx            # Entry point
├── index.css            # Estilos globales (CSS puro)
├── utils/
│   └── translateText.ts # Lógica de traducción con Chrome API y fallbacks
````

## 📦 Instalación

```bash
pnpm install   # o npm install / yarn
````

### 🧪 Desarrollo

```bash
pnpm dev
```

## 🌍 Idiomas soportados

- 🇸🇦 Árabe (`ar`)
- 🇩🇪 Alemán (`de`)
- 🇺🇸 Inglés (`en`)
- 🇪🇸 Español (`es`)
- 🇮🇳 Hindi (`hi`)
- 🇯🇵 Japonés (`ja`)
- 🇰🇷 Coreano (`ko`)
- 🇫🇷 Francés (`fr`)
- 🇮🇹 Italiano (`it`)
- 🇵🇹 Portugués (`pt`)
- 🇷🇺 Ruso (`ru`)
- 🇨🇳 Chino (`zh`)

## 🧪 Requisitos

- **Cualquier navegador moderno** con conexión a internet — usa el fallback de Google Translate.
- Opcional: **Google Chrome 138+** con la API `Translator` habilitada, para traducción local sin depender de Google Translate.

## ⚠️ Advertencias

- Solo Chrome expone `window.Translator`. En el resto de navegadores (Firefox, Safari, Edge) esa rama del código se salta directo al fallback de Google Translate — comportamiento esperado, no es un bug.
- Aun en Chrome, la API es experimental y puede requerir **interacción del usuario** para iniciar la descarga de modelos, o no estar disponible según versión/flags. Si falla o no existe, cae al mismo fallback.
- Si el modelo aún no está descargado (`downloading` o `downloadable`), se evitan errores usando `isAvailable()` antes de crear el traductor.
- El fallback de Google Translate usa un endpoint público no oficial (`translate_a/single`); puede cambiar o dar rate-limit sin aviso.
- **DeepL no está implementado**: la API no admite CORS desde navegador, y una clave `VITE_*` quedaría expuesta en el bundle público (cualquiera puede leerla en el JS servido). Para sumar DeepL habría que meter un backend/proxy que guarde la clave server-side.

## 🚀 Despliegue en GitHub Pages

El repo incluye workflow `.github/workflows/deploy.yml`: en cada push a `main` corre `npm ci && npm run build` y publica `dist/` en GitHub Pages via Actions.

Pasos únicos en GitHub (Settings → Pages → Source): elegir **GitHub Actions**. No hace falta rama `gh-pages` ni configuración extra — `vite.config.ts` ya usa `base: './'` (rutas relativas, funciona en cualquier subpath).

`.github/workflows/ci.yml` corre lint + build en cada PR contra `main`.
