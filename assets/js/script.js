var columnCounter = 0;
var contentE1 = document.querySelector("#content");
var areaE1 = document.querySelector(".quiz-area");
var count = 0;


//Create question
function createQA() {
    var ulE1 = document.createElement("ul");
    ulE1.className = "qa-list";
    ulE1.setAttribute("id", "qa");
    areaE1.appendChild(ulE1);


    var listItemE1 = document.createElement("li");
    listItemE1.className = "list-item";
    listItemE1.textContent = pullQ(columnCounter);
    listItemE1.setAttribute("column-Counter", columnCounter);
    listItemE1.setAttribute("qa", "q");
    ulE1.appendChild(listItemE1);

    let answers = pullA(columnCounter);
    new_obj = shuffleA(answers);

    for (x in new_obj) {
        var listItemE2 = document.createElement("li");
        listItemE2.className = "list-item";
        listItemE2.textContent = new_obj[x];
        listItemE2.setAttribute("column-Counter", columnCounter);
        listItemE2.setAttribute("qa", "a");
        ulE1.appendChild(listItemE2);
    }

}

quizarea.onclick = function(event) {
    var className = event.target.className;
    
    if (className === "start-button" || className === "start-text") {
        removeItems('start-button');
        timerBox();
        createQA();
    } else if (className === "list-item" ) {
        var qa = event.target.getAttribute("qa");
        if (qa === 'q') return;
        var answerText = event.target.textContent;
        checkAnswer(answerText);
        return;
    }
}

//Check answer; text from clicked response vs corresponding checkArray
function checkAnswer(text) {
    //If the text matches array value, new question
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

function removeItems(idName) {
    var rem = document.getElementById(idName);
    rem.remove();
    return;
}

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

function pullQ(localCounter) {
    if (columnCounter === 0) {
        shuffle(questionArray, answerArray, answerArray2, answerArray3, answerArray4, checkArray)
    }
    retQ = questionArray[localCounter];
    return retQ;
}

function startButton() {
    columnCounter = 0;
    var startButtonE1 = document.createElement("button");
    startButtonE1.className = "start-button";
    startButtonE1.setAttribute("id", "start-button");
    startButtonE1.innerHTML = "<p class='start-text' id='start-text' column-Counter=' '> Start </p>";
    areaE1.appendChild(startButtonE1);
}

function timerBox() {
    var timerB = document.createElement("section");
    timerB.className = "timer";
    timerB.setAttribute("id", "timer");
    contentE1.appendChild(timerB);
    countdown();
}

function countdown() {
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
            count = 5;
        } else if (count === 0) {
            clearInterval(timeInterval);
            endGame();
        } else return;
    }, 1000);
}

function endGame() {
    //debugger;
    count = "";
    removeItems("qa");
    removeItems("timer");
    scoreDisplay();
    nameEntry();
}

function scoreDisplay() {
    var scoreE1 = document.createElement("section");
    scoreE1.className = "final-score";
    scoreE1.setAttribute("id", "final-score");
    scoreE1.textContent = "Your Score: \r\n" + columnCounter;
    areaE1.appendChild(scoreE1);
}

function nameEntry() {
    var nameE1 = document.createElement("section");
    nameE1.className = "name-entry";
    nameE1.setAttribute("id", "name-entry");
    nameE1.innerHTML = "<input class='entry-field' id='entryfield' type='text' autocomplete='off' placeholder='Enter your initials'></input>";
    areaE1.appendChild(nameE1);
    var input = document.getElementById("entryfield");

    input.addEventListener("keyup", function(event) {
        if (event.key === 'Enter') {
            storeScore();
            removeItems("name-entry");
            removeItems("final-score");
            startButton();
        }
    });
}

 function storeScore() {
    i = 0;
    storageTest = localStorage.getItem("score" + i);
    while (storageTest) {
        i++;
        storageTest = localStorage.getItem("score" + i);
    }
    var nameE2 = document.getElementById('entryfield').value;
    localStorage.setItem("score" + i, nameE2 + " " + columnCounter);
 }

startButton();