# Redaktor 🎯

**Redaktor** — это универсальный инструмент для работы с текстом, CSV, JSON и структурированными данными. Приложение работает 100% локально в браузере — данные никогда не отправляются на сервер, нет телеметрии и аналитики.

[English](./README.md) | Русский

[Последняя версия: redaktor.luna-app.space](https://redaktor.luna-app.space)

## ✨ Особенности

- 🌍 **Полностью локальный** — все обрабатывается в браузере, данные не покидают ваше устройство
- 🚀 **Быстрый** — обработка больших файлов с использованием Web Workers
- 🔒 **Безопасный** — нет сервера, нет отправки данных, нет отслеживания
- 🌐 **Многоязычный** — полная поддержка английского и русского
- 🎨 **Material Design 3** — красивый современный интерфейс
- 💾 **Локальное хранилище** — сохранение ваших настроек
- 📱 **Адаптивный** — работает на мобильных и десктопных устройствах
- ⚡ **Без зависимостей** — минимальный размер бандла

## 🛠️ 25+ Инструментов

### 📝 Работа с текстом
- Remove Duplicates — удаление дубликатов строк
- Find & Replace — поиск и замена с regex
- Change Case — преобразование регистра
- Sort Lines — сортировка строк (A-Z, по длине, случайно)
- Extract Emails — извлечение email адресов
- Extract URLs — извлечение ссылок
- Remove Empty Lines — удаление пустых строк
- Trim Lines — обрезание пробелов
- Text Statistics — анализ текста (слова, символы, строки)
- Base64 — кодирование/декодирование
- URL Encode/Decode — работа с URL
- Escape/Unescape — экранирование символов
- Hash Generator — SHA-256, SHA-512, SHA-1
- Caesar Cipher — шифр Цезаря
- Morse Code — код Морзе

### 📊 CSV/TSV
- CSV ↔ JSON — конвертация в обе стороны
- Автоматическое определение разделителя
- Поддержка quoted values и специальных символов

### 🔗 JSON
- JSON Formatter — форматирование и минификация
- JSON Validator — проверка синтаксиса
- Сортировка ключей
- Подсчёт структур

### 🔧 Утилиты
- Regex Tester — тестирование регулярных выражений
- Color Picker — конвертация цветов (HEX, RGB, HSL, CMYK)
- UUID/ULID/NanoID Generator — генерирование идентификаторов
- Random String — случайные строки
- Password Strength — проверка прочности пароля
- Lorem Ipsum — генератор текста-заполнителя

## 🚀 Быстрый старт

### Установка

```bash
git clone https://github.com/yourusername/redaktor.git
cd redaktor
npm install
```

### Разработка

```bash
npm run dev
```

Откройте [http://localhost:3000](http://localhost:3000)

### Сборка для production

```bash
npm run build
```

Результат в папке `dist/`

## 📦 Развёртывание

### Cloudflare Pages (рекомендуется)

1. Fork репозиторий на GitHub
2. Перейдите в Cloudflare Dashboard → Pages
3. Create Project → Connect to Git
4. Выберите репозиторий
5. Установите:
   - Build command: `npm run build`
   - Build output: `dist`
6. Deploy!

[Подробная инструкция](./DEPLOYMENT.md)

### Другие платформы
- **Vercel** — полная поддержка
- **GitHub Pages** — статический хост
- **AWS S3 + CloudFront** — глобальная CDN
- **Docker** — контейнеризация
- **Собственный сервер** — с Nginx или Apache

## 📚 Документация

**Быстрый старт**
- [README.md](./README.md) — английская версия
- [README.ru.md](./README.ru.md) — этот файл

**Инструменты и использование**
- [TOOLS.md](./TOOLS.md) — справочник инструментов (English)
- [TOOLS.ru.md](./TOOLS.ru.md) — справочник инструментов (Русский)

**Развёртывание и настройка**
- [DEPLOYMENT.md](./DEPLOYMENT.md) — гайд развёртывания (English)
- [DEPLOYMENT.ru.md](./DEPLOYMENT.ru.md) — гайд развёртывания (Русский)

**Разработка**
- [CONTRIBUTING.md](./CONTRIBUTING.md) — гайд для разработчиков
- [PROJECT_STRUCTURE.md](./PROJECT_STRUCTURE.md) — архитектура проекта

**Справочник**
- [CHANGELOG.md](./CHANGELOG.md) — история версий
- [LICENSE](./LICENSE) — лицензия MIT

## 🛠️ Технологический стек

```
React 18 + TypeScript
├── Vite — быстрая сборка
├── Tailwind CSS — стилизация
├── Material You 3 — дизайн система
├── i18next — локализация
├── Zustand — управление состоянием
└── Vitest & Playwright — тестирование
```

## 📊 Производительность

- **Размер бандла:** ~150 KB (сжато)
- **Time to Interactive:** < 2 сек
- **Lighthouse Score:** 95+
- **Поддержка файлов:** до лимита памяти браузера

## 🧪 Тестирование

```bash
# Unit тесты
npm run test

# UI для тестов
npm run test:ui

# E2E тесты
npm run test:e2e

# Проверка кода
npm run lint
npm run type-check
```

## 🎨 Кастомизация

### Изменение цвета бренда

В `src/index.css`:
```css
:root {
  --md-sys-color-primary: #0061A4;  /* Измените на свой */
}
```

### Добавление нового языка

1. Создайте `src/locales/de.json` (немецкий, например)
2. Добавьте в `src/i18n.ts`:
```typescript
import deLocale from './locales/de.json'

i18n.init({
  resources: {
    en: { translation: enLocale },
    ru: { translation: ruLocale },
    de: { translation: deLocale },  // Новый язык
  }
})
```

## 🤝 Вклад в проект

Приветствуем pull requests! Для больших изменений сначала откройте issue.

[Гайд для разработчиков](./CONTRIBUTING.md)

### Добавление нового инструмента

1. Создайте компонент в `src/tools/MyTool.tsx`
2. Добавьте утилиты в `src/utils/`
3. Зарегистрируйте в `src/App.tsx`
4. Добавьте локализацию в `src/locales/en.json` и `ru.json`
5. Напишите тесты

## 📋 Лицензия

MIT — свободен для коммерческого и личного использования

Подробнее: [LICENSE](./LICENSE)

## ❓ FAQ

**Q: Куда загружаются мои данные?**
A: Нигде! Все обрабатывается в браузере, данные не передаются серверу.

**Q: Работает ли оффлайн?**
A: Да! После первой загрузки приложение работает в оффлайн режиме.

**Q: Как быстро работает?**
A: Очень быстро! Большие файлы обрабатываются Web Workers без зависания интерфейса.

**Q: Можно ли использовать в корпоративной среде?**
A: Да, лицензия MIT позволяет коммерческое использование.

**Q: Поддерживаются ли большие файлы?**
A: Да, до лимита памяти браузера (обычно 500MB+).

## 🐛 Сообщить об ошибке

Обнаружили баг? [Создайте issue на GitHub](https://github.com/yourusername/redaktor/issues)

## 💬 Обсуждения

Есть вопросы или идеи? [GitHub Discussions](https://github.com/yourusername/redaktor/discussions)

## 📞 Контакты

- GitHub: [@yourusername](https://github.com/yourusername)
- Issues: [GitHub Issues](https://github.com/yourusername/redaktor/issues)
- Email: your.email@example.com

## 🎉 Спасибо!

Спасибо за использование Redaktor! Если вам понравилось, поставьте ⭐ на GitHub

---

**Redaktor** — твой универсальный помощник для работы с данными! 🚀

Сделано с ❤️ для разработчиков и всех, кто работает с текстом и данными.
