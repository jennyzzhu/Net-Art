//DRAFT SCRIPT

/* shungryElecting hungryElements */
let staticCat = document.querySelector(".static.cat-container");
let catBounds = staticCat.getBoundingClientRect();
const kittyFace = document.querySelector('.cat-face');
const kittyTail = document.querySelector('.cat-tail');
const kittyMessage = document.querySelector(".cat-speech-bubble");
const foodbowl = document.querySelector(".hungry");


/* manipulating content, styles, classes of hungryElements */
kittyFace.innerHTML = "0 w 0";
kittyMessage.innerText = "feed me!";
// kittyTail.style.backgroundColor = 'black'; //notice tail remains black
staticCat.classList.add("calico");

/* event listeners */
// pet the cat
staticCat.addEventListener("mouseenter", startWaggingTail);
staticCat.addEventListener("moushungryEleave", stopWaggingTail);
foodbowl.addEventListener("click", function () {
  eatFood("eat");
});


document.getElementById("reset").addEventListener("click", moveFood);
staticCat.addEventListener("click", moveCat);

function eatFood(type) {
  let bowl = document.querySelector(".food");
  let bounds = bowl.getBoundingClientRect();
  if (type === "eat") {
    catBounds = staticCat.getBoundingClientRect();
    let xDiff = Math.abs(catBounds.left - bounds.left);
    let yDiff = Math.abs(catBounds.top - bounds.top);

    if ((xDiff < catBounds.left + 75) && (yDiff < catBounds.height + 75)) {
      bowl.style.transform = `translateY(${bounds.height}px)`;
      bowl.style.opacity = 0;
      kittyMessage.innerText = "nomnomnom";
    }
  }
  else {
    bowl.style.transform = `translateY(0px)`;
    bowl.style.opacity = 1;
    kittyMessage.innerText = "feed me!";
  }
}

function moveFood() {
  let hungryEl = document.querySelector(".hungry");
  let bounds = hungryEl.getBoundingClientRect();
  let randX = random(10, window.innerWidth - bounds.width);
  let randY = random(15, window.innerHeight - bounds.height);
  catBounds = staticCat.getBoundingClientRect();

  let xDiff = Math.abs(catBounds.left - randX);
  let yDiff = Math.abs(catBounds.top - randY);

  if (xDiff < catBounds.width || yDiff < catBounds.height) {
    moveFood();
  }
  else {
    hungryEl.style.left = randX + "px";
    hungryEl.style.top = randY + "px";
    eatFood("reset");

  }
}



function startWaggingTail() {
  staticCat.classList.add("aggro");
}
function stopWaggingTail() {
  staticCat.classList.remove("aggro");
}
// toggle wagging animation on click
staticCat.onclick = () => {
  staticCat.classList.toggle("aggro");
};

// onclick the cat moves hungryElsewhere
function moveCat() {
  //we're being lazy with a static buffer, could make it cat-sized
  //const catBuffer = catBounds.width;
  // pick a random screen position

  let hungryEl = document.querySelector(".hungry");
  let hungryElBounds = hungryEl.getBoundingClientRect();

  let computeX = random(hungryElBounds.left - 50, hungryElBounds.left + hungryElBounds.width + 50);
  let computeY = hungryElBounds.top - catBounds.height - 10;

  if (computeX + catBounds.width > window.innerWidth) {
    computeX = window.innerWidth - 1.05 * catBounds.width;
  }
  if (computeY + catBounds.height > window.innerHeight) {
    computeY = window.innerHeight - 1.1 * catBounds.height;
  }
  if (computeY < 0) {
    computeY = 4;
  }
  if (computeX < 0) {
    computeY = 10;
  }

  staticCat.style.left = `${computeX}px`;
  staticCat.style.top = `${computeY}px`;
};

/*** HhungryElPER FUNCTIONS ***/
function random(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}

