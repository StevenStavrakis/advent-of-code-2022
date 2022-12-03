import { filePathToText } from '../utils/utils'
import calories from './calories.txt'


export const findMostCalories = async () => {
    const caloriesText = await filePathToText(calories)

    const caloriesArray: string[] = caloriesText.split(/\r?\n/)
    
    caloriesArray.unshift("")

    const caloriesGrouped = caloriesArray.reduce((acc: any[], cur) => {
        if (cur === "") {
            acc.push([])
        } else {
            acc[acc.length - 1].push(cur)
        }
        return acc
    }, [])

    const totalCalorieArray = caloriesGrouped.map((group) => {
        return group.reduce((acc: number, curr: string) => {
            acc += parseInt(curr)
            return acc
        }, 0)
    })
    const mostCalories = totalCalorieArray.sort((a: any, b: any) => {
        return b - a
    })[0]

    const topThree = totalCalorieArray.sort((a: any, b: any) => {
        return b - a
    }).slice(0, 3).reduce((acc: number, curr: number) => {
        acc += curr
        return acc
    }, 0)

    return JSON.stringify({
        mostCalories,
        topThree
    });
}
