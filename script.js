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
