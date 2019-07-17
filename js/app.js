const qwerty = document.querySelector('#qwerty');
const phrase = document.querySelector('#phrase');
let missed = 0;
const phrases = ['Winter Is Coming', 'The North Remembers', 'All Men Must Die', 'Ours Is The Fury', 'Hear Me Roar'];
const scoreboard = document.querySelector('#scoreboard ol');
const overlayDiv = document.querySelector('#overlay');
const startButton = document.querySelector('.btn__reset');
const phraseUl = document.querySelector('#phrase ul');

startButton.addEventListener('click', (e) => {
  if(e.target.textContent == 'Start Game'){
  overlayDiv.style.display = 'none';
} else {
  restart();
  }
});

function getRandomPhraseAsArray(arr) {
    let randomNum =  Math.floor((Math.random() * arr.length));
    let randomPhrase = arr[randomNum].toLowerCase();
    randomPhrase.split('');
    return randomPhrase;
}

function addPhraseToDisplay(arr) {
    for(let i=0; i < arr.length; i++){
      let li = document.createElement('LI');
      li.textContent = arr[i];
      if(li.textContent != ' ') {
        li.className = 'letter';
      }
      phraseUl.appendChild(li);
    }
}

let phraseChars = getRandomPhraseAsArray(phrases);
addPhraseToDisplay(phraseChars);

function checkLetter(e) {
  let letterLi = document.querySelectorAll('.letter');
  let letter = '';
  for(let i=0; i<letterLi.length; i++) {
    if(letterLi[i].textContent == e.textContent) {
      letterLi[i].classList.add('show');
      letter = e.textContent;
    }
  }
  if(letter != '') {
    return letter;
  } else { return null; }
}

function checkWin() {
  let showLetter = document.querySelectorAll('.show');
  let letterLi = document.querySelectorAll('.letter');
  let overlayH2 = document.querySelector('#overlay h2');
  let overlayBtn = document.querySelector('#overlay a');
  if(showLetter.length == letterLi.length){
    overlayDiv.classList.remove('start');
    overlayDiv.classList.add('win');
    overlayH2.textContent = 'Congratulations! You won the game!'
    overlayBtn.textContent = 'Play Again'
    overlayDiv.style.display = '';
  } else if(missed >= 5){
    overlayDiv.classList.remove('start');
    overlayDiv.classList.add('lose');
    overlayH2.textContent = 'Oh no! You lost all your lives :('
    overlayBtn.textContent = 'Try Again'
    overlayDiv.style.display = '';
  }
}

function restart(){
  while(phraseUl.hasChildNodes()){
    phraseUl.removeChild(phraseUl.firstElementChild);
  }
  let qwertyBtns = document.querySelectorAll('#qwerty button');
  for(let i=0; i<qwertyBtns.length;i++){
    if(qwertyBtns[i].classList.contains('chosen')){
      qwertyBtns[i].classList.remove('chosen');
      qwertyBtns[i].setAttribute('enabled', '');
    }
  }
  phraseChars = getRandomPhraseAsArray(phrases);
  addPhraseToDisplay(phraseChars);
}

qwerty.addEventListener('click', function(e) {
  let buttonClicked = e.target;
  if(buttonClicked.tagName == 'BUTTON') {
    buttonClicked.classList.add('chosen');
    buttonClicked.setAttribute('disabled', '');
    let letterFound = checkLetter(buttonClicked);
    if(letterFound === null) {
      missed ++;
      scoreboard.removeChild(scoreboard.lastElementChild);
    }
    checkWin();
  }
});
