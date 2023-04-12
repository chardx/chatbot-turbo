import ChatBox from "../components/ChatBox";
import AI_List from "../components/SideBarRow/AI_List";
import ChatHistory from "../components/SideBarRow/ChatHistory";
import Header from "../components/Header";
import ErrorBoundary from "../components/ErrorBoundary/ErrorBoundary";
import "../styles/globals.css";

function App() {
  return (
    <div className="h-screen w-screen  text-white">
      <Header />
      <div className="flex">
        <aside className="w-2/12 h-screen bg-gray-100">
          <ChatHistory />
        </aside>
        <div className="w-7/12 h-screen bg-gray-200">
          <ErrorBoundary fallback={<p>Something went wrong</p>}>
            <ChatBox />
          </ErrorBoundary>
        </div>
        <aside className="w-3/12 h-screen bg-gray-100">
          <AI_List />
        </aside>
      </div>
    </div>
  );
}

export default App;
