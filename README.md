# Redaktor 🎯

**Redaktor** is a universal tool for working with text, CSV, JSON, and structured data. The application runs 100% locally in the browser — no server, no uploads, no telemetry.

English | [Русский](./README.ru.md)

[Latest version here: redaktor.luna-app.space](https://redaktor.luna-app.space)

## ✨ Features

- 🌍 **Fully Local** — everything runs in the browser, data never leaves your device
- 🚀 **Fast** — handle large files with Web Workers without freezing the UI
- 🔒 **Secure** — no server, no data transmission, no tracking
- 🌐 **Multi-language** — Full English and Russian support
- 🎨 **Material Design 3** — beautiful, modern interface
- 💾 **Local Storage** — your settings are preserved
- 📱 **Responsive** — works on mobile and desktop
- ⚡ **Lightweight** — minimal bundle size

## 🛠️ 25+ Tools

### 📝 Text Tools
- **Remove Duplicates** — eliminate duplicate lines
- **Find & Replace** — search and replace with regex support
- **Change Case** — convert to UPPERCASE, lowercase, Title Case, camelCase, snake_case, kebab-case, CONSTANT_CASE
- **Sort Lines** — alphabetical, by length, natural, random, or reverse
- **Extract Emails** — find all email addresses
- **Extract URLs** — find all links
- **Remove Empty Lines** — clean up whitespace
- **Trim Lines** — remove leading/trailing spaces
- **Text Statistics** — word count, character count, readability metrics
- **Base64** — encode/decode
- **URL Encode/Decode** — percent encoding
- **Escape/Unescape** — HTML, JSON, SQL, Regex escaping
- **Hash Generator** — SHA-1, SHA-256, SHA-512
- **Caesar Cipher** — shift cipher
- **Morse Code** — encode/decode

### 📊 CSV/TSV Tools
- **CSV ↔ JSON** — bidirectional conversion
- **Auto-detect delimiter** — comma, semicolon, tab, pipe, custom
- **Support for quoted values** and special characters

### 🔗 JSON/YAML/XML
- **JSON Formatter** — pretty-print and minify
- **JSON Validator** — syntax checking with error reporting
- **Sort keys** for better readability
- **Structure analysis**

### 🔧 Utilities
- **Regex Tester** — test patterns with live preview and group capture
- **Color Picker** — convert HEX ↔ RGB ↔ HSL ↔ CMYK
- **UUID/ULID/NanoID Generator** — generate unique identifiers
- **Random String** — customizable random text generator
- **Password Strength** — check password security
- **Lorem Ipsum** — generate placeholder text

## 🚀 Quick Start

### Installation

```bash
git clone https://github.com/yourusername/redaktor.git
cd redaktor
npm install
```

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

### Production Build

```bash
npm run build
```

Output in `dist/` directory

## 📦 Deployment

### Cloudflare Pages (Recommended)

1. Fork the repository on GitHub
2. Go to Cloudflare Dashboard → Pages
3. Create Project → Connect to Git
4. Select your repository
5. Set build settings:
   - Build command: `npm run build`
   - Build output directory: `dist`
6. Click Deploy!

[Full Deployment Guide](./DEPLOYMENT.md)

### Other Platforms
- **Vercel** — zero-config deployment
- **GitHub Pages** — static hosting
- **AWS S3 + CloudFront** — global CDN
- **Docker** — containerized
- **Self-hosted** — Nginx/Apache

## 📚 Documentation

**Quick Start**
- [README.md](./README.md) — this file (English)
- [README.ru.md](./README.ru.md) — Russian version

**Tools & Usage**
- [TOOLS.md](./TOOLS.md) — complete tool reference (English)
- [TOOLS.ru.md](./TOOLS.ru.md) — complete tool reference (Russian)

**Deployment & Setup**
- [DEPLOYMENT.md](./DEPLOYMENT.md) — deployment guide (English)
- [DEPLOYMENT.ru.md](./DEPLOYMENT.ru.md) — deployment guide (Russian)

**Development**
- [CONTRIBUTING.md](./CONTRIBUTING.md) — developer guidelines
- [PROJECT_STRUCTURE.md](./PROJECT_STRUCTURE.md) — project architecture

**Reference**
- [CHANGELOG.md](./CHANGELOG.md) — version history
- [LICENSE](./LICENSE) — MIT license

## 🛠️ Tech Stack

```
React 18 + TypeScript
├── Vite — fast build tool
├── Tailwind CSS — utility-first styling
├── Material You 3 — design system
├── i18next — internationalization
├── Zustand — state management
└── Vitest & Playwright — testing
```

## 📊 Performance

- **Bundle size:** ~150 KB (compressed)
- **Time to Interactive:** < 2 seconds
- **Lighthouse Score:** 95+
- **File support:** up to browser memory limit

## 🧪 Testing

```bash
# Unit tests
npm run test

# Test UI
npm run test:ui

# E2E tests
npm run test:e2e

# Linting
npm run lint

# Type checking
npm run type-check
```

## 🎨 Customization

### Change Brand Color

In `src/index.css`:
```css
:root {
  --md-sys-color-primary: #0061A4;  /* Change to your color */
}
```

### Add New Language

1. Create `src/locales/de.json` (German, for example)
2. Update `src/i18n.ts`:
```typescript
import deLocale from './locales/de.json'

i18n.init({
  resources: {
    en: { translation: enLocale },
    ru: { translation: ruLocale },
    de: { translation: deLocale },  // New language
  }
})
```

## 🤝 Contributing

We welcome pull requests! For major changes, please open an issue first.

[Developer Guide](./CONTRIBUTING.md)

### Adding a New Tool

1. Create component in `src/tools/MyTool.tsx`
2. Add utilities in `src/utils/`
3. Register in `src/App.tsx`
4. Add translations to `src/locales/en.json` and `ru.json`
5. Write tests in `src/utils/__tests__/`

## 📋 License

MIT License — free for commercial and personal use

See [LICENSE](./LICENSE) for details

## ❓ FAQ

**Q: Where are my files uploaded?**
A: Nowhere! Everything processes locally in your browser.

**Q: Does it work offline?**
A: Yes! After the first load, it works completely offline.

**Q: How fast is it?**
A: Very fast! Large files are processed with Web Workers so the UI never freezes.

**Q: Can I use it in enterprise?**
A: Yes! MIT license allows commercial use.

**Q: What's the file size limit?**
A: Limited only by your browser's memory (usually 500MB+).

**Q: Is my data safe?**
A: Yes! No data transmission, no tracking, 100% local processing.

## 🐛 Bug Reports

Found a bug? [Create an issue on GitHub](https://github.com/yourusername/redaktor/issues)

## 💬 Discussions

Questions or ideas? [GitHub Discussions](https://github.com/yourusername/redaktor/discussions)

## 📞 Contact

- GitHub: [@yourusername](https://github.com/yourusername)
- Issues: [GitHub Issues](https://github.com/yourusername/redaktor/issues)
- Email: your.email@example.com

## 🎉 Support

Love Redaktor? Please star ⭐ us on GitHub!

---

**Redaktor** — Your universal tool for working with text and data! 🚀

Made with ❤️ for developers and data enthusiasts everywhere.
