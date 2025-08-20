const text = document.getElementById('textarea');
const totalCharsEl = document.getElementById('total-chars');
const excludeSpacesCb = document.getElementById('exclude-spaces');
const charLimitCheckbox = document.getElementById('set-limit')
const charLimitInput = document.getElementById('limit-number')
const limitMsg = document.getElementById('limit-message');
const limitText = document.getElementById('limit-text');

text.addEventListener('input', charCounting);
excludeSpacesCb.addEventListener('change', charCounting);
charLimitCheckbox.addEventListener('change', toggleCharLimit)
charLimitInput.addEventListener('input', limitWarning)

function charCounting() {
  const raw = text.value;
  const cleaned = excludeSpacesCb.checked ? raw.replace(/\s/g, '') : raw;
  totalCharsEl.textContent = cleaned.length;
  limitWarning()
}

function toggleCharLimit() {
    charLimitInput.style.display = 
    (charLimitInput.style.display === "block")
    ? "none"
    : "block";
}

function limitWarning() {
  const limit = Number(charLimitInput.value);
  if (!charLimitCheckbox.checked || !limit) {
    text.classList.remove('warning');
    return
  }

  let words = text.value.trim() === "" ? 0 : text.value.trim().split(/\s+/).length;

  const limitMsg = document.getElementById('limit-message');
  const limitText = document.getElementById('limit-text');

  if (words > limit) {
    text.classList.add('warning');
    limitText.textContent = `Limit reached! Your text exceeds ${limit} words.`;
    limitMsg.classList.remove('hidden');
  } else {
    text.classList.remove('warning');
    limitText.textContent = "";
    limitMsg.classList.add('hidden');
  }
}