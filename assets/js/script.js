


//questions
var startMsg = document.querySelectorAll(".startMsg");
var question1 = document.querySelectorAll(".question1");
var question2 = document.querySelectorAll(".question2");
var question3 = document.querySelectorAll(".question3");
var question4 = document.querySelectorAll(".question4");
var question5 = document.querySelectorAll(".question5");
var question6 = document.querySelectorAll(".question6");

var questionArray = [question1, question2, question3, question4, question5, question6];

//buttons
var startButton = document.querySelector("#startButton");
var viewHighScoreButton = document.querySelector("#viewHighScoreButton");
var saveBtn = document.querySelector("#saveButton");

//textbox
var initials = document.querySelector("#initials");

//Timers
var timerSection = document.querySelector("#timerSection");

// answer buttons
var ansButtonList = document.querySelectorAll("ul");

//Other sections
var startBtn = document.querySelectorAll(".startBtn");
var viewHighScore = document.querySelectorAll(".viewHighScore");
var warning = document.querySelectorAll(".warning");
var result = document.querySelectorAll(".result");
var saveToMemory = document.querySelectorAll(".saveToMemory");
var viewHighScoreResult = document.querySelectorAll(".viewHighScoreResult");

//message spans

var rslt = document.querySelector("#rslt");
var score = document.querySelector("#score");
var highestScore = document.querySelector("#highestScore");

//declaring global variables
var timeRemaining = 75;
var questionIndex = 0;
var scoreToSave = 0;
var scoreObjectArray = [];




//Hide all the questions and messages

function hideAllInitialSections() {
    //Hideing all questions
    hideAllQuestions();
    // Hideing warning section
    hideWarningSection();
    // Hideing result section
    hideResultSection();
    // Hideing show high score section
    hideViewHighScoreSection();
    // Hideing saveToMemory section
    hideSaveToMemorySection();
    //Hideing High Score Result Section
    hideViewHighScoreResultSection()
}

//Hiding all the questions for first screen
hideAllInitialSections();

//hide all the questions for initial section
function hideAllQuestions() {
    for (var j = 0; j < questionArray.length; j++) {
        for (var i = 0; i < questionArray[j].length; i++) {
            questionArray[j][i].style.display = "none";
        }
    }
}
//show View Highest Score in memory section
function showViewHighScoreSection() {
    for (var i = 0; i < viewHighScore.length; i++) {
        viewHighScore[i].style.display = "block";
    }
}
//hide View Highest Score in memory section
function hideViewHighScoreSection() {
    for (var i = 0; i < viewHighScore.length; i++) {
        viewHighScore[i].style.display = "none";
    }
}
//show show ViewHigh Score Result Section
function showViewHighScoreResultSection() {
    for (var i = 0; i < viewHighScoreResult.length; i++) {
        viewHighScoreResult[i].style.display = "block";
    }
}
//hide show ViewHigh Score Result Section
function hideViewHighScoreResultSection() {
    for (var i = 0; i < viewHighScoreResult.length; i++) {
        viewHighScoreResult[i].style.display = "none";
    }
    highestScore.innerHTML = "";
}


//show initial screen message about quiz
function showInitialScreen() {
    for (var i = 0; i < startMsg.length; i++) {
        startMsg[i].style.display = "block";
    }
    // hide start question button

    for (var i = 0; i < startBtn.length; i++) {
        startBtn[i].style.display = "block";
    }
    //show viewHighScore button
    for (var i = 0; i < viewHighScore.length; i++) {
        viewHighScore[i].style.display = "block";
    }
}
//hide initial screen message about quiz
function hideInitialScreen() {
    for (var i = 0; i < startMsg.length; i++) {
        startMsg[i].style.display = "none";
    }
    // hide start question button

    for (var i = 0; i < startBtn.length; i++) {
        startBtn[i].style.display = "none";
    }
    //hide viewHighScore button
    for (var i = 0; i < viewHighScore.length; i++) {
        viewHighScore[i].style.display = "none";
    }
}
// hide result section
function hideResultSection() {
    for (var i = 0; i < result.length; i++) {
        result[i].style.display = "none";
    }
}
//show result section
function showResultSection() {
    for (var i = 0; i < result.length; i++) {
        result[i].style.display = "block";
    }
}
//hide question
function hideQuestion() {
    var question = questionArray[questionIndex];
    for (var i = 0; i < question.length; i++) {
        question[i].style.display = "none";
    };
}
//show question
function showQuestion() {
    var question = questionArray[questionIndex];
    for (var i = 0; i < question.length; i++) {
        question[i].style.display = "block";
    };
}
//show save to memory section
function showSaveToMemorySection() {
    for (var i = 0; i < saveToMemory.length; i++) {
        saveToMemory[i].style.display = "block";
    }
}
//hide save to memory section
function hideSaveToMemorySection() {
    for (var i = 0; i < saveToMemory.length; i++) {
        saveToMemory[i].style.display = "none";
    }
}
//show warning section
function showWarningSection() {
    for (var i = 0; i < warning.length; i++) {
        warning[i].style.display = "block";
    }
}
//hide warning section
function hideWarningSection() {
    for (var i = 0; i < warning.length; i++) {
        warning[i].style.display = "none";
    }
}


//save the result
function saveResult() {
    // console.log("save result");
    showInitialScreen();
    startButton.textContent = "Retake Quiz";
    showSaveToMemorySection();
    score.textContent = timeRemaining;
    scoreToSave = timeRemaining;// saving the score to a variable before
}

