
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

export const getConversationHistory = async (userID) => {
    console.log("getConversationHistory")
    console.log(userID)
    const userIdParams = userID ? `?userID=${userID}` : '';
    try {

        const response = await fetch(`http://localhost:3000/api/firebase${userIdParams}`, {
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

export const onUpdateConversation = async (data) => {
    const id = data.id;
    //Get the last two messages (user last message and chatbot last message)
    const filteredMessages = data.messages.slice(-2);
    try {
        const response = await fetch(`http://localhost:3000/api/firebase/update/${id}/`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ filteredMessages }),

        });



        return response;
    } catch (error) {
        console.log(error)
    }
}