# Anime Streaming Website

Website streaming anime dengan fitur scraping menggunakan Node.js, Express, dan Jikan API (MyAnimeList).

## ⚠️ DISCLAIMER

Proyek ini adalah **PROYEK EDUKASI** untuk pembelajaran web development. Website ini menggunakan Jikan API (API publik legal dari MyAnimeList) untuk data anime. 

**PENTING:**
- Proyek ini TIDAK menyediakan streaming video ilegal
- Untuk menonton anime, gunakan layanan streaming legal seperti:
  - Crunchyroll
  - Funimation
  - Netflix
  - Hulu
  - Muse Asia (YouTube)
- Selalu dukung industri anime dengan menonton melalui platform resmi

## 🚀 Fitur

- ✅ Katalog anime populer
- ✅ Pencarian anime
- ✅ Detail anime lengkap (sinopsis, rating, genre, dll)
- ✅ Daftar episode
- ✅ Anime musiman (seasonal)
- ✅ Pagination
- ✅ Responsive design
- ✅ Modern UI/UX

## 🛠️ Teknologi

### Backend
- Node.js
- Express.js
- Axios (HTTP client)
- Cheerio (web scraping - untuk contoh)
- SankaVollerei API

### Frontend
- HTML5
- CSS3 (Modern styling dengan CSS Variables)
- Vanilla JavaScript (ES6+)
- Font Awesome Icons

## 📋 Prerequisite

- Node.js (v14 atau lebih baru)
- npm atau yarn

## 🔧 Instalasi

1. Clone atau download project ini

2. Install dependencies:
```bash
npm install
```

3. Jalankan server:
```bash
npm start
```

Atau untuk development mode dengan auto-reload:
```bash
npm run dev
```

4. Buka browser dan akses:
```
http://localhost:3000
```

## 📁 Struktur Project

```
anime-streaming-site/
├── server.js              # Main server file
├── package.json           # Dependencies
├── .env                   # Environment variables
├── public/                # Frontend files
│   ├── index.html         # Homepage
│   ├── catalog.html       # Catalog page
│   ├── detail.html        # Anime detail page
│   ├── watch.html         # Watch page (demo)
│   ├── css/
│   │   └── style.css      # Main stylesheet
│   └── js/
│       ├── app.js         # Main app script
│       ├── home.js        # Homepage script
│       ├── catalog.js     # Catalog page script
│       ├── detail.js      # Detail page script
│       └── watch.js       # Watch page script
└── README.md
```

## 🔌 API Endpoints

### Backend API Routes:

- `GET /api/anime/popular?page=1` - Mendapatkan anime populer
- `GET /api/anime/search?q=naruto` - Mencari anime
- `GET /api/anime/:id` - Detail anime
- `GET /api/anime/:id/episodes?page=1` - Daftar episode
- `GET /api/anime/:id/episode/:episodeId/stream` - Link streaming (mock)
- `GET /api/anime/season/now` - Anime musim ini
- `GET /api/anime/season/:year/:season` - Anime musim tertentu

## 🎨 Customization

### Mengubah Warna Theme

Edit variabel CSS di `public/css/style.css`:

```css
:root {
    --primary-color: #e74c3c;      /* Warna utama */
    --secondary-color: #3498db;    /* Warna sekunder */
    --dark-bg: #1a1a2e;            /* Background gelap */
    --darker-bg: #16213e;          /* Background lebih gelap */
    --card-bg: #0f3460;            /* Background card */
}
```

### Mengganti API Source

Untuk mengganti sumber data anime, edit `server.js`:

```javascript
const ANIME_API_BASE = 'https://api.jikan.moe/v4';
```

## 📱 Responsive Design

Website ini fully responsive dan dapat diakses dari:
- Desktop
- Tablet
- Mobile

## ⚡ Performance Tips

1. Gunakan caching untuk mengurangi API calls
2. Implementasi lazy loading untuk gambar
3. Minify CSS dan JavaScript untuk production
4. Gunakan CDN untuk library external

## 🔒 Catatan Keamanan

Jika Anda ingin mengimplementasikan fitur streaming nyata:

1. **Gunakan HTTPS** untuk semua komunikasi
2. **Implementasi rate limiting** untuk mencegah abuse
3. **Validasi input** user untuk mencegah XSS dan SQL injection
4. **Gunakan API legal** dengan lisensi yang tepat
5. **Implementasi authentication** jika diperlukan

## 📄 Lisensi

Proyek ini adalah untuk tujuan edukasi. Selalu hormati hak cipta dan gunakan layanan streaming legal.

## 🤝 Kontribusi

Proyek ini adalah contoh pembelajaran. Anda bebas menggunakannya untuk belajar dan mengembangkannya lebih lanjut.

## 📞 Support

Jika ada pertanyaan atau masalah:
1. Pastikan semua dependencies terinstall
2. Periksa console browser untuk error
3. Periksa terminal server untuk error log

## 🌟 Credits

- Data anime dari [SankaVollerei API](https://www.sankavollerei.com/anime)
- Icons dari [Font Awesome](https://fontawesome.com/)
- Design terinspirasi dari berbagai platform streaming anime legal

---

**Dibuat dengan ❤️ untuk pembelajaran web development**

**Ingat: Selalu dukung kreator anime dengan menonton melalui platform legal!**
