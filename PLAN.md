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
*Fokus Belajar: Semantic HTML5, Komponen Slider, Card Display, dan Layout Arena Simulasi & Quest.*
- [ ] Header & Navigasi Mode (Tab: "🔬 Lab Simulasi" & "⚔️ Level Quest")
- [ ] Section Lab Simulasi: Panel slider koefisien ($a, b, c$), display formula $ax^2 + bx + c = 0$, dan canvas/kartu kurva parabola
- [ ] Card Live Metric: Nilai $D = b^2 - 4ac$, indikator badge jenis akar, serta keterkaitan dengan rumus ABC ($\sqrt{D}$)
- [ ] Section Level Quest: Container soal Main Quest (1a, 1b, 1c, No. 4) dan Side Quest (No. 2, No. 8)

### Fase 2: Penataan Gaya & Layout Modern (CSS)
*Fokus Belajar: CSS Variables, Glassmorphism/Dark UI, Flexbox/Grid, Animasi visual transisi indikator.*
- [ ] Desain tema modern & responsif (mobile friendly)
- [ ] Styling khusus slider koefisien dan badge dinamika status akar
- [ ] Visual indicator warna untuk jenis akar:
  - Hijau: $D > 0$ (2 akar riil berbeda, kurva memotong sumbu X di 2 titik)
  - Kuning: $D = 0$ (Akar riil kembar, puncak kurva menyinggung sumbu X)
  - Merah/Ungu: $D < 0$ (Tidak riil/imajiner, kurva melayang/tidak memotong sumbu X)
- [ ] Efek animasi kartu quest dan feedback jawaban benar/salah

### Fase 3: Logika Matematika, Canvas Kurva, & DOM (JavaScript)
*Fokus Belajar: Event listener 'input', kalkulasi $D$, rendering grafik parabola sederhana di `<canvas>`, dan state sync.*
- [ ] Event listener slider $a, b, c$ dengan pembatasan syarat persamaan kuadrat ($a \neq 0$)
- [ ] Fungsi kalkulasi $D = b^2 - 4ac$ dan pemecahan langkah perhitungan
- [ ] Visualisasi sederhana kurva parabola pada Canvas HTML5 secara real-time
- [ ] Integrasi narasi pedagogis: kaitan tanda $D$ di dalam rumus ABC ($x = \frac{-b \pm \sqrt{D}}{2a}$)

### Fase 4: Sistem Quest & Gamifikasi Interaktif
*Fokus Belajar: Data struktur soal, validasi jawaban siswa, scaffolding feedback, dan skor.*
- [ ] Generator/Daftar Soal Main Quest (Siswa menghitung $D$ dan menentukan sifat akar)
- [ ] Quest Parameter Lanjutan (Tantangan mencari nilai $k$ atau $p$ agar $D=0$ atau $D>0$)
- [ ] Sistem scaffolding: petunjuk bertahap (hint system) jika siswa kesulitan
- [ ] Sistem skor, bintang, dan perayaan saat menyelesaikan quest

### Fase 5: Evaluasi & Finishing
- [ ] Review kode bersama pengguna (penjelasan baris per baris)
- [ ] Optimasi UX pada perangkat layar sentuh / smartphone
- [ ] Finalisasi panduan guru & scaffolding
