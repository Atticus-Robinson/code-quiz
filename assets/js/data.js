var questionArray = [ "Question 1",      "Question 2",      "Question 3",        "Question 4"]
var answerArray =   [ "1",               "correct",         "3",                 "4"]
var answerArray2 =  [ "correct",         "b",               "c",                 "d"]
var answerArray3 =  [ "q",               "w",               "correct",           "r"]
var answerArray4 =  [ "!",               "@",               "#",                 "correct"]
var checkArray =    [ "correct",         "correct",               "correct",                 "correct"]

Array.prototype.shuffle = function(){
    for (var i = 0; i < this.length; i++){
        var a = this[i];
        var b = Math.floor(Math.random() * this.length);
        this[i] = this[b];
        this[b] = a;
    }
}

function shuffle(array, array1, array2, array3, array4, arrayC) {
    let currentIndex = array.length,
        b;

    while (currentIndex != 0) {
        b = Math.floor(Math.random() * currentIndex);
        currentIndex--;

        [array[currentIndex], array[b]] = [array[b], array[currentIndex]];
        [array1[currentIndex], array1[b]] = [array1[b], array1[currentIndex]];
        [array2[currentIndex], array2[b]] = [array2[b], array2[currentIndex]];
        [array3[currentIndex], array3[b]] = [array3[b], array3[currentIndex]];
        [array4[currentIndex], array4[b]] = [array4[b], array4[currentIndex]];
        [arrayC[currentIndex], arrayC[b]] = [arrayC[b], arrayC[currentIndex]];
    }
    return array, array1, array2, array3, arrayC;
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
    return new_obj;
}