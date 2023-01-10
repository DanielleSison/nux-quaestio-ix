// Variable definition

var startButton = document.querySelector(".start-button");
var pageTitle = document.querySelector(".page-title")
var timerDiv = document.querySelector("#timer-count");
var quizContainer = document.querySelector("#quiz-container")
var questionEl = document.querySelector(".question-text")
var answerEl = document.querySelector("#answer-button")
var nextButton = document.querySelector('.next-button')
var scoreCard = document.querySelector(".score")
 

var secondsLeft = 30;

var questions = [
    {
        question: 'What does DOM stand for?',
        answers: [
            {text: 'Distant Object Module', correct: false},
            {text: 'Document Object Model', correct: true},
        ]
    },
    {
        question: 'What is the static method of converting an object in text format into a JavaScript object? ',
        answers: [
            {text: 'JSON.parse', correct: true},
            {text: 'JSON.stringify', correct: false},
        ]
    },
    {
        question: 'Which css file must be linked last?',
        answers: [
            {text: 'reset.css', correct: false},
            {text: 'custom.css', correct: true}
        ]
    },
    {
        question: 'What does API stand for?',
        answers: [
            {text: 'Application Programming Interface', correct: true},
            {text: 'Automatic Program Interface', correct: false},
            
        ]
    },
    {
        question: 'Which JavaScript method allows you to setup functions to be called when a specified event happens?',
        answers: [
            {text: 'addEventListener()', correct: true},
            {text: 'createElement()', correct: false},
            
        ]
    },
    {
        question: 'How many columns does the Boostrap grid system utilize?',
        answers: [
            {text: '12 columns', correct: true},
            {text: '21 columns', correct: false},
            
        ]
    },
    {
        question: 'Which css file must be linked first?',
        answers: [
            {text: 'reset.css', correct: true},
            {text: 'Bootstrap link', correct: false},
        ]
    },
    {
        question: 'What does CSS stand for',
        answers: [
            {text: 'Cascading Style Sheets', correct: true},
            {text: 'Computer Style Sheets', correct: false},
        ]
    },
    {
        question: 'In CSS, what is used to create a responsive web design to make a user-friendly website?',
        answers: [
            {text: 'JSLI', correct: false},
            {text: 'Media Query', correct: true},
        ]
    },
    {
        question: 'What does the "#" indicate in JavaScript or CSS?',
        answers: [
            {text: 'class', correct: false},
            {text: 'ID', correct: true},
        ]
    },
     
]

let shuffledQuestions, currentQuestionIndex
let score = 0

// Timer Function

function quizTimer() {
    // Sets interval in variable
    var timerInterval = setInterval(function() {
      secondsLeft--;
      timerDiv.textContent = secondsLeft + " seconds remaining.";
  
      if(secondsLeft <= 0) {
        clearInterval(timerInterval);
                
      }
  
    }, 1000);
    // endGame()
  }
  

// Quiz populates page - question/answer

function quizStart() {
    startButton.classList.add("hide")
    pageTitle.classList.add("hide")
    quizContainer.classList.remove("hide")
    shuffledQuestions = questions.sort(() => Math.random()- .5)
    currentQuestionIndex = 0
    nextQuestion()
    quizTimer()
    
        
}

function nextQuestion(){
    resetState()
    showQuestion(shuffledQuestions[currentQuestionIndex])

}

function showQuestion(question){
    questionEl.innerText = question.question
    question.answers.forEach(answer => {
        var button = document.createElement('button')
        button.innerText = answer.text
        button.classList.add('btn')
        if (answer.correct){
            button.dataset.correct = answer.correct
        }
        button.addEventListener("click", selectAnswer)
        answerEl.appendChild(button)
    })
}

function resetState(){
    nextButton.classList.add('hide')
    while (answerEl.firstChild) {
        answerEl.removeChild(answerEl.firstChild)
    }
}

function selectAnswer(e){
    var selectedButton = e.target
    var correct = selectedButton.dataset.correct
    setStatusClass(document.body, correct)
    Array.from(answerEl.children).forEach(button => {
        setStatusClass(button, button.dataset.correct)
    })
    if (shuffledQuestions.length > currentQuestionIndex + 1){
    nextButton.classList.remove('hide')
        } else{
        startButton.classList.add('hide')
        }
}

// Correct / Incorrect Answer determination - timer deduction function

function setStatusClass(element, correct){
    clearStatusClass(element)
    if (correct){
        element.classList.add('correct')
        secondsLeft = secondsLeft + 1;
        //score = score + 1;
        //scoreCard = score;
        
    } else {
        element.classList.add('wrong')
        secondsLeft = secondsLeft - 2;
        //score = score + 0;
       // scoreCard = score;
    }
}

function clearStatusClass(element){
    element.classList.remove('correct')
    element.classList.remove('wrong')
}

// Start Button - transition to quiz

startButton.addEventListener("click", quizStart); 
nextButton.addEventListener("click", () => {
    currentQuestionIndex++
    nextQuestion()
}) 


// End of Game Operations

//function setScore() {
    //score.textContent = scoreCard;
    //localStorage.setItem("scoreCount", score)
//}

//function endGame(){
    //if (secondsLeft <= 0){
        //scoreCard.classList.remove("hide")
        //answerEl.classList.add("hide")
        
    //}

    //setScore()
//}


