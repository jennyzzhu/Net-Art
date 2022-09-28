/* generating html elements */

/* round 1: generate element based on object */
// data
const testCat = {
  name: "fluffles",
  color: "lightgray",
  face: "< w <",
  message: "i'm not a real cat",
  isSitting: true,
  numberOfPaws: 4,
  weight: 80 //chonky
};

// generation function
function generateCatElement(catData) {

  // step one: generate the HTML

  // make the general container first
  const catContainer = document.createElement("div");
  catContainer.classList.add("cat-container");

  //create & fill speech bubble
  const catSpeechBubble = document.createElement("div");
  catSpeechBubble.classList.add("cat-speech-bubble");
  catSpeechBubble.innerText = catData.message;
  catContainer.appendChild(catSpeechBubble); //add to DOM

  //now for the hard part: create the cat
  const cat = document.createElement("div");
  cat.classList.add("cat");
  catContainer.appendChild(cat); //add to DOM

  //make its head: demonstrate unsafe method
  const earColor = `conic-gradient( 
    at 50% 50%,
    transparent 135deg,
    ${catData.color} 0,
    ${catData.color} 225deg,
    transparent 0
  )`;
  const catHead = `
    <div class="cat-head-wrapper">
      <div class="cat-head" style="background-color: ${catData.color}">
        <div class="cat-face">${catData.face}</div>
      </div>
      <div class="cat-ear-l" style="background-image: ${earColor}"></div>
      <div class="cat-ear-r" style="background-image: ${earColor}"></div>
    </div>
  `;
  cat.innerHTML += catHead; //add to DOM
  //it's a bit of a bother to add more complex css
  //into generated HTML when written like this


  //make its body & add it in
  const catBody = document.createElement("div");
  catBody.classList.add("cat-body");
  catBody.style.backgroundColor = catData.color;
  cat.appendChild(catBody); // add to DOM

  //make its tail
  const catTail = document.createElement("div");
  catTail.classList.add("cat-tail");
  catTail.style.backgroundColor = catData.color;
  cat.appendChild(catTail); // add to DOM

  //for the paws, a loop
  for (let i = 0; i < catData.numberOfPaws; i++) {
    const paw = document.createElement("paw");
    paw.classList.add("paw", `paw-${i + 1}`);
    paw.style.backgroundColor = catData.color;
    //determine standing/sitting position
    if (catData.isSitting) {
      paw.style.transform = `rotateZ(-90deg)`;
    } else {
      paw.style.transform = `rotateZ(0deg)`;
    }
    cat.appendChild(paw); //add to DOM (one by one)
  }

  //finally, put the assembled cat-container into the actual HTML page
  // document.querySelector(".kitty-maker").appendChild(catContainer);

  //or actually, let's just return it
  return catContainer;
}

// run the function
generateCatElement(testCat);

/* round 2: generate multiple elements out of an array of cats */
const catList = [
  {
    name: "fluffles",
    color: "gray",
    face: "Φ ω Φ",
    message: "i'm not a real cat",
    isSitting: true,
    numberOfPaws: 4,
    weight: 80 //chonky
  },
  {
    name: "fluffles",
    color: "lightgray",
    face: "< w <",
    message: "i'm not a real cat",
    isSitting: true,
    numberOfPaws: 4,
    weight: 80 //chonky
  },
  {
    name: "fluffles",
    color: "lightgray",
    face: "< w <",
    message: "i'm not a real cat",
    isSitting: true,
    numberOfPaws: 4,
    weight: 80 //chonky
  },
  {
    name: "fluffles",
    color: "lightgray",
    face: "< w <",
    message: "i'm not a real cat",
    isSitting: true,
    numberOfPaws: 4,
    weight: 80 //chonky
  }
];

/* RUNTIME */
// multi-generation function
function generateCats(cats) {
  // loop through cats list
  cats.forEach(catData => {
    // generate a cat element
    const catHTML = generateCatElement(catData);
    const catBuffer = 200;
    // continue styling: randomly position cat
    let randomX = rng(0, window.innerWidth - catBuffer);
    let randomY = rng(0, window.innerHeight - catBuffer);
    console.log(randomY);
    catHTML.style.left = `${randomX}px`;
    catHTML.style.top = `${randomY}px`;
    //add new cat into the .kitty-maker container
    document.querySelector(".kitty-maker").appendChild(catHTML);
  });
}

generateCats(catList);

/*** HELPER FUNCTIONS ***/
function rng(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}
