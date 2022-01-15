var columnCounter = 0;
var ulE1 = document.querySelector("#qa");
var contentE1 = document.querySelector("#content");
var timerE1 = document.getElementById('timer');
var count = 0;



//Create question
createQ = function() {
    
    var listItemE1 = document.createElement("li");
    listItemE1.className = "list-item";
    //Question text from pullQ() with column number input
    listItemE1.innerHTML = "<p class='question-text'>" + pullQ(columnCounter) + "</p>";
    listItemE1.setAttribute("column-Counter", columnCounter);
    listItemE1.setAttribute("id", "item");

    ulE1.appendChild(listItemE1);
}

createA = function() {
    let answers = pullA(columnCounter);
    new_obj = shuffleA(answers);
    console.log(answers);

    for (x in new_obj) {
        var listItemE2 = document.createElement("button");
        listItemE2.className = "answer-button";
        listItemE2.innerHTML = "<p class='answer-text' columnCounter=" + columnCounter + ">" + new_obj[x] + "</p>";
        listItemE2.setAttribute("column-Counter", columnCounter);
        listItemE2.setAttribute("id", "item");
        ulE1.appendChild(listItemE2);
    }
}

//When an item in the quiz ul is clicked
quizClick = function(event) {
    var targetE1 = event.target;
    
    //If target is an answer button or answer button text, checkanswer()
    if (targetE1.matches(".answer-button")|| targetE1.matches(".answer-text")) {
        var text = event.target.textContent;
        checkAnswer(text);
    
    //If target is the start button, begin w/ start timer and new question
    } else if (targetE1.matches(".start-button") || targetE1.matches(".start-text")) {
        console.log(timerE1);
        countdown();
        newQuestion();
    }
}

//Check answer; text from clicked response vs corresponding checkArray
checkAnswer = function(text) {
        console.log(columnCounter);
        //If the text matches array value, new question
        if (text === checkArray[columnCounter]) {
            columnCounter++;
            newQuestion();
        //Else penalize time
        } else {
            console.log("Subtract time");
            count = count - 5;
        }
    
    
}

//Start the quiz, called after start button is pressed
newQuestion = function() {
    removeAll();
    //debugger;
    createQ();
    createA();
}

//Remove all items within ul
removeAll = function() {
    
    //Get qa area by id
    let box = document.getElementById('qa');
    //Set slider equal to number of child elements (of ul)
    let numItems = box.childElementCount;
    
    //Remove number of element equal to number of ul child elements
    for (numItems; numItems > 0; numItems--) {
        var remE1 = document.querySelector('#item');
        remE1.remove();
    }

}

pullA = function(questionIndex) {
    let a1 = answerArray[questionIndex],
    a2 = answerArray2[questionIndex],
    a3 = answerArray3[questionIndex],
    a4 = answerArray4[questionIndex];
    return {a1, a2, a3, a4};
}

pullQ = function(localCounter) {
    if (columnCounter === 0) {
        shuffle(questionArray, answerArray, answerArray2, answerArray3, answerArray4, checkArray)
        }
    retQ = questionArray[localCounter];    
    return retQ;
}

startButton = function() {
    var startButtonE1 = document.createElement("button");
    startButtonE1.className = "start-button";
    startButtonE1.setAttribute("id", "item");
    startButtonE1.innerHTML = "<p class='start-text' column-Counter=' '> Start </p>";
    ulE1.appendChild(startButtonE1);
}

function countdown() {
    count = count + 45;
    var timer = timerE1;
    console.log(count);
    setInterval(function() {
        if (count > 1) {
            timer.textContent = count + ' seconds remaining';
            count--;
          } else if (count === 1) {
            timer.textContent = count + ' second remaining';
            count--;
          } else {
            endGame();
          }  
    }, 1000);
}


function shuffle(array, array1, array2, array3, array4, arrayC) {
    let currentIndex = array.length, b;

    while (currentIndex != 0) {
        b = Math.floor(Math.random() * currentIndex);
        currentIndex--;

        [array[currentIndex], array[b]] = [array[b],array[currentIndex]];
        [array1[currentIndex], array1[b]] = [array1[b],array1[currentIndex]];
        [array2[currentIndex], array2[b]] = [array2[b],array2[currentIndex]];
        [array3[currentIndex], array3[b]] = [array3[b],array3[currentIndex]];
        [array4[currentIndex], array4[b]] = [array4[b],array4[currentIndex]];
        [arrayC[currentIndex], arrayC[b]] = [arrayC[b],arrayC[currentIndex]];
    }
    console.log(array, array1, array2, array3, array4, arrayC);
    return array, array1, array2, array3, arrayC;
}

Array.prototype.shuffle = function(){
    for (var i = 0; i < this.length; i++){
        var a = this[i];
        var b = Math.floor(Math.random() * this.length);
        this[i] = this[b];
        this[b] = a;
    }
}

function getKeys(obj){
    var arr = new Array();
    for (var key in obj)
        arr.push(key);
    return arr;
}
function shuffleA(obj) {
    var new_obj = {};
    var keys = getKeys(obj);
    keys.shuffle();
    for (var key in keys){
        if (key == "shuffle") continue; // skip our prototype method
        new_obj[keys[key]] = obj[keys[key]];
    }
    console.log(new_obj);
    return new_obj;
}

ulE1.addEventListener("click", quizClick);
startButton();
