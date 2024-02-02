// Tic Tac Toe
const winnerCombinations = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];
let gameOngoing = false;
var isXTurn = null;
const ticTacToeBox = document.querySelector(".ticTacToeBox");
var divBoxes = document.querySelectorAll(".box");
var isOponentComputer = true;

function selectedOponent() {
  var selectedValue = document.getElementById("oponent").value;
  selectedValue == "computer"
    ? (isOponentComputer = true)
    : (isOponentComputer = false);
  return isOponentComputer;
}

function resetGame() {
  divBoxes.forEach((box) => {
    box.classList.remove("x");
    box.classList.remove("o");
    box.classList.remove("green");
  });
}

function startGame() {
  resetGame();
  document.getElementById("initStart").style.display = "none";
  document.getElementById("winningMessage").style.display = "none";
  ticTacToeBox.classList.add("x");
  gameOngoing = true;
  isXTurn = true;
  return;
}

divBoxes.forEach((div) => {
  div.addEventListener("click", () => {
    var divId = div.id;
    if (isXTurn) {
      printPlayerX(divId);
    } else if (!isXTurn) {
      printPlayerO(divId);
    }
  });
});

function checkWinner() {
  for (const combination of winnerCombinations) {
    const [a, b, c] = combination;
    const divA = divBoxes[a];
    const divB = divBoxes[b];
    const divC = divBoxes[c];

    if (
      divA.classList.contains("x") &&
      divB.classList.contains("x") &&
      divC.classList.contains("x")
    ) {
      divA.classList.add("green");
      divB.classList.add("green");
      divC.classList.add("green");
      gameOngoing = false;
      document.getElementById("winningMessage").style.display = "flex";
      document.getElementById("startButton").innerHTML = "Restart!";
      document.getElementById("playerWon").innerHTML = "X Wins!";
      return;
    } else if (
      divA.classList.contains("o") &&
      divB.classList.contains("o") &&
      divC.classList.contains("o")
    ) {
      divA.classList.add("green");
      divB.classList.add("green");
      divC.classList.add("green");
      gameOngoing = false;
      document.getElementById("winningMessage").style.display = "flex";
      document.getElementById("startButton").innerHTML = "Restart!";
      document.getElementById("playerWon").innerHTML = "O Wins!";

      return;
    } else if (
      !divA.classList.contains("x") &&
      !divB.classList.contains("x") &&
      !divC.classList.contains("x") &&
      !divA.classList.contains("o") &&
      !divB.classList.contains("o") &&
      !divC.classList.contains("o") &&
      Array.from(divBoxes).every(
        (div) => div.classList.contains("o") || div.classList.contains("x")
      )
    ) {
      gameOngoing = false;
      document.getElementById("winningMessage").style.display = "flex";
      document.getElementById("startButton").innerHTML = "Restart!";
      document.getElementById("playerWon").innerHTML = "It's a Draw!";
      return;
    }
  }
}

function printPlayerX(selectedDiv) {
  if (
    document.getElementById(selectedDiv).classList.contains("o") ||
    document.getElementById(selectedDiv).classList.contains("x")
  ) {
    return;
  } else if (isXTurn && gameOngoing) {
    isXTurn = false;
    ticTacToeBox.classList.remove("x");
    document.getElementById(selectedDiv).classList.add("x");
    checkWinner();
    if (!gameOngoing) {
      return;
    }
    isOponentComputer ? printComputer() : ticTacToeBox.classList.add("o");
  }
}

function printPlayerO(selectedDiv) {
  if (
    document.getElementById(selectedDiv).classList.contains("o") ||
    document.getElementById(selectedDiv).classList.contains("x")
  ) {
    return;
  } else if (!isXTurn && gameOngoing && !isOponentComputer) {
    isXTurn = true;
    ticTacToeBox.classList.remove("o");
    ticTacToeBox.classList.add("x");
    document.getElementById(selectedDiv).classList.add("o");
    checkWinner();
    if (!gameOngoing) {
      return;
    }
  }
}

function printComputer() {
  var emptyDivs = Array.from(divBoxes).filter(
    (div) => !div.classList.contains("x") && !div.classList.contains("o")
  );
  if (emptyDivs.length > 0) {
    setTimeout(() => {
      var randomEmptyDiv =
        emptyDivs[Math.floor(Math.random() * emptyDivs.length)];
      randomEmptyDiv.classList.add("o");
      checkWinner();
      if (!gameOngoing) {
        return;
      } else {
        isXTurn = true;
        ticTacToeBox.classList.add("x");
      }
      return;
    }, 1000);
  }
}

// /Tic Tac Toe
