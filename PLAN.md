# Roadmap & Rencana Pengerjaan (PLAN.md)
*Proyek: Web Pembelajaran Interaktif Persamaan Kuadrat (Materi: Diskriminan)*

Dokumen ini melacak daftar tugas, tahapan implementasi bertahap, dan progres fitur yang akan kita bangun sedikit demi sedikit. **Dokumen ini tidak memuat aturan kerja arsitektur atau log keputusan (silakan merujuk ke AGENTS.md).**

---

## Ringkasan Progres
- [x] **Fase 0**: Inisialisasi Repositori & Template Dasar (5 File Inti) + Setup GitHub Pages
- [x] **Fase 1**: Fondasi Materi & Kuis Identifikasi Koefisien (HTML + KaTeX)
- [x] **Fase 2**: Penataan Gaya Dual-Panel 50-50 & Card Visual (CSS)
- [x] **Fase 3**: Logika Generator Persamaan & Kuis Identifikasi a, b, c (JS)
- [ ] **Fase 4**: Modul Inti Diskriminan: Menghitung D via Slot Drag-Drop & Tanda Akar ABC
- [ ] **Fase 5**: Level Quest & Soal Tantangan (Main Quest & Side Quest)
- [ ] **Fase 6**: Finishing, Polish, & Dokumentasi Belajar

---

## Detail Milestone & Checklist Tugas

### Fase 0: Setup Awal & Inisialisasi
- [x] Membuat template `AGENTS.md` (Decision log & aturan kerja)
- [x] Membuat template `PLAN.md` (Roadmap & checklist)
- [x] Membuat template dasar `index.html`
- [x] Membuat template dasar `style.css`
- [x] Membuat template dasar `script.js`
- [x] Inisialisasi remote repository GitHub dan branching GitHub Pages (https://fakhri24.github.io/persamaan-kuadrat-p2/)

### Fase 1: Fondasi Materi & Kuis Identifikasi Koefisien (HTML + KaTeX)
*Fokus Belajar: Integrasi KaTeX CDN untuk matematika LaTeX, Struktur Semantic Split Layout, Form Input Angka.*
- [x] Menghubungkan library KaTeX CDN (CSS + JS + auto-render extension) dengan delimiter `$...$` dan `$$...$$`
- [x] Struktur Layout Dual-Panel (Grid/Flex 50% - 50%):
  - **Panel Kiri (Materi Inti - Clean UI & Pop-up On-Demand)**:
    - Display persamaan kuadrat umum: $ax^2 + bx + c = 0$ dengan tombol pop-up `ℹ️ Keterangan` koefisien
    - Display rumus ABC: $x = \frac{-b \pm \sqrt{b^2 - 4ac}}{2a}$ dengan tombol pop-up `💡 Keterangan Penting!` diskriminan
    - Dialog Modal interaktif untuk rincian koefisien $a, b, c$ dan penjelasan bagian di dalam akar
    - Tombol konfirmasi interaktif: "Saya Sudah Paham! Buka Kuis Cepat"
  - **Panel Kanan (Kuis Singkat Identifikasi)**:
    - Wadah soal persamaan kuadrat acak dengan 6 variasi permutasi urutan suku ($3! = 6$) agar seimbang
    - Tiga kotak input angka berdampingan: $a = [ \dots ]$, $b = [ \dots ]$, $c = [ \dots ]$
    - Tombol "Periksa Jawaban" & tombol "Ganti Persamaan Lain"
    - Area pesan umpan balik ramah / refleksi pedagogis jika salah tanda minus atau tertukar koefisien
    - Tombol fleksibel "Lanjut ke Modul Diskriminan" (selalu aktif kapan saja siswa siap)

### Fase 2: Penataan Gaya & Layout Modern (CSS)
*Fokus Belajar: CSS Grid split-screen 50/50, Flexbox, Styling ekspresi KaTeX, Desain responsive mobile (stacking).*
- [x] Variabel warna tema edukatif & modern
- [x] Desain split container rigid 50:50 dengan `minmax(0, 1fr)` dan `min-width: 0`
- [x] Styling kartu rumus KaTeX dengan background kontras dan sorotan warna (highlight)
- [x] Animasi transisi membuka panel kanan setelah tombol konfirmasi ditekan
- [x] Styling input kuis identifikasi nilai $a, b, c$ dan tombol interaktif

### Fase 3: Logika Generator Persamaan & Kuis Identifikasi (JavaScript)
*Fokus Belajar: Math.floor(Math.random()), integrasi renderMathInElement (KaTeX), event listener click, validasi angka.*
- [x] Inisialisasi rendering KaTeX saat DOM siap
- [x] Logika tombol konfirmasi di panel kiri untuk membuka/mengaktifkan panel kanan
- [x] Fungsi pembuat persamaan kuadrat acak dengan 6 variasi permutasi posisi suku aljabar
- [x] Pengecekan jawaban siswa untuk nilai $a$, $b$, dan $c$
- [x] Umpan balik langsung: highlight hijau jika benar, petunjuk ramah jika keliru (misal: "Hati-hati dengan tanda minus pada koefisien $b$")
- [x] Tombol lanjut ke Modul Menghitung Diskriminan setelah berhasil menjawab

### Fase 4: Modul Inti Diskriminan & Interaksi Slot (Pengembangan Lanjutan)
*Fokus Belajar: Drag and drop kartu koefisien, kalkulasi bertahap b^2 - 4ac, kaitan dengan tanda di dalam akar ABC.*
- [ ] Kepingan koefisien $a, b, c$ yang dapat di-drag ke template slot rumus `( [b] )² - 4( [a] )( [c] )`
- [ ] Breakdown langkah perhitungan otomatis ($b^2$, lalu $4ac$, lalu hasil akhir $D$)
- [ ] Animasi visualisasi nilai di dalam akar rumus ABC $\sqrt{D}$
- [ ] Pemilihan sifat akar (2 akar riil berbeda, akar kembar, tidak riil)

### Fase 5: Level Quest & Scaffolding Tantangan (Main & Side Quest)
*Fokus Belajar: State machine quest bertingkat, penanganan soal parameter aljabar kx^2 - kx + 3 = 0.*
- [ ] Main Quest Stage 1: Latihan esensial 1a ($D>0$), 1b ($D<0$), 1c ($D=0$)
- [ ] Main Quest Stage 2: Soal parameter $k$ dengan panduan aljabar pemfaktoran dan eliminasi syarat $a \neq 0$
- [ ] Side Quest Stage 3: Pengayaan parameter $p$ dan akar saling berlawanan/berkebalikan ($b=0$ / $a=c$)

### Fase 5: Evaluasi & Finishing
- [ ] Review kode bersama pengguna (penjelasan baris per baris)
- [ ] Optimasi UX pada perangkat layar sentuh / smartphone
- [ ] Finalisasi panduan guru & scaffolding
