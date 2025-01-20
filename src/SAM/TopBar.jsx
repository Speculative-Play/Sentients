import { useContext } from "react";
import BotController from "./SAMContext";

const TopBar = (props) => {
  const BotC = useContext(BotController);
  return (
    <div className="flex flex-row h-[10%] w-full text-left p-8 bg-orange-200  justify-between items-center max-md:w-full max-md:h-[10%] max-md:text-[10px]">
      <div>
        <h1 className="font-semibold text-xl">Snag A Mate</h1>
        <p className="italic font-light text-m">
          S.A.M: Your Relationship Coaches!
        </p>
      </div>
      <div className="flex flex-row items-center">
        <SwitchSAMButton />
        <SwitchChatmodeButton />
        <ClearChatButton />
      </div>
    </div>
  );
};

const SwitchChatmodeButton = (props) => {
  const BotC = useContext(BotController);
  let styleString =
    "flex flex-row self-center my-4 mx-2 bg-white hover:bg-slate-400 rounded-lg content-center px-2 items-center ";
  return (
    <div className={styleString} onClick={BotC.ToggleChatMode}>
      <p className="font-semibold ">
        {BotC.chatMode == 0 ? "Live Chat" : "View History"}
      </p>
    </div>
  );
};

const SwitchSAMButton = (props) => {
  const BotC = useContext(BotController);
  let styleString =
    "flex flex-row self-center my-4 hover:bg-slate-400 rounded-lg content-center px-2 items-center ";

  if (BotC.selectedSam === 0) {
    styleString += "bg-sky-400 text-black";
  } else {
    styleString += "bg-rose-400 text-white";
  }
  return (
    <div
      className={styleString}
      onClick={() =>
        BotC.setSelectedSam(() => (BotC.selectedSam === 0 ? 1 : 0))
      }
    >
      <p className="font-semibold ">Switch SAM</p>
    </div>
  );
};

const ClearChatButton = (props) => {
  const BotC = useContext(BotController);
  return (
    <div
      className="flex flex-row self-center my-4 text-white bg-slate-800 hover:bg-slate-400 rounded-lg content-center px-2 items-center "
      onClick={BotC.ClearChatHistory}
    >
      <p className="font-semibold ">Clear Chat</p>
    </div>
  );
};

export default TopBar;
