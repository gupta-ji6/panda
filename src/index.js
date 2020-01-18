const pandaGif = document.querySelector(".panda-icon");
const title = document.querySelector(".title");
const circle = document.querySelector("#circle");

const tenorEndpoint =
  "https://api.tenor.com/v1/search?" +
  "tag=panda&" +
  "key=TJ5HQGN4OV4Z&" +
  "limit=50&" +
  "media_filter=minimal";

let pandaGifs = [];
let isClicked = false;

function fetchGifs() {
  fetch(tenorEndpoint)
    .then(resp => resp.json())
    .then(data => {
      pandaGifs = data.results;
      arraySize = pandaGifs.length;
    });
}

function goHome() {
  document.body.setAttribute("data-theme", "light");
  pandaGif.src = "assets/panda-icon.webp";
  pandaGif.classList.remove("gif");
  circle.className = "circle";
  isClicked = false;
}

title.addEventListener("click", goHome);

function showGifs() {
  if (!isClicked) {
    document.body.setAttribute("data-theme", "dark");
    circle.classList.remove("circle");
    pandaGif.classList.add("gif");
    isClicked = true;
  }
  let randomNum = Math.floor(Math.random() * pandaGifs.length);
  let randomPandaGif = pandaGifs[randomNum].media[0].gif.url;
  pandaGif.src = randomPandaGif;
  pandaGifs.splice(randomNum, 1);
  if (pandaGifs.length <= 0) {
    fetchGifs();
  }
}
