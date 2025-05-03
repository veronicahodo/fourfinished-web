const colors = {
    blue: "#1c98eb",
    orange: "#eb721c",
    red: "#eb1c1c",
    green: "#1ceb1c",
    purple: "#b721fa",
    white: "#ffffff",
    black: "#000000",
    gray: "#808080",
    grey: "#808080",
    yellow: "#DCCB1C",
    pink: "#DC6EC1",
    brown: "#5D4B41"
}

export const getColor = (color: string): string | undefined => {
    return colors[color.toLowerCase() as keyof typeof colors];
}