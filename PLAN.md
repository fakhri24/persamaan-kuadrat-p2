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
*Fokus Belajar: Semantic HTML5, Form input kuadrat ($a, b, c$), Card display, dan Tombol Aksi.*
- [ ] Struktur Container Utama (Header, Game Arena, Control Panel, Scoreboard)
- [ ] Input koefisien persamaan kuadrat $ax^2 + bx + c = 0$
- [ ] Area visualisasi kondisi Diskriminan ($D > 0, D = 0, D < 0$)
- [ ] Section Main Quest (Latihan dasar) dan Side Quest (Pengayaan parameter $k$ atau $p$)

### Fase 2: Penataan Gaya & Layout Modern (CSS)
*Fokus Belajar: CSS Variables, Flexbox/Grid, Animasi transisi, dan Desain responsif mobile-first.*
- [ ] Desain tema visual kartu interaktif yang menarik untuk siswa
- [ ] Efek hover, fokus input, dan tombol interaktif
- [ ] Visual indicator warna untuk jenis akar (misal: Hijau = 2 Real Berbeda, Kuning = Real Kembar, Ungu/Merah = Imajiner)

### Fase 3: Logika Matematika & DOM Manipulation (JavaScript)
*Fokus Belajar: Event Listener, Fungsi kalkulasi aljabar, Manipulasi text & class HTML.*
- [ ] Ekstraksi nilai $a, b, c$ dari elemen input
- [ ] Fungsi kalkulasi $D = b^2 - 4ac$
- [ ] Evaluasi sifat akar (2 akar berbeda jika $D > 0$, kembar jika $D = 0$, tidak riil jika $D < 0$)
- [ ] Validasi syarat persamaan kuadrat ($a \neq 0$)

### Fase 4: Mekanik Game & Mode Latihan
*Fokus Belajar: State management sederhana, pergantian soal dinamis, timer/skor.*
- [ ] Mode Eksplorasi Bebas (Siswa bebas geser/masukkan nilai $a, b, c$ dan melihat kurva/karakteristik $D$)
- [ ] Mode Tebak Tantangan / Main Quest (Soal menghitung $D$ dan memilih sifat akar)
- [ ] Mode Parameter Lanjutan / Side Quest (Mencari nilai $k$ agar akar kembar $D = 0$)

### Fase 5: Evaluasi & Finishing
- [ ] Review kode bersama pengguna (penjelasan baris per baris)
- [ ] Optimasi UX pada perangkat layar sentuh / smartphone
- [ ] Finalisasi panduan guru & scaffolding
