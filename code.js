// https://www.w3schools.com/js/js_cookies.asp

let numClicks = 0;

function loadClicks(){
    let num = document.cookie
    if (num != ""){
        numClicks = num;
        updateClicksText();
    }
}


function updateClicks(){
    numClicks++;
    updateClicksText();
    saveClicks();
}

function updateClicksText(){
    document.getElementById("clickCounter").textContent = ` Times clicked: ${numClicks}`;
}

function saveClicks(){
    document.cookie = numClicks;
}

function loadClicks(){
    numClicks = document.cookie;
}

// LOAD ITEM BUTTONS
var buttonsDiv = document.getElementById("buttonsDiv");
fetch('./items.json')


console.log("Hello! code.js loaded!");