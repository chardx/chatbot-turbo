import ChatBox from "../../components/ChatBox";
import AI_List from "../../components/SideBarRow/AI_List";
import ChatHistory from "../../components/SideBarRow/ChatHistory";
import Header from "../../components/Header";
import Menu from "../../components/Menu";
import ErrorBoundary from "../../components/ErrorBoundary/ErrorBoundary";
import "../../styles/globals.css";

const HomePage = () => {
  return (
    <main className="flex h-screen w-screen flex-col text-white">
      <div className="flex h-full w-full pt-0">
        <aside className="z-50 bg-zinc-900 md:w-3/12 2xl:w-2/12 h-full hidden md:block">
          <ChatHistory />
          <Menu />
        </aside>
        <div className="w-full h-full md:w-9/12 2xl:w-8/12  bg-gray-200">
          <Header />

          <ErrorBoundary fallback={<p>Something went wrong</p>}>
            <ChatBox />
          </ErrorBoundary>
        </div>
        <aside className="bg-zinc-900 w-full h-full hidden 2xl:w-2/12 2xl:block">
          <AI_List />
        </aside>
      </div>
    </main>
  );
};

export default HomePage;
