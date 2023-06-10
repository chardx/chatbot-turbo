export const processUploadFile = async (formData) => {

    try {
        const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/api/fileUploader`, {
            method: 'POST',
            body: formData,


        });

        const data = await response.json();
        console.log("Data")
        console.log(data)


        console.log(data.results);
        return {
            message: data.results.status,
            sender: "ChatGPT"
        }

    } catch (error) {
        console.log(error)
    }

}
