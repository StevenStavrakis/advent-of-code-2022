import { day2 } from './day-2/index';
import { findMostCalories } from "./day-1";
import {day3} from "./day-3"

// day one

const addResult = async (func: () => any, day: number) => {
    const result = await func();
    const resultElement = document.createElement("p");
    resultElement.innerHTML = `Day ${day} result: ${result}`;
    document.body.appendChild(resultElement);
}

addResult(findMostCalories, 1);
addResult(day2, 2)
addResult(day3, 3)
const title = document.createElement("h1");
title.innerText = "Hello World";
document.body.appendChild(title);


export {};