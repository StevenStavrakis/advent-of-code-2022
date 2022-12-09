import { filePathToText } from "../utils/utils";
import data from "./data.txt"
const pairs = await filePathToText(data)
export const day4 = () => {
    const pairsArray = pairs.split(/\n/) // ["x-y, x-y", "x-y, x-y"]
    const newPairsArray = pairsArray.reduce((acc: any[], curr) => {
        const pairArr = curr.split(",").map(el => el.split("-"))
        acc.push(pairArr)
        return acc
    }, [])
    let includedCount = 0
    for (const pair of newPairsArray) {
        const elf1 = {
            start: Number(pair[0][0]),
            end: Number(pair[0][1])
        }
        const elf2 = {
            start: Number(pair[1][0]),
            end: Number(pair[1][1])
        }

        // 8-13, 10-65
        const oneIncludesTwo = ((elf1.start <= elf2.start) && (elf1.end >= elf2.end))
        const twoIncludesOne = ((elf2.start <= elf1.start) && (elf2.end >= elf1.end))
        const isBetween = (num: number, range: number[]) => {
            if (num >= range[0] && num <= range[1]) {
                return true
            }
            return false
        }

        if (twoIncludesOne) {
            console.log("two inc one")
        }

        if (oneIncludesTwo) {
            console.log("one inc two")
        }
        if (oneIncludesTwo || twoIncludesOne) {
            includedCount++
            console.log(elf1, elf2)
            continue
        }

        if (isBetween(elf1.start, [elf2.start, elf2.end])) {
            includedCount++
            continue;
        }

        if (isBetween(elf1.end, [elf2.start, elf2.end])) {
            includedCount++
            continue;
        }

        if (isBetween(elf2.start, [elf1.start, elf1.end])) {
            includedCount++
            continue;
        }
        if (isBetween(elf2.end, [elf1.start, elf1.end])) {
            includedCount++
            continue
        }
    }
    console.log(includedCount)
    return includedCount
}