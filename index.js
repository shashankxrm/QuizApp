const questions = [
    {
        questions: "What is the output of the following code?\n\nconsole.log(2 + '2');\n",
        answers: [
            { text: "'22'", correct: true },
            { text: "4", correct: false },
            { text: "22", correct: false },
            { text: "NaN", correct: false }
        ]
    },
    {
        questions:"What is the result of the following expression?\n\ntypeof null;",
        answers: [
            { text: "'object'", correct: true },
            { text: "'null'", correct: false },
            { text: "'undefined'", correct: false },
            { text: "'number'", correct: false }
        ]
    },
    {
        questions:"What is the output of the following code?\n\nconsole.log(3 === '3');",
        answers: [
            { text: "false", correct: true },
            { text: "true", correct: false },
            { text: "TypeError", correct: false },
            { text: "undefined", correct: false }
        ]
    },
    {
        questions:"What is the result of the following expression?\n\n[1, 2, 3] instanceof Array;",
        answers: [
            { text: "true", correct: true },
            { text: "false", correct: false },
            { text: "TypeError", correct: false },
            { text: "undefined", correct: false }
        ]
    },
    {
        questions:"What is the output of the following code?\n\nconsole.log(typeof NaN);",
        answers: [
            { text: "'number'", correct: true },
            { text: "'NaN'", correct: false },
            { text: "'undefined'", correct: false },
            { text: "'string'", correct: false }
        ]
    }
    
];

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next"
    showQuestion();
}

function showQuestion(){
    resetState(); // Reset the state of the buttons
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.questions.replace('?', '?<br>');

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);
        if (answer.correct) {
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);
    });
}

function resetState() {
    nextButton.style.display = "none";
    while (answerButtons.firstChild) {
        answerButtons.removeChild(answerButtons.firstChild);
    }
}
function selectAnswer(e) {
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if (isCorrect) {
        selectedBtn.classList.add("correct");
        score++;
    } else {
        selectedBtn.classList.add("incorrect");
    }
    Array.from(answerButtons.children).forEach(button => {
        if (button.dataset.correct === "true") {
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextButton.style.display = "block";
    
}

nextButton.addEventListener("click", () => {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        showQuestion();
    } else {
        while (answerButtons.firstChild) {
            answerButtons.removeChild(answerButtons.firstChild);
        }
        questionElement.innerHTML = "Your Score is: " + score + "/" + questions.length;
        nextButton.innerHTML = "Restart";
        nextButton.addEventListener("click", startQuiz);
    }
}); 
startQuiz();