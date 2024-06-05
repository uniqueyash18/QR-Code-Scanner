export function randomColorName() {
    const colorNames = [
        "Red",
        "Orange",
        "Yellow",
        "Green",
        "Blue",
        "Indigo",
        "Violet",
        "Purple",
        "Pink",
        "Black",
        "White",
        "Gray",
        "Brown",
        "Cyan",
        "Magenta",
        "Turquoise",
        "Lavender",
        "Maroon",
        "Teal",
        "Olive",
        "Navy",
        "Beige",
        "Peach",
        "Mint",
        "Gold",
        "Silver",
        "Bronze",
        "Plum"
    ];

    const randomIndex = Math.floor(Math.random() * colorNames.length);
    return colorNames[randomIndex];
}