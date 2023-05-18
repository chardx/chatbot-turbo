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
      <div className="flex flex-row">
        <aside className="bg-zinc-900 md:w-3/12 lg:w-2/12 h-screen sm:hidden md:block">
          <ChatHistory />
          <SignInBar />
        </aside>
        <div className="w-full md:w-8/12 lg:w-9/12 h-screen bg-gray-200">
          <ErrorBoundary fallback={<p>Something went wrong</p>}>
            <ChatBox />
          </ErrorBoundary>
        </div>
        <aside className="sm:hidden 2xl:w-2/12 2xl:block">
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
