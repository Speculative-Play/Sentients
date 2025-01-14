// Root for SAM
import { useContext } from "react";
import { ScreenContainer } from "../common";
import AppContext, { AppProvider } from "./SAMContext";
import { PaperAirplaneIcon } from "@heroicons/react/16/solid";

const SAM = (props) => {
  return (
    <AppProvider>
      <ScreenContainer>
        <SidePanel />
        <ChatScreen />
      </ScreenContainer>
    </AppProvider>
  );
};

const ChatScreen = (props) => {
  const AppC = useContext(AppContext);
  return (
    <div className="h-full w-2/3 bg-white flex flex-col py-3 px-3 justify-stretch max-md:w-full max-md:h-full">
      <div className="flex-1">
        <ChatBubble message="Hi! I'm S.A.M. Your relationship Coach!" goodSam />
        <ChatBubble
          message="That guy's a fake, I'll be showing you how to get laid"
          badSam
        />
        <ChatBubble message="...great start" />
      </div>
      <div className="w-full flex flex-row items-center justify-items-center">
        <input className="h-10 w-full mr-2 px-2 bg-orange-100 rounded-lg" />

        <SendButton />
      </div>
    </div>
  );
};

const SidePanel = (props) => {
  return (
    <div className="h-full w-1/3 flex-1 text-center justify-center p-8 bg-orange-200 flex flex-col max-md:w-full max-md:h-[10%]">
      <h1 className="font-semibold text-2xl py-2">Snag A Mate</h1>
      <p className="italic font-light text-[8px] max-md:text-[0px]">
        Sometimes Sweet And Meek, Sometimes Sadistic And Masochistic.
      </p>
      <p className="italic font-light text-m max-md:text-[0px]">Your Relationship Coaches!</p>
    </div>
  );
};

const ChatBubble = (props) => {
  let tailwindString = "";
  tailwindString +=
    "flex flex-row min-h-10 max-w-2/3 px-2.5 py-2.5 mb-2.5 mt-2.5 font-light ";
  if (props.goodSam) {
    tailwindString += "justify-self-start ";
    tailwindString += "rounded-r-lg rounded-tl-lg bg-sky-200 ";
  } else if (props.badSam) {
    tailwindString += "justify-self-end ";
    tailwindString += "rounded-l-lg rounded-tr-lg bg-rose-200 ";
  } else {
    tailwindString += "justify-self-center ";
    tailwindString += "rounded-lg bg-orange-100 ";
  }

  return (
    <div className={tailwindString + "w-fit "}>
      <p>{props.message}</p>
    </div>
  );
};

const SendButton = (props) => {
  return (
    <PaperAirplaneIcon
      onClick={props.onClick}
      color="#000"
      className="rounded-lg w-7 h-7 hover:bg-slate-200"
    />
  );
};

export default SAM;
