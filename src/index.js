const pandaGif = document.querySelector('.panda-icon');
const title = document.querySelector('.title');
const circle = document.querySelector('#circle');
const showMePandasBtn = document.querySelector('button');
const small = document.querySelector('small');

const tenorAPIKey = process.env.TENOR_API_KEY;
const tenorEndpoint =
  'https://api.tenor.com/v1/search?' +
  'tag=panda&' +
  'key=&'+
  tenorAPIKey +
  '&limit=50&' +
  'media_filter=minimal';

let pandaGifs = [];
let isClicked = false;
let loading = false;

function fetchGifs() {
  showMePandasBtn.disabled = true;
  loading = true;
  fetch(tenorEndpoint)
    .then((resp) => resp.json())
    .then((data) => {
      showMePandasBtn.disabled = false;
      showMePandasBtn.innerText = 'Show Me Pandas! 🐼';
      loading = false;
      pandaGifs = data.results;
      // console.log(pandaGifs);
      arraySize = pandaGifs.length;
    })
    .catch((error) => {
      showMePandasBtn.disabled = true;
      showMePandasBtn.innerText = 'Uh-Oh! Pandas are being lazy';
      small.innerText = 'check console for a surprise or try reloading the page ;)'
      // console.error(error);
      console.warn(
        "So sorry! The API is being lazy like pandas but I'm here for the rescue.\nHere are some cute pandas stacked up for you. \nHave a good day! :-)"
      );
      let str = '';
      const n = 10;
      for (let i = 1; i <= n; i++) {
        for (let k = 1; k <= n - i; k++) {
          str += '\t';
        }
        for (let j = 1; j <= i; j++) {
          str += '🐼\t\t';
        }
        console.log(str);
        str = '';
      }
      console.log('\n\n\n')
      console.log('🌟🌟🌟');
      console.info(
        'If you liked it, consider giving a star to my repo here - https://github.com/gupta-ji6/panda'
      );
      console.log('🌟🌟🌟');
    });
}

function goHome() {
  document.body.setAttribute('data-theme', 'light');
  pandaGif.src = 'assets/panda-icon.webp';
  pandaGif.classList.remove('gif');
  circle.className = 'circle';
  isClicked = false;
}

title.addEventListener('click', goHome);

function showGifs() {
  if (!isClicked) {
    document.body.setAttribute('data-theme', 'dark');
    circle.classList.remove('circle');
    pandaGif.classList.add('gif');
    isClicked = true;
  }
  let randomNum = Math.floor(Math.random() * pandaGifs.length);
  if (!!pandaGifs.length) {
    let randomPandaGif = pandaGifs[randomNum].media[0].gif.url;
    pandaGif.src = randomPandaGif;
    pandaGifs.splice(randomNum, 1);
    if (pandaGifs.length <= 1) {
      fetchGifs();
    }
  } else {
    fetchGifs();
  }
}

// show GIF's on press of spacebar
document.body.onkeyup = function (e) {
  if (e.keyCode == 32) {
    loading ? null : showGifs();
  }
};
