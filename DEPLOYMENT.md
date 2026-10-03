# Deploying Redaktor

This guide covers various ways to deploy Redaktor to production.

English | [Русский](./DEPLOYMENT.ru.md)

## 1. Cloudflare Pages (Recommended)

Cloudflare Pages is the best choice for Redaktor:
- Free hosting with excellent performance
- Global CDN
- Fast build and deployment
- SSL included by default

### Step 1: Prepare GitHub Repository

```bash
# Clone the project
git clone <your-repo> redaktor
cd redaktor

# Initialize Git (if needed)
git init
git add .
git commit -m "Initial commit: Redaktor application"
git branch -M main
git remote add origin https://github.com/yourusername/redaktor.git
git push -u origin main
```

### Step 2: Connect Cloudflare Pages

1. Go to [Cloudflare Dashboard](https://dash.cloudflare.com/)
2. Select **Pages** from left menu
3. Click **Create a project** → **Connect to Git**
4. Authorize GitHub and select your repository
5. Configure build settings:
   - **Framework preset:** None
   - **Build command:** `npm run build`
   - **Build output directory:** `dist`
   - **Environment variables:** (optional)
6. Click **Save and Deploy**

### Step 3: Custom Domain (Optional)

1. After successful deployment, go to **Settings**
2. Find **Custom domains**
3. Add your domain and follow DNS setup instructions

## 2. Vercel

Vercel is an excellent alternative to Cloudflare Pages.

### Steps:

1. Go to [vercel.com](https://vercel.com)
2. Click **New Project**
3. Import your GitHub repository
4. Configure:
   - **Framework Preset:** Vite
   - **Build Command:** `npm run build`
   - **Output Directory:** `dist`
5. Click **Deploy**

## 3. GitHub Pages

GitHub Pages works for static sites.

### Steps:

1. Update `vite.config.ts`:
```typescript
export default defineConfig({
  base: '/redaktor/',  // if repo is named redaktor
  // ... rest of config
})
```

2. Update `package.json`:
```json
{
  "scripts": {
    "deploy": "npm run build && gh-pages -d dist"
  }
}
```

3. Install `gh-pages`:
```bash
npm install --save-dev gh-pages
```

4. Deploy:
```bash
npm run deploy
```

5. In GitHub Settings → Pages, select `gh-pages` branch

## 4. Docker Deployment

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

### Build and Run:

```bash
# Build image
docker build -t redaktor:latest .

# Run container
docker run -p 3000:3000 redaktor:latest

# Or with Docker Compose
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

## 5. Self-Hosted Server (VPS/Dedicated)

### With Nginx

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

    # SSL certificates (use Let's Encrypt)
    ssl_certificate /etc/letsencrypt/live/redaktor.example.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/redaktor.example.com/privkey.pem;

    root /var/www/redaktor;
    index index.html;

    # Cache busting for JS/CSS
    location ~* \.(js|css)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }

    # Don't cache HTML
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

### Deployment:

```bash
# Build
npm run build

# Copy to server
scp -r dist/* user@server:/var/www/redaktor/

# On server
cd /var/www/redaktor
sudo chown -R www-data:www-data .
sudo systemctl restart nginx
```

## 6. AWS S3 + CloudFront

### Steps:

1. **Create S3 bucket:**
```bash
aws s3 mb s3://redaktor-app
```

2. **Upload files:**
```bash
npm run build
aws s3 sync dist/ s3://redaktor-app --delete
```

3. **Create CloudFront distribution:**
   - AWS Console → CloudFront → Create distribution
   - Source domain: your S3 bucket
   - Default root object: `index.html`

4. **Configure 404 redirect:**
   - Error responses → Create custom error response
   - 404 → Custom error page path: `/index.html`

## 7. Environment Variables

For different deployment platforms:

### .env.production

```env
VITE_API_BASE=https://api.example.com
VITE_APP_VERSION=1.0.0
```

### In code:

```typescript
const apiBase = import.meta.env.VITE_API_BASE || 'https://localhost:3000'
```

## Production Optimization

### 1. Minimize Bundle Size

```bash
npm run build --report
```

### 2. Code Splitting

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

### 3. Compression

Enable gzip compression on server (usually automatic on Cloudflare/Vercel)

## Monitoring

### Sentry for Error Tracking

```typescript
import * as Sentry from "@sentry/react"

Sentry.init({
  dsn: "your-sentry-dsn",
  environment: "production"
})
```

### Google Analytics

```html
<!-- In index.html -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_ID');
</script>
```

## Pre-Production Checklist

- [ ] All tests pass (`npm run test`)
- [ ] No TypeScript errors (`npm run type-check`)
- [ ] Lint passes (`npm run lint`)
- [ ] Production build succeeds (`npm run build`)
- [ ] Bundle size is optimized
- [ ] PWA works (Service Worker)
- [ ] Performance tested (Lighthouse)
- [ ] SEO optimized (meta tags)
- [ ] SSL certificate installed
- [ ] CDN configured
- [ ] Database backup ready
- [ ] Monitoring activated
- [ ] Logging configured

## Common Issues

### Build Failed on Cloudflare Pages

**Solution:**
```bash
# Test locally
npm run build

# If it works locally, clear Cloudflare cache
# and force redeploy in Cloudflare
```

### CORS Errors

**Solution:**
```typescript
// vite.config.ts
server: {
  cors: true,
  headers: {
    'Access-Control-Allow-Origin': '*',
  }
}
```

### Service Worker Not Updating

**Solution:**
```bash
# Clear cache workers and rebuild
npm run build
```

## Best Practices

1. **Use CI/CD** — automatic build on git push
2. **Version Control** — different versions in tags
3. **Test Production** — use staging environment
4. **Monitor** — track errors and performance
5. **Backup** — regular backups
6. **Documentation** — keep it up to date

---

**Questions?** [Open an issue on GitHub](https://github.com/yourusername/redaktor/issues)!
