import data from "./data.txt"
import { filePathToText } from "../utils/utils"
const text = await filePathToText(data)

const move = (count: number, from: any, to: any) => {
    console.log(from)
    console.log(to)
    const toAdd = from.splice(0, count).reverse();

    console.log("toAdd: ", toAdd)
    toAdd.forEach(el => {
        to.unshift(el)
    })
    return
    for (let index = 0; index < count; index++) {
        const toAdd = from.splice(0, 1)[0]
        to.unshift(toAdd)
    }
}
export const day5 = () => {
    const newData = text.split(/\n/)
    const crates = newData.splice(0, 9)
    const crateCounter = crates.splice(8, 9)[0]
    const columns = crateCounter.split("").reduce((acc: any[], curr, index) => {
        if (curr === " ") {
            return acc
        }
        const newCol: any[] = []
        crates.forEach((crate, i) => {
            newCol.push(crate[index])
        })
        acc.push(newCol)
        return acc
    }, [])

    const columnNoSpace = columns.map(col => {
        return col.filter((cl: any) => cl !== " ")
    })
    const instructions = newData.splice(1)
    instructions.forEach(struct => {
        const breakdown = struct.split(" ")
        const count = Number(breakdown[1])
        const from = columnNoSpace[Number(breakdown[3]) - 1]
        const to = columnNoSpace[Number(breakdown[5]) - 1]
        move(count, from, to)
    })
    console.log(columnNoSpace)
    const topCrates = columnNoSpace.map(col => {
        return col[0]
    })
    console.log(topCrates.join(""))
}