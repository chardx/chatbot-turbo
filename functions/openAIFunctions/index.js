import { get_current_weather } from "./getCurrentWeather";
import { get_clothing_recommendations } from "./getClothingRecommendations";
import { process_text_to_image } from "./processTextToImage";

export class OpenAIFunction {
    constructor(func) {
        this.function = func;
        this.properties = func.property;
    }
    getProperties() {
        return this.properties;
    }
}

let openAIFunctions = [
    new OpenAIFunction(get_current_weather),
    new OpenAIFunction(get_clothing_recommendations),
    new OpenAIFunction(process_text_to_image)

]

export const functionsArray = openAIFunctions.map((func) => func.properties);
console.log("Functions Props")
console.log(functionsArray)

// openAIFunctions.forEach((func) => {
//     console.log(func.properties.name)
//     const functionName = func.properties.name;
//     exports[functionName] = func.function;
// });




export const getCurrentWeather = openAIFunctions[0].function;
export const getClothingRecommendations = openAIFunctions[1].function;
export const processTextToImage = openAIFunctions[2].function;

console.log(getCurrentWeather)
console.log(getClothingRecommendations)
console.log(processTextToImage)