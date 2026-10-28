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
- **[2026-10-28] Filosofi Umpan Balik (Konstruktif Tanpa Hukuman Game Over)**: Sistem tidak menggunakan mekanisme nyawa habis atau reset paksa. Kesalahan dipandang sebagai proses belajar alami. Ketika siswa salah meletakkan kepingan atau keliru memilih sifat akar, sistem memberikan kartu animasi "Petunjuk Berpikir" (scaffolding hint) yang mengarahkan mereka untuk memperbaiki secara mandiri.
- **[2026-10-28] Rendering Rumus Matematika (KaTeX Standard)**: Semua ekspresi matematika wajib dirender menggunakan KaTeX (via CDN) dengan auto-render extension yang menerima delimiter `$...$` untuk inline math dan `$$...$$` untuk display math.
- **[2026-10-28] Alur Pembuka Aplikasi (Dual-Panel: Fondasi Materi & Kuis Identifikasi a, b, c)**:
  1. *Panel Kiri (50%)*: Menampilkan bentuk umum $ax^2 + bx + c = 0$ dan rumus ABC $x = \frac{-b \pm \sqrt{b^2 - 4ac}}{2a}$, dengan penekanan pada bagian di dalam akar yaitu Diskriminan ($D$). Dilengkapi tombol konfirmasi pemahaman siswa.
  2. *Panel Kanan (50%)*: Muncul setelah siswa mengonfirmasi pemahaman di panel kiri. Menyajikan persamaan kuadrat acak dan kuis singkat bagi siswa untuk melatih ketepatan mengidentifikasi nilai $a$, $b$, dan $c$ (termasuk tanda negatif) sebelum masuk ke perhitungan diskriminan.
- **[2026-10-28] Mekanik Kuis Koefisien (Anti-Hafalan Urutan & 3 Input Box)**:
  - Siswa mengetik nilai $a$, $b$, dan $c$ pada 3 input box berdampingan lalu menekan tombol "Periksa Jawaban".
  - *Fitur Anti-Hafalan (6 Permutasi Lengkap)*: Urutan suku pada persamaan kuadrat menggunakan seluruh kombinasi matematis ($3! = 6$ variasi):
    1. $ax^2 + bx + c = 0$
    2. $ax^2 + c + bx = 0$
    3. $bx + ax^2 + c = 0$
    4. $bx + c + ax^2 = 0$
    5. $c + ax^2 + bx = 0$
    6. $c + bx + ax^2 = 0$  
    Hal ini memastikan bobot posisi suku $x^2$, $x$, dan konstanta terdistribusi seimbang (masing-masing 33.3% di posisi depan) tanpa bias.
- **[2026-10-28] Standar Layout Simetris CSS Grid (50:50 Rigid)**:
  - Menggunakan `grid-template-columns: minmax(0, 1fr) minmax(0, 1fr)` dan `min-width: 0` pada panel kontainer. Hal ini mencegah perilaku default `1fr` (`minmax(auto, 1fr)`) yang dapat terdistorsi melebar akibat konten form/input di panel kanan.
- **[2026-10-28] Desain Minimalis & Pop-up Keterangan On-Demand**:
  - Badge kurikulum pada header dan footer copyright dihapus untuk memaksimalkan fokus visual aplikasi.
  - Teks penjelasan rincian koefisien ($a, b, c$) dan keterangan penting Diskriminan ($D$) pada panel kiri disembunyikan secara default, digantikan tombol pop-up modal (`ℹ️ Keterangan` dan `💡 Keterangan Penting!`). Hal ini mengurangi beban kognitif siswa (cognitive load) sehingga antarmuka tetap bersih dan siswa membuka penjelasan saat dibutuhkan saja.
