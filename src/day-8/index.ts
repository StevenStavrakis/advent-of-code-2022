import { vi } from "vitest";
import { filePathToText } from "../utils/utils";
import text from './data.txt'
const data = await filePathToText(text)

export const day8 = () => {
    const split = data.split(/\n/);
    const colCount = split[0].length;
    const allTrees = split.join("")
    const checkVisibility = (index: number) => {
        let leftVisibility = true;
        let rightVisibility = true;
        let topVisibility = true;
        let bottomVisibility = true;
        const rowIndex = Math.floor(index / colCount) + 1;
        const colIndex = (index % colCount) + 1;

        for (let i = 0; i < rowIndex; i++) {
            const nextEl = index - (i * colCount);
            if (allTrees[nextEl] >= allTrees[index]) {
                topVisibility = false;
                break;
            }
        }
        const rightStart = index + 1;
        const rightEnd = ((rowIndex + 1) * colCount) - 1;
        for (let i = rightStart; i <= rightEnd; i++) {
            if (allTrees[i] >= allTrees[index]) {
                rightVisibility = false;
                break;
            }
        }
        for (let i = 1; i <= (split.length - (rowIndex + 1)); i++) {
            const nextEl = index + (i * colCount);
            if (allTrees[nextEl] >= allTrees[index]) {
                bottomVisibility = false;
                break;
            }
        }
        for (let i = index - colIndex; i < index; i++) {
            if (allTrees[i] >= allTrees[index]) {
                leftVisibility = false;
                break;
            }
        }
        // console.table({index: index, left: leftVisibility, right: rightVisibility, bottom: bottomVisibility, top: topVisibility})
        const ansArray = [leftVisibility, rightVisibility, bottomVisibility, topVisibility]
        const ans = ansArray.some((el => el !== false))
        return ans;
    }
    let visibleCount = 0;
    for (let index = 0; index < allTrees.length; index++) {
        const tree = allTrees[index];
        if (checkVisibility(index)) {
            visibleCount++
        }
    }

    let maxDist = 0;
    const seeIfVisible = (index: number) => {
        const visibility = {
            right: true,
            bottom: true,
            left: true,
            top: true
        }
        const currentRow = Math.floor((index) / colCount) + 1
        const currentCol = (index % colCount) + 1;
        const rightCount = colCount - currentCol;
        const bottomCount = split.length - currentRow;
        const leftCount = currentCol - 1;
        const topCount = currentRow - 1;
        let [rightDist, bottomDist, leftDist, topDist] = [0, 0, 0, 0];

        for (let i = 0; i < rightCount; i++) {
            const otherIndex = i + 1;
            rightDist++;
            const other = allTrees[otherIndex + index];
            if (other >= allTrees[index]) {
                visibility.right = false;
                break;
            }
        }

        for (let i = 0; i < bottomCount; i++) {
            const otherIndex = i + 1;
            bottomDist++;
            const other = allTrees[index + (otherIndex * colCount)]
            if (other >= allTrees[index]) {
                visibility.bottom = false;
                break;
            }
        }
        for (let i = 0; i < leftCount; i++) {
            const otherIndex = i + 1
            leftDist++;
            const other = allTrees[index - otherIndex]
            if (other >= allTrees[index]) {
                visibility.left = false;
                break;
            }
        }
        for (let i = 0; i < topCount; i++) {
            const otherIndex = i + 1;
            topDist++;
            const other = allTrees[index - (otherIndex * colCount)]
            if (other >= allTrees[index]) {
                visibility.top = false;
                break;
            }
        }
        maxDist = Math.max(maxDist, rightDist*bottomDist*leftDist*topDist)
        for (const viz in visibility) {
            if (visibility[viz as keyof typeof visibility] === true) {
                return true;
            }
        }
        return false;
    }
    let countVisible = 0;
    for (let i = 0; i < allTrees.length; i++) {
        if (seeIfVisible(i)) {
            countVisible++
        }
    }
    console.log(countVisible)
    console.log(maxDist)
}