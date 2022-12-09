import { filePathToText } from "../utils/utils";
import text from "./data.txt"
const data = await filePathToText(text);


export const day9 = () => {
    const motions = data.split(/\n/);
    const getMotion = (index: number) => {
        const motion = motions[index];
        return {
            direction: motion[0],
            distance: Number(motion[2])
        }
    }
    const headTracker: { x: number, y: number } = {
        x: 0,
        y: 0
    }
    const tailTracker: { x: number, y: number } = {
        x: 0,
        y: 0
    }
    const followRoutine = () => {
        const xDiff = headTracker.x - tailTracker.x;
        const yDiff = headTracker.y - tailTracker.y;

    }
    for (let index = 0; index < motions.length; index++) {
        const motion = getMotion(index)
        if (motion.direction === "R") {
            headTracker.x += motion.distance
        }
        if (motion.direction === "L") {
            headTracker.x -= motion.distance
        }
        if (motion.direction === "U") {
            headTracker.y += motion.distance
        }
        if (motion.direction === "D") {
            headTracker.y -= motion.distance;
        }
    }
}
