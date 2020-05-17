// event loop - not a seperate thread, main thread, takes care of all events 

// open a file, read/write, make a request online, interact with a db 
//- best to do it in a async way

//async
//get("/roles")
//select
//get("smthelse") - wont hold and stop the main thread

function scheduler(cb){
    //...
    //...
    cb()
}

// Promises are syntactical sugar for callback
// the solution for callback hell
// call resolve when everything went well
// either pending or fulfilled (resolved or rejected)
new Promise((resolve, reject) => {
    try{
        setTimeout(() => {
            resolve("Everythin went well");
        }, 4000);
    } catch {
        reject("Somethin went wrong");
    }
}).then(message => console.log(message)) //thenable
.catch(errorMessage => console.log(errorMessage));

//Async/await are syntatical sugar for promises
function myPromise() {
    return new Promise((resolve, reject) =>{
        setTimeout(()=> {
            resolve("The promise is done");
        }, 5000);
    });
}

async function callMyPromise(){
    // myPromise().then(message =>{
    //     console.log(message);
    // });

    const message = await myPromise();
    console.log(message)
}

callMyPromise();

const arrowFunction = async() => {
    const message = await myPromise();
    console.log(message)
}

