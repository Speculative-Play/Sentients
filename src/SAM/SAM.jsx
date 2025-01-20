// Root for SAM
import { useContext, useState, useEffect } from "react";
import { ScreenContainer, delay } from "../common";
import AppContext, { AppProvider } from "./SAMContext";
import {
  ArrowsRightLeftIcon,
  PaperAirplaneIcon,
  PlayCircleIcon,
} from "@heroicons/react/16/solid";

const SAM = (props) => {
  return (
    <AppProvider>
      <ScreenContainer>
        <TopBar />
        <ChatScreen />
      </ScreenContainer>
    </AppProvider>
  );
};

const TopBar = (props) => {
  const AppC = useContext(AppContext);
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

const ChatScreen = (props) => {
  const AppC = useContext(AppContext);
  return (
    <div className="flex flex-col h-[90%] w-full bg-white py-3 px-3 justify-stretch max-md:w-full max-md:h-full">
      {AppC.chatMode == 1 ? <InteractiveChat /> : <ChatHistory />}
      <InputBar />
    </div>
  );
};

const ChatHistory = (props) => {
  const AppC = useContext(AppContext);

  return (
    <div id="chatscreen" className="h-full overflow-y-scroll">
      {AppC.history?.map((item, index) => {
        return <ChatBubble key={index} item={item} />;
      })}
    </div>
  );
};

const AnimatedChatBubble = (props) => {
  const AppC = useContext(AppContext);
  const [text, setText] = useState("");

  useEffect(() => {
    if (props.typing != false) {
      typing();
    }
  }, []);
  
  

  async function typing() {
    const typingSpeed = 101; // lower is faster.
    const splitMessage = props.item?.content[0]?.text.value.split(" ");

    for (let index = 0; index <= splitMessage?.length; index++) {
      setText(splitMessage.slice(0, index).join(" "));
      await delay(typingSpeed);
    }
  }


  let tailwindString =
    "flex flex-row min-h-10 px-2.5 py-2.5 mb-2.5 mt-2.5 font-medium ";

  if (props.item != null) {
    if (props.item?.role == "user") {
      tailwindString += "g-orange-100 self-bottom ";
    } else if (props.item.role == "assistant") {
      if (
        props.item?.metadata?.sam == "good" ||
        props.item.assistant_id == AppC.goodSam
      ) {
        tailwindString += "bg-sky-200 ";
      } else if (
        props.item?.metadata?.sam == "bad" ||
        props.item.assistant_id == AppC.badSam
      ) {
        tailwindString += "bg-rose-200 ";
      }
    }
  }
  
  if (props.item?.role == "user") return <ChatBubble item={props.item} />;

  return (
    <div className={tailwindString + "justify-self-center rounded-lg w-[80%]"}>
      {props.item?.content.length > 0 ? <p>{text}</p> : null}
    </div>
  );
};

const InteractiveChat = (props) => {
  const AppC = useContext(AppContext);
  const [revHistory, setReverseHistory] = useState(() => ReverseHistory());

  function ReverseHistory() {
    var ret = new Array();
    for (var i = AppC.history.length - 1; i >= 0; i--) {
      ret.push(AppC.history[i]);
    }
    return ret;
  }

  useEffect(() => {
    setReverseHistory(ReverseHistory());
  }, [AppC.history]);

  return (
    <div id="chatscreen" className="h-full">
      {revHistory.map((item, index) => {
        if (index < 2) {
          return (
            <AnimatedChatBubble
              key={index}
              item={item}
              typing={item?.role !== "user"}
            />
          );
        }
      })}
    </div>
  );
};

const InputBar = (props) => {
  const AppC = useContext(AppContext);

  return (
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
  );
};

const ChatBubble = (props) => {
  let tailwindString = "";
  const AppC = useContext(AppContext);

  tailwindString +=
    "flex flex-row min-h-10 w-fit max-w-[40%] px-2.5 py-2.5 mb-2.5 mt-2.5 font-light ";

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

const SwitchChatmodeButton = (props) => {
  const AppC = useContext(AppContext);
  let styleString =
    "flex flex-row self-center my-4 mx-2 bg-white hover:bg-slate-400 rounded-lg content-center px-2 items-center ";
  return (
    <div className={styleString} onClick={AppC.ToggleChatMode}>
      <p className="font-semibold ">
        {AppC.chatMode == 0 ? "Live Chat" : "View History"}
      </p>
    </div>
  );
};

const SwitchSAMButton = (props) => {
  const AppC = useContext(AppContext);
  let styleString =
    "flex flex-row self-center my-4 hover:bg-slate-400 rounded-lg content-center px-2 items-center ";

  if (AppC.selectedSam === 0) {
    styleString += "bg-sky-400 text-black";
  } else {
    styleString += "bg-rose-400 text-white";
  }
  return (
    <div
      className={styleString}
      onClick={() =>
        AppC.setSelectedSam(() => (AppC.selectedSam === 0 ? 1 : 0))
      }
    >
      <p className="font-semibold ">Switch SAM</p>
    </div>
  );
};

const ClearChatButton = (props) => {
  const AppC = useContext(AppContext);
  return (
    <div
      className="flex flex-row self-center my-4 text-white bg-slate-800 hover:bg-slate-400 rounded-lg content-center px-2 items-center "
      onClick={AppC.ClearChatHistory}
    >
      <p className="font-semibold ">Clear Chat</p>
    </div>
  );
};

export default SAM;
