import ChatBox from "../components/ChatBox";
import AI_List from "../components/SideBarRow/AI_List";
import ChatHistory from "../components/SideBarRow/ChatHistory";
import Header from "../components/Header";
import SignInBar from "../components/Login/SignInBar";
import ErrorBoundary from "../components/ErrorBoundary/ErrorBoundary";
import "../styles/globals.css";

function App() {
  return (
    <main className="flex h-screen w-screen flex-col text-white">
      <div className="flex h-full w-full pt-[48px] sm:pt-0">
        <aside className="z-50 bg-zinc-900 md:w-3/12 2xl:w-2/12 h-full sm:hidden md:block">
          <ChatHistory />
          <SignInBar />
        </aside>
        <div className="w-screen md:w-9/12 2xl:w-8/12 h-full bg-gray-200">
          <Header />

          <ErrorBoundary fallback={<p>Something went wrong</p>}>
            <ChatBox />
          </ErrorBoundary>
        </div>
        <aside className="bg-zinc-900 w-full h-full sm:hidden 2xl:w-2/12 2xl:block">
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
    </main>
  );
}

export default App;
