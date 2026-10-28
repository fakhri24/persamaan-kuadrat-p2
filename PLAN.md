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
*Fokus Belajar: Semantic HTML5, Stage Progression Container, Kepingan Draggable, Dropzone Formula, dan Card Kaitan Rumus ABC.*
- [ ] Header & Status Bar Petualangan (Indikator Stage/Level, Nyawa/Bintang, & Poin)
- [ ] Container Quest Terpadu (Stage 1: Main Quest Esensial, Stage 2: Main Quest Parameter $k$, Stage 3: Side Quest Pengayaan)
- [ ] Bank Kepingan Koefisien (Elemen Draggable untuk nilai $a, b, c$)
- [ ] Slot Interaktif Rumus Diskriminan (Dropzone):
  - Dropzone slot untuk $b$: `( [ Drop b ] )²`
  - Dropzone slot untuk $a$: `- 4( [ Drop a ] )`
  - Dropzone slot untuk $c$: `( [ Drop c ] )`
- [ ] Area Kalkulasi Bertahap (Step-by-step reveal: Hitung $b^2$, hitung $4ac$, hasil akhir $D$)
- [ ] Kartu Kaitan Rumus ABC: Visualisasi $x = \frac{-b \pm \sqrt{D}}{2a}$ yang menunjukkan nilai di dalam tanda akar
- [ ] Pilihan Kesimpulan Sifat Akar (3 Tombol: 2 Akar Riil Berbeda, Akar Kembar, Tidak Riil)
- [ ] Tombol & Modal Bantuan Sandbox ("🎲 Coba Angka Bebas / Uji Rumus Sendiri")

### Fase 2: Penataan Gaya & Layout Modern (CSS)
*Fokus Belajar: CSS Variables, Styling kepingan drag-and-drop, Dropzone hover/active states, Visual feedback benar/salah, dan Responsive design.*
- [ ] Desain tema modern, bersih, dan edukatif (Dark UI elegan)
- [ ] Status bar dan progress bar penyelesaian quest
- [ ] Kepingan kartu draggable: cursor grab, bayangan elevasi, dan warna pembeda koefisien
- [ ] Dropzone slot box dengan animasi border berkedip / dashed saat siap menerima kepingan
- [ ] Indikator visual berbasis tanda diskriminan di dalam akar:
  - Hijau: $D > 0 \rightarrow \sqrt{+ \dots}$ (2 solusi riil berlainan)
  - Kuning: $D = 0 \rightarrow \sqrt{0}$ (Solusi kembar)
  - Merah: $D < 0 \rightarrow \sqrt{- \dots}$ (Tidak ada akar riil)
- [ ] Modal/popover untuk mode Sandbox "Coba Angka Bebas"

### Fase 3: Logika Matematika, Stage State, & DOM (JavaScript)
*Fokus Belajar: Drag & Drop API / Touch Pointer events, state machine stage quest, kalkulasi step-by-step, update DOM dinamis.*
- [ ] Struktur Data Soal (Database JSON lokal untuk Main Quest & Side Quest)
- [ ] Mekanisme Drag-and-Drop (Mendukung mouse drag & touch pointer pada layar HP)
- [ ] Penempatan koefisien pada dropzone yang tepat ($b, a, c$) dan validasi posisi
- [ ] Kalkulasi bertahap otomatis saat ketiga slot terisi:
  1. $b^2$
  2. $4 \times a \times c$
  3. $D = b^2 - 4ac$
- [ ] Dinamika rumus ABC: animasi penarikan akar $\sqrt{D}$
- [ ] Validasi pilihan kesimpulan siswa dan pemberian feedback pedagogis
- [ ] Logika tombol sandbox bebas (generate angka acak untuk coba-coba)

### Fase 4: Mekanik Game & Scaffolding Pedagogis
*Fokus Belajar: Logika kelulusan stage, unlocking level berikutnya, petunjuk bertingkat (hints).*
- [ ] Stage 1: Main Quest 1a ($D>0$), 1b ($D<0$), 1c ($D=0$) dengan slot kepingan drag-and-drop
- [ ] Stage 2: Main Quest No. 4 ($kx^2 - kx + 3 = 0$):
  - Drag parameter $k$ ke slot formula
  - Membimbing aljabar $k^2 - 12k = 0 \rightarrow k(k - 12) = 0$
  - Interaktif refleksi kritis: eliminasi $k = 0$ karena syarat $a \neq 0$, menyisakan $k = 12$
- [ ] Stage 3: Side Quest Pengayaan:
  - Soal No. 2: $px^2 - (2p-2)x + p = 0$ dengan syarat 2 akar riil berbeda ($D > 0$)
  - Soal No. 8: $mx^2 + (m-5)x - 20 = 0$ dengan akar saling berlawanan ($b = 0 \rightarrow m - 5 = 0 \rightarrow m = 5$)
  - Konsep akar berkebalikan ($a = c$)
- [ ] Sistem reward: Badge penguasaan "Master Diskriminan" & rangkuman capaian belajar

### Fase 5: Evaluasi & Finishing
- [ ] Review kode bersama pengguna (penjelasan baris per baris)
- [ ] Optimasi UX pada perangkat layar sentuh / smartphone
- [ ] Finalisasi panduan guru & scaffolding
