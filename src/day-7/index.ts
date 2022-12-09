import { filePathToText } from "../utils/utils";
import data from "./data.txt"
const text = await filePathToText(data)
interface IFile {
    name: string;
    size: number;
}
interface IDirectory {
    name: string;
    files: IFile[];
    childDirectories: IDirectory[];
    parentDirectory: IDirectory;
    size: number;
}
class Directory implements IDirectory {
    public files: IFile[] = []
    public childDirectories: IDirectory[] = []
    public parentDirectory: IDirectory;
    public name: string;
    constructor(parent: IDirectory, name: string) {
        this.parentDirectory = parent;
        this.name = name;
    }
    get size() {
        const fileSizes = this.files.reduce((acc: number, curr: IFile) => acc + curr.size, 0)
        const dirSizes = this.childDirectories.reduce((acc: number, curr: IDirectory) => acc + curr.size, 0)
        return fileSizes + dirSizes;
    }
}
class File implements IFile {
    public name: string;
    public size: number;
    constructor(name: string, size: number) {
        this.name = name;
        this.size = size;
    }
}
class Terminal {
    public currentDirectory: IDirectory
    public commandIndex: number = 0;
    public commandArray: string[] = text.split(/\n/)
    public topDirectory: IDirectory;
    constructor() {
        this.currentDirectory = new Directory(({} as IDirectory), "/") as IDirectory;
        this.topDirectory = this.currentDirectory;
        this.nextCommand();
    }
    changeDirectory(target: string) {
        switch (target) {
            case "..":
                this.currentDirectory = this.currentDirectory.parentDirectory
                break;
            default:
                const dir = new Directory(this.currentDirectory, target);
                dir.parentDirectory = this.currentDirectory;
                this.currentDirectory.childDirectories.push(dir)
                this.currentDirectory = dir;
                break;
        }
        this.nextCommand();
    }
    listFiles() {
        let endIndex = this.commandArray.findIndex((el, i) => {
            if (i === 0) return false;
            return el.split(" ")[0] === "$";
        })
        if (endIndex === -1) {
            endIndex = this.commandArray.length;
        }
        for (let i = 0; i < endIndex - 1; i++) {
            this.commandArray.shift();
            const currCommand = this.commandArray[0].split(" ");
            if (Number(currCommand[0])) {
                this.currentDirectory.files.push(new File(currCommand[1], Number(currCommand[0])))
            }
        }
        this.nextCommand()
    }
    nextCommand() {
        if (this.commandArray.length <= 1) return;
        this.commandArray.shift();
        const currCommand = this.commandArray[0].split(" ");
        if (currCommand[1] === "cd") {
            this.changeDirectory(currCommand[2])
        }
        if (currCommand[1] === "ls") {
            this.listFiles()
        }

    }
    get allDirectories() {
        const directs: IDirectory[] = []
        const reDirectories = (direct: IDirectory) => {
            directs.push(direct)
            direct.childDirectories.forEach(dir => {
                reDirectories(dir)
            })
            return
        }
        reDirectories(this.topDirectory)
        return directs
    }
}
export const day7 = () => {
    const term = new Terminal();
    console.log(term.allDirectories)
    const goal1 = term.allDirectories.reduce((acc: number, curr: IDirectory) => {
        console.log(curr.size, curr.name)
        if (curr.size >= 100000) {
            return acc
        }
        return acc + curr.size;
    }, 0)
    console.log(goal1)
    const totalSpace = 70000000;
    const requiredSpace = 30000000
    const availableSpace = totalSpace - term.topDirectory.size;
    const deletionSize = requiredSpace - availableSpace;
    const smallest = [...term.allDirectories].filter(el => el.size >= deletionSize).sort((a, b) => a.size - b.size)[0];
    console.log("smallest: ", smallest.size)
}