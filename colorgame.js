var numOfColors = 24

var colors = generateRandomColors(numOfColors);

var header = document.getElementById("myHeader");
var colorCodes = document.querySelector("#colorCodes");
var squares = document.querySelectorAll(".square");
var pickedColor = pickColor();
var messageDisplay = document.querySelector("#messageDisplay");
var h1 = document.querySelector("h1");

//Buttons
var resetButton = document.querySelector("#newGame");
var easyButton = document.querySelector("#easy");
var hardButton = document.querySelector("#hard");



colorCodes.textContent = pickedColor;

// Get the offset position of the navbar
var sticky = header.offsetTop;



for(var i = 0; i < squares.length; i++){

    //add initial colors to squares
    squares[i].style.backgroundColor = colors[i]

    //add event listeners to squares
    squares[i].addEventListener("click", function(){
        var clickedColor = this.style.backgroundColor;
        //console.log(clickedColor, pickedColor)
        if(clickedColor === pickedColor){
            messageDisplay.textContent = "Correct";
            changeColors(clickedColor);
            h1.style.backgroundColor = clickedColor
            resetButton.textContent = "New Game"
        } else {
            this.style.backgroundColor = "#232323"
            messageDisplay.textContent = "Try Again"
        }
    });
}


//----------------Event listeners for buttons--------------//


//reset button lisetener
resetButton.addEventListener("click", function(){

    //generate new colors for squares
    colors = generateRandomColors(numOfColors);
    for(var i = 0; i < squares.length; i++){

        //add new colors to squares
        squares[i].style.backgroundColor = colors[i];
    
    }

    //remove display message
    messageDisplay.textContent = "";
    resetButton.textContent = "Reset Colors";

    //have a new grb code to guess
    pickedColor = pickColor();
    colorCodes.textContent = pickedColor;

    //remove background color from h1
    h1.style.backgroundColor = "#597465";

});

//easy button listener
easyButton.addEventListener("click", function(){
    //add and remove selected class
    selectThenDeselect(easyButton, hardButton);

    //generate 6 new colors for easy mode
    setDifficultyTo(6)

    for(var i = 0; i < squares.length; i++){
        if(colors[i]){
            squares[i].style.backgroundColor = colors[i];   
        } else {
            squares[i].style.display = "none";
        }    

    }
    
});

//hard button listener
hardButton.addEventListener("click", function(){
    selectThenDeselect(hardButton, easyButton);

    //generate 24 new colors for hard mode
   setDifficultyTo(24)

    for(var i = 0; i < squares.length; i++){
            squares[i].style.display = "block";
            squares[i].style.backgroundColor = colors[i];   
        }
});


// When the user scrolls the page, execute myFunction 
window.onscroll = function() {myFunction()};


//-------Functions--------//

//change all squares to the winning color
function changeColors(color){
    for(var i = 0; i < squares.length; i++){
        squares[i].style.backgroundColor = color;
    }
}

//generate a random number from 0-5 
function pickColor(){
   var random = Math.floor(Math.random() * colors.length);
   return colors[random];
}

//create the string of "rgb(0,0,0)"" colors and add them to an array. Return array
function generateRandomColors(num){
    var arr = [];
    for(var i = 0; i < num; i++) {
        //create var for random rgb color
        var ranRGB1 = createRandomRgbNum();
        var ranRGB2 = createRandomRgbNum();
        var ranRGB3 = createRandomRgbNum();

        //capture ranRGB
        var rgbCode = "rgb(" + ranRGB1 + ", " + ranRGB2 + ", " + ranRGB3 + ")"
        //add ranRGB to array
        arr.push(rgbCode);    
    }
    
    return arr;
}

//create random number from 1 to 255
function createRandomRgbNum(){
    var ranRGB = Math.floor(Math.random() * 256);
    return ranRGB;
}

//highlight selected and de-highlight previous selection
function selectThenDeselect(select, deselect){
    select.classList.add("selected");
    deselect.classList.remove("selected");
}

// create 6 or 3 colors for hard or easy mode
function setDifficultyTo(num){
    numOfColors = num
    colors = generateRandomColors(numOfColors);
    pickedColor = pickColor();
    colorCodes.textContent = pickedColor;
}

// Add the sticky class to the header when you reach its scroll position. Remove "sticky" when you leave the scroll position
function myFunction() {
    if (window.pageYOffset > sticky) {
      header.classList.add("sticky");
    } else {
      header.classList.remove("sticky");
    }
  }