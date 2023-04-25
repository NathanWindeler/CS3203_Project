// https://www.w3schools.com/js/js_cookies.asp

let score = 0;
var gameWon = false;


function loadScore(){
    let num = document.cookie
    if (num != ""){
        score = num;
        updateScoreText();
    }
}

function updateScore(){
    score = score + 2;
    updateScoreText();
    saveScore();
}

function updateScoreText(){
    document.getElementById("clickCounter").textContent = ` Score: ${score}`;
}

function saveScore(){
    setCookie("score", score, 30);
}

function loadScore(){
    score = getCookie("score", score);
    console.log(`Cookie: ${document.cookie}`);
}

function resetScore(){
    if(confirm("Are you sure you want to reset your score to 0?")){
        score = 0;
        saveScore();
        updateScoreText();
    }
}

// https://www.w3schools.com/js/js_cookies.asp
function checkCookie() {
    let username = getCookie("username");
    if (username != "") {
     alert("Welcome again " + username);
    } else {
      username = prompt("Please enter your name:", "");
      if (username != "" && username != null) {
        setCookie("username", username, 365);
      }
    }
  }

function getCookie(cname) {
    let name = cname + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(';');
    for(let i = 0; i <ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) == ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "";
  }

function setCookie(cname, cvalue, exdays) {
    const d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    let expires = "expires="+ d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
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
        newImage.src = "images/" + itemsArray[i] + ".png";
        newImage.width = "48";
        newImage.height = "48";
        newImage.id = itemsArray[i];

        newImage.addEventListener("click", guess);

        newButton.appendChild(newImage);
        buttonsDiv.appendChild(newButton);
    }

}

var recipesArray = null;
var revealedArray = null;
async function loadRecipes(){
    // fetch('https://api.chucknorris.io/jokes/random?category=dev')
    // fetch('./recipes.json')
    // .then(res => res.json()) // the .json() method parses the JSON response into a JS object literal
    // .then(data => console.log(data));

    const response = await fetch('./recipes.json');
    const recipesJson = await response.json();

    console.log(recipesJson);
    recipesArray = recipesJson;
    
    for(i = 0; i < recipesArray.recipes.length; i++){
        console.log(recipesArray.recipes[i]);
    }

    reset();
}

function chooseRecipe(){
    chosenRecipe = recipesArray.recipes[Math.floor(Math.random() * 4)]
}

function recipeContains(item){
    for(i = 0; i < chosenRecipe.recipeArr.length; i++){
        if(chosenRecipe.recipeArr[i] == item){
            return true;
        }
    }
    return false;
}

var output = document.getElementById("output");

function guess(element){
    console.log(element);
    console.log(element.target.id)
    
    item = element.target.id;

    if(gameWon){return};
    if(recipeContains(item)){
        // Correct Guess
        console.log("Correct guess!")
        output.textContent = item + " is in the recipe!"
        revealItem(item);
        checkWin();
    } else {
        // Incorrect guess
        output.textContent = item + " is not in the recipe..."
        score = score - 1;
        updateScoreText();
    }
}

function revealItem(item){
    for(i = 0; i < chosenRecipe.recipeArr.length; i++){
        if(chosenRecipe.recipeArr[i] == item){
            document.getElementById("crafting" + i).src = `images/${item}.png`;
            revealedArray[i] = chosenRecipe.recipeArr[i];
        }
    }
}

function arraysEqual(ray1, ray2){
    for(i = 0; i < ray1.length && i < ray2.length; i++){
        if(ray1[i] != ray2[i]){
            return false;
        }
    }
    return (ray1.length == ray2.length);
}

function checkWin(){
    if(arraysEqual(revealedArray, chosenRecipe.recipeArr) && !gameWon){
        output.textContent = (`The recipe is: ${chosenRecipe.recipeID}! You win!`)
        gameWon = true;
        updateScore();
    }
}

function reset(){
    // Blank crafting arrays
    revealedArray = ["blank", "blank", "blank", "blank", "blank", "blank", "blank", "blank", "blank"]
    gameWon = false;
    for(i = 0; i < 9; i++){
        document.getElementById("crafting" + i).src = `images/blank.png`;
    }
    // Choose recipe
    chooseRecipe();
    console.log("Game reset! Recipe chosen: " + chosenRecipe.recipeID)
}

window.onload = function(){
    createButtons();
    loadRecipes();
    loadScore();
    updateScoreText();
    checkCookie();
}

console.log("Hello! code.js loaded!");