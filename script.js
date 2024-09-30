const quoteContainer = document.getElementById('quote');
const authorContainer = document.getElementById('author');
const changeQuoteButton = document.getElementById('change-quote');
const shareQuoteButton = document.getElementById('share-quote');
const spinner = document.getElementById('spinner');

// Function to fetch a new quote
async function fetchQuote() {
    try {
        const response = await fetch('quotes.json');
        if (!response.ok) {
            throw new Error('Network response was not ok: ' + response.statusText);
        }
        
        const quotes = await response.json(); // Make sure this line is inside the try block

        if (!Array.isArray(quotes) || quotes.length === 0) {
            throw new Error('Quotes data is not valid or empty');
        }

        const randomIndex = Math.floor(Math.random() * quotes.length);
        const randomQuote = quotes[randomIndex];
        
        document.getElementById('quote').textContent = `"${randomQuote.quote}"`;
        document.getElementById('author').textContent = `Author— ${randomQuote.author}`;
    } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
    }
}



// Function to share quote as an image
function shareQuote() {
    const exportQuote = document.getElementById('export-quote');
    const exportAuthor = document.getElementById('export-author');
    
    // Copy the current quote and author to the export container
    exportQuote.innerText = quoteContainer.innerText;
    exportAuthor.innerText = authorContainer.innerText;

    // Show the export container for html2canvas
    const exportContainer = document.getElementById('export-container');
    exportContainer.style.display = 'block';

    html2canvas(exportContainer).then(canvas => {
        const link = document.createElement('a');
        link.href = canvas.toDataURL('image/png');
        link.download = 'quote.png';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

        // Hide the export container again
        exportContainer.style.display = 'none';
    }).catch(err => {
        console.error('Could not capture quote:', err);
    });
}



// Event listeners
changeQuoteButton.addEventListener('click', fetchQuote);
shareQuoteButton.addEventListener('click', shareQuote);

// Fetch the initial quote
fetchQuote();
