# wiki-kit

Templat basis pengetahuan berbasis Markdown yang dirancang untuk dipelihara oleh LLM.

Alih-alih menelusuri bahan mentah setiap kali ada pertanyaan, LLM mengakumulasikan ringkasan, referensi silang, dan analisis di `wiki/`, sehingga membangun lapisan pengetahuan yang persisten seiring waktu.

Templat ini mengimplementasikan alur kerja yang diusulkan dalam gist "[LLM Wiki](https://gist.github.com/karpathy/442a6bf555914893e9891c11519de94f)" oleh karpathy.

## Mulai Cepat

```bash
npx create-wiki-kit my-wiki
cd my-wiki
```

Lalu:

1. Jelaskan apa yang ingin Anda teliti di `wiki/overview.md`
2. Letakkan materi sumber ke dalam `raw/sources/`
3. Minta LLM membaca `CLAUDE.md` lalu mengingestinya

## Apa yang Dilakukan LLM

Setelah diarahkan ke `CLAUDE.md`, LLM mengikuti alur kerja yang sudah ditentukan:

- **Ingest**: Membaca satu sumber mentah, membuat ringkasan di `wiki/sources/`, memperbarui halaman konsep dan entitas terkait, lalu mencatat pekerjaan tersebut di `index.md` dan `log.md`.
- **Query**: Berkonsultasi ke wiki terlebih dahulu, menjawab dengan bukti, dan menyimpan analisis yang dapat dipakai ulang ke `wiki/syntheses/`.
- **Lint**: Meninjau wiki secara berkala untuk mencari kontradiksi, konten usang, halaman yatim, dan konsep penting yang belum dipromosikan.

## Struktur Direktori

Setelah scaffolding, proyek yang dihasilkan akan terlihat seperti ini:

```text
my-wiki/
├── CLAUDE.md              # Aturan operasi untuk LLM
├── AGENTS.md              # Mengarahkan agen lain ke CLAUDE.md
├── README.md
├── raw/
│   ├── sources/           # Artikel, PDF, catatan, transkrip, dll.
│   └── assets/            # Gambar, diagram, lampiran
├── wiki/
│   ├── overview.md        # Tema, tujuan, hipotesis
│   ├── index.md           # Indeks berbasis konten
│   ├── log.md             # Catatan kronologis semua operasi
│   ├── open-questions.md  # Pertanyaan yang belum terjawab dan kandidat riset
│   ├── sources/           # Satu halaman ringkasan per materi mentah
│   ├── concepts/          # Tema berulang, perdebatan, terminologi
│   ├── entities/          # Orang, perusahaan, produk, organisasi
│   ├── syntheses/         # Perbandingan, analisis, kesimpulan yang bisa dipakai ulang
│   └── maintenance/
│       └── lint-reports/  # Laporan tinjauan berkala
└── templates/             # Referensi struktur halaman untuk LLM
```

## Locale

Templat ini dilengkapi dengan 14 paket locale. Opsi `--locale` memilih bahasa untuk `CLAUDE.md`, template, scaffolding wiki, dan semua file README. Default-nya adalah `en`.
`README.md` di tingkat repositori ini mendokumentasikan templat itu sendiri. Proyek yang dihasilkan seharusnya menerima README dari locale yang dipilih, seperti `locales/en/README.md` atau `locales/ja/README.md`.

| Code | Language    | Code | Language    |
|------|-------------|------|-------------|
| `de` | German      | `ko` | Korean      |
| `en` | English     | `pt` | Portuguese  |
| `es` | Spanish     | `ru` | Russian     |
| `fr` | French      | `th` | Thai        |
| `id` | Indonesian  | `tr` | Turkish     |
| `it` | Italian     | `vi` | Vietnamese  |
| `ja` | Japanese    | `zh` | Chinese     |

```bash
npx create-wiki-kit my-wiki --locale ja
```

Untuk menambahkan locale baru, buat `locales/<code>/` di repositori templat dengan versi terjemahan dari semua 22 file.

## Contoh Prompt

### Inisialisasi

```text
Baca CLAUDE.md dan pahami tujuan serta aturan operasi wiki ini.
Lalu periksa wiki/overview.md dan siapkan pertanyaan minimum untuk menutup kesenjangan yang ada.
```

### Ingest

```text
Mengikuti CLAUDE.md, proses satu materi yang belum diingesti dari raw/sources/.
Buat ringkasan sumber, perbarui concepts / entities / overview jika diperlukan,
lalu perbarui index.md dan log.md.
```

### Query

```text
Baca wiki/index.md terlebih dahulu, lalu konsultasikan halaman terkait di wiki.
Ringkas tiga argumen utama tentang topik ini, sambil menandai bagian dengan bukti yang lemah.
Jika hasilnya punya nilai guna ulang, simpan ke syntheses.
```

### Lint

```text
Mengikuti CLAUDE.md, lakukan lint pada seluruh wiki.
Identifikasi kontradiksi, konten usang, halaman yatim, konsep kunci yang belum dipromosikan
dan kandidat riset. Buat laporan di wiki/maintenance/lint-reports/,
lalu perbarui index.md dan log.md.
```

## Prinsip Inti

- `raw/` bersifat hanya-baca bagi LLM; manusia memasukkan materi, dan LLM tidak pernah mengubahnya
- `wiki/` adalah lapisan pengetahuan yang dikembangkan LLM; ringkasan dan referensi silang terakumulasi di sini
- `index.md` dan `log.md` diperbarui pada setiap operasi
- Hasil query bernilai tinggi disimpan ke `syntheses/` alih-alih dibiarkan hanya di percakapan
- Lint berkala menangkap kontradiksi dan celah sebelum menumpuk

## Penggunaan dengan Agen Lain

Aturan operasi didefinisikan di `CLAUDE.md`. Untuk agen yang membaca `AGENTS.md` (seperti Codex), file itu mengarahkan ke `CLAUDE.md`. Salin isinya ke format konfigurasi agen jika diperlukan.
