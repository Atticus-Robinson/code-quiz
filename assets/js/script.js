var columnCounter = 0;
var contentE1 = document.querySelector("#content");
var areaE1 = document.querySelector(".quiz-area");
var count = 0;
var score;


//Create question and answer in quiz area 
function createQA() {
    
    //Create ul element and append
    var ulE1 = document.createElement("ul");
    ulE1.className = "qa-list";
    ulE1.setAttribute("id", "qa");
    areaE1.appendChild(ulE1);

    //Create question li element and append
    var listItemE1 = document.createElement("li");
    listItemE1.className = "list-item";
    listItemE1.textContent = pullQ(columnCounter);
    listItemE1.setAttribute("column-Counter", columnCounter);
    listItemE1.setAttribute("qa", "q");
    ulE1.appendChild(listItemE1);

    //Create answers and shuffle
    let answers = pullA(columnCounter);
    new_obj = shuffleA(answers);

    //Create answer li elements and append
    for (x in new_obj) {
        var listItemE2 = document.createElement("li");
        listItemE2.className = "list-item";
        listItemE2.textContent = new_obj[x];
        listItemE2.setAttribute("column-Counter", columnCounter);
        listItemE2.setAttribute("qa", "a");
        ulE1.appendChild(listItemE2);
    }

}

//Upon clicking an element in the quiz area
quizarea.onclick = function(event) {
    var className = event.target.className;
    
    //Check target div
    if (className === "start-button" || className === "start-text") {
        //If target was start button, remove start button or scorelist, create timer, and start questions
        removeItems('start-button');
        removeItems("scorelist");
        timerBox();
        createQA();
    } else if (className === "list-item" ) {
        //If target was a qa list item, get text content, check against answer array with checkAnswer()
        var qa = event.target.getAttribute("qa");
        if (qa === 'q') return;
        var answerText = event.target.textContent;
        checkAnswer(answerText);
        return;
    }
}

//Check answer text from clicked response vs corresponding checkArray
function checkAnswer(text) {
    //If the text matches array value, move column counter. If there are more questions in the array generate next question. If not end game
    if (text === checkArray[columnCounter]) {
        columnCounter++;
        
        if (columnCounter < questionArray.length) {
            removeItems('qa');
            createQA();
        } else {
            endGame();
        };
    //Else penalize time
    } else {
        console.log("Subtract time");
        count = count - 5;
    }
}

//Taking an idName, get the idName, and remove element
function removeItems(idName) {
    var rem = document.getElementById(idName);
    if (rem){
    rem.remove();
    }
    return;
}

//Pull answers from answer arrays, used to pull all answers in a question column
function pullA(questionIndex) {
    let a1 = answerArray[questionIndex],
        a2 = answerArray2[questionIndex],
        a3 = answerArray3[questionIndex],
        a4 = answerArray4[questionIndex];
    return {
        a1,
        a2,
        a3,
        a4
    };
}

//Pull questions from question array, if its the first question (column counter 0) then shuffle the array. If not pull from current column and return question
function pullQ(localCounter) {
    if (columnCounter === 0) {
        shuffle(questionArray, answerArray, answerArray2, answerArray3, answerArray4, checkArray)
    }
    retQ = questionArray[localCounter];
    return retQ;
}

//Generate start button, set column counter to 0 for quiz restart
function startButton() {
    columnCounter = 0;
    var startButtonE1 = document.createElement("button");
    startButtonE1.className = "start-button";
    startButtonE1.setAttribute("id", "start-button");
    startButtonE1.innerHTML = "<p class='start-text' id='start-text' column-Counter=' '> Start </p>";
    areaE1.appendChild(startButtonE1);
}

//Genetate timer box then start countdown
function timerBox() {
    var timerB = document.createElement("section");
    timerB.className = "timer";
    timerB.setAttribute("id", "timer");
    contentE1.appendChild(timerB);
    countdown();
}


//Start countdown
function countdown() {
    //Set counter to 50 (45 with 5 second "Time Up" message)
    count = count + 50;
    var timer = contentE1.querySelector("#timer");
    
    timeInterval = setInterval(function () {
        if (count > 6) {
            timer.innerHTML = "<p class='count-text'>" + (count - 5) + "</p>" + '<br>' + '<p>seconds remaining</p>';
            count--;
        } else if (count === 6) {
            timer.innerHTML = (count - 5) + '<br></br>' + ' second remaining';
            count--;
        } else if (count < 6 && count > 0) {
            timer.innerHTML = "Time Up!";
            count--;
        } else if (count < 0) {
            //Count can get set to negative if -5 penalty is applied during "Time Up" message
            count = 0;
        } else if (count === 0) {
            clearInterval(timeInterval);
            endGame();
        } else {
            //If the game is completed and the timer is cleared, timer will never reach 0 and must be stopped
            clearInterval(timeInterval);
            return;
        }
    }, 1000);
}

//End the game by removing question area and timer, then running score and name entry boxes
function endGame() {
    removeItems("qa");
    removeItems("timer");
    scoreDisplay();
    nameEntry();
}

//Display score box, calculated by current column and current time
function scoreDisplay() {
    var scoreE1 = document.createElement("section");
    scoreE1.className = "final-score";
    scoreE1.setAttribute("id", "final-score");
    score = columnCounter + count;
    //Clear timer
    count = "";
    scoreE1.textContent = "Your Score: \r\n" + score;
    areaE1.appendChild(scoreE1);
}

//Display name entry box, create event listener for "Enter" key press
function nameEntry() {
    var nameE1 = document.createElement("section");
    nameE1.className = "name-entry";
    nameE1.setAttribute("id", "name-entry");
    nameE1.innerHTML = "<input class='entry-field' id='entryfield' type='text' autocomplete='off' placeholder='Enter your initials'></input>";
    areaE1.appendChild(nameE1);
    var input = document.getElementById("entryfield");

    input.addEventListener("keyup", function(event) {
        if (event.key === 'Enter') {
            //After enter key press, store the entered score, display localStorage score list, generate start button
            storeScore();
            checkScores();
            startButton();
        }
    });
}

//Create score name based on already stored score items, store into local storage
 function storeScore() {
    i = 0;
    storageTest = localStorage.getItem("score" + i);
    while (storageTest) {
        i++;
        storageTest = localStorage.getItem("score" + i);
    }
    var nameE2 = document.getElementById('entryfield').value;
    localStorage.setItem("score" + i, nameE2 + " " + score);
 }

 //Create score ul, create title li, check scores stored in localStorage, generate li item for each score 
function checkScores() {
    removeItems("final-score");
    removeItems("name-entry");
    
    let ulE2 = document.createElement("ul");
    ulE2.className = "score-list";
    ulE2.setAttribute("id", "scorelist");
    areaE1.appendChild(ulE2);

    let liE1 = document.createElement("li");
    liE1.className = "score-list-title";
    liE1.setAttribute("id", "score-list-title");
    liE1.textContent = "Scores";
    ulE2.appendChild(liE1);
    i = 0;
    storageTest = localStorage.getItem("score" + i);
    while (storageTest) {
        let key = localStorage.getItem("score" + i);
        let scoreE2 = document.createElement("li");
        scoreE2.className = "score-item";
        scoreE2.textContent = key;
        ulE2.appendChild(scoreE2);
        
        i++;
        storageTest = localStorage.getItem("score" + i);
    } return;
}

//Call function to generate start button
startButton();