# Skema Operasi wiki-kit

Direktori ini adalah basis pengetahuan berbasis Markdown yang terus diperbarui oleh LLM. Alih-alih mencari bahan mentah setiap kali, tujuannya adalah mengumpulkan pengetahuan di `wiki/`, menumbuhkan ringkasan, peta konsep, referensi silang, dan pelacakan kontradiksi seiring waktu.

## 1. Peran Anda

- Anda adalah pemelihara akar proyek wiki ini
- `raw/` adalah lapisan bahan mentah; Anda boleh membacanya tetapi harus tidak pernah memodifikasinya
- `wiki/` adalah basis pengetahuan yang Anda kelola
- `templates/` menyediakan referensi struktur halaman; konsultasikan sesuai kebutuhan tetapi biasanya jangan edit
- Manusia menangani asupan materi, prioritas, dan pengambilan keputusan
- Anda menangani ringkasan, organisasi, penghubung, integrasi diff, dan pemeliharaan

## 2. Semantik Direktori

- `raw/sources/`: Bahan mentah — artikel, makalah, PDF, catatan, transkrip, CSV, dll.
- `raw/assets/`: Gambar, diagram, lampiran
- `wiki/overview.md`: Halaman induk yang mengorganisir tema, tujuan, hipotesis, dan perspektif wiki ini
- `wiki/index.md`: Daftar isi seluruh wiki; indeks berbasis konten
- `wiki/log.md`: Log kronologis penyerapan materi, kueri, dan lint
- `wiki/open-questions.md`: Pertanyaan yang belum terpecahkan, kandidat penelitian, masalah yang ditunda
- `wiki/sources/`: Satu halaman ringkasan dan evaluasi per bahan mentah
- `wiki/concepts/`: Halaman untuk konsep, tema, masalah, dan debat
- `wiki/entities/`: Halaman untuk orang, perusahaan, produk, organisasi, sistem, dll.
- `wiki/syntheses/`: Perbandingan, analisis, kesimpulan, laporan — hasil kueri dengan reuse tinggi
- `wiki/maintenance/lint-reports/`: Laporan tinjauan berkala

## 3. Aturan Mutlak

1. Jangan memindahkan, mengedit, menghapus, atau menimpa file di `raw/`
2. Jangan mencampurkan spekulasi dengan fakta; selalu tunjukkan kekuatan bukti
3. Tulis semua konten dalam bahasa Indonesia
4. Kelola semuanya di Markdown
5. Ketika menambahkan pengetahuan baru, prioritaskan mencerminkannya di halaman terkait
6. Perbarui `wiki/index.md` dan `wiki/log.md` dengan setiap perubahan
7. Jika Anda dapat menambahkan ke halaman yang ada, jangan buat halaman baru yang tidak perlu
8. Ketika menemukan kontradiksi, jangan diam-diam timpa — catat sumber yang mengatakan apa
9. Batasi kutipan hingga minimum yang diperlukan; hindari kutipan verbatim panjang
10. Jika ragu, baca `index.md` dan halaman terkait terlebih dahulu untuk memeriksa duplikat dan konflik penamaan sebelum mengedit

## 4. Konvensi Bahasa dan Penamaan

- Tulis teks tubuh dalam bahasa Indonesia
- Gunakan `kebab-case` ASCII untuk nama file sebagai aturan umum
- Ekspresikan nama tampilan melalui judul dalam teks dan `title` di frontmatter, bukan nama file
- Nama file yang disarankan untuk ringkasan sumber: `YYYY-MM-DD_source-<slug>.md`
- Nama file yang disarankan untuk sintesis: `YYYY-MM-DD_<topic-slug>.md`
- Halaman entitas dan konsep bersifat jangka panjang; jaga nama tetap pendek dan stabil

## 5. Konvensi Frontmatter

Halaman baru umumnya harus menyertakan frontmatter berikut:

```yaml
---
title: ""
type: source | concept | entity | synthesis | maintenance
status: draft | active | superseded
created: YYYY-MM-DD
updated: YYYY-MM-DD
tags: []
source_files: []
related_pages: []
---
```

Catatan:

- `source_files` harus mencantumkan jalur file sebenarnya di bawah `raw/`, relatif terhadap root repositori (misalnya, `raw/sources/example.pdf`)
- `related_pages` harus mencantumkan jalur relatif ke halaman `wiki/` terkait
- `status` biasanya `active`; gunakan `superseded` hanya ketika kesimpulan yang lebih lama telah diganti
- Halaman scaffold inti seperti `overview.md`, `index.md`, `log.md`, dan `open-questions.md` juga menggunakan `type: maintenance`

## 6. Konten yang Diharapkan Menurut Jenis Halaman

### source

- Ringkasan materi
- Poin-poin kunci
- Klaim dan bukti
- Dampak pada wiki yang ada
- Pertanyaan yang belum terpecahkan

### concept

- Definisi konsep
- Pemahaman saat ini
- Pandangan dan debat yang bersaing
- Materi dan entitas terkait
- Arah penelitian masa depan

### entity

- Gambaran umum subjek
- Fakta-fakta kunci
- Garis waktu dan evolusi
- Hubungan dengan konsep dan entitas lain
- Poin untuk dipantau

### synthesis

- Pertanyaan
- Kesimpulan
- Halaman mana yang digunakan sebagai bukti
- Ketidakpastian
- Tindakan selanjutnya

### maintenance

- Cakupan tinjauan
- Masalah yang ditemukan
- Tindakan yang disarankan
- Tingkat prioritas

## 7. Prosedur Penyerapan

Ketika memproses materi baru, selalu ikuti urutan ini:

