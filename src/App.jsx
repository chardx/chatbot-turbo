import ChatBox from "../components/ChatBox";
import AI_List from "../components/SideBarRow/AI_List";
import ChatHistory from "../components/SideBarRow/ChatHistory";
import "../styles/globals.css";
function App() {
  return (
    <div className="h-screen w-screen  text-white">
      <header className="bg-teal-700  text-center h-12 mb-5">
        <h1 className="font-medium text-2xl">Chat Bot Turbo</h1>
      </header>

      <div className="flex">
        <aside className="w-1/12 h-screen bg-gray-100">
          <ChatHistory />
        </aside>
        <main className="w-10/12 h-screen bg-gray-200">
          <ChatBox />
        </main>
        <aside className="w-1/12 h-screen bg-gray-100">
          <AI_List />
        </aside>
      </div>
    </div>
  );
}

export default App;
