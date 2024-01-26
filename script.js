const questions_data = [
  {
    questions: "Who is the largest animal in the world",
    answers: [
      { text: "Shark", correct: false },
      { text: "Blue Whale", correct: true },
      { text: "Elephant", correct: false },
      { text: "Lion", correct: false },
    ],
  },
  {
    questions: "Which is the smallest continent is world?",
    answers: [
      { text: "Australia", correct: true },
      { text: "Asia", correct: false },
      { text: "Africe", correct: false },
      { text: "Europe", correct: false },
    ],
  },
  {
    questions: "Which is the largest continent in the world?",
    answers: [
      { text: "Asia", correct: true },
      { text: "Africe", correct: false },
      { text: "South America", correct: false },
      { text: "North America", correct: false },
    ],
  },
  {
    questions: "Which is the largest country in the world?",
    answers: [
      { text: "Vetican city", correct: true },
      { text: "Swedan", correct: false },
      { text: "Japan", correct: false },
      { text: "South Korea", correct: false },
    ],
  },
];

const questionElement = document.querySelector("#question");
const result_shown = document.querySelector(".quiz")
const answerArea = document.getElementById("answer-button");
const options = document.querySelectorAll(".btn");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let correctAnswer = 0;

function startQuiz() {
    correctAnswer = 0;
    currentQuestionIndex = 0;
    loadQuestion(questions_data, currentQuestionIndex);
}

function handleScorePage(correctNo) {
    result_shown.innerHTML = `You scored ${correctNo} out of ${questions_data.length}`;
}

function showTrueOption(buttons) {
    buttons.forEach(button => {
        if (button.getAttribute('isCorrect') === 'true') {
            button.classList.add("correct");
        }
        button.disabled = true;
    });
}

answerArea.addEventListener("click", function (e) {
    if (e.target.classList.contains("btn")) {
        const selectedButton = e.target;
        const isCorrect = selectedButton.getAttribute("isCorrect");

        if (isCorrect === "true") {
            correctAnswer++;
            selectedButton.classList.add("correct");
        } else {
            showTrueOption(options);
            selectedButton.classList.add("incorrect");
        }

        options.forEach(button => button.disabled = true);
        nextButton.style.display = "block";
    }
});

nextButton.addEventListener("click", function () {
    removeLastQuestionData(options);

    if (currentQuestionIndex < questions_data.length - 1) {
        loadQuestion(questions_data, ++currentQuestionIndex);
    } else {
        handleScorePage(correctAnswer);
        nextButton.style.display = "none";
    }
});

function removeLastQuestionData(buttons) {
    buttons.forEach(button => {
        button.classList.remove("correct", "incorrect");
        button.disabled = false;
    });
}

function loadQuestion(questionsData, questionIndex) {
    const currentQuestion = questionsData[questionIndex];

    if (currentQuestion) {
        questionElement.textContent = currentQuestion.questions;
        answerArea.setAttribute("data-question-number", questionIndex);

        options.forEach((button, index) => {
            button.textContent = currentQuestion.answers[index].text;
            button.setAttribute("option_no", index);
            button.setAttribute("isCorrect", currentQuestion.answers[index].correct);
        });
    }
}

startQuiz();