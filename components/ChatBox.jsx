import React, { useState, useRef, useEffect } from "react";
import Message from "../components/Message";
import Image from "../components/Image";
import ChatLoad from "./ChatLoad";
import SubmitForm from "./SubmitForm";
import { useDispatch, useSelector } from "react-redux";
import { messagesActions } from "../store/messages";
import { processImage } from "../functions/processImage";
import { processDescribeImage } from "../functions/processDescribeImage";
import { processGoogleSearch } from "../functions/googleSearch";
import {
  onSaveConversation,
  onUpdateConversation,
} from "../services/firebaseService";
import { v4 as uuidv4 } from "uuid";
import { processStableDiffusion } from "../functions/processStableDiffusion";
import { generateChatTitle } from "../functions/generateChatTitle";
import { textToSpeechActions } from "../store/textToSpeech";

//Custom Hook
import { useChatGPT } from "../hooks/useChatGPT";

const ChatBox = () => {
  //Selectors
  const activeAI = useSelector((state) => state.ai.activeAI);
  const newAISelected = useSelector((state) => state.ai.newAISelected);

  const dispatch = useDispatch();

  const messages = useSelector((state) => state.messages.messages);
  const conversation = useSelector((state) => state.messages);
  const [loading, setLoading] = useState(false);

  const [isUserUploadedImage, setHasUserUploadedImage] = useState(false);
  const [uploadedImage, setUploadedImage] = useState("");

  //Custom Hook
  const [response, startChatStream] = useChatGPT();

  const streamStatus = useSelector((state) => state.stream.status);
  //Refs
  const promptInputRef = useRef();
  const chatRef = useRef(null);

  //updates the initial Message whenever new AI is selected
  useEffect(() => {
    // setNewMessages([...messages]);
    let tempNewMessages = [...messages];
    const updatedMessage = {
      ...tempNewMessages[0],
      message: activeAI.initialMessage,
    };

    // Keep only the first message with the updated message value
    // setNewMessages([updatedMessage]);
    tempNewMessages = [updatedMessage];
    console.log("ako");
    console.log(tempNewMessages);
    dispatch(
      messagesActions.startNewConversation({
        title: `Conversation with ${activeAI.AIName}`,
        id: uuidv4(),
        dateCreated: new Date().toLocaleString(),
        selectedAI: activeAI.id,
        userID: "chad",
        messages: tempNewMessages,
      })
    );

    // Update Text to Speech when new AI is selected
    dispatch(textToSpeechActions.updateText(activeAI.initialMessage));
  }, [newAISelected]);

  const handleSend = async (event) => {
    let imageUrl;
    if (isUserUploadedImage) {
      imageUrl = await handleUpload(uploadedImage);
    }

    // event.preventDefault();
    const newMessage = {
      message: promptInputRef.current.value,
      direction: "outgoing",
      sender: "user",
      isImage: isUserUploadedImage,
      image: imageUrl,
      alt: "",
    };

    //Clear uploaded Image
    setUploadedImage("");
    setHasUserUploadedImage(false);

    const tempNewMessages = [...messages, newMessage];

    dispatch(messagesActions.updateMessage(tempNewMessages));

    setLoading(true);
    promptInputRef.current.value = "";

    promptInputRef.current.focus();

    let chatGPTResponse;

    if (isUserUploadedImage) {
      chatGPTResponse = await processDescribeImage(newMessage.image);
    } else if (newMessage.message.includes("image")) {
      // Code for DALLE
      // chatGPTResponse = await processImage(newMessage.message);
      //Code for StableDiffusion
      chatGPTResponse = await processStableDiffusion(newMessage.message);
    } else if (newMessage.message.includes("google")) {
      chatGPTResponse = await processGoogleSearch(newMessage.message);
    } else {
      // chatGPTResponse = await processMessageToChatGPT(newMessages, activeAI);

      //Add add new message temporarily to start streaming
      const dummyUpdatedMessages = [
        ...tempNewMessages,
        { message: "", sender: "ChatGPT" },
      ];
      dispatch(messagesActions.updateMessage(dummyUpdatedMessages));

      chatGPTResponse = await startChatStream(tempNewMessages, activeAI);
    }

    //Add GPTResponse to Messages
    const updatedMessages = [...tempNewMessages, chatGPTResponse];
    console.log("New message:");
    console.log(updatedMessages);
    dispatch(messagesActions.updateMessage(updatedMessages));

    //Update Text to Speech once stream is complete
    dispatch(textToSpeechActions.updateText(chatGPTResponse.message));

    //Stopped Loading
    setLoading(false);

    //Generate Title
    const generateTitle = async () => {
      // this function only run once within first 3 messages
      if (updatedMessages.length > 3) return conversation.title;

      const title = await generateChatTitle(updatedMessages);
      dispatch(messagesActions.updateTitle(title.text));

      return title.text;
    };
    //Save to FireStore

    if (import.meta.env.VITE_FIREBASE !== "disabled") {
      if (updatedMessages.length <= 3) {
        await onSaveConversation({
          title: await generateTitle(),
          id: conversation.id.toString(),
          dateCreated: conversation.dateCreated,
          selectedAI: activeAI.id,
          userID: conversation.userID,
          messages: updatedMessages,
        });
      } else if (updatedMessages.length > 3) {
        console.log("Im here");
        await onUpdateConversation({
          id: conversation.id.toString(),
          messages: updatedMessages,
        });
      }
    }
  };
  const handleUpload = async (blob) => {
    if (blob) {
      console.log("Uploading file:", blob);

      try {
        return new Promise((resolve, reject) => {
          const fileReader = new FileReader();
          fileReader.onload = () => resolve(fileReader.result);
          fileReader.onerror = reject;
          fileReader.readAsDataURL(blob);
        });
      } catch (error) {
        console.error("Error fetching the image:", error);
      }
    }
  };

  const handleKeyEnter = (event) => {
    if (event.key === "Enter" && promptInputRef.current.value) {
      handleSend();
    }
  };

  //Update Messages when stream is getting updates
  //not best solution - will find alternative way
  useEffect(() => {
    if (streamStatus === "idle") return;
    dispatch(messagesActions.updateMessageStream(response));
  }, [response]);

  useEffect(() => {
    chatRef.current.scrollTop = chatRef.current.scrollHeight;
  }, [messages]);

  return (
    <section className="relative text-sm mx-0 px-0 w-full h-full">
      <div
        className="flex flex-col w-full h-[80%] overflow-y-auto
     scrollbar scrollbar-thumb-green-400 scrollbar-track-gray-800 bg-[#343541]"
        ref={chatRef}
      >
        {messages &&
          messages.map((message, i) => {
            return (
              <React.Fragment key={i}>
                <Message
                  messageContent={message}
                  activeProfilePic={activeAI.picture}
                />

                {message && message.isImage && (
                  <Image url={message.image} alt={message.alt} />
                )}
              </React.Fragment>
            );
          })}

        <div>{loading && <ChatLoad />}</div>
      </div>

      <div className="absolute bottom-20 border-transparent bg-[#343541] w-full h-auto p-4">
        <SubmitForm
          inputRef={promptInputRef}
          onHandleSend={handleSend}
          onHandleKeyEnter={handleKeyEnter}
          setHasUserUploadedImage={setHasUserUploadedImage}
          setUploadedImage={setUploadedImage}
          uploadedImage={uploadedImage}
        />
      </div>
    </section>
  );
};

export default ChatBox;
