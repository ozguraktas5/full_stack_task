# Full Stack Task - Frontend

Bu proje, React + TypeScript + Vite kullanılarak oluşturulmuş bir frontend uygulamasıdır. Kullanıcı ve post yönetimi için modern bir web arayüzü sağlar.

## Gereksinimler

- Node.js (v18 veya üzeri)
- npm veya yarn
- Backend uygulamasının çalışıyor olması
- Git

## Kurulum ve Çalıştırma

### 1. Projeyi Klonlayın
```bash
git clone https://github.com/ozguraktas5/full_stack_task.git
cd full_stack_task/frontend
```

### 2. Bağımlılıkları Yükleyin
```bash
npm install
```

### 3. Backend'i Başlatın
Frontend'in çalışması için backend uygulamasının çalışıyor olması gerekir:

```bash
# Backend klasöründe
cd ../backend
npm run start:dev
```

Backend'in `http://localhost:3000` adresinde çalıştığından emin olun.

### 4. Frontend'i Başlatın

#### Geliştirme Modu (Önerilen)
```bash
# Frontend klasöründe
npm run dev
```

Bu komut frontend'i `http://localhost:5173` adresinde başlatır.

#### Production Build
```bash
npm run build
npm run preview
```

### 5. Uygulama Bilgileri
- **Frontend URL**: `http://localhost:5173`
- **Backend URL**: `http://localhost:3000`
- **API Base URL**: `http://localhost:3000`

## Özellikler

- ✅ React 18 + TypeScript
- ✅ Vite build tool
- ✅ React Router DOM
- ✅ Axios HTTP client
- ✅ Modern CSS styling
- ✅ ESLint kuralları
- ✅ CRUD işlemleri (Create, Read, Update, Delete)
- ✅ Kullanıcı yönetimi
- ✅ Post yönetimi
- ✅ Arama ve filtreleme
- ✅ Responsive tasarım
- ✅ Toast bildirimleri
- ✅ Modal onayları

## Kullanım

### Ana Sayfa
- Kullanıcı ve post istatistiklerini görüntüleme
- Hızlı erişim linkleri

### Kullanıcı Yönetimi
1. Kullanıcı listesini görüntüleme
2. Yeni kullanıcı ekleme
3. Kullanıcı bilgilerini düzenleme
4. Kullanıcı silme
5. Kullanıcı arama
6. Kullanıcının postlarını görüntüleme

### Post Yönetimi
1. Post listesini görüntüleme
2. Yeni post ekleme
3. Post bilgilerini düzenleme
4. Post silme
5. Post arama
6. Kullanıcıya göre post filtreleme

## API Endpointleri

Frontend aşağıdaki backend API endpointlerini kullanır:

### Kullanıcılar
- `GET /users` - Tüm kullanıcıları listele
- `GET /users/:id` - Belirli bir kullanıcıyı getir
- `POST /users` - Yeni kullanıcı oluştur
- `PATCH /users/:id` - Kullanıcı bilgilerini güncelle
- `DELETE /users/:id` - Kullanıcıyı sil

### Postlar
- `GET /posts` - Tüm postları listele
- `GET /posts/:id` - Belirli bir postu getir
- `POST /posts` - Yeni post oluştur
- `PATCH /posts/:id` - Post bilgilerini güncelle
- `DELETE /posts/:id` - Postu sil
- `GET /posts?userId=:id` - Kullanıcıya göre postları filtrele

## Proje Yapısı

```
src/
├── components/          # React bileşenleri
│   ├── ui/             # UI bileşenleri
│   │   ├── Button.tsx
│   │   ├── Input.tsx
│   │   └── Icons.tsx
│   ├── UserCard.tsx    # Kullanıcı kartı
│   ├── UserForm.tsx    # Kullanıcı formu
│   ├── UserList.tsx    # Kullanıcı listesi
│   ├── PostCard.tsx    # Post kartı
│   ├── PostForm.tsx    # Post formu
│   ├── PostList.tsx    # Post listesi
│   └── Navigation.tsx  # Navigasyon
├── hooks/              # Custom React hooks
│   ├── useUsers.ts     # Kullanıcı yönetimi
│   ├── usePosts.ts     # Post yönetimi
│   └── useToast.ts     # Bildirim yönetimi
├── services/           # API servisleri
│   └── api.ts          # Axios konfigürasyonu
├── types/              # TypeScript tip tanımları
│   └── index.ts
├── styles/             # CSS dosyaları
│   ├── App.css
│   ├── components.css
│   └── ui/
└── App.tsx             # Ana uygulama bileşeni
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

### Type Checking
```bash
npm run type-check
```

## Sorun Giderme

### Frontend Başlamıyor
1. Node.js versiyonunun v18+ olduğundan emin olun
2. `npm install` komutunu çalıştırın
3. Port 5173'ün kullanımda olmadığından emin olun

### Backend Bağlantı Hatası
1. Backend'in `http://localhost:3000` adresinde çalıştığından emin olun
2. `src/services/api.ts` dosyasındaki `API_BASE_URL`'yi kontrol edin
3. CORS ayarlarının doğru olduğundan emin olun

### API İstekleri Başarısız
1. Backend'in çalıştığından emin olun
2. Network sekmesinde hata mesajlarını kontrol edin
3. Backend loglarını kontrol edin

## Deployment

Bu uygulama Railway platformunda deploy edilmiştir.

### Railway'e Deploy Etmek İçin
```bash
# Değişiklikleri commit edin
git add .
git commit -m "Update frontend"
git push origin main
```

## Notlar

- Frontend, backend API'sine bağımlıdır
- Responsive tasarım ile mobil uyumludur
- Modern React hooks kullanılmıştır
- TypeScript ile tip güvenliği sağlanmıştır
- Vite ile hızlı geliştirme deneyimi sunar