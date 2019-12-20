//define arrays for questions
//order as [question, option_1,option_2, option_3, option_4, Ans]
var startBtn = document.querySelector("#startBtn");
var viewHighScore = document.querySelector("#viewHighScore");
var ansOptions = document.querySelector("#ansOptions");
var question = document.querySelector("#question");
var result = document.querySelector("#result");
// var totalScore = document.querySelector("#totalScore");
var timer = document.querySelector("#timer");
var warning = document.querySelector("#warning");
var saveScoreElements = document.querySelectorAll(".saveScoreElements");

// var saveScore = document.querySelector("#saveScore");
var inputUserInitialLabel = document.querySelector("#inputUserInitialLabel");
var inputUserInitialInput = document.querySelector("#inputUserInitialInput");
var saveScorevalue = document.querySelector("#saveScorevalue");
var saveScoreButton = document.querySelector("#saveScoreButton");



var questions = [
    {
        title: "Commonly used data types DO NOT include:",
        choices: ["strings", "booleans", "alerts", "numbers"],
        answer: "alerts"
    },
    {
        title: "The condition in an if / else statement is enclosed within ____.",
        choices: ["quotes", "curly brackets", "parentheses", "square brackets"],
        answer: "parentheses"
    },
    // {
    //     title: "Commonly used data types DO NOT include:",
    //     choices: ["strings", "booleans", "alerts", "numbers"],
    //     answer: "alerts"
    // },
    // {
    //     title: "The condition in an if / else statement is enclosed within ____.",
    //     choices: ["quotes", "curly brackets", "parentheses", "square brackets"],
    //     answer: "parentheses"
    // },
    // {
    //     title: "Commonly used data types DO NOT include:",
    //     choices: ["strings", "booleans", "alerts", "numbers"],
    //     answer: "alerts"
    // },
];

//variable to save correct answer count, remaining time
// var timeTaken = 0;
// var timeTakenForQuestion = 0;
var questionIndex = 0;
var timeTaken = 75;
// var score = 0;


var timeElapsed = null;
result.parentElement.style.display = "none";
warning.style.display = "none";
function clearSavetoMemoryElemente() {
    for (var i = 0; i < saveScoreElements.length; i++) {
        saveScoreElements[i].style.display = "none";
        // console.log(saveScoreElements[i]);
    }
}

clearSavetoMemoryElemente();

function startTimer() {
    timeElapsed = setInterval(function () {
        warning.style.display = "none";
        clearSavetoMemoryElemente();
        timeTaken = timeTaken - 1;
        timer.textContent = timeTaken;
        if (timeTaken < 0) {
            clearQuestion();
            timeTaken = 0;
            timer.textContent = timeTaken;
            finalScore();
            warning.style.display = "block";
            warning.innerHTML = "The time is over!.......";
            clearInterval(timeElapsed);
        }
    }, 1000);
}
//start quiz loop through the questions
startBtn.addEventListener("click", function (event) {
    startBtn.style.display = "none";
    viewHighScore.style.display = "none";
    timeTaken = 75;
    // score = 0;
    // totalScore.textContent = score;
    clearQuestion();
    startTimer();
    displayQuestion();
});


function displayQuestion() {
    var questionNo = questionIndex+1+" : "+ questions[questionIndex].title;
    question.innerHTML = questionNo;
    ansOptions.value = "";
    for (var i = 0; i < questions[questionIndex].choices.length; i++) {
        var choice = questions[questionIndex].choices[i];
        var li = document.createElement("li");
        li.setAttribute("id", i);
        var button = document.createElement("button");
        button.setAttribute("class", "btn btn-outline-primary");
        button.style.margin="2px";
        button.textContent = choice;
        li.appendChild(button);
        ansOptions.appendChild(li);
    }

}

