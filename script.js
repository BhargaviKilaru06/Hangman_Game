const wordList = [
    "apple", "beautiful", "gorgeous", "wonderful", "talent", "orange", "banana", "grapefruit", "pineapple", "watermelon",
    "elephant", "kangaroo", "giraffe", "tiger", "lion", "cheetah", "panda", "monkey", "koala", "zebra",
    "rainbow", "sunshine", "cloud", "thunder", "lightning", "weather", "season", "autumn", "winter", "spring",
    "summer", "mountain", "river", "valley", "forest", "desert", "jungle", "ocean", "island", "beach",
    "castle", "kingdom", "palace", "dragon", "wizard", "witch", "magic", "spells", "potion", "sword",
    "friendship", "happiness", "kindness", "bravery", "courage", "freedom", "justice", "truth", "wisdom", "honesty"
  ];
  
  let chosenWord = "";
  let displayWord = [];
  let lives = 6;
  
  const wordDisplay = document.getElementById("word-display");
  const message = document.getElementById("message");
  const livesDisplay = document.getElementById("lives");
  const keyboard = document.getElementById("keyboard");
  const restartBtn = document.getElementById("restart");
  
  function startGame() {
    chosenWord = wordList[Math.floor(Math.random() * wordList.length)].toLowerCase();
    displayWord = Array(chosenWord.length).fill("_");
    lives = 6;
    updateDisplay();
    updateHangman();
    message.textContent = "";
    generateKeyboard();
    restartBtn.style.display = "none";
  }
  
  function updateDisplay() {
    wordDisplay.textContent = displayWord.join(" ");
    livesDisplay.textContent = `Lives: ${lives}`;
  }
  
  function generateKeyboard() {
    keyboard.innerHTML = "";
    const alphabet = "abcdefghijklmnopqrstuvwxyz";
    for (let letter of alphabet) {
      const btn = document.createElement("button");
      btn.textContent = letter;
      btn.onclick = () => handleGuess(letter, btn);
      keyboard.appendChild(btn);
    }
  }
  
  function handleGuess(letter, button) {
    button.disabled = true;
    if (chosenWord.includes(letter)) {
      for (let i = 0; i < chosenWord.length; i++) {
        if (chosenWord[i] === letter) {
          displayWord[i] = letter;
        }
      }
      updateDisplay();
      if (!displayWord.includes("_")) {
        message.textContent = "🎉 You won!";
        endGame();
      }
    } else {
      lives--;
      updateDisplay();
      updateHangman();
      if (lives === 0) {
        message.textContent = `💀 You lost! The word was "${chosenWord}".`;
        endGame();
      }
    }
  }
  
  function updateHangman() {
    const parts = ["head", "body", "left-arm", "right-arm", "left-leg", "right-leg"];
    const wrongGuesses = 6 - lives;
  
    for (let i = 0; i < parts.length; i++) {
      const part = document.getElementById(parts[i]);
      if (i < wrongGuesses) {
        part.style.display = "inline";
        part.style.animation = "fadeIn 0.6s ease forwards";
      } else {
        part.style.display = "none";
        part.style.animation = "none";
      }
    }
  }
  
  function endGame() {
    const buttons = document.querySelectorAll("#keyboard button");
    buttons.forEach(btn => btn.disabled = true);
    restartBtn.style.display = "inline-block";
  }
  
  restartBtn.addEventListener("click", startGame);
  
  // Start the game initially
  startGame();
  