# Roadmap & Rencana Pengerjaan (PLAN.md)
*Proyek: Web Pembelajaran Interaktif Persamaan Kuadrat (Materi: Diskriminan)*

Dokumen ini melacak daftar tugas, tahapan implementasi bertahap, dan progres fitur yang akan kita bangun sedikit demi sedikit. **Dokumen ini tidak memuat aturan kerja arsitektur atau log keputusan (silakan merujuk ke AGENTS.md).**

---

## Ringkasan Progres
- [x] **Fase 0**: Inisialisasi Repositori & Template Dasar (5 File Inti)
- [ ] **Fase 1**: Kerangka Semantik UI & Formula Dasar Matematika (HTML)
- [ ] **Fase 2**: Penataan Visual Game & Responsivitas (CSS)
- [ ] **Fase 3**: Logika Perhitungan Diskriminan & Interaktivitas DOM (JS)
- [ ] **Fase 4**: Mekanik Game & Tantangan Soal (Scaffolding Siswa: Main Quest & Side Quest)
- [ ] **Fase 5**: Feedback Visual, Scoring, Audio/Animasi, & Polish
- [ ] **Fase 6**: Deploy GitHub Pages & Uji Coba Pengguna

---

## Detail Milestone & Checklist Tugas

### Fase 0: Setup Awal & Inisialisasi
- [x] Membuat template `AGENTS.md` (Decision log & aturan kerja)
- [x] Membuat template `PLAN.md` (Roadmap & checklist)
- [x] Membuat template dasar `index.html`
- [x] Membuat template dasar `style.css`
- [x] Membuat template dasar `script.js`
- [x] Inisialisasi remote repository GitHub dan branching GitHub Pages (https://fakhri24.github.io/persamaan-kuadrat-p2/)

### Fase 1: Kerangka Dasar Antarmuka (HTML)
*Fokus Belajar: Semantic HTML5, Komponen Generator Acak, Slot Input Interaktif Formula `(..)^2 - 4(..)(..)`, dan Kartu Rumus ABC.*
- [ ] Header & Navigasi Mode (Eksplorasi Acak & Quest Tantangan)
- [ ] Section Generator Persamaan: Tampilan persamaan acak $ax^2 + bx + c = 0$ dan tombol "Kocok Persamaan"
- [ ] Slot Interaktif Rumus Diskriminan:
  - Kotak slot untuk $b$: `( [ b ] )²`
  - Kotak slot untuk $a$: `- 4( [ a ] )`
  - Kotak slot untuk $c$: `( [ c ] )`
- [ ] Area Kalkulasi Bertahap (Step-by-step reveal: Hitung $b^2$, hitung $4ac$, lalu hasil akhir $D$)
- [ ] Kartu Kaitan Rumus ABC: Visualisasi $x = \frac{-b \pm \sqrt{D}}{2a}$ yang menunjukkan isi di dalam akar
- [ ] Pilihan Kesimpulan Sifat Akar (3 Tombol: 2 Akar Riil Berbeda, Akar Kembar, Tidak Riil)
- [ ] Section Quest & Tantangan: Soal esensial (Main Quest) & pengayaan parameter (Side Quest)

### Fase 2: Penataan Gaya & Layout Modern (CSS)
*Fokus Belajar: CSS Variables, Styling kartu rumus aljabar, Animasi dadu/generator, dan Feedback warna status akar.*
- [ ] Desain tema visual kartu matematika modern yang nyaman dibaca
- [ ] Animasi visual saat menekan tombol "Kocok Persamaan"
- [ ] Slot box bergaya kalkulator aljabar untuk nilai $a, b, c$
- [ ] Indikator visual berbasis status tanda akar:
  - Hijau: $D > 0 \rightarrow \sqrt{+ \dots}$ menghasilkan 2 solusi riil berlainan ($\pm$)
  - Kuning: $D = 0 \rightarrow \sqrt{0}$ bernilai 0, solusi kembar ($x = -b / 2a$)
  - Merah: $D < 0 \rightarrow \sqrt{- \dots}$ isi akar negatif, tidak memiliki akar riil (imajiner)

### Fase 3: Logika Generator, Substitusi Rumus, & DOM (JavaScript)
*Fokus Belajar: Math.random(), event listener click/input, kalkulasi step-by-step, manipulasi innerHTML/textContent.*
- [ ] Fungsi pembangkit persamaan kuadrat acak yang seimbang (menghasilkan variasi $D > 0, D = 0, D < 0$)
- [ ] Validasi nilai koefisien $a \neq 0$
- [ ] Perhitungan bertahap:
  1. Identifikasi $a, b, c$
  2. Hitung $b^2$
  3. Hitung $4 \times a \times c$
  4. Kurangkan: $b^2 - 4ac$
- [ ] Animasi perubahan rumus ABC saat $D$ positif, nol, atau negatif

### Fase 4: Sistem Quest & Gamifikasi Interaktif
*Fokus Belajar: Array of objects (bank soal), validasi input jawaban siswa, sistem nyawa/bintang.*
- [ ] Mode Tebak Sifat Akar: Diberikan persamaan acak, siswa menebak tanda $D$ dan jumlah akarnya
- [ ] Mode Tantangan Main Quest (Latihan 5.2 No. 1a, 1b, 1c, dan No. 4)
- [ ] Mode Side Quest (Parameter $k$ atau $p$ untuk akar kembar/berbeda)
- [ ] Scoring, streak jawaban benar, dan pesan umpan balik pedagogis

### Fase 5: Evaluasi & Finishing
- [ ] Review kode bersama pengguna (penjelasan baris per baris)
- [ ] Optimasi UX pada perangkat layar sentuh / smartphone
- [ ] Finalisasi panduan guru & scaffolding