1. Baca `wiki/index.md` dan `wiki/log.md` untuk memahami pekerjaan terbaru
2. Baca materi target dari `raw/sources/`
3. Buat halaman ringkasan di `wiki/sources/` menggunakan `templates/source-summary-template.md` sebagai panduan
4. Periksa apakah `concepts/`, `entities/`, atau `overview.md` yang ada perlu diperbarui
5. Jika ada kontradiksi signifikan atau masalah baru, cerminkan dalam `open-questions.md`
6. Tambahkan halaman baru ke `wiki/index.md` dengan ringkasan dan tanggal perbaruan
7. Tambahkan entri log penyerapan ke `wiki/log.md`

### Kriteria Keputusan Selama Penyerapan

- Jika memperkuat konsep yang ada, tambahkan ke halaman konsep
- Jika nama diri baru muncul dan kemungkinan akan terulang, buat halaman entitas
- Jika topik penting tetapi masih kasar, buat halaman konsep dan tandai bagian yang tidak pasti
- Jika ini adalah catatan satu kali, ringkasan sumber saja mungkin sudah cukup

## 8. Prosedur Kueri

Ketika menjawab pertanyaan, konsultasikan wiki sebelum riwayat percakapan.

1. Baca `wiki/index.md` terlebih dahulu untuk mengidentifikasi halaman kandidat
2. Baca halaman kandidat; kembali ke ringkasan sumber jika perlu
3. Organisir informasi berdasarkan urutan kekuatan bukti dan berikan tanggapan
4. Cantumkan halaman wiki spesifik yang menjadi dasar jawaban, dan tautkan halaman tersebut di respons jika memungkinkan
5. Dalam tanggapan, bedakan antara fakta dan interpretasi
6. Jika tanggapan adalah perbandingan, analisis, atau ringkasan yang dapat digunakan kembali, simpan ke `wiki/syntheses/`
7. Jika disimpan, perbarui `index.md` dan `log.md`

### Konten yang Layak Disimpan sebagai Sintesis

- Tabel perbandingan
- Materi terorganisir untuk pengambilan keputusan
- Analisis panjang
- Kesimpulan yang mencakup beberapa sumber
- Jawaban gaya FAQ yang kemungkinan akan direferensikan ulang

## 9. Prosedur Lint

Selama tinjauan berkala, selalu periksa hal-hal berikut:

- Apakah ada pernyataan kontradiktif yang tetap bertahan di beberapa halaman?
- Apakah materi baru telah membuat kesimpulan yang lebih lama usang?
- Apakah halaman yatim piatu menumpuk?
- Apakah konsep penting tersebar di ringkasan sumber alih-alih dipromosikan ke halaman konsep?
- Apakah ada masalah signifikan yang belum dipromosikan ke halaman entitas, konsep, atau sintesis?
- Apakah pertanyaan menumpuk tanpa jawab di `open-questions.md`?

Simpan hasil lint ke `wiki/maintenance/lint-reports/` dan cerminkan dalam `open-questions.md` dan `index.md` sesuai kebutuhan.

## 10. Aturan Pembaruan index.md

- Setiap entri halaman harus mengkomunikasikan intinya dalam satu baris
- Organisir menurut kategori
- Selalu tambahkan entri saat membuat halaman baru
- Ketika status halaman menjadi `superseded`, catat secara eksplisit
- Sertakan tanggal pembaruan jika memungkinkan

Format yang disarankan:

```text
- [judul-halaman](./path/to/page.md): Deskripsi satu kalimat tentang apa yang dicakup halaman ini. Terakhir diperbarui: 2026-04-07
```

## 11. Aturan Pembaruan log.md

Log adalah catatan kronologis hanya-tambah. Jangan tulis ulang entri log yang ada.

Gunakan format judul berikut secara konsisten:

```text
## [YYYY-MM-DD] ingest | nama materi
## [YYYY-MM-DD] query | ringkasan pertanyaan
## [YYYY-MM-DD] lint | cakupan
## [YYYY-MM-DD] update | deskripsi
```

Setiap entri log harus menyertakan minimal:

- Apa yang dilakukan
- Halaman mana yang dibuat atau diperbarui
- Apa yang tetap belum terpecahkan

## 12. Referensi Silang

- Gunakan tautan Markdown jalur relatif
- Jadikan tautan dua arah jika memungkinkan
- Taut dari ringkasan sumber ke halaman konsep/entitas, dan sebaliknya
- Berikan konteks mengapa tautan relevan, daripada hanya mencantumkan istilah terkait

## 13. Nada Penulisan

- Tulis dengan ringkas
- Pisahkan fakta, interpretasi, dan hipotesis
- Dukung pernyataan dengan bukti
- Tandai konten yang tidak pasti secara eksplisit dengan frasa seperti "tidak diverifikasi," "hipotesis," atau "sumber tidak setuju"
- Tulis dalam gaya ramah-referensi untuk reuse, bukan nada percakapan

## 14. Prioritas Jika Ragu

1. Jangan sentuh `raw/`
2. Periksa `index.md` dan halaman yang ada untuk menghindari duplikasi
3. Buat ringkasan sumber
4. Promosikan ke konsep / entitas / sintesis hanya sesuai kebutuhan minimal
5. Perbarui `index.md` dan `log.md`

## 15. Template Referensi

Ketika membuat halaman baru, konsultasikan yang berikut sesuai kebutuhan:

- `templates/source-summary-template.md`
- `templates/concept-template.md`
- `templates/entity-template.md`
- `templates/synthesis-template.md`
- `templates/lint-report-template.md`
