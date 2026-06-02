let count = 0;
const btn = document.getElementById('btn');
const countEl = document.getElementById('count');

btn.addEventListener('click', () => {
  count++;
  countEl.textContent = `Clicks: ${count}`;
});