function finalScore() {
    // console.log("finished");

    //changing button caption
    startBtn.style.display = "block";
    startBtn.textContent = "Go Back to Quiz";
    viewHighScore.style.display = "block";
    questionIndex = 0;
    //for saving score if it is greater than 0
    if (timeTaken >= 0) {

        for (var i = 0; i < saveScoreElements.length; i++) {
            saveScoreElements[i].style.display = "inline";
        }
        //creating input text for entering the initials
        //all dynamic variables are created with d_
        var d_lableForInput = document.createElement("p");
        d_lableForInput.textContent = "Enter Initials";
        d_lableForInput.setAttribute("class", "d_saveScoreElements");
        d_lableForInput.style.textAlign = "centre";
        inputUserInitialLabel.appendChild(d_lableForInput);
        var d_inputInitial = document.createElement("input");
        d_inputInitial.setAttribute("id", "d_initials");
        d_inputInitial.setAttribute("class", "d_saveScoreElements");
        d_inputInitial.style.width = "70%";
        d_inputInitial.style.textAlign = "centre";
        inputUserInitialInput.appendChild(d_inputInitial);
        var d_initials = document.querySelector("#d_initials");
        //showing score along with initials
        var d_scoreLabel = document.createElement("p");
        d_scoreLabel.setAttribute("class", "d_saveScoreElements");
        d_scoreLabel.setAttribute("id", "d_scoreValue");
        d_scoreLabel.innerText = timeTaken;
        saveScorevalue.appendChild(d_scoreLabel);
        var d_scoreValue = document.querySelector("#d_scoreValue");
        //appending saving button
        var d_saveScoretoMemory = document.createElement("button");
        d_saveScoretoMemory.setAttribute("class", "d_saveScoreElements btn btn-success");
        d_saveScoretoMemory.setAttribute("id", "d_saveScoretoMemory");
        d_saveScoretoMemory.style.textAlign = "centre";
        d_saveScoretoMemory.setAttribute("type", "button");
        d_saveScoretoMemory.setAttribute("id", "d_saveScoretoMemory");
        d_saveScoretoMemory.innerText = "Save";

        saveScoreButton.appendChild(d_saveScoretoMemory);
        var d_saveScoretoMemoryBtn = document.querySelector("#d_saveScoretoMemory");
        //saving to memory
        d_saveScoretoMemoryBtn.addEventListener("click", function (event) {
            // console.log(d_initials.value + " : " + d_scoreValue.innerText);

            localStorage.setItem(d_initials.value,  d_scoreValue.innerText);

            //remove all dynamic created elements
            // var d_saveScoreElements = document.querySelectorAll(".d_saveScoreElements")
            for (var i = 0; i < saveScoreElements.length; i++) {
                var child = saveScoreElements[i].lastElementChild;
                while (child) {
                    console.log(child);
                    saveScoreElements[i].removeChild(child);
                    
                    child = saveScoreElements[i].lastElementChild;
                }
            }
        });






    }
}

function nextQuestion() {

    questionIndex++;
    if (questionIndex > questions.length - 1) {
        clearInterval(timeElapsed);
        finalScore();
    }
    else {
        displayQuestion();
    }
}

function clearQuestion() {
    result.textContent = "";
    question.innerHTML = "";
    while (ansOptions.firstChild) {
        ansOptions.removeChild(ansOptions.firstChild);
    }
}

function verifyUserAnswer(event) {
    var userAnswer = event.target.parentElement;
    // console.log("target clicked = ", userAnswer);
    var indexOfAnswer = parseInt(userAnswer.getAttribute("id"));
    // console.log("User choose : " + indexOfAnswer);


    var answerString = questions[questionIndex].answer;

    var ansArray = questions[questionIndex].choices;
    var ansIndux = parseInt(ansArray.indexOf(answerString));
    // console.log("CorrectAns is : " + ansIndux);
    var resultOfQuestion = "";
    if (indexOfAnswer === ansIndux) {
        // console.log(indexOfAnswer + " : index: " + ansIndux + " :correct");
        resultOfQuestion = "correct";
        // score = score + 10;
    }
    else {
        // console.log(indexOfAnswer + " : index: " + ansIndux + " :wrong");
        resultOfQuestion = "wrong";
        timeTaken = timeTaken - 15;
        // score = score - 5;
    }
    //show answer for two seconds
    result.parentElement.style.display = "block";
    result.textContent = resultOfQuestion;
    // totalScore.textContent = score;

    var secondsDelay2 = setInterval(function () {
        clearInterval(secondsDelay2);
        result.parentElement.style.display = "none";
        clearQuestion();
        nextQuestion();
    }, 2000);
}

//User clicks answer
ansOptions.addEventListener("click", function (event) {
    event.preventDefault();
    console.log(event.target);

    if (event.target.matches("button")) {
        verifyUserAnswer(event);
    }
});