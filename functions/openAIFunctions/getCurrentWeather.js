
export function get_current_weather(location, unit = "fahrenheit") {
    // 3. Logs function call details.
    console.log(
        `Called get_current_weather with location: ${location} and unit: ${unit}`
    );
    // 4. Returns simulated weather data.
    return JSON.stringify({
        location: location,
        temperature: "30",
        unit: unit,
        forecast: ["sunny", "windy"],
    });
}

Object.defineProperty(get_current_weather, "property", {
    get: () => ({
        name: "get_current_weather",
        description: "Get the current weather in a given location",
        parameters: {
            type: "object",
            properties: {
                location: {
                    type: "string",
                    description: "The city and state, e.g. San Francisco, CA",
                },
                unit: { type: "string", enum: ["celsius", "fahrenheit"] },
            },
            required: ["location"],
        },
    }),
});

