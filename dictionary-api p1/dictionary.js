const base_url = 'https://api.dictionaryapi.dev/api/v2/entries/en/';
const wordInput = document.getElementById('input-word');
const searchButton = document.getElementById('search-btn');
const resultDiv = document.getElementById('result');
searchButton.addEventListener('click', () => {
    let word = wordInput.value;
    if (word.length === 0) {
        resultDiv.innerHTML = `<h3 class="error">Please enter a word</h3>`;
        return;
    } else {
        fetch(`${base_url}${word}`)
            .then((response) => response.json())
            .then((data) => {
                if (data && data.length > 0) {
                    resultDiv.innerHTML = `<h3 class="word">${data[0].word}</h3>
                    <p class="phonetic">${data[0].phonetic}</p>
                    <div class="meanings">`;
                    data[0].meanings.forEach((meaning) => {
                        resultDiv.innerHTML += `<div class="meaning">
                            <h4>${meaning.partOfSpeech}</h4>
                            <ul>`;
                        meaning.definitions.forEach((def) => {
                            resultDiv.innerHTML += `<li>${def.definition}</li>`;
                        });
                        resultDiv.innerHTML += `</ul></div>`;
                    });
                    resultDiv.innerHTML += `</div>`;
                } else {
                    resultDiv.innerHTML = `<h3 class="error">No result found</h3>`;
                }
            })
            .catch(() => {
                resultDiv.innerHTML = `<h3 class="error">Error fetching data</h3>`;
            });
    }
});