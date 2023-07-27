let cyrillicToEnglishTranslitMap = {
  А: "A",
  Б: "B",
  В: "V",
  Г: "G",
  Д: "D",
  Е: "E",
  Ё: "E",
  Ж: "ZH",
  З: "Z",
  И: "I",
  Й: "I",
  К: "K",
  Л: "L",
  М: "M",
  Н: "N",
  О: "O",
  П: "P",
  Р: "R",
  С: "S",
  Т: "T",
  У: "U",
  Ф: "F",
  Х: "KH",
  Ц: "TS",
  Ч: "CH",
  Ш: "SH",
  Щ: "SHCH",
  Ъ: "IE",
  Ы: "Y",
  Ь: "",
  Э: "E",
  Ю: "IU",
  Я: "IA",
  а: "a",
  б: "b",
  в: "v",
  г: "g",
  д: "d",
  е: "e",
  ё: "e",
  ж: "zh",
  з: "z",
  и: "i",
  й: "i",
  к: "k",
  л: "l",
  м: "m",
  н: "n",
  о: "o",
  п: "p",
  р: "r",
  с: "s",
  т: "t",
  у: "u",
  ф: "f",
  х: "kh",
  ц: "ts",
  ч: "ch",
  ш: "sh",
  щ: "shch",
  ъ: "ie",
  ы: "y",
  ь: "",
  э: "e",
  ю: "iu",
  я: "ia",
};

let transliterationStorageArr = [];
let firstTranslitirationWord = "Привет 👋";
let originalWordBlock = document.querySelector(".original-text-block");
let translitWordBlock = document.querySelector(".translit-text-block");
let addNewWordButton = document.querySelector(".add-text-button");
let clearListButton = document.querySelector(".clear-list-button");
let wordInput = document.querySelector(".text-input");

function getTransliteratedEnglishSymbolBySymbol(symbol) {
  if (!(symbol in cyrillicToEnglishTranslitMap)) {
    return symbol.replace(
      /([\uE000-\uF8FF]|\uD83C[\uDF00-\uDFFF]|\uD83D[\uDC00-\uDDFF])/g,
      ""
    );
  }
  return cyrillicToEnglishTranslitMap[symbol];
}

function translitirateTextIntoEnglish(originalText) {
  let transliteratedEnglishText = "";

  for (let textSymbol of originalText) {
    transliteratedEnglishText +=
      getTransliteratedEnglishSymbolBySymbol(textSymbol);
  }

  return transliteratedEnglishText;
}

function putTransiteratedObjectIntoStorage(
  originalWordInput,
  transliteratedEnglishText
) {
  let newTransliteratedObject = {
    originalText: originalWordInput,
    translitiratedText: transliteratedEnglishText,
  };
  transliterationStorageArr.push(newTransliteratedObject);

  return transliterationStorageArr.length;
}

function deleteObjectFromStorageByIndex(index) {
  index = Number(index);
  if (typeof transliterationStorageArr[index - 1] === "undefined") {
    throw new Error('Object with index "' + index + '" not found!');
  }
  if (index - 1 == 0) {
    throw new Error(
      'First row with index "' +
        index +
        "\" can't be removed by technical task!\nTechnical task you can see here: https://github.com/dobraccoon/phase0-final-project#readme"
    );
  }
  transliterationStorageArr.splice(index - 1, 1);
}

function createBlockByTypeAndWithClassName(type, className) {
  let newBlock = document.createElement(type);
  newBlock.className = className;

  return newBlock;
}

