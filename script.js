const textArea = document.getElementById('textarea')
let totalCharactersPlaceholder = document.getElementById('total-chars')

textArea.addEventListener('input', function() {
    let totalCharacters = textArea.value.length
    totalCharactersPlaceholder.innerHTML = totalCharacters
})