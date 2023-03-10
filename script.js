
let selection = "weekly"; //default

const dataUrl = "https://raw.githubusercontent.com/MooseCowBear/frontend-mentor-time-tracking-dashboard/main/data.json";
let data = fetch(dataUrl)
.then((response) => response.json())
.catch(error => console.error)

data.then(result => displayData(result));

async function getJson(url) {
  let response = await fetch(url);
  let data = await response.json()
  return data;
}

async function main() {
  jsondata = await getJson(dataUrl);
  console.log(jsondata);
}

main();

const prevParagraph = {weekly: "Last Week - ", daily: "Yesterday - ", monthly: "Last month - "};
// for each element in the data arr, going to create a section and append it to main
function displayData(result) {
  console.log("this is the data", result)
  const parent = document.getElementById("main");

  for (const elem of result) {
    console.log("elem", elem);
    const section = document.createElement("section");
    section.classList.add("category");

    const titleDiv = document.createElement("div");
    titleDiv.classList.add("section-heading");

    const title = document.createElement("h2");
    title.innerText = elem["title"]; 

    const ellipsis = document.createElement("img");
    ellipsis.setAttribute("src", "./images/icon-ellipsis.svg");
    ellipsis.setAttribute("alt", "ellipsis");

    titleDiv.appendChild(title);
    titleDiv.appendChild(ellipsis);

    section.appendChild(titleDiv);

    const sectionInfo = document.createElement("div");
    sectionInfo.classList.add("section-info");

    //need the two paragraphs + span
    const pCurr = document.createElement("p");
    pCurr.classList.add("curr");
    console.log(elem);
    console.log(elem.timeframes);
    console.log(elem.timeframes[selection].current);
    pCurr.innerText = elem.timeframes[selection].current;

    const pPrev = document.createElement("p");
    pPrev.classList.add("prev");
    pPrev.innerText = prevParagraph[selection]; 

    const span = document.createElement("span");
    span.innerText = elem.timeframes[selection].previous;

    pPrev.appendChild(span);

    sectionInfo.appendChild(pCurr);
    sectionInfo.appendChild(pPrev);

    section.appendChild(sectionInfo);
    parent.appendChild(section);
  }
}