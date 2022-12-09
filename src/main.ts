import { day7 } from './day-7/index';
import { day2 } from './day-2/index';
import { findMostCalories } from "./day-1";
import { day3 } from "./day-3"
import { day4 } from './day-4';
import { day5 } from './day-5'
import { day6 } from './day-6';
import { day8 } from './day-8'
import { day9 } from './day-9';
// day one

const addResult = async (func: () => any, day: number) => {
    const result = await func();
    const resultElement = document.createElement("p");
    resultElement.innerHTML = `Day ${day} result: ${result}`;
    document.body.appendChild(resultElement);
}
/*
addResult(findMostCalories, 1);
addResult(day2, 2)
addResult(day3, 3)
addResult(day4, 4)
addResult(day5, 5)
addResult(day6, 6)*/
// addResult(day7, 7)
//addResult(day8, 8)
addResult(day9, 9)
const title = document.createElement("h1");
title.innerText = "Hello World";
document.body.appendChild(title);


export { };