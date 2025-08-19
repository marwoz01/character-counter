const text = document.getElementById('textarea')
let totalCharactersPlaceholder = document.getElementById('total-chars')
let excludeSpacesBtn = document.getElementById('exclude-spaces')
let setLimitBtn = document.getElementById('set-limit')
const limitNumberBox = document.getElementById('limit-number')

text.addEventListener('input', charCounting)

excludeSpacesBtn.addEventListener('change', charCounting)

function charCounting() {
  const cleanedText = excludeSpacesBtn.checked 
    ? text.value.replace(/\s/g, "") 
    : text.value;

  totalCharactersPlaceholder.textContent = cleanedText.length;
}

setLimitBtn.addEventListener('change', setLimit)

function setLimit() {
    limitNumberBox.style.display =
        (limitNumberBox.style.display === "block")
         ? "none"
         : "block";
}