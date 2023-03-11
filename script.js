
let selection = "weekly"; //default

const dataUrl = "https://raw.githubusercontent.com/MooseCowBear/frontend-mentor-time-tracking-dashboard/main/data.json";
let data = fetch(dataUrl)
.then((response) => response.json())
.catch(error => console.error)

data.then(result => displayData(result));

const prevParagraph = {weekly: "Last Week - ", daily: "Yesterday - ", monthly: "Last month - "};
/* for each element in the data arr, going to create a section + a bunch of children to go in it,
 and append it to main*/
function displayData(result) {
  const parent = document.getElementById("main");

  for (const elem of result) {
    const section = document.createElement("section");
    section.classList.add("category");
    const name = elem.title.toLowerCase().replace(/\s+/g, '-'); //take out the space in "self care", replace with hyphen
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

    const paragraphDiv = document.createElement("div");
    paragraphDiv.classList.add("paragraph-wrapper");

    const pCurr = document.createElement("p");
    pCurr.classList.add("curr");
    pCurr.innerText = `${elem.timeframes[selection].current}hrs`;

    const pPrev = document.createElement("p");
    pPrev.classList.add("prev");
    pPrev.innerText = prevParagraph[selection]; 

    const span = document.createElement("span");
    span.innerText = `${elem.timeframes[selection].previous}hrs`;

    pPrev.appendChild(span);

    paragraphDiv.appendChild(pCurr);
    paragraphDiv.appendChild(pPrev);

    sectionInfo.appendChild(titleDiv);
    sectionInfo.appendChild(paragraphDiv);

    section.appendChild(sectionInfo);
    parent.appendChild(section);
  }
}

//need event listener for buttons, change selection, update innertext

//want error display