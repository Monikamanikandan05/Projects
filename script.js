const wordList = ['apple', 'banana', 'grapes', 'cherry', 'orange'];
let selectedWord = wordList[Math.floor(Math.random() * wordList.length)];
let correctLetters = [];
let wrongLetters = [];

const wordDisplay = document.getElementById('word');
const wrongDisplay = document.getElementById('wrong-letters');
const message = document.getElementById('message');
const restartBtn = document.getElementById('restart');
const canvas = document.getElementById('hangman');
const ctx = canvas.getContext('2d');

function displayWord() {
  wordDisplay.innerHTML = selectedWord
    .split('')
    .map(letter => (correctLetters.includes(letter) ? letter : '_'))
    .join(' ');
}

function updateWrongLetters() {
  wrongDisplay.innerText = wrongLetters.join(' ');
  drawHangman(wrongLetters.length);
}

function drawHangman(step) {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  // Base
  if (step > 0) ctx.fillRect(10, 180, 100, 10);
  // Pole
  if (step > 1) ctx.fillRect(30, 20, 10, 160);
  // Top bar
  if (step > 2) ctx.fillRect(30, 20, 80, 10);
  // Rope
  if (step > 3) ctx.fillRect(100, 20, 2, 20);
  // Head
  if (step > 4) ctx.beginPath(), ctx.arc(101, 55, 15, 0, Math.PI * 2), ctx.stroke();
  // Body
  if (step > 5) ctx.fillRect(100, 70, 2, 40);
  // Arms
  if (step > 6) ctx.fillRect(85, 80, 15, 2), ctx.fillRect(102, 80, 15, 2);
  // Legs
  if (step > 7) ctx.fillRect(90, 110, 2, 20), ctx.fillRect(110, 110, 2, 20);

  if (step > 7) {
    message.innerText = `Game Over! The word was "${selectedWord}"`;
    document.removeEventListener('keydown', handleKeydown);
  }
}

function checkWin() {
  const wordStatus = selectedWord.split('').every(letter => correctLetters.includes(letter));
  if (wordStatus) {
    message.innerText = 'You Win!';
    document.removeEventListener('keydown', handleKeydown);
  }
}

function handleKeydown(e) {
  const letter = e.key.toLowerCase();
  if (/[a-z]/.test(letter) && letter.length === 1) {
    if (selectedWord.includes(letter)) {
      if (!correctLetters.includes(letter)) {
        correctLetters.push(letter);
        displayWord();
        checkWin();
      }
    } else {
      if (!wrongLetters.includes(letter)) {
        wrongLetters.push(letter);
        updateWrongLetters();
      }
    }
  }
}

restartBtn.addEventListener('click', () => {
  selectedWord = wordList[Math.floor(Math.random() * wordList.length)];
  correctLetters = [];
  wrongLetters = [];
  message.innerText = '';
  displayWord();
  updateWrongLetters();
  document.addEventListener('keydown', handleKeydown);
});

displayWord();
document.addEventListener('keydown', handleKeydown);
