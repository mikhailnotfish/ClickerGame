let count = 0;
let clickPower = 1;
let autoClickerActive = false;
let goldenActive = false;
let frenzyActive = false;

const audioCtx = new (window.AudioContext || window.webkitAudioContext)();

function playClick() {
  const oscillator = audioCtx.createOscillator();
  const gainNode = audioCtx.createGain();

  oscillator.connect(gainNode);
  gainNode.connect(audioCtx.destination);

  oscillator.type = 'sine';
  oscillator.frequency.setValueAtTime(1200, audioCtx.currentTime);
  oscillator.frequency.exponentialRampToValueAtTime(400, audioCtx.currentTime + 0.05);

  gainNode.gain.setValueAtTime(1.5, audioCtx.currentTime);
  gainNode.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.05);

  oscillator.start(audioCtx.currentTime);
  oscillator.stop(audioCtx.currentTime + 0.05);
}

const bgMusic = document.getElementById('bg-music');
const btn = document.getElementById('btn');
const countEl = document.getElementById('count');
const upgradeBtn = document.getElementById('upgrade-btn');
const autoBtn = document.getElementById('auto-btn');
const goldenBtn = document.getElementById('golden-btn');
const frenzyBtn = document.getElementById('frenzy-btn');
const luckyBtn = document.getElementById('lucky-btn');

document.addEventListener('click', () => {
  if (bgMusic.paused) {
    bgMusic.volume = 0.4;
    bgMusic.play();
  }
}, { once: true });

btn.addEventListener('click', () => {
  playClick();
  let power = goldenActive ? clickPower * 2 : clickPower;
  power = frenzyActive ? power * 10 : power;
  count += power;
  countEl.textContent = `Clicks: ${count}`;
});

upgradeBtn.addEventListener('click', () => {
  playClick();
  if (clickPower < 4 && count >= 50) {
    count -= 50;
    clickPower += 1;
    countEl.textContent = `Clicks: ${count}`;
    upgradeBtn.textContent = `Upgrade click power (costs 50) | Power: ${clickPower}`;
  } else if (clickPower >= 4 && count >= 3000) {
    count -= 3000;
    clickPower += 3;
    countEl.textContent = `Clicks: ${count}`;
    upgradeBtn.textContent = `Upgrade click power (costs 3000) | Power: ${clickPower}`;
  } else if (clickPower >= 4 && count < 3000) {
    upgradeBtn.textContent = `Upgrade click power (costs 3000) | Power: ${clickPower} — need more clicks!`;
  }
});

autoBtn.addEventListener('click', () => {
  playClick();
  if (count >= 100 && !autoClickerActive) {
    count -= 100;
    autoClickerActive = true;
    countEl.textContent = `Clicks: ${count}`;
    autoBtn.textContent = `Autoclicker: ON ✓`;

    setInterval(() => {
      let power = goldenActive ? clickPower * 2 : clickPower;
      power = frenzyActive ? power * 10 : power;
      count += power;
      countEl.textContent = `Clicks: ${count}`;
    }, 1000);
  }
});

goldenBtn.addEventListener('click', () => {
  playClick();
  if (count >= 1000 && !goldenActive) {
    count -= 1000;
    goldenActive = true;
    countEl.textContent = `Clicks: ${count}`;

    btn.style.background = 'gold';
    btn.style.color = 'black';
    goldenBtn.textContent = `Golden mode: ON ✓ (15s left)`;

    let timeLeft = 15;
    const countdown = setInterval(() => {
      timeLeft--;
      goldenBtn.textContent = `Golden mode: ON ✓ (${timeLeft}s left)`;

      if (timeLeft <= 0) {
        clearInterval(countdown);
        goldenActive = false;
        btn.style.background = 'black';
        btn.style.color = 'white';
        goldenBtn.textContent = `Golden mode (costs 1000)`;
      }
    }, 1000);
  }
});

frenzyBtn.addEventListener('click', () => {
  playClick();
  if (count >= 500 && !frenzyActive) {
    count -= 500;
    frenzyActive = true;
    countEl.textContent = `Clicks: ${count}`;

    btn.style.outline = '3px solid red';
    frenzyBtn.textContent = `Click Frenzy: ON ✓ (10s left)`;

    let timeLeft = 10;
    const countdown = setInterval(() => {
      timeLeft--;
      frenzyBtn.textContent = `Click Frenzy: ON ✓ (${timeLeft}s left)`;

      if (timeLeft <= 0) {
        clearInterval(countdown);
        frenzyActive = false;
        btn.style.outline = 'none';
        frenzyBtn.textContent = `Click Frenzy (costs 500)`;
      }
    }, 1000);
  }
});

luckyBtn.addEventListener('click', () => {
  playClick();
  if (count >= 200) {
    count -= 200;
    const roll = Math.random() * 100;

    if (roll < 10) {
      count += 2000;
      luckyBtn.textContent = `⭐ JACKPOT! +2000 clicks!`;
    } else if (roll < 40) {
      count += 600;
      luckyBtn.textContent = `🟡 Nice! +600 clicks!`;
    } else if (roll < 80) {
      count += 300;
      luckyBtn.textContent = `🟢 +300 clicks!`;
    } else {
      count = Math.max(0, count - 100);
      luckyBtn.textContent = `🔴 Bad luck! -100 clicks!`;
    }

    countEl.textContent = `Clicks: ${count}`;

    setTimeout(() => {
      luckyBtn.textContent = `🎲 Lucky Click (costs 200)`;
    }, 2000);
  }
});