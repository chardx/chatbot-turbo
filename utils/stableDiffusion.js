const API_URL = "https://api-inference.huggingface.co/models/CompVis/stable-diffusion-v1-4";
const headers = { "Authorization": "Bearer " + cfg.huggingface_api_token };

request.post({
    url: API_URL,
    headers: headers,
    json: {
        "inputs": prompt,
    }
}, function (error, response, body) {
    if (error) {
        console.error(error);
    } else {
        const image = Buffer.from(body, 'base64');
        console.log("Image Generated for prompt:" + prompt);


        fs.writeFile(path.join(working_directory, filename), image, function (err) {
            if (err) {
                console.error(err);
            } else {
                console.log("Saved to disk:" + filename);
            }
        });
    }
});