- **[2026-10-28] Latar Belakang Gradasi Animasi Dinamis (Evolusi Strategi 1 & 2)**:
  - Telah diimplementasikan perpaduan Strategi 1 (gradasi linear kontras tinggi) lalu ditingkatkan ke **Strategi 2 (Dual Spotlight & Radial Ambient Aurora Mesh)**:
    1. Lapisan dasar gelap ruang angkasa (`#060913`).
    2. Tiga bola cahaya (*glow orbs*) terdistribusi secara strategis: Indigo Nebula di kiri atas, Violet Aurora di kanan bawah, dan Cyan Accent di tengah.
    3. Menggunakan animasi mengapung halus (`@keyframes orbFloat1, 2, 3`) dengan durasi berbeda (12s, 15s, 18s) sehingga tampak organik dan hidup.
    4. Kartu antarmuka (`.panel`) menggunakan *frosted glassmorphism* (`backdrop-filter: blur(16px)` dan semi-transparan `rgba(30, 41, 59, 0.82)`) agar aura cahaya di belakang memancar lembut di tepi kartu tanpa mengorbankan kenyamanan membaca rumus matematika.
- **[2026-10-28] Latar Belakang Interaktif Math Canvas (Vector Grid & Graph Nodes)**:
  - Menggantikan efek CSS orbs kabut dengan engine **HTML5 `<canvas>` interaktif**:
    1. *Dynamic Radial Light*: Senter cahaya radial yang mengikuti kursor mouse secara halus (*spring interpolation*).
    2. *Vector Needles Grid*: Titik jarum grid matematis yang bereaksi berputar dan berpendar terang saat didekati kursor mouse.
    3. *Constellation Graph Nodes*: Titik-titik node yang saling terhubung garis jaring saat berdekatan.
    4. *Floating Math Symbols*: Simbol matematika riil ($\pi, \sum, \int, \sqrt{\dots}, \infty, \Delta, \theta, \lambda, \partial, \nabla$) yang melayang dinamis pada node konstelasi.
    5. *Performa Tinggi*: Berjalan pada 60 FPS menggunakan `requestAnimationFrame` dan penskalaan Retina display DPR tanpa lag.
- **[2026-10-28] Peningkatan Responsivitas Penuh Garis & Simbol terhadap Mouse (Axiom Engine)**:
  - *Dynamic Pointer Links*: Kursor mouse bertindak sebagai simpul aktif konstelasi. Garis-garis dinamis terhubung dari kursor ke seluruh node dalam `mouseRadius`, dan garis antar-node di sekitar kursor menyala cyan terang.
  - *Repel Fisika & Pendar Simbol*: Node dan simbol matematika terdorong menjauh secara pegas halus saat didekati kursor, serta membesar dan berpendar cyan terang (`shadowBlur: 10`).
  - *Active Cursor Node*: Titik inti cyan (`#38BDF8`) dan cincin pendar bernapas di posisi kursor.
  - *Pemicu Gelombang Kejut (Shockwave Ripple)*: Klik atau ketukan di mana saja memicu gelombang kejut radial yang memutar jarum medan vektor dan mendorong node keluar.
  - *Frosted Glassmorphism Kedalaman*: Kartu panel disesuaikan ke `rgba(15, 23, 42, 0.72)` dengan `backdrop-filter: blur(12px)` agar pergerakan garis dan simbol di baliknya terlihat hidup tanpa mengorbankan keterbacaan KaTeX.
