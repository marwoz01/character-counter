const text = document.getElementById('textarea');
const totalCharsEl = document.getElementById('total-chars');
const excludeSpacesCb = document.getElementById('exclude-spaces');
const charLimitCheckbox = document.getElementById('set-limit');
const charLimitInput = document.getElementById('limit-number');
const limitMsg = document.getElementById('limit-message');
const limitText = document.getElementById('limit-text');
const totalSentencesEl = document.getElementById('sentence-count');
const totalWordsEl = document.getElementById('word-count')

text.addEventListener('input', charCounting);
text.addEventListener('input', sentenceCounting);
text.addEventListener('input', wordCounting)
excludeSpacesCb.addEventListener('change', charCounting);
charLimitCheckbox.addEventListener('change', toggleCharLimit);
charLimitInput.addEventListener('input', limitWarning);

function charCounting() {
  const raw = text.value;
  const cleaned = excludeSpacesCb.checked ? raw.replace(/\s/g, '') : raw;
  totalCharsEl.textContent = cleaned.length;
  limitWarning();
}

function wordCounting() {
  const raw = text.value
  const words = raw.trim().split(/\s+/);
  totalWordsEl.textContent = words.length;
}

function sentenceCounting() {
  const raw = text.value.trim();
  const sentences = raw.split(/[.!?]+/);
  const cleanSentences = sentences.filter(s => s.trim());
  totalSentencesEl.textContent = cleanSentences.length; 
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