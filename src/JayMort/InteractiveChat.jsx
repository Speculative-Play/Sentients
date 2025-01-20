import BotController from "./JayMortContext";
import { useContext, useState, useEffect } from "react";
import { delay } from "../common";

const AnimatedChatBubble = (props) => {
  const BotC = useContext(BotController);
  const [text, setText] = useState("");

  useEffect(() => {
    if (props.item?.content[0].text.value != text) {
      setText("");
      Typing();
    }
  }, [props.item]);

  useEffect(() => {
    if (props.typing != false) {
      Typing();
    }
  }, []);

  async function Typing() {
    const typingSpeed = 101; // lower is faster.
    const splitMessage = props.item?.content[0]?.text.value.split(" "); //type each word

    for (let index = 0; index <= splitMessage?.length; index++) {
      setText(splitMessage.slice(0, index).join(" "));
      await delay(typingSpeed);
    }
  }

  let tailwindString = "";

  if (props.item != null) {
    if (props.item.role == "user") {
      tailwindString += "bg-sky-200 ";
    } else if (props.item.role == "assistant") {
      tailwindString += "bg-slate-800 text-white ";
    }
  }

  return (
    <div
      className={
        tailwindString +
        "flex flex-row min-h-10 px-2.5 py-2.5 mb-2.5 mt-2.5 font-medium rounded-lg w-full"
      }
    >
      {props.item?.content.length > 0 ? <p>{text}</p> : null}
    </div>
  );
};

const InteractiveChat = (props) => {
  const BotC = useContext(BotController);
  const [AIMessage, setAIMessage] = useState(null);
  const [userMessage, setUserMessage] = useState(null);

  function GetLastAIMessage() {
    if (BotC.history?.length > 0) {
      for (let index = BotC.history.length - 1; index >= 0; index--) {
        if (BotC.history[index].role == "assistant") {
          setAIMessage(BotC.history[index]);
          break;
        }
      }
    }
  }

  function GetLastUserMessage() {
    if (BotC.history?.length > 0) {
      for (let index = BotC.history.length - 1; index >= 0; index--) {
        if (BotC.history[index].role == "user") {
          setUserMessage(BotC.history[index]);
          break;
        }
      }
    }
  }

  useEffect(() => {
    GetLastAIMessage();
    GetLastUserMessage();
  }, []);

  useEffect(() => {
    if (
      BotC.loading === true &&
      BotC.history !== null &&
      BotC.history.length > 0
    ) {
      GetLastUserMessage();
    }
    if (
      BotC.loading === false &&
      BotC.history !== null &&
      BotC.history.length > 0
    ) {
      GetLastAIMessage();
    }
  }, [BotC.loading, BotC.history]);

  return (
    <div
      id="chatscreen"
      className="h-full flex flex-col justify-between align-super"
    >
      <AnimatedChatBubble item={AIMessage} />
      <AnimatedChatBubble item={userMessage} typing={false} />
    </div>
  );
};

export default InteractiveChat;