- **[2026-10-28] Alur Pembelajaran Terpadu (Story Mode Linier)**: Alur aplikasi dirancang sebagai progresi petualangan bertahap (Stage-by-Stage). Dimulai langsung dari Stage 1 (Main Quest: Latihan 5.2 No. 1a, 1b, 1c), menuju Stage 2 (Main Quest: Menentukan nilai parameter $k$ untuk akar kembar), hingga Stage 3 (Side Quest: Parameter $p$ dan $m$ dengan kondisi akar khusus). Di setiap stage, terdapat slot interaktif dan tombol bantuan "Coba Angka Bebas / Sandbox" jika siswa ingin menguji coba secara bebas.
- **[2026-10-28] Label Input Kuis Diringkas (Nilai $a$:)**: Label tiga kotak input kuis identifikasi koefisien disederhanakan menjadi satu baris `Nilai $a$:` / `Nilai $b$:` / `Nilai $c$:`.
  - Alasan: teks kecil *(koefisien $x^2$)*, *(koefisien $x$)*, dan *(konstanta)* memakan ruang, membuat titik dua turun ke baris baru (karena `small` diberi `display:block`), dan menambah beban visual. Istilah "koefisien" sudah dijelaskan di panel kiri, sehingga di sini cukup nama nilainya saja.
  - Teknis: titik dua diletakkan inline tepat setelah simbol KaTeX (tanpa `display:flex`, memakai `white-space: nowrap`) agar selalu sejajar dan menempel pada nilai; ukuran `.katex` di dalam label diset `1em` supaya proporsional dengan teks "Nilai".
  - Bonus rapi: spinner bawaan `input[type=number]` disembunyikan dan `::placeholder` diperkecil, sehingga contoh seperti `contoh: -11` tetap utuh di kolom sempit pada HP.
- **[2026-10-28] Perpindahan Stage 1 → Stage 2 (Sembunyikan Fondasi & Kuis)**: Klik "Lanjut ke Petualangan Menghitung Diskriminan" tidak lagi memunculkan `alert`, melainkan mengganti tampilan:
  - Seluruh `main#stage1-layout` (panel kiri fondasi + panel kanan kuis a, b, c) diberi kelas `.hidden`, lalu `#stage-diskriminan` ditampilkan. Jadi semua materi review identifikasi koefisien dan kuisnya benar-benar hilang dari layar saat siswa masuk misi diskriminan.
  - Subtitle header ikut berubah sesuai tahap dan tombol kecil "← Fondasi & Kuis" disediakan agar siswa bisa mengulang materi bila perlu (state kuis tetap tersimpan).
- **[2026-10-28] Arsitektur Stage 2 (Fase 4) - Panggung Rumus, Bedah Langkah, Sifat Akar**:
  - *Panel Kiri (Langkah 3)*: soal persamaan acak (urutan suku tetap diacak seperti kuis) + template slot `D = ( [b] )² − 4 ( [a] ) ( [c] )` + baki kepingan angka.
  - *Panel Kanan (Langkah 4)*: terkunci sampai susunan slot benar, lalu menampilkan tiga kartu langkah ($b^2$, $4ac$, $D = b^2 - 4ac$), visualisasi $x = \frac{-b \pm \sqrt{D}}{2a}$ dengan angka asli, dan tombol pilihan sifat akar.
  - *Validasi berbasis nilai*: kepingan hanya menampilkan angka (bukan label $a$/$b$/$c$), sehingga siswa wajib mengidentifikasi koefisien dari persamaan. Karena itu validasi membandingkan nilai slot dengan nilai koefisien, bukan identitas kepingan; bila dua koefisien bernilai sama, keduanya sah saling menggantikan.
  - *Dukungan input ganda*: drag-and-drop memakai Pointer Events (mouse + sentuh, `touch-action: none` pada kepingan agar tidak memicu scroll), plus fallback ketuk kepingan lalu ketuk slot untuk perangkat/siswa yang lebih nyaman mengetuk.
  - *Generator soal sadar-tanda*: soal Stage 2 dipilih acak dari tiga "rasa" ($D>0$, $D=0$, $D<0$). Kasus $D=0$ dikonstruksi dengan $b = 2ak$ dan $c = ak^2$ sehingga dijamin akar kembar tanpa perlu mengulang percobaan.
  - *Umpan balik konstruktif*: salah susun slot menyorot slot yang keliru dan memberi petunjuk peta rumus (termasuk pengingat koefisien implisit $1$), salah memilih sifat akar memberi pertanyaan penuntun tentang tanda $D$ dan arti $\sqrt{D}$; tidak ada hukuman game over.
