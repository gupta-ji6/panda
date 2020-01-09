const pandaGif = document.querySelector(".panda-icon");

const url =
  "https://api.tenor.com/v1/search?tag=" +
  "panda" +
  "&key=TJ5HQGN4OV4Z&limit=50";

var clicked = 0;

function generate() {
  fetch(url)
    .then(resp => resp.json()) // Transform the data into json
    .then(function(data) {
      randomNum = Math.floor(Math.random() * 50) + 1;
      pandaGifs = data.results[randomNum].media[0].tinygif.url;
      if (clicked == 0) {
        document.querySelector(".circle").classList.remove("circle");
      }
      pandaGif.classList.add("gif");
      pandaGif.src = pandaGifs;
      document.body.classList.add("body-dark");
      document.querySelector(".title").classList.add("title-dark");
      document.querySelector(".showBtn").classList.add("showBtn-dark");
      document.querySelector("footer").classList.add("footer-dark");
      document.querySelector("a").classList.add("link-dark");

      clicked = 1;
    });
}
