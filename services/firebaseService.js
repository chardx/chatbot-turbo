
export const onSaveConversation = async (data) => {
    try {


        const response = await fetch('http://localhost:3000/api/firebase/add/', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ data }),

        });

        // const result = await response.json();

        // return result;
    } catch (error) {
        console.log(error)
    }

}

export const getConversationHistory = async () => {
    try {

        const response = await fetch('http://localhost:3000/api/firebase/', {
            headers: {
                "Content-Type": "application/json"
            }
        });
        const result = await response.json();
        return result;
    } catch (error) {
        console.log(error)
    }


}