/**
 * ==========================================================================
 * PETUALANGAN DISKRIMINAN - SCRIPT UTAMA
 * Tahap 1: KaTeX Auto-Render, Pembuka Materi, & Kuis Identifikasi Koefisien
 * ==========================================================================
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Inisialisasi Latar Belakang Interaktif Math Canvas (Vector Grid & Graph Nodes)
  initMathBackground();

  // 2. Inisialisasi KaTeX Auto-Render untuk memformat rumus $...$ dan $$...$$
  renderRumusMatematika();

  // State kuis koefisien saat ini
  let currentProblem = {
    a: 2,
    b: 3,
    c: -11,
  };

  // Referensi elemen-elemen DOM (Document Object Model)
  const btnPaham = document.getElementById('btn-paham');
  const panelKuis = document.getElementById('panel-kuis');
  const lockedView = document.getElementById('quiz-locked-view');
  const activeView = document.getElementById('quiz-active-view');

  const equationDisplay = document.getElementById('equation-display');
  const inputA = document.getElementById('input-a');
  const inputB = document.getElementById('input-b');
  const inputC = document.getElementById('input-c');

  const btnPeriksa = document.getElementById('btn-periksa-abc');
  const btnAcak = document.getElementById('btn-acak-persamaan');
  const feedbackEl = document.getElementById('quiz-feedback');
  const btnLanjut = document.getElementById('btn-lanjut-diskriminan');

  // Referensi Elemen Pop-up Modal Keterangan
  const btnShowKeteranganAbc = document.getElementById('btn-show-keterangan-abc');
  const modalAbc = document.getElementById('modal-abc');
  const btnCloseModalAbc = document.getElementById('btn-close-modal-abc');
  const btnCloseModalAbcFooter = document.getElementById('btn-close-modal-abc-footer');

  const btnShowKeteranganD = document.getElementById('btn-show-keterangan-d');
  const modalD = document.getElementById('modal-d');
  const btnCloseModalD = document.getElementById('btn-close-modal-d');
  const btnCloseModalDFooter = document.getElementById('btn-close-modal-d-footer');

  // ========================================================================
  // LOGIKA MODAL POP-UP (KETERANGAN BERSIH & MINIMALIS)
  // ========================================================================
  function bukaModal(modalElement) {
    if (!modalElement) return;
    modalElement.classList.remove('hidden');
    // Render ulang KaTeX di dalam modal jika ada formula baru
    renderRumusMatematika(modalElement);
  }

  function tutupModal(modalElement) {
    if (!modalElement) return;
    modalElement.classList.add('hidden');
  }

  // Event Listener Buka Modal
  btnShowKeteranganAbc.addEventListener('click', () => bukaModal(modalAbc));
  btnShowKeteranganD.addEventListener('click', () => bukaModal(modalD));

  // Event Listener Tutup Modal via Tombol X dan Footer
  btnCloseModalAbc.addEventListener('click', () => tutupModal(modalAbc));
  btnCloseModalAbcFooter.addEventListener('click', () => tutupModal(modalAbc));
  btnCloseModalD.addEventListener('click', () => tutupModal(modalD));
  btnCloseModalDFooter.addEventListener('click', () => tutupModal(modalD));

  // Klik di luar kartu modal (area backdrop gelap) untuk menutup
  [modalAbc, modalD].forEach(modal => {
    modal.addEventListener('click', (event) => {
      if (event.target === modal) {
        tutupModal(modal);
      }
    });
  });

  // Tekan tombol keyboard ESC untuk menutup semua modal yang aktif
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
      tutupModal(modalAbc);
      tutupModal(modalD);
    }
  });

  // ========================================================================
  // EVENT LISTENER: Tombol "Saya Sudah Paham!"
  // ========================================================================
  btnPaham.addEventListener('click', () => {
    // Buka kunci panel kuis
    panelKuis.classList.remove('panel-locked');
    lockedView.classList.add('hidden');
    activeView.classList.remove('hidden');

    // Buat soal acak pertama dan fokuskan kursor ke input a
    generatePersamaanAcak();
    inputA.focus();

    // Scroll halus ke panel kuis hanya pada tampilan mobile (layar sempit)
    if (window.innerWidth < 900) {
      panelKuis.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });

  // ========================================================================
  // FUNGSI: Generator Persamaan Kuadrat Acak (Anti-Hafalan Urutan: 6 Permutasi Lengkap)
  // ========================================================================
  function generatePersamaanAcak() {
    // 1. Pilih nilai a yang tidak boleh nol (-5 s/d 5, kecuali 0)
    let a = 0;
    while (a === 0) {
      a = Math.floor(Math.random() * 9) - 4; // Rentang: -4 s/d 4
    }

    // 2. Pilih nilai b (-7 s/d 7, kecuali 0)
    let b = 0;
    while (b === 0) {
      b = Math.floor(Math.random() * 15) - 7;
    }

    // 3. Pilih nilai c (-12 s/d 12, kecuali 0)
    let c = 0;
    while (c === 0) {
      c = Math.floor(Math.random() * 25) - 12;
    }

    // Simpan ke state
    currentProblem = { a, b, c };

    // Tampilkan ke layar dan render KaTeX
    equationDisplay.innerHTML = `$$${buatLatexPersamaan(currentProblem)} = 0$$`;
    renderRumusMatematika(equationDisplay);

    // Reset input form & feedback
    inputA.value = '';
    inputB.value = '';
    inputC.value = '';
    inputA.classList.remove('input-correct', 'input-wrong');
    inputB.classList.remove('input-correct', 'input-wrong');
    inputC.classList.remove('input-correct', 'input-wrong');
    feedbackEl.className = 'feedback-card hidden';
    feedbackEl.innerHTML = '';
  }

  // ========================================================================
  // HELPER: Menyusun LaTeX persamaan dengan urutan suku yang diacak
  // (Dipisah agar bisa dipakai kuis Langkah 2 dan misi Langkah 3)
  // ========================================================================
  function buatLatexPersamaan({ a, b, c }) {
    // Format masing-masing suku secara aljabar LaTeX
    const sukuA = formatSukuA(a);
    const sukuB = formatSukuB(b);
    const sukuC = formatSukuC(c);

    // Kumpulan 6 variasi permutasi urutan suku (Peluang kemunculan posisi masing-masing suku seimbang 1/3)
    const polaUrutan = [
      // 1. [A, B, C] -> ax^2 + bx + c = 0 (Bentuk Standar)
      gabungSuku([sukuA, sukuB, sukuC]),
      // 2. [A, C, B] -> ax^2 + c + bx = 0
      gabungSuku([sukuA, sukuC, sukuB]),
      // 3. [B, A, C] -> bx + ax^2 + c = 0
      gabungSuku([sukuB, sukuA, sukuC]),
      // 4. [B, C, A] -> bx + c + ax^2 = 0
      gabungSuku([sukuB, sukuC, sukuA]),
      // 5. [C, A, B] -> c + ax^2 + bx = 0
      gabungSuku([sukuC, sukuA, sukuB]),
      // 6. [C, B, A] -> c + bx + ax^2 = 0
      gabungSuku([sukuC, sukuB, sukuA])
    ];

    // Pilih salah satu pola secara acak
    return polaUrutan[Math.floor(Math.random() * polaUrutan.length)];
  }

  // ========================================================================
  // HELPER FORMAT SUKU ALJABAR
  // ========================================================================
  function formatSukuA(val) {
    if (val === 1) return { tanda: '+', teks: 'x^2' };
    if (val === -1) return { tanda: '-', teks: 'x^2' };
    if (val > 0) return { tanda: '+', teks: `${val}x^2` };
    return { tanda: '-', teks: `${Math.abs(val)}x^2` };
  }

  function formatSukuB(val) {
    if (val === 1) return { tanda: '+', teks: 'x' };
    if (val === -1) return { tanda: '-', teks: 'x' };
    if (val > 0) return { tanda: '+', teks: `${val}x` };
    return { tanda: '-', teks: `${Math.abs(val)}x` };
  }

  function formatSukuC(val) {
    if (val > 0) return { tanda: '+', teks: `${val}` };
    return { tanda: '-', teks: `${Math.abs(val)}` };
  }

  function gabungSuku(listSuku) {
    let hasil = '';
    listSuku.forEach((item, index) => {
      if (index === 0) {
        // Suku pertama: tanda plus tidak perlu ditulis
        hasil += (item.tanda === '-' ? '-' : '') + item.teks;
      } else {
        hasil += ` ${item.tanda} ${item.teks}`;
      }
    });
    return hasil;
  }

  // ========================================================================
  // EVENT LISTENER: Periksa Jawaban Kuis Identifikasi
  // ========================================================================
  btnPeriksa.addEventListener('click', periksaJawaban);

  // Dukungan tombol ENTER di input
  [inputA, inputB, inputC].forEach(input => {
    input.addEventListener('keyup', (e) => {
      if (e.key === 'Enter') periksaJawaban();
    });
  });

  function periksaJawaban() {
    const valA = parseInt(inputA.value, 10);
    const valB = parseInt(inputB.value, 10);
    const valC = parseInt(inputC.value, 10);

    // Validasi apakah semua input sudah terisi
    if (isNaN(valA) || isNaN(valB) || isNaN(valC)) {
      feedbackEl.className = 'feedback-card error';
      feedbackEl.innerHTML = '⚠️ Mohon isi semua kotak nilai $a$, $b$, dan $c$ dengan angka terlebih dahulu.';
      renderRumusMatematika(feedbackEl);
      return;
    }

    const isACorrect = valA === currentProblem.a;
    const isBCorrect = valB === currentProblem.b;
    const isCCorrect = valC === currentProblem.c;

    if (isACorrect && isBCorrect && isCCorrect) {
      feedbackEl.className = 'feedback-card success';
      feedbackEl.innerHTML = `
        🎉 <strong>Tepat sekali! Luar biasa!</strong><br>
        Kamu berhasil mengidentifikasi bahwa:<br>
        &bull; $a = ${currentProblem.a}$ (koefisien $x^2$)<br>
        &bull; $b = ${currentProblem.b}$ (koefisien $x$)<br>
        &bull; $c = ${currentProblem.c}$ (konstanta)<br><br>
        Ingin coba persamaan lain? Klik tombol <em>"Ganti Persamaan"</em>, atau jika sudah mantap, langsung klik tombol <em>"Lanjut ke Petualangan Menghitung Diskriminan"</em> di bawah!
      `;
    } else {
      let petunjuk = '🔍 <strong>Ayo teliti kembali:</strong><br>';
      if (!isACorrect) {
        petunjuk += `&bull; Nilai <strong>$a$</strong> belum tepat. Ingat, $a$ selalu angka di depan $x^2$ (jangan tertipu urutan!).<br>`;
      }
      if (!isBCorrect) {
        petunjuk += `&bull; Nilai <strong>$b$</strong> belum tepat. Periksa angka di depan variabel $x$ beserta tanda positif/negatifnya.<br>`;
      }
      if (!isCCorrect) {
        petunjuk += `&bull; Nilai <strong>$c$</strong> belum tepat. $c$ adalah konstanta murni yang tidak memiliki huruf $x$.<br>`;
      }

      feedbackEl.className = 'feedback-card error';
      feedbackEl.innerHTML = petunjuk;
    }

    renderRumusMatematika(feedbackEl);
  }

  // Tombol Ganti Persamaan
  btnAcak.addEventListener('click', () => {
    generatePersamaanAcak();
  });

  // Tombol Lanjut ke Modul Diskriminan
  btnLanjut.addEventListener('click', masukStage2);

  // ========================================================================
  // STAGE 2: MISI MENGHITUNG DISKRIMINAN (FASE 4)
  // Alur: susun slot b² − 4ac → bedah langkah → simpulkan sifat akar
  // ========================================================================
  const stage1Layout = document.getElementById('stage1-layout');
  const stage2Section = document.getElementById('stage-diskriminan');
  const appSubtitle = document.getElementById('app-subtitle');

  const stage2Equation = document.getElementById('stage2-equation');
  const chipBank = document.getElementById('chip-bank');
  const slotEls = Array.from(document.querySelectorAll('#formula-slots .slot'));
  const btnCekSlot = document.getElementById('btn-cek-slot');
  const btnSoalBaru = document.getElementById('btn-soal-baru');
  const btnResetSlots = document.getElementById('btn-reset-slots');
  const btnKembaliFondasi = document.getElementById('btn-kembali-fondasi');
  const slotFeedback = document.getElementById('slot-feedback');

  const stepsLocked = document.getElementById('steps-locked');
  const stepsArea = document.getElementById('steps-area');
  const stepList = document.getElementById('step-list');
  const rootChecker = document.getElementById('root-checker');
  const rootOptions = Array.from(document.querySelectorAll('#root-options .root-option'));
  const rootFeedback = document.getElementById('root-feedback');

  const SUBTITLE_STAGE1 = 'Memahami karakteristik dan sifat akar melalui analisis nilai $D = b^2 - 4ac$';
  const SUBTITLE_STAGE2 = 'Susun nilai $D = b^2 - 4ac$, hitung bertahap, lalu simpulkan sifat akarnya.';

  // State misi diskriminan
  let soalD = null;              // { a, b, c } soal aktif di Stage 2
  let hasilD = 0;                // nilai D dari soal aktif
  let slotValues = { b: null, a: null, c: null };
  let trayValues = [];           // angka yang masih ada di baki kepingan
  let selectedChipIndex = null;  // kepingan yang dipilih lewat ketukan
  let dragState = null;          // data seret aktif (pointer)
  let suppressSlotClickUntil = 0;
  let stage2Locked = false;      // true setelah susunan benar
  let rootLocked = false;        // true setelah sifat akar dijawab benar
  let stepEls = [];              // 4 kartu langkah yang dibuka satu per satu

  // ------------------------------------------------------------------------
  // Perpindahan stage
  // ------------------------------------------------------------------------
  function masukStage2() {
    // Sembunyikan total fondasi + kuis a, b, c (Stage 1)
    stage1Layout.classList.add('hidden');
    stage2Section.classList.remove('hidden');

    // Paksa animasi masuk diputar ulang setiap kali stage dibuka
    stage2Section.classList.remove('tampil');
    void stage2Section.offsetWidth;
    stage2Section.classList.add('tampil');

    aturSubtitle(SUBTITLE_STAGE2);
    muatMisiDiskriminan();

    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function kembaliKeFondasi() {
    stage2Section.classList.add('hidden');
    stage1Layout.classList.remove('hidden');
    aturSubtitle(SUBTITLE_STAGE1);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function aturSubtitle(teks) {
    appSubtitle.innerHTML = teks;
    renderRumusMatematika(appSubtitle);
  }

  // ------------------------------------------------------------------------
  // Generator soal diskriminan dengan tiga rasa: D > 0, D = 0, dan D < 0
  // ------------------------------------------------------------------------
  function buatSoalDiskriminan() {
    // Pilih "rasa" soal secara adil supaya siswa melihat ketiga kemungkinan
    const mode = ['positif', 'nol', 'negatif'][Math.floor(Math.random() * 3)];

    // Kasus D = 0 sengaja dikonstruksi: b = 2ak dan c = ak²,
    // sehingga b² − 4ac = 4a²k² − 4a²k² = 0 (pasti akar kembar).
    if (mode === 'nol') {
      const daftarA = [-2, -1, 1, 2];
      const daftarK = [-2, -1, 1, 2];
      const a = daftarA[Math.floor(Math.random() * daftarA.length)];
      const k = daftarK[Math.floor(Math.random() * daftarK.length)];
      return { a, b: 2 * a * k, c: a * k * k };
    }

    let a = 0;
    let b = 0;
    let c = 0;
    let percobaan = 0;

    do {
      a = Math.floor(Math.random() * 6) - 3;   // -3 s/d 3
      b = Math.floor(Math.random() * 11) - 5;  // -5 s/d 5
      c = Math.floor(Math.random() * 13) - 6;  // -6 s/d 6
      percobaan++;
    } while (
      percobaan < 300 &&
      (a === 0 || b === 0 || c === 0 ||
        (mode === 'positif' ? b * b - 4 * a * c <= 0 : b * b - 4 * a * c >= 0))
    );

    // Jaring pengaman: kalau perulangan gagal, pakai soal yang pasti valid
    if (a === 0 || b === 0 || c === 0) {
      a = 2;
      b = 3;
      c = -1;
    }

    return { a, b, c };
  }

  // ------------------------------------------------------------------------
  // Menyiapkan ulang satu misi (dipanggil saat masuk stage & "Soal Baru")
  // ------------------------------------------------------------------------
  function muatMisiDiskriminan(soalPaksa) {
    // Guard: parameter ini hanya untuk soal paksa (pengujian), bukan event klik
    soalD = (soalPaksa && Number.isFinite(soalPaksa.a)) ? soalPaksa : buatSoalDiskriminan();

    const { a, b, c } = soalD;
    hasilD = b * b - 4 * a * c;

    slotValues = { b: null, a: null, c: null };
    trayValues = acakUrutan([a, b, c]);
    selectedChipIndex = null;
    stage2Locked = false;
    rootLocked = false;

    // Tampilkan persamaan (urutan suku tetap diacak seperti kuis sebelumnya)
    stage2Equation.innerHTML = `$$${buatLatexPersamaan(soalD)} = 0$$`;
    renderRumusMatematika(stage2Equation);

    renderChipBank();
    perbaruiSlot();

    // Kembalikan panel kanan ke kondisi "menunggu susunan"
    stepsLocked.classList.remove('hidden');
    stepsArea.classList.add('hidden');
    stepList.innerHTML = '';
    stepEls = [];

    // Kesimpulan (pilihan sifat akar) kembali tersembunyi
    rootChecker.classList.add('hidden');
    rootChecker.classList.remove('muncul');

    rootOptions.forEach((tombol) => {
      tombol.disabled = false;
      tombol.classList.remove('correct', 'wrong');
    });

    sembunyikanFeedback(slotFeedback);
    sembunyikanFeedback(rootFeedback);

    btnCekSlot.disabled = false;
    btnResetSlots.disabled = false;

    // Di layar sempit, bawa siswa kembali ke panggung rumus
    if (window.innerWidth < 900) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }

  // Fisher-Yates: mengacu angka kepingan agar tidak selalu urutan a, b, c
  function acakUrutan(daftar) {
    const hasil = daftar.slice();
    for (let i = hasil.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [hasil[i], hasil[j]] = [hasil[j], hasil[i]];
    }
    return hasil;
  }

  // ------------------------------------------------------------------------
  // Baki kepingan angka
  // ------------------------------------------------------------------------
  function renderChipBank() {
    chipBank.innerHTML = '';

    if (trayValues.length === 0) {
      const info = document.createElement('span');
      info.className = 'tray-empty';
      info.textContent = 'Semua kepingan sudah dipasang ✓';
      chipBank.appendChild(info);
      return;
    }

    trayValues.forEach((nilai, index) => {
      const chip = document.createElement('button');
      chip.type = 'button';
      chip.className = 'chip-drag';
      if (index === selectedChipIndex) chip.classList.add('selected');
      chip.textContent = String(nilai);
      chip.dataset.index = String(index);
      chip.setAttribute('aria-pressed', index === selectedChipIndex ? 'true' : 'false');
      chip.setAttribute('aria-label', `Kepingan angka ${nilai}`);

      // Pointer: bisa diseret (mouse & sentuh)
      chip.addEventListener('pointerdown', (event) => mulaiSeret(event, chip, index));

      // Keyboard: Enter/Space menghasilkan click dengan detail = 0
      chip.addEventListener('click', (event) => {
        if (event.detail === 0) pilihChip(index);
      });

      chipBank.appendChild(chip);
    });
  }

  function pilihChip(index) {
    if (stage2Locked) return;
    selectedChipIndex = selectedChipIndex === index ? null : index;
    renderChipBank();
  }

  // ------------------------------------------------------------------------
  // Slot rumus
  // ------------------------------------------------------------------------
  function perbaruiSlot() {
    slotEls.forEach((slot) => {
      const kunci = slot.dataset.slot;
      const nilai = slotValues[kunci];
      const placeholder = slot.querySelector('.slot-placeholder');
      const valueEl = slot.querySelector('.slot-value');

      slot.classList.remove('wrong', 'ok', 'pulse-ok');

      if (nilai === null) {
        slot.classList.remove('filled');
        valueEl.textContent = '';
        placeholder.hidden = false;
      } else {
        slot.classList.add('filled');
        valueEl.textContent = String(nilai);
        placeholder.hidden = true;
      }
    });
  }

  function tempatkanChip(kunciSlot, indexBaki) {
    if (stage2Locked) return;

    const nilai = trayValues[indexBaki];
    if (nilai === undefined) return;

    // Kalau slot sudah terisi, isi lamanya dikembalikan ke baki
    if (slotValues[kunciSlot] !== null) trayValues.push(slotValues[kunciSlot]);

    trayValues.splice(indexBaki, 1);
    slotValues[kunciSlot] = nilai;
    selectedChipIndex = null;

    perbaruiSlot();
    renderChipBank();
    sembunyikanFeedback(slotFeedback);
  }

  function kosongkanSlot(kunciSlot) {
    if (stage2Locked || slotValues[kunciSlot] === null) return;

    trayValues.push(slotValues[kunciSlot]);
    slotValues[kunciSlot] = null;
    selectedChipIndex = null;

    perbaruiSlot();
    renderChipBank();
    sembunyikanFeedback(slotFeedback);
  }

  function kosongkanSemuaSlot() {
    if (stage2Locked) return;

    Object.keys(slotValues).forEach((kunci) => {
      if (slotValues[kunci] !== null) trayValues.push(slotValues[kunci]);
      slotValues[kunci] = null;
    });

    trayValues = acakUrutan(trayValues);
    selectedChipIndex = null;

    perbaruiSlot();
    renderChipBank();
    sembunyikanFeedback(slotFeedback);
  }

  // ------------------------------------------------------------------------
  // Mekanisme seret (Pointer Events: mouse + sentuh, plus fallback ketuk)
  // ------------------------------------------------------------------------
  function mulaiSeret(event, chip, index) {
    if (stage2Locked) return;
    if (event.pointerType === 'mouse' && event.button !== 0) return;

    event.preventDefault();

    dragState = {
      chip,
      index,
      pointerId: event.pointerId,
      startX: event.clientX,
      startY: event.clientY,
      ghost: null,
      moved: false,
      hoverSlot: null
    };

    document.addEventListener('pointermove', saatSeret, { passive: false });
    document.addEventListener('pointerup', akhiriSeret);
    document.addEventListener('pointercancel', akhiriSeret);
  }

  function saatSeret(event) {
    if (!dragState || event.pointerId !== dragState.pointerId) return;

    const jarak = Math.hypot(event.clientX - dragState.startX, event.clientY - dragState.startY);

    // Ghost baru dibuat setelah gerakan melewati ambang, supaya ketukan biasa tidak berkedip
    if (!dragState.moved && jarak > 6) {
      buatGhost(event.clientX, event.clientY);
      dragState.moved = true;
    }

    if (!dragState.moved) return;

    event.preventDefault();
    pindahkanGhost(event.clientX, event.clientY);
    tandaiSlotHover(event.clientX, event.clientY);
  }

  function buatGhost(x, y) {
    const kotak = dragState.chip.getBoundingClientRect();
    const ghost = document.createElement('div');
    ghost.className = 'drag-ghost';
    ghost.textContent = dragState.chip.textContent;
    ghost.style.width = `${kotak.width}px`;
    ghost.style.height = `${kotak.height}px`;
    ghost.style.left = `${x}px`;
    ghost.style.top = `${y}px`;
    document.body.appendChild(ghost);

    dragState.chip.classList.add('dragging');
    dragState.ghost = ghost;
  }

  function pindahkanGhost(x, y) {
    if (!dragState || !dragState.ghost) return;
    dragState.ghost.style.left = `${x}px`;
    dragState.ghost.style.top = `${y}px`;
  }

  function slotDiTitik(x, y) {
    const elemen = document.elementFromPoint(x, y);
    return elemen ? elemen.closest('.slot') : null;
  }

  function tandaiSlotHover(x, y) {
    const slot = slotDiTitik(x, y);

    if (dragState.hoverSlot && dragState.hoverSlot !== slot) {
      dragState.hoverSlot.classList.remove('drop-hover');
    }

    if (slot && !slot.classList.contains('filled')) {
      slot.classList.add('drop-hover');
      dragState.hoverSlot = slot;
    } else {
      dragState.hoverSlot = null;
    }
  }

  function akhiriSeret(event) {
    document.removeEventListener('pointermove', saatSeret);
    document.removeEventListener('pointerup', akhiriSeret);
    document.removeEventListener('pointercancel', akhiriSeret);

    const state = dragState;
    dragState = null;
    if (!state) return;

    state.chip.classList.remove('dragging');
    if (state.hoverSlot) state.hoverSlot.classList.remove('drop-hover');
    if (state.ghost) state.ghost.remove();

    if (state.moved) {
      // Cegah click "bayangan" dari slot yang baru saja menerima drop
      suppressSlotClickUntil = Date.now() + 350;

      if (event.type !== 'pointercancel') {
        const slot = slotDiTitik(event.clientX, event.clientY);
        if (slot && !stage2Locked) tempatkanChip(slot.dataset.slot, state.index);
      }
    } else {
      // Tidak diseret = dianggap ketukan untuk memilih kepingan
      pilihChip(state.index);
    }
  }

  // ------------------------------------------------------------------------
  // Pemeriksaan susunan slot
  // ------------------------------------------------------------------------
  function periksaSusunan() {
    if (stage2Locked) return;

    const slotKosong = slotEls.filter((slot) => slotValues[slot.dataset.slot] === null);
    if (slotKosong.length > 0) {
      tampilkanFeedback(slotFeedback, 'error', '⚠️ Masih ada slot yang kosong. Lengkapi ketiga slot dulu, ya.');
      return;
    }

    const slotSalah = slotEls.filter((slot) => slotValues[slot.dataset.slot] !== soalD[slot.dataset.slot]);

    if (slotSalah.length === 0) {
      stage2Locked = true;

      slotEls.forEach((slot) => {
        slot.classList.remove('wrong');
        slot.classList.add('ok', 'pulse-ok');
      });

      btnCekSlot.disabled = true;
      btnResetSlots.disabled = true;

      tampilkanFeedback(
        slotFeedback,
        'success',
        `🎯 <strong>Susunan tepat!</strong> Kepingan $a$, $b$, dan $c$ sudah duduk di posisi yang benar. Sekarang lihat bedah perhitungan di panel kanan.`
      );

      bukaBedahPerhitungan();
      return;
    }

    // Penanda slot keliru (hijau tetap, merah perlu diperbaiki)
    slotEls.forEach((slot) => {
      const kunci = slot.dataset.slot;
      slot.classList.toggle('wrong', slotValues[kunci] !== soalD[kunci]);
    });

    let petunjuk = '🔍 <strong>Belum pas, tapi kamu hampir!</strong> Periksa lagi peta rumusnya:<br>';

    if (slotValues.b !== soalD.b) {
      petunjuk += '&bull; Bagian yang <strong>dikuadratkan</strong> adalah koefisien $b$, yaitu angka di depan variabel $x$.<br>';
    }
    if (slotValues.a !== soalD.a) {
      petunjuk += '&bull; Angka pengali pertama setelah $4$ adalah koefisien $a$, yaitu angka di depan $x^2$.<br>';
    }
    if (slotValues.c !== soalD.c) {
      petunjuk += '&bull; Slot terakhir berisi konstanta $c$, yaitu angka yang berdiri sendiri tanpa $x$.<br>';
    }
    if ([soalD.a, soalD.b, soalD.c].some((nilai) => Math.abs(nilai) === 1)) {
      petunjuk += '&bull; Kalau di depan variabel tidak tertulis angka, ingat bahwa koefisiennya adalah $1$.<br>';
    }

    tampilkanFeedback(slotFeedback, 'error', petunjuk);
  }

  // ------------------------------------------------------------------------
  // Bedah perhitungan bertahap: b² → 4ac → D → √D → kesimpulan
  // Setiap kartu muncul satu per satu lewat tombol "Oke lanjut!"
  // ------------------------------------------------------------------------
  function bukaBedahPerhitungan() {
    stepsLocked.classList.add('hidden');
    stepsArea.classList.remove('hidden');
    renderLangkahPerhitungan();

    // Langkah 1 langsung terbuka; langkah 2-4 menunggu konfirmasi siswa
    tampilkanStep(0);

    if (window.innerWidth < 900) {
      setTimeout(() => {
        stepsArea.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 300);
    }
  }

  // Membungkus angka negatif dengan kurung agar LaTeX terbaca benar: (-4)
  function dalamKurung(nilai) {
    return nilai < 0 ? `(${nilai})` : `${nilai}`;
  }

  function renderLangkahPerhitungan() {
    const { a, b, c } = soalD;
    const b2 = b * b;
    const ac4 = 4 * a * c;

    // Tombol konfirmasi yang menempel di sisi kanan tiap kartu langkah
    const tombolLanjut = `
        <div class="step-ask">
          <span class="step-ask-label">Aman?</span>
          <button type="button" class="btn-step-next">Oke lanjut!</button>
        </div>`;

    stepList.innerHTML = `
      <li class="step-item hidden">
        <div class="step-card">
          <span class="step-num">1</span>
          <div class="step-body">
            <p class="step-title">Kuadratkan koefisien $b$</p>
            <p class="step-math">$$b^2 = ${dalamKurung(b)}^2 = ${b2}$$</p>
          </div>
        </div>
        ${tombolLanjut}
      </li>
      <li class="step-item hidden">
        <div class="step-card">
          <span class="step-num">2</span>
          <div class="step-body">
            <p class="step-title">Kalikan $4 \\cdot a \\cdot c$</p>
            <p class="step-math">$$4ac = 4 \\times ${dalamKurung(a)} \\times ${dalamKurung(c)} = ${ac4}$$</p>
          </div>
        </div>
        ${tombolLanjut}
      </li>
      <li class="step-item hidden">
        <div class="step-card">
          <span class="step-num">3</span>
          <div class="step-body">
            <p class="step-title">Kurangkan: $D = b^2 - 4ac$</p>
            <p class="step-math">$$D = ${b2} - ${dalamKurung(ac4)} = ${hasilD}$$</p>
          </div>
        </div>
        ${tombolLanjut}
      </li>
      <li class="step-item step-item-sqrt hidden">
        <div class="step-card step-card-sqrt">
          <span class="step-num step-num-amber">4</span>
          <div class="step-body">
            <p class="step-title step-title-amber">Masukkan nilai $D$ ke dalam akar rumus ABC</p>
            <div id="sqrt-formula" class="math-display"></div>
            <p id="sqrt-note" class="sqrt-note"></p>
          </div>
        </div>
        ${tombolLanjut}
      </li>
    `;

    stepEls = Array.from(stepList.querySelectorAll('.step-item'));

    renderRumusMatematika(stepList);
    renderSqrtVisual();
  }

  // Kartu langkah 4: nilai D dimasukkan kembali ke dalam akar rumus ABC
  function renderSqrtVisual() {
    const formula = document.getElementById('sqrt-formula');
    const catatan = document.getElementById('sqrt-note');
    if (!formula || !catatan) return;

    formula.innerHTML = `$$x = \\frac{-(${soalD.b}) \\pm \\sqrt{${hasilD}}}{2(${soalD.a})}$$`;
    renderRumusMatematika(formula);

    if (hasilD > 0) {
      catatan.innerHTML = `Nilai $D$ positif, sehingga $\\sqrt{D}$ adalah bilangan riil. Tanda $\\pm$ memberi <strong>dua</strong> jawaban berbeda.`;
    } else if (hasilD === 0) {
      catatan.innerHTML = `Nilai $D = 0$, sehingga $\\sqrt{0} = 0$. Bagian $\\pm$ hilang dan hanya tersisa <strong>satu</strong> akar (akar kembar).`;
    } else {
      catatan.innerHTML = `Nilai $D$ negatif. Bilangan riil tidak punya akar kuadrat dari bilangan negatif, jadi <strong>tidak ada akar riil</strong>.`;
    }
    renderRumusMatematika(catatan);
  }

  // Membuka satu kartu langkah (index 0-3)
  function tampilkanStep(index) {
    const langkah = stepEls[index];
    if (!langkah) return;

    langkah.classList.remove('hidden');
    langkah.classList.add('step-muncul');

    if (window.innerWidth < 900) {
      setTimeout(() => {
        langkah.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }, 200);
    }
  }

  // Siswa menekan "Oke lanjut!": tandai aman, lalu buka langkah berikutnya
  function selesaikanStep(langkah) {
    const tombol = langkah.querySelector('.btn-step-next');
    const ask = langkah.querySelector('.step-ask');
    if (!tombol || !ask) return;

    tombol.disabled = true;
    ask.innerHTML = '<span class="step-done" aria-label="Langkah sudah aman">✓</span>';

    const index = stepEls.indexOf(langkah);

    if (index < stepEls.length - 1) {
      tampilkanStep(index + 1);
    } else {
      tampilkanKesimpulan();
    }
  }

  // Setelah langkah 4 aman: munculkan pertanyaan sifat akar
  function tampilkanKesimpulan() {
    rootChecker.classList.remove('hidden');
    rootChecker.classList.add('muncul');

    if (window.innerWidth < 900) {
      setTimeout(() => {
        rootChecker.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }, 250);
    }
  }

  // ------------------------------------------------------------------------
  // Pemilihan sifat akar
  // ------------------------------------------------------------------------
  function jawabSifatAkar(jenis, tombol) {
    if (rootLocked) return;
    if (rootChecker.classList.contains('hidden')) return; // kesimpulan belum terbuka

    const jawabanBenar = hasilD > 0 ? 'dua' : (hasilD === 0 ? 'kembar' : 'tidak');

    if (jenis === jawabanBenar) {
      rootLocked = true;
      tombol.classList.add('correct');
      rootOptions.forEach((opsi) => { opsi.disabled = true; });

      let penjelasan = '';
      if (hasilD > 0) {
        penjelasan = `Karena $D = ${hasilD} > 0$, nilai $\\sqrt{D}$ nyata dan tanda $\\pm$ menghasilkan dua nilai $x$ yang berbeda.`;
      } else if (hasilD === 0) {
        penjelasan = `Karena $D = 0$, maka $\\sqrt{D} = 0$ sehingga kedua akar berimpit menjadi satu akar kembar.`;
      } else {
        penjelasan = `Karena $D = ${hasilD} < 0$, $\\sqrt{${hasilD}}$ bukan bilangan riil sehingga persamaan tidak punya akar riil.`;
      }

      tampilkanFeedback(
        rootFeedback,
        'success',
        `✅ <strong>Benar!</strong> ${penjelasan}<br><br>Klik <em>"Soal Baru"</em> untuk mencoba persamaan lain.`
      );
      return;
    }

    tombol.classList.add('wrong');
    tombol.addEventListener('animationend', () => tombol.classList.remove('wrong'), { once: true });

    let petunjuk = '';
    if (hasilD > 0) {
      petunjuk = 'Hmm, belum tepat. Perhatikan nilai $D$ yang positif. Apakah $\\sqrt{D}$ menghasilkan bilangan nyata? Lalu apa efek tanda $\\pm$ pada jawaban?';
    } else if (hasilD === 0) {
      petunjuk = 'Hmm, belum tepat. Di sini $D = 0$. Berapa nilai $\\sqrt{0}$? Kalau angka di bawah akar nol, apakah masih ada dua jawaban berbeda?';
    } else {
      petunjuk = 'Hmm, belum tepat. Di sini $D$ bernilai negatif. Bisakah bilangan riil memiliki akar kuadrat dari bilangan negatif?';
    }

    tampilkanFeedback(rootFeedback, 'error', `🔍 <strong>Ayo pikirkan sekali lagi.</strong><br>${petunjuk}`);
  }

  // ------------------------------------------------------------------------
  // Helper umpan balik
  // ------------------------------------------------------------------------
  function tampilkanFeedback(elemen, tipe, html) {
    elemen.className = `feedback-card ${tipe}`;
    elemen.innerHTML = html;
    renderRumusMatematika(elemen);
  }

  function sembunyikanFeedback(elemen) {
    elemen.className = 'feedback-card hidden';
    elemen.innerHTML = '';
  }

  // ------------------------------------------------------------------------
  // Event listener Stage 2
  // ------------------------------------------------------------------------
  btnKembaliFondasi.addEventListener('click', kembaliKeFondasi);
  btnCekSlot.addEventListener('click', periksaSusunan);
  btnSoalBaru.addEventListener('click', () => muatMisiDiskriminan());
  btnResetSlots.addEventListener('click', kosongkanSemuaSlot);

  slotEls.forEach((slot) => {
    slot.addEventListener('click', () => {
      if (Date.now() < suppressSlotClickUntil) return;
      if (stage2Locked) return;

      const kunci = slot.dataset.slot;

      if (selectedChipIndex !== null) {
        tempatkanChip(kunci, selectedChipIndex);
      } else {
        kosongkanSlot(kunci);
      }
    });
  });

  rootOptions.forEach((tombol) => {
    tombol.addEventListener('click', () => jawabSifatAkar(tombol.dataset.akar, tombol));
  });

  // Delegasi klik: tombol "Oke lanjut!" pada kartu langkah yang dibuat dinamis
  stepList.addEventListener('click', (event) => {
    const tombol = event.target.closest('.btn-step-next');
    if (!tombol) return;

    const langkah = tombol.closest('.step-item');
    if (langkah) selesaikanStep(langkah);
  });


  // ========================================================================
  // FUNGSI HELPER: KaTeX Auto-Render
  // ========================================================================
  function renderRumusMatematika(element = document.body) {
    if (window.renderMathInElement) {
      window.renderMathInElement(element, {
        delimiters: [
          { left: '$$', right: '$$', display: true },
          { left: '$', right: '$', display: false }
        ],
        throwOnError: false
      });
    }
  }

  // ========================================================================
  // LATAR BELAKANG INTERAKTIF: Math Vector Grid & Constellation Nodes (Axiom Engine)
  // Fitur: Medan Vektor Jarum (Needles), Konstelasi Node & Simbol Berpendar,
  //        Garis Penghubung Kursor Interaktif, Repel Fisika Simbol, Cincin Kursor,
  //        dan Gelombang Kejut Ripple saat Diklik.
  // ========================================================================
  function initMathBackground() {
    const canvas = document.getElementById('math-bg-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    const CFG = {
      mode: 'hybrid',
      gridStyle: 'needles',
      mouseMode: 'repel',
      showMathSymbols: true,
      gridSpacing: 44,
      nodeCount: 55,
      mouseRadius: 180,
      edgeDistance: 145,
      speed: 1,
      palette: {
        bgInner: '#0B1120',
        bgOuter: '#060911',
        gridBase: 'rgba(148, 163, 184, 0.15)',
        primaryRGB: '56, 189, 248',
        secondaryRGB: '129, 140, 248',
        accentHex: '#38BDF8'
      }
    };

    const SYMBOLS = ['π', '∑', '∫', '√', '∞', 'Δ', 'θ', 'λ', '∂', '∇'];
    let w = window.innerWidth, h = window.innerHeight;
    let dpr = Math.min(window.devicePixelRatio || 1, 2);
    let grid = [], nodes = [], ripples = [], time = 0;
    const mouse = { x: w / 2, y: h / 2, tx: w / 2, ty: h / 2, active: false };

    function resize() {
      w = window.innerWidth;
      h = window.innerHeight;
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      // Inisialisasi grid medan vektor jarum (needles)
      grid = [];
      const cols = Math.ceil(w / CFG.gridSpacing) + 1;
      const rows = Math.ceil(h / CFG.gridSpacing) + 1;
      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const ox = c * CFG.gridSpacing;
          const oy = r * CFG.gridSpacing;
          grid.push({ ox, oy, x: ox, y: oy, angle: 0, energy: 0 });
        }
      }
    }

    // Inisialisasi titik-titik simpul graf konstelasi & simbol matematika
    nodes = [];
    for (let i = 0; i < CFG.nodeCount; i++) {
      nodes.push({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.65,
        vy: (Math.random() - 0.5) * 0.65,
        r: 1.8 + Math.random() * 1.2,
        hasSym: Math.random() < 0.38,
        sym: SYMBOLS[i % SYMBOLS.length]
      });
    }

    // Pemicu gelombang kejut (shockwave ripple) saat user mengklik / mengetuk layar
    function pemicuGelombang(x, y) {
      ripples.push({
        x,
        y,
        radius: 6,
        maxRadius: Math.min(Math.max(w, h) * 0.45, 450),
        speed: 6.5,
        intensity: 1.0
      });
    }

    // Event listeners pointer & touch
    window.addEventListener('resize', resize);

    window.addEventListener('mousemove', e => {
      mouse.tx = e.clientX;
      mouse.ty = e.clientY;
      mouse.active = true;
    });

    window.addEventListener('mouseleave', () => {
      mouse.active = false;
    });

    // Klik memicu gelombang medan vektor di posisi kursor
    window.addEventListener('pointerdown', e => {
      if (e.button === 0) { // Klik kiri
        pemicuGelombang(e.clientX, e.clientY);
      }
    });

    // Dukungan gestur sentuh untuk smartphone / tablet
    window.addEventListener('touchstart', e => {
      if (e.touches && e.touches.length > 0) {
        mouse.tx = e.touches[0].clientX;
        mouse.ty = e.touches[0].clientY;
        mouse.active = true;
        pemicuGelombang(mouse.tx, mouse.ty);
      }
    }, { passive: true });

    window.addEventListener('touchmove', e => {
      if (e.touches && e.touches.length > 0) {
        mouse.tx = e.touches[0].clientX;
        mouse.ty = e.touches[0].clientY;
        mouse.active = true;
      }
    }, { passive: true });

    window.addEventListener('touchend', () => {
      mouse.active = false;
    }, { passive: true });

    resize();

    // Loop animasi 60 FPS
    function loop() {
      requestAnimationFrame(loop);
      time += 0.012 * CFG.speed;

      // Interpolasi pegas posisi kursor mouse agar gerakan lembut
      mouse.x += (mouse.tx - mouse.x) * 0.16;
      mouse.y += (mouse.ty - mouse.y) * 0.16;

      // 1. Gambar latar belakang gelap pekat
      ctx.fillStyle = CFG.palette.bgOuter;
      ctx.fillRect(0, 0, w, h);

      // 2. Senter cahaya radial dinamis di sekitar kursor mouse (Ambient Spotlight)
      if (mouse.active) {
        const spotlight = ctx.createRadialGradient(
          mouse.x, mouse.y, 0,
          mouse.x, mouse.y, CFG.mouseRadius * 1.5
        );
        spotlight.addColorStop(0, 'rgba(56, 189, 248, 0.09)');
        spotlight.addColorStop(0.45, 'rgba(99, 102, 241, 0.035)');
        spotlight.addColorStop(1, 'rgba(6, 9, 17, 0)');
        ctx.fillStyle = spotlight;
        ctx.fillRect(0, 0, w, h);
      }

      // 3. Update & render gelombang kejut (shockwave ripples)
      for (let rIdx = ripples.length - 1; rIdx >= 0; rIdx--) {
        const r = ripples[rIdx];
        r.radius += r.speed;
        r.intensity *= 0.965;

        if (r.intensity < 0.03 || r.radius > r.maxRadius) {
          ripples.splice(rIdx, 1);
          continue;
        }

        // Pengaruh gelombang terhadap jarum grid
        grid.forEach(pt => {
          const d = Math.hypot(pt.x - r.x, pt.y - r.y);
          const diff = Math.abs(d - r.radius);
          if (diff < 45) {
            const waveEnergy = (1 - diff / 45) * r.intensity;
            if (waveEnergy > pt.energy) {
              pt.energy = waveEnergy;
              pt.angle = Math.atan2(pt.y - r.y, pt.x - r.x);
            }
          }
        });

        // Pengaruh gelombang mendorong node graf
        nodes.forEach(n => {
          const dx = n.x - r.x;
          const dy = n.y - r.y;
          const d = Math.hypot(dx, dy) || 1;
          const diff = Math.abs(d - r.radius);
          if (diff < 45) {
            const waveForce = (1 - diff / 45) * r.intensity * 4.2;
            n.x += (dx / d) * waveForce;
            n.y += (dy / d) * waveForce;
          }
        });

        // Visual cincin gelombang
        ctx.save();
        ctx.beginPath();
        ctx.arc(r.x, r.y, r.radius, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(${CFG.palette.primaryRGB}, ${r.intensity * 0.28})`;
        ctx.lineWidth = 1.5;
        ctx.stroke();
        ctx.restore();
      }

      // 4. Render Grid Jarum Medan Vektor (Needles)
      if (CFG.mode !== 'nodes') {
        grid.forEach(pt => {
          const dx = pt.x - mouse.x;
          const dy = pt.y - mouse.y;
          const d = Math.hypot(dx, dy) || 1;
          const inf = (mouse.active && d < CFG.mouseRadius) ? Math.pow(1 - d / CFG.mouseRadius, 1.4) : 0;

          // Dalam mode repel, jarum menunjuk menjauh dari kursor
          const repelAngle = Math.atan2(dy, dx);
          const naturalAngle = Math.sin(pt.ox * 0.005 + time) * 0.8 + Math.cos(pt.oy * 0.005 + time) * 0.8;
          const targetAngle = inf > 0 ? repelAngle : naturalAngle;

          pt.angle += (targetAngle - pt.angle) * 0.2;
          pt.energy += (inf - pt.energy) * 0.18;

          const len = 5 + pt.energy * 8;
          ctx.beginPath();
          ctx.moveTo(pt.x - Math.cos(pt.angle) * len * 0.5, pt.y - Math.sin(pt.angle) * len * 0.5);
          ctx.lineTo(pt.x + Math.cos(pt.angle) * len * 0.5, pt.y + Math.sin(pt.angle) * len * 0.5);

          if (pt.energy > 0.03) {
            ctx.strokeStyle = `rgba(${CFG.palette.primaryRGB}, ${0.25 + pt.energy * 0.75})`;
            ctx.lineWidth = 1 + pt.energy * 1.3;
          } else {
            ctx.strokeStyle = CFG.palette.gridBase;
            ctx.lineWidth = 1;
          }
          ctx.stroke();
        });
      }

      // 5. Render Konstelasi Graf (Garis Antar-Node + Garis ke Kursor Mouse + Simbol)
      if (CFG.mode !== 'grid') {
        // A. Update posisi node & respons fisik terhadap kursor (Repel motion)
        nodes.forEach(n => {
          // Gerak melayang konstan
          n.x += n.vx * CFG.speed;
          n.y += n.vy * CFG.speed;

          // Tolakan dinamis saat kursor mendekati node/simbol
          if (mouse.active) {
            const dx = n.x - mouse.x;
            const dy = n.y - mouse.y;
            const dist = Math.hypot(dx, dy) || 1;
            if (dist < CFG.mouseRadius) {
              const repelForce = Math.pow(1 - dist / CFG.mouseRadius, 1.4) * 3.4;
              n.x += (dx / dist) * repelForce;
              n.y += (dy / dist) * repelForce;
            }
          }

          // Wrap-around halus di tepi layar
          if (n.x < -20) n.x = w + 20;
          if (n.x > w + 20) n.x = -20;
          if (n.y < -20) n.y = h + 20;
          if (n.y > h + 20) n.y = -20;
        });

        // B. Gambar garis penghubung antar-node
        for (let i = 0; i < nodes.length; i++) {
          const n1 = nodes[i];
          for (let j = i + 1; j < nodes.length; j++) {
            const n2 = nodes[j];
            const d = Math.hypot(n1.x - n2.x, n1.y - n2.y);
            if (d < CFG.edgeDistance) {
              const baseAlpha = 1 - d / CFG.edgeDistance;
              const nearMouse = mouse.active && (
                Math.hypot(n1.x - mouse.x, n1.y - mouse.y) < CFG.mouseRadius ||
                Math.hypot(n2.x - mouse.x, n2.y - mouse.y) < CFG.mouseRadius
              );

              ctx.beginPath();
              ctx.moveTo(n1.x, n1.y);
              ctx.lineTo(n2.x, n2.y);
              if (nearMouse) {
                // Garis berpendar cyan terang saat berada di dekat kursor
                ctx.strokeStyle = `rgba(${CFG.palette.primaryRGB}, ${baseAlpha * 0.55})`;
                ctx.lineWidth = 1.3;
              } else {
                ctx.strokeStyle = `rgba(${CFG.palette.secondaryRGB}, ${baseAlpha * 0.22})`;
                ctx.lineWidth = 0.9;
              }
              ctx.stroke();
            }
          }
        }

        // C. KUNCI RESPONSIF: Gambar garis penghubung dari KURSOR MOUSE ke node-node di dekatnya
        if (mouse.active) {
          nodes.forEach(n => {
            const dMouse = Math.hypot(n.x - mouse.x, n.y - mouse.y);
            if (dMouse < CFG.mouseRadius) {
              const mouseAlpha = (1 - dMouse / CFG.mouseRadius) * 0.52;
              ctx.beginPath();
              ctx.moveTo(mouse.x, mouse.y);
              ctx.lineTo(n.x, n.y);
              ctx.strokeStyle = `rgba(${CFG.palette.primaryRGB}, ${mouseAlpha})`;
              ctx.lineWidth = 1.2;
              ctx.stroke();
            }
          });
        }

        // D. Gambar simbol matematika & titik node
        nodes.forEach(n => {
          const distToMouse = mouse.active ? Math.hypot(n.x - mouse.x, n.y - mouse.y) : 9999;
          const isNear = distToMouse < CFG.mouseRadius;
          const proximity = isNear ? Math.pow(1 - distToMouse / CFG.mouseRadius, 1.2) : 0;

          if (CFG.showMathSymbols && n.hasSym) {
            ctx.save();
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            if (isNear) {
              const fSize = Math.round(13 + proximity * 5);
              ctx.font = `bold ${fSize}px system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, monospace`;
              ctx.fillStyle = `rgba(${CFG.palette.primaryRGB}, ${0.75 + proximity * 0.25})`;
              ctx.shadowColor = `rgba(${CFG.palette.primaryRGB}, 0.85)`;
              ctx.shadowBlur = 10 * proximity;
            } else {
              ctx.font = '12px system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, monospace';
              ctx.fillStyle = `rgba(${CFG.palette.primaryRGB}, 0.5)`;
              ctx.shadowBlur = 0;
            }
            ctx.fillText(n.sym, n.x, n.y);
            ctx.restore();
          } else {
            ctx.save();
            ctx.beginPath();
            const curR = n.r + proximity * 2;
            ctx.arc(n.x, n.y, curR, 0, Math.PI * 2);
            if (isNear) {
              ctx.fillStyle = `rgba(${CFG.palette.primaryRGB}, ${0.8 + proximity * 0.2})`;
              ctx.shadowColor = `rgba(${CFG.palette.primaryRGB}, 0.85)`;
              ctx.shadowBlur = 8 * proximity;
            } else {
              ctx.fillStyle = `rgba(${CFG.palette.primaryRGB}, 0.45)`;
              ctx.shadowBlur = 0;
            }
            ctx.fill();
            ctx.restore();
          }
        });

        // E. Render Simpul Kursor Aktif (Inti Cyan Terang + Cincin Pendar Halus)
        if (mouse.active) {
          ctx.save();
          // Cincin pendar animasi
          const ringR = 10 + Math.sin(time * 5) * 2;
          ctx.beginPath();
          ctx.arc(mouse.x, mouse.y, ringR, 0, Math.PI * 2);
          ctx.strokeStyle = `rgba(${CFG.palette.primaryRGB}, 0.55)`;
          ctx.lineWidth = 1.3;
          ctx.stroke();

          // Titik inti cyan
          ctx.beginPath();
          ctx.arc(mouse.x, mouse.y, 3.5, 0, Math.PI * 2);
          ctx.fillStyle = CFG.palette.accentHex;
          ctx.shadowColor = CFG.palette.accentHex;
          ctx.shadowBlur = 12;
          ctx.fill();
          ctx.restore();
        }
      }
    }

    loop();
  }
});
