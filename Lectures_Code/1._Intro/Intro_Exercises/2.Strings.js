// Exercise 3 - Add numbers from string to float

var numberOne = "1.10";
var numberTwo = "2.30";
var newNumber = Number(numberOne) + Number(numberTwo);​
console.log(newNumber);

// Exercise 4

var numberOne = "1.10";
var numberTwo = "2.30";
var result = (parseFloat(numberOne) + parseFloat(numberTwo)).toFixed(2);​
console.log(parseFloat(result));


// Exercise 5 - Decimals and average

var one = 10;
var two = 45;
var three = 98;

var sum=one + two +three;
console.log((sum/3).toFixed(5));

// Exercise 6 - Get the character by index

var letters = "abc"
console.log(letters.charAt(2));
console.log(letters[2]);
console.log(letters.substring(2));

// Exercise 7 - Replace

var fact = "You are learning javascript!";

// capitalize the J in Javascript
var newFact=fact.replace("j","J");
console.log(newFact);
