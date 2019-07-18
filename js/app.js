//---------------------------------------------
//VARIABLES
//---------------------------------------------

const qwerty = document.querySelector('#qwerty');
const qwertyBtns = document.querySelectorAll('#qwerty button');
const scoreboard = document.querySelector('#scoreboard ol');
const overlayDiv = document.querySelector('#overlay');
const startButton = document.querySelector('.btn__reset');
const phraseUl = document.querySelector('#phrase ul');
const overlayH2 = document.querySelector('#overlay h2');
const overlayBtn = document.querySelector('#overlay a');
const phrases = ['Winter is coming', 'The north remembers', 'All men must die', 'Ours is the fury', 'Hear me roar'];
let missed = 0;

//---------------------------------------------
//FUNCTIONS
//---------------------------------------------

const getRandomPhraseAsArray = arr => {
    let randomNum =  Math.floor((Math.random() * arr.length));
    let randomPhrase = arr[randomNum];
    randomPhrase.split('');
    return randomPhrase;
}

const addPhraseToDisplay = arr => {
    for(let i=0; i < arr.length; i++){
      let li = document.createElement('LI');
      li.textContent = arr[i];
      if(li.textContent != ' ') {
        li.className = 'letter';
      } else { li.className = 'space'; }
      phraseUl.appendChild(li);
    }
}

const checkLetter = e => {
  let letterLi = document.querySelectorAll('.letter');
  let letter = '';
  for(let i=0; i<letterLi.length; i++) {
    if(letterLi[i].textContent.toLowerCase() == e.textContent) {
      letterLi[i].classList.add('show');
      letter = e.textContent;
    }
  }
  if(letter != '') {
    return letter;
  } else { return null; }
}

const endScreen = (status, message) => {
  overlayDiv.classList.remove('start');
  overlayDiv.classList.add(status);
  overlayH2.textContent = message;
  overlayBtn.textContent = 'Play Again'
  overlayDiv.style.display = '';
}

const checkWin = () => {
  let showLetter = document.querySelectorAll('.show');
  let letterLi = document.querySelectorAll('.letter');
  if(showLetter.length == letterLi.length){
    endScreen('win', 'Congratulations! You won the game!');
  } else if(missed >= 5){
    endScreen('lose', 'Oh no! You lost all your lives :(');
  }
}

const newGame = () => {
  //removes all 'li' elements from 'phrase' ul
  while(phraseUl.hasChildNodes()){
    phraseUl.removeChild(phraseUl.firstElementChild);
  }
  //resets qwerty keyboard
  for(let i=0; i<qwertyBtns.length; i++){
    if(qwertyBtns[i].classList.contains('chosen')){
      qwertyBtns[i].classList.remove('chosen');
      qwertyBtns[i].removeAttribute('disabled');
    }
  }
  //resets hearts
  for(let i=0; i<scoreboard.children.length; i++){
    scoreboard.children[i].style.display = '';
  }
  //resets overlay screen
  if(overlayDiv.classList.contains('win')){
    overlayDiv.classList.remove('win');
  } else if (overlayDiv.classList.contains('lose')){
    overlayDiv.classList.remove('lose');
  }
  //generates new phrase to guess
  let phraseChars = getRandomPhraseAsArray(phrases);
  addPhraseToDisplay(phraseChars);
  //resets score
  missed = 0;
  //hides overlay screen
  overlayDiv.style.display = 'none';
}

//---------------------------------------------
//EVENT LISTENERS
//---------------------------------------------

startButton.addEventListener('click', e => {
  newGame();
});

qwerty.addEventListener('click', e => {
  let buttonClicked = e.target;
  if(buttonClicked.tagName == 'BUTTON') {
    buttonClicked.classList.add('chosen');
    buttonClicked.setAttribute('disabled', '');
    let letterFound = checkLetter(buttonClicked);
    if(letterFound === null) {
      scoreboard.children[missed].style.display = 'none';
      missed ++;
    }
    checkWin();
  }
});
