# Full Stack Task - Backend

Bu proje, NestJS framework'ü kullanılarak geliştirilmiş bir REST API backend uygulamasıdır. Kullanıcı ve post yönetimi için CRUD operasyonları sağlar.

## Kurulum ve Çalıştırma

### Gereksinimler
- Node.js (v18 veya üzeri)
- npm veya yarn

### 1. Projeyi Klonlayın
```bash
git clone https://github.com/ozguraktas5/full_stack_task.git
cd full_stack_task/backend
```

### 2. Bağımlılıkları Yükleyin
```bash
npm install
```

### 3. Uygulamayı Çalıştırın

#### Geliştirme Modu (Önerilen)
```bash
npm run start:dev
```
Bu komut uygulamayı watch mode'da başlatır ve dosya değişikliklerini otomatik olarak algılar.

#### Production Modu
```bash
npm run build
npm run start:prod
```

#### Normal Başlatma
```bash
npm run start
```

### 4. Uygulama Bilgileri
- **Port**: 3000 (varsayılan)
- **Veritabanı**: SQLite (lokalde), PostgreSQL (production)
- **API Base URL**: `http://localhost:3000`

## API Endpoints

### Kullanıcılar (Users)
- `GET /users` - Tüm kullanıcıları listele
- `GET /users/:id` - Belirli bir kullanıcıyı getir
- `POST /users` - Yeni kullanıcı oluştur
- `PATCH /users/:id` - Kullanıcı bilgilerini güncelle
- `DELETE /users/:id` - Kullanıcıyı sil

### Postlar (Posts)
- `GET /posts` - Tüm postları listele
- `GET /posts/:id` - Belirli bir postu getir
- `POST /posts` - Yeni post oluştur
- `PATCH /posts/:id` - Post bilgilerini güncelle
- `DELETE /posts/:id` - Postu sil

## Veritabanı

### Lokal Geliştirme
- **Tür**: SQLite
- **Dosya**: `database.sqlite` (otomatik oluşturulur)
- **Konfigürasyon**: `src/app.module.ts` dosyasında tanımlı

### Production (Railway)
- **Tür**: PostgreSQL
- **Konfigürasyon**: `DATABASE_URL` environment variable ile

## 🧪 Testler

### Unit Testler
```bash
npm run test
```

### E2E Testler
```bash
npm run test:e2e
```

### Test Coverage
```bash
npm run test:cov
```

## 📁 Proje Yapısı

```
src/
├── entities/          # Veritabanı entity'leri
│   ├── user.entity.ts
│   └── post.entity.ts
├── users/            # Kullanıcı modülü
│   ├── users.controller.ts
│   ├── users.service.ts
│   └── users.module.ts
├── posts/            # Post modülü
│   ├── posts.controller.ts
│   ├── posts.service.ts
│   └── posts.module.ts
├── app.module.ts     # Ana modül
├── app.controller.ts # Ana controller
├── app.service.ts    # Ana service
└── main.ts          # Uygulama giriş noktası
```

## 🔧 Geliştirme

### Kod Formatı
```bash
npm run format
```

### Linting
```bash
npm run lint
```

## 🚀 Deployment

Bu uygulama Railway platformunda deploy edilmiştir. Production ortamında PostgreSQL veritabanı kullanılır.

## 📝 Notlar

- Uygulama TypeORM kullanarak veritabanı işlemlerini gerçekleştirir
- `synchronize: true` ayarı ile veritabanı şeması otomatik oluşturulur (sadece development için)
- CORS ayarları frontend ile uyumlu olacak şekilde yapılandırılmıştır
