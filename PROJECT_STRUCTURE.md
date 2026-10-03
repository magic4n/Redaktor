# Project Structure

Complete Redaktor project structure and file organization.

```
redaktor/
├── src/
│   ├── components/                    # Reusable UI components
│   │   ├── Button.tsx                # Material 3 button
│   │   ├── TextField.tsx             # Input fields
│   │   ├── TextArea.tsx              # Textarea component
│   │   ├── Snackbar.tsx              # Notifications
│   │   ├── ToolShell.tsx             # Tool wrapper layout
│   │   ├── ToolCard.tsx              # Tool grid card
│   │   └── __init__.ts               # Component exports
│   │
│   ├── tools/                         # Tool implementations (25+)
│   │   ├── RemoveDuplicates.tsx
│   │   ├── FindReplace.tsx
│   │   ├── ChangeCase.tsx
│   │   ├── SortLines.tsx
│   │   ├── ExtractEmails.tsx
│   │   ├── ExtractURLs.tsx
│   │   ├── Base64.tsx
│   │   ├── HashGenerator.tsx
│   │   ├── RegexTester.tsx
│   │   ├── CSVToJSON.tsx
│   │   ├── JSONToCSV.tsx
│   │   ├── JSONFormatter.tsx
│   │   ├── JSONValidator.tsx
│   │   ├── TextStats.tsx
│   │   ├── URLEncode.tsx
│   │   ├── Escape.tsx
│   │   ├── UUIDGenerator.tsx
│   │   ├── RandomString.tsx
│   │   ├── PasswordStrength.tsx
│   │   ├── Morse.tsx
│   │   ├── Caesar.tsx
│   │   ├── LoremIpsum.tsx
│   │   ├── RemoveEmpty.tsx
│   │   ├── TrimLines.tsx
│   │   └── ColorPicker.tsx
│   │
│   ├── utils/                         # Utility functions
│   │   ├── text.ts                   # Text processing (20+ functions)
│   │   ├── csv.ts                    # CSV/TSV parsing and conversion
│   │   ├── encode.ts                 # Encoding utilities
│   │   ├── crypto.ts                 # Hash functions
│   │   └── __tests__/                # Unit tests
│   │       ├── text.test.ts
│   │       ├── csv.test.ts
│   │       └── encode.test.ts
│   │
│   ├── locales/                       # i18n translations
│   │   ├── en.json                   # English (500+ keys)
│   │   └── ru.json                   # Russian (500+ keys)
│   │
│   ├── types/                         # TypeScript types
│   │   └── tool.ts                   # Tool interfaces
│   │
│   ├── App.tsx                        # Main app component
│   ├── store.ts                       # Zustand state management
│   ├── i18n.ts                        # i18next configuration
│   ├── index.css                      # Global styles & Material You 3
│   └── main.tsx                       # Entry point
│
├── tests/
│   └── e2e/                           # Playwright E2E tests
│       └── example.spec.ts
│
├── public/                            # Static assets
│   └── (favicon, etc)
│
├── dist/                              # Build output (created by npm run build)
│
├── Configuration Files
│   ├── package.json                   # Dependencies & scripts
│   ├── vite.config.ts                 # Vite configuration
│   ├── tsconfig.json                  # TypeScript config
│   ├── tsconfig.node.json             # TS config for Vite
│   ├── tailwind.config.js             # Tailwind CSS config
│   ├── postcss.config.js              # PostCSS config
│   ├── vitest.config.ts               # Unit test config
│   ├── playwright.config.ts           # E2E test config
│   ├── .eslintrc.json                 # ESLint config
│   ├── .prettierrc                    # Prettier config
│   └── .gitignore                     # Git ignore rules
│
├── Documentation
│   ├── README.md                      # Main readme (English)
│   ├── README.ru.md                   # Russian version
│   ├── TOOLS.md                       # Tools reference (English)
│   ├── TOOLS.ru.md                    # Tools reference (Russian)
│   ├── DEPLOYMENT.md                  # Deployment guide (English)
│   ├── DEPLOYMENT.ru.md               # Deployment guide (Russian)
│   ├── CONTRIBUTING.md                # Developer guide
│   ├── PROJECT_STRUCTURE.md           # This file
│   ├── LICENSE                        # MIT license
│   └── CHANGELOG.md                   # Version history
```

