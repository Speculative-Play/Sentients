import { useContext } from "react";
import { PaperAirplaneIcon } from "@heroicons/react/16/solid";

export const ScreenContainer = (props) => {
  return (
    <div className="flex flex-col h-screen w-screen max-md:flex-col">
      {props.children}
    </div>
  );
};

// These are for the basic 1-to-1 chats
/// Props: context, children, override, style, title, subtitle, smallSubtitle
export const SettingsPanel = (props) => {
  const AppC = props.context ? useContext(props.context) : null;
  return (
    <div
      className="h-[10%] bg-slate-950 w-full text-white text-center max-md:w-full max-md:h-fit"
      style={{ ...props.style }}
    >
      <div className="flex justify-center align-middle content-center p-4 flex-col">
        <h1 className="font-semibold text-center text-2xl italic">
          {props.title ?? "Sentient"}
        </h1>
        <p className="italic font-light text-[8px] max-md:text-[0px]">
          {props.smallSubtitle ?? ""}
        </p>
        <p className="italic font-light text-m max-md:text-[0px]">
          {props.subtitle ?? ""}
        </p>
      </div>
      <div>{props.children}</div>
    </div>
  );
};

/// Props: context, children, style, title, subtitle, smallSubtitle
export const ChatScreen = (props) => {
  const AppC = props.context ? useContext(props.context) : null;

  return (
    <div
      className="h-[90%] w-full bg-slate-900 flex flex-col py-3 px-3 justify-stretch max-md:w-full max-md:h-full"
      style={{ ...props.style }}
    >
      <div className="flex h-full mb-3">{props.children}</div>
      <MessageBar message={AppC?.message} setMessage={AppC?.setMessage} />
    </div>
  );
};

export const MessageBar = (props) => {
  return (
    <div
      className="w-full flex flex-row items-center justify-items-center"
      style={{ ...props.style }}
    >
      <input
        className="h-10 w-full mr-2 px-2 bg-slate-300 rounded-lg"
        style={{ ...props.inputStyle }}
        value={props.message}
        onChange={props.setMessage}
      />
      <SendButton />
    </div>
  );
};

const SendButton = (props) => {
  return (
    <PaperAirplaneIcon
      onClick={props.onClick}
      color={props.color ?? "#d3d3d3"}
      className="rounded-lg w-7 h-7 hover:bg-slate-200"
    />
  );
};

const ChatBubble = (props) => {
  let tailwindString = "";
  tailwindString +=
    "flex flex-row min-h-10 max-w-2/3 px-2.5 py-2.5 mb-2.5 mt-2.5 font-light ";
  if (props.left) {
    tailwindString += "justify-self-start ";
    tailwindString += "rounded-r-lg rounded-tl-lg bg-sky-200 ";
  } else if (props.right) {
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

const ClearChatButton = (props) => {
  return (
    <div
      className="flex flex-row self-center my-4 text-white bg-slate-800 hover:bg-slate-400 rounded-lg content-center px-2 items-center "
      onClick={props.onClick}
    >
      <p className="font-semibold ">Clear Chat</p>
    </div>
  );
};
