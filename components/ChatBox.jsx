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
import { processTalkWithDocs } from "../functions/processTalkWithDocs";
import {
  onSaveConversation,
  onUpdateConversation,
} from "../services/firebaseService";
import { v4 as uuidv4 } from "uuid";
import { processStableDiffusion } from "../functions/processStableDiffusion";
import { generateChatTitle } from "../functions/generateChatTitle";
import { textToSpeechActions } from "../store/textToSpeech";
import { initPlayback } from "../functions/PlayerActions";
import { audioStreamActions } from "../store/audioStream";
import { chatHistoryActions } from "../store/chatHistory";

//Custom Hook
import { useChatGPT } from "../hooks/useChatGPT";
import stream from "../store/stream";

const ChatBox = () => {
  //Selectors
  const activeAI = useSelector((state) => state.ai.activeAI);
  const newAISelected = useSelector((state) => state.ai.newAISelected);

  const dispatch = useDispatch();

  const messages = useSelector((state) => state.messages.messages);
  const conversation = useSelector((state) => state.messages);
  const [loading, setLoading] = useState(false);

  const [hasUserUploadedImage, setHasUserUploadedImage] = useState(false);
  const [hasUserUploadedPDF, setHasUserUploadedPDF] = useState(false);
  const [uploadedImage, setUploadedImage] = useState("");

  //Custom Hook
  const [response, startChatStream] = useChatGPT();

  const streamStatus = useSelector((state) => state.stream.status);
  const streamResponse = useSelector((state) => state.stream.streamResponse);

  //Audio Stream
  const audioStream = useSelector((state) => state.audiostream);

  // User Auth
  const userID = useSelector((state) => state.auth.userInfo.userID);
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  //Refs
  const promptInputRef = useRef();
  const chatRef = useRef(null);

  const [userInput, setUserInput] = useState("");

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
    dispatch(
      messagesActions.startNewConversation({
        title: `Conversation with ${activeAI.AIName}`,
        id: uuidv4(),
        dateCreated: new Date().toLocaleString(),
        dateLastUpdated: new Date().toLocaleString(),
        selectedAI: activeAI.id,
        userID: userID,
        messages: tempNewMessages,
      })
    );

    // Update Text to Speech when new AI is selected
    dispatch(textToSpeechActions.updateText(activeAI.initialMessage));
  }, [newAISelected]);

  const handleSend = async (event) => {
    let userMessage = promptInputRef.current.value;
    //Check if user has uploaded an image
    let imageUrl;
    if (hasUserUploadedImage) {
      imageUrl = await handleUpload(uploadedImage);
    }

    //Check if user has uploaded a PDF
    // if (hasUserUploadedPDF) {
    //   userMessage = "User uploaded a PDF file";
    // }

    // event.preventDefault();
    const newMessage = {
      message: userMessage,
      direction: "outgoing",
      sender: "user",
      isImage: hasUserUploadedImage,
      image: imageUrl,
      alt: "",
    };

    //Clear uploaded Image
    setUploadedImage("");
    setHasUserUploadedImage(false);

    const tempNewMessages = [...messages, newMessage];

    dispatch(messagesActions.updateMessage(tempNewMessages));

    setLoading(true);

    let chatGPTResponse;

    if (activeAI.id === "r01") {
      chatGPTResponse = await processTalkWithDocs(tempNewMessages);
    } else if (hasUserUploadedImage) {
      chatGPTResponse = await processDescribeImage(newMessage.image);
    } else if (newMessage.message.includes("/image")) {
      // Code for DALLE
      // chatGPTResponse = await processImage(newMessage.message);
      //Code for StableDiffusion
      chatGPTResponse = await processStableDiffusion(newMessage.message);
    } else if (newMessage.message.includes("/google")) {
      chatGPTResponse = await processGoogleSearch(newMessage.message);
    } else {
      // chatGPTResponse = await processMessageToChatGPT(newMessages, activeAI);

      //Add add new message temporarily to start streaming
      const dummyUpdatedMessages = [
        ...tempNewMessages,
        { message: "", sender: "ChatGPT" },
      ];
      dispatch(messagesActions.updateMessage(dummyUpdatedMessages));

      //Get updated value of streamResponse and pass to initPlayback
      //PENDING
      // initPlayback(
      //   streamStatus,
      //   audioStream,
      //   audioStreamActions,
      //   dispatch,
      //   updateStreamResponse
      // );
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
        const newConversation = {
          title: await generateTitle(),
          id: conversation.id.toString(),
          dateCreated: conversation.dateCreated,
          dateLastUpdated: conversation.dateLastUpdated,
          selectedAI: activeAI.id,
          userID,
          messages: updatedMessages,
        };
        await onSaveConversation(newConversation);
        //Update Chat History Redux
        dispatch(chatHistoryActions.addNewConversation(newConversation));

        //Set active ChatID
        dispatch(
          chatHistoryActions.setActiveChatID(conversation.id.toString())
        );
      } else if (updatedMessages.length > 3) {
        //Handles Patch which only updates 2 new conversation
        await onUpdateConversation({
          id: conversation.id.toString(),
          messages: updatedMessages,
        });
        //Add new message and SORT Chat history by dateLastUpdated
        dispatch(
          chatHistoryActions.sortChatHistory({
            id: conversation.id.toString(),
            messages: updatedMessages,
          })
        );
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
    if (event.key === "Enter" && promptInputRef.current.value.trim() === "")
      return;
    if (event.key === "Enter" && promptInputRef.current.value) {
      console.log("Enter key pressed");

      event.preventDefault();
      promptInputRef.current.focus();
      setUserInput("");
      handleSend();

      // Clear Values
      // promptInputRef.current.value = "";
    }
  };

  //PENDING
  // const updateStreamResponse = () => {
  //   console.log("Stream Response Updated");
  //   console.log(streamResponse);
  //   return streamResponse;
  // };

  //Update Messages when stream is getting updates
  //not best solution - will find alternative way
  useEffect(() => {
    if (streamStatus === "idle") return;
    dispatch(messagesActions.updateMessageStream(response));
    //PENDING
    // updateStreamResponse();
  }, [response]);

  useEffect(() => {
    chatRef.current.scrollTop = chatRef.current.scrollHeight;
  }, [messages]);

  useEffect(() => {
    if (hasUserUploadedPDF) {
    }
  }, [hasUserUploadedPDF]);

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
          userInput={userInput}
          setUserInput={setUserInput}
          onHandleSend={handleSend}
          onHandleKeyEnter={handleKeyEnter}
          setHasUserUploadedImage={setHasUserUploadedImage}
          setHasUserUploadedPDF={setHasUserUploadedPDF}
          setUploadedImage={setUploadedImage}
          uploadedImage={uploadedImage}
        />
      </div>
    </section>
  );
};

export default ChatBox;
