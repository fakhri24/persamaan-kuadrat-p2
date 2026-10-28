/**
 * Petualangan Diskriminan - Core Script
 * File ini menangani logika matematika dan interaktivitas website.
 */

// Menunggu hingga dokumen HTML selesai dimuat sepenuhnya oleh browser
document.addEventListener('DOMContentLoaded', () => {
  console.log('🚀 Aplikasi Petualangan Diskriminan siap dijalankan!');
  
  // State dasar game / latihan
  const gameState = {
    currentLevel: 1,
    score: 0,
    a: 1,
    b: 0,
    c: 0,
  };

  /**
   * Menghitung nilai Diskriminan: D = b^2 - 4ac
   * @param {number} a - Koefisien x^2
   * @param {number} b - Koefisien x
   * @param {number} c - Konstanta
   * @returns {number} Nilai diskriminan
   */
  function hitungDiskriminan(a, b, c) {
    return (b * b) - (4 * a * c);
  }

  /**
   * Menganalisis karakteristik jenis akar berdasarkan nilai D
   * @param {number} D - Nilai diskriminan
   * @returns {string} Sifat akar
   */
  function tentukanJenisAkar(D) {
    if (D > 0) {
      return 'D > 0: Memiliki 2 akar riil berlainan/berbeda';
    } else if (D === 0) {
      return 'D = 0: Memiliki 2 akar riil kembar (1 solusi)';
    } else {
      return 'D < 0: Tidak memiliki akar riil (imajiner)';
    }
  }

  // Siap untuk dihubungkan dengan elemen antarmuka (DOM) pada langkah berikutnya
});