//saving the result to memory
saveBtn.addEventListener("click", function (event) {
    event.preventDefault();
    if (saveBtn.matches("button")) {
        //disabled buttin to prevent double click
        saveBtn.disabled = true;

        if (initials.value.trim() == "") {
            alert("Enter initials.......");
        }

        var scoreObject = {
            userInitial: initials.value.trim(),
            scoreValue: scoreToSave
        };
        initials.value = "";
        var scoreObjectList = JSON.parse(localStorage.getItem("scoreObject"));
        if (scoreObjectList == null) {
            scoreObjectArray.push(scoreObject);
        }
        else {
            scoreObjectArray = scoreObjectList;
            scoreObjectArray.push(scoreObject);
        }

        localStorage.setItem("scoreObject", JSON.stringify(scoreObjectArray));
        scoreToSave = 0;
        event.stopPropagation();
        saveBtn.disabled = false;
        hideSaveToMemorySection();
    }
});

//showing the highest score from memory
viewHighScoreButton.addEventListener("click", function (event) {
    event.preventDefault();
    if (viewHighScoreButton.matches("button")) {
        //disabled buttin to prevent double click
        viewHighScoreButton.disabled = true;
        event.stopPropagation();
        showViewHighScoreResultSection();
        var scoreObjectList = JSON.parse(localStorage.getItem("scoreObject"));
        var highistScore = 0;
        var highistScoreInitial = "";
        var highistScorevalue = 0;

        if (scoreObjectList !== null) {
            for (var i = 0; i < scoreObjectList.length; i++) {
                if (highistScore < scoreObjectList[i].scoreValue) {
                    highistScoreInitial = scoreObjectList[i].userInitial;
                    highistScore = scoreObjectList[i].scoreValue;
                    highistScorevalue = scoreObjectList[i].scoreValue;
                }
            }
        }
        else {
            highistScore = 0;
            highistScoreInitial = "No Results in memory";
            highistScorevalue = 0;
        }
        // showing the value on the screen
        var highistScoreString = ("Name is : "+highistScoreInitial + ", and Score is: " + highistScorevalue);
        highestScore.innerHTML = highistScoreString;
        viewHighScoreButton.disabled = false;
    }
});





// display next question and attach event listener for the elements
function nextQuestion() {
    showQuestion();
    //*********************************** */
    // this logic is implemented because unable to check whether event listener for first round exists with button
    if (startButton.textContent !== "Retake Quiz") {
        addEventListenerToButtons(questionIndex);
    }
    //*********************************** */
}
// main timer for the application
var quizTimer = setInterval(timerCallbackFunction, 1000);
var timerCallbackFunction = function () {
    timerSection.textContent = timeRemaining;
    timeRemaining--;
};



function programExecution() {
    if (questionIndex < questionArray.length && timeRemaining > 0) {
        // show first question
        nextQuestion();
    }
    //stop timer when time remaining is 0
    else if (timeRemaining <= 0 && questionIndex < questionArray.length) {
        clearInterval(quizTimer);
        hideQuestion();
        // show warning section
        showWarningSection();
        hideResultSection();
        saveResult();
    }
    else if (timeRemaining <= 0 && questionIndex >= questionArray.length) {
        clearInterval(quizTimer);
        // show warning section
        showWarningSection();
        saveResult();
    }
    // stop timer, when all the question finished
    else if (questionIndex >= questionArray.length) {
        clearInterval(quizTimer);
        saveResult();
    }
}



// start the quiz
startButton.addEventListener("click", function (event) {
    event.preventDefault();
    //  hide initial screen and button
    event.stopPropagation();

    hideInitialScreen();
    hideAllInitialSections();
    // initializing quiz timer
    timeRemaining = 75;
    questionIndex = 0;
    quizTimer = setInterval(timerCallbackFunction, 1000);
    programExecution();
});



function checkAnswers(clickEvent) {
    // console.log("button");
    if (clickEvent.classList.contains("correct")) {
        showAnswer("correct");
    }
    else {
        showAnswer("wrong");
        timeRemaining = timeRemaining - 15;
    }
}

//function result to user
function showAnswer(msg) {
    //showing the result section
    showResultSection();
    rslt.innerHTML = msg;
    var secondsDelay2 = setInterval(function () {
        //hiding after showing result for 2 seconds
        clearInterval(secondsDelay2);
        hideResultSection();
        hideQuestion();
        questionIndex++;
        // console.log(questionIndex);
        programExecution();
    }, 2000);

}
//adding event listener to the current question and take action for fired event
function addEventListenerToButtons(index) {
    ansButtonList[index].addEventListener("click", function (event) {
        event.preventDefault();
        var clickEvent = event.target;
        // console.log(clickEvent);
        event.stopPropagation();
        //  console.log(clickEvent);     
        if (clickEvent.matches("button")) {
            //disabled buttin to prevent double click
            clickEvent.disabled = true;

            // This section is for removing different button click events for same question
            // var lists = ansButtonList[index].childNodes;

            // for (var i = 0; i < lists.length; i++) {
            //     var elementList = lists[i].childNodes
            //     console.log(elementList);
            //     for (var j = 0; j < elementList.length; j++) {
            //         //if (elementList[j].hasChildNodes()) {
            //             // var buttonElements = elementList[j].childNodes;
            //             // console.log(buttonElements);
            //         //}
            //     }
            // }

            // var buttonOpt = document.querySelectorAll(".buttonOpt");
            // for (var i = 0; i<buttonOpt.length;i++){
            //     var currentElement = buttonOpt[i];
            //     console.log(currentElement);
            //     currentElement.removeEventListener("click", function(event){
            //         console.log(currentElement);
            //     }, true);
            // }

            //moved out in to a function

            checkAnswers(clickEvent);
            clickEvent.disabled = false;
        }
        else {
            alert("click the answer buttons!..");
        }
    });
}

