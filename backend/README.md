# Full Stack Task - Backend

Bu proje, NestJS framework'ü kullanılarak geliştirilmiş bir REST API backend uygulamasıdır. Kullanıcı ve post yönetimi için CRUD operasyonları sağlar.

## Gereksinimler

- Node.js (v18 veya üzeri)
- npm veya yarn
- Docker Desktop
- Git

## Kurulum ve Çalıştırma

### 1. Projeyi Klonlayın
```bash
git clone https://github.com/ozguraktas5/full_stack_task.git
cd full_stack_task/backend
```

### 2. Bağımlılıkları Yükleyin
```bash
npm install
```

### 3. PostgreSQL Veritabanını Başlatın

#### Docker ile PostgreSQL Kurulumu (Önerilen)
```bash
# Proje kök dizininde (full_stack_task/)
docker run --name full_stack_postgres -e POSTGRES_DB=full_stack_db -e POSTGRES_USER=postgres -e POSTGRES_PASSWORD=postgres -p 5432:5432 -d postgres:15
```

#### Container Yönetimi
```bash
# Container'ı başlat
docker start full_stack_postgres

# Container'ı durdur
docker stop full_stack_postgres

# Container'ın durumunu kontrol et
docker ps

# Container'ı tamamen kaldır
docker rm full_stack_postgres
```

### 4. Environment Dosyasını Oluşturun
```bash
# Backend klasöründe .env dosyası oluşturun
echo "DATABASE_URL=postgresql://postgres:postgres@localhost:5432/full_stack_db" > .env
echo "NODE_ENV=development" >> .env
echo "PORT=3000" >> .env
```

### 5. Backend'i Başlatın

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

### 6. Uygulama Bilgileri
- **Port**: 3000 (varsayılan)
- **Veritabanı**: PostgreSQL (Docker container)
- **API Base URL**: `http://localhost:3000`
- **Veritabanı URL**: `postgresql://postgres:postgres@localhost:5432/full_stack_db`

## API Endpointler

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
- **Tür**: PostgreSQL (Docker container)
- **Container**: `full_stack_postgres`
- **Port**: 5432
- **Veritabanı**: `full_stack_db`
- **Kullanıcı**: `postgres`
- **Şifre**: `postgres`

### Production (Railway)
- **Tür**: PostgreSQL
- **Konfigürasyon**: `DATABASE_URL` environment variable ile
- **SSL**: Aktif (production ortamında)

## Testler

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

## Geliştirme

### Kod Formatı
```bash
npm run format
```

### Linting
```bash
npm run lint
```

## Deployment

Bu uygulama Railway platformunda deploy edilmiştir. Production ortamında PostgreSQL veritabanı kullanılır.

### Railway'e Deploy Etmek İçin
```bash
# Değişiklikleri commit edin
git add .
git commit -m "Update backend configuration"
git push origin main
```

## Sorun Giderme

### PostgreSQL Container'ı Çalışmıyor
```bash
# Container'ı başlatın
docker start full_stack_postgres

# Container'ın durumunu kontrol edin
docker ps
```

### Backend Başlamıyor
1. PostgreSQL container'ının çalıştığından emin olun
2. `.env` dosyasının doğru oluşturulduğunu kontrol edin
3. Port 3000'in kullanımda olmadığından emin olun

### Veritabanı Bağlantı Hatası
- Docker Desktop'ın çalıştığından emin olun
- PostgreSQL container'ının port 5432'de çalıştığını kontrol edin
- `.env` dosyasındaki `DATABASE_URL`'nin doğru olduğunu kontrol edin

## 📝 Notlar

- Uygulama TypeORM kullanarak veritabanı işlemlerini gerçekleştirir
- `synchronize: true` ayarı ile veritabanı şeması otomatik oluşturulur (sadece development için)
- CORS ayarları frontend ile uyumlu olacak şekilde yapılandırılmıştır
- Docker Desktop kapatıldığında container'lar durur, tekrar başlatmanız gerekir
