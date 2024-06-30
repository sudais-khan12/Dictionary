const url = "https://api.dictionaryapi.dev/api/v2/entries/en/";

let button = document.querySelector(".btn1");
let soundBtn = document.querySelector(".btn2");
let reWord = document.querySelector(".word h3");
let joke = document.querySelector("p");
let emoji = document.querySelector("span");
let partOfSpeech = document.querySelector(".detail p1");
let phonetics = document.querySelector(".detail p2");
let meaning = document.querySelector(".meaning");
let example = document.querySelector(".example");
let show = document.querySelector(".result");
let error = document.querySelector("#error");
let loader = document.querySelector(".loader");
let sound = document.querySelector("#sound");
let body = document.querySelector("body");
let changer = document.querySelector(".slider");
let shadow = document.querySelector(".container");
let save = document.querySelector(".slide");
let mode = "light";
let audio = "";
// const today = new Date();
// const currentHour = today.getHours();
// const currentHour24 = currentHour + 12;

async function getJoke(val) {
  let response = await fetch(url + val);

  if (response.status == 404) {
    error.innerText = val + " Not Found -_-";
    loader.style.display = "none";
    error.style.display = "block";
    show.style.display = "none";
  } else {
    document.querySelector(".loader").setAttribute("style", "none");
    let data = await response.json();
    reWord.innerText = data[0].word;
    show.style.display = "block";
    partOfSpeech.innerText = data[0].meanings[0].partOfSpeech;
    phonetics.innerText = data[0].phonetic || "";
    meaning.innerText = data[0].meanings[0].definitions[0].definition || "";
    example.innerText = data[0].meanings[1].definitions[0].example || " ";
    console.log(data);
    error.style.display = "none";
    audio = data[0].phonetics[1].audio;
    sound.setAttribute("src", audio);
  }
}

let darkMode = () => {
  let color = "#303136";
  if (mode == "light") {
    mode = "dark";
    body.style.backgroundColor = "#303136";
    shadow.classList.add("change");
  } else {
    mode = "light";
    body.style.backgroundColor = "#3590F3";
    shadow.classList.remove("change");
  }
};

soundBtn.addEventListener("click", () => {
  sound.play();
});

button.addEventListener("click", () => {
  let val = document.querySelector("#search").value;
  getJoke(val);
  loader.style.display = "block";
  partOfSpeech.innerText = "";
  phonetics.innerText = "";
  meaning.innerText = "";
  example.innerText = " ";
  audio = "";
});

changer.addEventListener("click", () => {
  darkMode();
});

// if (currentHour24 > 18) {
//   mode = "dark";
//   body.style.background = "#303136";
//   shadow.classList.add("change");
// }
