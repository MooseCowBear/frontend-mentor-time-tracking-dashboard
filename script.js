
let selection = "weekly"; //default
const prevParagraph = {weekly: "Last Week - ", daily: "Yesterday - ", monthly: "Last month - "};


 /*let data = fetch("https://raw.githubusercontent.com/MooseCowBear/frontend-mentor-time-tracking-dashboard/main/data.json")
 .then((response) => response.json())
 .catch(error => displayError(error));

 data.then(result => displayData(result));
 data.then(result => addButtonListeners(result)); //can i do this?  */

async function getData() {
  const dataUrl = "https://raw.githubusercontent.com/MooseCowBear/frontend-mentor-time-tracking-dashboard/main/data.json";
  try {
    const result = await fetch(dataUrl);
    return await result.json();
  }
  catch (error) {
    displayError(error);
  }
}

async function updateDOM() {
  const categories = await getData();
  //createDisplayElements(categories);
  createDisplayElements(categories);
  //call to updateDisplayInfo to put the data in the right elements
  updateDisplayInfo(categories);
  //call add button listeners
  addButtonListeners(categories);
}

//call update dom 
updateDOM();


/* for each element in the data arr, going to create a section + a bunch of children to go in it,
 and append it to main*/
function displayData(result) { //rewrite me!
  const parent = document.getElementById("main");

  for (const elem of result) {
    const section = document.createElement("section");
    section.classList.add("category");
    const name = getName(elem);
    section.classList.add(name); 

    const imgUrl = `./images/icon-${name}.svg`;
    const image = document.createElement("img");
    image.setAttribute("src", imgUrl);
    image.setAttribute("alt", `${name} icon`);

    section.appendChild(image);

    const titleDiv = document.createElement("div");
    titleDiv.classList.add("section-heading");

    const title = document.createElement("h2");
    title.innerText = elem.title; 

    const ellipsis = document.createElement("img");
    ellipsis.setAttribute("src", "./images/icon-ellipsis.svg");
    ellipsis.setAttribute("alt", "ellipsis");

    titleDiv.appendChild(title);
    titleDiv.appendChild(ellipsis);

    const sectionInfo = document.createElement("div");
    sectionInfo.classList.add("section-info");
    sectionInfo.setAttribute("tabindex", 0);

    const paragraphDiv = document.createElement("div");
    paragraphDiv.classList.add("paragraph-wrapper");

    const pCurr = document.createElement("p");
    pCurr.classList.add("curr");

    pCurr.innerText = `${elem.timeframes[selection].current}hrs`; //

    const pPrev = document.createElement("p");
    pPrev.classList.add("prev");

    pPrev.innerText = prevParagraph[selection]; //

    const theSpan = document.createElement("span");

    theSpan.innerText = `${elem.timeframes[selection].previous}hrs`; //

    pPrev.appendChild(span); //now not working, whereas before it had

    paragraphDiv.appendChild(pCurr);
    paragraphDiv.appendChild(pPrev);

    sectionInfo.appendChild(titleDiv);
    sectionInfo.appendChild(paragraphDiv);

    section.appendChild(sectionInfo);
    parent.appendChild(section);
  }
}

function createDisplayElements(data) {
  const parent = document.getElementById("main");
  for (const elem of data) {
    createSection(elem, parent);
  }
}

function createSection(elem, parent) {
  const categorySection = document.createElement("section");
  categorySection.classList.add("category");
  const name = getName(elem);
  categorySection.classList.add(name); 
  //add image to section
  addImage(categorySection, name);
  addInnerDiv(categorySection, elem);
  parent.appendChild(categorySection);
}

function addImage(parent, name) {
  const imgUrl = `./images/icon-${name}.svg`;
  const image = document.createElement("img");
  image.setAttribute("src", imgUrl);
  image.setAttribute("alt", `${name} icon`);
  parent.appendChild(image);
}

function addInnerDiv(parent, elem) {
  const sectionInfo = document.createElement("div");
  sectionInfo.classList.add("section-info");
  sectionInfo.setAttribute("tabindex", 0);

  addTitleDiv(sectionInfo, elem);
  addParagraphDiv(sectionInfo);
  parent.appendChild(sectionInfo);
}

function addTitleDiv(parent, elem) {
  const titleDiv = document.createElement("div");
  titleDiv.classList.add("section-heading");
  //add title 
  const title = document.createElement("h2");
  title.innerText = elem.title; 
  //and ellipsis
  const ellipsis = document.createElement("img");
  ellipsis.setAttribute("src", "./images/icon-ellipsis.svg");
  ellipsis.setAttribute("alt", "ellipsis");

  titleDiv.appendChild(title);
  titleDiv.appendChild(ellipsis);
  parent.appendChild(titleDiv);
}

function addParagraphDiv(parent){
  const paragraphDiv = document.createElement("div");
  paragraphDiv.classList.add("paragraph-wrapper");

  const pCurr = document.createElement("p");
  pCurr.classList.add("curr");

  const pPrev = document.createElement("p");
  pPrev.classList.add("prev");

  const theSpan = document.createElement("span"); 

  pPrev.appendChild(theSpan);
  paragraphDiv.appendChild(pCurr);
  paragraphDiv.appendChild(pPrev);
  parent.appendChild(paragraphDiv);
}

//need event listener for buttons, change selection, update innertext
function addButtonListeners(result) {
  const buttonWrapper = document.querySelector(".timeframe");
  buttonWrapper.addEventListener("click", (event) => {
    if (event.target.tagName === "BUTTON") {
      selection = event.target.id; 
      updateDisplayInfo(result, event.target); 
    }
  });
}

function updateDisplayInfo(result, target=null) { 
  for (const elem of result) {
    const selector = getName(elem); //name of category

    const theSpan = document.querySelector(`.${selector} span`); 
    theSpan.innerText = `${elem.timeframes[selection].previous}hrs`; 

    const pPrev = document.querySelector(`.${selector} .prev`);
    pPrev.innerText = prevParagraph[selection]; 
    pPrev.appendChild(theSpan);

    const pCurr = document.querySelector(`.${selector} .curr`);
    pCurr.innerText = `${elem.timeframes[selection].current}hrs`;
  }
  if (target) {
    updateSelectedClass(target); 
  }
}

function getName(elem) {
  return elem.title.toLowerCase().replace(/\s+/g, '-'); //take out the space in "self care", replace with hyphen
}

function updateSelectedClass(target) {
  const buttons = document.querySelectorAll("button");
  for (let i = 0; i < buttons.length; i++) {
    buttons[i].classList.remove("selected");
  }
  target.classList.add("selected");
}

//want error display
function displayError(error) {
  console.log(error);
  const errorDiv = document.createElement("div");
  errorDiv.classList.add("error"); //need to style this
  errorDiv.innerText = "Oh no! Something went wrong.";

  const parent = document.getElementById("main");
  parent.appendChild("error");
}