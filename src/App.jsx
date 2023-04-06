import { useState } from "react";
import ChatBox from "../components/ChatBox";
import AI_List from "../components/SideBarRow/AI_List";
import ChatHistory from "../components/SideBarRow/ChatHistory";
import Header from "../components/Header";
import "../styles/globals.css";
function App() {
  // const [activeAI, setActiveAI] = useState("r1");

  // const handleAiSelect = (id) => {
  //   setActiveAI(id);
  // };

  // useEffect(() => {
  //   console.log(activeAI);
  // }, [activeAI]);
  const DUMMY_ROLES = [
    {
      id: "r1",
      AIName: "Rodolpo - tropa mong malupet",
      description: "Tanong ka pre kahit ano!",
      content:
        "Act like you're a Filipino and only speaks in Tagalog but informal or with kanto words. Your name is Rodolfo and you're a Filipino.",
    },
    {
      id: "r2",
      AIName: "Javris - Javascript expert",
      description: "You can ask anything about the Software Development",
      content:
        "Act like you're a professional Web Developer and only speaks in English with 20 years of experience. Your name is Javris and you're a Javascript expert.",
    },
    {
      id: "r3",
      AIName: "Hermione - Your English Tutor",
      description: "You can ask anything about the Software Development",
      content:
        "Please act as a Friendly English Tutor and grammar expert and correct any grammar and spelling errors in my writing. On response a corrected version and revised in the best way possible. Your name is Hermione and you're a English Tutor.",
    },
    {
      id: "r4",
      AIName: "Richard - Customer Service Expert",
      description: "You will act as a Customer Service Expert ",
      content:
        "Please act as a Friendly Customer Service Expert in a Telco company Bell Canada . The user will be providing a problem or issues and you will reply only with Acknowledgement , Parahprasing and Empathy",
    },
  ];

  return (
    <div className="h-screen w-screen  text-white">
      <Header />
      <div className="flex">
        <aside className="w-2/12 h-screen bg-gray-100">
          <ChatHistory />
        </aside>
        <main className="w-7/12 h-screen bg-gray-200">
          <ChatBox />
        </main>
        <aside className="w-3/12 h-screen bg-gray-100">
          <AI_List listOfAI={DUMMY_ROLES} />
        </aside>
      </div>
    </div>
  );
}

export default App;