function createTextBlockRow(index, text) {
  index = Number(index);
  let rowId = document.createTextNode(index);
  let title = text;
  let textRowBlock = createBlockByTypeAndWithClassName("div", "text-block-row");
  textRowBlock.setAttribute("id", index);

  let wordBlockRowId = createBlockByTypeAndWithClassName("div", "id");
  wordBlockRowId.appendChild(rowId);

  let wordBlockRowWord = createBlockByTypeAndWithClassName("div", "text");
  if (text.length > 9) {
    text = text.slice(0, 7) + "...";
    wordBlockRowWord.title = title;
  }
  let wordNode = document.createTextNode(text);
  wordBlockRowWord.appendChild(wordNode);
  let wordBlockRowDeleteButton = createBlockByTypeAndWithClassName(
    "button",
    "delete-row-button"
  );
  wordBlockRowDeleteButton.addEventListener("click", function () {
    deleteElementAndRenumberOtherElements(textRowBlock);
  });
  textRowBlock.appendChild(wordBlockRowId);
  textRowBlock.appendChild(wordBlockRowWord);
  textRowBlock.appendChild(wordBlockRowDeleteButton);

  return textRowBlock;
}

function addNewTranslitiration(originalText) {
  if (!originalText) {
    throw new Error("Word input value can't be empty");
  }
  let transliteratedEnglishText = translitirateTextIntoEnglish(originalText);
  let objectIndex = putTransiteratedObjectIntoStorage(
    originalText,
    transliteratedEnglishText
  );
  let originalWordBlockRow = createTextBlockRow(objectIndex, originalText);
  let transliteratedWordBlockRow = createTextBlockRow(
    objectIndex,
    transliteratedEnglishText
  );

  originalWordBlock.appendChild(originalWordBlockRow);
  translitWordBlock.appendChild(transliteratedWordBlockRow);
}

function getCurrentTextInputValue() {
  return document.querySelector(".text-input").value;
}

function initFunction() {
  addNewTranslitiration(firstTranslitirationWord);
}

function deleteElementAndRenumberOtherElements(element) {
  let index = Number(element.id);

  if (index === 1) {
    throw new Error(
      'First row with index "' +
        index +
        "\" can't be removed by technical task!\nTechnical task you can see here: https://github.com/dobraccoon/phase0-final-project#readme"
    );
  }

  let originaTextElementsList = document
    .querySelector(".original-text-block")
    .querySelectorAll(".text-block-row");

  for (let originaTextElement of originaTextElementsList) {
    if (Number(originaTextElement.id) == index) {
      originaTextElement.remove();
    }
  }

  for (let i = index; i < originaTextElementsList.length; i++) {
    if (Number(originaTextElementsList[i].id) > index) {
      originaTextElementsList[i].id = Number(originaTextElementsList[i].id) - 1;
      originaTextElementsList[i].querySelector(".id").textContent =
        originaTextElementsList[i].id;
    }
  }

  let translitTextElementsList = document
    .querySelector(".translit-text-block")
    .querySelectorAll(".text-block-row");

  for (let translitTextElement of translitTextElementsList) {
    if (Number(translitTextElement.id) == index) {
      translitTextElement.remove();
    }
  }

  for (let i = index; i < translitTextElementsList.length; i++) {
    if (Number(translitTextElementsList[i].id) > index) {
      translitTextElementsList[i].id = translitTextElementsList[i].id - 1;
      translitTextElementsList[i].querySelector(".id").textContent =
        translitTextElementsList[i].id;
    }
  }

  deleteObjectFromStorageByIndex(index);
}

function clearAll() {
  let textBlockRowsList = document.querySelectorAll(".text-block-row");

  for (let textBlockRow of textBlockRowsList) {
    if (Number(textBlockRow.id) != 1) {
      textBlockRow.remove();
    }
  }
  transliterationStorageArr.splice(1, transliterationStorageArr.length);
}

initFunction();

addNewWordButton.addEventListener("click", function () {
  addNewTranslitiration(getCurrentTextInputValue());
});

wordInput.addEventListener("keypress", function (e) {
  if (e.key === "Enter") {
    addNewTranslitiration(getCurrentTextInputValue());
  }
});

clearListButton.addEventListener("click", function () {
  clearAll();
});
