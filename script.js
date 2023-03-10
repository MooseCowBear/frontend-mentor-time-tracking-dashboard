const dataUrl = "https://raw.githubusercontent.com/MooseCowBear/frontend-mentor-time-tracking-dashboard/main/data.json";
let jsondata = "";

async function getJson(url) {
  let response = await fetch(url);
  let data = await response.json()
  return data;
}

async function main() {
  jsondata = await getJson(apiUrl);
  console.log(jsondata);
}

main();

const data = JSON.parse(jsondata);

// for each element in the data arr, going to create a section and append it to main
const parent = document.getElementById("main");