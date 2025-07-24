// ===== Global Variables =====
const longText = `haiii sayaangkkuuu cintakuuuu hilda kuuuuu... HAVEEE FUNNNN YAAAAAAAAAAAASHHHH!!!!!!
aku tauu banget kamu pasti lagi semangaaatt banget hari iniii... 
jangan lupaaa nikmatin harinyaa, main yang happy-happy yaaa 🥹💞 
tapiiiiii plis jangan lupa makaaaannn... jangan jajan sembarangan jugaaa 😫
aku pengen kamu sehat terusss, bahagia terusss, dan nggak pernah capeekkkk 🥰 
inget yaaa... akuuu disinii selalu mikirin kamuuuuuu terusss setiap waktuuu... 
love youuuuu sooooo muuuchhhhhh 😘❤️❤️❤️❤️❤️ 
jangan lupa sholat yaaa biar makin berkah harinya ✨`;

const loveMessages = [
  'I love you 💖',
  'Aku cinta kamu 🇮🇩',
  'Je t’aime 🇫🇷',
  'Ich liebe dich 🇩🇪',
  'Te quiero 🇪🇸',
  'Ti amo 🇮🇹',
  'Saranghae 🇰🇷',
  'Aishiteru 🇯🇵',
  'Ana behibek 🇸🇦',
  'Я тебя люблю 🇷🇺',
  'Eu te amo 🇧🇷',
  'Main tumse pyaar karta hoon 🇮🇳',
  'Ngo oi nei 🇭🇰',
  'Phom rak khun 🇹🇭',
  'Mahal kita 🇵🇭',
  'Ek is lief vir jou 🇿🇦',
  'Kocham cię 🇵🇱',
  'Jeg elsker dig 🇩🇰',
  'Te iubesc 🇷🇴',
  'Minä rakastan sinua 🇫🇮'
];

let slideIndex = 1;

// ===== Loading Slideshow =====
const slideshow = document.getElementById('slideshow');
setInterval(() => {
  slideIndex = (slideIndex % 15) + 1;
  slideshow.src = `assets/hilda (${slideIndex}).jpg`;
}, 1000);

// ===== Show Main After Loading =====
setTimeout(() => {
  document.getElementById('loading-screen').style.display = 'none';
  document.getElementById('main-content').classList.remove('hidden');

  // Static Love Message Loop
  let msgIndex = 0;
  const loveTitle = document.getElementById('typing-love');
  setInterval(() => {
    loveTitle.textContent = loveMessages[msgIndex];
    msgIndex = (msgIndex + 1) % loveMessages.length;
  }, 2000);

  // Long Text Typing
  const longtextEl = document.getElementById('longtext');
  let longTextIndex = 0;
  function typeLongText() {
    if (longTextIndex < longText.length) {
      longtextEl.textContent += longText[longTextIndex];
      longTextIndex++;
      setTimeout(typeLongText, 60);
    }
  }
  typeLongText();
}, 13000);

// ===== Sholat Schedule =====
const sholatData = {
  Subuh: '04:43',
  Terbit: '06:04',
  Zuhur: '11:58',
  Asar: '15:20',
  Magrib: '17:52',
  Isya: '19:05'
};

function renderSholat() {
  const now = new Date();
  const tbody = document.querySelector('#sholat-table tbody');
  tbody.innerHTML = '';

  Object.entries(sholatData).forEach(([name, time]) => {
    const sholatTime = new Date();
    const [h, m] = time.split(':').map(Number);
    sholatTime.setHours(h, m, 0);

    const diff = Math.floor((sholatTime - now) / 60000);
    let status;
    if (diff > 0) {
      status = `dalam ${Math.floor(diff / 60)} jam ${diff % 60} menit`;
    } else {
      const passed = Math.abs(diff);
      status = `${Math.floor(passed / 60)} jam ${passed % 60} menit lalu`;
    }

    const row = `<tr><td>${name}</td><td>${time}</td><td>${status}</td></tr>`;
    tbody.innerHTML += row;
  });

  document.querySelector('.sholat-section h2').textContent = 'Reminder Sholat Sayang ✨';
}
renderSholat();
setInterval(renderSholat, 60000);

// ===== Battery Status =====
navigator.getBattery().then(battery => {
  function updateBattery() {
    const level = Math.round(battery.level * 100);
    let emoji = '🔋';
    if (level >= 80) emoji = '🔋';
    else if (level >= 40) emoji = '🔌';
    else emoji = '🪫';

    document.getElementById('battery-status').textContent = `${emoji} ${level}% — jangan sampe abis batrenya yaa sayangg 😘`;
  }
  updateBattery();
  battery.addEventListener('levelchange', updateBattery);
});