## Key Files Explained

### src/App.tsx
**Main application component**
- Tool grid layout
- Navigation and search
- Settings panel
- Language switching
- Favorites management

### src/store.ts
**Zustand state management**
- User settings (theme, language, color)
- Recent tools history
- Favorite tools list
- localStorage persistence

### src/components/ToolShell.tsx
**Wrapper for all tools**
- Input/output areas
- Action buttons (copy, download, swap, clear)
- Options panel
- Results display

### src/utils/text.ts
**Core text processing functions**
- Line manipulation (dedupe, sort, reverse)
- Case conversion
- Pattern extraction (emails, URLs, IPs)
- Statistics calculation
- Text encoding/escaping

### src/utils/csv.ts
**CSV/TSV processing**
- CSV parsing with quote handling
- Delimiter detection
- Format conversion (JSON, TSV)
- Data manipulation (transpose, dedupe)
- Column statistics

### src/utils/encode.ts
**Encoding utilities**
- Base64, URL encoding
- HTML/JSON/SQL escaping
- Caesar cipher, ROT13
- Various hash and escape functions

## Build Output Structure

After `npm run build`, the `dist/` directory contains:

```
dist/
├── index.html               # Minified HTML
├── assets/
│   ├── index-<hash>.js     # Main bundle
│   ├── vendor-<hash>.js    # Vendor chunk
│   └── styles-<hash>.css   # Compiled CSS
└── manifest.json            # Build manifest
```

## Testing Structure

### Unit Tests
- Located in `src/utils/__tests__/`
- Run with `npm run test`
- Cover: text processing, CSV parsing, encoding

### E2E Tests
- Located in `tests/e2e/`
- Run with `npm run test:e2e`
- Use Playwright for browser testing

## Configuration Hierarchy

1. **TypeScript** (`tsconfig.json`)
   - Strict mode enabled
   - Path aliases (@/)
   - Target ES2020

2. **Vite** (`vite.config.ts`)
   - React plugin
   - Code splitting configuration
   - Development server settings

3. **Tailwind** (`tailwind.config.js`)
   - M3 color tokens
   - Typography scale
   - Border radius utilities

4. **i18next** (`src/i18n.ts`)
   - Language detection
   - Resource loading
   - Persistence to localStorage

## Development Workflow

```
1. npm install          # Install dependencies
2. npm run dev          # Start dev server
3. Edit files in src/   # Make changes
4. Tests run on save    # Vitest watches
5. npm run lint         # Check code style
6. npm run build        # Production build
```

## File Naming Conventions

- **Components:** PascalCase (e.g., `RemoveDuplicates.tsx`)
- **Utils:** lowercase (e.g., `text.ts`)
- **Tests:** `<name>.test.ts` or `<name>.spec.ts`
- **Types:** PascalCase in `types/`
- **Locales:** `<language>.json`

## Import Aliases

```typescript
// Use this:
import { Button } from '@/components/Button'
import { changeCase } from '@/utils/text'

// Instead of:
import { Button } from '../../../components/Button'
import { changeCase } from '../../../utils/text'
```

## Size Breakdown

- Gzip: ~150 KB
  - React + DOM: ~40 KB
  - Tailwind: ~30 KB
  - App code: ~40 KB
  - i18next: ~20 KB
  - Other: ~20 KB

## Performance Metrics

- **Build time:** ~2 seconds
- **Dev server start:** <1 second
- **Page load:** <2 seconds
- **Interactive:** <2.5 seconds
- **Lighthouse score:** 95+

---

See [README.md](./README.md) for more information.
