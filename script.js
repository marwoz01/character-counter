const text = document.getElementById('textarea')
let totalCharactersPlaceholder = document.getElementById('total-chars')
let excludeSpacesBtn = document.getElementById('exclude-spaces')

text.addEventListener('input', charCounting)

excludeSpacesBtn.addEventListener('change', charCounting)

function charCounting() {
  const cleanedText = excludeSpacesBtn.checked 
    ? text.value.replace(/\s/g, "") 
    : text.value;

  totalCharactersPlaceholder.textContent = cleanedText.length;
}
