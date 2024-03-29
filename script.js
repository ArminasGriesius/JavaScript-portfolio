function showSelection(section) {
  document.querySelectorAll("main > section").forEach((div) => {
    div.style.display = "none";
  });

  if (section === "quiz") {
    document.getElementById(section).style.display = "block";

    if (quizStarted) {
      harryPotterTheme.play();
    }
  } else {
    harryPotterTheme.pause();
    harryPotterTheme.currentTime = 0;
  }
  if (section != "ticTacToe") {
    resetGame();
    document.getElementById("winningMessage").style.display = "flex";
  }
  if (section === "mario") {
    marioTheme.play();
  } else marioTheme.pause();
  marioTheme.currentTime = 0;
  document.getElementById(section).style.display = "block";
}

let quizStarted = false;

// Quiz
var questions = [
  {
    question:
      "When Ron’s wand backfired, what did he unfortunately and hilariously vomit?",
    options: ["Woodlice", "Ants", "Snails", "Slugs"],
    answer: "Slugs",
  },
  {
    question:
      "In Philosopher’s Stone, when Dumbledore visited Harry in the hospital wing, what flavour Bertie Bott’s Every-Flavour Bean did he have the misfortune of eating? ",
    options: ["Mud", "Broccoli", "Earwax", "Bogey"],
    answer: "Earwax",
  },
  {
    question:
      "As punishment, Mad-Eye Moody turned Malfoy into what creature and took him for a bounce along the corridors of Hogwarts?",
    options: ["A ferret", "A rat", "A shrew", "A hamster"],
    answer: "A ferret",
  },
  {
    question:
      "What magical creatures were let loose in Lockhart’s first lesson and hoisted Neville up into the air by his ears?",
    options: ["Augureys", "Billywigs", "Fairies", "Cornish pixies"],
    answer: "Cornish pixies",
  },
  {
    question: "What was the nickname that Snape gave himself at school?",
    options: [
      "Potion Pioneer",
      "Half-Blood Prince",
      "Prince of Endless Darkness",
      "Pure-Blood King",
    ],
    answer: "Half-Blood Prince",
  },
  {
    question: "Where is the Slytherin common room located?",
    options: [
      "Next to the kitchen",
      "In the West Tower",
      "The Dungeons",
      "Below the Great Hall",
    ],
    answer: "The Dungeons",
  },
  {
    question: "How many staircases does Hogwarts have?",
    options: ["142", "143", "163", "152"],
    answer: "142",
  },
  {
    question:
      "What is the name of the book Hermione supposes Voldemort used to learn about Horcruxes?",
    options: [
      "Magik Moste Evil",
      "Secret of the Darkest Art",
      "A Guide to Medieval Sorcery",
      "Most Potente Potions",
    ],
    answer: "Secret of the Darkest Art",
  },
  {
    question:
      "Which Hogwarts professor was rumoured to be a duelling champion in their youth?",
    options: [
      "Minerva McGonagall",
      "Severus Snape",
      "Filius Flitwick",
      "Horace Slughorn",
    ],
    answer: "Filius Flitwick",
  },
  {
    question:
      "Which creatures pull the carriages that take students from the Hogwarts Express to the Castle?",
    options: ["Hippogriffs", "Thestrals", "Gentaurs", "Manticores"],
    answer: "Thestrals",
  },
];

var results = [
  {
    result: "You should at least watch the movies",
  },
  {
    result: "This was not Lord of the Rings quiz, sorry",
  },
  {
    result: "Not quite this time",
  },
  {
    result: "Not great, not terrible",
  },
  {
    result: "Not bad!!",
  },
  {
    result: "Congradulations! You are a TRUE Harry Potter fan!!",
  },
];

var currentQuestionId = "quizQuestion";

let harryPotterTheme = new Audio("/files/HPTheme.mp3");
let correct = new Audio("/files/Correct.mp3");
correct.volume = 0.3;
let wrong = new Audio("/files/Wrong.mp3");
wrong.volume = 0.3;
let goodScore = new Audio("/files/GoodScore.mp3");
goodScore.volume = 0.3;
let badScore = new Audio("/files/BadScore.mp3");
badScore.volume = 0.5;
let middleScore = new Audio("/files/MiddleScore.mp3");
middleScore.volume = 0.5;

document.getElementById("tryAgain").style.display = "none";

