"use strict";

let snakeCaseInput = document.getElementsByClassName("snake-case-text-area");
let camelCaseInput = document.getElementsByClassName("camel-case-text-area");
let lastExample = "snake_case";

function convert() {
  const snakeCaseListValue = snakeCaseInput[0].value;
  const cameCaseListValue = camelCaseInput[0].value;

  if (!snakeCaseListValue && !cameCaseListValue)
    throw new Error("All fields are empty");

  if (snakeCaseListValue && cameCaseListValue)
    throw new Error("All fields are full");

  if (snakeCaseListValue) {
    camelCaseInput[0].value =
      convertDataFromSnake2CamelCase(snakeCaseListValue);
  } else {
    snakeCaseInput[0].value = convertDataFromCamel2SnakeCase(cameCaseListValue);
  }
}

function convertDataFromSnake2CamelCase(valuesList) {
  let result = "";
  valuesList
    .toLowerCase()
    .split("\n")
    .forEach((snake_word) => {
      snake_word = snake_word.trim();
      let camelCaseWord = "";

      snake_word.split("_").forEach((word, i) => {
        if (i != 0) {
          word = upperCaseFirstSymbol(word);
        }
        camelCaseWord += word;
      });
      result += camelCaseWord + "\n";
    });
  return result;
}
function convertDataFromCamel2SnakeCase(valuesList) {
  let result = "";

  valuesList.split("\n").forEach((camelCaseWord) => {
    camelCaseWord = camelCaseWord.trim();

    camelCaseWord.split("").forEach((camelCaseWordChar, i) => {
      if (camelCaseWordChar == camelCaseWordChar.toUpperCase() && i != 0) {
        camelCaseWordChar = "_" + camelCaseWordChar.toLowerCase();
      }
      result += camelCaseWordChar;
    });
    result += "\n";
  });

  return result;
}

function upperCaseFirstSymbol(word) {
  return word[0].toUpperCase() + word.slice(1, word.length);
}

function genetrateExample() {
  cleanInputs();

  if (lastExample === "snake_case") {
    document.getElementsByClassName("camel-case-text-area")[0].value =
      "multiTastCase\n   testCase   \n   newName ";
    lastExample = "camelCase";
  } else {
    document.getElementsByClassName("snake-case-text-area")[0].value =
      "multi_test_case\n   test_case   \nnew_name";
    lastExample = "snake_case";
  }
}

function cleanInputs() {
  snakeCaseInput[0].value = "";
  camelCaseInput[0].value = "";
}
genetrateExample();
