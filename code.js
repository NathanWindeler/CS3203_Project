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
function createButtons(){
    // const response = await fetch("items.json");
    // const jsonData = await response.json();
    // console.log(jsonData)

    // var items = JSON.parse()

    // TODO: GET JSON WORKING
    var buttonsDiv = document.getElementById("buttonsDiv");
    itemsArray = ["redstone", "iron_ingot", "stick", "cobblestone", "wood", "blank"];
    for (i=0; i<itemsArray.length; i++){
        newButton = document.createElement("button");
        newImage = document.createElement("img");
        newImage.src = "images/" + itemsArray[i];
        newImage.width = "64";
        newImage.height = "64";

        newButton.appendChild(newImage);
        buttonsDiv.appendChild(newButton);
    }

}

window.onload = function(){
    createButtons();
}

console.log("Hello! code.js loaded!");