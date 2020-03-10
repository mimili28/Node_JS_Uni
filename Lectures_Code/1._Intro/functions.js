//hoisting - we use the method before its declaration
addition(1,2);

//test=1;
//you can change let value during code
//let test;

//you dont change a const value
const example = "this is how you write a const";

function addition(a,b) {
    return a + b;
}
var sum=addition(2,5);
console.log(sum);

//2
function pokeMe(){
    console.log("Meow");
}

function approachSomeone(someoneToPoke){
     console.log("tip tap tip tap");
    // //console.log(someoneToPoke); - undefined
     someoneToPoke();
}
approachSomeone(pokeMe);

//3

//function introduce(name){
  //  console.log("Hello my name is",name);
//}

//arrow function
const introduce = (name) =>{
    console.log("Hello my name is",name);
}
//introduce("Maria");

const prepareIntroduction=(introducerFunction,name) =>{
    console.log("Hello");
    introducerFunction(name);
}
prepareIntroduction(introduce,"Maria");

//4
const aboutMe = (me) =>{
    console.log("My hobby is",me.hobby);
}
const me={
    hobby: "photography"
};
aboutMe(me);

//5
const callLater={
    toCall: ()=>{
        console.log("ring ring");
    }
};

callLater.toCall();
console.log(callLater);
