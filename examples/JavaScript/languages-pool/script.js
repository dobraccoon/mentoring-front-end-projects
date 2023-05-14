"use strict";

const saveAnswerButton = document.querySelector("button");

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
    const inputRadio = document.createElement("input");
    const radioLabel = document.createElement("label");
    const languageName = document.createElement("span");
    const languageScore = document.createElement("span");

    li.className = "form_radio";
    inputRadio.type = "radio";
    inputRadio.id = i;
    inputRadio.name = "radio";
    radioLabel.htmlFor = inputRadio.id;
    languageName.className = "language-name";
    languageScore.className = "language-score";

    languageName.appendChild(document.createTextNode(`${element.language}: `));
    languageScore.appendChild(document.createTextNode(element.rating));
    radioLabel.appendChild(languageName);
    radioLabel.appendChild(languageScore);
    li.appendChild(inputRadio);
    li.appendChild(radioLabel);
    ul.appendChild(li);
  });

  languagesBlock.appendChild(ul);
}

function saveAnswer() {
  const selectedItem = document.querySelector('input[name="radio"]:checked');

  if (selectedItem) {
    const storageElementIndex = Number(selectedItem.id);
    const selectedLanguageCurrentScore = document
      .querySelector("label[for='" + storageElementIndex + "']")
      .querySelector(".language-score");

    languagePoll.languagesListArr[storageElementIndex].rating += 1;

    const selectedLanguageNewScore =
      languagePoll.languagesListArr[storageElementIndex].rating;

    selectedLanguageCurrentScore.textContent = selectedLanguageNewScore;
  } else {
    throw new Error("Element hasn't been selected");
  }
}

displayLanguages();
saveAnswerButton.addEventListener("click", saveAnswer);
