# Развёртывание Redaktor

Это руководство описывает различные способы развёртывания Redaktor.

## 1. Cloudflare Pages (рекомендуется)

Cloudflare Pages — это лучший выбор для развёртывания Redaktor благодаря:
- Бесплатному хостингу с отличной производительностью
- Глобальной CDN
- Быстрой сборке и развёртыванию
- SSL по умолчанию

### Шаг 1: Подготовка GitHub репозитория

```bash
# Клонируйте проект
git clone <ваш-repo> redaktor
cd redaktor

# Инициализируйте Git (если нужно)
git init
git add .
git commit -m "Initial commit: Redaktor application"
git branch -M main
git remote add origin https://github.com/yourusername/redaktor.git
git push -u origin main
```

### Шаг 2: Подключение Cloudflare Pages

1. Перейдите на [Cloudflare Dashboard](https://dash.cloudflare.com/)
2. Выберите **Pages** в левом меню
3. Кликните **Create a project** → **Connect to Git**
4. Авторизуйтесь в GitHub и выберите ваш репозиторий
5. В настройках сборки установите:
   - **Framework preset:** None
   - **Build command:** `npm run build`
   - **Build output directory:** `dist`
   - **Environment variables:** (опционально)
6. Кликните **Save and Deploy**

### Шаг 3: Собственный домен (опционально)

1. После успешного развёртывания перейдите в **Settings**
2. Найдите **Custom domains**
3. Добавьте ваш домен и следуйте инструкциям по настройке DNS

## 2. Vercel

Vercel — отличная альтернатива Cloudflare Pages.

### Шаги:

1. Перейдите на [vercel.com](https://vercel.com)
2. Кликните **New Project**
3. Импортируйте GitHub репозиторий
4. Установите:
   - **Framework Preset:** Vite
   - **Build Command:** `npm run build`
   - **Output Directory:** `dist`
5. Кликните **Deploy**

## 3. GitHub Pages

GitHub Pages подходит для статических сайтов.

### Шаги:

1. В `vite.config.ts` добавьте:
```typescript
export default defineConfig({
  base: '/redaktor/',  // если репозиторий называется redaktor
  // ... остальная конфигурация
})
```

2. В `package.json` добавьте:
```json
{
  "scripts": {
    "deploy": "npm run build && gh-pages -d dist"
  }
}
```

3. Установите `gh-pages`:
```bash
npm install --save-dev gh-pages
```

4. Развёртывание:
```bash
npm run deploy
```

5. В GitHub Settings → Pages выберите ветку `gh-pages`

## 4. Docker развёртывание

### Dockerfile

```dockerfile
# Build stage
FROM node:18-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

# Production stage
FROM node:18-alpine
RUN npm install -g serve
WORKDIR /app
COPY --from=builder /app/dist ./dist
EXPOSE 3000
CMD ["serve", "-s", "dist", "-l", "3000"]
```

### Сборка и запуск:

```bash
# Сборка образа
docker build -t redaktor:latest .

# Запуск контейнера
docker run -p 3000:3000 redaktor:latest

# Или с Docker Compose
cat > docker-compose.yml << 'EOF'
version: '3.8'
services:
  redaktor:
    build: .
    ports:
      - "3000:3000"
EOF

docker-compose up
```

## 5. Собственный сервер (VPS/Dedicate)

### С Nginx

```nginx
server {
    listen 80;
    server_name redaktor.example.com;

    # Redirect to HTTPS
    return 301 https://$server_name$request_uri;
}

server {
    listen 443 ssl http2;
    server_name redaktor.example.com;

    # SSL certificates (используйте Let's Encrypt)
    ssl_certificate /etc/letsencrypt/live/redaktor.example.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/redaktor.example.com/privkey.pem;

    root /var/www/redaktor;
    index index.html;

    # Cache busting для JS/CSS
    location ~* \.(js|css)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }

    # HTML не кешируем
    location ~* \.html?$ {
        expires -1;
        add_header Cache-Control "public, must-revalidate";
    }

    # SPA routing
    location / {
        try_files $uri $uri/ /index.html;
    }
}
```

### Развёртывание:

```bash
# Сборка
npm run build

# Копирование на сервер
scp -r dist/* user@server:/var/www/redaktor/

# На сервере
cd /var/www/redaktor
sudo chown -R www-data:www-data .
sudo systemctl restart nginx
```

## 6. AWS S3 + CloudFront

### Шаги:

1. **Создайте S3 бакет:**
```bash
aws s3 mb s3://redaktor-app
```

2. **Загрузите файлы:**
```bash
npm run build
aws s3 sync dist/ s3://redaktor-app --delete
```

3. **Создайте CloudFront распределение:**
   - В AWS Console → CloudFront → Create distribution
   - Source domain: ваш S3 бакет
   - Default root object: `index.html`

4. **Настройте редирект 404:**
   - Error responses → Create custom error response
   - 404 → Custom error page path: `/index.html`

## 7. Переменные окружения

Для разных платформ развёртывания:

### .env.production

```env
VITE_API_BASE=https://api.example.com
VITE_APP_VERSION=1.0.0
```

### В коде:

```typescript
const apiBase = import.meta.env.VITE_API_BASE || 'https://localhost:3000'
```

## Оптимизация для production

### 1. Минимизация размера

```bash
npm run build --report
```

### 2. Кэширование

```typescript
// vite.config.ts
build: {
  rollupOptions: {
    output: {
      manualChunks: {
        vendor: ['react', 'react-dom'],
        i18n: ['i18next', 'react-i18next'],
      }
    }
  }
}
```

### 3. Сжатие

Включите gzip сжатие на сервере (обычно автоматически на Cloudflare/Vercel)

## Мониторинг

### Sentry для отслеживания ошибок

```typescript
import * as Sentry from "@sentry/react"

Sentry.init({
  dsn: "your-sentry-dsn",
  environment: "production"
})
```

### Google Analytics

```html
<!-- В index.html -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_ID');
</script>
```

## Checklist перед production

- [ ] Все тесты проходят (`npm run test`)
- [ ] Нет TypeScript ошибок (`npm run type-check`)
- [ ] Lint проверка пройдена (`npm run lint`)
- [ ] Production build создаётся успешно (`npm run build`)
- [ ] Размер bundle оптимален
- [ ] PWA работает (Service Worker)
- [ ] Производительность проверена (Lighthouse)
- [ ] SEO оптимизирован (meta tags)
- [ ] SSL сертификат установлен
- [ ] CDN настроен
- [ ] Резервная копия базы данных готова
- [ ] Мониторинг активирован
- [ ] Логирование настроено

## Типичные проблемы

### Build завалился на Cloudflare Pages

**Решение:**
```bash
# Проверьте локально
npm run build

# Если работает локально, очистите кэш Cloudflare
# и пересоберитесь (Force redeploy в Cloudflare)
```

### CORS ошибки

**Решение:**
```typescript
// vite.config.ts
server: {
  cors: true,
  headers: {
    'Access-Control-Allow-Origin': '*',
  }
}
```

### Service Worker не обновляется

**Решение:**
```bash
# Очистите cache workers и пересоберитесь
npm run build
```

## Лучшие практики

1. **Используйте CI/CD** — автоматическая сборка при git push
2. **Версионируйте** — разные версии в разных тегах
3. **Тестируйте production** — используйте staging окружение
4. **Мониторьте** — отслеживайте ошибки и производительность
5. **Резервируйте** — делайте регулярные backups
6. **Документируйте** — поддерживайте документацию в актуальном виде

---

**Вопросы?** Создайте issue в GitHub репозитории!
