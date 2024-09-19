const quoteContainer = document.getElementById('quote');
const authorContainer = document.getElementById('author');
const changeQuoteButton = document.getElementById('change-quote');
const shareQuoteButton = document.getElementById('share-quote');
const spinner = document.getElementById('spinner');

// Function to fetch a new quote
async function fetchQuote() {
    spinner.style.display = 'block'; // Show spinner
    const response = await fetch('https://raw.githubusercontent.com/mynameisajeet/dailyquotes/refs/heads/main/quotes.json');
    if (!response.ok) {
            throw new Error('Network response was not ok');
        }
    const data = await response.json();
    
    quoteContainer.innerText = `"${data.quote}"`;
    authorContainer.innerText = `— ${data.author}`;
    spinner.style.display = 'none'; // Hide spinner
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
