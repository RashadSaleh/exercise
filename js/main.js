//maybe not a good idea to obscure this if working with others, but I need my time
function id(id) {
    return document.getElementById(id);
}

function printGuess(guessText) {
    id("guess").textContent=guessText;
}

function getUserPassword() {
    return id('password').value
}

var charset = ("!\"#$%&'()*+,-./0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\]^_`abcdefghijklmnopqrstuvwxyz{|}~").split("");
var password = getUserPassword();

var majorTries = 0;
var length = 0;

async function guessNextChar(initialGuess) {
    for (i=0; i<charset.length; i++) {
        nextChar = charset[i];
        printGuess(initialGuess+nextChar);
        await delay(20);
        if (initialGuess+nextChar === password) {
            return initialGuess+nextChar;
        }
    }
}


async function delay(ms) {
    return new Promise((resolve, reject) => {
        setTimeout(resolve, ms);
    })
}
 
async function guess(initialGuess) {

    let x = initialGuess;

    for (i=0; i<charset.length; i++) {
        let found = await guessNextChar(x+charset[i]);
        if (found) {
            printGuess(found);
            return;
        }
    }

    if (majorTries === charset.length) {
        majorTries = 0;
        x += charset[length];
        length++;
    }
    majorTries++;
    x.replace(/.$/,charset[majorTries]);
    guess(x);
}

document.getElementById("try-me").onclick = function() {
    guess("")
}