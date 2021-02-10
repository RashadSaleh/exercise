//maybe not a good idea to obscure this if working with others, but I need my time
function id(id) {
    return document.getElementById(id);
}

function printGuess(guessText) {
    id("guess").textContent=guessText;
}

function getUserPassword() {
    return id('password').value;
}

var charset = ("ABCD").split("");
// var charset = ("0123456789").split("");
var majorTries = 0;
var length = 0;

// async function guessNextChar(initialGuess) {
//     for (i=0; i<charset.length; i++) {
//         nextChar = charset[i];
//         printGuess(initialGuess+nextChar);
//         await delay(1);
//         console.log(initialGuess+nextChar);
//         if (initialGuess+nextChar === password) {
//             return true;
//         }
//     }
// }


async function delay(ms) {
    return new Promise((resolve, reject) => {
        setTimeout(resolve, ms);
    })
}

String.prototype.replaceAt = function(index, replacement) {
    return this.substr(0, index) + replacement + this.substr(index + replacement.length);
}


var lengthier = 0;


function getNextChar(char) {
    return charset[charset.indexOf(char)+1]
}

function edit(x) {
    let lastChar = x[x.length-2];
    let nextChar = getNextChar(lastChar);
    console.log("!~~~", nextChar, x);
    if (!nextChar) { //if nextChar is out of bounds
        console.log("~~~", nextChar, x);
        return edit(x.slice(0, -1))
    } else {
        x = x.slice(0, -2);
        x += nextChar;
        return x;
    }
}

async function guess(x) {
    await delay(500);
    for (i=0; i<charset.length; i++) {
        printGuess(x+charset[i]);
        console.log(x+charset[i], password);
        if (x+charset[i] === password) {
            console.log("found!");
            return true;
        }
    }

    x += charset[0];

    console.log(x.length, password.length);
    if (x.length >= password.length) {
        x = edit(x);
    }

    guess(x);
}
 
// async function guess(initialGuess) {

//     let x = initialGuess;

//     let found = await guessNextChar(x);
//     if (found) return;
//     else await guessNextChar()

//     if (majorTries === charset.length) {
//         majorTries = 0;
//         x = x.replaceAt(length, charset[lengthier]);
//         length++;
//     }


//     if (x.length+1 === password.length && majorTries==0) {
//         lengthier++;
//         guess(charset[lengthier])
//         return;
//     }

//     x = x.replaceAt(length, charset[majorTries++])

//     // x+=charset[majorTries];
//     // majorTries++;
//     // //this replaces last char in the string
//     guess(x);
// }

var password;

document.getElementById("try-me").onclick = function() {
    password = getUserPassword();
    majorTries = 0;
    lengthier = 0;
    length = 0;
    guess("")
}