function showSelection(section) {
  document.querySelectorAll("main > section").forEach((div) => {
    div.style.display = "none";
  });
  document.getElementById(section).style.display = "block";
}

// Quiz
var question1 = {
  question: "Does this work?",
  options: ["no", "yes"],
  answer: "no",
};

var currentQuestionId = "quizQuestion";

document.getElementById(currentQuestionId).innerText = question1.question;
document.getElementById("option1").innerText = question1.options[0];
document.getElementById("option2").innerText = question1.options[1];

var score = 0;
function checkAnswer(userAnswer) {
  if (userAnswer === question1.answer) {
    alert("correct");
    score++;
    document.getElementById("score").innerText = `Your score is: ${score}/10`;
  } else {
    alert("Wrong!");
  }
}

// /Quiz
