import { filePathToText } from "../utils/utils";
import guideData from "./rpsGuide.txt"

export const day2 = async () => {
    const rpsGuide = await filePathToText(guideData);

    const valueMap = new Map([
        ["AX", 4],
        ["BX", 1],
        ["CX", 7],
        ["AY", 8],
        ["BY", 5],
        ["CY", 2],
        ["AZ", 3],
        ["BZ", 9],
        ["CZ", 6]
    ]);

    const outcomeMap = new Map([
        ["A", {
            Z: "Y",
            X: "Z",
            Y: "X"
        }],
        ["B", {
            Z: "Z",
            X: "X",
            Y: "Y"
        }],
        ["C", {
            Z: "X",
            X: "Y",
            Y: "Z"
        }]
    ])


    const playArray: string[] = rpsGuide.split(/\r?\n/);

    const playArray2 = [...playArray].reduce((acc, curr) => {
        const possibleOutcomes = outcomeMap.get(curr[0])!
        const second: string = possibleOutcomes[curr[2] as keyof typeof possibleOutcomes];
        acc += Number(valueMap.get(curr[0] + second)) 
        return acc;
    }, 0)
    const results = playArray.reduce((acc: number, curr: string) => {
        const val = valueMap.get(curr.split(" ").join(""))
        if (!val) return acc;
        acc += val;
        return acc;
    }, 0)


}

