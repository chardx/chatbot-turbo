export const get_clothing_recommendations = (temperature) => {
    // 6. Logs function call details.
    console.log(
        `Called get_clothing_recommendations with temperature: ${temperature}`
    );
    // 7. Provides clothing recommendation based on the temperature.
    let recommendation =
        temperature < 60 ? "warm clothing colourful" : "light clothing tye-dye";
    // 8. Returns clothing recommendation.
    return JSON.stringify({ recommendation: recommendation });
}

Object.defineProperty(get_clothing_recommendations, "property", {
    get: () => ({
        name: "get_clothing_recommendations",
        description: "Get clothing recommendation based on temperature",
        parameters: {
            type: "object",
            properties: {
                temperature: {
                    type: "string",
                    description: "The current temperature",
                },
            },
            required: ["temperature"],
        },
    }),
});