<!DOCTYPE html>
<html lang="id" class="scroll-smooth">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Smart Irrigation | Kalkulus Terapan</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
</head>
<body class="bg-slate-50 font-sans text-slate-800">

    <nav class="bg-blue-600 text-white sticky top-0 z-50 shadow-md">
        <div class="max-w-5xl mx-auto px-6 py-4 flex justify-between items-center">
            <div class="flex items-center gap-2 font-bold text-xl">
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"></path></svg>
                SmartIrrigation
            </div>
            <div class="hidden md:flex gap-6 font-medium text-sm">
                <a href="#dashboard" class="hover:text-blue-200 transition">Dashboard Simulasi</a>
                <a href="#teori" class="hover:text-blue-200 transition">Teori & Rumus</a>
                <a href="#about" class="hover:text-blue-200 transition">Tim Pengembang</a>
            </div>
        </div>
    </nav>

    <div class="max-w-5xl mx-auto space-y-12 p-6 mt-4">
        
        <section id="dashboard" class="scroll-mt-24">
            <div class="mb-6">
                <h2 class="text-3xl font-bold text-slate-800">Dashboard Simulasi Irigasi</h2>
                <p class="text-slate-500 mt-2">Masukkan data debit air untuk menghitung total volume secara real-time.</p>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div class="space-y-6">
                    <div class="bg-white p-5 rounded-xl shadow-sm border border-slate-100">
                        <h2 class="text-lg font-semibold mb-4">1. Parameter Lahan</h2>
                        <div class="space-y-4">
                            <div>
                                <label class="block text-sm text-slate-500 mb-1">Luas Lahan (m²)</label>
                                <input type="number" id="inputLuas" value="1000" class="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" />
                            </div>
                            <div>
                                <label class="block text-sm text-slate-500 mb-1">Kebutuhan Air (L/m²)</label>
                                <input type="number" id="inputKebutuhan" value="10" class="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" />
                            </div>
                            <div class="pt-2 border-t text-sm font-medium text-slate-700">
                                Target Volume: <span id="textTarget" class="text-blue-600 font-bold">10,000 Liter</span>
                            </div>
                        </div>
                    </div>

                    <form id="formDebit" class="bg-white p-5 rounded-xl shadow-sm border border-slate-100">
                        <h2 class="text-lg font-semibold mb-4">2. Input Debit Air</h2>
                        <div class="flex gap-3 mb-4">
                            <div class="flex-1">
                                <label class="block text-xs text-slate-500 mb-1">Menit ke-</label>
                                <input type="number" id="inputWaktu" class="w-full p-2 text-sm border rounded-lg outline-none bg-slate-100 text-slate-500 font-bold cursor-not-allowed" required readonly />
                            </div>
                            <div class="flex-1">
                                <label class="block text-xs text-slate-500 mb-1">Debit (L/m)</label>
                                <input type="number" id="inputDebit" class="w-full p-2 text-sm border rounded-lg outline-none focus:ring-2 focus:ring-blue-500" placeholder="f(t)" required />
                            </div>
                        </div>
                        <button type="submit" class="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium p-2 rounded-lg transition">
                            + Tambah Data Sensor
                        </button>
                    </form>
                </div>

                <div class="md:col-span-2 space-y-6">
                    <div class="bg-white p-5 rounded-xl shadow-sm border border-slate-100">
                        <h2 class="text-lg font-semibold mb-2">Status Pengisian Volume (Hasil Integral)</h2>
                        <div class="flex justify-between text-sm mb-2 text-slate-600">
                            <span id="textCurrent" class="font-bold text-blue-600">0 L Terisi</span>
                            <span id="textTargetProgress">10,000 L Target</span>
                        </div>
                        <div class="w-full bg-slate-100 rounded-full h-4 overflow-hidden">
                            <div id="progressBar" class="bg-blue-500 h-4 rounded-full transition-all duration-500" style="width: 0%"></div>
                        </div>
                        <p id="textPersentase" class="text-right text-xs text-slate-400 mt-1">0% Selesai</p>
                    </div>

                    <div class="bg-white p-5 rounded-xl shadow-sm border border-slate-100">
                        <h2 class="text-lg font-semibold mb-4">Visualisasi Grafik Luas Area</h2>
                        <canvas id="flowChart" height="120"></canvas>
                    </div>
                </div>
            </div>
        </section>

        <section id="teori" class="scroll-mt-24 bg-white p-8 rounded-xl shadow-sm border border-slate-100">
            <h2 class="text-2xl font-bold text-slate-800 mb-6 flex items-center gap-2">
                <span class="bg-blue-100 text-blue-600 p-2 rounded-lg">&#128218;</span> 
                Landasan Teori: Kalkulus Numerik
            </h2>
            
            <div class="grid md:grid-cols-2 gap-8 items-center">
                <div>
                    <p class="text-slate-600 mb-4 leading-relaxed">
                        Aplikasi ini menggunakan konsep <strong>Integral Tentu</strong> untuk menghitung total volume air. Dalam kasus nyata, debit air dari pompa tidak konstan melainkan membentuk kurva fluktuatif terhadap waktu. 
                    </p>
                    <p class="text-slate-600 mb-4 leading-relaxed">
                        Karena kita tidak memiliki persamaan matematis yang pasti untuk pompa tersebut, kita menggunakan metode <strong>Aturan Trapesium (Trapezoidal Rule)</strong>. Metode numerik ini bekerja dengan cara memotong area di bawah kurva menjadi bangun-bangun trapesium kecil, lalu menjumlahkan seluruh luasnya.
                    </p>
                    <div class="bg-slate-800 text-green-400 p-4 rounded-lg font-mono text-sm overflow-x-auto shadow-inner">
                        <p class="mb-2">// Rumus Dasar Trapesium (Luas = &frac12; &times; Jumlah Sisi Sejajar &times; Tinggi)</p>
                        <p class="font-bold text-lg text-white mb-2">&int; f(t) dt &approx; &sum; [ &frac12; &times; (f(t<sub>0</sub>) + f(t<sub>1</sub>)) &times; &Delta;t ]</p>
                        <p class="text-slate-400">Volume = Luas Daerah di Bawah Kurva Debit vs Waktu</p>
                    </div>
                </div>
                <div class="bg-blue-50 p-6 rounded-xl border border-blue-100">
                    <h4 class="font-bold text-slate-800 mb-3">Penerapan dalam Algoritma:</h4>
                    <ul class="space-y-3 text-sm text-slate-700 list-disc pl-5">
                        <li><strong>&Delta;t (Selisih Waktu):</strong> Bertindak sebagai "tinggi" dari trapesium. Dicari dengan mengurangkan waktu saat ini dengan waktu sebelumnya.</li>
                        <li><strong>f(t<sub>0</sub>) + f(t<sub>1</sub>):</strong> Merupakan penjumlahan dua debit air yang saling bersebelahan (sisi sejajar trapesium).</li>
                        <li><strong>Sigma (&sum;):</strong> Diwakili oleh proses <i>looping</i> (perulangan) dalam bahasa pemrograman JavaScript untuk mengakumulasikan total volume.</li>
                    </ul>
                </div>
            </div>
        </section>

        <section id="about" class="scroll-mt-24 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-xl shadow-lg p-8 text-white relative overflow-hidden">
            <div class="relative z-10">
                <div class="text-center mb-8">
                    <h2 class="text-3xl font-bold mb-2">Tim Pengembang</h2>
                    <p class="text-blue-100">Proyek Implementasi Kalkulus | Informatika - Universitas Siliwangi</p>
                </div>
                
                <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 text-center">
                    <div class="bg-white/10 backdrop-blur-sm border border-white/20 p-4 rounded-xl hover:bg-white/20 transition">
                        <div class="w-12 h-12 bg-white/20 rounded-full mx-auto mb-3 flex items-center justify-center font-bold text-xl">F</div>
                        <p class="font-medium">Faisal</p>
                    </div>
                    <div class="bg-white/10 backdrop-blur-sm border border-white/20 p-4 rounded-xl hover:bg-white/20 transition">
                        <div class="w-12 h-12 bg-white/20 rounded-full mx-auto mb-3 flex items-center justify-center font-bold text-xl">D</div>
                        <p class="font-medium">Daffa</p>
                    </div>
                    <div class="bg-white/10 backdrop-blur-sm border border-white/20 p-4 rounded-xl hover:bg-white/20 transition">
                        <div class="w-12 h-12 bg-white/20 rounded-full mx-auto mb-3 flex items-center justify-center font-bold text-xl">S</div>
                        <p class="font-medium">Syahril</p>
                    </div>
                    <div class="bg-white/10 backdrop-blur-sm border border-white/20 p-4 rounded-xl hover:bg-white/20 transition">
                        <div class="w-12 h-12 bg-white/20 rounded-full mx-auto mb-3 flex items-center justify-center font-bold text-xl">I</div>
                        <p class="font-medium">Indah</p>
                    </div>
                    <div class="bg-white/10 backdrop-blur-sm border border-white/20 p-4 rounded-xl hover:bg-white/20 transition">
                        <div class="w-12 h-12 bg-white/20 rounded-full mx-auto mb-3 flex items-center justify-center font-bold text-xl">S</div>
                        <p class="font-medium">Salsabila</p>
                    </div>
                    <div class="bg-white text-blue-700 border border-white p-4 rounded-xl shadow-lg transform hover:scale-105 transition">
                        <div class="w-12 h-12 bg-blue-100 rounded-full mx-auto mb-3 flex items-center justify-center font-bold text-xl">💻</div>
                        <p class="font-bold">Ketua / Kamu</p>
                    </div>
                </div>
            </div>
        </section>

        <footer class="text-center text-slate-500 text-sm pb-8">
            &copy; 2026 Math-Core Projects &middot; Dibangun untuk pemecahan masalah dunia nyata.
        </footer>

    </div>

    <script>
        // State Awal
        let luasLahan = 1000;
        let kebutuhanAir = 10;
        let targetVolume = 10000;
        let dataPoints = [
            { time: 0, flow: 50 },
            { time: 10, flow: 48 },
            { time: 20, flow: 52 }
        ];

        // DOM Elements
        const inputLuas = document.getElementById('inputLuas');
        const inputKebutuhan = document.getElementById('inputKebutuhan');
        const textTarget = document.getElementById('textTarget');
        const formDebit = document.getElementById('formDebit');
        const inputWaktu = document.getElementById('inputWaktu');
        const inputDebit = document.getElementById('inputDebit');
        const textCurrent = document.getElementById('textCurrent');
        const textTargetProgress = document.getElementById('textTargetProgress');
        const progressBar = document.getElementById('progressBar');
        const textPersentase = document.getElementById('textPersentase');

        // Setup Chart.js
        const ctx = document.getElementById('flowChart').getContext('2d');
        const flowChart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: dataPoints.map(d => `Mnt-${d.time}`),
                datasets: [{
                    label: 'Debit Air (L/m)',
                    data: dataPoints.map(d => d.flow),
                    borderColor: '#2563eb',
                    backgroundColor: 'rgba(59, 130, 246, 0.2)',
                    fill: true,
                    tension: 0.3
                }]
            },
            options: { scales: { y: { beginAtZero: true } } }
        });

        // Rumus Kalkulus: Integral Trapesium
        function calculateTotalVolume(data) {
            if (data.length < 2) return 0;
            let totalVolume = 0;
            for (let i = 0; i < data.length - 1; i++) {
                const deltaT = data[i+1].time - data[i].time;
                const avgFlow = (data[i].flow + data[i+1].flow) / 2;
                totalVolume += deltaT * avgFlow;
            }
            return totalVolume;
        }

        // Update Layar
        function updateUI() {
            targetVolume = luasLahan * kebutuhanAir;
            textTarget.textContent = `${targetVolume.toLocaleString()} Liter`;
            textTargetProgress.textContent = `${targetVolume.toLocaleString()} L Target`;

            const currentVolume = calculateTotalVolume(dataPoints);
            textCurrent.textContent = `${currentVolume.toLocaleString()} L Terisi`;

            let persentase = (currentVolume / targetVolume) * 100;
            if(persentase > 100) persentase = 100;
            progressBar.style.width = `${persentase.toFixed(1)}%`;
            textPersentase.textContent = `${persentase.toFixed(1)}% Selesai`;

            flowChart.data.labels = dataPoints.map(d => `Mnt-${d.time}`);
            flowChart.data.datasets[0].data = dataPoints.map(d => d.flow);
            flowChart.update();
        }

        // Listeners Input Lahan
        inputLuas.addEventListener('input', (e) => { luasLahan = Number(e.target.value); updateUI(); });
        inputKebutuhan.addEventListener('input', (e) => { kebutuhanAir = Number(e.target.value); updateUI(); });

        // Listener Tambah Data Sensor
        formDebit.addEventListener('submit', (e) => {
            e.preventDefault();
            const newTime = Number(inputWaktu.value);
            const newFlow = Number(inputDebit.value);

            // 1. Tambahkan data ke array & urutkan
            dataPoints.push({ time: newTime, flow: newFlow });
            dataPoints.sort((a, b) => a.time - b.time);

            // 2. Render ulang grafik
            updateUI();

            // 3. FITUR AUTO-NEXT: Ambil menit terakhir di array, tambahkan 10
            const lastTime = dataPoints[dataPoints.length - 1].time;
            inputWaktu.value = lastTime + 10;
            
            // 4. Kosongkan kolom debit dan fokuskan kursor ke sana
            inputDebit.value = '';
            inputDebit.focus();
        });

        // Eksekusi Pertama saat web dimuat
        updateUI();
        
        // Mengisi kolom menit pertama kali (Berdasarkan data awal terakhir + 10)
        inputWaktu.value = dataPoints[dataPoints.length - 1].time + 10;
    </script>
</body>
</html>