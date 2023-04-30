"use strict";

function convert() {
  const snakeCaseListValue = document.getElementsByClassName(
    "camel-case-text-area"
  )[0].value;
  const cameCaseListValue = document.getElementsByClassName(
    "snake-case-text-area"
  )[0].value;

  if (!snakeCaseListValue && !cameCaseListValue)
    throw new Error("All fields are empty");

  if (snakeCaseListValue && cameCaseListValue)
    throw new Error("All fields are full");

  if (snakeCaseListValue) convertDataFromSnake2CamelCase(snakeCaseListValue);
  else convertDataFromCamel2SnakeCase(cameCaseListValue);
}

function convertDataFromSnake2CamelCase(valuesList) {
  let result = "test";
  const splitedWordsArr = valuesList
    .toLowerCase()
    .split("\n")
    .forEach((element, i) => {
      element = element.trim();
      if (i != 0) {
        element = upperCaseFirstSymbol(element);
      }
      result += element + "\n";
    });
  console.log(result);
  return result;
}
function convertDataFromCamel2SnakeCase(valuesList) {}

function upperCaseFirstSymbol(word) {
  return word[0].toUpperCase() + word.slice(1, word.length);
}

function init() {
  //   document.getElementsByClassName("camel-case-text-area")[0].value = "testCase";
  document.getElementsByClassName("snake-case-text-area")[0].value =
    "test_case";
}
init();
convert();
