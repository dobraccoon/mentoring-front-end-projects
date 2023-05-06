"use strict";

const languagePoll = {
  question: "What is your favourite programming language?",
  languagesListArr: [
    {
      language: "🇬🇧English",
      rating: 0,
    },
    {
      language: "🇨🇳Chinese",
      rating: 0,
    },
    {
      language: "🇮🇳Indian",
      rating: 0,
    },
    {
      language: "🇫🇷French",
      rating: 0,
    },
    {
      language: "👽My",
      rating: 0,
    },
  ],
  answers: new Array(4).fill(0),
};

function displayLanguages() {
  const languagesBlock = document.querySelector(".languages-list");
  const ul = document.createElement("ul");

  languagePoll.languagesListArr.forEach((element, i) => {
    const li = document.createElement("li");
    li.className = "form_radio";
    const inputRadio = document.createElement("input");
    inputRadio.type = "radio";
    inputRadio.id = `radio-${i}`;
    inputRadio.name = "radio";
    const radioLabel = document.createElement("label");
    radioLabel.htmlFor = inputRadio.id;
    radioLabel.appendChild(
      document.createTextNode(`${element.language}: ${element.rating}`)
    );

    li.appendChild(inputRadio);
    li.appendChild(radioLabel);
    ul.appendChild(li);
  });

  languagesBlock.appendChild(ul);
}

displayLanguages();
