import ChatBox from "../components/ChatBox";
import AI_List from "../components/SideBarRow/AI_List";
import ChatHistory from "../components/SideBarRow/ChatHistory";
import Header from "../components/Header";
import SignInBar from "../components/Login/SignInBar";
import ErrorBoundary from "../components/ErrorBoundary/ErrorBoundary";
import "../styles/globals.css";

function App() {
  return (
    <div className="h-screen w-screen text-white">
      <Header />
      <div className="flex flex-col sm:flex-row">
        <aside className="bg-zinc-900 sm:w-2/12 sm:h-screen sm:bg-gray-100 hidden">
          <ChatHistory />
          <SignInBar />
        </aside>
        <div className="w-full sm:w-8/12 h-screen bg-gray-200">
          <ErrorBoundary fallback={<p>Something went wrong</p>}>
            <ChatBox />
          </ErrorBoundary>
        </div>
        <aside className="w-2/12 sm:h-screen sm:bg-gray-100 hidden">
          <AI_List />
        </aside>
      </div>

      <script
        async
        src="https://cdn.jsdelivr.net/npm/opus-media-recorder@latest/OpusMediaRecorder.umd.js"
      ></script>
      <script
        async
        src="https://cdn.jsdelivr.net/npm/opus-media-recorder@latest/encoderWorker.umd.js"
      ></script>

      <style jsx>{`
        @media screen and (min-width: 640px) {
          /* Show ChatHistory and AI_List components */
          .hidden {
            display: block;
          }
        }
      `}</style>
    </div>
  );
}

export default App;
