export const filePathToText = async (file: string) => {
    const response = await fetch(file)
    const text = await response.text()
    return text;
}
