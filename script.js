const btn = document.querySelector(".getQuote");
const insertInto = document.querySelector(".quotes");
const twitterBtn = document.getElementById("twitter-btn");

let res, result;

//getting a random quotes from the fetched quotes
const getQuote = () => {
  let quote = result[Math.floor(Math.random() * result.length)];
  while (quote.text.length > 50) {
    quote = result[Math.floor(Math.random() * result.length)];
  }

  let template = `
      <h3 class='quote-text'>${quote.text}</h3>
      <p class='author'>By ~ ${quote.author}</p>
     `;

  insertInto.innerHTML = template;
};

//getting quotes from the api
async function fetchQuotes() {
  const api = "https://type.fit/api/quotes";

  try {
    res = await fetch(api);
    result = await res.json();
    getQuote();
  } catch (err) {
    alert(err);
  }
}

//tweet button handling
const tweet = () => {
  const tweetBody = document.querySelector(".quote-text").innerText;

  //twitter web intent url 'https://twitter.com/intent/tweet'
  let api = "https://twitter.com/intent/tweet";
  window.open(
    api + `?text=${tweetBody}&hashtags=motivation,workHard`,
    "",
    "width=400,height=200,top=center,left=center"
  );
};

btn.addEventListener("click", getQuote);

twitterBtn.addEventListener("click", tweet);

window.addEventListener("load", () => {
  fetchQuotes();
});
