export const useRandomNumber = (count: number) => {
    let colors: string[] = [];
    for (let i = 0; i < count; i++) {
        colors.push(`#${Math.floor(Math.random() * 1000000)}`);
    }
    return colors;
};
