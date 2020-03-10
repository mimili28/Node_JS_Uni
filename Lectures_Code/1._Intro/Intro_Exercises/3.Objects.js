// Exercise 1 - Retrieve value from object by key

var myObj = {"message": "Hello, earthling! I bring peace."};
console.log(myObj.message); //dot notation
console.log(myObj["message"]); //bracket notation

// Exercise 2 - Defining an object. 

var me ={"name":"Maria", "age":20};
console.log(me);

// Exercise 3 - Add a property 

var stackOverflow = {};
stackOverflow.isAllowed=true;

/// Exercise 4 - Remove a property 

var thisSong = {"description": "The best song in the world."}

// remove the property "description" and add a property called "about" that should say "Just a tribute." 

delete thisSong.description;

thisSong["about"] = "Just a tribute";




 