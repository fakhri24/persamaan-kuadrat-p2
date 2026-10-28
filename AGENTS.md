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
- **[2026-10-28] Mekanik Utama Aplikasi**: Memilih format gabungan "Lab Simulasi Interaktif + Level Quest". Terdiri dari dua pilar utama:
  1. *Lab Simulasi Visual*: Slider dinamis untuk koefisien $a, b, c$ yang memperlihatkan grafik parabola dan nilai $D = b^2 - 4ac$ secara real-time.
  2. *Level Quest*: Mode tantangan bertingkat (Scaffolding: Main Quest untuk pemahaman esensial dan Side Quest untuk pengayaan parameter $k$ atau $p$).
