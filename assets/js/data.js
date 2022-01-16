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