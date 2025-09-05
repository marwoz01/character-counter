const text = document.getElementById('textarea');

const totalCharsEl = document.getElementById('char-count');
const totalSentencesEl = document.getElementById('sentence-count');
const totalWordsEl = document.getElementById('word-count');

const excludeSpacesCb = document.getElementById('exclude-spaces');
const charLimitCheckbox = document.getElementById('set-limit');
const charLimitInput = document.getElementById('limit-number');
const limitMsg = document.getElementById('limit-message');
const limitText = document.getElementById('limit-text');

text.addEventListener('input', updateAll);
excludeSpacesCb.addEventListener('change', updateAll);           
charLimitCheckbox.addEventListener('change', toggleCharLimit);
charLimitInput.addEventListener('input', updateAll);      

const letterStatsEl = document.getElementById('letter-stats')
const letterEmpty = document.getElementById('letter-empty')

function updateAll() {
  const raw = text.value;
  const trimmed = raw.trim();

  // znaki
  const chars = excludeSpacesCb.checked ? raw.replace(/\s/g, '') : raw; 
  totalCharsEl.textContent = chars.length;

  // słowa
  const wordsArr = trimmed ? trimmed.split(/\s+/) : [];
  const wordsCount = wordsArr.length;
  totalWordsEl.textContent = wordsCount;

  // zdania
  const sentencesArr = trimmed ? trimmed.split(/[.!?]+/).filter(s => s.trim()) : [];
  totalSentencesEl.textContent = sentencesArr.length;

  // limit słów
  limitWarning();

  const stats = letterStatsCounter();
  letterStatsRender(stats);
}

function toggleCharLimit() {
  charLimitInput.style.display =
    (charLimitInput.style.display === 'block')
      ? 'none'
      : 'block';
}

function limitWarning() {
  const limit = Number(charLimitInput.value);
  if (!charLimitCheckbox.checked || !limit) {
    text.classList.remove('warning');
    limitText.textContent = '';
    limitMsg.classList.add('hidden');
    return;
  }

  const trimmed = text.value.trim();
  const words = trimmed ? trimmed.split(/\s+/).length : 0;

  if (words > limit) {
    text.classList.add('warning');
    limitText.textContent = `Limit reached! Your text exceeds ${limit} words.`;
    limitMsg.classList.remove('hidden');
  } else {
    text.classList.remove('warning');
    limitText.textContent = '';
    limitMsg.classList.add('hidden');
  }
}

function letterStatsCounter() {
  const letters = text.value.toLocaleLowerCase('pl');
  const matches = letters.match(/\p{L}/gu) || [];

  const counts = {};
  for (const letter of matches) {
    if (counts[letter] === undefined) {
      counts[letter] = 1;
    } else {
      counts[letter] += 1;
    }
  }

  const entries = Object.entries(counts);            
  const total = entries.reduce((sum, [, c]) => sum + c, 0);

  const stats = entries.map(([letter, count]) => ({
    letter,
    count,
    pct: total ? (count / total) * 100 : 0
  }));

  stats.sort((a, b) => b.count - a.count)
  return stats
}

function letterStatsRender(stats) {
  if (stats.length === 0) {
    letterEmpty.classList.remove('hidden')
    letterStatsEl.classList.add('hidden')
    letterStatsEl.innerHTML = ""
    return 
  } else {
    letterEmpty.classList.add('hidden');
    letterStatsEl.classList.remove('hidden'); 
  }

  letterStatsEl.innerHTML = ""

  for (const stat of stats) {
    const li = document.createElement('li');
    li.textContent = `${stat.letter}: ${stat.count} (${stat.pct.toFixed(2)}%)`;
    letterStatsEl.appendChild(li);
  }
}