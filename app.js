const gameContainer = document.getElementById("game");
let card1 = null;
let card2 = null;
let cardsFlipped = 0;
let moves = 0;
let clicked = false;
let moveCounter = document.querySelector('#moves');


const COLORS = [
  "red",
  "blue",
  "green",
  "orange",
  "purple",
  "red",
  "blue",
  "green",
  "orange",
  "purple"
];

// here is a helper function to shuffle an array
// it returns the same array with values shuffled
// it is based on an algorithm called Fisher Yates if you want ot research more
function shuffle(array) {
  let counter = array.length;

  // While there are elements in the array
  while (counter > 0) {
    // Pick a random index
    let index = Math.floor(Math.random() * counter);

    // Decrease counter by 1
    counter--;

    // And swap the last element with it
    let temp = array[counter];
    array[counter] = array[index];
    array[index] = temp;
  }

  return array;
}

let shuffledColors = shuffle(COLORS);

// this function loops over the array of colors
// it creates a new div and gives it a class with the value of the color
// it also adds an event listener for a click for each card
function createDivsForColors(colorArray) {
  for (let color of colorArray) {
    // create a new div
    const newDiv = document.createElement("div");

    // give it a class attribute for the value we are looping over
    newDiv.classList.add(color);

    // call a function handleCardClick when a div is clicked on
    newDiv.addEventListener("click", handleCardClick);

    // append the div to the element with an id of game
    gameContainer.append(newDiv);
  }
}

// TODO: Implement this function!
function handleCardClick(event) {
    if(clicked) return;
    if(event.target.classList.contains('flipped')) return;
  // you can use event.target to see which element was clicked
  let currCard = event.target;
  currCard.style.backgroundColor = currCard.classList[0];
  console.log("you just clicked", event.target);

  if(card1 || card2 === null){
    currCard.classList.add("flipped");
    card1 = card1 || currCard;
    card2 = currCard === card1 ? null : currCard;
  }

  if(card1 && card2){
    clicked = true;
    let card1Class = card1.className;
    let card2Class = card2.className;

    if(card1Class === card2Class){
        cardsFlipped += 2;
        console.log("It's a match");
        card1.removeEventListener("click", handleCardClick);
        card2.removeEventListener("click", handleCardClick);
        card1=null;
        card2=null;
        clicked = false;
        moves +=1;
        moveCounter.innerText = moves;
    } else {
        console.log("No match here");
        setTimeout(function(){
            card1.style.backgroundColor = '';
            card2.style.backgroundColor = '';
            card1.classList.remove('flipped');
            card2.classList.remove('flipped');
            card1 = null;
            card2=null;
            clicked = false;
            moves +=1;
            moveCounter.innerText = moves;
        },1000
        )
    }
    if(cardsFlipped === COLORS.length){
        alert('You win. Great work!');
    }
  }


}

// when the DOM loads
createDivsForColors(shuffledColors);
