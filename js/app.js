const qwerty = document.querySelector('#qwerty');
const phrase = document.querySelector('#phrase');
let missed = 0;
const phrases = ['Winter Is Coming', 'The North Remembers', 'All Men Must Die', 'Ours Is The Fury', 'Hear Me Roar'];


//remove overlay screen when 'start' button is clicked
const startButton = document.querySelector('.btn__reset');
startButton.addEventListener('click', () => {
  const overlayDiv = document.querySelector('#overlay');
  overlayDiv.style.display = 'none';
});

function getRandomPhraseAsArray(arr) {
    let randomNum =  Math.floor((Math.random() * arr.length));
    let randomPhrase = arr[randomNum].toLowerCase();
    randomPhrase.split('');
    return randomPhrase;
}

function addPhraseToDisplay(arr) {
    // do stuff any arr that is passed in, and add to `#phrase ul`
    const phraseUl = document.querySelector('#phrase ul');
    for(let i=0; i < arr.length; i++){
      let li = document.createElement('LI');
      li.textContent = arr[i];
      if(li.textContent != ' ') {
        li.className = 'letter';
      }
      phraseUl.appendChild(li);
    }
}

const phraseChars =  getRandomPhraseAsArray(phrases);
addPhraseToDisplay(phraseChars);
