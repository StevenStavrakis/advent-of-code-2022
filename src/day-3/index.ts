import { filePathToText } from "../utils/utils";
import text from "./data.txt"
const data = await filePathToText(text)

export const day3 = () => {
    const letters = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const priorityMap = new Map();
    for (let index = 0; index < letters.length; index++) {
        const letter = letters[index];
        if (letter === "a") {
            console.log("a: ", index + 1)
        }
        priorityMap.set(letter, index + 1);
    }
    const packsArr = data.split(/\n/)
    const priorityTotal = packsArr.reduce((acc, curr) => {
        const midIndex = (curr.length / 2) - 1;
        const bucket = new Set()
        let misplacedLetter;
        for (let index = 0; index < curr.length; index++) {
            const letter = curr[index];
            if (index <= midIndex) {
                bucket.add(letter)
            } else {
                if (bucket.has(letter)) {
                    misplacedLetter = letter;
                    break;
                }
            }
        }
        const priority = priorityMap.get(misplacedLetter);
        acc += priority
        return acc
    }, 0)
    const packGroups = []
    while (packsArr.length > 0) {
        packGroups.push(packsArr.splice(0, 3))
    }
    let badgeVal = 0;
    for (let index = 0; index < packGroups.length; index++) {
        // for each group of packs
        const group = packGroups[index];
        const charMap = new Map();
        // group of pack sets
        const sets = group.map(pack => {
            return new Set(pack)
        })
        for (let index = 0; index < [...sets].length; index++) {
            // for each set
            const currSet = [...sets][index];
            currSet.forEach(char => {
                charMap.set(char, (charMap.get(char) ?? 0) + 1);
                if (charMap.get(char) >= 3) {
                    badgeVal += priorityMap.get(char)
                }
            })

        }
    }
    console.log(badgeVal)
    return priorityTotal
}