function startQuizDisplay() {
  document.querySelector(".initQuiz").style.display = "none";
  document.getElementById("startBtn").style.display = "none";
  document.getElementById("tryAgain").style.display = "none";
  document.getElementById("quizSection").style.display = "block";
  document.getElementById("quizHeadlineText").style.display = "block";
  harryPotterTheme.play();
  quizStarted = true;
}

function playQuizEnd() {
  switch (true) {
    case score <= 4:
      badScore.play();
      break;
    case score > 4 && score < 7:
      middleScore.play();
      break;
    default:
      goodScore.play();
      break;
  }
}

function showQuizResult() {
  playQuizEnd();
  document.querySelector(".initQuiz").style.display = "flex";
  document.getElementById("initQuizBottomText").innerText =
    results[Math.round(showText)].result;
  document.getElementById(
    "initQuizTopText"
  ).innerText = `Your score is: ${score}/10`;
  document.getElementById("quizSection").style.display = "none";
  document.getElementById("quizHeadlineText").style.display = "none";
  document.getElementById("tryAgain").style.display = "inline-block";
  harryPotterTheme.pause();
  harryPotterTheme.currentTime = 0;
  quizStarted = false;
}

function resetQuizScore() {
  score = 0;
  showText = 0;
  currentQuestion = 0;
}

function showQuestionsAndAnswers() {
  document.getElementById("questionNumber").innerText = `Question ${
    currentQuestion + 1
  }/10`;
  document.getElementById(currentQuestionId).innerText =
    questions[currentQuestion].question;
  document.getElementById("option1").innerText =
    questions[currentQuestion].options[0];
  document.getElementById("option2").innerText =
    questions[currentQuestion].options[1];
  document.getElementById("option3").innerText =
    questions[currentQuestion].options[2];
  document.getElementById("option4").innerText =
    questions[currentQuestion].options[3];
}

function nextQuestion() {
  startQuizDisplay();

  if (currentQuestion < questions.length) {
    showQuestionsAndAnswers();
  } else if (currentQuestion == questions.length) {
    showQuizResult();
    resetQuizScore();
  }
}

var score = 0;
var showText = 0;
var currentQuestion = 0;

function checkAnswer(userAnswer) {
  var selectedButtons = document.querySelectorAll(".answerOption");
  var correctAnswer = questions[currentQuestion].answer;

  selectedButtons.forEach(function (button) {
    if (button.innerText === userAnswer) {
      if (userAnswer === correctAnswer) {
        button.style.backgroundColor = "green";
        button.style.color = "white";
        correct.play();
        score++;
        showText += 0.5;
      } else {
        button.style.backgroundColor = "red";
        button.style.color = "antiquewhite";
        wrong.play();
      }
    }
  });

  currentQuestion++;
  setTimeout(() => {
    nextQuestion(questions[currentQuestion]);
    document.getElementById("option1").style.backgroundColor = "antiquewhite";
    document.getElementById("option2").style.backgroundColor = "antiquewhite";
    document.getElementById("option3").style.backgroundColor = "antiquewhite";
    document.getElementById("option4").style.backgroundColor = "antiquewhite";
    document.getElementById("option1").style.color = "black";
    document.getElementById("option2").style.color = "black";
    document.getElementById("option3").style.color = "black";
    document.getElementById("option4").style.color = "black";
  }, 1500);

  return showText;
}
// /Quiz

// Tic Tac Toe

let move = new Audio("/files/tictactoeMove.mp3");
let startTictactoeSound = new Audio("/files/StartTictactoe.mp3");
let tictactoeWin = new Audio("/files/tictactoeWin.mp3");

