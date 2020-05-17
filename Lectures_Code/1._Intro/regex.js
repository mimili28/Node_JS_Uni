//test shows if the pattern appears in the string
const myRegEx = /Hello/i; //i - flag, case insensitive
const result = myRegEx.test("Hello world");
console.log(result);

//Pipe = or |

const petString = "I have an alpaca";
const petRegEx = /alpaca|cow|sheep/;
console.log(petRegEx.test(petString));

//Match

const extractString = "Extract this word from the string";
const wordRegex = /word/;
console.log(extractString.match(wordRegex));

// The G flag - return globally, without it it would return one repeat at index o
console.log("Repeat, Repeat, Repeat".match(/Repeat/g));

//wildcards

const humStr = "That's humbug";
const hugStr = "I need a hug";
const huRegex = /hu./;  //match anything after hu
console.log(humStr.match(huRegex));
console.log(hugStr.match(huRegex));

//wildcard II - One of the following letters
console.log("I found big bugs in my bag".match(/b[aiu]g/ig));
//match all vowels
console.log("I found big bugs in my bag".match(/[aeiou]/ig));

//Range
console.log("123abc456".match(/[0-9]/g));
// /[a-z]/ig - matches all letters; 
