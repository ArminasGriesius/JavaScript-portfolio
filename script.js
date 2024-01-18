function showSelection(section) {
  document.querySelectorAll("main > section").forEach((div) => {
    div.style.display = "none";
  });
  document.getElementById(section).style.display = "block";
}

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
    options: ["Augureys", "Billywigs", "Cornish pixies", "Fairies"],
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
var currentQuestionId = "quizQuestion";

function nextQuestion() {
  if (currentQuestion < questions.length) {
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
  document.getElementById("startBtn").style.display = "none";
  document.getElementById("quizSection").style.display = "block";
}

var score = 0;
var currentQuestion = 0;

function checkAnswer(userAnswer) {
  if (userAnswer === questions[currentQuestion].answer) {
    alert("correct");
    score++;
    document.getElementById("score").innerText = `Your score is: ${score}/10`;
  } else {
    alert("Wrong!");
  }
  currentQuestion++;
  nextQuestion(questions[currentQuestion]);
}

// /Quiz
