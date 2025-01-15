// Root for SAM
import { useContext } from "react";
import { ScreenContainer } from "../common";
import AppContext, { AppProvider } from "./SAMContext";
import { PaperAirplaneIcon } from "@heroicons/react/16/solid";
import { TrashIcon } from "@heroicons/react/20/solid";

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
      <div id="chatscreen" className="flex-1 overflow-y-scroll">
        {AppC.history?.map((item, index) => {
          return <ChatBubble key={index} item={item} />;
        })}
      </div>
      <div className="w-full flex flex-row items-center justify-items-center">
        <input
          className="h-10 w-full mr-2 px-2 bg-orange-100 rounded-lg"
          value={AppC.message}
          onChange={(e) => AppC.setMessage(e.target.value)}
          onSubmitCapture={AppC.SendMessage}
          disabled={AppC.loading}
          onFocus={() => {
            var elem = document.getElementById("chatscreen");
            elem.scrollTop = elem.scrollHeight;
          }}
          style={{ backgroundColor: AppC.loading ? "#d3d3d3" : "#ffedd5" }}
        />

        <SendButton />
      </div>
    </div>
  );
};

const SidePanel = (props) => {
  const AppC = useContext(AppContext);
  return (
    <div className="h-full w-1/3 text-center p-8 bg-orange-200 flex flex-col max-md:w-full max-md:h-[10%]">
      <h1 className="font-semibold text-2xl py-2">Snag A Mate</h1>
      <p className="italic font-light text-[8px] max-md:text-[0px]">
        Sometimes Sweet And Meek, Sometimes Sadistic And Masochistic.
      </p>
      <p className="italic font-light text-m max-md:text-[0px]">
        Your Relationship Coaches!
      </p>

      <div
        className="flex flex-row self-center my-4 text-white bg-slate-800 hover:bg-slate-400 rounded-lg content-center px-2 items-center "
        onClick={AppC.ClearChatHistory}
      >
        <p className="font-semibold ">Clear Chat</p>
      </div>
    </div>
  );
};

const ChatBubble = (props) => {
  let tailwindString = "";
  const AppC = useContext(AppContext);

  tailwindString +=
    "flex flex-row min-h-10 w-fit max-w-[50%] px-2.5 py-2.5 mb-2.5 mt-2.5 font-light ";

  if (props.item !== null) {
    if (props.item.role == "user") {
      tailwindString += "justify-self-center ";
      tailwindString += "rounded-lg bg-orange-100 ";
    } else if (props.item.role == "assistant") {
      if (
        props.item?.metadata?.sam == "good" ||
        props.item.assistant_id == AppC.goodSam
      ) {
        tailwindString += "justify-self-start ";
        tailwindString += "rounded-r-lg rounded-bl-lg bg-sky-200 ";
      } else if (
        props.item?.metadata?.sam == "bad" ||
        props.item.assistant_id == AppC.badSam
      ) {
        tailwindString += "justify-self-end ";
        tailwindString += "rounded-l-lg rounded-br-lg bg-rose-200 ";
      }
    }
  }

  return (
    <div className={tailwindString + "w-fit "}>
      {props.item?.content.length > 0 ? (
        <p>{props.item?.content[0].text.value}</p>
      ) : null}
    </div>
  );
};

const SendButton = (props) => {
  const AppC = useContext(AppContext);

  return (
    <PaperAirplaneIcon
      onClick={AppC.SendMessage}
      color="#000"
      className="rounded-lg w-7 h-7 hover:bg-slate-200"
    />
  );
};

export default SAM;
