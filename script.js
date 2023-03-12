
let selection = "weekly"; //default
const prevParagraph = {weekly: "Last Week - ", daily: "Yesterday - ", monthly: "Last month - "};

async function getData() {
  const dataUrl = "https://raw.githubusercontent.com/MooseCowBear/frontend-mentor-time-tracking-dashboard/main/data.json";
  try {
    const result = await fetch(dataUrl);
    return await result.json();
  }
  catch (error) {
    console.log(error);
  }
}

async function updateDOM() {
  const categories = await getData().catch(error => displayError(error));
  //make dom elements where data will live
  createDisplayElements(categories);
  //put the data in the right elements
  updateDisplayInfo(categories);
  //add button listeners
  addButtonListeners(categories);
}

updateDOM();

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
  title.textContent = elem.title; 
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

//need event listener for buttons, change selection, update text
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
    theSpan.textContent = `${elem.timeframes[selection].previous}hrs`; 

    const pPrev = document.querySelector(`.${selector} .prev`);
    pPrev.textContent = prevParagraph[selection]; 
    pPrev.appendChild(theSpan);

    const pCurr = document.querySelector(`.${selector} .curr`);
    pCurr.textContent = `${elem.timeframes[selection].current}hrs`;
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

function displayError(error) {
  const errorDiv = document.createElement("div");
  errorDiv.classList.add("error"); 
  errorDiv.textContent = "Oh no! Something went wrong.";

  const parent = document.getElementById("main");
  parent.appendChild(errorDiv);
}