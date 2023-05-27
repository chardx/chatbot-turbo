export const processTextToSpeech = async (message, activeVoice) => {

    try {
        const response = await fetch('http://localhost:3000/api/awspolly', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ message, activeVoice }),

        });
        if (response.ok) {
            const audioBlob = await response.blob();
            const audioSrc = URL.createObjectURL(audioBlob);
            return audioSrc;
        } else {
            console.log("Error:", response.status);
        }

    } catch (error) {
        console.log(error)
    }
}
