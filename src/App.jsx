import ChatBox from "../components/ChatBox";
import "../styles/globals.css";
function App() {
  return (
    <div className="h-screen w-screen  text-black-300">
      <header className="bg-teal-700 text-white text-center h-12 mb-5">
        <h1 className="font-medium text-2xl">Chat Bot Turbo</h1>
      </header>

      <ChatBox />
    </div>
  );
}

export default App;
