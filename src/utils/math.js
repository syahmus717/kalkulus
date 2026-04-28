// src/utils/math.js

/**
 * Menghitung total volume menggunakan Aturan Trapesium
 * @param {Array} data - [{ time: 0, flow: 50 }, { time: 10, flow: 45 }]
 * @returns {number} - Total volume dalam Liter
 */
export const calculateTotalVolume = (data) => {
  if (data.length < 2) return 0;
  
  let totalVolume = 0;
  
  for (let i = 0; i < data.length - 1; i++) {
    const deltaT = data[i+1].time - data[i].time; // h (selang waktu)
    const avgFlow = (data[i].flow + data[i+1].flow) / 2; // (f(a) + f(b)) / 2
    
    totalVolume += deltaT * avgFlow;
  }
  
  return totalVolume;
};