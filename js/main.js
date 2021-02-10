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

function guess() {
    printGuess(getUserPassword());
}

document.getElementById("try-me").onclick = guess;