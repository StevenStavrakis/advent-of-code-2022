import { filePathToText } from "../utils/utils";
import text from './data.txt'
const data = await filePathToText(text)

export const day6 = () => {
    const window = new Map();
    const signal = data.split("")
    let left = 0;
    let right = 0;
    let ret;
    for (let index = 0; index < signal.length; index++) {

        right = index;
        const char = signal[right];
        window.set(char, (window.get(char) ?? 0) + 1)
        if ((right - left) > 13) {
            window.set(signal[left], window.get(signal[left]) - 1)
            if (window.get(signal[left]) <= 0) {
                window.delete(signal[left])
            }
            left++
        }
        console.log(index)
        if ([...window.keys()].length >= 14) {
            console.log(window)
            ret = index + 1
            break;
        }
    }
    console.log(signal.slice(ret - 13, ret + 1))
    console.log(ret)
    return ret
}