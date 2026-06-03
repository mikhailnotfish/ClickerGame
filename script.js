let count = 0;
let clickPower = 1;
let autoClickerActive = false;
let goldenActive = false;

const btn = document.getElementById('btn');
const countEl = document.getElementById('count');
const upgradeBtn = document.getElementById('upgrade-btn');
const autoBtn = document.getElementById('auto-btn');
const goldenBtn = document.getElementById('golden-btn');

btn.addEventListener('click', () => {
  count += goldenActive ? clickPower * 2 : clickPower;
  countEl.textContent = `Clicks: ${count}`;
});

upgradeBtn.addEventListener('click', () => {
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
  if (count >= 100 && !autoClickerActive) {
    count -= 100;
    autoClickerActive = true;
    countEl.textContent = `Clicks: ${count}`;
    autoBtn.textContent = `Autoclicker: ON ✓`;

    setInterval(() => {
      count += goldenActive ? clickPower * 2 : clickPower;
      countEl.textContent = `Clicks: ${count}`;
    }, 1000);
  }
});

goldenBtn.addEventListener('click', () => {
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