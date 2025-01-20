import { useContext } from "react";
import AppContext from "./ChabotContext";

const TopBar = (props) => {
  const AppC = useContext(AppContext);
  return (
    <div className="flex flex-row h-[10%] w-full text-left p-8 bg-[#f28482]  justify-between items-center max-md:w-full max-md:h-[10%] max-md:text-[10px]">
      <div>
        <h1 className="font-semibold text-xl text-white">Chabot</h1>
        <p className="italic font-light text-m text-white">
          A therapist who really wants to help
        </p>
      </div>
      <div className="flex flex-row items-center">
        <EmpathyButton />
        <FlirtationButton />
        <SwitchChatmodeButton />
        <ClearChatButton />
      </div>
    </div>
  );
};

const SwitchChatmodeButton = (props) => {
  const AppC = useContext(AppContext);
  let styleString =
    "flex flex-row self-center my-4 mx-2 text-center bg-white hover:bg-slate-400 rounded-lg content-center px-2 items-center ";
  return (
    <div className={styleString} onClick={AppC.ToggleChatMode}>
      <p className="font-semibold ">
        {AppC.chatMode == 0 ? "Live Chat" : "View History"}
      </p>
    </div>
  );
};

const ClearChatButton = (props) => {
  const AppC = useContext(AppContext);
  return (
    <div
      className="flex flex-row self-center my-4 text-center text-white bg-slate-800 hover:bg-slate-400 rounded-lg content-center px-2 items-center "
      onClick={AppC.ClearChatHistory}
    >
      <p className="font-semibold ">Clear Chat</p>
    </div>
  );
};

const EmpathyButton = (props) => {
  const AppC = useContext(AppContext);
  return (
    <div
      className="flex flex-row self-center my-4 mx-2 text-center bg-[#f6bd60] hover:bg-slate-400 rounded-lg content-center px-2 items-center "
      onClick={AppC.UpdateEmpathy}
    >
      <p className="font-semibold ">Empathy: {AppC.empathy}</p>
    </div>
  );
};

const FlirtationButton = (props) => {
  const AppC = useContext(AppContext);
  return (
    <div
      className="flex flex-row self-center my-4 text-center bg-[#f6bd60] hover:bg-slate-400 rounded-lg content-center px-2 items-center "
      onClick={AppC.UpdateFlirtation}
    >
      <p className="font-semibold ">Flirtation: {AppC.flirtation}</p>
    </div>
  );
};

export default TopBar;
