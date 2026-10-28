# Roadmap & Rencana Pengerjaan (PLAN.md)
*Proyek: Web Pembelajaran Interaktif Persamaan Kuadrat (Materi: Diskriminan)*

Dokumen ini melacak daftar tugas, tahapan implementasi bertahap, dan progres fitur yang akan kita bangun sedikit demi sedikit. **Dokumen ini tidak memuat aturan kerja arsitektur atau log keputusan (silakan merujuk ke AGENTS.md).**

---

## Ringkasan Progres
- [x] **Fase 0**: Inisialisasi Repositori & Template Dasar (5 File Inti) + Setup GitHub Pages
- [ ] **Fase 1**: Fondasi Materi & Kuis Identifikasi Koefisien (HTML + KaTeX)
- [ ] **Fase 2**: Penataan Gaya Dual-Panel 50-50 & Card Visual (CSS)
- [ ] **Fase 3**: Logika Generator Persamaan & Kuis Identifikasi a, b, c (JS)
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
- [ ] Menghubungkan library KaTeX CDN (CSS + JS + auto-render extension) dengan delimiter `$...$` dan `$$...$$`
- [ ] Struktur Layout Dual-Panel (Grid/Flex 50% - 50%):
  - **Panel Kiri (Materi Inti)**:
    - Display persamaan kuadrat umum: $ax^2 + bx + c = 0$ dengan penjelasan koefisien $a$, $b$, dan konstanta $c$
    - Display rumus ABC: $x = \frac{-b \pm \sqrt{b^2 - 4ac}}{2a}$
    - Penanda fokus visual pada bagian di dalam akar: $D = b^2 - 4ac$
    - Tombol konfirmasi interaktif: "Saya Sudah Paham! Mulai Kuis Cepat"
  - **Panel Kanan (Kuis Singkat Identifikasi)**:
    - Wadah soal persamaan kuadrat acak dengan urutan suku teracak dinamis (misal: $c + ax^2 + bx = 0$ atau $bx + c + ax^2 = 0$)
    - Tiga kotak input angka berdampingan: $a = [ \dots ]$, $b = [ \dots ]$, $c = [ \dots ]$
    - Tombol "Periksa Jawaban" & tombol "Ganti Persamaan Lain"
    - Area pesan umpan balik ramah / refleksi pedagogis jika salah tanda minus atau tertukar koefisien

### Fase 2: Penataan Gaya & Layout Modern (CSS)
*Fokus Belajar: CSS Grid split-screen 50/50, Flexbox, Styling ekspresi KaTeX, Desain responsive mobile (stacking).*
- [ ] Variabel warna tema edukatif & modern
- [ ] Desain split container (50% kiri dan 50% kanan di desktop, vertikal stack di HP)
- [ ] Styling kartu rumus KaTeX dengan background kontras dan sorotan warna (highlight)
- [ ] Animasi transisi membuka panel kanan setelah tombol konfirmasi ditekan
- [ ] Styling input kuis identifikasi nilai $a, b, c$ dan tombol interaktif

### Fase 3: Logika Generator Persamaan & Kuis Identifikasi (JavaScript)
*Fokus Belajar: Math.floor(Math.random()), integrasi renderMathInElement (KaTeX), event listener click, validasi angka.*
- [ ] Inisialisasi rendering KaTeX saat DOM siap
- [ ] Logika tombol konfirmasi di panel kiri untuk membuka/mengaktifkan panel kanan
- [ ] Fungsi pembuat persamaan kuadrat acak yang natural (variasi tanda minus, $a=1$, dll.)
- [ ] Pengecekan jawaban siswa untuk nilai $a$, $b$, dan $c$
- [ ] Umpan balik langsung: highlight hijau jika benar, petunjuk ramah jika keliru (misal: "Hati-hati dengan tanda minus pada koefisien $b$")
- [ ] Tombol lanjut ke Modul Menghitung Diskriminan setelah berhasil menjawab

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
