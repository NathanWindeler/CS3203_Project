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

function guess(element){
    console.log(element);
    console.log(element.target.id)
    
    item = element.target.id;

    if(recipeContains(item)){
        // Correct Guess
        console.log("Correct guess!")
        revealItem(item);
        checkWin();
    } else {
        // Incorrect guess
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
    if(arraysEqual(revealedArray, chosenRecipe.recipeArr)){
        console.log(`The recipe is: ${chosenRecipe.recipeID}! You win!`)
    }
}

function reset(){
    // Blank crafting arrays
    revealedArray = ["blank", "blank", "blank", "blank", "blank", "blank", "blank", "blank", "blank"]
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
}

console.log("Hello! code.js loaded!");