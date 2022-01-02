'use strict';

const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new-quote');
const loader = document.getElementById('loader');

let apiQuotes = [];

// Show Loading Spinner
function showLoadingSpinner() {
  loader.hidden = false;
  quoteContainer.hidden = true;
}

// Hide Loading Spinner
function removeLoadingSpinner() {
  if (!loader.hidden) {
    quoteContainer.hidden = false;
    loader.hidden = true;
  }
}

// show new quote
function newQuote() {
  showLoadingSpinner();
  // pick a random quote from apiQuotes array
  const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];
  // Check if Author field is blank and replace it with 'unknown'
  if (!quote.author) {
    authorText.textContent = '- Unknown';
  } else {
    authorText.textContent = `- ${quote.author}`;
  }
  // Check quote length to determine styling
  if (quote.text.length > 120) {
    quoteText.classList.add('long-quote');
  } else {
    quoteText.classList.remove('long-quote');
  }
  // Set Quote, Hide Loader
  quoteText.textContent = quote.text;
  removeLoadingSpinner();
}

// Get Quotes From API
async function getQuotes() {
  showLoadingSpinner();
  const apiURL = 'https://type.fit/api/quotes';
  try {
    const response = await fetch(apiURL);
    // apiQuotes is a global variable
    apiQuotes = await response.json();
    newQuote();
  } catch (error) {
    console.log('Not able to fetch API');
    // Catch Error Here if can't fetch quote
  }
}

// Tweet Quote
function tweetQuote() {
  const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;
  window.open(twitterUrl, '_blank');
}

// Event Listeners
newQuoteBtn.addEventListener('click', newQuote);
twitterBtn.addEventListener('click', tweetQuote);

// On load
getQuotes();
