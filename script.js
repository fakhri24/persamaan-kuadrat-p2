/**
 * ==========================================================================
 * PETUALANGAN DISKRIMINAN - SCRIPT UTAMA
 * Tahap 1: KaTeX Auto-Render, Pembuka Materi, & Kuis Identifikasi Koefisien
 * ==========================================================================
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Inisialisasi KaTeX Auto-Render untuk memformat rumus $...$ dan $$...$$
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

    // Scroll halus ke panel kuis pada tampilan mobile
    panelKuis.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  });

  // ========================================================================
  // FUNGSI: Generator Persamaan Kuadrat Acak (Anti-Hafalan Urutan)
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

    // Format masing-masing suku secara aljabar LaTeX
    const sukuA = formatSukuA(a);
    const sukuB = formatSukuB(b);
    const sukuC = formatSukuC(c);

    // Kumpulan pola pengacakan urutan suku (Anti-Hafalan)
    const polaUrutan = [
      // Pola 1 (Standar): ax^2 + bx + c = 0
      gabungSuku([sukuA, sukuB, sukuC]),
      // Pola 2 (Konstanta di awal): c + bx + ax^2 = 0
      gabungSuku([sukuC, sukuB, sukuA]),
      // Pola 3 (Suku x di awal): bx + ax^2 + c = 0
      gabungSuku([sukuB, sukuA, sukuC]),
      // Pola 4 (Suku x di akhir): ax^2 + c + bx = 0
      gabungSuku([sukuA, sukuC, sukuB])
    ];

    // Pilih salah satu pola secara acak
    const formulaLatex = polaUrutan[Math.floor(Math.random() * polaUrutan.length)];

    // Tampilkan ke layar dan render KaTeX
    equationDisplay.innerHTML = `$$${formulaLatex} = 0$$`;
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
  btnLanjut.addEventListener('click', () => {
    alert('🎯 Hebat! Pondasi identifikasi nilai a, b, dan c sudah kamu kuasai. Kita siap melangkah ke Modul Inti Diskriminan D = b² - 4ac!');
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
});
