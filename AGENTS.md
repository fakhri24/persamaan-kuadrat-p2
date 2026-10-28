# Panduan & Log Keputusan Agent (AGENTS.md)
*Proyek: Web Pembelajaran Interaktif Persamaan Kuadrat (Materi: Diskriminan)*

Dokumen ini adalah single source of truth untuk peran kerja, standar teknis, gaya komunikasi edukatif, dan pencatatan keputusan (Decision Log). **Dokumen ini tidak memuat checklist pengerjaan atau roadmap langkah (silakan merujuk ke PLAN.md).**

---

## 1. Peran & Cara Kerja Kolaboratif
- **Lead AI / Tutor Coding**: Bertindak sebagai mentor pemrograman yang ramah. Setiap baris kode yang ditulis dijelaskan konsep dasarnya (mengapa tag ini dipakai, apa fungsi styling ini, bagaimana JavaScript memanipulasi DOM).
- **User (Learner & Product Owner)**: Memegang visi permainan, ide mekanik game, dan alur belajar siswa.
- **Workflow Pengerjaan**:
  1. Fitur dikerjakan secara modular dan bertahap (sedikit demi sedikit).
  2. Pembahasan kode dijelaskan dengan analogi mudah dipahami.
  3. Setiap milestone selesai: sinkronisasi `AGENTS.md` & `PLAN.md`, lalu lakukan Git Commit & Push untuk deployment GitHub Pages.

---

## 2. Standar Teknis & Arsitektur
- **Stack**: Vanilla HTML5, Vanilla CSS3, dan Vanilla JavaScript (ES6+). Tanpa framework atau library eksternal berlebih pada tahap awal agar konsep inti web dipahami secara utuh.
- **Struktur File**:
  - `index.html` : Struktur semantik dan antarmuka (UI).
  - `style.css` : Tampilan visual, layout responsif (Flexbox/Grid), dan animasi interaktif.
  - `script.js` : State aplikasi, kalkulasi matematika ($D = b^2 - 4ac$), dan interaktivitas game.
- **Kebijakan Cache (Zero-Cache)**:
  - Mengingat aplikasi ini adalah media pembelajaran interaktif yang sering diperbarui, gunakan header/meta `no-cache` agar perubahan langsung terlihat di browser siswa tanpa kendala cache usang.

---

## 3. Log Keputusan (Decision Log)
*Format: `[YYYY-MM-DD] Keputusan: Alasan & Konteks`*

- **[2026-10-28] Pemisahan File Modular**: Proyek diputuskan menggunakan 3 file terpisah (`index.html`, `style.css`, `script.js`) dengan Vanilla JS untuk memaksimalkan pemahaman dasar web development.
- **[2026-10-28] Pemisahan Dokumen Manajemen**: `AGENTS.md` khusus untuk aturan, arsitektur, dan keputusan permanen. `PLAN.md` khusus untuk to-do list, milestone, dan progres implementasi.
- **[2026-10-28] Gaya Penjelasan Interaktif**: Setiap perubahan kode wajib disertai penjelasan edukatif seputar fungsi tag HTML, selektor CSS, dan alur logika event di JavaScript.
- **[2026-10-28] Fokus Pedagogis Tanpa Grafik**: Siswa belum mempelajari grafik fungsi kuadrat, sehingga visualisasi koordinat parabola ditiadakan. Fokus visual dialihkan 100% ke pemahaman aljabar, breakdown langkah rumus diskriminan $D = b^2 - 4ac$, dan kaitannya dengan bagian di dalam akar pada rumus ABC ($x = \frac{-b \pm \sqrt{D}}{2a}$).
- **[2026-10-28] Generator Persamaan Acak (Randomizer Engine)**: Menggantikan slider statis dengan sistem generator angka/persamaan acak. Siswa diajak mengamati dan memasukkan nilai koefisien $a, b, c$ ke dalam cetakan rumus $D$ untuk menguji dampaknya secara interaktif.
- **[2026-10-28] Interaksi Step-by-Step Slot Rumus**: Interaksi utama menggunakan template rumus berlubang `( ... )² - 4( ... )( ... )`. Siswa memasukkan koefisien $a, b, c$ ke dalam slot yang tepat, membuka perhitungan bertahap ($b^2$, lalu $4ac$, lalu pengurangan), dan memilih kesimpulan sifat akar berdasarkan hasil $D$ dan tanda di dalam akar rumus ABC.
- **[2026-10-28] Mekanisme Input Drag-and-Drop (Touch & Mouse)**: Menggunakan interaksi Drag & Drop visual untuk menyeret kepingan kartu koefisien $a, b, c$ ke dalam slot rumus. Wajib mendukung event pointer/touch (`PointerEvent` / `touchstart` / `touchmove` / `touchend` atau HTML5 Drag & Drop dengan fallback touch) agar lancar digunakan di HP dan tablet siswa.
- **[2026-10-28] Scaffolding Stage 2 (Tantangan Parameter)**: Pada soal parameter seperti $kx^2 - kx + 3 = 0$, siswa menggunakan metode Guided Step-by-Step Aljabar:
  1. Menyeret kepingan parameter $k$ ke rumus $D$.
  2. Menyusun kondisi akar kembar $D = 0 \rightarrow (-k)^2 - 4(k)(3) = 0 \rightarrow k^2 - 12k = 0$.
  3. Memfaktorkan $k(k - 12) = 0$, menghasilkan $k = 0$ atau $k = 12$.
  4. Muncul dialog reflektif pedagogis: Mengapa $k = 0$ gugur? Karena jika $k = 0$, koefisien $x^2$ menjadi 0 ($a = 0$), sehingga bukan lagi persamaan kuadrat. Jadi solusi tunggal yang valid adalah $k = 12$.
- **[2026-10-28] Alur Pembelajaran Terpadu (Story Mode Linier)**: Alur aplikasi dirancang sebagai progresi petualangan bertahap (Stage-by-Stage). Dimulai langsung dari Stage 1 (Main Quest: Latihan 5.2 No. 1a, 1b, 1c), menuju Stage 2 (Main Quest: Menentukan nilai parameter $k$ untuk akar kembar), hingga Stage 3 (Side Quest: Parameter $p$ dan $m$ dengan kondisi akar khusus). Di setiap stage, terdapat slot interaktif dan tombol bantuan "Coba Angka Bebas / Sandbox" jika siswa ingin menguji coba secara bebas.
