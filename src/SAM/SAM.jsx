// Root for SAM
import { useContext } from "react";
import { ScreenContainer } from "../common";
import BotController, { BotCore } from "./SAMContext";
import { PaperAirplaneIcon } from "@heroicons/react/16/solid";
import TopBar from "./TopBar";
import InteractiveChat from "./InteractiveChat";

const SAM = (props) => {
  return (
    <BotCore>
      <ScreenContainer>
        <TopBar />
        <ChatScreen />
      </ScreenContainer>
    </BotCore>
  );
};

const ChatScreen = (props) => {
  const BotC = useContext(BotController);
  return (
    <div className="flex flex-col h-[90%] w-full bg-white py-3 px-3 justify-stretch max-md:w-full max-md:h-full">
      {BotC.chatMode == 1 ? <InteractiveChat /> : <ChatHistory />}
      <InputBar />
    </div>
  );
};

const ChatHistory = (props) => {
  const BotC = useContext(BotController);

  return (
    <div id="chatscreen" className="h-full overflow-y-scroll flex flex-col">
      {BotC.history?.map((item, index) => {
        return <ChatBubble key={index} item={item} />;
      })}
    </div>
  );
};

const ChatBubble = (props) => {
  const BotC = useContext(BotController);

  let tailwindString = "w-fit max-w-[60%] px-2.5 py-2.5 mb-2.5 mt-2.5 font-light ";

  if (props.item !== null) {
    if (props.item.role == "user") {
      tailwindString += "self-center ";
      tailwindString += "rounded-lg bg-orange-100 ";
    } else if (props.item.role == "assistant") {
      if (
        props.item?.metadata?.sam == "good" ||
        props.item.assistant_id == BotC.goodSam
      ) {
        tailwindString += "self-start ";
        tailwindString += "rounded-r-lg rounded-bl-lg bg-sky-200 ";
      } else if (
        props.item?.metadata?.sam == "bad" ||
        props.item.assistant_id == BotC.badSam
      ) {
        tailwindString += "self-end ";
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

const InputBar = (props) => {
  const BotC = useContext(BotController);

  return (
    <div className="w-full flex flex-row items-center justify-items-center">
      <input
        className="h-10 w-full mr-2 px-2 bg-orange-100 rounded-lg"
        value={BotC.message}
        onChange={(e) => BotC.setMessage(e.target.value)}
        onSubmitCapture={BotC.SendMessage}
        disabled={BotC.loading}
        onFocus={() => {
          var elem = document.getElementById("chatscreen");
          elem.scrollTop = elem.scrollHeight;
        }}
        style={{ backgroundColor: BotC.loading ? "#d3d3d3" : "#ffedd5" }}
      />

      <SendButton />
    </div>
  );
};

const SendButton = (props) => {
  const BotC = useContext(BotController);

  return (
    <PaperAirplaneIcon
      onClick={BotC.SendMessage}
      color="#000"
      className="rounded-lg w-7 h-7 hover:bg-slate-200"
    />
  );
};

export default SAM;