let tictactoeDraw = new Audio("/files/tictactoeDraw.mp3");

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
  startTictactoeSound.play();
  resetGame();
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
      tictactoeWin.play();
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
      tictactoeWin.play();
      divA.classList.add("green");
      divB.classList.add("green");
      divC.classList.add("green");
      gameOngoing = false;
      document.getElementById("winningMessage").style.display = "flex";
      document.getElementById("startButton").innerHTML = "Restart!";
      document.getElementById("playerWon").innerHTML = "O Wins!";

      return;
    } else if (
      Array.from(divBoxes).every(
        (div) => div.classList.contains("x") || div.classList.contains("o")
      ) &&
      !winnerCombinations.some((combination) =>
        combination.every((index) => divBoxes[index].classList.contains("x"))
      ) &&
      !winnerCombinations.some((combination) =>
        combination.every((index) => divBoxes[index].classList.contains("o"))
      )
    ) {
      tictactoeDraw.play();
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
    move.play();
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
    move.play();
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
      move.play();
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

// Mario

let marioTheme = new Audio("/files/marioTheme.mp3");
let marioJump = new Audio("/files/marioJump.mp3");
let addBlock = new Audio("/files/addBlock.mp3");
let marioDeath = new Audio("/files/marioDeath.mp3");
let marioWin = new Audio("/files/marioWin.mp3");

const ground = new Image();
ground.src = "/fotos/Brick.webp";
const groundWidth = 50;
const groundHeight = 50;
ground.width = groundWidth;
ground.height = groundHeight;

const mario = new Image();
mario.src = "/fotos/mario.webp";

const marioBack = new Image();
marioBack.src = "/fotos/marioBack.webp";

const creatureImage = new Image();
creatureImage.src = "/fotos/creature.png";

const flag = new Image();
flag.src = "/fotos/flag.png";

const canvas = document.querySelector("canvas");

const ctx = canvas.getContext("2d");

canvas.width = 1024;
canvas.height = 576;

const gravity = 0.8;
let frames = 0;
let creatureFrames = 0;
let movingDirection = "right";
let creatureMovingDirection = "left";
let isMovingRight = false;
let isMovingLeft = false;
let colision = false;

function resetElements() {
  marioTheme.currentTime = 0;
  setTimeout(() => {
    marioTheme.play();
  }, 1500);
  platforms.length = 0;
  pyramid.length = 0;

  drawPlatforms();
}

class Player {
  constructor() {
    this.position = {
      x: 100,
      y: 350,
    };
    this.velocity = {
      x: 0,
      y: 0,
    };
    this.width = 50;
    this.height = 100;
    this.sprites = {
      run: {
        right: mario,
        left: marioBack,
      },
    };
  }
  draw() {
    const currentSprite =
      movingDirection === "right"
        ? this.sprites.run.right
        : this.sprites.run.left;

    ctx.drawImage(
      currentSprite,
      173 * Math.round(frames),
      0,
      150,
      220,
      this.position.x,
      this.position.y,
      this.width,
      this.height
    );
  }

  update() {
    this.draw();

    this.position.x += this.velocity.x;
    this.position.y += this.velocity.y;
    if (this.position.y + this.height + this.velocity.y <= canvas.height) {
      this.velocity.y += gravity;
    } else if (this.position.y > canvas.height) {
      marioDeath.play();
      marioTheme.pause();
      initMario();
    }
  }
}
class Creature {
  constructor() {
    this.position = {
      x: 3900,
      y: 479,
    };
    this.velocity = {
      x: 0,
      y: 0,
    };
    this.width = 40;
    this.height = 50;
    this.sprites = creatureImage;
  }
  draw() {
    ctx.drawImage(
      this.sprites,
      30 * Math.round(creatureFrames),
      0,
      16,
      20,
      this.position.x,
      this.position.y,
      this.width,
      this.height
    );
  }

  update() {
    this.draw();

    if (creatureMovingDirection === "left") {
      this.position.x -= 2;
    } else if (creatureMovingDirection === "right") {
      this.position.x += 2;
    }
    creatureFrames += 0.05;
    if (creatureFrames > 1) {
      creatureFrames = 0;
    }
  }
}

let player = new Player();
let creature = new Creature();

function initMario() {
  resetElements();

  player.position.x = 100;
  player.position.y = 350;
  creature.position.x = 3900;
  finishFlag.position.x = 4000;
}

const platformCount = 50;
const airPlatformCount = 4;
const pyramid = [];
const platforms = [];
// const marioFlag = [];

class Platform {
  constructor({ x, y }) {
    this.position = {
      x,
      y,
    };
    this.image = ground;
    this.width = groundWidth;
    this.height = groundHeight;
  }
  draw() {
    ctx.drawImage(
      ground,
      this.position.x,
      this.position.y,
      this.width,
      this.height
    );
  }
}

class Flag {
  constructor() {
    this.position = {
      x: 4000,
      y: 230,
    };
    this.image = flag;
    this.width = 50;
    this.height = 300;
  }
  draw() {
    ctx.drawImage(
      flag,
      this.position.x,
      this.position.y,
      this.width,
      this.height
    );
  }
  update() {
    this.position.x = finishFlag.position.x;
    this.position.y = finishFlag.position.y;
    this.draw();
  }
}
let finishFlag = new Flag();

function drawPlatforms() {
  for (let i = -1; i < platformCount; i++) {
    const x = i * (groundWidth - 2);
    platforms.push(new Platform({ x, y: 530, image: ground }));
    platforms.push(
      new Platform({ x: (i + 55) * (groundWidth - 2), y: 530, image: ground })
    );
  }
  for (let i = 0; i < airPlatformCount; i++) {
    const x = (5 + i) * (groundWidth - 2);
    platforms.push(new Platform({ x, y: 200, image: ground }));
    platforms.push(
      new Platform({ x: (30 + i) * (groundWidth - 2), y: 350, image: ground })
    );

    for (let level = 0; level < 2; level++) {
      for (let i = 0; i < 2 - level; i++) {
        const x1 = (52.9 + i) * (groundWidth - 1);
        const x2 = (48 - i) * (groundWidth - 1);
        const y = 482 - level * 48;
        platforms.push(new Platform({ x: x1, y, image: ground }));
        platforms.push(new Platform({ x: 1300, y, image: ground }));
        platforms.push(new Platform({ x: x2, y, image: ground }));
      }
    }
  }
}
drawPlatforms();

function makePyramid(number) {
  initMario();
  if (number <= 6) {
    pyramid.length = 0;
    for (let level = 0; level < number; level++) {
      addBlock.play();

      for (let i = 0; i < number - level; i++) {
        const x1 = (12.5 + i) * (groundWidth - 1);
        const x2 = (12.5 - i) * (groundWidth - 1);
        const y = 482 - level * 48;
        pyramid.push(new Platform({ x: x1, y, image: ground }));
        pyramid.push(new Platform({ x: x2, y, image: ground }));
      }
    }
  } else return;
}

const keys = {
  right: {
    pressed: false,
  },
  left: {
    pressed: false,
  },
};

player.update();

let rightRunLimit = false;
let leftRunLimit = false;

function animate() {
  requestAnimationFrame(animate);
  ctx.fillStyle = "lightblue";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  platforms.forEach((platform) => {
    platform.draw();
  });
  pyramid.forEach((block) => {
    block.draw();
  });

  player.update();
  creature.update();
  finishFlag.update();

  if (player.position.x === 405) {
    rightRunLimit = true;
  } else if (!keys.right.pressed) {
    rightRunLimit = false;
  }
  if (player.position.x === 50) {
    leftRunLimit = true;
  } else if (!keys.left.pressed) {
    leftRunLimit = false;
  }

  if (keys.right.pressed) {
    frames += 0.2;
    if (frames > 2) {
      frames = 0;
    }
  }
  if (keys.left.pressed) {
    frames += 0.2;
    if (frames > 2) {
      frames = 0;
    }
  }

  if (keys.right.pressed && player.position.x <= 400) {
    player.velocity.x = 5;
  } else if (keys.left.pressed && player.position.x > 50) {
    player.velocity.x = -5;
  } else {
    player.velocity.x = 0;
  }
  if (
    player.position.y + player.height <= finishFlag.position.y &&
    player.position.y + player.height + player.velocity.y >=
      finishFlag.position.y &&
    player.position.x + player.width >= finishFlag.position.x &&
    player.position.x <= finishFlag.position.x + finishFlag.width
  ) {
    player.velocity.y = 0;
  }
  if (player.position.x === finishFlag.position.x - 10) {
    console.log("win");
    marioWin.play();
    marioTheme.pause();
    initMario();
    rightRunLimit = false;
  }

  //creature
  if (creature.position.x + creature.width == finishFlag.position.x) {
    console.log("iviko kazkas");
    creatureMovingDirection = "left";
  }

  if (keys.right.pressed && rightRunLimit) {
    finishFlag.position.x -= 5;
    creature.position.x -= 5;
  }
  if (keys.left.pressed && leftRunLimit) {
    finishFlag.position.x += 5;
    creature.position.x += 5;
  }

  //mario atsimusimas i creature
  if (
    player.position.x <= creature.position.x + creature.width - 20 &&
    player.position.x + player.width - 20 >= creature.position.x &&
    player.position.y + player.height >= creature.position.y
  ) {
    initMario();
    marioDeath.play();
  }

  platforms.forEach((platform) => {
    if (
      player.position.y + player.height <= platform.position.y &&
      player.position.y + player.height + player.velocity.y >=
        platform.position.y &&
      player.position.x + player.width >= platform.position.x &&
      player.position.x <= platform.position.x + platform.width
    ) {
      player.velocity.y = 0;
    }
    //atsimusa i platformos apacia
    if (
      player.position.y >= platform.position.y + platform.height &&
      player.position.y + player.velocity.y <=
        platform.position.y + platform.height &&
      player.position.x + player.width >= platform.position.x &&
      player.position.x <= platform.position.x + platform.width
    ) {
      player.position.y = platform.position.y + platform.height;
      player.velocity.y = 0;
    }

    if (keys.right.pressed && rightRunLimit) {
      platform.position.x -= 5;
    }
    if (keys.left.pressed && leftRunLimit) {
      platform.position.x += 5;
    }
    if (
      (player.position.x + player.width <= platform.position.x &&
        player.position.x + player.width + player.velocity.x >=
          platform.position.x &&
        player.position.y + player.height >= platform.position.y &&
        player.position.y <= platform.position.y + platform.height) ||
      (player.position.x >= platform.position.x + platform.width &&
        player.position.x + player.velocity.x <=
          platform.position.x + platform.width &&
        player.position.y + player.height >= platform.position.y &&
        player.position.y <= platform.position.y + platform.height)
    ) {
      player.velocity.x = 0;
    }
    if (
      creature.position.x + creature.velocity.x <=
        platform.position.x + platform.width + platform.width &&
      creature.position.y >= platform.position.y
    ) {
      creatureMovingDirection = "right";
      console.log("ar kazkas vyksta?");
    }
  });
  pyramid.forEach((block) => {
    console.log("colision ===", colision);
    //uzsokimas ant virsaus
    if (
      player.position.y + player.height <= block.position.y &&
      player.position.y + player.height + player.velocity.y >=
        block.position.y &&
      player.position.x + player.width >= block.position.x &&
      player.position.x <= block.position.x + block.width
    ) {
      player.velocity.y = 0;
    }
    //kaip padaryt, kad blokai esantys toliau taip pat sustotu??????????
    if (player.position.x >= block.position.x - block.width) {
      if (!colision) {
        console.log("colision ===", colision);
        colision = true;
      }
    }
    console.log("colision ===", colision);
    if (keys.right.pressed && rightRunLimit && !colision) {
      block.position.x -= 5;
    }
    if (keys.left.pressed && leftRunLimit) {
      block.position.x += 5;
    }
    //atsimusimas i sonus
    if (
      (player.position.x + player.width <= block.position.x &&
        player.position.x + player.width + player.velocity.x >=
          block.position.x &&
        player.position.y + player.height >= block.position.y &&
        player.position.y <= block.position.y + block.height) ||
      (player.position.x >= block.position.x + block.width &&
        player.position.x + player.velocity.x <=
          block.position.x + block.width &&
        player.position.y + player.height >= block.position.y &&
        player.position.y <= block.position.y + block.height)
    ) {
      player.velocity.x = 0;
      // block.position.x = -10;
      // console.log("kazkas");
    }
  });
}
animate();

let isJumping = false;

let lastPressedKey = null;

addEventListener("keydown", ({ key }) => {
  switch (key) {
    case "a":
    case "A":
      keys.left.pressed = true;
      isMovingRight = false;
      isMovingLeft = true;
      if (!keys.right.pressed) {
        movingDirection = "left";
      }
      lastPressedKey = key;
      break;

    case "d":
    case "D":
      keys.right.pressed = true;
      isMovingRight = true;
      isMovingLeft = false;
      movingDirection = "right";
      lastPressedKey = key;
      break;
    case "w":
    case "W":
      if (player.velocity.y == 0 && !isJumping) {
        marioJump.play();
        player.velocity.y -= 15;
        isJumping = true;
      }
      lastPressedKey = key;
      break;
  }
});

addEventListener("keyup", ({ key }) => {
  switch (key) {
    case "a":
    case "A":
      keys.left.pressed = false;
      frames = 2;
      if (keys.right.pressed) {
        movingDirection = "right";
      }
      break;

    case "d":
    case "D":
      frames = 0;
      keys.right.pressed = false;
      if (keys.left.pressed) {
        movingDirection = "left";
      }
      player.velocity.x = 0;
      break;
    case "w":
    case "W":
      isJumping = false;
      break;
  }
});

// /Mario

// Jokes
function generateJoke(jokeType) {
  if (jokeType === "chuck") {
    fetch("https://api.chucknorris.io/jokes/random")
      .then((response) => response.json())
      .then(
        (json) => (document.getElementById("jokeText").innerText = json.value)
      )
      .catch((error) => console.error(error));
  } else if (jokeType === "dad") {
    fetch("https://icanhazdadjoke.com/", {
      headers: {
        Accept: "text/plain",
      },
    })
      .then((response) => response.text())
      .then((text) => (document.getElementById("jokeText").innerText = text))
      .catch((error) => console.error(error));
  }
}
// /Jokes
