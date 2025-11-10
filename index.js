async function fetchData(term) {
    const url = 'https://dictionary-by-api-ninjas.p.rapidapi.com/v1/dictionary?word=' + term;
    const options = {
        method: 'GET',
        headers: {
            'x-rapidapi-key': secretKey,
            'x-rapidapi-host': 'dictionary-by-api-ninjas.p.rapidapi.com'
        }
    };

    try {
        if (term === '') throw new Error('Please enter a word.');

        const response = await fetch(url, options);
        const result = await response.json();
        console.log(result);

        let definition = result.definition;
        const words = definition.trim().split(/\s+/);
        const word_count = words.length;
        const max_words = 75;
        console.log(word_count);

        if (definition === '') definition = 'No definition found.';

        if (word_count > max_words) definition = words.slice(0, max_words).join(' ') + '...';

        document.getElementById('word_name').innerHTML = term;
        document.getElementById('word_definition').innerHTML = definition;
    } catch (error) {
        console.error(error);
        document.getElementById('word_name').innerHTML = "error";
        document.getElementById('word_definition').innerHTML = error;
    }
}

document.getElementById('search').addEventListener('keydown', function (event) {
    if (event.key === 'Enter') {
        event.preventDefault();
        fetchData(document.getElementById('search').value);   
    }
});

document.getElementById('submit').addEventListener('click', function (event) {
    event.preventDefault();
    fetchData(document.getElementById('search').value);   
})