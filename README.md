
---

```markdown
# Search Engine Mini ? Frontend (React + Next.js)

Frontend aplikasi **Search Engine Mini** ini dibuat menggunakan **React** dan **Next.js**. Aplikasi ini berfungsi sebagai antarmuka pencarian yang terhubung ke backend Django dan menampilkan hasil pencarian dari indeks Whoosh.

## Fitur Utama

- Input pencarian teks
- Menampilkan hasil dari backend Django
- Tampilan bersih dan responsif

## Struktur Proyek

```

search-engine-fe-app/
??? pages/
?   ??? index.js         # Halaman utama
?   ??? ...
??? components/          # Komponen UI
??? public/
??? styles/
??? next.config.js
??? ...

````

## Cara Menjalankan Proyek

### 1. Clone Repository

```bash
git clone <url-repo-frontend-kamu>
cd search-engine-fe-app
````

### 2. Install Dependency

```bash
npm install
# atau
yarn install
```

### 3. Jalankan Aplikasi

```bash
npm run dev
# atau
yarn dev
```

Aplikasi akan berjalan di: [http://localhost:3000](http://localhost:3000)

## Konfigurasi Koneksi ke Backend

Pastikan kamu mengatur **URL backend Django** agar sesuai. Jika kamu menggunakan `.env.local`, tambahkan:

```env
NEXT_PUBLIC_API_URL=http://127.0.0.1:8000
```

Gunakan variabel `process.env.NEXT_PUBLIC_API_URL` saat melakukan fetch dari frontend.

### Contoh Pengambilan Data dari Backend

```js
const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/search/?q=${query}`)
const data = await res.json()
```

---

## Build untuk Produksi

```bash
npm run build
npm run start
``

---

## Catatan Tambahan

* Pastikan backend berjalan di port yang sama atau aktif CORS di sisi Django.
* Jika menggunakan fitur khusus (Tailwind, Zustand, Axios, dll), pastikan sudah tercantum di `package.json`.

```
