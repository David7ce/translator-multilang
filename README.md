# 🌐 Traductor Multilenguaje con Fallbacks

Proyecto web desarrollado en **React + TypeScript** que permite traducir texto desde un idioma fuente a múltiples idiomas destino, utilizando:

- 🧠 **Chrome AI Translator API (experimental)**
- 🟨 Fallback a **Google Translate pública**
- 🟦 Fallback opcional a **DeepL API**

## 🚀 Características

- Traducción simultánea a múltiples idiomas seleccionables.
- UI sencilla con entrada de texto, selección de idioma fuente y checkboxes de idiomas destino.
- Uso de la API experimental `window.Translator` de Chrome cuando está disponible.
- Fallbacks automáticos si la API de Chrome no está disponible o lista.
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

- Google Chrome versión **138 o superior** para usar la API local `Translator.create()`.
- Conexión a internet si se desea usar los fallbacks externos.
- (Opcional) API Key de DeepL si se quiere usar como segundo fallback.

## ⚠️ Advertencias

- La API de Chrome está en fase experimental y puede requerir **interacción del usuario** para iniciar la descarga de modelos.
- Si el modelo aún no está descargado (`downloading` o `downloadable`), se evitarán errores usando `isAvailable()` antes de crear el traductor.

## 🛠 Configuración de DeepL (opcional)

Para usar DeepL como fallback, proporciona tu clave API en una variable o archivo `.env`:

```env
VITE_DEEPL_API_KEY=tu_clave_aqui
```

Y pásala como parámetro a la función `translateText`.
